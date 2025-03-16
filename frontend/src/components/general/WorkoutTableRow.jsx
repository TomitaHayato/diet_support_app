export default function WorkoutTableRow(props) {
  const { workout, index } = props

  return(
    <>
      <th>{index + 1}</th>
      <td>{workout.name}</td>
      <td>{workout.count}</td>
    </>
  )
}
