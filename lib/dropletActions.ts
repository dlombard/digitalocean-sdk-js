import { IAction } from "./actions";
import { AxiosInstance } from "axios";

enum dropletActions {
  enable_backups,
  disable_backups,

}


interface IDropletActionsService {
  enableBackups: (dropletId: string) => Promise<IAction>
  disableBackups: (dropletId: string) => Promise<IAction>
  reboot: (dropletId: string) => Promise<IAction>
  powerCycle: (dropletId: string) => Promise<IAction>
  shutdown: (dropletId: string) => Promise<IAction>
  powerOff: (dropletId: string) => Promise<IAction>
  powerOn: (dropletId: string) => Promise<IAction>
  restore: (dropletId: string, image: string | number) => Promise<IAction>
  passwordReset: (dropletId: string) => Promise<IAction>
  resize: (dropletId: string, size: number, disk?: boolean) => Promise<IAction>
  rebuild: (dropletId: string, image: string | number) => Promise<IAction>
  rename: (dropletId: string, name: string) => Promise<IAction>
  changeKernel: (dropletId: string, kernel: number) => Promise<IAction>
  enableIPV6: (dropletId: string) => Promise<IAction>
  enablePrivateNetworking: (dropletId: string) => Promise<IAction>
  snapshot: (dropletId: string, name: string) => Promise<IAction>
  retrieve: (dropletId: string, actionId: string) => Promise<IAction>

  // By Tag
  powerCycleByTag: (tag: string) => Promise<IAction>
  shutdownByTag: (tag: string) => Promise<IAction>
  powerOffByTag: (tag: string) => Promise<IAction>
  powerOnByTag: (tag: string) => Promise<IAction>
  enableBackupsByTag: (tag: string) => Promise<IAction>
  disableBackupsByTag: (tag: string) => Promise<IAction>
  enableIPV6ByTag: (tag: string) => Promise<IAction>
  enablePrivateNetworkingByTag: (tag: string) => Promise<IAction>

  //do action
  execute: (dropletId: string, request: object) => Promise<any>
  executeByTag: (tag: string, request: object) => Promise<any>

}

export default class DropletActions implements IDropletActionsService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/droplets'
    this.client = oauthClient;
  }

  execute(dropletId: string, request: object): Promise<any> {
    var uri = `${this.path}/${dropletId}/actions`
    return this.client.post(uri, request).then((r) => {
      return r.data.action
    })
  }
  executeByTag(tag: string, request: object): Promise<any> {
    var uri = `${this.path}/actions`
    return this.client.post(this.path, request, { params: { tag_name: tag } }).then((r) => {
      return r.data.action
    })
  }

  enableBackups(dropletId: string): Promise<IAction> {
    const request = { type: 'enable_backups' }

    return this.execute(dropletId, request);
  }
  disableBackups(dropletId: string): Promise<IAction> {
    const request = { type: 'disable_backups' }

    return this.execute(dropletId, request);
  }
  reboot(dropletId: string): Promise<IAction> {
    const request = { type: 'reboot' }

    return this.execute(dropletId, request);
  }
  powerCycle(dropletId: string): Promise<IAction> {
    const request = { type: 'power_cycle' }

    return this.execute(dropletId, request);
  }
  shutdown(dropletId: string): Promise<IAction> {
    const request = { type: 'shutdown' }

    return this.execute(dropletId, request);
  }
  powerOff(dropletId: string): Promise<IAction> {
    const request = { type: 'power_off' }

    return this.execute(dropletId, request);
  }
  powerOn(dropletId: string): Promise<IAction> {
    const request = { type: 'power_on' }

    return this.execute(dropletId, request);
  }
  restore(dropletId: string, image: string | number): Promise<IAction> {
    const request = { type: 'restore', image }

    return this.execute(dropletId, request);
  }
  passwordReset(dropletId: string): Promise<IAction> {
    const request = { type: 'password_reset' }

    return this.execute(dropletId, request);
  }
  resize(dropletId: string, size: number, disk?: boolean | undefined): Promise<IAction> {
    var _disk = disk
    if (!disk) {
      _disk = false
    }
    const request = { type: 'resize', size, disk: _disk }

    return this.execute(dropletId, request);
  }
  rebuild(dropletId: string, image: string | number): Promise<IAction> {
    const request = { type: 'rebuild', image }

    return this.execute(dropletId, request);
  }
  rename(dropletId: string, name: string): Promise<IAction> {
    const request = { type: 'rename', name }

    return this.execute(dropletId, request);
  }
  changeKernel(dropletId: string, kernel: number): Promise<IAction> {
    const request = { type: 'change_kernel', kernel }

    return this.execute(dropletId, request);
  }
  enableIPV6(dropletId: string): Promise<IAction> {
    const request = { type: 'enable_ipv6' }

    return this.execute(dropletId, request);
  }
  enablePrivateNetworking(dropletId: string): Promise<IAction> {
    const request = { type: 'enable_private_networking' }

    return this.execute(dropletId, request);
  }
  snapshot(dropletId: string, name: string): Promise<IAction> {
    const request = { type: 'snapshot', name }

    return this.execute(dropletId, request);
  }
  retrieve(dropletId: string, actionId: string): Promise<IAction> {
    var uri = `${this.path}/${dropletId}/actions/${actionId}`

    return this.client.get(uri).then((r) => {
      return r.data.action
    })
  }
  // By Tag
  powerCycleByTag(tag: string): Promise<IAction> {
    const request = { type: 'power_cycle' }

    return this.executeByTag(tag, request);
  }
  shutdownByTag(tag: string): Promise<IAction> {
    const request = { type: 'shutdown' }

    return this.executeByTag(tag, request);
  }
  powerOffByTag(tag: string): Promise<IAction> {
    const request = { type: 'power_off' }

    return this.executeByTag(tag, request);
  }
  powerOnByTag(tag: string): Promise<IAction> {
    const request = { type: 'power_on' }

    return this.executeByTag(tag, request);
  }
  enableBackupsByTag(tag: string): Promise<IAction> {
    const request = { type: 'enable_backups' }

    return this.executeByTag(tag, request);
  }
  disableBackupsByTag(tag: string): Promise<IAction> {
    const request = { type: 'disable_backups' }

    return this.executeByTag(tag, request);
  }
  enableIPV6ByTag(tag: string): Promise<IAction> {
    const request = { type: 'enable_ipv6' }

    return this.executeByTag(tag, request);
  }
  enablePrivateNetworkingByTag(tag: string): Promise<IAction> {
    const request = { type: 'enable_private_networking' }

    return this.executeByTag(tag, request)
  }

}