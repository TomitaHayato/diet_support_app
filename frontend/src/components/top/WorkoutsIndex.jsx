import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import WorkoutCard from "./WorkOutCard";
import { searchAndFilter } from "../../utils/search";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectLikedWorkoutIds } from "../../Redux/Slice/currentUserSlice";

function WorkoutsIndex(props) {
  const {workoutsObj} = props;
  const likedWorkoutIds = useSelector(selectLikedWorkoutIds);
  const currentUser = useSelector(selectCurrentUser);

  // 検索/Filter条件を管理
  const [searchWords, setSearchWords] = useState('');
  const [filterQuery, setFilterQuery] = useState([]);
  // 実際にUIに表示するWorkout一覧（検索・Filter済）
  const [filteredWorkouts, setFilteredWorkouts] = useState([...workoutsObj]);
  // Workoutsのオートコンプリート
  const [autoCompleteList, setAutoCompleteList] = useState([...filteredWorkouts]);
 // お気に入りのみ
  const [isOnlyLiked, setIsOnlyLiked] = useState(false);

  // 「検索クエリ反映」or「apiからデータ取得」=> 検索結果をオートコンプリートと同じに更新
  useEffect(() => {
    const likedFilterdWorkouts = (isOnlyLiked) ?
      workoutsObj.filter(workout => likedWorkoutIds.includes(workout.id))
      : workoutsObj

    setFilteredWorkouts(
      searchAndFilter(likedFilterdWorkouts, searchWords, filterQuery)
   )
  }, [workoutsObj, searchWords, filterQuery, isOnlyLiked, likedWorkoutIds]);

  useEffect(() => {
    if(!currentUser) setIsOnlyLiked(false);
  }, [currentUser])

  return (
    <>
      {/* Workout検索フォーム */}
      <div className='mb-4'>
        <SearchForm
          workoutsObj={workoutsObj}
          autoCompleteList={autoCompleteList}
          setAutoCompleteList={setAutoCompleteList}
          setSearchWords={setSearchWords}
          setFilterQuery={setFilterQuery}
          setIsOnlyLiked={setIsOnlyLiked}
          isOnlyLiked={isOnlyLiked}
        />
      </div>

      {/* 検索されたWorkoutを一覧表示 */}
      <div>
        {filteredWorkouts.length === 0 ? <p className="mt-8 text-center">一致する運動はありません</p> :
          <div className='grid grid-cols-3 gap-3'>
            {filteredWorkouts.map((workout) => {
              return (
                <div key={`workout-card-${workout.id}`}>
                  <WorkoutCard
                    workout={workout}
                  />
                </div>
              )
            })}
          </div>
        }
      </div>
    </>
  )
}

export default WorkoutsIndex;
