import React, { useEffect, useRef, useState } from 'react'
import './Images.css'
const Image = () => {
    const endpoint = `https://pixabay.com/api/?key=19350885-af5dfa333ec4283760e9cdd9d&query=cute`
    const [images, setImages] = useState([
        "",
        "",
        "",
        ""
    ]);
    useEffect(() => {
        fetch(endpoint)
            .then(resp => resp.json())
            .then(data => {
                setImages(data.hits.map(hit => ({ id: hit.id, url: hit.previewURL })))
            })

    }, [])

    function addImage(e) {
        if (13 === e.keyCode) {
            let url = e.target.value;
            e.target.value = "";
            setImages([...images, { id: 1, url }]);
        }
    }
    const removeImage = (idx) => {

        setImages(images.filter((img, index) => index !== idx))
    }
    const counter = useRef(0);
    useEffect(() => {
        counter.current = images.length
        console.info(counter)
    })
    return (
        <div>
            <h2>{counter.current} Images </h2>
            <div className="flex flex-row">
                <input className="flex-grow border-2 border-blue-400 my-4" type="text" onKeyDown={addImage} placeholder="New Image URL + Enter" />
            </div>
            <div className="grid grid-cols-5 gap-5 pb-2">
                {images.map((img, idx) => (
                    <div className="image-holder" key={img.id}>
                        <img onMouseEnter={() => { console.log(idx) }} alt="a sample" src={img.url} />
                        <span className="removable" onClick={() => { removeImage(idx) }}>X</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Image