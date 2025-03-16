export default function WorkoutTable(props) {
  const { children } = props

  return(
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>回数</th>
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