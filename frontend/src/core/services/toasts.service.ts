import Swal from "sweetalert2";
import themeService from "./theme.service";

export const getToast = (
  typeIcon: "success" | "error" | "warning" | "info",
  msg: string,
  timerProgressBar: boolean = false
) => {
  Swal.fire({
    toast: true,
    position: "top",
    showConfirmButton: false,
    icon: typeIcon,
    timerProgressBar,
    timer: 3000,
    title: msg,
    background: themeService.backgroundColor,
    color: themeService.textColor,
  });
};
