import React, { useCallback, useState, useEffect, useRef } from 'react';
import useQuotes from '../hooks/useQuotes';

const { debounce } = require('../lodash.custom.js');


const pureScrollHandler = debounce((setIsLoading, setPage, page) => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        setIsLoading(true);
        console.info(`Current Page=${page} - Setting Page To ${page + 1} `)
        setPage(page + 1);
    }
}, 500);

const Quotes = (props) => {


    const [page, setPage] = useState(1);
    const [error, q, setQ] = useQuotes(page, 20);
    const [isLoading, setIsLoading] = useState(false);
    const refPage = useRef(page)
    refPage.current = page;
    // const scrollHandler = (debounce((e) => {
    //     if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    //         setIsLoading(true);
    //         console.info(`Current Page=${page} - Setting Page To ${page + 1} `)
    //         setPage(page + 1);
    //     }
    // }, 500));


    // const x = useCallback(() => {
    //     console.log(`Test:: page     = ${page}`)
    //     console.log(`Test:: q.length = ${q.length}`)
    // }, [page, q.length])

    // x();

    useEffect(() => {
        setIsLoading(false)

    }, [q]);

    const handler = useCallback(() => { pureScrollHandler(setIsLoading, setPage, refPage.current) }, []);

    useEffect(() => {

        window.addEventListener('scroll', handler);
        return () => {
            window.removeEventListener('scroll', handler);
        }
    })

    //window.addEventListener('scroll', scrollHandler)

    return (
        <div className="flex flex-col justify-center items-start">
            {isLoading && (<p style={{ top: 0 }} className="border-2 bg-green-300 shadow-md p-4 m-4 fixed">Loading...</p>)}
            {error && (<p style={{ top: 0 }} className="border-2 bg-red-500 shadow-md p-4 m-4 fixed">Error Fetching Data!</p>)}
            {q.map(e => (
                <div key={e.id} className="cursor-pointer hover:bg-blue-100 border-2 border-blue-300 shadow-md m-2 p-2 w-1/2 rounded-md">
                    <p><span className="border rounded-3xl bg-blue-800 text-white border-blue-800 px-2">{e.id}</span> {e.text}</p>
                </div>
            ))}
        </div>
    )
}

export default Quotes;