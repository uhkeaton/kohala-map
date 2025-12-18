import { toast } from "react-hot-toast";

export function assert(statement: boolean, message?: string) {
  if (!statement) {
    toast.error(message ? message : "Assertion failed.");
  }
}
