import airDB from 'services/airtableClient';

export default async (payload) => {
  return await airDB('points').create([
    {
      fields: {
        ...payload
      }
    }
  ]);
};
