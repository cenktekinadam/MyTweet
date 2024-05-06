import React, { useState } from 'react'
import { BsCardImage } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import Loader from '../Post/Loader'
const Form = ({ user }) => {

    const [isLoading, setisLoading] = useState(false);

    // Tweet kolleksiyonun referansı
    const tweetsCol = collection(db, 'tweets')
    // Media'storage yükleyip url döndürür
    const uploadStore = async (file) => {
        console.log(file);
        // Dosya REsim değilse fonk durdu
        if (!file || !file?.type.startsWith('image')) return null
        //Dosyanın yükleneceği konumun ref al
        const imgRef = ref(storage, v4() + file.name);
        try {
            //Aldıgımız refin kodunu dosyaya yükle
            await uploadBytes(imgRef, file)
            // Storage yüklenen dosyanın urlini return et
            return await getDownloadURL(imgRef, file)
        } catch (err) {
            toast.error('Resmi Yüklerken Bir Hata oluştu', err.code)
            return null
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault()
        // Form verilerine eriş 
        const text = e.target[0].value;
        const file = e.target[1].files[0];
        //Yazı ve resim içeriği yoksa uyar
        if (!text && !file) return toast.info('Lütfen içerik ekleyiniz', { position: 'bottom-right' })
        // Media varsa storage yükle
        setisLoading(true)

        try {
            const url = await uploadStore(file)

            //Yeni tweet dökümanını kolleksiyona ekle
            await addDoc(tweetsCol, {
                textContent: text,
                imageContent: url,
                createdAt: serverTimestamp(),
                likes: [],
                isEdited: false,
                user: {
                    id: user.uid,
                    name: user.displayName,
                    photo: user.photoURL,
                },

            });
        } catch (err) {
            toast.error("Tweet'i Gönderirken Bir hata oluştu")
        }
        setisLoading(false);
        e.target.reset()
    }


    return (
        <form onSubmit={handleSubmit} className='flex gap-3 border-b border-zinc-600 p-4 max-sm:w-4/5'>
            <img className='w-10 h-10 md:h-[45px] rounded-full mt-1' src={user?.photoURL} />


            <div className='w-full' >
                <input className='w-full mt-1 mb-2 bg-transparent outline-none md:text-lg' placeholder="Neler Oluyor" type="text" />
                <div className='flex justify-between items-center'>

                    <label className='text-lg transition p-4 rounded-full hover:bg-gray-800 cursor-pointer' htmlFor="icon">
                        <BsCardImage />
                        <input className='hidden' id='icon' type="file" />

                    </label>


                    <button className='bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800 '>
                        {isLoading ? <Loader /> : 'Tweetle'}
                    </button>
                </div>
            </div>
        </form >
    )
}

export default React.memo(Form);