import { AxiosInstance } from "axios";
import DOCursor from "./utils/DOCursor";

export interface IInboundRules {
  protocol: string,
  ports: string,
  sources: ISource[]
}

export interface IOutboundRules {
  protocol: string,
  ports: string,
  destinations: ISource[]
}

export interface ISource {
  addresses: string[],
  droplet_ids: number[],
  load_balancer_uids: string[],
  tags: string[]
}

export interface IFirewall {
  id: string,
  status: string,
  created_at: string,
  pending_changes: object[],
  name: string,
  inbound_rules: IInboundRules[],
  outbound_rules: IOutboundRules[],
  droplet_ids: number[],
  tags: string[]
}

export interface IFirewallRequest {
  name: string,
  inbound_rules: IInboundRules[],
  outbound_rules: IOutboundRules[],
  droplet_ids?: number[],
  tags?: string[]
}

interface IFirewallService {
  create: (request: IFirewallRequest) => Promise<IFirewall>
  getById: (firewallId: String) => Promise<IFirewall>
  get: () => DOCursor
  update: (firewallId: string, request: IFirewallRequest) => Promise<IFirewall>
  delete: (firewallId: String) => Promise<number>
  addDroplets: (firewallId: String, dropletIds: string[]) => Promise<number>
  removeDroplets: (firewallId: String, dropletIds: string[]) => Promise<number>
  addTags: (firewallId: String, tags: string[]) => Promise<number>
  removeTags: (firewallId: String, tags: string[]) => Promise<number>
  addRules: (firewallId: String, inboundRules: IInboundRules, outboundRules: IOutboundRules) => Promise<number>
  removeRules: (firewallId: String, inboundRules: IInboundRules, outboundRules: IOutboundRules) => Promise<number>
}

export default class Firewalls implements IFirewallService {

  client: AxiosInstance
  path: string
  constructor(oauthClient: AxiosInstance) {
    this.path = '/firewalls'
    this.client = oauthClient;
  }
  create(request: IFirewallRequest): Promise<IFirewall> {
    return this.client.post(this.path, request).then((r) => {
      return r.data.firewall
    })
  }
  getById(firewallId: String): Promise<IFirewall> {
    var uri = `${this.path}/${firewallId}`
    return this.client.get(uri).then((r) => {
      return r.data.firewall
    })
  }
  get(): DOCursor {
    var cursor = new DOCursor(this.client, this.path, undefined, 40)

    return cursor
  }
  update(firewallId: string, request: IFirewallRequest): Promise<IFirewall> {
    var uri = `${this.path}/${firewallId}`
    return this.client.put(uri, request).then((r) => {
      return r.data.firewall
    })
  }
  delete(firewallId: String): Promise<number> {
    var uri = `${this.path}/${firewallId}`
    return this.client.delete(uri).then((r) => {
      return r.status
    })
  }
  addDroplets(firewallId: String, dropletIds: string[]): Promise<number> {
    var uri = `${this.path}/${firewallId}/droplets`
    return this.client.post(uri, { droplet_ids: dropletIds }).then((r) => {
      return r.status
    })
  }
  removeDroplets(firewallId: String, dropletIds: string[]): Promise<number> {
    var uri = `${this.path}/${firewallId}/droplets`
    return this.client.delete(uri, { data: { droplet_ids: dropletIds } }).then((r) => {
      return r.status
    })
  }
  addTags(firewallId: String, tags: string[]): Promise<number> {
    var uri = `${this.path}/${firewallId}/tags`
    return this.client.post(uri, { tags }).then((r) => {
      return r.status
    })
  }
  removeTags(firewallId: String, tags: string[]): Promise<number> {
    var uri = `${this.path}/${firewallId}/tags`
    return this.client.delete(uri, { data: { tags } }).then((r) => {
      return r.status
    })
  }
  addRules(firewallId: String, inboundRules: IInboundRules, outboundRules: IOutboundRules): Promise<number> {
    var uri = `${this.path}/${firewallId}/rules`
    return this.client.post(uri, { inbound_rules: inboundRules, outbound_rules: outboundRules }).then((r) => {
      return r.status
    })
  }
  removeRules(firewallId: String, inboundRules: IInboundRules, outboundRules: IOutboundRules): Promise<number> {
    var uri = `${this.path}/${firewallId}/rules`
    return this.client.delete(uri, { data: { inbound_rules: inboundRules, outbound_rules: outboundRules } }).then((r) => {
      return r.status
    })
  }
}