"use client";

import { useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "./ui/button";


const FrameOnly = ({type, id}) => {


    const [selectedServer, setSelectedServer] = useState(1)

  return (
    <>
    <div className="w-screen h-screen absolute z-50 top-0 left-0 bg-c-back bg-opacity-90 flex justify-center items-center">

        {

                selectedServer === 2 ? (
                <iframe src={`https://vidsrc.xyz/embed/${type}?tmdb=${id}`}
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>):
                selectedServer === 1 ? (
                <iframe src={`https://vidsrc.cc/v3/embed/${type}/${id}`}
                referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>)
            :  (
                <iframe src={`                    
                    https://vidlink.pro/${type == "tv" ? "tv" : "movie"}/${id}?primaryColor=${type == "tv" ? 'ff6347' : "009ACD"}&secondaryColor=1e1e1e&iconColor=ffffff&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true
                    `}
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            )
            // :  (
            //     <iframe src={`
            //         https://autoembed.pro/embed/${type == "tv" ? "tv" : "movie"}/${id}
            //         `}
            //     // referrerPolicy="origin"
            //     allowFullScreen
            //     className="w-full h-full border-0 rounded-md"
            //     >
            // </iframe>
            // )

        }

            
      </div>

        <div className="absolute z-[60]">
        <Sheet >
      <SheetTrigger asChild className="fixed top-2 right-2 font-secondary">
        <Button>Change Server</Button>
      </SheetTrigger>
      <SheetContent className="bg-c-back">
        <SheetHeader>
          <SheetTitle className="text-white font-titles">Select Server</SheetTitle>
          <SheetDescription className="font-texts">
            Choose a server to watch the video.
          </SheetDescription>
        </SheetHeader>

        <ul className="flex flex-col gap-3 mt-3">
            <li onClick={() => setSelectedServer(1)} className={`text-white font-texts bg-transparent text-start ${selectedServer == 1 ? "bg-opacity-40" : "bg-opacity-0"} bg-slate-300 transition-all duration-200 rounded-md w-full cursor-pointer py-2 pl-2 hover:bg-opacity-40`}>Server 1</li>
            <li onClick={() => setSelectedServer(2)} className={`text-white font-texts bg-transparent text-start ${selectedServer == 2 ? "bg-opacity-40" : "bg-opacity-0"} bg-slate-300 transition-all duration-200 rounded-md w-full cursor-pointer py-2 pl-2 hover:bg-opacity-40`}>Server 2</li>
            <li onClick={() => setSelectedServer(3)} className={`text-white font-texts bg-transparent text-start ${selectedServer == 3 ? "bg-opacity-40" : "bg-opacity-0"} bg-slate-300 transition-all duration-200 rounded-md w-full cursor-pointer py-2 pl-2 hover:bg-opacity-40`}>Server 3</li>
        </ul>

      </SheetContent>
    </Sheet>
        </div>
    </>

  )
}

export default FrameOnly