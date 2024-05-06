import moment from 'moment/moment'
import 'moment/locale/tr'
const UserInfo = ({ tweet }) => {
    const date = moment(tweet.createdAt?.toDate()).fromNow()

    return (
        <div className='flex gap-3 items-center whitespace-nowrap'>
            <p>{tweet.user.name}</p>
            <p className='text-gray-400 text-sm max-sm:hidden'>@{tweet.user.name.toLowerCase().split(' ').join('_')}</p>
            <p className='text-gray-400 text-sm max-sm:hidden'>{date}</p>
            {tweet.isEdit && <p className='text-gray-400 text-sm'>*düzenlendi</p>}
        </div>
    )
}

export default UserInfo