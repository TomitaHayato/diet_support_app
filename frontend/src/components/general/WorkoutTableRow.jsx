import LikeWorkoutBtn from "./LikeWorkoutBtn"

export default function WorkoutTableRow(props) {
  const { workout, thirdVal=true, likeBtn=false } = props

  return(
    <>
      <td>{workout.name}</td>
      <td>{workout.mets || 2}</td>
      {thirdVal && <td>{thirdVal}</td>}
      {likeBtn && <td><LikeWorkoutBtn workout={workout}/></td>}
    </>
  )
}
