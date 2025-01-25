import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import WorkoutCard from "./WorkoutCard";
import { nameSearch, tagFilter } from "../../utils/search";
import { FilterWorkoutsContext } from "../../Contexts/Contexts";

function WorkoutsIndex(props) {
  const {workoutsObj, intakedCalorie} = props;

  // 検索フォームの値/絞り込み条件を管理
  const [searchWords, setSearchWords] = useState('');
  const [filterQuery, setFilterQuery] = useState([]);
  // 検索・絞り込み結果のWorkout配列を管理
  const [filteredWorkouts, setFilteredWorkouts] = useState([...workoutsObj]);

  // 「検索実行」or「apiからデータ取得」=> 検索結果を更新
  useEffect(() => {
    const searchedWorkouts = nameSearch(workoutsObj, searchWords)

    setFilteredWorkouts(tagFilter(searchedWorkouts, filterQuery))
  }, [workoutsObj, searchWords, filterQuery])

  return (
    <>
      <FilterWorkoutsContext.Provider value={{setSearchWords, setFilterQuery}}>
        {/* Workout検索フォーム */}
        <div className='mb-4'>
          <SearchForm
            workoutsObj={workoutsObj}
          />
        </div>

        {/* 検索されたWorkoutを一覧表示 */}
        <div>
          <div className='grid grid-cols-3 gap-3'>
            {filteredWorkouts.map((workout) => {
              return (
                <div key={workout.id}>
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
