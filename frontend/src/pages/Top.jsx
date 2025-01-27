// [ページの機能]
// - {摂取カロリー, 体重}を入力
// - 各運動と必要な運動時間をRails apiから取得して表示
// - 各運動データのボタンから、運動管理画面に遷移(state: {体重, 摂取カロリー, 運動データ})

import { useContext, useEffect, useState } from 'react'
import '../builds/build.css'
import CalorieForm from '../components/top/CalorieForm';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/Contexts';
import client from '../utils/apiClient';
import WorkoutsIndex from '../components/top/WorkoutsIndex';

function Top() {
  // ページ遷移時の処理
  const location = useLocation();

  const {weight} = useContext(AuthContext)

  const [intakedCalorie, setIntakedCalorie] = useState(location.state?.intakedCalorie || 0);
  const [workoutsObj   , setWorkoutsObj   ] = useState([]);

  //クリック時に、apiから運動データを取得する処理
  const fetchWorkoutsData = async (wei, cal) => {
    const res = await client.get("/work_outs", {
      params: {
        weight:     wei,
        kcalIntake: cal,
      }
    });
    setWorkoutsObj(res.data);
    // console.log('Workoutデータを取得しました')
    // console.log(res.data)
  }

  // ページ遷移した時、遷移元からカロリーを受け取っているなら、そのデータをfetchWorkoutsDataに渡す
  useEffect(() => {
    if (location.state?.intakedCalorie) {
      fetchWorkoutsData(weight, intakedCalorie);
    }
  }, [location]) //fetchWorkoutsData()の更新に反応すると、フォーム入力値が変更される(setWeight)たびにGETリクエストが発行される

  return (
    <>
      {/* フォーム/運動情報 */}
      <div className=''>
        <div className='mb-8'>
          <CalorieForm
            intakedCalorie={intakedCalorie}
            setIntakedCalorie={setIntakedCalorie}
            fetchWorkoutsData={fetchWorkoutsData}
          />
        </div>

        <div>
          <WorkoutsIndex workoutsObj={workoutsObj} intakedCalorie={intakedCalorie}/>
        </div>
      </div>
    </>
  )
}

export default Top
