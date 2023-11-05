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
      web3Context.setProvider(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
      );
    });

    it("should call rpcMethods.sendUserOperation with expected parameters", async () => {
      const entryPoint = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789";
      const userOperation = {
        callData:
          "0xb61d27f6000000000000000000000000eeaf9e39057002eae4bea8bb4e65b01a9cfd59be000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000024a11cd748000000000000000000000000c7cae1986efb06d5e8041724b4a53ad165ffa02200000000000000000000000000000000000000000000000000000000",
        callGasLimit: "90112",
        initCode: "0x",
        maxFeePerGas: "3120000023",
        maxPriorityFeePerGas: "3120000023",
        nonce: "21",
        paymasterAndData:
          "0x1dbab8914a76e9c294bb192d6cec9dbec1939221000000000000000000000000000000000000000000000000000000006547fb8e0000000000000000000000000000000000000000000000000000000000000000f0ef3e129c0d71c3f435d6f44369786a37d41d451273ab48fd708f33eccf64e679449b3271c85f21635681a0ce36deea6c0eec10d2f035285e10f78f53dbe64e1c",
        preVerificationGas: "53049",
        sender: "0xeee27f0ffcdb2de96b431c22d8746f9af06f0d05",
        signature:
          "0x3120ae75f967562b2fded808d11e1a1ac380b337e730594a68815f6ecec4e6cb13dd676d458f9b99a48db01e28f0ca36ee2d47152bbf0a372a1048e36aafa06b1b",
        verificationGasLimit: "149084",
      };
      const sendSpy = jest.spyOn(web3Context.EIP4337, "sendUserOperation");
      await web3Context.EIP4337.sendUserOperation(userOperation, entryPoint);
      expect(sendSpy).toHaveBeenCalledWith(userOperation, entryPoint);
      sendSpy.mockRestore();
    });
  });
});
