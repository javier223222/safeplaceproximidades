import express,{Request,Response} from "express"

import bodyParser from "body-parser"
import ProximidadController from "../controller/Proximidad.controller"

let jsonParser = bodyParser.json()
let updateSenRouth=express.Router()

updateSenRouth.route("/")
             .patch(jsonParser,async(req:Request,res:Response)=>{
                console.log("update")
            try{
                const {id}=req.query
                const {range}=req.body
                if(!id){
                return res.status(400).json({message:"id no encontrado"})
                }

                const proximida=new ProximidadController()
                const data=await proximida.updateproximidad({
                    id:parseInt(id as string),
                    range:range
                })
                return res.status(200).json(data)
            }catch(error:any){
                console.error(error)
                return res.status(500).json({message:"error en el servidor"})
            
            }
           
        })


export default updateSenRouth;