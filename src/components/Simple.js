import React, { useState, useEffect, useLayoutEffect } from 'react';


const Simple = () => {

    const [title, setTitle] = useState('I am a P')

    useLayoutEffect(() => {
        setTitle('By P I mean Paragraph :D')
    })

    return (
        <p>{console.info(`Simple Rendered [${title}]`)}{title}</p>
    )
}

export default Simple