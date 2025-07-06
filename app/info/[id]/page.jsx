// 70% Server Side Rendering

import Loader, { LoaderContainer } from '@/components/Loader';
import { Suspense } from 'react';
// import TitleDetails from '@/components/TitleDetails';
// import WatchFrame from '@/components/WatchFrame';
import Similars from '@/components/Similars';
import { decryptId } from '@/utils/chiffre';
import TitleInfo from '@/components/TitleInfo';
import { notFound } from 'next/navigation';
// import AdsFrame from '@/components/AdsFrame';
import { removedContent } from '@/lib/utils';
import Image from 'next/image';

// const replaceID = async (imdb_id) => {

//     try {
//         const response = await fetch(`https://api.themoviedb.org/3/tv/${imdb_id}/external_ids?api_key=${process.env.CHIKH_TMDB_API_KEY}`);
//         const dataTv = await response.json();
//         if(!dataTv.imdb_id) {
//             const response = await fetch(`https://api.themoviedb.org/3/movie/${imdb_id}/external_ids?api_key=${process.env.CHIKH_TMDB_API_KEY}`);
//             const data = await response.json();
//             return data.imdb_id;
//         }else {
//             return dataTv.imdb_id;
//         }
//     } catch (error) {
//         return error;
//     }

    
// }

// const getTmdbID = async (imdb_id) => {

//     try {

//         const response = await fetch(`https://api.themoviedb.org/3/find/${imdb_id}?external_source=imdb_id&api_key=${process.env.TMDB_API_KEY}`);
//         const dataTv = await response.json();
//         if (dataTv.tv_results.length > 0) {
//             return dataTv.tv_results[0].id;
//         }else if (dataTv.movie_results.length > 0) {
//             return dataTv.movie_results[0].id;
//         }

//     } catch (error) {
//         return error;
//     }

    
// }

export const runtime = 'edge';

export const revalidate = 172800;


const fetchData = async (id, type) => {

    // let showID;
    // if (!id.includes('tt')) {
    //     showID = await replaceID(id);
    // }else {
    //     showID = id;
    // }

    // let tmdbID;
    // if (id.includes('tt')) {
    //     tmdbID = await getTmdbID(id);
    // }else {
    //     tmdbID = id;
    // }

    // let url = showID && `https://movie-database-alternative.p.rapidapi.com/?r=json&i=${await showID}`;
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    //         'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    //     }
    // };

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

const fetchTrailer = async (id, type) => {
    let url =  `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US&api_key=${process.env.TMDB_API_KEY}`;

    // const url2 = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

        try {
        const response = await fetch(url);
        const result = await response.json();

        const key = await findValidTrailerOrTeaser(result)
        return key;
    } catch (error) {
        return error;
    }
}

async function checkYouTubeVideo(videoId) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            // const data = await response.json();
            // console.log('The video exists:', data.title);
            return true;
        } else {
            // console.log('The video does not exist or is unavailable.');
            return false;
        }
    } catch (error) {
        // console.log('Error checking the video:', error);
        return false;
    }
}

async function findValidTrailerOrTeaser(data) {
    // First, filter for trailers
    const trailers = data.results.filter(item => item.type === "Trailer");

    // Check trailers one by one
    for (const trailer of trailers) {
        const isValid = await checkYouTubeVideo(trailer.key);
        if (isValid) {
            // console.log(`Valid trailer found: ${trailer.name} - ${trailer.key}`);
            return trailer.key;  // Return the first valid trailer key
        }
    }

    // If no valid trailer, filter for teasers
    const teasers = data.results.filter(item => item.type === "Teaser");

    // Check teasers one by one
    for (const teaser of teasers) {
        const isValid = await checkYouTubeVideo(teaser.key);
        if (isValid) {
            // console.log(`Valid teaser found: ${teaser.name} - ${teaser.key}`);
            return teaser.key;  // Return the first valid teaser key
        }
    }

    // If no valid trailer or teaser found
    // console.log('No valid trailer or teaser found.');
    return false;
}

// const fetchEpisodes = async (id, numOfSeasons) => {


//     try {
//         const promises = Array.from({ length: numOfSeasons }, (_, i) => 
//         fetch(`https://api.themoviedb.org/3/tv/${id}/season/${i + 1}?api_key=${process.env.CHIKH_TMDB_API_KEY}`)
//         // fetch(`https://www.omdbapi.com/?i=${params.id}&Season=${i + 1}&apikey=${process.env.OMDB_KEY}`)
//         );
        
//         const responses = await Promise.all(promises);
        
//         const data = await Promise.all(responses.map(response => response.json()));
//         const data2 = data.filter(season => season?.episodes?.length > 0)
    
//         return data2;
//         } catch (error) {
//             console.log("EROOOOORR ////: " + error);
//             console.log({error: error});
//             return {error: error}
//         }
// }

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
      title: `${original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name} – Watch Free Online in HD & 4K | LosMovies`,
      description: 
      `${original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name}
       is now streaming free on LosMoviestv. Watch in full HD or 4K without registration. No ads, fast load, and zero hassle entertainment. 
       `,
      keywords: `${data?.name ? data?.name : data?.title}, ${data?.name ? data?.name : data?.title} LosMovies, LosMovies ${data?.name ? data?.name : data?.title}, Watch ${data?.name ? data?.name : data?.title}, Watch ${data?.name ? data?.name : data?.title} Online` ,
      openGraph: {
        title: `Watch ${data?.name ? data?.name : data?.title} on LosMovies`,
        image: `https://image.tmdb.org/t/p/w300${data?.poster_path}`,
        site_name: 'LosMovies',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/watch/${id}`
      }
    };
}





const InfoPage = async props => {
    const params = await props.params;

    const {id} = params

    if(!id.includes('-')) {
        notFound();
    }

    if (removedContent.includes(id)) {
        notFound()
    }

    const idArr = id.split("-")
    const idNum = idArr[idArr.length - 1]
    const decID = decryptId(idNum);

    const decArr = decID.split('-');
    const mediaType = decArr[1] === 'R' ? 'movie' : decArr[1] === 'Y' ? 'tv' : 'NOT DEFINED';
    const titleID = decArr[0];

    const data = await fetchData(titleID, mediaType);
    const trailer = await fetchTrailer(titleID, mediaType);

    if (data?.success == false) {
        notFound();
    }

    const original = data?.original_language && data?.original_language == "es" ? true : false;
    const title = original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name;



    // Check if title contains inappropiate words
    const isInappropriate = (title) => {
        const inappropriateWords = ['sex', 'fuck', 'porn'];
        const regex = new RegExp(inappropriateWords.join('|'), 'i');
        return regex.test(title);
    };

    const isTitleInappropriate = isInappropriate(data?.name ? data?.name : data?.title);
    const isPlotInappropriate = isInappropriate(data?.overview);

    // if(isTitleInappropriate || isPlotInappropriate) {
    //     return (
    //         <section className='pt-[150px] min-h-screen relative bg-c-back my-container'>
    //             <div className='flex justify-center items-center w-full mt-20'>
    //                 <h1 className='font-texts text-white text-lg text-center'>This {data?.first_air_date ? "show" : "movie"} contains inappropriate content.</h1>
    //             </div>
    //         </section>
    //     )
    // }

    // let episodesData;
    // if (mediaType == "tv") {
    //     episodesData = await fetchEpisodes(titleID, data.number_of_seasons)
    // }


    return (
        // <section className='pt-[180px] min-h-screen relative bg-c-back '>
        (<section className='pt-[150px] max-md:pt-[70px] min-h-screen relative bg-c-back bg-opacity-85'>
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
                    <TitleInfo data={data && data} urlId={id} trailer={trailer} encId={idNum} />
                    {/* <TitleDetails data={data && data} /> */}
                    {/* <WatchFrame type={data?.first_air_date ? "tv" : "movie"} id={data?.id} episodesData={episodesData} data={data && data} encId={idNum} /> */}
                    {/* <AdsFrame /> */}
                    <Similars id={titleID} type={mediaType} />
                </div>
            </Suspense>
        </section>)
    );
}

export default InfoPage