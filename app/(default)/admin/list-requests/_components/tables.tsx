"use client";
// import React from "react";

// const Table = () => {
//   const data = [
//     {
//       noPolis: "BSP01.01.F15.20.00002.0",
//       jenis: "Asuransi Kebakaran",
//       noInvoice: "2020.K01.00002",
//       status: "Sudah Dibayar",
//     },
//     {
//       noPolis: "BSP01.01.F15.20.00003.0",
//       jenis: "Asuransi Kebakaran",
//       noInvoice: "2020.K01.00003",
//       status: "Sudah Dibayar",
//     },
//     {
//       noPolis: "Belum Terbit",
//       jenis: "Asuransi Kebakaran",
//       noInvoice: "2020.K01.00004",
//       status: "Belum Dibayar",
//     },
//     {
//       noPolis: "Belum Terbit",
//       jenis: "Asuransi Kebakaran",
//       noInvoice: "2020.K01.00007",
//       status: "Belum Dibayar",
//     },
//   ];

//   return (
//     <div className="container flex items-center my-auto mx-auto p-4 w-3/4">
//       <table className="min-w-full border-collapse border border-gray-300 bg-white">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-700">
//               No Polis
//             </th>
//             <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-700">
//               Jenis Penanggung
//             </th>
//             <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-700">
//               No Invoice
//             </th>
//             <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-700">
//               Status
//             </th>
//             <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-700">
//               Aksi
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               <td className="px-6 py-4 border border-gray-300 text-sm text-gray-700">
//                 {item.noPolis}
//               </td>
//               <td className="px-6 py-4 border border-gray-300 text-sm text-gray-700">
//                 {item.jenis}
//               </td>
//               <td className="px-6 py-4 border border-gray-300 text-sm text-gray-700">
//                 {item.noInvoice}
//               </td>
//               <td
//                 className={`px-6 py-4 border border-gray-300 text-sm font-medium ${
//                   item.status === "Sudah Dibayar"
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {item.status}
//               </td>
//               <td className="px-6 py-4 border border-gray-300 text-sm text-blue-600 font-medium">
//                 <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
//                   Lihat Rincian
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const Table = () => {
  // Data tabel
  const data = [
    {
      noPolis: "BSP01.01.F15.20.00002.0",
      jenisPenanggung: "Asuransi Kebakaran",
      noInvoice: "2020.K01.00002",
      status: "Sudah Dibayar",
      aksi: "Lihat Rincian",
    },
    {
      noPolis: "BSP01.01.F15.20.00003.0",
      jenisPenanggung: "Asuransi Kebakaran",
      noInvoice: "2020.K01.00003",
      status: "Sudah Dibayar",
      aksi: "Lihat Rincian",
    },
    {
      noPolis: "Belum Terbit",
      jenisPenanggung: "Asuransi Kebakaran",
      noInvoice: "2020.K01.00004",
      status: "Belum Dibayar",
      aksi: "Lihat Rincian",
    },
    {
      noPolis: "Belum Terbit",
      jenisPenanggung: "Asuransi Kebakaran",
      noInvoice: "2020.K01.00007",
      status: "Belum Dibayar",
      aksi: "Lihat Rincian",
    },
  ];

  // Kolom tabel
  const columns = [
    {
      accessorKey: "noPolis",
      header: "No Polis",
    },
    {
      accessorKey: "jenisPenanggung",
      header: "Jenis Penanggung",
    },
    {
      accessorKey: "noInvoice",
      header: "No Invoice",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => (
        <span
          className={`${
            info.getValue() === "Sudah Dibayar"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: () => (
        <button className="bg-blue-100 text-blue-600 py-1 px-3 rounded hover:bg-blue-200">
          Lihat Rincian
        </button>
      ),
    },
  ];

  // Membuat instance tabel
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Render tabel
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left px-4 py-2 border-b border-gray-300"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border-b border-gray-300"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
