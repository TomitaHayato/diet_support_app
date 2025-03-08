import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";
import TodayData from "../../components/general/sidemenu/TodayData";
import DataCharts from "../../components/general/sidemenu/charts/DataCharts";

function Records() {
  const currentUser = useSelector(selectCurrentUser);

  if(!currentUser) return;

  return(
    <div className="">
      {/* 今日のデータ */}
      <div className="mt-5 mb-16">
        <TodayData />
      </div>

      {/* これまでのデータのチャート */}
      <div className="w-11/12 mx-auto ">
        <h3 className="text-center text-gray-500 font-semibold mb-3">期間ごとのデータ</h3>
        <DataCharts />
      </div>

      {/* これまでにやった運動名とその回数 */}
    </div>
  )
}

export default Records;
