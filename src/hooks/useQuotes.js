import { useEffect, useState } from 'react'



const useQuotes = (page = 1, limit = 5) => {
    const [quotes, setQuotes] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    // fetch('http://localhost:2000/quotes')
    //     .then(res => res.json())
    //     .then(setQuotes)

    // useEffect(() => {
    //     const Q = new Promise((res, rej) => {
    //         setTimeout(() => {
    //             console.info('Data Fetched!')
    //             res([{ text: "A", author: "AA" }, { text: "B", author: "BB" }])
    //         }, 1000);
    //     });
    //     Q.then(setQuotes);

    // }, [])

    useEffect(() => {
        const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNjA3Mzc2Njc3fQ.BEg9C6BRVD95sRgwus8R7J_S2d8Pl-551C5nVQVNrIs';
        fetch(`http://127.0.0.1:5000/quotes?_page=${page}&_limit=${limit}`, { headers: { authorization: `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setFetchError(data.message);
                } else {
                    setTimeout(() => { setQuotes(prev => [...prev, ...data.quotes]) }, 300)
                }
            })
    }, [page, limit]);


    return [fetchError, quotes, setQuotes];
}

export default useQuotes;