
import Link from 'next/link';
import data from '@/utils/data.json';
import { encryptId } from '@/utils/chiffre';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { TransitionLink } from './TransitionLink';
import { cache } from 'react';
import { movieGenres, tvGenres } from '@/utils/genres';



const fetchData = cache(async (screen) => {
    // Screen could be either home, shows or movies
    // we need to fetchat least top 3 trending movies or shows based on screen using tmdb API



    if (screen == 'home') {
        // For home, we will fetch both movies and shows
        const moviesRes = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 43200, // 12 hours
            },
        });
        if (!moviesRes.ok) {
            return new Error('Failed to fetch movies data');
        }
        const showsRes = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 43200, // 12 hours
            },
        });
        if (!showsRes.ok) {
            return new Error('Failed to fetch shows data');
        }
        const moviesData = await moviesRes.json();
        const showsData = await showsRes.json();
        const combinedData = [...moviesData.results, ...showsData.results].map(item => ({
            id: item.id,
            title: item?.title || item?.name,
            original_title: item?.original_title || item?.original_name,
            overview: item.overview,
            poster_path: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            backdrop_path: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
            release_date: item.release_date,
            first_air_date: item.first_air_date,
            genre: item?.genre_ids.map(id => {
                // return genre ? genre.name : 'Unknown';
                const genre = (item.media_type === 'movie' ? movieGenres : tvGenres).find(g => g.id === id);
                return genre ? genre.name : 'Unknown';
            }).join(', '),
            original_language: item.original_language,
            type: item.media_type || (screen === 'movies' ? 'movie' : 'tv'),
            tagline: item.tagline || '', // Add tagline if available
        }));
        return combinedData;
    } else {

        const type = screen === 'movies' ? 'movie' : 'tv';
        const res = await fetch(`https://api.themoviedb.org/3/trending/${type}/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`, {
            next: {
            revalidate: 43200, // 12 hours
        },
    });
    if (!res.ok) {
        return new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data.results.slice(0, 3).map(item => ({
        id: item.id,
        title: item?.title || item?.name,
        original_title: item?.original_title || item?.original_name,
        overview: item.overview,
        poster_path: `https://image.tmdb.org/t/p/original${item.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
        release_date: item.release_date,
        first_air_date: item.first_air_date,
        genre: item.genre_ids.map(id => {
            // const genre = data.genres.find(g => g.id === id);
            const genre = (type === 'movie' ? movieGenres : tvGenres).find(g => g.id === id);
            return genre ? genre.name : 'Unknown';
        }).join(', '),
        original_language: item.original_language,
        type: screen === 'movies' ? 'movie' : 'tv',
        tagline: item.tagline || '', // Add tagline if available
    }));
    
    
}
});





const MainScreen = async ({screen}) => {


    const data2 = await fetchData(screen);


    const random = Math.floor(Math.random() * data2.length);


    const chosen = data2[random];

    const urlTitle = chosen.title.replace(/ /g, "-").toLowerCase()
    const encID = encryptId(`${chosen.id}-${chosen.type == "movie" ? 'R' : "Y"}`)


    const original = chosen.original_language && chosen.original_language == "es" ? true : false;


  return (
    <div className='h-screen relative max-sm:h-[93vh]'>

        {/* Large Screens Content */}
        <div className='text-white max-sm:hidden text-center flex-col my-container flex justify-end items-center w-full max-h-[70vh] absolute bottom-0'>
            
            <h1 className='flex-1 text-5xl font-bold font-titles my-3'>{original ? chosen.original_title : chosen.title}</h1>
            <p className='font-texts my-2 flex-1 overflow-auto'>{chosen.overview}</p>
            <TransitionLink href={`/info/${urlTitle}-${encID}`}>
            <button  className={`${chosen.type == "movie" ? "bg-c-primary border-c-primary" : "bg-c-secondary border-c-secondary"} flex flex-row items-center flex-1 font-texts border-2 text-white text-lg font-bold px-8 py-3 rounded-full bg-opacity-0 transition-all duration-200 my-5 hover:bg-opacity-100`}>
                <FaPlay className='mr-2' /><span>Play</span>
            </button>
            </TransitionLink>
        </div>


        {/* Small Screens Content */}
        <div className="flex max-w-screen overflow-x-hidden flex-col items-center justify-center sm:hidden bg-cover bg-center" style={{ backgroundImage:  `linear-gradient(to top, #1e1e1e, transparent), url(${chosen.poster_path})`, height: '69vh' }}>
                <div className="bg-transprent w-screen text-center my-container text-white h-[25vh] bottom-0 absolute">
                    <h1 className="text-4xl font-titles font-bold">{original ? chosen.original_title : chosen.title}</h1>
                    <p className="text-lg font-semibold font-texts">{chosen.genre}</p>
                    {chosen?.tagline && <p className="text-md font-texts">&quot;{chosen.tagline}&quot;</p>}
                    <button className={`w-[90%] rounded-lg mx-auto ${chosen.type == "movie" ? "bg-c-primary" : "bg-c-secondary"} flex justify-center flex-row items-center py-2 mt-2 font-texts text-white`}>
                    <TransitionLink href={`/info/${urlTitle}-${encID}`} className='flex justify-center items-center'>
                        <FaPlay className='mr-2' /><span>Watch Now</span>
                    </TransitionLink>
                    </button>
                </div>
                </div>
        <div className={`w-full absolute h-screen -z-20 top-0 left-0 bg-c-back`} />


        {/* Date */}
        <span className='absolute bg-c-back font-secondary bg-opacity-60 text-white font-semibold px-5 py-1 select-none max-sm:top-[30%] right-0 sm:bottom-40'>
            {chosen.type === "tv" ? chosen.first_air_date.split("-")[0] : chosen.release_date.split('-')[0]}
        </span>



        {/* Background */}
        <div className={`w-full absolute h-screen max-sm:hidden -z-20 top-0 left-0 hh bg-c-back`}>
                <Image 
                    src={chosen.backdrop_path} 
                    alt={`${chosen.title} Background (Backdrop)`}
                    fill
                    className='max-sm:hidden object-cover object-center absolute -z-20'
                />
                <Image 
                    src={chosen.poster_path} 
                    alt={`${chosen.title} Background (Poster)`}
                    fill
                    className='sm:hidden object-cover object-center absolute -z-20'
                />
        </div>
    </div>
  )
}

export default MainScreen