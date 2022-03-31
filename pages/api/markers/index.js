import createMarker from '../../../services/marker/create';
import getMarkers from '../../../services/marker/get';
import deleteMarker from '../../../services/marker/delete';
import updateMarker from '../../../services/marker/update';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const markers = await getMarkers();
      res.status(200).json(markers);
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
    case 'PUT': {
      try {
        const marker = await updateMarker(req.body);
        res.status(200).json({ status: 'updated', marker });
      } catch (err) {
        res.status(422).json({ status: 'not_updated', err });
      }
      break;
    }
    case 'DELETE': {
      const marker = await deleteMarker(req.query.id);
      res.status(200).json({ status: 'deleted', marker });
      break;
    }
    default:
      res.status(400);
  }
};
