import WorkoutCard from "./WorkOutCard";

export default function Workouts(props) {
  const {workouts} = props;

  return (
    <>
      {workouts.length === 0 ? <p className="mt-8 text-center">一致する運動はありません</p> :
          <div className='grid gap-3 grid-cols-2 lg:grid-cols-3'>
            {workouts.map((workout) => {
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
    </>
  )
}