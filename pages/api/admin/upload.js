import nextConnect from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';
import { isAuth } from '../../../libs/auth';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
handler.use(isAuth)
const upload = multer();
handler.use(upload.single('file')).post(async (req, res) => {
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    });
  };
  const result = await streamUpload(req)
  res.send(result)
});

export default handler;
