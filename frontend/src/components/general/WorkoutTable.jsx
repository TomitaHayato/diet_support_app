export default function WorkoutTable(props) {
  const { children, row } = props

  return(
    <>
      <table className="table table-pin-rows">
        <thead>
          <tr className="w-full">
            <th>Name</th>
            <th>mets</th>
            <th>{row}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </>
  )
}
