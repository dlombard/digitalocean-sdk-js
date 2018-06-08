import { AxiosInstance } from "axios"
import DOCursor from "./utils/DOCursor";

export interface ISSHKey {
  id: number,
  fingerprint: string,
  public_key: string,
  name: string
}

interface ISSHKeysService {
  get: () => DOCursor,
  create: (name: string, public_key: string) => Promise<ISSHKey>,
  getById: (sshKeyId: string) => Promise<ISSHKey>,
  getByFingerprint: (fingerprint: string) => Promise<ISSHKey>,
  update: (sshKeyId: string, name: string) => Promise<ISSHKey>,
  destroyById: (sshKeyId: string) => Promise<number>,
  destroyByFingerprint: (fingerprint: string) => Promise<number>,
}

export default class SSHKeys implements ISSHKeysService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/account/keys'
    this.client = oauthClient
  }

  get(): DOCursor {
    var cursor = new DOCursor(this.client, this.path, undefined, 40)

    return cursor
  }
  create(name: string, public_key: string): Promise<ISSHKey> {
    return this.client.post(this.path, { name, public_key }).then((r) => {
      return r.data.ssh_key
    })
  }
  getById(sshKeyId: string): Promise<ISSHKey> {
    var uri = `${this.path}/${sshKeyId}`

    return this.client.get(uri).then((r) => {
      return r.data.ssh_key
    })
  }
  getByFingerprint(fingerprint: string): Promise<ISSHKey> {
    var uri = `${this.path}/${fingerprint}`

    return this.client.get(uri).then((r) => {
      return r.data.ssh_key
    })
  }

  update(sshKeyId: string, name: string): Promise<ISSHKey> {
    var uri = `${this.path}/${sshKeyId}`
    return this.client.put(uri, { data: { name } }).then((r) => {
      return r.data.ssh_key
    })
  }
  destroyById(sshKeyId: string): Promise<number> {
    var uri = `${this.path}/${sshKeyId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
  destroyByFingerprint(fingerprint: string): Promise<number> {
    var uri = `${this.path}/${fingerprint}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
}