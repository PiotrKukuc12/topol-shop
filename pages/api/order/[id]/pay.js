import nextConnect from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../libs/db';

const handler = nextConnect();

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

handler.put(async (req, res) => {
  await db.Connect();
  const order = await Order.findById(req.query.id);

  if (order) {
    // (order.isPaid = true), (order.paidAt = Date.now());
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.Disconnect();
    res.send({ message: 'Order paid', order: paidOrder });
  } else {
    await db.Disconnect();
    res.status(404).send({ message: 'Order not found' });
  }
});

export default allowCors(handler);
