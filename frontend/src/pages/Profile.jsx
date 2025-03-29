import { useSelector } from "react-redux";
import { selectCurrentUser, selectLikedWorkoutIds } from "../Redux/Slice/currentUserSlice";
import UserZone from "../components/general/sidemenu/UserZone";
import TopPageLink from "../components/general/TopPageLink";
import { useEffect, useState } from "react";
import { workoutsIdNamesRequest } from "../utils/workoutRequest";
import { putDev } from "../utils/devTool";
import { selectHistoryData } from "../Redux/Slice/workoutRecordsSlice";
import WorkoutTable from "../components/general/WorkoutTable";
import WorkoutTableRow from "../components/general/WorkoutTableRow";

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

  if(!currentUser) return (
    <>
      <div className="mb-5 flex justify-center">
        <TopPageLink />
      </div>
      <p className="text-center text-red-500 h-screen">ログインが必要です</p>
    </>
  )

  return(
    <div>
      <div className="mb-5 flex justify-center">
        <TopPageLink />
      </div>
      {/* ユーザーのプロフィール情報 */}
      <div className="border border-primary shadow-lg rounded-lg p-5 mx-8 mb-8 lg:mx-auto lg:w-6/12">
        <UserZone />
      </div>

      {/* ユーザーの取り組み履歴 */}
      {/* お気に入り済みのWorkout一覧 */}
      <div className="border border-primary shadow-lg rounded-lg p-5 mb-8 lg:mx-auto lg:w-8/12">
        <h3 className="text-center font-semibold mb-5">お気に入りのWokrout ({likedCount})</h3>

        <div className="text-xs md:text-base max-h-80 overflow-y-auto overscroll-y-auto pb-8">
          <WorkoutTable>
            {workoutObjs.filter((workout) => likedWorkoutIds.includes(workout.id)).map((workout, index) => {
              return (
                <tr key={`liked-workout-${workout.id}`}>
                  <WorkoutTableRow workout={workout} index={index} likeBtn={true}/>
                </tr>
              )
            })}
          </WorkoutTable>
        </div>
        <p className="text-xs text-gray-500 mt-4">※ metsは運動強度の単位です。metsが高いほど消費カロリーは多くなります。</p>
      </div>

      {/* よく利用するWorkout */}
      {/* これまでにやった運動名とその回数 */}
      <div className="border border-primary shadow-lg rounded-lg p-5 lg:mx-auto lg:w-8/12">
        <h3 className="text-center font-semibold mb-5">これまでに取り組んだWorkout</h3>
        <div className="text-xs md:text-base max-h-80 overflow-y-auto overscroll-y-auto pb-8">
          <WorkoutTable row={'回数'}>
            {historyWorkouts.map((workout, index) => {
              return(
                <tr key={`history-${workout.name}`}>
                  <WorkoutTableRow workout={workout} index={index} thirdVal={workout.count} likeBtn={true}/>
                </tr>
              )
            })}
          </WorkoutTable>
        </div>
        <p className="text-xs text-gray-500 mt-4">※ metsは運動強度の単位です。metsが高いほど消費カロリーは多くなります。</p>
      </div>
    </div>
  )
}

export default Profile;
