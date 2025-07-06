/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button } from "@/components/ui/button"
import useLocalStorage from "@/utils/useLocalStorage";
import Image from "next/image"
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Download } from "lucide-react";
// import Link from "next/link";
import { TransitionLink } from "./TransitionLink";
import { useRouter } from "next/navigation";


const serverList = [
    {
      id: 1,
      label: "Server 1",
      src: ({ type, id, watchSeason, watchEP }) =>
        `https://www.2embed.skin/embed${type === "tv" ? "tv" : ""}/${id}${type === 'tv' ? `&s=${watchSeason}&e=${watchEP}` : ''}
      `,
    },
    {
      id: 2,
      label: "Server 2",
      src: ({ type, id, watchSeason, watchEP }) =>
        `https://vidlink.pro/${type === "tv" ? "tv" : "movie"}/${id}${type === 'tv' ? `/${watchSeason}/${watchEP}` : ''}?primaryColor=${type === "tv" ? 'ff6347' : "009ACD"}&secondaryColor=1e1e1e&iconColor=ffffff&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true`,
    },
    {
        id: 3,
        label: "Server 3",
        src: ({ type, id, watchSeason, watchEP, serverChoose }) =>
        `https://vidsrc.cc/v3/embed/${type}/${id}${type === 'tv' && !serverChoose ? `/${watchSeason}/${watchEP}` : ''}`,
        props: { referrerPolicy: "origin" },
      },
      {
        id: 4,
        label: "Server 4",
        src: ({ type, id, watchSeason, watchEP, serverChoose }) =>
          `https://vidsrc.xyz/embed/${type}?tmdb=${id}${type === 'tv' && !serverChoose ? `&season=${watchSeason}&episode=${watchEP}` : ''}`,
      },
    {
      id: 5,
      label: "Server 5",
      src: ({ type, id, watchSeason, watchEP }) =>
        `https://vidsrc.vip/embed/${type === "tv" ? "tv" : "movie"}/${id}${type === 'tv' ? `/${watchSeason}/${watchEP}` : ''}`,
    },
    {
      id: 6,
      label: "Server 6",
      src: ({ id, type, watchSeason, watchEP }) =>
        `https://multiembed.mov/?video_id=${id}&tmdb=1${type === 'tv' ? `&s=${watchSeason}&e=${watchEP}` : ''}`,
    },
  {
    id: 7,
    label: "Server 7",
    src: ({ type, id, watchSeason, watchEP }) =>
      `https://player.vidsrc.co/embed/${type === "tv" ? "tv" : "movie"}/${id}${type === 'tv' ? `/${watchSeason}/${watchEP}` : ''}
        ?autoplay=true&autonext=true&nextbutton=true&poster=true
    `,
  },
];



export default function NewWatchFrame({type, id, data, episodesData, encId, routeId}) {

    const router = useRouter();

    const [storedValue, setValue, updateObjectInArray] = useLocalStorage('episodeNumber', []);

    const [storedServer, setServer, updateServerInArray] = useLocalStorage('server', 1);

    const objectExists = (array, idd) => {
        if (array.length > 0) {
            return array.some((item) => item.id === idd);
        }else {
            return false;
        }
    }


    const [selectedSeason, setSelectedSeason] = useState(objectExists(storedValue, encId) ? storedValue.find((item) => item.id === encId).s : 1);
    const [selectedServer, setSelectedServer] = useState(storedServer ? storedServer : 1);
    const [serversShown, setServersShown] = useState(false);
    const [serverChoose, setServerChoose] = useState(false)
    const [watchEP, setWatchEP] = useState(objectExists(storedValue, encId) ? storedValue.find((item) => item.id === encId).e : 1)
    const [watchSeason, setWatchSeason] = useState(objectExists(storedValue, encId) ? storedValue.find((item) => item.id === encId).s : 1)

    const [isEffectTriggered, setIsEffectTriggered] = useState(false);

    const [selectedEpisodeData, setSelectedEpisodeData] = useState(null)

    const [episodesLoading, setEpisodesLoading] = useState(false);
    const [episodes, setEpisodes] = useState(null);

    const updateSearchParams = (params) => {

        const convertParamsToUrl = (paramso, baseUrl = `/watch/${routeId}`) => {
            const query = new URLSearchParams(paramso).toString();
            return `${baseUrl}?${query}`;
          };

        const url = convertParamsToUrl(params)
      
        router.push(url);
      };

      const handleSeasonChange = (v) => {
        setSelectedSeason(v)

        let params = {};

        if (v) {
            params.season = v;
        }


        updateSearchParams(params);

        // return;
      }

      useEffect(() => {
        if (selectedSeason && type == "tv") {
            let params = {};
            params.season = selectedSeason;
            updateSearchParams(params);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selectedSeason])


    useEffect(() => {

        setSelectedEpisodeData(episodes && episodes?.episodes[watchEP - 1]);

    }, [watchEP, watchSeason])

    // const selectedEpisodeData = useMemo(() => {
    //     return episodes ? episodes?.episodes[watchEP - 1] : null;
    //   }, [watchEP, watchSeason]);


    useEffect(() => {
        setEpisodesLoading(true)
        if (episodesData) {
            setEpisodes(episodesData)
            setEpisodesLoading(false)
            // console.log(episodesData)
        }
    }, [episodesData])


    useEffect(() => {
        if (!isEffectTriggered && episodes && episodes.episodes.length > 0) {
          setSelectedEpisodeData(episodes.episodes[watchEP - 1]);
          setIsEffectTriggered(true); // Prevent it from running again
        }
      }, [episodes, isEffectTriggered]);


    const handleEpClick = (ep, s) => {
        setWatchEP(ep);
        setWatchSeason(s);
        // setSelectedEpisodeData(data)
        updateObjectInArray(encId, {id: encId, e: ep, s: s})
    }

    const serverClick = (ser) => {
        setServer(ser)
        setSelectedServer(ser)

    }

    const original = data?.original_language && data?.original_language == "es" ? true : false;

    const title = original ? data?.original_title ? data?.original_title : data?.original_name : data?.title ? data?.title : data?.name;


  return (
    <>


    {type == "tv" ? (
        <div className="grid relative md:grid-cols-[1fr_1.5fr] gap-6 w-full mx-auto p-0.5 md:p-6">

      <div className="rounded-lg max-md:order-3 md:max-w-[40vw] max-md:max-w-screen">
        <div className="pt-1 pb-3 max-md:px-0.5">
        <Select className="bg-c-back font-texts w-full text-white md:hidden border-none outline-none"
            value={selectedSeason}
            onValueChange={value => handleSeasonChange(value)}
        >
            <SelectTrigger className="w-full bg-[#333] font-texts">
                <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent className="bg-[#333] text-white font-texts">
                <SelectGroup>
                {/* {
                    episodes?.map(season => (
                        <SelectItem value={season?.season_number} key={season?._id} className="focus:bg-c-secondary focus:text-white font-semibold font-texts">
                            Season {season?.season_number + "   "}   ({season?.episodes?.length} Episodes)
                        </SelectItem>
                    ))
                } */}

                    {Array.from({ length: data?.last_episode_to_air?.season_number }, (_, index) => (
                        <SelectItem value={index + 1} key={index} className="focus:bg-c-secondary focus:text-white font-semibold font-texts">
                            Season {index + 1} 
                        </SelectItem>
                    ))}

                </SelectGroup>
            </SelectContent>
        </Select>


          {/* {episodes?.map((season) => (

            <div key={`${data?.imdbID}-season-${season.season_number}`} className={`grid gap-2 mt-4 ${selectedSeason != season.season_number && "hidden"} hide-scrollbar aspect-video overflow-y-scroll`}>
            {
                season?.episodes?.map((episode) => (
                    <div className={`flex rounded-md max-w-full h-fit cursor-pointer transition-all duration-200 ${watchSeason == season.season_number & watchEP == episode.episode_number ? 'bg-c-secondary' : 'hover:bg-c-secondary bg-c-secondary/30'} items-center gap-1`} onClick={() => handleEpClick(episode.episode_number, season.season_number)} key={`${data?.imdbID}-S${season.season_number}E${episode.episode_number}`}>
                      {episode.still_path ? (<Image src={`https://image.tmdb.org/t/p/w300${episode.still_path}`} alt={`S${season.season_number}E${episode.episode_number}`} width={100} height={56.3} className="rounded-md" unoptimized={true} />) :
                      (<div className="w-[100px] h-[56px] rounded-md bg-c-back border border-c-secondary" /> 

                      )
                       }                      
                      <Button variant="ghost" className="justify-start flex flex-wrap text-white hover:text-white font-texts bg-transparent hover:bg-transparent gap-0.5 text-left flex-1">
                        <span className="font-medium pr-1.5">{episode.episode_number}- {episode.name}</span>
                        {episode?.runtime && <span className={` text-sm ${watchSeason == season.season_number & watchEP == episode.episode_number ? "text-white opacity-80" : "text-c-gris"}`}>{episode?.runtime} mins</span>}
                      </Button>

                        
                    </div>

                ))
            }
            </div>
            
          ))
          } */}



        <div key={`${data?.imdbID}-season-${selectedSeason}`} className={`grid gap-2 mt-4 hide-scrollbar md:w-[40vw] md:h-[22.5vw] max-md:w-[99vw] max-md:h-[50vw] overflow-y-scroll overflow-x-hidden`}>
          {
            episodes?.episodes?.map((episode) => (
                <div className={`flex rounded-md md:w-[39vw] max-md:w-[99vw] h-fit cursor-pointer transition-all duration-200 ${watchSeason == selectedSeason & watchEP == episode.episode_number ? 'bg-c-secondary' : 'hover:bg-c-secondary bg-c-secondary/30'} items-center gap-1`} onClick={() => handleEpClick(episode.episode_number, selectedSeason)} key={`${data?.imdbID}-S${selectedSeason}E${episode.episode_number}`}>
                      {episode.still_path ? (<Image src={`https://image.tmdb.org/t/p/w300${episode.still_path}`} alt={`S${selectedSeason}E${episode.episode_number}`} width={100} height={56.3} className="rounded-md" unoptimized={true} />) :
                      (<div className="w-[100px] h-[56px] rounded-md bg-c-back border border-c-secondary" /> 

                      )
                       }                      
                      <Button variant="ghost" className="justify-start flex flex-wrap text-white hover:text-white font-texts bg-transparent hover:bg-transparent gap-0.5 text-left flex-1">
                        <span className="font-medium max-md:max-w-[60%] truncate">{episode.episode_number}- {episode.name}</span>
                        {episode?.runtime && <span className={`text-sm ${watchSeason == selectedSeason & watchEP == episode.episode_number ? "text-white opacity-80" : "text-c-gris"}`}>{episode?.runtime} mins</span>}
                      </Button>
                        <TransitionLink href={`/download?id=${encId}&s=${selectedSeason}&e=${episode.episode_number}`}
                            className="right-2 relative cursor-pointer"
                        >
                            <Download />
                        </TransitionLink>
                        
                    </div>
            ))
          }
        </div>
        </div>
      </div>

      <div className="md:hidden max-md:order-2 w-full px-2">
        <div className="flex flex-row justify-between">
        <h1 className="font-titles font-bold text-3xl">{title}</h1>
        </div>

        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden`}
        >
            <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500 font-secondary">Season {watchSeason}, Episode {watchEP}</p>
                <h2 className="text-lg font-semibold font-titles">{selectedEpisodeData?.name}</h2>
                <p className="text-sm text-gray-500 font-secondary">Duration: {selectedEpisodeData?.runtime ? `${selectedEpisodeData.runtime}min` : "N/A"}</p>
                <p className="text-sm text-gray-400 font-texts">{selectedEpisodeData?.overview}</p>
            </div>
        </div>
      </div>

      <div className="relative max-md:order-1 w-full max-w-2xl mx-auto rounded-lg overflow-hidden aspect-video border border-c-secondary">

        {/* {
                selectedServer === 2 ? (
                <iframe src={`https://vidsrc.xyz/embed/${type}?tmdb=${id}${type == 'tv' & !serverChoose ? `&season=${watchSeason}&episode=${watchEP}` : ''}`}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>):
                selectedServer === 3 ? (
                <iframe src={`https://vidsrc.cc/v3/embed/${type}/${id}${type == 'tv' & !serverChoose ? `/${watchSeason}/${watchEP}` : ''}`}
                referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>)
            : selectedServer === 4 ? (
                <iframe src={`                    
                    https://vidlink.pro/${type == "tv" ? "tv" : "movie"}/${id}${type == 'tv' ? `/${watchSeason}/${watchEP}` : ''}?primaryColor=${type == "tv" ? 'ff6347' : "009ACD"}&secondaryColor=1e1e1e&iconColor=ffffff&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true
                    `}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            ): 
             selectedServer === 5 ? (
                <iframe src={`
                    https://vidsrc.vip/embed/${type == "tv" ? "tv" : "movie"}/${id}${type == 'tv' ? `/${watchSeason}/${watchEP}` : ''}
                    `}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            ): 
             selectedServer === 1 ? (
                <iframe src={`
                    https://autoembed.pro/embed/${type == "tv" ? "tv" : "movie"}/${id}${type == 'tv' ? `/${watchSeason}/${watchEP}` : ''}
                    `}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            ): 
            (
            <iframe src={`https://multiembed.mov/?video_id=${id}&tmdb=1${type == 'tv' ? `&s=${watchSeason}&e=${watchEP}` : ''}`}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            )
        } */}

        <iframe src={serverList.find(server => server.id === selectedServer).src({ type, id, watchSeason, watchEP, serverChoose })}
        allowFullScreen
        className="w-full h-full border-0 rounded-md"
        />

            
      </div>

    </div>
    ):
    
    

    // MOVIES
    
    (
        <div className="md:px-10">

            <div className="relative max-w-full max-h-[90vh] mx-auto rounded-lg overflow-hidden aspect-video border border-c-primary">

            {/* {
                selectedServer === 2 ? (
                <iframe src={`https://vidsrc.xyz/embed/${type}?tmdb=${id}${type == 'tv' & !serverChoose ? `&season=${watchSeason}&episode=${watchEP}` : ''}`}
                referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>):
                selectedServer === 3 ? (
                <iframe src={`https://vidsrc.cc/v3/embed/${type}/${id}${type == 'tv' & !serverChoose ? `/${watchSeason}/${watchEP}` : ''}`}
                referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>)
            : selectedServer === 4 ? (
                <iframe src={`
                    https://vidlink.pro/${type == "tv" ? "tv" : "movie"}/${id}${type == 'tv' ? `/${watchSeason}/${watchEP}` : ''}?primaryColor=${type == "tv" ? 'ff6347' : "009ACD"}&secondaryColor=1e1e1e&iconColor=ffffff&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true
                    `}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            ): 
             selectedServer === 5 ? (
                <iframe src={`
                    https://vidsrc.vip/embed/${type == "tv" ? "tv" : "movie"}/${id}${type == 'tv' ? `/${watchSeason}/${watchEP}` : ''}
                    `}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            ): 
             selectedServer === 1 ? (
                <iframe src={`
                    https://autoembed.pro/embed/${type == "tv" ? "tv" : "movie"}/${id}${type == 'tv' ? `/${watchSeason}/${watchEP}` : ''}
                    `}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            ): 
            (
            <iframe src={`https://multiembed.mov/?video_id=${id}&tmdb=1${type == 'tv' ? `&s=${watchSeason}&e=${watchEP}` : ''}`}
                // referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                >
            </iframe>
            )
            } */}

            <iframe src={serverList.find(server => server.id === selectedServer).src({ type, id, watchSeason, watchEP, serverChoose })}
                allowFullScreen
                className="w-full h-full border-0 rounded-md"
                />

            
            </div>

            <div className="md:hidden w-full px-2 mt-3">
        <div className="flex flex-row justify-between">
        <h1 className="font-titles font-bold text-3xl">{title}</h1>
        </div>

        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden`}
        >
            <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500 font-secondary">Duration: {data?.runtime ? `${data.runtime}min` : "N/A"}</p>
                <p className="text-sm text-gray-400 font-texts">{data?.overview}</p>
            </div>
        </div>
      </div>
      </div>

    )
    }




            <div className="pb-5 mt-5 overflow-hidden">
            <p className="text-center font-secondary z-10 relative">
                Not Working Properly? <span className="underline cursor-pointer" onClick={() => setServersShown(!serversShown)}>Try Another Server</span>
            </p>
        
            <div className={`flex flex-col items-center my-6 justify-start ${serversShown ? "-translate-y-0" : "-translate-y-[250%]"} z-0 transition duration-300`}>
            <div className="flex gap-3 flex-wrap justify-center">
                {/* <button
                    onClick={() => serverClick(1)}
                    className={`px-4 py-2 max-sm:px-2 max-sm:text-sm max-sm:py-1 rounded-md focus:outline-none font-texts ${type == "tv" ? "text-c-secondary" : "text-c-primary"} transition-colors duration-300 ${
                    selectedServer === 1 ? type == "tv" ? 'bg-c-secondary text-white hover:bg-c-secondary' : 'bg-c-primary text-white hover:bg-c-primary' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    Server 1 (Ad-Free)
                </button>
                <button
                    onClick={() => serverClick(2)}
                    className={`px-4 py-2 max-sm:px-2 max-sm:text-sm max-sm:py-1 rounded-md focus:outline-none font-texts ${type == "tv" ? "text-c-secondary" : "text-c-primary"} transition-colors duration-300 ${
                    selectedServer === 2 ? type == "tv" ? 'bg-c-secondary text-white hover:bg-c-secondary' : 'bg-c-primary text-white hover:bg-c-primary' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    Server 2
                </button>
                <button
                    onClick={() => serverClick(3)}
                    className={`px-4 py-2 max-sm:px-2 max-sm:text-sm max-sm:py-1 rounded-md focus:outline-none font-texts ${type == "tv" ? "text-c-secondary" : "text-c-primary"} transition-colors duration-300 ${
                    selectedServer === 3 ? type == "tv" ? 'bg-c-secondary text-white hover:bg-c-secondary' : 'bg-c-primary text-white hover:bg-c-primary' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    Server 3
                </button>
                <button
                    onClick={() => serverClick(4)}
                    className={`px-4 py-2 max-sm:px-2 max-sm:text-sm max-sm:py-1 rounded-md focus:outline-none font-texts ${type == "tv" ? "text-c-secondary" : "text-c-primary"} transition-colors duration-300 ${
                    selectedServer === 4 ? type == "tv" ? 'bg-c-secondary text-white hover:bg-c-secondary' : 'bg-c-primary text-white hover:bg-c-primary' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    Server 4
                </button>
                <button
                    onClick={() => serverClick(5)}
                    className={`px-4 py-2 max-sm:px-2 max-sm:text-sm max-sm:py-1 rounded-md focus:outline-none font-texts ${type == "tv" ? "text-c-secondary" : "text-c-primary"} transition-colors duration-300 ${
                    selectedServer === 5 ? type == "tv" ? 'bg-c-secondary text-white hover:bg-c-secondary' : 'bg-c-primary text-white hover:bg-c-primary' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    Server 5
                </button>
                <button
                    onClick={() => serverClick(6)}
                    className={`px-4 py-2 max-sm:px-2 max-sm:text-sm max-sm:py-1 rounded-md focus:outline-none font-texts ${type == "tv" ? "text-c-secondary" : "text-c-primary"} transition-colors duration-300 ${
                    selectedServer === 6 ? type == "tv" ? 'bg-c-secondary text-white hover:bg-c-secondary' : 'bg-c-primary text-white hover:bg-c-primary' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    Server 6
                </button> */}

                {serverList.map(server => (
                    <button
                    key={server.id}
                    onClick={() => serverClick(server.id)}
                    className={`px-4 py-2 max-sm:px-2 max-sm:text-sm max-sm:py-1 rounded-md focus:outline-none font-texts ${type == "tv" ? "text-c-secondary" : "text-c-primary"} transition-colors duration-300 ${
                        selectedServer === server.id
                        ? type == "tv"
                            ? 'bg-c-secondary text-white hover:bg-c-secondary'
                            : 'bg-c-primary text-white hover:bg-c-primary'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    >
                    {server.label}
                    </button>
                ))}


            </div>
            </div>
            </div>

    
    </>
  )
}
