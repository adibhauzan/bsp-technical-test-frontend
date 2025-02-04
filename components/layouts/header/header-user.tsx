"use client";

import Dropdown from "@/components/dropdown";
import IconUser from "@/components/icons/icon-user";
import Image from "next/image";
import Link from "next/link";
import LogoutModal from "./logout-modal";
import { useState, useEffect } from "react";
import { IUser } from "@/lib/validation/form/form-user";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sweet-alert";
import { decodeJwt } from "jose";
import { getClientCookieValue } from "@/lib/jwt";
import { API } from "@/lib/api";

const HeaderUser = () => {
  const token = getClientCookieValue("access_token");
  const decodedToken = token ? decodeJwt(token) : null;
  const router = useRouter();

  const [user, setUser] = useState<IUser>();
  const [imageProfileURL, setImageProfileURL] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await API.GET("auth/me", token ?? "");
        if (res.code === 200) {
          setUser(res.data["user"]);
        } else {
          toast.fire({
            icon: "error",
            title: `${res?.status}\n${res?.message}`,
            padding: "10px 20px",
          });
          deleteCookie("access_token");
          deleteCookie("refresh_token");
          router.push("/sign-in");
        }
      } catch (error: any) {
        console.error(error);
        toast.fire({
          icon: "error",
          title: `catch error: ${error.message}`,
          padding: "10px 20px",
        });
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, router]);

  useEffect(() => {
    let objectUrl: string | undefined;

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [user, token]);

  if (loading) {
    return (
      <span className="h-4 w-4">
        <span className="inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span>
      </span>
    );
  }

  //   if (!user) {
  //     return null;
  //   }

  return (
    <></>
    // <div className="dropdown flex shrink-0">
    //   <Dropdown
    //     offset={[0, 0]}
    //     placement="bottom-end"
    //     btnClassName="relative group block"
    //     button={
    //       <Image
    //         className="h-9 w-9 rounded-full object-cover"
    //         src={imageProfileURL || "/assets/images/gedung-bsp-low.png"}
    //         alt="userProfile"
    //         width={40}
    //         height={40}
    //       />
    //     }
    //   >
    //     <ul className="w-[350px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
    //       <li>
    //         <div className="flex items-center px-4 py-2">
    //           <Image
    //             className="h-12 w-12 rounded-md object-cover"
    //             src={imageProfileURL || "/assets/images/gedung-bsp-low.png"}
    //             alt="userProfile"
    //             width={36}
    //             height={36}
    //           />
    //           <div className="pl-4">
    //             <h4 className="text-base">{user?.name}</h4>
    //             <span className="rounded bg-success-light px-1 text-xs text-success">
    //               {decodedToken?.aud}
    //             </span>
    //             <button
    //               type="button"
    //               className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
    //             >
    //               {user?.email}
    //             </button>
    //           </div>
    //         </div>
    //       </li>
    //       <li>
    //         <Link
    //           href={`${decodedToken?.Level === "1" ? "/admin" : "/customer"}/profil`}
    //           className="dark:hover:text-white"
    //         >
    //           <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
    //         </Link>
    //       </li>

    //       <li className="border-t border-white-light dark:border-white-light/10">
    //         <LogoutModal token={token ?? ""} title="Logout" />
    //       </li>
    //     </ul>
    //   </Dropdown>
    // </div>
  );
};

export default HeaderUser;
