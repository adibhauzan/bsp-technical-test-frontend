import ProviderComponent from "@/components/layouts/provider-component";
import "../styles/tailwind.css";
import { Metadata } from "next";
import localFont from "next/font/local";
import "simplebar-react/dist/simplebar.min.css";
import "react-quill/dist/quill.snow.css";
import "tippy.js/dist/tippy.css";
import "react-datepicker/dist/react-datepicker.css";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    template: "%s | Asuransi Test",
    default: "Asuransi Test",
  },
};

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access_token = cookies().get("access_token")?.value;

  return (
    <html lang="id">
      <body className={inter.variable}>
        <ProviderComponent token={access_token}>{children}</ProviderComponent>
      </body>
    </html>
  );
}
