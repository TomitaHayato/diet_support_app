import { useNavigate } from "react-router-dom";
import LikeWorkoutBtn from "./LikeWorkoutBtn"

export default function WorkoutTableRow(props) {
  const { workout, thirdVal=true, likeBtn=false } = props
  const navi = useNavigate();

  return(
    <>
      <td className="font-semibold link no-underline hover:link-info hover:bg-base-200"
        onClick={() => {
          navi(`/workout/${workout.id}`);
        }}
      >{workout.name}</td>
      <td>{workout.mets || 2}</td>
      {thirdVal && <td>{thirdVal}</td>}
      {likeBtn && <td><LikeWorkoutBtn workout={workout}/></td>}
    </>
  )
}
