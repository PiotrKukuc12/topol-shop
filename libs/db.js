import mongoose from 'mongoose';

const connection = {};

async function Connect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

async function Disconnect() {
  if (connection.isConnected) {
    await mongoose.disconnect
    connection.isConnected = false
  } else {
    console.log('db is not connected')
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { Connect, convertDocToObj, Disconnect };

export default db;
