/* eslint-disable react/prop-types */
function WorkOutCard(props) {
  const {workout} = props;

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
              <button className="btn btn-primary">WorkOut!!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkOutCard;
