import Axios, { AxiosInstance } from "axios";

interface IAccount {
  droplet_limit: number,
  floating_ip_limit: number,
  email: string,
  uuid: string,
  email_verified: boolean,
  status: string,
  status_message: string,
}

interface IAccountService {
  get: () => Promise<void | IAccount>
}

export default class Account implements IAccountService {
  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/account'
    this.client = oauthClient;
  }

  get(): Promise<void | IAccount> {
    return this.client.get(this.path).then((r) => {
      return r.data.account
    })
  }
}