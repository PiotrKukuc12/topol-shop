import db from "../../libs/db";
import nextConnect from "next-connect";
import Product from '../../models/Products'
import data from '../../libs/data'

const handler = nextConnect()

handler.get(async (req, res) => {
    await db.Connect()
    const prod = await  Product.find({ })

    await db.Disconnect()
    res.status(200).json({msg: prod})
})

export default handler