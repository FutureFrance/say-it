import { Session } from "next-auth";

const UserProfileSection = ({ session }: { session: Session}) => {
  return (
    <div className="profile-section relative min-h-[200px] flex flex-col">
      <div className={`background-section flex-1 min-h-1/2`}>
      {/* <img 
        className="absolute top-[30%] left-2 rounded-full object-cover max-w-[18%] max-h-[30%] h-auto" 
        src={session.user.background} 
        alt="avatar_photo" 
      /> */}
      </div>
      <div className="profile-info flex-1 max-h-1/2">
        <p>{session.user.first_name}</p>
      </div>
      <img 
        className="absolute top-[30%] left-2 rounded-full object-cover max-w-[18%] max-h-[30%] h-auto" 
        src={session.user.avatar} 
        alt="avatar_photo" 
      />
    </div>
  )
}

export default UserProfileSection;