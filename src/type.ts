import {
  TransactionHash,
  HexString32Bytes,
  Uint,
  Address,
  Uint256,
  HexStringBytes,
  LogAPI,
  TransactionReceiptAPI,
} from "web3";

export interface UserOperation {
  sender: Address;
  nonce: Uint256;
  initCode: HexStringBytes;
  callData: HexStringBytes;
  callGasLimit?: Uint256;
  verificationGasLimit: Uint256;
  preVerificationGas: Uint256;
  maxFeePerGas?: Uint256;
  maxPriorityFeePerGas?: Uint256;
  paymasterAndData: HexStringBytes;
  signature: HexStringBytes;
}
export interface UserOperationRequire
  extends Omit<
    UserOperation,
    "callGasLimit" | "maxFeePerGas" | "maxPriorityFeePerGas"
  > {
  callGasLimit: Uint256;
  maxFeePerGas: Uint256;
  maxPriorityFeePerGas: Uint256;
}

export interface IUserOperation {
  readonly callData: HexStringBytes;
  readonly callGasLimit: Uint;
  readonly initCode: HexStringBytes;
  readonly maxFeePerGas: Uint;
  readonly maxPriorityFeePerGas: Uint;
  readonly nonce: Uint;
  readonly paymasterAndData: HexStringBytes;
  readonly preVerificationGas: Uint;
  readonly sender: Address;
  readonly signature: HexStringBytes;
  readonly verificationGasLimit: Uint;
}

export interface GetUserOperationByHashAPI {
  readonly blockHash: HexString32Bytes;
  readonly blockNumber: Uint;
  readonly entryPoint: Address;
  readonly transactionHash: TransactionHash;
  readonly userOperation: IUserOperation;
}

export interface EstimateUserOperationGasAPI {
  readonly preVerificationGas: Uint;
  readonly verificationGasLimit: Uint;
  readonly callGasLimit: Uint;
}

export interface GetUserOperationReceiptAPI {
  readonly userOpHash: HexString32Bytes;
  readonly entryPoint: Address;
  readonly sender: Address;
  readonly nonce: Uint;
  readonly paymaster: Address;
  readonly actualGasCost: Uint;
  readonly actualGasUsed: Uint;
  readonly success: boolean;
  readonly reason: HexStringBytes;
  readonly logs: LogAPI[];
  readonly receipt: TransactionReceiptAPI;
}
