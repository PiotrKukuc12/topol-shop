import db from '../../../../libs/db';
import nextConnect from 'next-connect';
import Order from '../../../../models/Order';
import { isAuth } from '../../../../libs/auth';

const handler = nextConnect();
handler.use(isAuth)

handler.get(async (req, res) => {
  try {
    const start = parseInt(req.query._start);
    const end = parseInt(req.query._end);

    await db.Connect();
    const total = await Order.countDocuments();
    const prod = await Order.find({}).skip(start).limit(end);
    await db.Disconnect();
    res.setHeader('X-Total-Count', total);
    res.status(200).json(prod);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default handler;
