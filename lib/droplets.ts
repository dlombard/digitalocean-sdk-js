import { IAction } from "./actions";
import { AxiosInstance } from "axios";
import { ISnapshot } from "./snapshots";
import { ISize } from "./sizes";
import { IRegion } from "./regions";

export interface IDroplet {
  id: number,
  name: string,
  memory: number,
  vcpus: number,
  disk: number,
  locked: boolean,
  created_at: string,
  status: string,
  backup_ids: string[],
  snapshot_ids: string[],
  features: string[],
  region: IRegion,
  image: object,
  size: ISize,
  size_slug: string,
  networks: object,
  kernel: object | null,
  next_backup_window: object | null,
  tags: string[],
  volume_ids: string[]
}

interface IDropletRequest {
  name: string
  region: string
  size: string
  image: number
  ssh_keys?: string[]
  ipv6?: boolean
  private_networking?: boolean
  user_data?: string
  monitoring?: boolean
  volumes?: string[]
  tags?: string[]
}

interface IDropletsRequest {
  names: string[]
  region: string
  size: string
  image: number
  ssh_keys?: string[]
  ipv6?: boolean
  private_networking?: boolean
  user_data?: string
  monitoring?: boolean
  volumes?: string[]
  tags?: string[]
}

export interface IKernel {
  id: number,
  name: string,
  version: string
}

export interface IBackup {
  id: string,
  name: string,
  distribution: string,
  slug: string,
  public: boolean,
  regions: string[],
  created_at: string,
  type: string,
  min_disk_size: number,
  size_gigabytes: string
}

interface IDropletsService {
  create: (request: IDropletRequest) => Promise<IDroplet>
  createMany: (request: IDropletsRequest) => Promise<IDroplet[]>
  get: () => Promise<IDroplet[]>
  getById: (dropletId: string) => Promise<IDroplet>
  getByTag: (tagName: string) => Promise<IDroplet[]>
  kernels: (dropletId: string) => Promise<IKernel[]>
  snapshots: (dropletId: string) => Promise<ISnapshot[]>
  backups: (dropletId: string) => Promise<IBackup[]>
  actions: (dropletId: string) => Promise<IAction[]>
  delete: (dropletId: string) => Promise<number>
  deleteByTag: (tagName: string) => Promise<number>
  dropletNeighbors: (dropletId: string) => Promise<IDroplet[]>
  neighbors: () => Promise<IDroplet[]>
}

export default class Droplets implements IDropletsService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/droplets'
    this.client = oauthClient;
  }

  create(request: IDropletRequest): Promise<IDroplet> {
    return this.client.post(this.path, request).then((r) => {
      return r.data.droplet
    })
  }
  createMany(request: IDropletsRequest): Promise<IDroplet[]> {
    return this.client.post(this.path, request).then((r) => {
      return r.data.droplets
    })
  }
  get(): Promise<IDroplet[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.droplets
    })
  }
  getById(dropletId: string): Promise<IDroplet> {
    var uri = `${this.path}/${dropletId}`
    return this.client.get(uri).then((r) => {
      return r.data.droplet
    })
  }
  getByTag(tagName: string): Promise<IDroplet[]> {
    return this.client.get(this.path, { params: { tag_name: tagName } }).then((r) => {
      return r.data.droplets
    })
  }
  kernels(dropletId: string): Promise<IKernel[]> {
    var uri = `${this.path}/${dropletId}/kernels`
    return this.client.get(uri).then((r) => {
      return r.data.kernels
    })
  }
  snapshots(dropletId: string): Promise<ISnapshot[]> {
    var uri = `${this.path}/${dropletId}/snapshots`
    return this.client.get(uri).then((r) => {
      return r.data.snapshots
    })
  }
  backups(dropletId: string): Promise<IBackup[]> {
    var uri = `${this.path}/${dropletId}/backups`
    return this.client.get(uri).then((r) => {
      return r.data.backups
    })
  }
  actions(dropletId: string): Promise<IAction[]> {
    var uri = `${this.path}/${dropletId}/actions`
    return this.client.get(uri).then((r) => {
      return r.data.actions
    })
  }

  delete(dropletId: string): Promise<number> {
    var uri = `${this.path}/${dropletId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
  deleteByTag(tagName: string): Promise<number> {
    return this.client.delete(this.path, { params: { tag_name: tagName } }).then((r) => {
      return r.status
    })
  }
  dropletNeighbors(dropletId: string): Promise<IDroplet[]> {
    var uri = `${this.path}/${dropletId}/neighbors`
    return this.client.get(uri).then((r) => {
      return r.data.droplets
    })
  }
  neighbors(): Promise<IDroplet[]> {
    var uri = `/reports/droplet_neighbors`
    return this.client.get(uri).then((r) => {
      return r.data.neighbors
    })
  }

}