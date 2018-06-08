import { AxiosInstance } from "axios";
import DOCursor from "./utils/DOCursor";

export interface ISize {
  slug: string,
  available: boolean,
  transfer: number,
  price_monthly: number,
  price_hourly: number,
  memory: number,
  vcpus: number,
  disk: number,
  regions: string[]
}

interface ISizeService {
  get: () => DOCursor
}

export default class Sizes implements ISizeService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/sizes'
    this.client = oauthClient;
  }

  get(): DOCursor{
    var cursor = new DOCursor(this.client, this.path, undefined, 40)

    return cursor
  }
}