import { Web3, Web3Context, Web3Eth } from "web3";

// @ts-ignore
import { EIP4337Plugin } from "web3-plugin-eip4337";

describe("EIP-4337 Plugin Tests", () => {
  it("should register EIP-4337 Plugin plugin on Web3Context instance", () => {
    const web3Context = new Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new EIP4337Plugin());
    // @ts-ignore
    expect(web3Context.EIP4337).toBeDefined();
  });

  it("should register EIP-4337 Plugin plugin on Web3Context instance", () => {
    const web3Context = new Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new EIP4337Plugin());
    // @ts-ignore
    expect(web3Context.EIP4337).toBeDefined();
  });

  it("should register EIP-4337 Plugin plugin on Web3Eth instance", () => {
    const web3Eth = new Web3Eth("http://127.0.0.1:8545");
    web3Eth.registerPlugin(new EIP4337Plugin());
    // @ts-ignore
    expect(web3Eth.EIP4337).toBeDefined();
  });

  describe("EIP-4337 Plugin method tests", () => {
    let web3Context: Web3;
    // let requestManagerSendSpy: jest.SpyInstance;

    beforeAll(() => {
      web3Context = new Web3();
      web3Context.registerPlugin(new EIP4337Plugin());
      //   requestManagerSendSpy = jest.spyOn(web3Context.requestManager, "send");
    });
  });
});
