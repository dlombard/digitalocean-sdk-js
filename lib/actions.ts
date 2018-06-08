import { AxiosInstance } from "axios";


export interface IAction {

  id: number,
  status: string,
  type: string,
  started_at: string,
  completed_at: string,
  resource_id: number,
  resource_type: string,
  region: string | null,
  region_slug: string | null

}

interface IActionsService {
  get: () => Promise<void | IAction[]>,
  getById: (actionId: string) => Promise<void | IAction>
}

export default class Actions implements IActionsService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/actions'
    this.client = oauthClient;
  }

  get(): Promise<void | IAction[]> {
    return this.client.get(this.path).then((r) => {
      var actions: IAction[] = r.data.actions
      return actions
    }).catch((e) => {
      console.error(e)
    })
  }

  getById(actionId: string): Promise<void | IAction> {
    var uri = `/${this.path}/${actionId}`
    return this.client.get(uri).then((r) => {
      return r.data.action
    }).catch((e) => {
      console.error(e)
    })
  }
}