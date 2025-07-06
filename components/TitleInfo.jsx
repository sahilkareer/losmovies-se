import Image from 'next/image';
import { Button } from './ui/button';
import { FaDownload, FaPlay } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md'
import Link from 'next/link';
import { TransitionLink } from './TransitionLink';


const TitleInfo = (data) => {

    const isReleased = (date) => {
        const today = new Date()
        const releaseDate = new Date(date)
        return today > releaseDate
    }


    const original = data?.data?.original_language && data?.data?.original_language == "es" ? true : false;

    const date = data?.data?.first_air_date ? data?.data?.first_air_date : data?.data?.release_date
    const released = isReleased(date)

    const neededData = {
        type: data?.data?.first_air_date ? "TV" : "Movie",
        genres: data?.data?.genres?.map((genre) => genre.name),
        storyline: data?.data?.overview,
        releaseYear: date.substr(0, 4),
        lang: data?.data?.spoken_languages?.map((lang) => lang.english_name).join(", "),
        title: original ? data?.data?.original_title ? data?.data?.original_title : data?.data?.original_name : data?.data?.title ? data?.data?.title : data?.data?.name,
    }

    // const trailer = false;
    const trailer = data?.trailer

  return (
    <section>
    <div className="flex flex-row gap-12 my-container max-md:gap-6 max-md:flex-col mb-20 max-md:items-center justify-start items-start">
        <div className="min-w-[250px] rounded-lg">
            <Image 
            src={`https://image.tmdb.org/t/p/original${data?.data?.poster_path}`}
            alt={data?.data?.name ? data?.data?.name : data?.data?.title}
            width={300}
            height={450}
            className='object-contain rounded-lg'
            unoptimized={true}
            />
        </div>


        <div className="space-y-4 flex flex-col items-start max-md:items-center max-md:text-center">

          <h1 className="text-4xl font-bold font-titles">{neededData.title}</h1>

          <div className="flex items-center gap-2 text-sm text-c-gris font-texts">
            <span>{neededData.releaseYear}</span>
            <span>•</span>
            <span>{neededData.lang}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {neededData.genres.map((e) => (
            <span key={e} className={`px-2 py-1 rounded-full ${neededData.type === "Movie" ? "bg-c-primary" : "bg-c-secondary"} text-white font-texts`}>{e}</span>
            ))}
          </div>

          <div className='md:hidden'>
            {
                released ? (
           <div className="flex flex-col gap-2">
          <TransitionLink href={`/watch/${data.urlId}`}>
          <Button size="lg" className={`font-texts gap-3 duration-200 bg-transparent border-2 ${neededData.type === "Movie" ? "hover:bg-c-primary border-c-primary text-c-primary" : "hover:bg-c-secondary border-c-secondary text-c-secondary"}  hover:text-white text-lg opacity-90 hover:opacity-100`}>
            <FaPlay />
            Play Now
          </Button>
          </TransitionLink>

            {/* Download */}

          {neededData.type == "Movie" && <TransitionLink href={`/download?id=${data.encId}`}>
          <Button size="lg" className={`font-texts gap-3 duration-200 bg-transparent border-2 ${neededData.type === "Movie" ? "hover:bg-c-primary border-c-primary text-c-primary" : "hover:bg-c-secondary border-c-secondary text-c-secondary"}  hover:text-white text-lg opacity-90 hover:opacity-100`}>
            <FaDownload />
            Download
          </Button>
          </TransitionLink>}
           </div>
                ) : (
          <Button size="lg" disabled className={`font-texts gap-3 duration-200 border-2 ${neededData.type === "Movie" ? "bg-c-primary border-c-primary" : "bg-c-secondary border-c-secondary"} text-white text-lg opacity-90 hover:opacity-100`}>

            <MdWatchLater />
            Not Yet Released
          </Button>
                )
            }
          </div>

          <p className="text-white font-texts opacity-90 max-md:!mt-8 max-md:opacity-70">
            {neededData.storyline}
          </p>

          <div className='max-md:hidden'>
            {
                released ? (

            <>
          <TransitionLink href={`/watch/${data.urlId}`}>
          <Button size="lg" className={`font-texts gap-3 duration-200 bg-transparent border-2 ${neededData.type === "Movie" ? "hover:bg-c-primary border-c-primary text-c-primary" : "hover:bg-c-secondary border-c-secondary text-c-secondary"}  hover:text-white text-lg opacity-90 hover:opacity-100`}>
            <FaPlay />
            Play Now
          </Button>
          </TransitionLink>

            {/* Download */}

          {neededData.type == "Movie" && <TransitionLink href={`/download?id=${data.encId}`}>
          <Button size="lg" className={`font-texts gap-3 ml-2 duration-200 bg-transparent border-2 ${neededData.type === "Movie" ? "hover:bg-c-primary border-c-primary text-c-primary" : "hover:bg-c-secondary border-c-secondary text-c-secondary"}  hover:text-white text-lg opacity-90 hover:opacity-100`}>
            <FaDownload />
            Download
          </Button>
          </TransitionLink>}
            </>
                ) : (
          <Button size="lg" disabled className={`font-texts gap-3 duration-200 border-2 ${neededData.type === "Movie" ? "bg-c-primary border-c-primary" : "bg-c-secondary border-c-secondary"} text-white text-lg opacity-90 hover:opacity-100`}>

            <MdWatchLater />
            Not Yet Released
          </Button>
                )
            }
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <h2 className={`px-2 py-1 font-bold rounded-md ${neededData.type === "Movie" ? "bg-c-primary" : "bg-c-secondary"} text-white font-secondary`}>watch {neededData.title} free</h2>
            <h2 className={`px-2 py-1 font-bold rounded-md ${neededData.type === "Movie" ? "bg-c-primary" : "bg-c-secondary"} text-white font-secondary`}>watch {neededData.title} without registration</h2>
          </div>


        </div>

    </div>

    <div className="my-container my-10">
        <h2 className='font-titles text-3xl max-sm:text-2xl'>Trailer</h2>
        {
            trailer ? (
                <div className="flex justify-center items-center">
                    <iframe src={`https://www.youtube.com/embed/${trailer}`} allowFullScreen  className={`max-w-full mt-5 md:h-[90vh] max-md:w-full md:w-full max-md:aspect-video rounded-md bg-c-gris ${neededData.type == "TV" ? "border-c-secondary" : "border-c-primary"} border`}></iframe>
                </div>
            ) : (
                <div className="">
                    <p className="text-lg font-texts text-center mt-5">No Trailer found!</p>
                </div>
            )
        }
    </div>

    <div>
        {/* created By */}
        {data?.data?.created_by?.length > 0 && <h2 className='font-titles text-3xl max-sm:text-2xl my-container'>Created By</h2>}
        <div className="my-container flex flex-wrap gap-6 justify-start items-start mt-5">
            {
                data?.data?.created_by?.length > 0 && (
                    data?.data?.created_by?.map((creator) => (
                        <div key={creator.id} className="flex flex-col items-center gap-2">
                            <Image 
                            src={`${creator?.profile_path ? `https://image.tmdb.org/t/p/w185${creator.profile_path}` : `https://via.placeholder.com/100x150?text=${creator.name}`}`}
                            alt={creator.name}
                            width={100}
                            height={150}
                            className='object-contain rounded-lg'
                            unoptimized={true}
                            />
                            <p className='text-center text-sm font-texts'>{creator.name}</p>
                        </div>
                    ))
                )
            }
        </div>

        {/* Seasons (for series only) */}
        {data?.data?.number_of_seasons > 0 && (
            <div className="my-container mt-10">
                <h2 className='font-titles text-3xl max-sm:text-2xl'>Seasons</h2>
                <div className="flex flex-wrap gap-6 justify-start items-start mt-5">
                    {data?.data?.seasons?.map((season) => (
                        // include only season number, and description for each season
                        <div key={season.id} className="flex flex-row items-start gap-2">
                            <Image 
                            src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                            alt={`Season ${season.season_number}`}
                            width={100}
                            height={150}
                            className='object-contain rounded-lg'
                            unoptimized={true}
                            />
                            <div className="flex flex-col gap-2">
                            <p className='text-md font-texts'>Season {season.season_number}</p>
                            <p className='text-sm font-texts opacity-70'>{season.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* production countries (without pictures) */}
        {data?.data?.production_countries?.length > 0 && (
            <div className="my-container mt-10">
                <h2 className='font-titles text-3xl max-sm:text-2xl'>Production Countries</h2>
                <div className="flex flex-wrap gap-6 justify-start items-start mt-5">
                    {data?.data?.production_countries?.map((country) => (
                        <span key={country.iso_3166_1} className='px-2 py-1 bg-c-gris rounded-md text-sm font-texts'>{country.name}</span>
                    ))}
                </div>
            </div>
        )}




    </div>

    
    </section>
  )
}

export default TitleInfo