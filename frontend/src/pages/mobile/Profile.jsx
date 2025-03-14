import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";
import UserZone from "../../components/general/sidemenu/UserZone";
import TopPageLink from "../../components/general/TopPageLink";

function Profile() {
  const currentUser = useSelector(selectCurrentUser);

  if(!currentUser) return <p className="text-center text-red-500">ログインが必要です</p>;

  return(
    <>
      <div className="mb-5 flex justify-center">
        <TopPageLink />
      </div>
      {/* ユーザーのプロフィール情報 */}
      <div className="bg-base-200 p-5">
        <UserZone />
      </div>

      {/* ユーザーの取り組み履歴 */}
      {/* お気に入り済みのWorkout一覧 */}
      <div>
        {/* <h3>お気に入りのWokrout</h3> */}
      </div>
      {/* よく利用するWorkout */}
    </>
  )
}

export default Profile;
