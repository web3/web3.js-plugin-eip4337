import { AbiInput, Address, Uint256, HexStringBytes } from "web3";
import { encodeParameters } from "web3-eth-abi";
import { sha3 } from "web3-utils";
import { UserOperationRequire } from "../type";

const sha3Checked = (data: string): string => {
  const result = sha3(data);
  if (result === undefined) {
    throw new Error("sha3 returned undefined");
  }
  return result;
};

export const generateUserOpHash = (
  userOp: UserOperationRequire,
  entryPoint: string,
  chainId: string
): string => {
  const types: AbiInput[] = [
    "address",
    "uint256",
    "bytes32",
    "bytes32",
    "uint256",
    "uint256",
    "uint256",
    "uint256",
    "uint256",
    "bytes32",
  ];

  const values: (Address | Uint256 | HexStringBytes)[] = [
    userOp.sender,
    userOp.nonce,
    sha3Checked(userOp.initCode),
    sha3Checked(userOp.callData),
    userOp.callGasLimit,
    userOp.verificationGasLimit,
    userOp.preVerificationGas,
    userOp.maxFeePerGas,
    userOp.maxPriorityFeePerGas,
    sha3Checked(userOp.paymasterAndData),
  ];

  const packed: string = encodeParameters(types, values);

  const enctype: AbiInput[] = ["bytes32", "address", "uint256"];
  const encValues: string[] = [sha3Checked(packed), entryPoint, chainId];
  const enc: string = encodeParameters(enctype, encValues);

  return sha3Checked(enc);
};
