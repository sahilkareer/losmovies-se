'use client'
import { useEffect, useState } from "react"
// import  Link  from "next/link"
import { encryptId } from "@/utils/chiffre"
import Image from "next/image"
import { TransitionLink } from "./TransitionLink"



// eslint-disable-next-line react/prop-types
const TitleCard = ({title, img, rating, year, titleId, type, date, unoptimize, sizes, cardType}) => {

    const [imageUrl, setImageUrl] = useState(null)
    const [released, setReleased] = useState(null)

    // check if the movie is released or not
    const isReleased = (datee) => {
        const today = new Date()
        const releaseDate = new Date(datee)
        return today > releaseDate
    }

    useEffect(() => {
        setReleased(isReleased(date))
            if (img?.includes('http') && img?.includes('https')) {
                setImageUrl(img);
            }else {
                setImageUrl(`https://image.tmdb.org/t/p/w300${img}`)
            }
        }, [])
        
        
    const replacedTitle = title.replace(/[\/\\?]/g, "-");
    const urlTitle = replacedTitle.replace(/ /g, "-").toLowerCase()
    const encID = encryptId(`${titleId}-${type == "movie" ? 'R' : "Y"}`)

  return ( 
      <div className={`mx-2 overflow-hidden relative w-[180px] h-fit ${cardType == "tops" ? "max-sm:w-[110px]" : "max-sm:w-[130px]"}`}>
          <TransitionLink href={`/info/${urlTitle}-${encID}`} title={title}>
                <div className={`w-full relative h-[270px] ${cardType == "tops" ? "max-sm:h-[165px]" : "max-sm:h-[195px]"} overflow-hidden rounded-md`}>
                {imageUrl && <Image 
                    src={imageUrl}
                    fill
                    sizes={sizes && sizes}
                    alt={title}
                    className="rounded-md hover:scale-110 transition duration-400"
                    unoptimized={unoptimize}
                    loading="lazy"
                />}
                </div>
            </TransitionLink>

                    {cardType !== "tops" && <span className="text-white block text-center px-2 font-texts text-xl">{title}</span>}
                    <span className={`absolute top-0 left-0 py-0.5 px-1 ${cardType == "tops" && "max-sm:text-[12px]"} rounded-br-md rounded-tl-md font-secondary ${type == "movie" ? "bg-c-primary" : "bg-c-secondary"} font-semibold text-white`}>{year?.substr(0, 4)}<span className="text-[10px]">{released ? "" : " NYR"}</span></span>
                    {type == "movie" | type == "tv" | type == "serie" && (<span className={`absolute max-sm:hidden top-5 -right-7 max-sm:top-2 max-sm:w-[80%] max-sm:text-[12px] text-sm py-0.5 px-1 w-[70%] text-center rotate-[45deg] font-secondary ${type == "movie" ? "bg-c-primary" : "bg-c-secondary"} font-semibold text-white`}>{type == "movie" ? "Movie" : "TV Show"}</span>)
                    } 
                    


        </div>
  )
}

export default TitleCard