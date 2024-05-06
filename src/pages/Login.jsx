import { useState } from 'react'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase/config'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isError, setISError] = useState(false)
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isSignup) {
            createUserWithEmailAndPassword(auth, email, pass)
                .then(() => toast.success('İşlem Başarılı'), navigate('Home'))
                .catch((err) => toast.error('Başarısız  :' + err.code))
        } else {
            signInWithEmailAndPassword(auth, email, pass).then(() => {
                toast.success('Hesaba Giriş Yapıldı'); navigate('/home')
            }).catch((err) => {
                toast.error('Bir Hata Oluştu :' + err.code)

                if (err.code === "auth/invalid-credential") setISError(true)
            })

        }
    }


    /* Şifre Resetleme  */
    const handleReset = () => {
        sendPasswordResetEmail(auth, email).then(() => toast.info('Şifre sıfırlama epostası gönderildi.Mailinizi kontrol edin')).catch((err) => toast.error('Birhata oluştu'))
    }

    /* Google ile giriş */
    const handleGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            toast.success('Hesaba Giriş yapıldı');
            navigate('/home')
        }).catch((err) => {
            toast.error('BirHata oluştu' + err.code)
        })
    }


    return (
        <section className='h-screen grid place-items-center justify-center '>
            <div className='bg-black flex flex-col gap-10 py-16 px-32 rounded-lg max-sm:h-full   '>
                <div className='flex justify-center'>
                    <img className='h-[60px]' src="/x-logo.webp" />
                </div>
                <h1 className='text-lg font-bold text-center'>Twitter'a Giriş Yapınız</h1>
                <button onClick={handleGoogle}
                    className='bg-white flex items-center py-2 px-10 rounded-full  gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap'>
                    <img className='h-[20px]' src="/google-logo.svg" />{!isSignup ? 'Google ile Kayıt ol' : 'Google ile Giriş Yap'}
                </button>



                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <label >Email</label>
                    <input onChange={(e) => setEmail(e.target.value)}
                        className='text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]' type="text" />
                    <label className='mt-5'>Şifre</label>
                    <input onChange={(e) => setPass(e.target.value)}
                        className='text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]' type="password" />

                    <button className='mt-10 bg-white rounded-full text-black p-1 font-bold transition hover:bg-gray-300'>{isSignup ? 'Giriş Yap' : 'Kaydol'}</button>

                    <p onClick={() => setIsSignup(!isSignup)}>
                        <span className='text-gray-500'>{!isSignup ? 'Hesabınız varsa' : 'Hesabınız yoksa'}</span>
                        <span className='ms-2 text-blue-500 cursor-pointer'>{!isSignup ? 'Giriş Yapın' : 'Kaydolun'}</span>
                    </p>

                    {isError && (<p onClick={handleReset}
                        className='text-center cursor-pointer text-red-600 mt-5'>Şifrenizi mi Unuttunuz</p>)}
                </form>

            </div>


        </section>
    )
}

export default Login;