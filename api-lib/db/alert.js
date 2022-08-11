import { ObjectId } from 'mongodb';

export async function findAlerts(db, postId, before, limit = 1) {
  return db
    .collection('alerts')
    .aggregate([
      {
        $match: {
          postId: new ObjectId(postId),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
    ])
    .toArray();
}

export async function insertAlert(db, postId, { email }) {
  const alert = {
    email,
    postId: new ObjectId(postId),
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('alerts').insertOne(alert);
  alert._id = insertedId;
  return alert;
}
