import LogoutForm from "./auth_form/LogoutForm";
import DataCharts from "./charts/DataCharts";
import HrTag from "./HrTag";
import TodayData from "./TodayData";
import UserZone from "./UserZone";

function LoggedInContents() {
  return(
    <>
      <HrTag />

      <div className="mb-5">
        <TodayData />
      </div>

      <HrTag />

      <div className="mb-5">
        <DataCharts />
      </div>

      <HrTag />

      <div className="mb-5">
        <UserZone />
      </div>

      <HrTag />

      <div className="mb-5">
        <LogoutForm />
      </div>
    </>
  )
}

export default LoggedInContents;
