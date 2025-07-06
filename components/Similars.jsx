import { Suspense } from "react"
import TitleCard from "./TitleCard"
import Loader from "./Loader"


// https://api.themoviedb.org/3/movie/{movie_id}/similar

const fetchData = async (id, type) => {

    try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.CHIKH_TMDB_API_KEY_2}&language=en-US&include_adult=true&page=1`)
        const data = await res.json()

        if (!data.results || data.results.length == 0) {console.log(data)}
        const isInappropriate = (title) => {
            const inappropriateWords = ['sex', 'fuck', 'porn'];
            const regex = new RegExp(inappropriateWords.join('|'), 'i');
            return regex.test(title);
        };
    
        const filtered = data.results.filter(show => show.name ? !isInappropriate(show.name) && !isInappropriate(show.overview) : !isInappropriate(show.title) && !isInappropriate(show.overview))
    
        const datati = {
            results: filtered
        }
    
        return datati;
    } catch (error) {
        console.log(error);
        return error
    }

}


const Similars = async ({id ,type}) => {

    const data = await fetchData(id, type)

    let error = false;
    if (!data.results) {
        error = true;
    }


  return (
    <section className="pt-10 pb-10 text-white px-1 xl:px-6">
        <Suspense fallback={<Loader />}>
        {
            error ? (
                <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>Something Wrong Happened!</h1>
                    <p className='font-texts text-white text-xl mt-2 text-center'>Please try again later.</p>
                </div>
            ):(
                <div>
                    {data?.results?.length > 0 && <h2 className="text-white sm:pl-11 max-sm:pl-2 font-titles my-8 text-4xl">More Like This</h2>}
                    {/* <div className='grid max-sm:place-items-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'> */}
                    <div className="flex flex-wrap gap-1 mx-auto justify-center">

                        {
                            data?.results?.map((movie) => {
                                return (
                                    <TitleCard key={movie.id}
                                        img={movie.poster_path ? movie.poster_path : "https://placehold.co/180x270/EEE/31343C?font=raleway&text=No+Image+Provided"}
                                        year={movie.first_air_date ? movie?.first_air_date?.substr(0, 4) : movie?.release_date?.substr(0, 4)}
                                        titleId={movie.id}
                                        title={movie.original_language == "es" ? movie.original_title ? movie.original_title : movie.original_name : movie.title ? movie.title : movie.name}
                                        type={movie?.release_date ? "movie" : movie?.first_air_date?.length > 0 ? "tv" : "N/A"}
                                        date={movie.first_air_date ? movie.first_air_date : movie.release_date}
                                        unoptimize={true}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-center items-center mt-10'>
                    </div>
                </div>
             )
        }
        </Suspense>
    </section>
  )
}

export default Similars