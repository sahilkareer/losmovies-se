'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FaArrowUp, FaSearch } from 'react-icons/fa';
import useLocalStorage from '@/utils/useLocalStorage';
import { Input } from './ui/input';

const SearchBar = ({scrollPosition}) => {
    
    
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('')
    const [isInputVisible, setInputVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [buttonFocused, setButtonFocused] = useState(false);
    
    
    const [storedValue, setValue, updateObjectInArray] = useLocalStorage('searchHistory', []);
    const [allSuggestions, setAllSuggestions] = useState(storedValue)
    const [suggestions, setSuggestions] = useState([])






    const pathname = usePathname();


    const inputRef = useRef(null);

    // useEffect(() => {
    //   if (inputRef.current && pathname == '/') {
    //     inputRef.current.focus();
    //   }
    // }, []);





    const handleButtonClick = (e) => {
        e.preventDefault()
        
        if (isInputVisible) {
            if (searchTerm.length < 2) return alert('Search term must be at least 2 characters long');
            handleSearch(e)
            setInputVisible(false)
        } else {
            setInputVisible(true)
        }
      };
    
    
      const editTerm = (e) => { 

            const value = e.target.value;
            setSearchTerm(value)


            if (value) {
            const filteredSuggestions = allSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            } else {
            setSuggestions([]);
            }


      }

    
        const handleSearch = (e) => {
            e.preventDefault()
    
            // Check if searchTerm contains bad words
            const badWords = ['fuck', 'porn'];
    
            if (badWords.some(word => searchTerm.toLowerCase().includes(word))) {
                return alert('Search term contains inappropriate words');
            }
    
    
            if (searchTerm.length == 0) return;

            if (!isFocused && !buttonFocused) return;


            // check if search term contains other letters than english
        const containsNonEnglishLetters = /[^\u0000-\u007F]+/.test(searchTerm);
        if (containsNonEnglishLetters) {
            return alert('Search term must be in English');
        }

            
            if (!allSuggestions.includes(searchTerm)) {
                setAllSuggestions([...allSuggestions, searchTerm])
                setValue([...allSuggestions, searchTerm])
            }
        
            router.push(`/search?q=${searchTerm}&p=1`)
        }

        const searchFromSug = (s) => {
            setSearchTerm(s)
            if (s.length < 2) return alert('Search term must be at least 2 characters long');
            const badWords = ['fuck', 'porn'];


            
            if (badWords.some(word => s.toLowerCase().includes(word))) {
                return alert('Search term contains inappropriate words');
                }
                
                
                if (s.length == 0) return;
                
                
                // check if search term contains other letters than english
                const containsNonEnglishLetters = /[^\u0000-\u007F]+/.test(s);
                if (containsNonEnglishLetters) {
                    return alert('Search term must be in English');
                    }
                    
            isInputVisible && setInputVisible(false)
            router.push(`/search?q=${s}&p=1`)

        }



  return (
    <>
    <form onSubmit={handleSearch} className="relative flex justify-end font-texts items-center sm:w-[360px] text-[19px] max-sm:hidden">
            
            
            {/* <input type="text"
                ref={inputRef}
                value={searchTerm}
                minLength={2} 
                onChange={editTerm} 
                className="w-full search-bar" 
                placeholder="Search..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                 />
            <button type='submit' className="absolute right-4 flex justify-center items-center">
                <FaSearch className="text-c-primary" />
            </button> */}

            {/* <div className="relative flex-1">
            <Input
              type="text"
              ref={inputRef}
                value={searchTerm}
                minLength={2} 
                onChange={editTerm} 
              placeholder="Search for movies, shows, and more..."
              className="pl-10 pr-4 py-2 backdrop-blur-[2px] bg-c-gris/60 placeholder-white/40 shadow-lg rounded-md bg-opacity-[0.24] text-white focus:outline-none outline-none border-none"
            />
            <button type="submit" className='absolute shadow-sm left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300'>
            <FaSearch className="" />
            </button>
          </div> */}

                <div className="input-wrapper">
                    <button className="icon-search" onFocus={() => {setTimeout(() => {
                        setButtonFocused(true)
                    }, 100);}} onBlur={() => {setTimeout(() => {
                        setButtonFocused(false);
                    }, 100);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#fff" d="M22 22L20 20"></path>
                    </svg>
                    </button>
                    <input placeholder="Search.." 
                            ref={inputRef}
                            value={searchTerm}
                            minLength={2} 
                            onChange={editTerm}
                            onFocus={() => {setIsFocused(true);}}
                            onBlur={() => {setIsFocused(false);}}
                    className="input-search font-texts placeholder:text-white/40" name="text" type="text" />
                </div>

            {/* {isFocused && suggestions.length > 0 && (
            <ul className="absolute top-[100%] z-10 w-full bg-c-back border border-c-gris rounded-md shadow-lg">
            {suggestions.map((suggestion, index) => (
                <li
                key={index}
                className="p-2 hover:pl-3 font-texts text-white transition-all duration-200 border-b border-c-gris cursor-pointer"
                onMouseDown={() => searchFromSug(suggestion)}
                >
                {suggestion}
                </li>
            ))}
            </ul>
        )} */}
        </form>
        
        {/* Another Searchbar for small-width devices */}
        <form className="hiden max-sm:block">
            <button onClick={handleButtonClick} className="p-2 text-white text-[19px] bg-transparent rounded-full border-c-primary sm:hidden">
                <FaSearch className="text-c-primary" />
            </button>
            <div className={`bg-c-back ${pathname == '/' ? scrollPosition <= 300 ? 'bg-opacity-45' : 'bg-opacity-100 shadow-c-primary shadow-md' : 'bg-opacity-100 shadow-c-primary shadow-md'}  w-full -bottom-[80px] absolute flex transition-all duration-300 ease-in-out justify-center transform items-center left-0 h-20 origin-top ${isInputVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <input 
                type="text"
                value={searchTerm}
                ref={inputRef}
                minLength={2} 
                onChange={editTerm} 
                className={`absolute w-[80%] ${!isInputVisible && 'hiden'} search-bar`} 
                placeholder="Search..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                />
                <FaArrowUp
                    onClick={() => setInputVisible(false)}
                className="text-c-primary right-4 absolute" />
            </div>
            {isFocused && suggestions.length > 0 && (
            <ul className="absolute top-[169%] left-[10%] z-10 w-[80%] bg-c-back border border-c-gris rounded-md shadow-lg">
            {suggestions.map((suggestion, index) => (
                <li
                key={index}
                className="p-2 hover:pl-3 font-texts text-white transition-all duration-200 border-b border-c-gris cursor-pointer"
                onMouseDown={() => searchFromSug(suggestion)}
                >
                {suggestion}
                </li>
            ))}
            </ul>
        )}
        </form>
        </>
  )
}

export const SearchInput = () => {



    return (
      <div className="input-wrapper">
        <button className="icon-search" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#fff" d="M22 22L20 20"></path>
          </svg>
        </button>
        <input placeholder="Search.." 
                ref={inputRef}
                value={searchTerm}
                minLength={2} 
                onChange={editTerm}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
        className="input-search font-texts placeholder:text-white/40" name="text" type="text" />
      </div>
    );
  };

export default SearchBar