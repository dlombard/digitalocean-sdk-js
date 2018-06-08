import { ISize } from "./sizes";
import { AxiosInstance } from "axios";

export interface IRegion {
  slug: string,
  name: string,
  sizes: ISize[],
  available: boolean,
  feature: string[]
}

interface IRegionService{
  get:() => Promise<IRegion[]>
}

export default class Regions implements IRegionService{
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/regions'
    this.client = oauthClient;
  }

  get():Promise<IRegion[]>{
    return this.client.get(this.path).then((r) => {
      return r.data.regions
    })
  }
}