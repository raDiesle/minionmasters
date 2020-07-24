import { toast } from "react-toastify";

export default function mToast(text) {
  toast(text, { position: "bottom-right", autoClose: 2000 });
}
