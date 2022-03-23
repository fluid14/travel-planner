import airDB from 'services/airtableClient';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  address: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  description: Joi.string(),
  placeId: Joi.string().required(),
  priceLevel: Joi.number().required(),
  rating: Joi.number().required(),
  totalRatings: Joi.number().required()
});

export default async (payload) => {
  const validateMarker = await schema.validateAsync(payload);
  return await airDB('points').create([
    {
      fields: {
        ...validateMarker
      }
    }
  ]);
};
