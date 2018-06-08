import httpclient from "./http/httpclient";
import { AxiosInstance } from "axios";
import Account from './account'
import Actions from "./actions";
import Volumes from "./volumes";
import VolumesActions from "./volumesActions";
import Certificates from "./certificates";
import Domains from './domains';
import DomainRecords from "./domainRecords";
import Droplets from "./droplets";
import DropletActions from "./dropletActions";
import FloatingIps from "./floatingIps";
import IFloatingIpActions from "./floatingIpActions";
import FloatingIpActions from "./floatingIpActions";
import Regions from "./regions";
import Sizes from "./sizes";
import Firewalls from "./firewalls";
import Images from "./images";
import ImageActions from "./imageActions";
import LoadBalancers from "./loadBalancers";
import Snapshots from "./snapshots";
import SSHKeys from "./sshKeys";
import Tags from "./tags";

export default class DigitalOcean {
  oauthClient: AxiosInstance;
  account: Account
  actions: Actions
  volumes: Volumes
  volumesActions: VolumesActions
  certificates: Certificates
  domains: Domains
  domainRecords: DomainRecords
  droplets: Droplets
  dropletActions: DropletActions
  floatingIps: FloatingIps
  floatingIpActions: FloatingIpActions
  firewalls: Firewalls
  images: Images
  imageActions: ImageActions
  loadBalancers: LoadBalancers
  regions: Regions
  sizes: Sizes
  snapshots: Snapshots
  sshKeys: SSHKeys
  tags: Tags
  constructor(oauthClient: AxiosInstance) {
    this.oauthClient = oauthClient
    this.account = new Account(this.oauthClient)
    this.actions = new Actions(this.oauthClient)
    this.volumes = new Volumes(this.oauthClient)
    this.volumesActions = new VolumesActions(this.oauthClient)
    this.certificates = new Certificates(this.oauthClient)
    this.domains = new Domains(this.oauthClient)
    this.domainRecords = new DomainRecords(this.oauthClient)
    this.droplets = new Droplets(this.oauthClient)
    this.dropletActions = new DropletActions(this.oauthClient)
    this.floatingIps = new FloatingIps(this.oauthClient)
    this.floatingIpActions = new FloatingIpActions(this.oauthClient)
    this.firewalls = new Firewalls(this.oauthClient)
    this.images = new Images(this.oauthClient)
    this.imageActions = new ImageActions(this.oauthClient)
    this.loadBalancers = new LoadBalancers(this.oauthClient)

    this.regions = new Regions(this.oauthClient)
    this.sizes = new Sizes(this.oauthClient)
    this.snapshots = new Snapshots(this.oauthClient)
    this.sshKeys = new SSHKeys(this.oauthClient)
    this.tags = new Tags(this.oauthClient)
  }

}