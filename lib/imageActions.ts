import { IAction } from "./actions"
import { AxiosInstance } from "axios"

interface IImageActionsService {
  transfer(imageId: string, region: string): Promise<IAction>
  convertToSnapshot(imageId: string): Promise<IAction>
  get(imageId: string, actionId: string): Promise<IAction>
}

export default class ImageActions implements IImageActionsService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/images'
    this.client = oauthClient
  }

  transfer(imageId: string, region: string): Promise<IAction> {
    var uri = `${this.path}/${imageId}/actions`
    return this.client.post(uri, { type: 'transfer', region }).then((r) => {
      return r.data.actions
    })
  }
  convertToSnapshot(imageId: string): Promise<IAction> {

    var uri = `${this.path}/${imageId}/actions`
    return this.client.post(uri, { type: 'convert' }).then((r) => {
      return r.data.actions
    })
  }
  get(imageId: string, actionId: string): Promise<IAction> {
    var uri = `${this.path}/${imageId}/actions/${actionId}`

    return this.client.get(uri).then((r) => {
      return r.data.action
    })
  }

}