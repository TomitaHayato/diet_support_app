import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";
import TodayData from "../../components/general/sidemenu/TodayData";
import DataCharts from "../../components/general/sidemenu/charts/DataCharts";
import TopPageLink from "../../components/general/TopPageLink";

function Records() {
  const currentUser = useSelector(selectCurrentUser);

  if(!currentUser) return <p className="text-center text-red-500">ログインが必要です</p>;

  return(
    <div className="">
      <div className="mb-5 flex justify-center">
        <TopPageLink />
      </div>
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
