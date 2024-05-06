import { BiDoorOpen } from 'react-icons/bi';
import { navSections } from './../../utils/constans'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
const Nav = ({ user }) => {


    return (
        <nav className='flex flex-col justify-between items-end px-2 py-4'>
            <div>
                <img className='w-14 mb-4' src="x-logo.webp" />
                {navSections.map((i, key) => (
                    <div className='flex items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer rounded-lg transition hover:bg-[#505050b7] max-md:justify-center' key={key}>
                        {i.icon}
                        <span className='max-md:hidden whitespace-nowrap'>{i.title}</span>
                    </div>
                ))}
            </div>

            <div>
                {!user ? (<div className='w-12 h-12 bg-gray-400 rounded-full animate-bounce' ></div>)
                    : (<div className='flex flex-col gap-5'>
                        <div>
                            <img className='w-12 h-12 rounded-full ' src={user.photoURL} alt="" />
                            <p className='max-md:hidden'>{user.displayName}</p>
                        </div>
                        <button onClick={() => signOut(auth)}
                            className='flex justify-center gap-2 items-center p-1 rounded bg-zinc-700 text-2xl md:text-[15px] transition hover:bg-zinc-900'>
                            <BiDoorOpen />
                            <span className='max-md:hidden'>Çıkış Yap</span>
                        </button>

                    </div>)}
            </div>
        </nav>
    )
}

export default Nav