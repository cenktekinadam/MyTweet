import React, { useEffect, useState } from 'react'
import Form from '../../components/Form';
import Post from '../../components/Post';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Loader from '../../components/Post/Loader';

const Main = ({ user }) => {
    const [tweets, setTweets] = useState(null)

    useEffect(() => {
        // Abone olunacak col referansını al
        const tweetsCol = collection(db, 'tweets');
        // Sorgu ayarlarını belirt
        const q = query(tweetsCol, orderBy("createdAt", "desc"))

        // Coldaki verleri abone ol 
        const unSub = onSnapshot(q, (snap) => {
            const temp = [];
            //! Koleksiyon içerisndeki verilere erişip bize lazım olan dataları diziye aktar
            snap.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }))
            setTweets(temp)

        })
        // Sayfadan Ayrılırsa Aboneliği sonlandır
        return () => unSub();
    }, [])


    return (
        <div className='border-zinc-600 border overflow-y-auto max-sm:w-4/4'>
            <header className='font-bold p-4 border-b border-zinc-600'>
                Anasayfa
            </header>


            <Form user={user} />
            {!tweets ? <Loader /> : tweets.map((tweet, i) => (
                <Post key={i} tweet={tweet} />
            ))}
        </div>
    )
}

export default Main;