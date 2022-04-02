import airDB from 'services/airtableClient';

export default async (payload) => {
  const {
    title,
    totalRatings,
    reservationInfo,
    placeId,
    lat,
    lng,
    description,
    rating,
    address,
    recordId,
    visitDate
  } = payload;
  return await airDB('points').update([
    {
      id: recordId,
      fields: {
        title,
        totalRatings,
        reservationInfo,
        placeId,
        lat,
        lng,
        description,
        rating,
        address,
        visitDate
      }
    }
  ]);
};
