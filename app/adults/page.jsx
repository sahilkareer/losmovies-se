import SearchResults from '@/components/SearchResults';

export const runtime = 'edge';


const fetchData = async (page) => {


    try {

        // const url2 = `https://api.themoviedb.org/3/search/multi?query=sex&include_adult=true&language=en-US&page=${page || 1}&api_key=${process.env.TMDB_API_KEY_2}`
        const url2 = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page || 1}&sort_by=popularity.desc&with_genres=10749&api_key=${process.env.TMDB_API_KEY_2}`
        


        const response = await fetch(url2);
        const data = await response.json();


        if (data?.total_results == 0) {
            return {Error: "Movie not found!"}
        }

        if (!data.total_results) {
            return {Error: "Something went wrong!"}
        }
        const seriesAndMovies = data.results.filter(item => item.media_type === 'tv' || item.media_type === 'movie');

        // if (seriesAndMovies.length == 0) {
        //     return {Error: "Movie not found!"}
        // }

        const realData = {
            page: data.page,
            results: seriesAndMovies,
            total_pages: data.total_pages,
            total_results: data.total_results,
        }


        return data;
    } catch (error) {
        return error;
    }


}


export const metadata = {
    title: "LosMovies - Adults movies",
    description: "Discover hot and sexy movies to watch for free on LosMovies, high-quality and without any registration."
}



const AdultsPage = async props => {

    const searchParams = await props.searchParams;

    const page = searchParams.page || 1;

    const data = await fetchData(page);



    return (
      <section className="md:pt-[150px] max-md:pt-[70px] pb-10 text-white px-1 xl:px-6 min-h-[90vh] bg-c-back">
          
          {data && (
              <SearchResults query={"AdultsPage005"} paga={1} dataa={data} />
          )
           }
      </section>
    )
}

export default AdultsPage