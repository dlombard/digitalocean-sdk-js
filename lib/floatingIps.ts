import { AxiosInstance } from "axios";
import { IRegion } from "./regions";

export interface IFloatingIp {
  ip: string,
  region: IRegion,
  droplet: object
}

interface IFloatingIpService {
  get: () => Promise<IFloatingIp[]>
  createDropletFloatingIp: (dropletId: string) => Promise<IFloatingIp>
  createRegionFloatingIp: (region: string) => Promise<IFloatingIp>
  getByIp: (ipAddr: string) => Promise<IFloatingIp>
  delete: (ipAddr: string) => Promise<number>
}

export default class FloatingIps implements IFloatingIpService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/floating_ips'
    this.client = oauthClient;
  }

  get(): Promise<IFloatingIp[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.floating_ips
    })
  }
  createDropletFloatingIp(dropletId: string): Promise<IFloatingIp> {
    return this.client.post(this.path, { droplet_id: dropletId }).then((r) => {
      return r.data.floating_ip
    })
  }
  createRegionFloatingIp(region: string): Promise<IFloatingIp> {
    return this.client.post(this.path, { region }).then((r) => {
      return r.data.floating_ip
    })
  }

  getByIp(ipAddr: string): Promise<IFloatingIp> {
    var uri = `${this.path}/${ipAddr}`
    return this.client.get(uri).then((r) => {
      return r.data.floating_ip
    })
  }
  delete(ipAddr: string): Promise<number> {
    var uri = `${this.path}/${ipAddr}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
}