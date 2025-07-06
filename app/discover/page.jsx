import DiscoverFilters from '@/components/DiscoverFilters';
import DiscoverResults from '@/components/DiscoverResults';
import { LoaderContainer } from '@/components/Loader';
import { movieFiltersGenres, tvFiltersGenres } from '@/utils/genres';
import React, { Suspense } from 'react'

export const runtime = 'edge';


const fetchData = async (filters) => {



    let genre = filters.type == "tv" ? tvFiltersGenres.find(g => g.name === filters.genre) : movieFiltersGenres.find(g => g.name === filters.genre);

    const genreId = genre ? genre.id : null; // Get the id or return null if not found

    let sorting = filters.type == "tv" ? filters.sort == "popular" ? "popularity.desc" : filters.sort == "newest" ? "first_air_date.desc" : filters.sort == "oldest" ? "first_air_date.asc" : "" : filters.type == "movies" ? filters.sort == "popular" ? "popularity.desc" : filters.sort == "newest" ? "primary_release_date.desc" : filters.sort == "oldest" ? "primary_release_date.asc" : "" : "";


    // console.log(sorting)

    const query = `${filters.type == "tv" ? "tv" : "movie"}?${filters.year ? filters.type == "tv" ? "&first_air_date_year=" + filters.year : "&primary_release_year=" + filters.year : ""}&page=${filters.page ? filters.page : 1}&sort_by=${sorting}&${genreId && "with_genres=" + genreId + "&"}`
    // const response = await fetch(`https://api.themoviedb.org/3/discover/${query}language=en-US&page=1&include_adult=true&include_video=false&api_key=${process.env.TMDB_API_KEY_2}`);
    
    try {
        // const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.CHIKH_TMDB_API_KEY_2}&language=en-US&include_adult=true&page=1`)
        const response = await fetch(`https://api.themoviedb.org/3/discover/${query}language=en-US&include_adult=true&include_video=false&api_key=${process.env.TMDB_API_KEY_2}`);
        const data = await response.json()

        if (!data.results || data.results.length == 0) {console.log(data); return data;}
        const isInappropriate = (title) => {
            const inappropriateWords = ['sex', 'fuck', 'porn'];
            const regex = new RegExp(inappropriateWords.join('|'), 'i');
            return regex.test(title);
        };
    
        const filtered = data.results.filter(show => show.name ? !isInappropriate(show.name) && !isInappropriate(show.overview) : !isInappropriate(show.title) && !isInappropriate(show.overview))
    
        const datati = {
            results: filtered,
            page: data.page,
            totalPages: data.total_pages
        }
    
        return datati;
    } catch (error) {
        console.log(error);
        return error
    }


    // return filters;
}

export const metadata = {
    title: "LosMovies - Discover Free Movies and TV Shows",
    description: "Discover a world of entertainment with LosMovies. Watch the latest movies, TV shows, and more in 4K quality, all for free and without registration.",
}

const DiscoverPage = async props => {
    const searchParams = await props.searchParams;


    const {type, genre, year, sort, page} = searchParams
    let filters = {
        type,
        genre,
        year,
        sort,
        page
    };
    const data = await fetchData(filters)




    return (
        // <section className="pt-[180px] pb-10 text-white my-container min-h-screen bg-c-back">
        (<section className="md:pt-[150px] max-md:pt-[70px] pb-10 text-white px-1 xl:px-6 min-h-screen bg-c-back">
            {/* <div className="rounded-md max-md:hidden mb-5 w-[80%] mx-auto h-auto bg-white flex justify-center items-center">
                    <video autoPlay muted playsInline className="rounded-md w-[300px]">
                        <source src="/assets/videos/YassFlix-Brand.mp4" type="video/mp4" />
                    </video>
                </div> */}
            <Suspense fallback={<LoaderContainer />}>
                <h1 className="font-titles md:hidden text-lg font-bold text-center my-3">Discover a World of Entertainment</h1>
                <DiscoverFilters />
                <DiscoverResults data={data} />
            </Suspense>
        </section>)
    );
}

export default DiscoverPage