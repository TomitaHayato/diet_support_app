import { useState } from "react";
import UserInfo from "./UserInfo";
import UserEditForm from "./UserEditForm";

function UserZone() {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? <UserEditForm setEditMode={setEditMode}/> : <UserInfo setEditMode={setEditMode} />}
    </>
  )
}

export default UserZone;
