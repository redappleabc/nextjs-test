import { createClient } from 'contentful';

console.log('CONTENTFUL_SPACE_ID---:', process.env.CONTENTFUL_SPACE_ID);
console.log('CONTENTFUL_ACCESS_TOKEN===:', process.env.CONTENTFUL_ACCESS_TOKEN?.slice(0, 5) + '...');

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('❌ Missing Contentful environment variables');
}

const clientData = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export default clientData;