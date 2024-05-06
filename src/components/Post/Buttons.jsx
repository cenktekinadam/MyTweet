import { LuMessageCircle } from "react-icons/lu";
import { FaRetweet, FaRegHeart, FaShareFromSquare, FaHeart } from "react-icons/fa6";

import { } from "react-icons/fa";
const Buttons = ({ isLiked, likeCount, toggleLike }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="p-2 rounded-full hover:bg-[#00a6ff43]">
                <LuMessageCircle />
            </div>
            <div className="p-2 rounded-full hover:bg-[#00ff6e43]">
                <FaRetweet />
            </div>
            <div onClick={toggleLike} className="flex justify-center items-center  gap-2 p-2 rounded-full hover:bg-[#ea00ff43]">
                {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                {likeCount}
            </div>
            <div className=" p-2 rounded-full hover:bg-[#35536377]">
                <FaShareFromSquare />
            </div>
        </div>
    )
}

export default Buttons