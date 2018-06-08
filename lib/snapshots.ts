import { AxiosInstance } from "axios";
import DOCursor from "./utils/DOCursor";

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
  get: () => DOCursor
  getById: (snapshotId: string) => Promise<ISnapshot>
  droplet: () => DOCursor
  volume: () => DOCursor
  delete: (snapshotId: string) => Promise<number>
}


export default class Snapshots implements ISnapshotsService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/snapshots'
    this.client = oauthClient
  }

  get(): DOCursor{
    var cursor = new DOCursor(this.client, this.path, undefined, 40)

    return cursor
  }
  getById(snapshotId: string): Promise<ISnapshot> {
    var uri = `${this.path}/${snapshotId}`
    return this.client.get(uri).then((r) => {
      return r.data.snapshot
    })
  }
  droplet(): DOCursor {
    var params = { resource_type: 'droplet' } 
    var cursor = new DOCursor(this.client, this.path, params, 40)

    return cursor
  }
  volume(): DOCursor {
    var params = { resource_type: 'volume' } 
    var cursor = new DOCursor(this.client, this.path, params, 40)

    return cursor
  }
  delete(snapshotId: string): Promise<number> {
    var uri = `${this.path}/${snapshotId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
}