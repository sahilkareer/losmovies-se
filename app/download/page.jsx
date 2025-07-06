import { removedContent } from "@/lib/utils";
import { decryptId } from "@/utils/chiffre";
import { notFound } from "next/navigation";


export const runtime = 'edge';


const fetchData = async (id, type) => {


    let url2 =  `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${process.env.TMDB_API_KEY}`;


        try {
        const response = await fetch(url2);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }


}

export async function generateMetadata(props) {
    const searchParams = await props.searchParams;

    const {id} = searchParams



    const idNum = id
    const decID = decryptId(idNum);

    const decArr = decID.split('-');
    const mediaType = decArr[1] === 'R' ? 'movie' : decArr[1] === 'Y' ? 'tv' : 'NOT DEFINED';
    const titleID = decArr[0];

    const data = await fetchData(titleID, mediaType);


    if (data?.success == false) return {
        title: "LosMovies - Page Not Found"
    }

    const original = data?.original_language && data?.original_language == "es" ? true : false;


    return {
      title: `LosMovies - Download ${original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name}`,
      description: `Download ${original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name} on LosMovies. With various quality options, you can download ${original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name} for free.`,
      keywords: `${data?.name ? data?.name : data?.title}, ${data?.name ? data?.name : data?.title} LosMovies, LosMovies ${data?.name ? data?.name : data?.title}, Watch ${data?.name ? data?.name : data?.title}, Watch ${data?.name ? data?.name : data?.title} Online` ,
      openGraph: {
        title: `Download ${data?.name ? data?.name : data?.title} on LosMovies`,
        description: data?.overview?.length > 155 ? data?.overview?.substr(0, 152) + '...' : data?.overview,
        image: `https://image.tmdb.org/t/p/w300${data?.poster_path}`,
        site_name: 'LosMovies',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/download?=${id}`
      }
    };
}

const DownloadPage = async props => {
    const searchParams = await props.searchParams;

    const {id, s, e} = searchParams;

    // if(!id.includes('-')) {
    //     notFound();
    // }

    if (removedContent.includes(id)) {
        notFound()
    }

    const idNum = id;
    const decID = decryptId(idNum);

    const decArr = decID.split('-');
    const mediaType = decArr[1] === 'R' ? 'movie' : decArr[1] === 'Y' ? 'tv' : 'NOT DEFINED';
    const titleID = decArr[0];

    return (
      <section className="md:pt-[90px] max-md:pt-[50px] text-white min-h-screen bg-c-back">
          <iframe src={`https://dl.vidsrc.vip/${mediaType}/${titleID}${mediaType == "tv" && `/${s}/${e}`}`} className="w-screen min-h-screen"></iframe>
      </section>
    )
}

export default DownloadPage