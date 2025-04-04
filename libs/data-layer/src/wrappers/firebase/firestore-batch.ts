import {Firestore} from 'firebase-admin/firestore'
import {BaseFirestoreRepository, IEntity, WithOptionalId} from 'fireorm'
import {FirestoreBatchSingleRepository} from 'fireorm/lib/src/Batch/FirestoreBatchSingleRepository'

export class FirestoreBatch {
  private firebaseBatchLimit: number
  private source: Firestore | BaseFirestoreRepository<IEntity>

  private currentBatchIndex = 0
  private currentBatchLength = 0

  private batchArray: (FirebaseFirestore.WriteBatch | FirestoreBatchSingleRepository<IEntity>)[] =
    []
  private currentBatch: FirebaseFirestore.WriteBatch | FirestoreBatchSingleRepository<IEntity>

  /**
   * Batch that can procceed more than 500 docs
   **/
  constructor(source: Firestore | BaseFirestoreRepository<IEntity>, firebaseBatchLimit?: number) {
    this.source = source
    this.firebaseBatchLimit = firebaseBatchLimit ?? 500

    this.addBatch()
    this.currentBatch = this.batchArray[this.currentBatchIndex]
  }

  async commit(): Promise<void> {
    try {
      await Promise.all(this.batchArray.map((batch) => batch.commit()))
    } catch (error) {
      throw new Error('FirestoreBatch commit error\n' + JSON.stringify(error, null, 4))
    }
  }

  /**
   * @param payload Entity if source instanceof Fireorm Repository
   * @param payload DocumentReference if source instanceof Firestore
   **/
  delete(payload: FirebaseFirestore.DocumentReference<unknown> | WithOptionalId<IEntity>): void {
    this.currentBatch.delete(payload as FirebaseFirestore.DocumentReference<unknown>)

    this.updateBatchArray()
  }

  update(
    payload: FirebaseFirestore.DocumentReference<unknown> | WithOptionalId<IEntity>,
    data: Partial<IEntity>,
  ): void {
    ;(this.currentBatch as FirebaseFirestore.WriteBatch).update(
      payload as FirebaseFirestore.DocumentReference<unknown>,
      data,
    )

    this.updateBatchArray()
  }

  get length(): number {
    return (this.batchArray.length - 1) * this.firebaseBatchLimit + this.currentBatchLength
  }

  private addBatch(): void {
    this.batchArray.push(
      this.source instanceof Firestore ? this.source.batch() : this.source.createBatch(),
    )
  }

  private updateBatchArray(): void {
    this.currentBatchLength++

    if (this.currentBatchLength === this.firebaseBatchLimit) {
      this.addBatch()
      this.currentBatchIndex++
      this.currentBatchLength = 0
    }

    this.currentBatch = this.batchArray[this.currentBatchIndex]
  }
}
