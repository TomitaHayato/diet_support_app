import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import WorkoutCard from "./WorkoutCard";
import { searchAndFilter } from "../../utils/search";

function WorkoutsIndex(props) {
  const {workoutsObj} = props;

  // 検索/Filter条件を管理
  const [searchWords, setSearchWords] = useState('');
  const [filterQuery, setFilterQuery] = useState([]);
  // 実際にUIに表示するWorkout一覧（検索・Filter済）
  const [filteredWorkouts, setFilteredWorkouts] = useState([...workoutsObj]);
  // Workoutsのオートコンプリート
  const [autoCompleteList, setAutoCompleteList] = useState([...filteredWorkouts]);

  // 「検索クエリ反映」or「apiからデータ取得」=> 検索結果をオートコンプリートと同じに更新
  useEffect(() => {
    setFilteredWorkouts(
      searchAndFilter(workoutsObj, searchWords, filterQuery)
    )
  }, [workoutsObj, searchWords, filterQuery]);

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
        />
      </div>

      {/* 検索されたWorkoutを一覧表示 */}
      <div>
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
      </div>
    </>
  )
}

export default WorkoutsIndex;
