import { AxiosInstance } from "axios";

interface INode {
  payload: object | null,
  next?: string | null,
  prev?: string | null,
}

interface ICursor {
  node: INode | undefined,
  next: () => Promise<any[]>,
  prev: () => Promise<any[]>,
  hasNext: () => boolean,
  hasPrev: () => boolean,
  batchSize: number,
}

export default class DOCursor implements ICursor {
  node: INode
  batchSize: number
  client: AxiosInstance;
  uri: string
  params?: object
  currentPage = 0
  total = 0
  constructor(oauthClient: AxiosInstance, uri: string, params?: object, batchSize?: number) {
    this.node = {
      payload: null,
      next: null,
      prev: null,
    }
    this.batchSize = batchSize ? batchSize : 25;
    this.client = oauthClient
    this.uri = uri
    this.params = params ? params : {}

  }

  next(): Promise<any[]> {
    if (this.currentPage == 0) {
      return this.execute({ ...this.params, per_page: this.batchSize })
    }
    else {
      if (this.hasNext()) {
        this.currentPage += 1
        this.uri = this.node.next
        return this.execute({ ...this.params })
      }
      return Promise.resolve([])
    }
  }

  prev(): Promise<any[]> {

    if (this.hasPrev()) {
      this.currentPage += 1
      this.uri = this.node.prev
      return this.execute({ ...this.params })
    }
    return Promise.resolve([])
  }

  hasNext(): boolean {
    if (this.node.next) {
      return true
    }
    return false
  }
  hasPrev(): boolean {
    if (this.node.prev) {
      return true
    }
    return false
  }

  execute(params: object) {
    return this.client.get(this.uri, { params }).then((res) => {
      if (res.data.links.next) {
        this.node.next = res.data.links.next
      }
      if (res.data.links.prev) {
        this.node.prev = res.data.links.prev
      }
      this.total = res.data.meta.total

      delete res.data.links
      delete res.data.meta

      return res.data[Object.keys(res.data)[0]]

    })
  }
}