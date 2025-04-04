export class LifeLabsAdapter {
  async pullResults(): Promise<string | null> {
    return `<?xml version='1.0' encoding='UTF-8'?>
    <HL7Messages MessageFormat="ORUR01" MessageCount="15" Version="2.3.1">
        <Message MsgID='1'>
            <![CDATA[MSH|^~\&|PATHL7|EXC-RV^LIFELABS ONTARIO|HTTPCLIENT||20231225101819-0500||ORU^R01|ON220231225101821629|D|2.3.1|||AL
    PID|||2222222223^^^^JHN^^^^ON&Ontario&HL70347||SMITH^M^^^^^L|||F|||||^H
    PV1|1|OU
    ORC|RE||2017-POL230027
    OBR|1|2017-POL230027-4_TR10696-3|2017-POL230027-4_TR10696-3|TR10696-3^Anaerobic Culture|||20170712194300|||||||20170713145100||LL313131^TESTING^KMCWILLIAM||||||20170714072600||MICRO3|F|||LL2500025^ON_EMR_DOCTOR_Y^TEST~LL313131^TESTING^KMCWILLIAM
    OBX|1|ST|31208-2^Specimen Source||ABSCESS FLUID||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|2|ST|33882-2^Collection Date||12-JUL-2017||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|3|ST|49049-0^Collection Time||19:30||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|4|FT|664-3^Microscopic||No polymorphonuclear cells seen\.br\No organisms seen||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|5|ST|CUL STAT^Culture Status||Final||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|6|FT|634-6^Culture Report||Anaerobic Culture\.br\No aerobic and anaerobic bacteria isolated after days.||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|7|ST|FREETEXT^Comment||--||||||F|||20170714072700-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    NTE|||Freetext added to final report.
    ORC|RE||2017-POL230027
    OBR|2|2017-POL230027-3_TR10717-7|2017-POL230027-3_TR10717-7|TR10717-7^Ova and Parasites|||20170712194300|||||||20170713145100|STL&STOOL = FECAL&HL70070^^^^&STOOL IN SAF FIXATIVE|LL313131^TESTING^KMCWILLIAM||||||20170714072600||MICRO8|F|||LL2500025^ON_EMR_DOCTOR_Y^TEST~LL313131^TESTING^KMCWILLIAM
    OBX|1|ST|31208-2^Specimen Source||--||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    NTE|||STOOL IN SAF FIXATIVE
    OBX|2|ST|33882-2^Collection Date||12-JUL-2017||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|3|ST|49049-0^Collection Time||19:00||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|4|FT|634-6^Report||O\T\P Examination\.br\*** IMPORTANT UPDATE ***\.br\As of August 8th, 2017, LifeLabs will begin\.br\testing stools for pathogenic parasites by PCR\.br\technology. This will replace the current\.br\microscopy method. Collection containers will\.br\change from SAF to a Copan Fecal Swab.\.br\New swabs  will be available for ordering on\.br\August 1st, 2017 via LifeLabs Client Order Forms.\.br\Further details will be posted on our website at\.br\www.lifelabs.com; alternatively contact LifeLabs\.br\Customer Care Centre 1-877-849-3637.\.br\\.br\Please note: The PCR technology will not detect\.br\helminths. If such testing is required please\.br\continue to submit stool in SAF container for\.br\microscopy.||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|5|CE|6463-4^Organism|1|Numerous Blastocystis hominis found||||||F|||20170714072600-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    NTE|||Although generally recognized as a non-pathogen,\.br\Blastocystis hominis may have pathogenic\.br\potential when present in high numbers or in\.br\immunocompromised hosts.\.br\Clinical correlation is suggested.\.br\A microscopic examination of a concentrate and a\.br\modified Kinyoun-Hematoxylin stained smear was\.br\performed.
    ORC|RE||2017-POL230027
    OBR|3|2017-POL230027-2_TR10699-7|2017-POL230027-2_TR10699-7|TR10699-7^Fungal Culture|||20170712194300|||||||20170713145100|ORH&OTHER&HL70070^^^^&LEFT FINGERNAIL 1|LL313131^TESTING^KMCWILLIAM||||||20170714072400||MICRO11|F|||LL2500025^ON_EMR_DOCTOR_Y^TEST~LL313131^TESTING^KMCWILLIAM
    OBX|1|ST|31208-2^Specimen Source||--||||||F|||20170714072400-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    NTE|||LEFT FINGERNAIL 1
    OBX|2|ST|33882-2^Collection Date||12-JUL-2017||||||F|||20170714072400-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|3|ST|49049-0^Collection Time||19:43||||||F|||20170714072400-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|4|FT|667-6^Microscopic (KOH Preparation)||Mycelia present||||||F|||20170714072400-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|5|FT|634-6^Culture Report||Fungal Culture||||||F|||20170714072400-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    OBX|6|CE|6463-4^Organism|1|Candida albicans present.||||||F|||20170714072400-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    ORC|RE||2017-POL230027
    OBR|4|2017-POL230027-5_TR10691-4|2017-POL230027-5_TR10691-4|TR10691-4^Public Health Test|||20170712194300|||||||20170713145100|STL&STOOL = FECAL&HL70070|LL313131^TESTING^KMCWILLIAM||||||20170713145220||REFER1|F|||LL2500025^ON_EMR_DOCTOR_Y^TEST~LL313131^TESTING^KMCWILLIAM
    OBX|1|FT|DIFFIC^Public Health Test||Specimen referred to: Public Health Laboratories\.br\(PHL). Test results will be sent directly to the\.br\requesting physician from PHL.\.br\For result inquiries, call 1-877-604-4567.||||||F|||20170713145220-0400|5687^LifeLabs&100 International Blvd.&&Toronto&Ontario&M9W 6J6&Canada&B
    ]]></HL7Messages>`
  }

  async signOut(): Promise<void> {
    return
  }

  async sendAcknowledgement(): Promise<void> {
    return
  }
}
