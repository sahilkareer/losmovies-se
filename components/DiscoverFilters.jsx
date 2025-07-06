"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { movieFiltersGenres, tvFiltersGenres } from "@/utils/genres"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { FilterIcon } from "lucide-react"
import { Button } from "./ui/button"
  



const DiscoverFilters = () => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const genre = searchParams.get("genre");
    const type = searchParams.get("type");
    const year = searchParams.get("year");
    const sort = searchParams.get("sort");
    

    const [selectedGenre, setSelectedGenre] = useState(genre ? genre : "")
    const [selectedType, setSelectedType] = useState(type ? type : "movies")
    const [selectedYear, setSelectedYear] = useState(year ? year : "")
    const [selectedSort, setSelectedSort] = useState(sort ? sort : "popular")

    // const years = [2019, 2020, 2021, 2022, 2023, 2024]
    const years = Array.from({ length: new Date().getFullYear() - 1940 + 1 }, (_, i) => new Date().getFullYear() - i);


    // const type = "movie"



    const updateSearchParams = (params) => {

        const convertParamsToUrl = (paramso, baseUrl = '/discover') => {
            const query = new URLSearchParams(paramso).toString();
            return `${baseUrl}?${query}`;
          };

        const url = convertParamsToUrl(params)
      
        router.push(url);
      };

      const handleGenreChange = (v) => {
        setSelectedGenre(v);
        

        let params = {};
        
            if (selectedType) {
                params.type = selectedType
            }


            if (v) {
                params.genre = v;
            }


            if (selectedYear) {
                params.year = selectedYear;
            }

            if (selectedSort) {
                params.sort = selectedSort;
            }
    
            updateSearchParams(params);

        // return alert(v)
      }
      const handleTypeChange = (v) => {

        setSelectedType(v)
        setSelectedGenre("")

        let params = {};
        
        if (v) {
            params.type = v;
        }


        // if (selectedGenre) {
        //     params.genre = selectedGenre;
        // }


        if (selectedYear) {
            params.year = selectedYear;
        }

        if (selectedSort) {
            params.sort = selectedSort;
        }

        updateSearchParams(params);

        // return alert(v)
      }
      const handleYearChange = (v) => {
        setSelectedYear(v)

        let params = {};
        
        if (selectedType) {
            params.type = selectedType
        }


        if (selectedGenre) {
            params.genre = selectedGenre;
        }


        if (v) {
            params.year = v;
        }

        if (selectedSort) {
            params.sort = selectedSort;
        }

        updateSearchParams(params);

        // return;
      }
      const handleSortChange = (v) => {

        setSelectedSort(v)

        let params = {};
        
        if (selectedType) {
            params.type = selectedType;
        }


        if (selectedGenre) {
            params.genre = selectedGenre;
        }

        if (selectedYear) {
            params.year = selectedYear;
        }


        if (v) {
            params.sort = v;
        }

        updateSearchParams(params);
      }

  return (
    <>
    <div className="flex flex-row gap-2 flex-wrap w-full my-container max-md:hidden">
        <Select className="bg-c-back font-texts text-white"
            value={selectedType}
            onValueChange={value => handleTypeChange(value)}

        >
            <SelectTrigger className="w-[220px] max-sm:w-full bg-[#333] font-texts">
                <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#333] text-white font-texts">
                <SelectGroup>
                <SelectLabel className="font-bold">Type</SelectLabel>
                <SelectItem value="movies" className="focus:bg-c-primary focus:text-white text-c-primary font-semibold">Movies</SelectItem>
                <SelectItem value="tv" className=" focus:bg-c-secondary focus:text-white text-c-secondary font-semibold">TV Shows</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <Select className="bg-c-back font-texts text-white"
            value={selectedGenre}
            onValueChange={value => handleGenreChange(value)}
        >
            <SelectTrigger className="w-[280px] max-sm:w-full max-md:w-[220px] bg-[#333] font-texts">
                <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent className="bg-[#333] text-white font-texts">
                <SelectGroup>
                <SelectLabel className="font-bold">Genre</SelectLabel>
                {/* <SelectItem value="any" className="focus:bg-c-primary focus:text-white font-semibold">Any</SelectItem> */}
                {
                    selectedType == "tv" ? tvFiltersGenres.map(genre => (
                        <SelectItem value={genre.name} key={genre.id} className="focus:bg-c-secondary focus:text-white font-semibold">{genre.name}</SelectItem>
                    )) : movieFiltersGenres.map(genre => (
                        <SelectItem value={genre.name} key={genre.id} className="focus:bg-c-primary focus:text-white font-semibold">{genre.name}</SelectItem>
                    )) 
                }
                </SelectGroup>
            </SelectContent>
        </Select>
        <Select className="bg-c-back font-texts text-white"
            value={selectedYear}
            onValueChange={value => handleYearChange(value)}
        >
            <SelectTrigger className="w-[220px] max-sm:w-full bg-[#333] font-texts">
                <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#333] text-white font-texts">
                <SelectGroup>
                <SelectLabel className="font-bold">Year</SelectLabel>
                {/* <SelectItem value="any" className="focus:bg-c-primary focus:text-white font-semibold">Any</SelectItem> */}
                {
                    years.map(year => (
                        <SelectItem value={year.toString()} key={year} className={`${selectedType == "tv" ? "focus:bg-c-secondary" : "focus:bg-c-primary"} focus:text-white font-semibold`}>{year}</SelectItem>
                    ))
                }
                </SelectGroup>
            </SelectContent>
        </Select>
        <Select className="bg-c-back font-texts text-white"
            value={selectedSort}
            onValueChange={value => handleSortChange(value)}
        >
            <SelectTrigger className="w-[220px] max-sm:w-full bg-[#333] font-texts">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#333] text-white font-texts">
                <SelectGroup>
                <SelectLabel className="font-bold">Sort by</SelectLabel>
                {/* <SelectItem value="any" className="focus:bg-c-primary focus:text-white font-semibold">Any</SelectItem> */}

                <SelectItem value={"popular"} className={`${selectedType == "tv" ? "focus:bg-c-secondary" : "focus:bg-c-primary"} focus:text-white font-semibold`}>Most Popular</SelectItem>
                <SelectItem value={"oldest"} className={`${selectedType == "tv" ? "focus:bg-c-secondary" : "focus:bg-c-primary"} focus:text-white font-semibold`}>Oldest</SelectItem>
                <SelectItem value={"newest"} className={`${selectedType == "tv" ? "focus:bg-c-secondary" : "focus:bg-c-primary"} focus:text-white font-semibold`}>Newest</SelectItem>

                </SelectGroup>
            </SelectContent>
        </Select>
    </div>

    <div className="my-container flex justify-center items-center md:hidden">
    <Drawer className="md:hidden">
        <DrawerTrigger>
            <div className="w-full gap-2 bg-transparent border-c-primary border-2 text-c-primary font-texts font-bold
                flex flex-row rounded-md px-2 py-1
            ">
                <FilterIcon /> Open Filters
            </div>
        </DrawerTrigger>
        <DrawerContent className="bg-c-back">
            <DrawerTitle className="font-titles text-lg text-white my-container py-3">
                Choose Filters
            </DrawerTitle>
            <div className="flex flex-wrap gap-4 w-full my-container bg-c-back text-white py-4">
                <Select className="bg-c-back font-texts text-white w-full"
                    value={selectedType}
                    onValueChange={value => handleTypeChange(value)}

                >
                    <SelectTrigger className="w-[220px] max-sm:w-full bg-[#333] font-texts">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#333] text-white font-texts">
                        <SelectGroup>
                        <SelectLabel className="font-bold">Type</SelectLabel>
                        <SelectItem value="movies" className="focus:bg-c-primary focus:text-white text-c-primary font-semibold">Movies</SelectItem>
                        <SelectItem value="tv" className=" focus:bg-c-secondary focus:text-white text-c-secondary font-semibold">TV Shows</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select className="bg-c-back font-texts text-white w-full"
                    value={selectedGenre}
                    onValueChange={value => handleGenreChange(value)}
                >
                    <SelectTrigger className="w-[280px] max-sm:w-full max-md:w-[220px] bg-[#333] font-texts">
                        <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#333] text-white font-texts">
                        <SelectGroup>
                        <SelectLabel className="font-bold">Genre</SelectLabel>
                        {/* <SelectItem value="any" className="focus:bg-c-primary focus:text-white font-semibold">Any</SelectItem> */}
                        {
                            selectedType == "tv" ? tvFiltersGenres.map(genre => (
                                <SelectItem value={genre.name} key={genre.id} className="focus:bg-c-secondary focus:text-white font-semibold">{genre.name}</SelectItem>
                            )) : movieFiltersGenres.map(genre => (
                                <SelectItem value={genre.name} key={genre.id} className="focus:bg-c-primary focus:text-white font-semibold">{genre.name}</SelectItem>
                            )) 
                        }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select className="bg-c-back font-texts text-white w-full"
                    value={selectedYear}
                    onValueChange={value => handleYearChange(value)}
                >
                    <SelectTrigger className="w-[220px] max-sm:w-full bg-[#333] font-texts">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#333] text-white font-texts">
                        <SelectGroup>
                        <SelectLabel className="font-bold">Year</SelectLabel>
                        {/* <SelectItem value="any" className="focus:bg-c-primary focus:text-white font-semibold">Any</SelectItem> */}
                        {
                            years.map(year => (
                                <SelectItem value={year.toString()} key={year} className={`${selectedType == "tv" ? "focus:bg-c-secondary" : "focus:bg-c-primary"} focus:text-white font-semibold`}>{year}</SelectItem>
                            ))
                        }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select className="bg-c-back font-texts text-white w-full"
                    value={selectedSort}
                    onValueChange={value => handleSortChange(value)}
                >
                    <SelectTrigger className="w-[220px] max-sm:w-full bg-[#333] font-texts">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#333] text-white font-texts">
                        <SelectGroup>
                        <SelectLabel className="font-bold">Sort by</SelectLabel>
                        {/* <SelectItem value="any" className="focus:bg-c-primary focus:text-white font-semibold">Any</SelectItem> */}

                        <SelectItem value={"popular"} className={`${selectedType == "tv" ? "focus:bg-c-secondary" : "focus:bg-c-primary"} focus:text-white font-semibold`}>Most Popular</SelectItem>
                        <SelectItem value={"oldest"} className={`${selectedType == "tv" ? "focus:bg-c-secondary" : "focus:bg-c-primary"} focus:text-white font-semibold`}>Oldest</SelectItem>
                        <SelectItem value={"newest"} className={`${selectedType == "tv" ? "focus:bg-c-secondary" : "focus:bg-c-primary"} focus:text-white font-semibold`}>Newest</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        <DrawerClose>
            <Button className="bg-c-primary text-white font-bold mb-5 ">Apply</Button>
        </DrawerClose>
        </DrawerContent>
    </Drawer>
    </div>

    </>
  )
}

export default DiscoverFilters