// [ページの機能]
// - {摂取カロリー, 体重}を入力
// - 各運動と必要な運動時間をRails apiから取得して表示
// - 各運動データのボタンから、運動管理画面に遷移(state: {体重, 摂取カロリー, 運動データ})

import { useContext, useEffect, useState } from 'react'
import '../builds/build.css'
import CalorieForm from '../components/top/CalorieForm';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/Contexts';
import WorkoutsIndex from '../components/top/WorkoutsIndex';
import { workoutRequest } from '../utils/workoutRequest';

function Top() {
  // ページ遷移時の処理
  const location = useLocation();

  const {weight} = useContext(AuthContext)

  const [intakedCalorie, setIntakedCalorie] = useState(location.state?.intakedCalorie || 0);
  const [workoutsObj   , setWorkoutsObj   ] = useState([]);

  // apiから運動データを取得する処理
  const fetchWorkoutsData = async (weight, kcalIntake) => {
    const res = await workoutRequest({ weight, kcalIntake, });
    console.log(res.data)
    setWorkoutsObj(res.data.workouts);
  }

  // ページ遷移時または体重・カロリー入力時、そのデータをfetchWorkoutsDataに渡す
  useEffect(() => {
    if(weight && weight > 0) fetchWorkoutsData(weight, intakedCalorie);
  }, [intakedCalorie, weight, location]);

  return (
    <>
      {/* フォーム/運動情報 */}
      <div className=''>
        <div className='mb-8'>
          <CalorieForm
            intakedCalorie={intakedCalorie}
            setIntakedCalorie={setIntakedCalorie}/>
        </div>

        <div>
          <WorkoutsIndex
            workoutsObj={workoutsObj}
            intakedCalorie={intakedCalorie}/>
        </div>
      </div>
    </>
  )
}

export default Top
