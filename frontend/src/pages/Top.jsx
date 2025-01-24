// [ページの機能]
// - {摂取カロリー, 体重}を入力
// - 各運動と必要な運動時間をRails apiから取得して表示
// - 各運動データのボタンから、運動管理画面に遷移(state: {体重, 摂取カロリー, 運動データ})

import { useContext, useEffect, useState } from 'react'
import '../builds/build.css'
import WorkOutCard from '../components/top/WorkOutCard';
import CalorieForm from '../components/top/CalorieForm';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/Contexts';
import client from '../utils/apiClient';
import SearchForm from '../components/top/SearchForm';

function Top() {
  // ページ遷移時の処理
  const location = useLocation();

  const {weight} = useContext(AuthContext)

  const [intakedCalorie, setIntakedCalorie] = useState(location.state?.intakedCalorie || 0);
  const [workoutsObj   , setWorkoutsObj   ] = useState([]);

  //クリック時に、apiから運動データを取得する処理
  const fetchWorkoutsData = async () => {
    const res = await client.get("/work_outs", {
      params: {
        weight:     weight,
        kcalIntake: intakedCalorie,
      }
    });
    setWorkoutsObj(res.data);
    // console.log('Workoutデータを取得しました')
    // console.log(res.data)
  }

  // ページ遷移した時、遷移元から体重・カロリーを受け取っているならfetchWorkoutsData
  useEffect(() => {
    if (location.state?.intakedCalorie) {
      fetchWorkoutsData();
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

        {/* Workout検索フォーム */}
        <div className='mb-4'>
          <SearchForm />
        </div>

        {/* Workout一覧表示 */}
        <div>
          <div className='grid grid-cols-3 gap-3'>
            {workoutsObj?.map((workout) => {
              return (
                <div key={workout.id}>
                  <WorkOutCard
                    workout={workout}
                    intakedCalorie={intakedCalorie}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Top
