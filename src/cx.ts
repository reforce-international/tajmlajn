type AllowedType = string | number | null | undefined | CxMap;
type CxMap = { [key: string]: Omit<AllowedType, "CxMap"> };
type Input = AllowedType | AllowedType[];
export default function cx(obj?: Input) {
  let out = "";

  if (typeof obj === "string" || typeof obj === "number") return "" + obj || "";

  if (Array.isArray(obj))
    for (const val of obj) {
      const str = cx(val);
      if (str !== "") {
        out += (out && " ") + str;
      }
    }
  else
    for (var k in obj) {
      if (obj.hasOwnProperty(k) && obj[k]) out += (out && " ") + k;
    }

  return out;
}
