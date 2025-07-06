import NewSearchBar from '@/components/NewSearchBar';
import SearchResults from '@/components/SearchResults';

export const runtime = 'edge';


const fetchData = async (query, page) => {


    try {

        const url2 = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=${page || "1"}&api_key=${process.env.TMDB_API_KEY_2}`


            //  MOVIES DATABASE ALTERNATIVE
        // const url = `https://movie-database-alternative.p.rapidapi.com/?s=${params.query}&r=json&page=${params.page}`;
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        //         'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        //     }
        // };
        // const response = await fetch(url, options);

        // if (query.includes("sex")) {
        //     return {Error: "Movie not found!"}
        // }



        const response = await fetch(url2);
        const data = await response.json();


        if (data?.total_results == 0) {
            return {Error: "Movie not found!"}
        }

        if (!data.total_results) {
            return {Error: "Something went wrong!"}
        }
        const seriesAndMovies = data.results.filter(item => item.media_type === 'tv' || item.media_type === 'movie');
        
        const isInappropriate = (title) => {
            const inappropriateWords = ['sex', 'fuck', 'porn'];
            const regex = new RegExp(inappropriateWords.join('|'), 'i');
            return regex.test(title);
        };

        const filtered = seriesAndMovies.filter(show => show.name ? !isInappropriate(show.name) && !isInappropriate(show.overview) : !isInappropriate(show.title) && !isInappropriate(show.overview))


        if (seriesAndMovies.length == 0) {
            return {Error: "Movie not found!"}
        }

        const realData = {
            page: data.page,
            results: seriesAndMovies,
            total_pages: data.total_pages,
            total_results: data.total_results,
        }


        return realData;
    } catch (error) {
        return error;
    }


}

export const generateMetadata = async props => {
    const searchParams = await props.searchParams;
    const query = decodeURIComponent(searchParams.q);


    return {
        title: `LosMovies - Search for ${searchParams.q ? query : "your Favorite Movies and Shows"}`,
        description: `Search Results for ${query} on LosMovies. Find your favorite movies and TV shows.`,
    }
}



const SearchMainPage = async props => {
    const searchParams = await props.searchParams;

    const {q,p} = searchParams;

    const data = q && (await fetchData(q, p));

    const searchPrompts = [
        "Looking for a classic or something new?",
        "Searching for binge-worthy content? Let's go!",
        "What do you want to watch tonight?",
        "Ready for your next movie night? Start searching!",
        "Discover your next obsession here!",
        "Feel like exploring? Type a keyword!",
        // "A Hollywood studio is paying us to stop streaming. Should we take the money?",
        // "Why pay for Netflix when LosMovies gives it free? Even their CEO is watching us.",
        // "Netflix is suing us? LMAO good luck.",
        "Uncover hidden treasures in our library!",
        // "Not sure what to watch? Just pretend you're on a cooking show and pick something!",
        // "Searching for something so bad it’s good? Challenge accepted!",
        // "Feeling adventurous? Type a random word and see what happens!",
        // "What’s the most ridiculous title you can think of? Let’s find it!",
        // "Why browse when you can *search* like you’re on a treasure hunt!",
        
    ];

    function getRandomSearchPrompt(prompts) {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        return prompts[randomIndex];
    }

    const randomPrompt = getRandomSearchPrompt(searchPrompts);


    return (
      <section className="md:pt-[150px] max-md:pt-[70px] pb-10 text-white px-1 xl:px-6 min-h-[90vh] bg-c-back">
          <NewSearchBar />
          
          {q ? (
              <SearchResults query={q} paga={p} dataa={data} />
          ) : (
              <div>
                  <div className="font-texts text-white mt-20 text-xl text-center">
                      {randomPrompt}
                  </div>
                  {/* <div className="mt-10 rounded-md md:hidden">
                      <video autoPlay muted playsInline className="rounded-md">
                          <source src="/assets/videos/YassFlix-Brand.mp4" type="video/mp4" />
                      </video>
                  </div> */}
              </div>
          )
              
           }
      </section>
    )
}

export default SearchMainPage