import * as Yup from "yup";

const insuranceFormSchema = Yup.object().shape({
  tenor: Yup.number()
    .required("Jangka waktu pertanggungan wajib diisi")
    .min(1, "Minimal 1 tahun"),
  occupancy_code: Yup.string().required("Pilihan okupasi wajib diisi"),
  construction: Yup.string().required("Tipe konstruksi wajib diisi"),
  building_price: Yup.number()
    .required("Harga bangunan wajib diisi")
    .min(100000, "Harga minimal adalah 100,000"),
  alamat: Yup.string()
    .required("Alamat wajib diisi")
    .min(10, "Alamat terlalu singkat"),
  province: Yup.string().required("Provinsi wajib diisi"),
  city: Yup.string().required("Kota/Kabupaten wajib diisi"),
  district: Yup.string().required("Daerah wajib diisi"),
  village: Yup.string().required("Desa/Kelurahan wajib diisi"),
  is_earthquake: Yup.number(),
});
