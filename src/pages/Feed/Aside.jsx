import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config'

const Aside = () => {
    const [count, setCount] = useState()

    useEffect(() => {
        const tweetCol = collection(db, 'tweets');

        onSnapshot(tweetCol, (snap) => {
            setCount(snap.size)
        })
    }, [])
    return (
        <div className='max-xl:hidden p-4'>
            <h1 className='text-xl font-semibold '>Gönderi Sayısı : {count}</h1>
        </div>
    )
}
// Ana Kapsayıcısının render işlemi birden fazla olması ihtiyacından Aside bileşenide aynı sayıda render olmasına sebep oluyordu.Bu  gereksiz render işlemi optimizasyon sorununa sebep olacağından memo kullandım
export default React.memo(Aside)