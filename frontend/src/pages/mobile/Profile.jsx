import { useSelector } from "react-redux";
import { selectCurrentUser, selectLikedWorkoutIds } from "../../Redux/Slice/currentUserSlice";
import UserZone from "../../components/general/sidemenu/UserZone";
import TopPageLink from "../../components/general/TopPageLink";
import { useEffect, useState } from "react";
import { workoutsIdNamesRequest } from "../../utils/workoutRequest";
import { putDev } from "../../utils/devTool";
import WorkoutCard from "../../components/top/WorkOutCard";

function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const likedWorkoutIds = useSelector(selectLikedWorkoutIds)
  const [workoutObjs, setWorkoutsObj] = useState([]);

  useEffect(() => {
     const fetchWorkoutsData = async() => {
      if(!currentUser) return;
  
      const res = await workoutsIdNamesRequest();
      putDev('workout_id_&_namesのres.data')
      putDev(res.data);
      setWorkoutsObj(res.data.workouts);
    }

    fetchWorkoutsData();
  }, [currentUser])

  if(!currentUser) return <p className="text-center text-red-500 h-screen">ログインが必要です</p>;

  return(
    <div>
      <div className="mb-5 flex justify-center">
        <TopPageLink />
      </div>
      {/* ユーザーのプロフィール情報 */}
      <div className="bg-base-200 p-5 mx-8 mb-8">
        <UserZone />
      </div>

      {/* ユーザーの取り組み履歴 */}
      {/* お気に入り済みのWorkout一覧 */}
      <div className="border rounded-lg bg-base-200 p-5">
        <h3 className="text-center font-semibold mb-5">お気に入りのWokrout</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-xs md:text-base max-h-80 overflow-y-auto overscroll-y-auto">
          {workoutObjs.filter((workout) => likedWorkoutIds.includes(workout.id)).map((workout) => {
            return (
              <div key={`liked-workout-${workout.id}`}>
                <WorkoutCard workout={workout} />
              </div>
            )
          })}
        </div>
      </div>
      {/* よく利用するWorkout */}
    </div>
  )
}

export default Profile;
