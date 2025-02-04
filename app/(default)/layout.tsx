import ContentAnimation from "@/components/layouts/content-animation";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header/header";
import MainContainer from "@/components/layouts/main-container";
import ScrollToTop from "@/components/layouts/scroll-to-top";
import Sidebar from "@/components/sidebar";
// import Portals from "@/components/portals";
import Overlay from "@/components/layouts/overlay";
// import PageBreadcrumb from "@/components/layouts/page-breadcrumb";
// import { useTranslations } from "next-intl";
import { getDecodedToken } from "@/lib/jwt";
import { cookies } from "next/headers";
// import "flatpickr/dist/flatpickr.css";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access_token = cookies().get("access_token")?.value;
  const level = getDecodedToken(access_token ?? "").Level;

  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        <MainContainer>
          <Overlay />
          <ScrollToTop />
          <div className="flex min-h-screen ">
            <Header />
            <Sidebar level={[level]} token={access_token ?? ""} />
            <div className="px-3 py-2 md:px-6 md:py-1"></div>
            <ContentAnimation>{children}</ContentAnimation>
          </div>
          <Footer />
        </MainContainer>
      </div>
    </>
  );
}
