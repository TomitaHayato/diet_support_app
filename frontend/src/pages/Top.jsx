// [ページの機能]
// - {摂取カロリー, 体重}を入力
// - 各運動と必要な運動時間をRails apiから取得して表示
// - 各運動データのボタンから、運動管理画面に遷移(state: {体重, 摂取カロリー, 運動データ})

import { useEffect, useState } from 'react'
import '../builds/build.css'
import CalorieForm from '../components/top/CalorieForm';
import WorkoutsIndex from '../components/top/WorkoutsIndex';
import { workoutRequest } from '../utils/workoutRequest';
import { useSelector } from 'react-redux';
import { selectWeight } from '../Redux/Slice/weightSlice';
import { putDev } from '../utils/devTool';

function Top() {

  const weight = useSelector(selectWeight);
  const intakedCalorie = useSelector(state => state.intakedCalorie.value);

  const [workoutsObj, setWorkoutsObj] = useState([]);

  // apiから運動データを取得する処理
  const fetchWorkoutsData = async (weight, kcalIntake) => {
    const res = await workoutRequest({ weight, kcalIntake, });
    putDev('fetchWorkoutsData');
    putDev(res.data);
    setWorkoutsObj(res.data.workouts);
  }

  // ページ遷移時または体重・カロリー入力時、そのデータをfetchWorkoutsDataに渡す
  useEffect(() => {
    if(weight && weight > 0) fetchWorkoutsData(weight, intakedCalorie);
  }, [intakedCalorie, weight]);

  return (
    <>
      {/* フォーム/運動情報 */}
      <div className=''>
        <div className='mb-4 md:mb-8'>
          <CalorieForm/>
        </div>

        <div>
          <WorkoutsIndex
            workoutsObj={workoutsObj}/>
        </div>
      </div>
    </>
  )
}

export default Top
