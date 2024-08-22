import messageModel from '../dao/models/message.model.js'
import {Router} from 'express'
import mongoose from 'mongoose';


const router = Router()


router.post('/', async(req, res)=>{
    try{
        let {user, message} = req.body
        console.log(user)
        if (!user || !message)
            res.status(400).json({result :"error", payload: "Parametros no definidos"})     

        const msg = await messageModel.create({user, message})
        res.status(200).json({result :"success", payload: msg}) 
    }catch{
        return res.status(500).json({message:"Error durante el alta del mensaje."})
    }
})



export default router