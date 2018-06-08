import { IAction } from "./actions";
import { AxiosInstance } from "axios";

interface IFloatingIpActionsService {
  assign: (ipAddr: string) => Promise<IAction>
  unassign: (ipAddr: string) => Promise<IAction>
  get: (ipAddr: string) => Promise<IAction[]>
  getByActionId: (ipAddr: string, actionId: string) => Promise<IAction>
}

export default class FloatingIpActions implements IFloatingIpActionsService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/floating_ips'
    this.client = oauthClient;
  }

  assign(ipAddr: string): Promise<IAction> {
    var uri = `${this.path}/${ipAddr}/actions`
    return this.client.post(uri, { type: 'assign' }).then((r) => {
      return r.data.action
    })
  }
  unassign(ipAddr: string): Promise<IAction> {
    var uri = `${this.path}/${ipAddr}/actions`
    return this.client.post(uri, { type: 'unassign' }).then((r) => {
      return r.data.action
    })
  }
  get(ipAddr: string): Promise<IAction[]> {
    var uri = `${this.path}/${ipAddr}/actions`
    return this.client.get(uri).then((r) => {
      return r.data.actions
    })
  }
  getByActionId(ipAddr: string, actionId: string): Promise<IAction> {
    var uri = `${this.path}/${ipAddr}/actions/${actionId}`
    return this.client.get(uri).then((r) => {
      return r.data.action
    })
  }

}