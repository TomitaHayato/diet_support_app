export default function WorkoutTable(props) {
  const { children, row } = props

  return(
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>mets</th>
              <th>{row}</th>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </>
  )
}
