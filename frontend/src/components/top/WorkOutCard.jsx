import { useNavigate } from "react-router-dom"
import LikeWorkoutBtn from "../general/LikeWorkoutBtn";

function WorkoutCard(props) {
  const {workout} = props;

  const navi = useNavigate();

  return (
    <>
      <div className="card border border-gray-400 h-full shadow-xl text-xs">
        <div className="card-body flex-col justify-between pt-4 px-4">
          <div>
            {/* タグ */}
            <div className="hidden lg:flex flex-wrap justify-end gap-[2px] mb-4">
              {workout.tagList?.map((tagName) => {
                return (
                  <div key={`${workout.id}-${tagName}`}>
                    <p className="badge badge-sm text-[0.6rem] text-info badge-outline">
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
                <span className="text-info font-bold lg:text-base">{workout.requiredExerciseTime || 0}</span>
                分
              </p>

              <div>
                <LikeWorkoutBtn workout={workout}/>
              </div>
            </div>

            {/* ボタン */}
            <div className="card-actions justify-end">
              <button className="btn btn-sm lg:btn-md btn-primary font-bold w-full" onClick={() => {
                navi(`/workout/${workout.id}`);
              }}>Workout!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkoutCard;
