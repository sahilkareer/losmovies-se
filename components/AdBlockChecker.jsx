"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";


const AdBlockChecker = () => {


//     const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "//acscdn.com/script/aclib.js"; // Replace with your real ad script URL
//     script.type = "text/javascript";
//     script.async = true;
//     script.id = "aclib";

//     script.onload = () => {setIsAdBlockEnabled(false); console.log("SCRIPT LOADED")};  // Script loaded successfully
//     script.onerror = () => {setIsAdBlockEnabled(true); console.log("SCRIPT DIDN't LOAD")};   // Script blocked by AdBlock

//     // Append the script to the body
//     document.body.appendChild(script);

//     // Cleanup by removing the script once the check is complete
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     if (isAdBlockEnabled) {
//       // Handle the case where AdBlock is enabled
//       console.log("AdBlock is enabled");
//       toast(
//         <div className="shadow-lg rounded-lg text-sm space-x-3 text-gray-300">
//           <h4 className="font-semibold text-white font-titles">Support Us, Your Way</h4>
//           <p className="mt-1 font-texts">
//             We understand your preference for an ad-free experience. Feel free to use adblock, but if you ever feel like supporting us, consider disabling it for a while. 😊
//           </p>
//       </div>);
//     }
//   }, [isAdBlockEnabled]);


  useEffect(() => {
 
        // await 2 seconds and then toast
        const toastFunc = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast(
                <div className="shadow-lg rounded-lg text-sm space-x-3 text-gray-300">
                    {/* <p className="font-semibold text-white font-titles">Enjoy a seamless experience with minimal ads!</p> */}
                    <p className="mt-1 font-texts">
                        {/* We are pleased to announce that we released a new version of our website! you can check it out at <a href="https://v3.yassflix.net" className="text-blue-500 hover:underline">V3</a>. */}
                        We&apos;d like to inform you that we&apos;re moving to our last version <a href="https://v3.yassflix.net" className="text-blue-500 hover:underline">V3</a> in the coming days. Don&apos;t worry, the current version will still be available in the future. and btw we added watchlist and filters to V3, as you requested. 
                    </p>
                </div>);
        }

        toastFunc();
  }, []);


  


  return (
    <>
    </>
  )
}

export default AdBlockChecker