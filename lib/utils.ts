import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Swal from "sweetalert2";
import {
  addDays,
  differenceInMonths,
  differenceInYears,
  format,
  parseISO,
  startOfDay,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
});

export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-secondary",
    cancelButton: "btn btn-dark ltr:mr-3 rtl:ml-3",
    popup: "sweet-alerts",
  },
  buttonsStyling: false,
});

//date
export function getTodayDate(): string {
  const today = new Date();
  today.setDate(today.getDate()); // Menambahkan satu hari
  return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
}

export function getMinEndDate(startDate: Date): Date {
  return addDays(startDate, 1); // Mengatur batas minimum untuk end_date
}

// ten million
export const manyNumber = 10000000;

/**
 * Regex for phone number
 * Phone number should not start with 62 or 0
 */
export const phonePrefix: RegExp = /^(?:-|(?!(62|0))\d+)$/;

export const truncateFileName = (
  fileName: string,
  maxLength: number
): string => {
  if (fileName?.length > maxLength) {
    return `${fileName.substring(0, maxLength - 3)}...`;
  }
  return fileName;
};

export const formatDecimal = (
  value: string | number,
  toDisplay: boolean = true
) => {
  if (toDisplay) {
    return String(value).replace(".", ","); // Format untuk tampilan
  }
  return String(value).replace(",", "."); // Format untuk backend
};

/**
 * Formats and validates a percentage input value.
 *
 * - Menghapus karakter selain angka dan koma.
 * - Mengubah koma ke titik untuk parsing.
 * - Membatasi nilai maksimum hingga 100.
 * - Mengembalikan nilai dalam format string yang valid.
 * - Contoh penggunaan untuk field commision, pppop, addtional cost, fee base dll
 *
 * @param value - Nilai input yang akan diformat.
 * @returns Nilai terformat.
 */

export const formatPercentageInput = (value: string): string => {
  value = value.replace(/[^0-9,]/g, "");
  const floatValue = parseFloat(value.replace(",", "."));

  if (floatValue > 100) {
    return "100";
  }
  return value;
};

/**
 * Fungsi utilitas untuk menampilkan notifikasi menggunakan SweetAlert2.
 * @param icon - Jenis ikon ('info', 'warning', 'success', 'error').
 * @param title - Judul notifikasi.
 * @param text - Pesan teks untuk notifikasi.
 * @param timer - Opsional: Durasi untuk auto-close (dalam milidetik).
 * @param options - Opsional: Properti tambahan untuk konfigurasi SweetAlert2.
 */
export const showSwalAlert = (
  icon: "info" | "warning" | "success" | "error",
  title: string,
  text: string,
  options: Record<string, any> = {}
): void => {
  Swal.fire({
    icon,
    title,
    text,
    ...options,
  });
};

export const onLyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
    e.preventDefault();
  }
};

export const calculateDuration = (start: string, end: string) => {
  if (!start || !end) return { totalYears: 0, totalMonths: 0 };

  const startDate = parseISO(start);
  const endDate = parseISO(end);

  const totalYears = differenceInYears(endDate, startDate);
  const months = differenceInMonths(endDate, startDate);

  // Menghitung sisa bulan setelah jumlah tahun
  const totalMonths = months - totalYears * 12;

  return { totalYears, totalMonths };
};

export const formatToISO = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

export const placeholderMapping: any = {
  NAMAPT: "insurance_partner",
  TIPEASURANSI: "insurance_type",
  PRODUKASURANSI: "insurance_product",
};

export const priorityOrder: Record<string, string[]> = {
  FPA: ["-"],
  HD: ["-"],
  LC: ["-"],
  PK: ["-"],
  // RiPLAY: ["Ringkasan Informasi Produk dan Layanan (RIPLAY) - UMUM Asuransi Jiwa Kredit Berjangka Menurun", 'Fitur Utama Asuransi Jiwa', 'MANFAAT', 'RISIKO', 'BIAYA', 'Pengecualian', 'Pengajuan Asuransi', 'Pembayaran Premi', 'Pengajuan Klaim'],
  IT: [
    "Arti Istilah",
    "Tenggang Waktu (Grace Period)",
    "Pengembalian Premi (Refund Premi)",
    "Perubahan Manfaat",
    "Disclaimer (penting untuk dibaca)",
  ],
};

export const sortByPriority = (code: string, items: any[]) => {
  const order = priorityOrder[code] || [];
  return items?.sort((a, b) => {
    const indexA = order.indexOf(a.value);
    const indexB = order.indexOf(b.value);
    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  });
};

export const replacePlaceholders = (template: any, values: any) => {
  if (!template) return;
  return template.replace(/{(.*?)}/g, (_: any, key: any) => {
    const apiKey = placeholderMapping[key];
    return values?.[apiKey] || `{${key}}`;
  });
};

export const convertToSnakeCase = (input: string) => {
  return input.toLowerCase().split(" ").join("_");
};

export const parseOptions = (options: string) =>
  options.split(";").map((option) => ({
    label: option,
    value: option,
  }));

const prefixes = ["app_", "spajk_", "fpa_", "mdc_"];

export const mappingPayloadOnBoarding = (payload: any) => {
  let products = [];

  const onlyDataStep = Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => {
      const hasPrefix = prefixes.some((prefix) => key.startsWith(prefix));

      if (hasPrefix) {
        if (value instanceof File || value instanceof Blob) {
          return false;
        }
        return true;
      }
      return false;
    })
  );

  if (payload?.fpa_fire_insurance?.policies_final_number) {
    const data = payload?.insurance_partner?.["Asuransi Kebakaran"]?.find(
      (value: any) =>
        value?.policies_final_number ===
        payload?.fpa_fire_insurance?.policies_final_number
    );

    products.push({
      insurance_partner_code: data?.insurance_partner_code,
      insurance_type_code: data?.insurance_type_code,
      insurance_product_code: data?.insurance_product_code,
      description: data?.description || "",
      insurance_policies_final_number:
        payload?.fpa_fire_insurance?.policies_final_number,
      is_expansion: 0,
    });
  }

  if (payload?.fpa_insurance_life?.policies_final_number) {
    const data = payload?.insurance_partner?.["Asuransi Jiwa Kredit"]?.find(
      (value: any) =>
        value?.policies_final_number ===
        payload?.fpa_insurance_life?.policies_final_number
    );

    products.push({
      insurance_partner_code: data?.insurance_partner_code,
      insurance_type_code: data?.insurance_type_code,
      insurance_product_code: data?.insurance_product_code,
      description: data?.description || "",
      insurance_policies_final_number:
        payload?.fpa_insurance_life?.policies_final_number,
      is_expansion: 0,
    });
  }

  if (
    payload?.onboarding_field_extensions &&
    payload?.fpa_fire_insurance?.policies_final_number
  ) {
    payload?.onboarding_field_extensions?.filter((value: any) => {
      if (payload?.[`fpa_${convertToSnakeCase(value?.expansion_name)}`]) {
        products.push({
          insurance_partner_code:
            payload?.fpa_fire_insurance?.insurance_partner_code,
          insurance_type_code: value?.insurance_type_code,
          insurance_product_code: value?.expansion_code,
          description: value?.description || "",
          insurance_policies_final_number: "",
          is_expansion: 1,
        });
      }

      products.push();
    });
  }

  const healthDeclarations = payload?.spajk_disease_screening?.map(
    (value: any) => {
      return {
        health_declaration_id: value?.health_declaration_id,
        value: 0,
        description: value?.input,
      };
    }
  );

  const documents = payload?.mdc_upload
    ? payload?.mdc_upload?.map((value: any) => {
        return {
          document_id: value?.document_id,
          file: value?.file,
        };
      })
    : [];

  return {
    final_quotation_number: payload?.final_quotation_number,
    number: payload?.number,
    transaction_date: formatToISO(new Date()),
    reference_number: payload?.reference_number,
    xfrom: payload?.xfrom,
    customer_id: payload?.customer_id,
    mailing_person: payload?.mailing_person,
    mailing_phone: payload?.mailing_phone,
    mailing_address: payload?.mailing_address,
    remarks: JSON.stringify({}),
    is_lien_clause:
      payload?.is_lien_clause && payload?.mdc_req === "lien clause" ? 1 : 0,
    is_cover: payload?.is_cover && payload?.mdc_req === "full cover" ? 1 : 0,
    description: "-",
    insureds: [
      {
        insured_type_id: 2,
        start_date: format(payload?.start_date, "yyyy-MM-dd"),
        end_date: format(payload?.end_date, "yyyy-MM-dd"),
        value: payload?.amount,
        remarks: [onlyDataStep],
        description: "-",
      },
    ],
    health_declarations: [...healthDeclarations],
    documents: [...documents],
    products: [...products],
  };
};

export const formatMenu = (forms: any, newPathname: string) => {
  if (forms?.length <= 0 || !newPathname) return null;
  let currentMenu;
  forms?.forEach((division: any) => {
    division.menus.forEach((menu: any) => {
      const fullMenuPath = menu.xURL;
      if (newPathname === fullMenuPath) {
        currentMenu = menu;
      }

      const isSubMenuActive = menu.submenus?.find(
        (submenu: any) => newPathname === submenu.xURL
      );
      if (!!isSubMenuActive) {
        currentMenu = isSubMenuActive;
      }
    });
  });

  return currentMenu;
};
