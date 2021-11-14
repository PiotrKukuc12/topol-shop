import db from '../../../../libs/db';
import nextConnect from 'next-connect';
import Product from '../../../../models/Products';

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    const start = parseInt(req.query._start);
    const end = parseInt(req.query._end);

    await db.Connect();
    const total = await Product.countDocuments();
    const prod = await Product.find({
      name: { $regex: searchQuery, $options: 'i' },
    })
      .skip(start)
      .limit(end);
    await db.Disconnect();
    res.setHeader('X-Total-Count', total);
    res.status(200).json(prod);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    await db.Connect();
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      countInStock: req.body.countInStock,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
    });

    const product = await newProduct.save();
    await db.Disconnect();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default handler;
