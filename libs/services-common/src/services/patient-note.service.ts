import {
  PatientNoteRepository,
  PatientRepository,
} from '@libs/data-layer/apps/users/repositories/typeorm'
import {BadRequestException} from '@libs/services-common/exceptions'
import {Injectable} from '@nestjs/common'
import {CreatePatientNoteType} from '@libs/services-common/dto/patient-note.dto'
import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {DeepPartial, In} from 'typeorm'
import {PatientNoteTypeEnum} from '../enums/patient-note.enum'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {I18nLocalizationService} from './i18n-localization.service'
import * as i18nMessages from '@libs/common/i18n/en/message.json'

@Injectable()
export class PatientNoteService {
  constructor(
    private readonly patientNoteRepository: PatientNoteRepository,
    private readonly patientRepository: PatientRepository,
    private readonly i18nLocalizationService: I18nLocalizationService,
  ) {}

  async createOrUpdatePatientNote(
    patientUuid: string,
    createNoteDto: Partial<CreatePatientNoteType>,
    authUserId: string,
  ): Promise<PatientNote[]> {
    const patient = await this.patientRepository.findOneBy({uuid: patientUuid})
    if (!patient) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18nMessages.PATIENT_NOT_FOUND),
      )
    }

    const noteIdsToDelete = []
    const notesToSave: DeepPartial<PatientNote>[] = []
    const notes = await this.patientNoteRepository.find({where: {patientId: patient.id}})
    Object.entries(createNoteDto).forEach(([type, content]) => {
      const note = notes.find((note) => note.type === type)

      const noteModel: DeepPartial<PatientNote> = {
        patientId: patient.id,
        type: PatientNoteTypeEnum[type],
        content,
        updatedBy: authUserId,
      }

      //content is null -> user remove note
      if (!content && note) {
        return noteIdsToDelete.push(note.id)
      }

      //Note not created yet
      if (content && !note) {
        return notesToSave.push(noteModel)
      }

      //content is updated
      if (note && content) {
        note.content = content
        return notesToSave.push({...note, updatedBy: authUserId})
      }
    })

    StructuredLogger.info(
      activityLogs.PatientNoteFunctions.CreateOrUpdatePatientNote,
      activityLogs.PatientNoteActions.DeletePatientNotes,
      {
        patientNotesIds: noteIdsToDelete,
      },
    )

    await this.patientNoteRepository.delete({id: In(noteIdsToDelete)})
    return this.patientNoteRepository.save(notesToSave)
  }
}
