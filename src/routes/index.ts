import express,{Request,Response} from "express";
import updateSenRouth from "./UpdateSen.route";
import verifyToken from "../middlewares/";

let apirest=express();
let rootRouter=express.Router();
rootRouter.get("/",(req:Request,res:Response)=>{
    res.send("<h1>welcome to my api restFul</h1>")
});
apirest.use("/",rootRouter)

// todo implementar middleware de verificacion de token
apirest.use("/prox",updateSenRouth)


export default apirest;