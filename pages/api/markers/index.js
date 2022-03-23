import createMarker from '../../../services/marker/create';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      break;
    }
    case 'POST': {
      try {
        const marker = await createMarker(req.body);
        res.status(200).json({ status: 'created', marker });
      } catch (err) {
        res.status(422).json({ status: 'not_created', err });
      }
      break;
    }
    default:
      res.status(400);
  }
};
