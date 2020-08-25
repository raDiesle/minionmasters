import { toast } from "react-toastify";

export default function mToast(text, autoClose = 2000) {
  toast(text, { position: "bottom-right", autoClose, type: "dark" });
}
