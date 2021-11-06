import db from "../../libs/db";
import nextConnect from "next-connect";
import Product from '../../models/Products'

const handler = nextConnect()

handler.get(async (req, res) => {
    try{
        const queryLimit = parseInt(req.query._limit)
        const skipLimit = parseInt(req.query._skip)
        await db.Connect()
        const prod = await Product.find({}, null, { skip: skipLimit, limit: queryLimit })
        await db.Disconnect()
        res.status(200).json(prod)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

export default handler