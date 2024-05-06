import React, { useState } from 'react'
import UserInfo from './UserInfo';
import Content from './Content';
import Buttons from './Buttons';
import { auth, db } from '../../firebase/config';
import DropDown from './DropDown';
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { toast } from 'react-toastify';
import EditPost from './EditPost';

const Post = ({ tweet }) => {

    const [isEdit, setIsEdit] = useState(false)
    //postu sil
    const handleDelete = () => {
        const tweetRef = doc(db, 'tweets', tweet.id)
        deleteDoc(tweetRef).then(() => toast.warn("Başarıyla Silindi"))
            .catch((err) => toast.error("Silinirken hata oluştu"))
    }
    // Postu Düzenle
    const handleEdit = () => {
        setIsEdit(true)
    }
    // Like'la
    const isLiked = tweet.likes.includes(auth.currentUser.uid)
    const toggleLike = async () => {
        const tweetRef = doc(db, 'tweets', tweet.id);
        await updateDoc(tweetRef, {
            likes: isLiked ? arrayRemove(auth.currentUser.uid)
                : arrayUnion(auth.currentUser.uid)
        });
        console.log("happy bırtday to me", tweet.id);
    }

    return (
        <div className='flex gap-3 border-b py-6 px-3 border-zinc-600 max-sm:w-10/12 relative'>
            <div className='flex absolute '>
                <img className='w-12 h-12 rounded-full ' src={tweet.user.photo} alt={tweet.user.name} />
            </div>
            <div className='w-full '>
                <div className='ms-16 justify-between flex items-center'>
                    <UserInfo tweet={tweet} />
                    {auth.currentUser.uid === tweet.user.id && <DropDown handleDelete={handleDelete} handleEdit={handleEdit} />}
                </div>
                {isEdit ? <EditPost tweet={tweet} close={() => setIsEdit(false)} />
                    : <Content tweet={tweet} />}
                <Buttons isLiked={isLiked} toggleLike={toggleLike} likeCount={tweet.likes.length} />
            </div>
        </div>
    )
}

export default Post;