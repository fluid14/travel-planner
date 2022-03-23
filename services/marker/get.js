import airDB from 'services/airtableClient';

const getMarkers = async () => {
  const markers = await airDB('points')
    .select({
      sort: [{ field: 'id', direction: 'desc' }]
    })
    .all();

  return markers.map((marker) => marker.fields);
};

export default getMarkers;
