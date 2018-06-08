import { AxiosInstance } from "axios";
import DOCursor from "./utils/DOCursor";

export interface IDomainRecord {
  id?: string,
  type?: string,
  name: string
  data: string,
  priority: number | null,
  port: number | null,
  ttl: number,
  weight: number | null,
  flags: number,
  tag: string
}

interface IDomainRecordsService {
  get: (name: string) => DOCursor,
  getById: (name: string, recordId: string) => Promise<void | IDomainRecord>,
  delete: (name: string, recordId: string) => Promise<void | number>,
  create: (name: string, request: IDomainRecord) => Promise<void | IDomainRecord>,
  update: (name: string, recordId: string, request: IDomainRecord) => Promise<void | IDomainRecord>,
}

export default class DomainRecords implements IDomainRecordsService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/domains'
    this.client = oauthClient;
  }
  get(name: string): DOCursor {
    var uri = `${this.path}/${name}/records`
    var cursor = new DOCursor(this.client, uri, undefined, 40)

    return cursor
  }
  getById(name: string, recordId: string): Promise<void | IDomainRecord> {
    var uri = `${this.path}/${name}/records/${recordId}`
    return this.client.get(uri).then((r) => {
      return r.data.domain_record
    })
  }
  delete(name: string, recordId: string): Promise<void | number> {
    var uri = `${this.path}/${name}/records/${recordId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
  create(name: string, request: IDomainRecord): Promise<void | IDomainRecord> {
    var uri = `${this.path}/${name}/records`
    return this.client.post(uri, request).then((r) => {
      return r.data.domain_record
    })
  }
  update(name: string, recordId: string, request: IDomainRecord): Promise<void | IDomainRecord> {
    var uri = `${this.path}/${name}/records/${recordId}`
    return this.client.put(uri, request).then((r) => {
      return r.data.domain_record
    })
  }

}