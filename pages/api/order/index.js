import nextConnect from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../libs/db';
import Product from '../../../models/Products';

const handler = nextConnect();
handler.post(async (req, res) => {
  try {
    await db.Connect();
    let totalCount = 0;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    for (let i = 0; i < req.body.orderItems.length; i++) {
      const product = await Product.findById(req.body.orderItems[i]._id);
      totalCount += product.price * req.body.orderItems[i].quantity;
    }

    totalCount = round2(totalCount);

    const newOrder = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      deliveryMethod: req.body.deliveryMethod,
      percelAddress: req.body.percelAddress,
      itemsPrice: totalCount,
      shippingPrice: totalCount < 200 ? 15 : 0,
      totalPrice: totalCount < 200 ? totalCount + 15 : totalCount,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default handler;
