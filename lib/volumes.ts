import { ISnapshot } from "./snapshots";
import { AxiosInstance } from "axios";

export interface IVolume {
  id: string,
  region: object,
  droplet_ids: string[],
  name: string,
  description: string,
  size_gigabytes: number,
  created_at: string,
  filesystem_type: string,
  filesystem_label: string
}

export interface IVolumeRequest {
  size_gigabytes: number,
  name: string,
  description?: string,
  region: string,
  snapshot_id?: string,
  filesystem_type?: string,
  filesystem_label?: string
}

export interface IVolumesService {
  get: () => Promise<void | IVolume[]>,
  create: (volumeRequest: IVolumeRequest) => Promise<void | IVolume>,
  getById: (id: string) => Promise<void | IVolume>,
  getByName: (name: string) => Promise<void | IVolume>,
  snapshots: (id: string) => Promise<void | ISnapshot[]>,
  createSnapshot: (id: string, name: string) => Promise<void | ISnapshot>,
  delete: (id: string) => Promise<void | number>,
  deleteByName: (name: string, region: string) => Promise<void | number>,
  deleteSnapshot: (snapshotId: string) => Promise<void | number>

}

export default class Volumes implements IVolumesService {
  client: AxiosInstance
  path: string

  constructor(oauthClient: AxiosInstance) {
    this.path = '/volumes'
    this.client = oauthClient;
  }

  get(): Promise<void | IVolume[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.volumes
    }).catch((e) => {
      console.error(e)
    })
  }
  create(volumeRequest: IVolumeRequest): Promise<void | IVolume> {
    return this.client.post(this.path, volumeRequest).then((r) => {
      return r.data.volume
    }).catch((e) => {
      console.error(e.response)
    })
  }
  getById(id: string): Promise<void | IVolume> {
    var uri = `/${this.path}/${id}`
    return this.client.get(uri).then((r) => {
      return r.data.volume
    }).catch((e) => {
      console.error(e)
    })
  }
  getByName(name: string): Promise<void | IVolume> {
    var uri = `${this.path}/${name}`
    return this.client.get(uri).then((r) => {
      return r.data.volume
    }).catch((e) => {
      console.error(e)
    })
  }
  snapshots(id: string): Promise<void | ISnapshot[]> {
    var uri = `/${this.path}/${id}/snapshots`
    return this.client.get(uri).then((r) => {
      return r.data.snapshots
    }).catch((e) => {
      console.error(e)
    })
  }
  createSnapshot(id: string, name: string): Promise<void | ISnapshot> {
    var uri = `/${this.path}/${id}/snapshots`
    return this.client.post(uri, { name }).then((r) => {
      return r.data.snapshot
    }).catch((e) => {
      console.error(e)
    })
  }
  delete(id: string): Promise<void | number> {
    var uri = `/${this.path}/${id}`
    return this.client.delete(uri).then((r) => {
      return r.status
    }).catch((e) => {
      console.error(e)
    })
  }
  deleteByName(name: string, region: string): Promise<void | number> {
    var params = {
      name,
      region
    }
    return this.client.delete(this.path, { params }).then((r) => {
      return r.status
    }).catch((e) => {
      console.error(e)
    })
  }
  deleteSnapshot(snapshotId: string): Promise<void | number> {
    var uri = `/snapshots/${snapshotId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    }).catch((e) => {
      console.error(e)
    })
  }
}