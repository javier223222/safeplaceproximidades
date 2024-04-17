
import mqtt from "mqtt";
import IProximidad from "./interfaces/IProximidad";
import { ProximidadType } from "./types/ProximidadType";
import { UpdateSucefully } from "./types/UpdateType";
import axios from "axios";
import dotenv from "dotenv";
import bcryp from "bcrypt";
dotenv.config();

export default class ProximidadController implements IProximidad{
    public async updateproximidad(input: ProximidadType):Promise< UpdateSucefully> {
      try{
        console.log("id",input.id)
        const mqttBroker = "mqtt://52.5.255.119/mqtt-web/"; // ip o dominio
        const mqttOptions = {
            clientId: 'mqttjs_' + bcryp.hashSync(Math.random().toString(16),10),
            username: "", // usuario MQTT
            password: "", //  contraseña MQTT
        };
        // todo implementar petecion a prodcuto par actualizar su rango
        const response=await axios.patch(process.env.ENDPOINTRANGO||"http://localhost:3006/api/producto",{
          productId:input.id,parameter:input.range
        })
        console.log(response.data)
        
        const mqttClient = mqtt.connect(mqttBroker, mqttOptions);
        
        mqttClient.on('connect', () => {
          console.log('Conectado al servidor MQTT');
          mqttClient.publish('safeplace/'+input.id+'/update', JSON.stringify({"parameterprox":input.range}));
        });
        
      
          
          return {
            message: "Actualizado",
            status: 200,
            data: input
          }
      }catch(error:any){
        console.error(error)
        throw new Error(error)
      }
       
    }
    

}