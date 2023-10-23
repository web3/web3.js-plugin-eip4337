import Web3 from "web3";
import { EIP4337Plugin } from "../src";
import { UserOperation } from "../src/type";

describe("EIP4337Plugin Tests", () => {
  let web3Context: Web3;
  let sendSpy: jest.SpyInstance;

  beforeAll(() => {
    web3Context = new Web3();
    web3Context.registerPlugin(new EIP4337Plugin());
  });

  it("should register TokensPlugin plugin on Web3 instance", () => {
    expect(web3Context.EIP4337).toBeDefined();
  });

  describe("EIP4337Plugin method tests", () => {
    let userOperation: UserOperation;

    beforeEach(() => {
      userOperation = {
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
      sendSpy = jest
        .spyOn(web3Context.EIP4337, "sendUserOperation")
        .mockImplementation();
    });

    afterEach(() => {
      sendSpy.mockRestore();
    });

    it("should call rpcMethods.sendUserOperation with expected parameters", async () => {
      const entryPoint = "0x636c656d656e74";
      await web3Context.EIP4337.sendUserOperation(userOperation, entryPoint);
      expect(sendSpy).toHaveBeenCalledWith(userOperation, entryPoint);
    });

    // it("should call rpcMethods.estimateUserOperationGas with expected parameters", async () => {
    //   const entryPoint = "0x636c656d656e74";
    //   await web3Context.EIP4337.estimateUserOperationGas(
    //     userOperation,
    //     entryPoint
    //   );
    //   expect(sendSpy).toHaveBeenCalledWith(userOperation, entryPoint);
    // });

    // it('should set maxFeePerGas to "0" if not provided', async () => {
    //   const entryPoint = "0x636c656d656e74";
    //   const userOperationWithoutMaxFee = {
    //     ...userOperation,
    //     maxFeePerGas: undefined,
    //   };
    //   await web3Context.EIP4337.estimateUserOperationGas(
    //     userOperationWithoutMaxFee,
    //     entryPoint
    //   );
    //   sendSpy = jest
    //     .spyOn(web3Context.EIP4337, "estimateUserOperationGas")
    //     .mockImplementation();
    //   expect(sendSpy).toHaveBeenCalledWith(
    //     web3Context.requestManager,
    //     expect.objectContaining({
    //       ...userOperationWithoutMaxFee,
    //       maxFeePerGas: "0", // Ensure it's set to "0"
    //     }),
    //     entryPoint
    //   );
    // });
  });
});
