import { IAction } from "./actions";
import { AxiosInstance } from "axios";

export interface IVolumesService {
  attach: (volumeId: string, dropletId: string, region: string) => Promise<void | IAction>,
  attachByName: (dropletId: string, volumeName: string, region: string) => Promise<void | IAction>,
  detach: (volumeId: string, dropletId: string, region: string) => Promise<void | IAction>,
  detachByName: (dropletId: string, volumeName: string, region: string) => Promise<void | IAction>,
  resize: (volumeId: string, size_gigabytes: number, region: string) => Promise<void | IAction>,
  get: (volumeId: string, actionId: string) => Promise<void | IAction>,
  getActions: (volumeId: string) => Promise<void | IAction[]>,

}

export default class VolumesActions implements IVolumesService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/volumes'
    this.client = oauthClient;
  }

  attach(volumeId: string, dropletId: string, region: string): Promise<void | IAction> {
    var uri = `${this.path}/${volumeId}/actions`
    var request = {
      type: 'attach',
      droplet_id: dropletId,
      region: region ? region : null
    }
    return this.client.post(uri, request).then((r) => {
      return r.data.action
    }).catch((e) => {
      console.error(e)
    })

  }
  attachByName(dropletId: string, volumeName: string, region: string): Promise<void | IAction> {
    var uri = `${this.path}/actions`
    var request = {
      type: 'attach',
      droplet_id: dropletId,
      volume_name: volumeName,
      region: region ? region : null
    }
    return this.client.post(uri, request).then((r) => {
      return r.data.action
    }).catch((e) => {
      console.error(e)
    })

  }
  detach(volumeId: string, dropletId: string, region: string): Promise<void | IAction> {
    var uri = `${this.path}/${volumeId}/actions`
    var request = {
      type: 'detach',
      droplet_id: dropletId,
      region: region ? region : null
    }
    return this.client.post(uri, request).then((r) => {
      return r.data.action
    }).catch((e) => {
      console.error(e)
    })
  }
  detachByName(dropletId: string, volumeName: string, region: string): Promise<void | IAction> {
    var uri = `${this.path}/actions`
    var request = {
      type: 'detach',
      droplet_id: dropletId,
      volume_name: volumeName,
      region: region ? region : null
    }
    return this.client.post(uri, request).then((r) => {
      return r.data.action
    }).catch((e) => {
      console.error(e)
    })

  }
  resize(volumeId: string, size_gigabytes: number, region: string): Promise<void | IAction> {
    var uri = `${this.path}/${volumeId}/actions`
    var request = {
      type: 'resize',
      size_gigabytes: size_gigabytes,
      region: region ? region : null
    }
    return this.client.post(uri, request).then((r) => {
      return r.data.action
    }).catch((e) => {
      console.error(e)
    })
  }
  get(volumeId: string, actionId: string): Promise<void | IAction> {
    var uri = `${this.path}/${volumeId}/actions/${actionId}`
    return this.client.get(uri).then((r) => {
      return r.data.action
    }).catch((e) => {
      console.error(e)
    })
  }
  getActions(volumeId: string): Promise<void | IAction[]> {
    var uri = `${this.path}/${volumeId}/actions`
    return this.client.get(uri).then((r) => {
      var actions: IAction[] = r.data.actions
      return actions
    }).catch((e) => {
      console.error(e)
    })
  }

}