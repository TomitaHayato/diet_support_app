import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
function WorkOutCard(props) {
  const {workout, intakedCalorie} = props;

  const navi = useNavigate();

  // Workoutページに遷移
  function moveWorkoutPage() {
    navi(`/workout/${workout.id}`, {
      state: {
        workout:        workout,
        intakedCalorie: intakedCalorie,
      }
    });
  }

  return (
    <>
      <div>
        <div className="card border border-gray-400 shadow-xl">
          <div className="card-body">
            <h3 className="font-semibold">{workout.name}</h3>
            <p className="mb-3">
              目安時間：
              <span className="text-info font-semibold text-lg">{workout.required_exercise_time}</span>
              分
            </p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-outline font-extrabold w-full" onClick={moveWorkoutPage}>Workout!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkOutCard;
