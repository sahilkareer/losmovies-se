// import FrameOnly from '@/components/FrameOnly';
import { LoaderContainer } from '@/components/Loader';
import NewWatchFrame from '@/components/NewWatchFrame';
// import Similars from '@/components/Similars';
import { removedContent } from '@/lib/utils';
import { decryptId } from '@/utils/chiffre';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

export const runtime = 'edge';

export const revalidate = 259200;


const fetchData = async (id, type) => {



    let url2 =  `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${process.env.TMDB_API_KEY}`;


        try {
        // const response = await fetch(url, options);
        const response = await fetch(url2);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }


}

const fetchEpisodes = async (id, season) => {


    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season ? season : 1}?api_key=${process.env.CHIKH_TMDB_API_KEY}`);
        const result = await response.json();
        return result;
        } catch (error) {
            console.log("EROOOOORR ////: " + error);
            console.log({error: error});
            return {error: error}
        }
    // try {
    //     const promises = Array.from({ length: numOfSeasons }, (_, i) => 
    //     fetch(`https://api.themoviedb.org/3/tv/${id}/season/${i + 1}?api_key=${process.env.CHIKH_TMDB_API_KEY}`)
    //     // fetch(`https://www.omdbapi.com/?i=${params.id}&Season=${i + 1}&apikey=${process.env.OMDB_KEY}`)
    //     );
        
    //     const responses = await Promise.all(promises);
        
    //     const data = await Promise.all(responses.map(response => response.json()));
    //     const data2 = data.filter(season => season?.episodes?.length > 0)
    
    //     return data2;
    //     } catch (error) {
    //         console.log("EROOOOORR ////: " + error);
    //         console.log({error: error});
    //         return {error: error}
    //     }


}

export async function generateMetadata(props) {
    const params = await props.params;

    const {id} = params
    // const {type: mediaType} = searchParams


    if(!id.includes('-')) return {
        title: "LosMovies - Page Not Found"
    }


    const idArr = id.split("-")
    const idNum = idArr[idArr.length - 1]
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
      title: `Watching ${original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name}`,
      openGraph: {
        title: `Watch ${data?.name ? data?.name : data?.title} on LosMovies`,
        image: `https://image.tmdb.org/t/p/w300${data?.poster_path}`,
        site_name: 'LosMovies',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/watch/${id}`
      }
    };
}



const Watch = async props => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const {id} = params

    if(!id.includes('-')) {
        notFound();
    }

    if (removedContent.includes(id)) {
        notFound();
    }

    const idArr = id.split("-")
    const idNum = idArr[idArr.length - 1]
    const decID = decryptId(idNum);

    const decArr = decID.split('-');
    const mediaType = decArr[1] === 'R' ? 'movie' : decArr[1] === 'Y' ? 'tv' : 'NOT DEFINED';
    const titleID = decArr[0];

    const data = await fetchData(titleID, mediaType);

    if (data?.success == false) {
        notFound();
    }

    const original = data?.original_language && data?.original_language == "es" ? true : false;
    const title = original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name;



    let episodesData;
    if (mediaType == "tv") {
        const {season} = searchParams
        episodesData = await fetchEpisodes(titleID, season)
    }

    return (
        // <section className='pt-[170px] min-h-screen relative bg-c-back sm:px-4'>
        (<section className='pt-[140px] max-md:pt-[50px] min-h-screen relative bg-c-back bg-opacity-85 sm:px-4'>
            <div className={`w-full fixed h-screen -z-20 top-0 left-0 bg-c-back`}>
                    <Image
                        src={data?.backdrop_path && `https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                        alt={`${title} Background`}
                        fill
                        className='object-cover object-center fixed -z-20'
                    />
            </div>
            <Suspense fallback={<LoaderContainer />}>
                <div className='text-white w-full'>
                    <NewWatchFrame type={data?.first_air_date ? "tv" : "movie"} id={data?.id} episodesData={episodesData} data={data && data} encId={idNum} routeId={id} />
                    {/* <FrameOnly type={data?.first_air_date ? "tv" : "movie"} id={data?.id} /> */}
                    {/* <Similars id={titleID} type={mediaType} /> */}
                </div>
            </Suspense>
        </section>)
    );
}

export default Watch