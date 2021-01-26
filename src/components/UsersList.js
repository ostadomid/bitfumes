import React, { useEffect, useState } from 'react'

const UsersList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log("Trying to fetch data...");
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(resp => resp.json())
            .then(setUsers)
            .catch((err) => {
                console.log(err);
                setUsers(['Cant Fetch Users'])
            })
    }, [])
    const list = users.map(u => (
        <li key={u.id} >{`${u.name} [${u.email}]`}</li>
    ))
    return (
        <ul>
            {list}
        </ul>
    )

}

export default UsersList