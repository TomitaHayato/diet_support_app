import LogoutForm from "./auth_form/LogoutForm";
import DataCharts from "./charts/DataCharts";
import Section from "./Section";
import TodayData from "./TodayData";
import UserZone from "./UserZone";

function LoggedInContents() {
  return(
    <>
      <Section><TodayData /></Section>

      <Section>
        <div className="text-center">
          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <h3 className="collapse-title flex items-center justify-center font-semibold text-gray-500">
              運動記録<i className="i-lucide-bar-chart-4 text-blue-600 text-xl ml-2"/>
            </h3>

            <div className="collapse-content px-0">
              <DataCharts />
            </div>
        </div>
      </div>
      </Section>

      <Section><UserZone /></Section>

      <Section><LogoutForm /></Section>
    </>
  )
}

export default LoggedInContents;
