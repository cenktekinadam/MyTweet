import React from 'react'

const Content = ({ tweet }) => {
    return (
        <div className='bg-[#22212174] rounded mt-3 '>
            {tweet.textContent && <p className='text-center font-mono'>{tweet.textContent}</p>}


            {tweet.imageContent && (
                <img className='my-2 rounded-lg object-cover max-h-[400px] w-full ' src={tweet.imageContent} />
            )}

        </div>
    )
}

export default Content