import nextConnect from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../libs/db';

const handler = nextConnect();

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

export default handler;
