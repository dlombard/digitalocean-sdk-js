import { AxiosInstance } from "axios";

export interface ITag {
  name: string,
  resources: object
}

interface IResourceTag {
  resource_id: string,
  resource_type: string
}

interface ITagsService {
  get: () => Promise<ITag[]>,
  create: (name: string) => Promise<ITag>,
  getByName: (tagName: string) => Promise<ITag>,
  tag: (tagName: string, resources: IResourceTag[]) => Promise<number>,
  untag: (tagName: string, resources: IResourceTag[]) => Promise<number>,
  delete: (tagName: string) => Promise<number>,
}

export default class Tags implements ITagsService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/tags'
    this.client = oauthClient
  }

  get(): Promise<ITag[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.ssh_keys
    })
  }
  create(name: string): Promise<ITag> {
    return this.client.post(this.path, { name }).then((r) => {
      return r.data.tag
    })
  }
  getByName(tagName: string): Promise<ITag> {
    var uri = `${this.path}/${tagName}`
    return this.client.get(uri).then((r) => {
      return r.data.tag
    })
  }
  tag(tagName: string, resources: IResourceTag[]): Promise<number> {
    var uri = `${this.path}/${tagName}/resources`
    return this.client.post(uri, { resources }).then((r) => {
      return r.data.tag
    })
  }
  untag(tagName: string, resources: IResourceTag[]): Promise<number> {
    var uri = `${this.path}/${tagName}/resources`
    return this.client.delete(uri, { data: { resources } }).then((r) => {
      return r.status
    })
  }
  delete(tagName: string): Promise<number> {
    var uri = `${this.path}/${tagName}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }

}