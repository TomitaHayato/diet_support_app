import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import WorkoutCard from "./WorkoutCard";
import { searchAndFilter } from "../../utils/search";
import { FilterWorkoutsContext } from "../../Contexts/Contexts";

function WorkoutsIndex(props) {
  const {workoutsObj, intakedCalorie} = props;

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
      <FilterWorkoutsContext.Provider value={{setSearchWords, setFilterQuery}}>
        {/* Workout検索フォーム */}
        <div className='mb-4'>
          <SearchForm
            workoutsObj={workoutsObj}
            autoCompleteList={autoCompleteList}
            setAutoCompleteList={setAutoCompleteList}
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
                    intakedCalorie={intakedCalorie}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </FilterWorkoutsContext.Provider>
    </>
  )
}

export default WorkoutsIndex;
