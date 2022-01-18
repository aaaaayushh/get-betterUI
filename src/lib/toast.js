import { toast } from "react-toastify";

export function SuccessToast(msg) {
  toast.success(msg, { position: toast.POSITION.TOP_CENTER });
}
export function ErrorToast(msg) {
  toast.error(msg, { position: toast.POSITION.TOP_CENTER });
}
