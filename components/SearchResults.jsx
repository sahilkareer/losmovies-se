/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import {  Suspense, useEffect, useState } from "react";
import Loader, { LoaderContainer } from "@/components/Loader";
import TitleCard from "@/components/TitleCard";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";


const SearchResults = ({dataa, query, paga}) => {


    const router = useRouter();
    // const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [resultsNum, setResultsNum] = useState(null);
    const [numOfPages, setNumOfPages] = useState(null);
    const [page, setPage] = useState(paga);


    useEffect(() => {
        setError(null);
        if(dataa?.Error) {
            setError(dataa?.Error);
        } else if (dataa) {
            setData(dataa);
            setResultsNum(dataa?.total_results);
            setNumOfPages(dataa?.total_pages);
        }
    }, [dataa])






    // const fetchData = async (q, p) => {

    //     try {
    //         const response = await fetch(`/api/search/${q}/${p}`, {
    //             method: 'GET',
    //             headers: {
    //               Authorization: `Bearer D8s26Q8dF45sd456q87er3Q85`,
    //               'Content-Type': 'application/json', // Optional content type header
    //             }});
    //         const dataa = await response.json();    
    //         if(dataa.Error) {
    //             setError(dataa.Error);
    //         } else {
    //             setData(dataa);
    //             setResultsNum(dataa?.total_results);
    //             setNumOfPages(dataa?.total_pages)
    //         }
            
    //     } catch (error) {
    //         setError(error);
    //     }finally {
    //         setIsLoading(false)
    //     }
    // };


    // check if query contains bad words
    
    
    const bad = ["fuck", "porn"];
    const containsBadWords = bad.some(word => query.toLowerCase().includes(word));
    // if (containsBadWords) {
    //     return (
    //         <section className="pt-[150px] pb-10 text-white my-container min-h-screen bg-c-back">
    //             <div className='flex justify-center flex-col items-center w-full mt-20'>
    //                 <h1 className='font-texts text-white text-4xl text-center'>inappropriate words detected!</h1>
    //             </div>
    //         </section>
    //     )
    // }

    const nextPage = () => {
        router.push(`/search/${query}?page=${+paga + 1}`)
    }
    
    const prevPage = () => {
        router.push(`/search/${query}?page=${+paga - 1}`)
    }

    const handlePageClick = (e) => {
        setPage(e.selected + 1)
        if (query == "AdultsPage005") {
            router.push(`/adults?page=${e.selected + 1}`)
        }else {
            router.push(`search?q=${query}&p=${e.selected + 1}`)
        }
    }

    

    return (
    <section>
        {
            // isLoading ? (
            //     <div className='flex justify-center items-center w-full mt-20'>
            //         <Loader />
            //     </div>
            // ):
            error && error == "Movie not found!" ? (
                <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>No Results Found</h1>
                    <p className='font-texts text-white text-xl mt-2 text-center'>  We couldn&apos;t find any results for &quot;{query}&quot;. Please check your spelling or try searching for something else.</p>
                </div>
            ): error ? (
                <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>Something Wrong Happened!</h1>
                    <p className='font-texts text-white text-xl mt-2 text-center'>Please try again later.</p>
                </div>
            ): data?.results ? (
                <Suspense fallback={<LoaderContainer />}>

                <div>
                    {
                        query == "AdultsPage005" ? (
                            <>
                            <h1 className='font-texts mb-9 pl-4 text-white text-2xl'>+18 Movies</h1>
                            </>
                        ) : (
                            <>
                            <h1 className='font-texts mb-1 pl-2 text-white text-2xl'>Search Results for: &quot;{query}&quot;</h1>
                            <p className='font-texts mb-10 pl-2 text-white text-lg'>Page: {paga}</p>
                            </>
                        )
                    }
                    {/* <div className='grid max-sm:place-items-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'> */}
                        <div className="flex flex-wrap gap-1 mx-auto justify-center">
                        {
                            data?.results?.map((movie) => {
                                return (
                                    <TitleCard key={movie.id}
                                        // title={movie.name ? movie.name : movie.title}
                                        img={movie.poster_path ? movie.poster_path : "https://placehold.co/180x270/EEE/31343C?font=raleway&text=No+Image+Provided"}
                                        year={movie.first_air_date ? movie?.first_air_date?.substr(0, 4) : movie?.release_date?.substr(0, 4)}
                                        titleId={movie.id}
                                        title={movie.original_language == "es" ? movie.original_title ? movie.original_title : movie.original_name : movie.title ? movie.title : movie.name}
                                        type={movie.media_type || "movie"}
                                        date={movie.first_air_date ? movie.first_air_date : movie.release_date}
                                        unoptimize={true}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-center items-center mt-10'>
                        {/* {paga > 1 && (<button onClick={prevPage} className='bg-c-primary text-white font-secondary font-semibold py-2 px-4 rounded-md mr-2'>Prev</button>)} */}
                        {/* {resultsNum > 10 && paga < numOfPages && (<button onClick={nextPage} className='bg-c-primary text-white font-secondary font-semibold py-2 px-4 rounded-md'>Next</button>)} */}
                        {numOfPages > 1 && <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageClick}
                        forcePage={page - 1}
                        pageRangeDisplayed={2}
                        pageCount={numOfPages}
                        previousLabel="< Previous"
                        renderOnZeroPageCount={null}
                        containerClassName="mx-auto flex flex-row gap-2 w-full justify-center flex-wrap"
                        pageClassName={`font-secondary font-semibold select-none px-2 py-1 border-2 border-c-primary hover:bg-c-primary duration-200 transition-all rounded-md`}
                        activeClassName={`bg-c-primary`}
                        previousClassName="font-secondary font-semibold p-1 mt-0.5 select-none"
                        nextClassName="font-secondary font-semibold p-1 mt-0.5 select-none"
                    />}
                    </div>
                </div>
                </Suspense>

             ): (
             <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>Something Wrong Happened!!</h1>
                    <p className='font-texts text-white text-xl mt-2 text-center'>Please try again later.</p>
                </div>
             )
        }
    </section>
  )
}

export default SearchResults