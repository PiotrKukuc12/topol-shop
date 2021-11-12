import nextConnect from 'next-connect';

const handler = nextConnect();
handler.get(async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

export default handler;