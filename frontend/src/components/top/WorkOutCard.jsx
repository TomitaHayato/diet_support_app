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
      <div>
        <div className="card border border-gray-400 shadow-xl">
          <div className="card-body pt-4 px-4">
            {/* タグ */}
            <div className="flex flex-wrap justify-end gap-[2px]">
              {workout.tagList.map((tagName) => {
                return (
                  <div key={`${workout.id}-${tagName}`}>
                    <button className="badge badge-sm text-[0.5rem] text-amber-500 badge-outline hover:scale-105 active:scale-95">
                      {tagName}
                    </button>
                  </div>
                )
              })}
            </div>

            <h3 className="font-semibold">{workout.name}</h3>
            <div className="text-sm flex justify-between">
              <p className="mb-3">
                目安時間：
                <span className="text-info font-semibold text-lg">{workout.requiredExerciseTime}</span>
                分
              </p>

              <LikeWorkoutBtn workout={workout}/>
            </div>

            {/* ボタン */}
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-outline font-extrabold w-full" onClick={moveWorkoutPage}>Workout!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkoutCard;
