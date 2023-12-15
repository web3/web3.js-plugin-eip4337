export type ValidInputTypes = Uint8Array | bigint | string | number | boolean;

export const convertValuesToHex = (
  obj: Record<string, any>
): Record<string, any> => {
  const hexObj: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string") {
      hexObj[key] = value.startsWith("0x") ? value : `0x${value}`;
    } else if (typeof value === "number" || typeof value === "bigint") {
      hexObj[key] = `0x${value.toString(16)}`;
    } else if (typeof value === "boolean") {
      hexObj[key] = value ? "0x1" : "0x0";
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      hexObj[key] = value;
    }
  });

  return hexObj;
};
