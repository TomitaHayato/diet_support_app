import { useState } from "react";
import UserInfo from "./UserInfo";
import UserEditForm from "./UserEditForm";

function UserZone() {
  const [editMode, setEditMode] = useState(false);

  let content = ""

  content = editMode ? <UserEditForm setEditMode={setEditMode}/> : <UserInfo setEditMode={setEditMode} />

  return (
    <>
      {content}
    </>
  )
}

export default UserZone;
