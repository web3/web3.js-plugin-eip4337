import Web3 from "web3";
import { EIP4337Plugin } from "../../src";
import { UserOperation, UserOperationRequire } from "../../src/type";

describe("EIP-4337 Plugin Tests", () => {
  let web3Context: Web3;
  let sendSpy: jest.SpyInstance;
  const requestManagerSendSpy = jest.fn();

  beforeAll(() => {
    web3Context = new Web3();
    web3Context.registerPlugin(new EIP4337Plugin());
    web3Context.requestManager.send = requestManagerSendSpy;
  });

  it("should register TokensPlugin plugin on Web3 instance", () => {
    expect(web3Context.EIP4337).toBeDefined();
  });

  describe("EIP4337Plugin method tests", () => {
    let userOperation: UserOperation | UserOperationRequire;

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

    it("should call rpcMethods.estimateUserOperationGas with expected parameters", async () => {
      const entryPoint = "0x636c656d656e74";
      const estimateSpy = jest
        .spyOn(web3Context.EIP4337, "estimateUserOperationGas")
        .mockImplementation();
      await web3Context.EIP4337.estimateUserOperationGas(
        userOperation,
        entryPoint
      );
      expect(estimateSpy).toHaveBeenCalledWith(userOperation, entryPoint);
      estimateSpy.mockRestore();
    });

    it('should call rpcMethods.estimateUserOperationGas should set maxFeePerGas to "0" if not provided', async () => {
      const entryPoint = "0x636c656d656e74";
      const userOperationWithoutMaxFee = {
        ...userOperation,
        maxFeePerGas: undefined,
      };
      await web3Context.EIP4337.estimateUserOperationGas(
        userOperationWithoutMaxFee,
        entryPoint
      );

      expect(requestManagerSendSpy).toHaveBeenCalledWith({
        method: "eth_estimateUserOperationGas",
        params: [
          {
            ...userOperationWithoutMaxFee,
            maxFeePerGas: "0", // Ensure it's set to "0"
          },
          entryPoint,
        ],
      });
    });

    it('should call rpcMethods.estimateUserOperationGas should set maxPriorityFeePerGas to "0" if not provided', async () => {
      const entryPoint = "0x636c656d656e74";
      const userOperationWithoutMaxFee = {
        ...userOperation,
        maxPriorityFeePerGas: undefined,
      };
      await web3Context.EIP4337.estimateUserOperationGas(
        userOperationWithoutMaxFee,
        entryPoint
      );

      expect(requestManagerSendSpy).toHaveBeenCalledWith({
        method: "eth_estimateUserOperationGas",
        params: [
          {
            ...userOperationWithoutMaxFee,
            maxPriorityFeePerGas: "0", // Ensure it's set to "0"
          },
          entryPoint,
        ],
      });
    });

    it("should call rpcMethods.getUserOperationByHash with expected parameters", async () => {
      const hash =
        "0xa890d7c0dccfd6cebc025919f4857ab97953ae218e82f5e24c297f02ceea5b21";
      const estimateSpy = jest
        .spyOn(web3Context.EIP4337, "getUserOperationByHash")
        .mockImplementation();
      await web3Context.EIP4337.getUserOperationByHash(hash);
      expect(estimateSpy).toHaveBeenCalledWith(hash);
      estimateSpy.mockRestore();
    });

    it("should call rpcMethods.getUserOperationReceipt with expected parameters", async () => {
      const hash = "0x123456789abcdef0123456789abcdef012345678";
      const estimateSpy = jest
        .spyOn(web3Context.EIP4337, "getUserOperationReceipt")
        .mockImplementation();
      await web3Context.EIP4337.getUserOperationReceipt(hash);
      expect(estimateSpy).toHaveBeenCalledWith(hash);
      estimateSpy.mockRestore();
    });

    it("should call rpcMethods.supportedEntryPoints with expected parameters", async () => {
      const supportedEntryPointsSendSpy = jest
        .spyOn(web3Context.EIP4337.requestManager, "send")
        .mockResolvedValue([
          "0xcd01C8aa8995A59eB7B2627E69b40e0524B5ecf8",
          "0x7A0A0d159218E6a2f407B99173A2b12A6DDfC2a6",
        ]);

      const result = await web3Context.EIP4337.supportedEntryPoints();

      expect(supportedEntryPointsSendSpy).toHaveBeenCalledWith({
        method: "eth_supportedEntryPoints",
        params: [],
      });
      expect(result).toEqual([
        "0xcd01C8aa8995A59eB7B2627E69b40e0524B5ecf8",
        "0x7A0A0d159218E6a2f407B99173A2b12A6DDfC2a6",
      ]);
    });

    it("should call rpcMethods.generateUserOpHash with expected parameters", () => {
      const entryPoint = "0xaE036c65C649172b43ef7156b009c6221B596B8b";
      const chainId = "0x1";
      const expectedResult =
        "0xe554d0701f7fdc734f84927d109537f1ac4ee4ebfa3670c71d224a4fa15dbcd1";
      const result = web3Context.EIP4337.generateUserOpHash(
        userOperation as UserOperationRequire,
        entryPoint,
        chainId
      );

      expect(result).toEqual(expectedResult);
    });
    it("should call rpcMethods.generateUserOpHash with throws an error when sha3 returns undefined", () => {
      const userOp = {
        sender: "0x9fd042a18e90ce326073fa70f111dc9d798d9a52",
        nonce: "123",
        initCode: "",
        callData: "0x776F726C64",
        callGasLimit: "1000",
        verificationGasLimit: "2300",
        preVerificationGas: "3100",
        maxFeePerGas: "8500",
        maxPriorityFeePerGas: "1",
        paymasterAndData: "0x626c6f63746f",
        signature: "0x636c656d656e74",
      };
      const entryPoint = "0xaE036c65C649172b43ef7156b009c6221B596B8b";
      const chainId = "0x1";

      // Expect an error to be thrown
      expect(() =>
        web3Context.EIP4337.generateUserOpHash(userOp, entryPoint, chainId)
      ).toThrow("sha3 returned undefined");
    });
  });
});
