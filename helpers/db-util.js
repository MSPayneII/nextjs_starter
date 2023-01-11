import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(
    //removed. you will need a key
  );

  return client;
}

async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
export { connectDatabase, insertDocument, getAllDocuments };
