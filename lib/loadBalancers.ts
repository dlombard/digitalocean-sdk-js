import { IRegion } from './regions'
import { AxiosInstance } from 'axios';

export interface IForwardingRule {
  entry_protocol: string,
  entry_port: number,
  target_protocol: string,
  target_port: number,
  certificate_id?: string,
  tls_passthrough?: boolean
}

export interface IHealthCheck {
  protocol?: string,
  port?: number,
  path: string,
  check_interval_seconds: number,
  response_timeout_seconds: number,
  unhealthy_threshold: number,
  healthy_threshold: number
}
export interface IStickySession {
  type: string,
  cookie_name: string,
  cookie_ttl_seconds: string
}

export interface ILoadBalancer {
  id: string,
  name: string,
  ip: string,
  algorithm: string,
  status: string,
  created_at: string,
  forwarding_rules: IForwardingRule,
  health_check: IHealthCheck,
  sticky_sessions: IStickySession,
  region: IRegion,
  tag: string,
  droplet_ids: number[],
  redirect_http_to_https: boolean
}

export interface ILoadBalancerRequest {
  name: string,
  algorithm?: string,
  forwarding_rules: IForwardingRule[],
  health_check?: IHealthCheck,
  sticky_sessions?: IStickySession,
  region: string,
  tag?: string,
  droplet_ids?: number[],
  redirect_http_to_https?: boolean
}

interface ILoadBalancerService {
  create: (request: ILoadBalancerRequest) => Promise<ILoadBalancer>
  getById: (lbId: string) => Promise<ILoadBalancer>
  get: () => Promise<ILoadBalancer[]>
  update: (lbId: string, request: ILoadBalancerRequest) => Promise<ILoadBalancer>
  delete: (lbId: string) => Promise<number>
  addDroplets: (lbId: string, dropletIds: string[]) => Promise<number>
  removeDroplets: (lbId: string, dropletIds: string[]) => Promise<number>
  addForwardingRules: (lbId: string, forwardingRules: IForwardingRule[]) => Promise<number>
  removeForwardingRules: (lbId: string, forwardingRules: IForwardingRule[]) => Promise<number>


}

export default class LoadBalancers implements ILoadBalancerService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/load_balancers'
    this.client = oauthClient;
  }

  create(request: ILoadBalancerRequest): Promise<ILoadBalancer> {

    return this.client.post(this.path, request).then((r) => {
      return r.data.load_balancer
    })
  }
  getById(lbId: string): Promise<ILoadBalancer> {
    var uri = `${this.path}/${lbId}`
    return this.client.get(uri).then((r) => {
      return r.data.load_balancer
    })
  }
  get(): Promise<ILoadBalancer[]> {
    return this.client.get(this.path).then((r) => {
      return r.data.load_balancers
    })
  }
  update(lbId: string, request: ILoadBalancerRequest): Promise<ILoadBalancer> {

    var uri = `${this.path}/${lbId}`
    return this.client.put(uri, request).then((r) => {
      return r.data.load_balancer
    })
  }
  delete(lbId: string): Promise<number> {
    var uri = `${this.path}/${lbId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
  addDroplets(lbId: string, dropletIds: string[]): Promise<number> {
    var uri = `${this.path}/${lbId}/droplets`
    return this.client.post(uri, { droplet_ids: dropletIds }).then((r) => {
      return r.status
    })
  }
  removeDroplets(lbId: string, dropletIds: string[]): Promise<number> {
    var uri = `${this.path}/${lbId}/droplets`
    return this.client.delete(uri, { data: { droplet_ids: dropletIds } }).then((r) => {
      return r.data.status
    })
  }
  addForwardingRules(lbId: string, forwardingRules: IForwardingRule[]): Promise<number> {
    var uri = `${this.path}/${lbId}/forwarding_rules`
    return this.client.post(uri, { forwarding_rules: forwardingRules }).then((r) => {
      return r.status
    })
  }
  removeForwardingRules(lbId: string, forwardingRules: IForwardingRule[]): Promise<number> {
    var uri = `${this.path}/${lbId}/forwarding_rules`
    return this.client.delete(uri, { data: { forwarding_rules: forwardingRules } }).then((r) => {
      return r.status
    })
  }
}