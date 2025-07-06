"use client";

import { Suspense, useCallback, useEffect, useState } from "react"
import Loader from "./Loader"
import TitleCard from "./TitleCard"
import ReactPaginate from 'react-paginate';
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const DiscoverResults = ({data}) => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    let type = searchParams.get("type")
   
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
      (name, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
   
        return params.toString()
      },
      [searchParams]
    )


    const [currentPage, setCurrentPage] = useState(searchParams.has("page") ? Number(searchParams.get("page")) : 1);
    const [totalPages, setTotalPages] = useState(data.totalPages > 500 ? 500 : data.totalPages)

    useEffect(() => {
        setTotalPages(data.totalPages > 500 ? 500 : data.totalPages)
        if (data.page == 1) setCurrentPage(1)
    }, [data])

    let error = false;
    if (!data.results) {
        error = true;
    } else if (data?.results?.length == 0) {
        error = "noResults";
    }

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1)
        router.push(pathname + '?' + createQueryString('page', e.selected + 1))
    }


  return (
    <section className="pt-10 pb-10 text-white bg-c-back">
        <Suspense fallback={<Loader />}>
        {
            error ? error == "noResults" ? (
                <div>
                <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>No Results Found!</h1>
                    <p className='font-texts text-white text-xl mt-2 text-center'>Please try again with different filters.</p>
                </div>
                </div>
            ) : (
                <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>Something Wrong Happened!</h1>
                    <p className='font-texts text-white text-xl mt-2 text-center'>Please try again later.</p>
                </div>
            ):(
                <div>
                    <div className="flex flex-wrap gap-1 mx-auto mb-5 justify-center">
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
                    {totalPages > 1 && <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageClick}
                        forcePage={currentPage - 1}
                        pageRangeDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< Previous"
                        renderOnZeroPageCount={null}
                        containerClassName="mx-auto flex flex-row gap-2 w-full justify-center flex-wrap"
                        pageClassName={`font-secondary font-semibold select-none px-2 py-1 border-2 ${type == "tv" ? "border-c-secondary hover:bg-c-secondary" : "border-c-primary hover:bg-c-primary"} duration-200 transition-all rounded-md`}
                        activeClassName={`${type == "tv" ? "bg-c-secondary" : "bg-c-primary"}`}
                        previousClassName="font-secondary font-semibold p-1 mt-0.5 select-none"
                        nextClassName="font-secondary font-semibold p-1 mt-0.5 select-none"
                    />}
                </div>
             )
        }
        </Suspense>
    </section>
  )
}

export default DiscoverResults
