import { GiCancel } from "react-icons/gi";
import { FaRegSave, FaSave } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import { TfiBackLeft } from "react-icons/tfi";

const EditPost = ({ tweet, close }) => {

    const [isImgDelete, setImgDelete] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTitle = e.target[0].value;
        const tweetRef = doc(db, 'tweets', tweet.id)
        if (isImgDelete) {
            await updateDoc(tweetRef, {
                textContent: newTitle,
                imageContent: null,
                isEdited: true
            })
        } else {
            await updateDoc(tweetRef, {
                textContent: newTitle,
                isEdited: true
            })
        }
        close()
    }

    return (
        <form onSubmit={handleSubmit}
            className="my-4 flex justify-center items-center flex-col">

            <div>
                <input defaultValue={tweet.textContent} type="text" className='rounded p-1 px-2 text-black' />


                <button type="submit" className="max-sm:mx-1 mx-5 p-2 border border-zinc-500 text-green-400 rounded-lg shadow hover:bg-zinc-700">
                    <FaRegSave />
                </button>
                <button onClick={close} type="button"
                    className="max-sm:mx-1 mx-5 p-2 border border-zinc-500 text-red-400 rounded-lg shadow hover:bg-zinc-700">
                    <GiCancel />
                </button>
            </div>
            {tweet.imageContent && (
                <div className="relative flex w-full max-sm:mt-3">

                    <img className={`${isImgDelete ? 'blur' : ''} my-2 rounded-lg object-cover max-h-[400px] w-full`}
                        src={tweet.imageContent} />

                    <button type="button" onClick={() => setImgDelete(!isImgDelete)}
                        className="absolute border  top-0 right-0 text-xl p-2 bg-white transition text-red-600 hover:scale-90 rounded-full  ">
                        {isImgDelete ? <TfiBackLeft /> : <GoTrash />}
                    </button>
                </div>
            )}


        </form>
    )
}

export default EditPost