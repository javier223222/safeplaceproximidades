import mqtt from "mqtt";
import bcryp from "bcrypt";
import ProximidadController from "../controller/Proximidad.controller";

export default (io:any,socket:any)=>{
    const getDataOfSen=async(id:number)=>{
        console.log("id",id)
        socket.join(id)
        const mqttBroker = "mqtt://52.5.255.119/mqtt-web/"; // ip o dominio
        const mqttOptions = {
            clientId: 'mqttjs_' + bcryp.hashSync(Math.random().toString(16),10),
            username: "", // usuario MQTT
            passowrd: "", //  contraseña MQTT
        };
        // todo implementar petecion a prodcuto par actualizar su rango
        const topic="safeplace/"+id+"/ultrasonic"
        const mqttClient = mqtt.connect(mqttBroker, mqttOptions);
        mqttClient.on('connect', () => {
            console.log('Conectado al servidor MQTT');
            mqttClient.subscribe('safeplace/'+id+'/ultrasonic');
          });
          
          mqttClient.on('message', (topic, message) => {
              let dataString = message.toString()
              const jsonData = JSON.parse(dataString);
              
              io.of("/proximidad").to(id).emit("getproximidad:senddata",jsonData)
              if(jsonData.dang){
                console.log("dangerous")
                   mqttClient.publish('safeplace/'+id+'/dangerous', JSON.stringify({dangerous:1}));
              }
          });

          
          
    }

    const updateDataOfSen=async(id:any,range:any)=>{
        const proximida=new ProximidadController()
        
        const data=await proximida.updateproximidad({
            id:parseInt(id as string),
            range:range
        })

        io.of("/proximidad").to(id).emit("getproximidad:newvalue",data)
    }

    socket.on("getproximidad:getdata",getDataOfSen)
    socket.on("getproximidad:updatedata",updateDataOfSen)

    // socket.on("joinRoom",(idRoom:any,usuario:any) => {
    //     socket.join(idRoom)
    //    console.log("usuario",idRoom)
    // })
}