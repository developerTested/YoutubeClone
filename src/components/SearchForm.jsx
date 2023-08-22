import React, { useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci"
import { MdClose } from "react-icons/md"
import axios from 'axios';
import { useOutsideClick } from '../utilities/useHandleClick';

export default function SearchForm() {

    const [q, setQ] = useState("");
    const [results, setResults] = useState([]);
    const [focusIndex, updateFocusIndex] = useState(-1);

    const searchRef = useRef(null);

    const keys = {
        ENTER: 13,
        UP: 38,
        DOWN: 40
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault();

        if (q.length > 0) {

            const query = results[focusIndex] ?? q;

            navigate('/search?q=' + query);

            setQ(query);

            setResults([]);
        }
    }

    const searchQueryHandler = (event) => {
        event.preventDefault();

        switch (event.keyCode) {
            case keys.ENTER:
                if (q.length > 0) {
                    navigate('/search?q=' + q);
                    setResults([]);
                }

                break;
            case keys.UP:

                if (focusIndex > -1) {
                    const newIndex = focusIndex - 1;
                    updateFocusIndex(newIndex);
                    const query = results[newIndex] ?? q;
                    setQ(query);
                }
                break;
            case keys.DOWN:
                if (focusIndex < results.length - 1) {
                    updateFocusIndex(focusIndex + 1);
                    const query = results[focusIndex + 1] ?? q;
                    setQ(query);
                }
                break;
        }
    };

    const handleOnChange = (e) => {
        setQ(e.target.value);

        if (q) {
            fetchAutoComplete();
        }
    }

    const handleResultClick = (x) => {
        setQ(x);
        navigate('/search?q=' + x);
        setResults([]);
    }

    const handleCloseBtn = () => {
        setResults([]);
        updateFocusIndex(-1)
        setQ('');
    }

    useOutsideClick(searchRef.current, () => {
        setResults([]);
        updateFocusIndex(-1)
    });

    async function fetchAutoComplete() {

        try {

            const response = await axios.get('/api/autocomplete?q=' + q);

            setResults(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div ref={searchRef} className="search-wrapper relative group">
            <Form action='/search' method='get' className="w-full group flex items-center" onSubmit={handleSubmit}>

                <div className="relative flex items-center h-8 md:h-10 md:ml-10 md:pl-5 border border-black/20 dark:border-white/20 rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <CiSearch className='w-6 h-6' />
                    </div>
                    <div className="relative">

                        <input
                            onChange={handleOnChange}
                            onKeyUp={searchQueryHandler}
                            value={q}
                            name="q"
                            type="text"
                            className="w-full bg-transparent outline-none dark:text-white pr-5 pl-5 md:pl-0 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                            placeholder="Search"
                        />
                    </div>
                    {q.length ? <button onClick={handleCloseBtn} type="reset" className='flex items-center justify-center text-center absolute top-auto bottom-auto right-0 w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/20'>
                        <MdClose className="w-6 h-6" />
                    </button> : ""}

                    {results.length ? <div className="search-results w-full rounded-b-lg mt-2 flex flex-col dark:text-white absolute left-0 right-0 top-full bg-white dark:bg-black">
                            {results.map((x, i) =>
                                <div onClick={() => handleResultClick(x)} key={i} className={`${focusIndex === i ? 'bg-slate-100 dark:bg-white/5' : ''} flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5`}>
                                    <div className="icon">
                                        <CiSearch className='w-6 h-6' />
                                    </div>
                                    <div className="label">{x}</div>
                                </div>
                            )}
                        </div>
                        : ''}
                </div>
                <button
                    type='submit'
                    className="w-10 md:w-16 h-8 md:h-10 flex items-center justify-center border border-l-0 border-black/20 dark:border-white/20 rounded-r-3xl bg-gray-100 dark:bg-white/10"
                >
                    <CiSearch className='w-6 h-6' />
                </button>
            </Form>
        </div>
    );
}