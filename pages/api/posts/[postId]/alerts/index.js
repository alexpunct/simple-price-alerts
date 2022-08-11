import { ValidateProps } from '@/api-lib/constants';
import { findPostById } from '@/api-lib/db';
import { findAlerts, insertAlert } from '@/api-lib/db/alert';
import { validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const post = await findPostById(db, req.query.postId);

  if (!post) {
    return res
      .status(404)
      .json({ error: { message: 'Product is not found.' } });
  }

  const alerts = await findAlerts(
    db,
    req.query.postId,
    req.query.before ? new Date(req.query.before) : undefined
  );

  return res.json({ alerts });
});

handler.post(
  validateBody({
    type: 'object',
    properties: {
      email: ValidateProps.alert.email,
    },
    required: ['email'],
    additionalProperties: false,
  }),
  async (req, res) => {
    const db = await getMongoDb();

    const email = req.body.email;

    const post = await findPostById(db, req.query.postId);

    if (!post) {
      return res
        .status(404)
        .json({ error: { message: 'Product is not found.' } });
    }

    const alert = await insertAlert(db, post._id, {
      email,
    });

    return res.json({ alert });
  }
);

export default handler;
