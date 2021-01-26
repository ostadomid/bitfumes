import React, { useState, useEffect, useRef } from 'react'

const Selector = () => {

    const [food, setFood] = useState('Nothing Yet');
    const [client, setClient] = useState('No Client Yet');
    useEffect(() => {
        console.log("Selector: [Mounted]");
    }, [])
    useEffect(() => {
        console.log("Selector: [Updated]");
        return () => {
            console.info(`... CleanUp ...\tFood=${food}`)
        }
    })
    const clientInput = useRef();

    console.log("Selector: [Render]")
    return (
        <div className="mx-6 border border-solid border-2 border-blue-800 my-5 p-5">
            <div className="flex flex-col justify-center items-center">
                <button onClick={() => { clientInput.current.focus() }}>Focus</button>
                <input ref={clientInput} className="border-2 border-green-300" type="text" value={client} onChange={(e) => setClient(e.target.value)} />
                <p className="text-blue-300">{client}</p>
            </div>

            <h2 className="mb-4 text-center">{food}</h2>
            <div>
                <button className="border-2 rounded border-blue-400 px-3 mx-2" onClick={() => { setFood(prev => { console.log(`Prev=${prev}`); return "Ham" }) }}>Ham</button>
                <button className="border-2 rounded border-green-400 px-3 mx-2" onClick={() => { setFood("Veg") }}>Veg</button>
                <button className="border-2 rounded border-red-400 px-3 mx-2" onClick={() => { setFood("Drink") }}>Drink</button>
            </div>
        </div>
    )
}
export default Selector