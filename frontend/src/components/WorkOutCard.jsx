import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
function WorkOutCard(props) {
  const {weight, workout, intakedCalorie} = props;

  // Workoutページにデータを渡す
  const navi = useNavigate();

  function moveWorkoutPage() {
    navi(`/workout/${workout.id}`, {state: {
      workout: workout,
      intakedCalorie: intakedCalorie,
      weight: weight,
    } })
  }

  return (
    <>
      <div>
        <div className="card border border-emerald-300 shadow-xl">
          <div className="card-body">
            <h3 className="font-semibold">{workout.name}</h3>
            <p>
              目安時間：
              <span className="text-info font-semibold text-lg">{workout.required_exercise_time}</span>
              分
            </p>

            {/* <div className="card-actions justify-end">
              <WorkoutModal
                workout={workout}
                unburnedCalorie={unburnedCalorie}
                setUnburnedCalorie={setUnburnedCalorie}
                passedTime={passedTime}
                setPassedTime={setPassedTime}
              />
            </div> */}

            <div className="card-actions justify-end">
              <button className="btn" onClick={moveWorkoutPage}>workout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkOutCard;
