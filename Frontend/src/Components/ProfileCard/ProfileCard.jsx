import { EllipsisVertical } from 'lucide-react';
import { memo } from 'react';
import api from '../../Services/api';
import { Link } from 'react-router-dom';
import styles from './ProfileCard.module.css'

const ProfileCard = ({name, email, role, status, id, isDelete, userId, isOpen, isOpenAny}) => {
  // const [isOpen, setIsOpen] = useState(false);

  const profile = name.split(' ').map(val => val[0].toUpperCase());
  const profileIcon = profile.length > 2 ? profile.slice(0,2) : profile;


    // function to delete user
    const deleteUser = async (e) => {
      e.stopPropagation()
      e.preventDefault()
      const isConfirm = confirm("Are You Sure Delete?")
      if(isConfirm) {
        try {
          await api.delete(`/delete/${id}`)
          isDelete()
        } catch (error) {
          console.log(error)
        }
      }
    }
    
    let profileCol;
    if(profileIcon[0] >= 'A' && profileIcon <= 'E') profileCol = 'bg-green-300';
    else if(profileIcon[0] >= 'F' && profileIcon <= 'J') profileCol = 'bg-yellow-300';
    else if(profileIcon[0] >= 'K' && profileIcon <= 'P') profileCol = 'bg-orange-300';
    else if(profileIcon[0] >= 'Q' && profileIcon <= 'U') profileCol = 'bg-pink-300';
    else if(profileIcon[0] >= 'V' && profileIcon <= 'Z') profileCol = 'bg-red-300';
  return (
    <Link to={(id === userId) ? '/profile' : `/profile/${id}}`}><div className={styles.parentButton}>
      <div className={styles.parentDiv}>
        {id !== userId ? isOpen && (
          <div className={styles.isOpenDiv}>
            <button className={styles.deleteButton}
            onClick={deleteUser}
            >Delete</button>
          </div>
        ): <p className={styles.you}>You</p>}
            {id !== userId ? <div className={styles.isOpenButton}><button
            onClick={(e) => {isOpenAny(prev => !prev);e.stopPropagation();e.preventDefault()}}
            className={styles.threeDotDiv}>
              <EllipsisVertical className={styles.threeDot}/>
            </button></div>: null}
            <div className={`${styles.profileIcon} ${profileCol}`}>{profileIcon}</div>
            <p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p>
            <p className={styles.rolStatus}>{role}</p>
            <p className={styles.rolStatus}>{status}</p>
        </div>
    </div></Link>
  );
};

export default memo(ProfileCard);