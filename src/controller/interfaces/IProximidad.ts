import { ProximidadType } from "../types/ProximidadType";
import { UpdateSucefully } from "../types/UpdateType";

export default interface IProximidad {
    updateproximidad(input:ProximidadType):Promise<UpdateSucefully>
}