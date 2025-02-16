import LogoutForm from "./auth_form/LogoutForm";
import DataCharts from "./charts/DataCharts";
import Section from "./Section";
import TodayData from "./TodayData";
import UserZone from "./UserZone";

function LoggedInContents() {
  return(
    <>
      <Section><TodayData /></Section>

      <Section><DataCharts /></Section>

      <Section><UserZone /></Section>

      <Section><LogoutForm /></Section>
    </>
  )
}

export default LoggedInContents;
