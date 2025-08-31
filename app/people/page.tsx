import clientData from '@/lib/contenful';
import PeopleClient from './PeopleClient';

export default async function Page() {
  const res = await clientData.getEntries({ content_type: 'person' });
  const people = res.items;

  return <PeopleClient people={people} />;
}
