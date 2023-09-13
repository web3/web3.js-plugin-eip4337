import { Web3PluginBase } from "web3";

export class EIP4337Plugin extends Web3PluginBase {
  public pluginNamespace = "EIP4337";

  public test(param: string): void {
    console.log(param);
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    EIP4337: EIP4337Plugin;
  }
}
