import WorkoutModal from "./WorkoutModal";

/* eslint-disable react/prop-types */
function WorkOutCard(props) {
  const {workout, unburnedCalorie, setUnburnedCalorie} = props;

  return (
    <>
      <div>
        <div className="card border border-emerald-300 shadow-xl">
          <div className="card-body">
            <h3 className="font-semibold">{workout.name}</h3>
            <p>
              <span className="text-info font-semibold text-lg">{workout.required_exercise_time}</span>
              分
            </p>

            <div className="card-actions justify-end">
              <WorkoutModal
                workout={workout}
                unburnedCalorie={unburnedCalorie}
                setUnburnedCalorie={setUnburnedCalorie}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkOutCard;
