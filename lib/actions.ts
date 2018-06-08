import { AxiosInstance } from "axios";
import DOCursor from "./utils/DOCursor";


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
  get: () => DOCursor,
  getById: (actionId: string) => Promise<void | IAction>
}

export default class Actions implements IActionsService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/actions'
    this.client = oauthClient;
  }

  get(): DOCursor {
    var cursor = new DOCursor(this.client, this.path, undefined, 40)

    return cursor
  }

  getById(actionId: string): Promise<void | IAction> {
    var uri = `/${this.path}/${actionId}`
    return this.client.get(uri).then((r) => {
      return r.data.action
    })
  }
}