"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ReportComponent = () => {


    const pathname = usePathname();

    const reportIssue = async (url) => {


        const data = { 
            name: "Chikh",
            email: "chikh@email.com",
            feedback: url,
            rating: 5,
        };
    
        const formKey = '7Q77nX0rnUWF5agHXzy1w4Beiu3R5BdT';
    
        // console.log("FETCHING...");
        await fetch(`https://send.pageclip.co/${formKey}`, {
        method: 'POST',
        //   mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log("Achof aaa lhaj rah kayen error")
            console.error(error);
        })
    
    }

    useEffect(() => {
        reportIssue(pathname)
    }, [pathname])

  return (
    <></>
  )
}

export default ReportComponent