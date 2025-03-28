import { useState } from "react";
import UserInfo from "./UserInfo";
import UserEditForm from "./UserEditForm";
import { useLocation, useNavigate } from "react-router-dom";

function UserZone() {
  const navi = useNavigate();
  const loca = useLocation();

  const [editMode, setEditMode] = useState(false);

  function handleClickToProfile() {
    navi('/profile');
  }

  return (
    <>
      {editMode ? <UserEditForm setEditMode={setEditMode}/> : <UserInfo setEditMode={setEditMode} />}
      
      {loca.pathname === '/profile' ||
        <div className="mt-4 w-full">
          <button className="link link-info text-center mx-auto block" onClick={handleClickToProfile}>
            プロフィールページへ<i className="i-lucide-user"/>
          </button>
        </div>
      }
    </>
  )
}

export default UserZone;
