import { AxiosInstance } from "axios";

export interface ISnapshot {
  id: string,
  name: string,
  regions: object[],
  created_at: string,
  resource_id: string,
  resource_type: string,
  min_disk_size: number,
  size_gigabytes: number
}

interface ISnapshotsService {
  get: () => Promise<ISnapshot[]>
  getById: (snapshotId: string) => Promise<ISnapshot>
  droplet: () => Promise<ISnapshot[]>
  volume: () => Promise<ISnapshot[]>
  delete: (snapshotId: string) => Promise<number>
}


export default class Snapshots implements ISnapshotsService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/snapshots'
    this.client = oauthClient
  }

  get(): Promise<ISnapshot[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.snapshots
    })
  }
  getById(snapshotId: string): Promise<ISnapshot> {
    var uri = `${this.path}/${snapshotId}`
    return this.client.get(uri).then((r) => {
      return r.data.snapshot
    })
  }
  droplet(): Promise<ISnapshot[]> {
    return this.client.get(this.path, { params: { resource_type: 'droplet' } }).then((r) => {
      return r.data.snapshots
    })
  }
  volume(): Promise<ISnapshot[]> {
    return this.client.get(this.path, { params: { resource_type: 'volume' } }).then((r) => {
      return r.data.snapshots
    })
  }
  delete(snapshotId: string): Promise<number> {
    var uri = `${this.path}/${snapshotId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
}