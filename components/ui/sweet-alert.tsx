import Swal from "sweetalert2";

export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-secondary ltr:mr-3 rtl:ml-3",
    cancelButton: "btn btn-dark ",
    popup: "sweet-alerts",
  },
  buttonsStyling: false,
});

export const toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
});
