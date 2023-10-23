import { UserOperation } from "../type";

export type ValidInputTypes = Uint8Array | bigint | string | number | boolean;

export const isHexStrict = (hex: ValidInputTypes): boolean =>
  typeof hex === "string" && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);

/**
 * UserOperation a full user-operation struct. All fields MUST be set as hex values. empty bytes block (e.g. empty initCode) MUST be set to "0x"
 * @param userOperation - represents the structure of a transaction initiated by the user. It contains the sender, receiver, call data, maximum fee per unit of Gas, maximum priority fee, signature, nonce, and other specific elements.
 * @returns boolean
 */
export const isUserOperationAllHex = (userOperation: UserOperation): boolean =>
  Object.values(userOperation).every(isHexStrict);
