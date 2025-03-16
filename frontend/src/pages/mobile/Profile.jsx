import { useSelector } from "react-redux";
import { selectCurrentUser, selectLikedWorkoutIds } from "../../Redux/Slice/currentUserSlice";
import UserZone from "../../components/general/sidemenu/UserZone";
import TopPageLink from "../../components/general/TopPageLink";
import { useEffect, useState } from "react";
import { workoutsIdNamesRequest } from "../../utils/workoutRequest";
import { putDev } from "../../utils/devTool";
import WorkoutCard from "../../components/top/WorkOutCard";
import { selectHistoryData } from "../../Redux/Slice/workoutRecordsSlice";
import WorkoutTable from "../../components/general/WorkoutTable";
import WorkoutTableRow from "../../components/general/WorkoutTableRow";

function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const likedWorkoutIds = useSelector(selectLikedWorkoutIds);
  const historyWorkouts = useSelector(selectHistoryData);

  const [workoutObjs, setWorkoutsObj] = useState([]);
  const [likedCount, setLikedCount] = useState(0); // お気に入り登録した個数

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

  useEffect(() => {
    setLikedCount(likedWorkoutIds.length);
  }, [likedWorkoutIds])

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
      <div className="border rounded-lg bg-base-200 p-5 mb-8">
        <h3 className="text-center font-semibold mb-5">お気に入りのWokrout ({likedCount})</h3>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-xs md:text-base max-h-80 overflow-y-auto overscroll-y-auto pt-4 pb-16">
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
      {/* これまでにやった運動名とその回数 */}
      <div className="border rounded-lg bg-base-200 p-5">
        <h3 className="text-center font-semibold mb-5">これまでに取り組んだWorkout</h3>
        <div className="text-xs md:text-base max-h-80 overflow-y-auto overscroll-y-auto">
          <WorkoutTable>
            {historyWorkouts.map((workout, index) => {
              return(
                <tr key={`history-${workout.name}`} className="hover:bg-base-200">
                  <WorkoutTableRow workout={workout} index={index} />
                </tr>
              )
            })}
          </WorkoutTable>
        </div>
      </div>
    </div>
  )
}

export default Profile;
