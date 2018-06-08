import { AxiosInstance } from "axios";

export interface ICertificate {
  id: string,
  name: string,
  not_after: string,
  sha1_fingerprint: string,
  created_at: string,
  dns_names: string[],
  state: string,
  type: string
}


export interface ICertificateRequest {
  name: string,
  private_key?: string,
  leaf_certificate?: string,
  certificate_chain?: string,
  dns_names?: string[],
  type: string
}


interface ICertificatesService {
  create: (request: ICertificateRequest) => Promise<void | ICertificate>,
  get: () => Promise<void | ICertificate[]>,
  getById: (certifcateId: string) => Promise<void | ICertificate>,
  delete: (certifcateId: string) => Promise<void | number>
}

export default class Certificates {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/certificates'
    this.client = oauthClient;
  }
  create(request: ICertificateRequest): Promise<void | ICertificate> {

    return this.client.post(this.path, request).then((r) => {
      return r.data.certificate
    })
  }
  get(): Promise<void | ICertificate[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.certificates
    })
  }
  getById(certifcateId: string): Promise<void | ICertificate> {
    var uri = `${this.path}/${certifcateId}`
    return this.client.get(uri).then((r) => {
      return r.data.certificate
    })
  }
  delete(certifcateId: string): Promise<void | number> {
    var uri = `${this.path}/${certifcateId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
}