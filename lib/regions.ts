import { ISize } from "./sizes";
import { AxiosInstance } from "axios";
import DOCursor from "./utils/DOCursor";

export interface IRegion {
  slug: string,
  name: string,
  sizes: ISize[],
  available: boolean,
  feature: string[]
}

interface IRegionService{
  get:() => DOCursor
}

export default class Regions implements IRegionService{
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/regions'
    this.client = oauthClient;
  }

  get():DOCursor{
    var cursor = new DOCursor(this.client, this.path, undefined, 40)

    return cursor
  }
}