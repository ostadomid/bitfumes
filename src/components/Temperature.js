import React, { useState } from 'react';

const Temperature = () => {

    const [cel, setCel] = useState(0);

    return (
        <div className="flex flex-col justify-center items-center">
            <input className="border-2 shadow border-blue-200" id="cell" type="Number" onChange={(e) => { setCel(Number(e.target.value)) }} value={cel} />
            <input className="border-2 shadow border-blue-200" id="ferr" type="Number" value={(cel * 9 / 5) + 32} onChange={e => setCel((e.target.value - 32) * 5 / 9)} />

        </div>
    )
}

export default Temperature;