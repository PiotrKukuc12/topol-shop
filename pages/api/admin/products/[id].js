import db from '../../../../libs/db';
import nextConnect from 'next-connect';
import Product from '../../../../models/Products';

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const id = req.query.id;

    await db.Connect();
    const prod = await Product.findById(id);
    await db.Disconnect();
    res.status(200).json(prod);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default handler;
