import React, { useEffect, useState } from 'react'
import Aside from './Aside'
import Main from './Main'
import Nav from './Nav'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/config'

const Feed = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {

        const sub = onAuthStateChanged(auth, (user_data) => {
            setUser(user_data)
        })

        return () => sub();
    }, [])

    return (
        <div className='feed h-screen bg-black overflow-hidden'>
            <Nav user={user} />
            <Main user={user} />
            <Aside />
        </div>
    )
}

export default Feed