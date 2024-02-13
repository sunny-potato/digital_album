import s from "../Styles/Profile.module.css";
import { useParams } from "react-router-dom";
import blankProfile from "../Images/blankProfile.png";
import { useEffect, useState } from "react";
import { getuserAllInformation } from "../Services/user";
import { ProfileInfo } from "../Types/Commonness/ProfileInfo";

function Profile() {
  const userId = Number(useParams().userId);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | undefined>(
    undefined
  );
  useEffect(() => {
    if (userId) {
      const getProfileInfo = async () => {
        const userInfo = await getuserAllInformation(userId);
        setProfileInfo(userInfo);
      };
      getProfileInfo().catch(console.error);
    }
  }, [userId]);
  return (
    <div className={s.pageContainer}>
      <div className={s.pageTitle}>My profile</div>
      {profileInfo && (
        <div className={s.pageContents}>
          <div className={s.userImage}>
            <img src={blankProfile} className={s.profileImage} />
            <div className={s.username}>{profileInfo.username}</div>
          </div>
          <div className={s.userInformation}>
            <div className={s.sectionTitle}>Personal information</div>
            <div className={s.fullName}>
              <div>{profileInfo.firstname}</div>
              <div>{profileInfo.lastname}</div>
            </div>
            <div>{profileInfo.birthdate}</div>
            <div>{profileInfo.email}</div>
            <div>{profileInfo.telephon}</div>
            <div>{profileInfo.address}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
