import { AxiosInstance } from "axios";
import DOCursor from "./utils/DOCursor";

export interface IDomain {
  name: string,
  ttl: number,
  zone_file: string
}

interface IDomainsService {
  get: () => DOCursor,
  create: (name: string, ip_address: string) => Promise<void | IDomain>,
  getByName: (name: string) => Promise<void | IDomain>,
  delete: (name: string) => Promise<void | number>,
}

export default class Domains implements IDomainsService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/domains'
    this.client = oauthClient;
  }
  get(): DOCursor {
    var cursor = new DOCursor(this.client, this.path, undefined, 40)

    return cursor
  }
  create(name: string, ip_address: string): Promise<void | IDomain> {
    return this.client.post(this.path, { name, ip_address }).then((r) => {
      return r.data.domains
    })
  }
  getByName(name: string): Promise<void | IDomain> {
    var uri = `${this.path}/name`
    return this.client.get(uri).then((r) => {
      return r.data.certificate
    })
  }
  delete(name: string): Promise<void | number> {
    var uri = `${this.path}/name`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
}