import Airtable from 'airtable';

Airtable.configure({
  endpointUrl: process.env.DATABASE_URL,
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
});

export default Airtable.base(process.env.AIRTABLE_BASE);
