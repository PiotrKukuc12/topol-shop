import nextConnect from "next-connect";
import { signToken } from "../../../libs/auth";
import bcrypt from 'bcrypt'


const handler = nextConnect()

handler.post(async(req, res)=> {
    if (req.body.password === process.env.PASSWORD && req.body.name === process.env.NAME) {
        const token = signToken(req.body.name, req.body.password)
        res.send({
            token,
            name: req.body.name,
            password: req.body.password
        })
    } else {
        res.status(401).send({ message: "invalid name or password"})
    }
})

export default handler