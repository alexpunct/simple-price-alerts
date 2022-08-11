import { ValidateProps } from '@/api-lib/constants';
import { findPostById, findPosts, insertPost, updatePost } from '@/api-lib/db';
import { auths, validateBody, sendPriceAlerts } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const posts = await findPosts(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ posts });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.post.name,
      price: ValidateProps.post.price,
    },
    required: ['name', 'price'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    const post = await insertPost(db, {
      name: req.body.name,
      price: req.body.price,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);

handler.put(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.post.name,
      price: ValidateProps.post.price,
    },
    required: ['name', 'price', '_id'],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    const oldPost = await findPostById(db, req.body._id);

    const newPost = await updatePost(db, {
      _id: req.body._id,
      name: req.body.name,
      price: req.body.price,
    });

    sendPriceAlerts(oldPost, newPost);

    return res.json(newPost);
  }
);

export default handler;
