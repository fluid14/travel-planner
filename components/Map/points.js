export const pointsEnum = { METRO: 'metro', POI: 'poi' };
export const points = {
  poi: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ],
  metro: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ]
};
