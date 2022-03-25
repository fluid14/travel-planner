import airDB from 'services/airtableClient';

export default async (id) => {
  await airDB('points').destroy(id.toString(), function (err, deletedRecord) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Deleted record', deletedRecord.id);
  });
};
