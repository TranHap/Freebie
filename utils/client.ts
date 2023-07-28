import { createClient }  from '@sanity/client';

export const client = createClient({
  projectId: 'i69o9jiq',
  dataset: 'production',
  apiVersion: '2023-07-11',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});