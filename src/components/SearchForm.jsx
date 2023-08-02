import React, { useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { CiSearch } from "react-icons/ci"
import { MdClose } from "react-icons/md"
import axios from 'axios';

export default function SearchForm() {

    const [q, setQ] = useState("");
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);

    const navigate = useNavigate();

    const searchQueryHandler = (event) => {
        if ((event?.key === "Enter") && q.length > 0) {
            event.preventDefault();
            navigate('/search?q=' + q);
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
        setQ('');
    }

    useEffect(() => {
        return () => {
            setResults([]);
        }
    }, [])

    async function fetchAutoComplete() {

        try {

            const response = await axios.get('/api/autocomplete?q=' + q);

            setResults(response.data);

        } catch (error) {

        }

    }

    return (
        <div className="search-wrapper relative">
            <Form action='/search' method='get' className="w-full group flex items-center" onSubmit={(e) => searchQueryHandler(e)}>
                <div className="relative flex items-center h-8 md:h-10 md:ml-10 md:pl-5 border border-black/20 dark:border-white/20 rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <CiSearch className='w-6 h-6' />
                    </div>
                    <input
                        onChange={handleOnChange}
                        onKeyUp={searchQueryHandler}
                        value={q}
                        name="q"
                        type="text"
                        className="w-full bg-transparent outline-none dark:text-white pr-5 pl-5 md:pl-0 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        placeholder="Search"
                    />
                    {q.length ? <button onClick={handleCloseBtn} type="reset" className='flex items-center justify-center text-center absolute top-auto bottom-auto right-0 w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/20'>
                        <MdClose className="w-6 h-6" />
                    </button> : ""}

                    {results.length ? <>
                        <div className="search-results w-full rounded-b-lg mt-2 flex flex-col dark:text-white absolute left-0 right-0 top-full bg-white dark:bg-black">
                            {results.map((x, i) =>

                                <div onClick={() => handleResultClick(x)} key={i} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5">
                                    <div className="icon">
                                        <CiSearch className='w-6 h-6' />
                                    </div>
                                    <div className="label">{x}</div>
                                </div>
                            )}
                        </div>
                    </>
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