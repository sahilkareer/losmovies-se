import { encryptId } from "@/utils/chiffre";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export const removedContent = ["thelma-2103779182", "cuckoo-1738579182"];


export const getAdCashLibrary = async () => {

    // https://adbpage.com/adblock?v=3&format=js


    try {
        const response = await fetch("https://adbpage.com/adblock?v=3&format=js", { next: { revalidate: 600 } });

        const data = await response.text();

        return data;
    } catch (error) {
        console.error(error);
    }
    
    }


export const getSlug = (show) => {


    const title = show.title || show.name;
    const replacedTitle = title.replace(/[\/\\?]/g, "-");
    const urlTitle = replacedTitle.replace(/ /g, "-").toLowerCase()
    const encID = encryptId(`${show?.id}-${show?.media_type == "movie" ? 'R' : "Y"}`)

    return `${urlTitle}-${encID}`;

}


export async function getTrendingAll(page) {
//   const { data } = await tmdbClient.get<TmdbPagingResponse>(
//     `/trending/all/week?language=en-US&page=${page}`,
//   );

    const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${page}&api_key=${process.env.CHIKH_TMDB_API_KEY}`, { next: { revalidate: 600 } });
    const data = await response.json();

    console.log(data);



  return data;
}