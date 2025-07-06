"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({children,href,...props}) => {


    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {

        const body = document.querySelector(".main-content");

        const func = async () => {
            await sleep(500)
            body.classList.remove("page-transition");
        }

        if (body) {
            func()
        }


    }, [pathname])




    const handleTransition = async (e) => {
        e.preventDefault();
        const body = document.querySelector(".main-content");

        await router.prefetch(href);

        body?.classList.add("page-transition");

        await sleep(300);

        router.push(href, { scroll: true });


    }

  return (
    <Link {...props} href={href} onClick={handleTransition} prefetch={false}>
      {children}
    </Link>
  );
};