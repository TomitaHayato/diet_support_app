import { useNavigate } from "react-router-dom"
import LikeWorkoutBtn from "../general/LikeWorkoutBtn";

function WorkoutCard(props) {
  const {workout} = props;

  const navi = useNavigate();

  // Workoutページに遷移
  function moveWorkoutPage() {
    navi(`/workout/${workout.id}`, {
      state: { workout, }
    });
  }

  return (
    <>
      <div className="card border border-gray-400 h-full shadow-xl text-xs">
        <div className="card-body flex-col justify-between pt-4 px-4">
          <div>
            {/* タグ */}
            <div className="hidden lg:flex flex-wrap justify-end gap-[2px] mb-4">
              {workout.tagList.map((tagName) => {
                return (
                  <div key={`${workout.id}-${tagName}`}>
                    <p className="badge badge-sm text-[0.5rem] text-emerald-600 badge-outline">
                      {tagName}
                    </p>
                  </div>
                )
              })}
            </div>

            <h3 className="font-bold md:text-base">{workout.name}</h3>
          </div>
          
          <div className="">
            <div className="lg:text-sm mt-1 flex">
              <p className="mb-3">
                目安：
                <span className="text-info font-bold lg:text-base">{workout.requiredExerciseTime}</span>
                分
              </p>

              <div>
                <LikeWorkoutBtn workout={workout}/>
              </div>
            </div>

            {/* ボタン */}
            <div className="card-actions justify-end">
              <button className="btn btn-sm lg:btn-md btn-primary font-bold w-full" onClick={moveWorkoutPage}>Workout!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkoutCard;
