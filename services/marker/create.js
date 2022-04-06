import airDB from 'services/airtableClient';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  address: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  description: Joi.string(),
  placeId: Joi.string().required(),
  priceLevel: Joi.number(),
  rating: Joi.number(),
  totalRatings: Joi.number(),
  reservationInfo: Joi.string(),
  visitDate: Joi.string(),
  neededTime: Joi.string(),
  pass: Joi.bool()
});

export default async (payload) => {
  console.log(payload);
  const validateMarker = await schema.validateAsync(payload);
  return await airDB('points').create([
    {
      fields: {
        ...validateMarker
      }
    }
  ]);
};
