import { Web3, Web3Context, Web3Eth } from "web3";
import { EIP4337Plugin } from "../../src";

describe("EIP-4337 Plugin Tests", () => {
  it("should register EIP-4337 Plugin plugin on Web3Context instance", () => {
    const web3Context = new Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new EIP4337Plugin());
    expect(web3Context.EIP4337).toBeDefined();
  });

  it("should register EIP-4337 Plugin plugin on Web3Context instance", () => {
    const web3Context = new Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new EIP4337Plugin());
    expect(web3Context.EIP4337).toBeDefined();
  });

  it("should register EIP-4337 Plugin plugin on Web3Eth instance", () => {
    const web3Eth = new Web3Eth("http://127.0.0.1:8545");
    web3Eth.registerPlugin(new EIP4337Plugin());
    expect(web3Eth.EIP4337).toBeDefined();
  });

  describe("EIP4337Plugin method tests", () => {
    let web3Context: Web3;

    beforeAll(() => {
      web3Context = new Web3();
      web3Context.registerPlugin(new EIP4337Plugin());
      web3Context.setProvider("https://rpc-mumbai.maticvigil.com/");
    });

    it("should call rpcMethods.sendUserOperation with expected parameters", async () => {
      const entryPoint = "0x636c656d656e74";
      const userOperation = {
        sender: "0x9fd042a18e90ce326073fa70f111dc9d798d9a52",
        nonce: "123",
        initCode: "0x68656c6c6f",
        callData: "0x776F726C64",
        callGasLimit: "1000",
        verificationGasLimit: "2300",
        preVerificationGas: "3100",
        maxFeePerGas: "8500",
        maxPriorityFeePerGas: "1",
        paymasterAndData: "0x626c6f63746f",
        signature: "0x636c656d656e74",
      };
      const sendUserOperationSpy = jest.spyOn(
        web3Context.EIP4337,
        "sendUserOperation"
      );
      await web3Context.EIP4337.sendUserOperation(userOperation, entryPoint);
      expect(sendUserOperationSpy).toHaveBeenCalledWith(
        userOperation,
        entryPoint
      );
      sendUserOperationSpy.mockRestore();
    });
  });
});
