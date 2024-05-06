import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const Prodected = () => {
    // Kullanıcı yetki Kontrol state'ti
    const [isAuth, setisAuth] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setisAuth(user ? true : false)
        })
    })
    if (isAuth === false) {
        return <Navigate to={'/'} />
    }
    return (
        <div className=''>
            <Outlet />
        </div>
    )
}

export default Prodected;