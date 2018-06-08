import { AxiosInstance } from "axios";

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
  get: () => Promise<ISize[]>
}

export default class Sizes implements ISizeService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/sizes'
    this.client = oauthClient;
  }

  get(): Promise<ISize[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.sizes
    })
  }
}