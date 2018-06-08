import { IAction } from "./actions";
import { AxiosInstance } from "axios";

export interface IImage {
  id: number,
  name: string,
  type: string,
  distribution: string,
  slug: string | null,
  public: false,
  regions: string[],
  created_at: string,
  min_disk_size: number,
  size_gigabytes: number
}

interface IImagesService {
  get: () => Promise<IImage[]>
  distributions: () => Promise<IImage[]>
  applications: () => Promise<IImage[]>
  private: () => Promise<IImage[]>
  actions: (imageId: string) => Promise<IAction[]>
  getById: (imageId: string) => Promise<IImage>
  getByslug: (slug: string) => Promise<IImage>
  update: (imageId: string, name: string) => Promise<IImage>
  delete: (imageId: string) => Promise<number>
  executeByType: (type: string) => Promise<IImage[]>
}

export default class Images implements IImagesService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/images'
    this.client = oauthClient;
  }

  get(): Promise<IImage[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.images
    })
  }
  distributions(): Promise<IImage[]> {
    return this.executeByType('distribution')
  }
  applications(): Promise<IImage[]> {
    return this.executeByType('application')
  }
  private(): Promise<IImage[]> {
    return this.executeByType('private')
  }
  actions(imageId: string): Promise<IAction[]> {
    var uri = `${this.path}/${imageId}/actions`

    return this.client.get(uri).then((r) => {
      return r.data.actions
    })
  }
  getById(imageId: string): Promise<IImage> {
    var uri = `${this.path}/${imageId}`

    return this.client.get(uri).then((r) => {
      return r.data.image
    })
  }
  getByslug(slug: string): Promise<IImage> {
    var uri = `${this.path}/${slug}`

    return this.client.get(uri).then((r) => {
      return r.data.image
    })
  }
  update(imageId: string, name: string): Promise<IImage> {
    var uri = `${this.path}/${imageId}`
    return this.client.put(uri, { name }).then((r) => {
      return r.data.image
    })
  }
  delete(imageId: string): Promise<number> {
    var uri = `${this.path}/${imageId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }


  executeByType(type: string): Promise<IImage[]> {
    var params = {}
    if (type === 'private') {
      params = { private: true };
    } else {
      params = { type }
    }
    return this.client.get(this.path, { params }).then((r) => {
      return r.data.images
    })
  }
}