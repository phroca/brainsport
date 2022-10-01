// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Card, PackCard } = initSchema(schema);

export {
  Card,
  PackCard
};