import { IAction } from "./actions";
import { AxiosInstance } from "axios";
import DOCursor from "./utils/DOCursor";

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
  get: () => DOCursor
  distributions: () => DOCursor
  applications: () =>DOCursor
  private: () => DOCursor
  actions: (imageId: string) => DOCursor
  getById: (imageId: string) => Promise<IImage>
  getByslug: (slug: string) => Promise<IImage> 
  update: (imageId: string, name: string) => Promise<IImage>
  delete: (imageId: string) => Promise<number>
  executeByType: (type: string) => DOCursor
}

export default class Images implements IImagesService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/images'
    this.client = oauthClient;
  }

  get(): DOCursor {
    var cursor = new DOCursor(this.client, this.path, undefined, 40)

    return cursor
  }
  distributions(): DOCursor {
    return this.executeByType('distribution')
  }
  applications(): DOCursor {
    return this.executeByType('application')
  }
  private(): DOCursor {
    return this.executeByType('private')
  }
  actions(imageId: string): DOCursor {
    var uri = `${this.path}/${imageId}/actions`

    var cursor = new DOCursor(this.client, uri, undefined, 40)

    return cursor
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


  executeByType(type: string): DOCursor {
    var params = {}
    if (type === 'private') {
      params = { private: true };
    } else {
      params = { type }
    }
    var cursor = new DOCursor(this.client, this.path, params, 40)

    return cursor
  }
}