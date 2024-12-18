// [ページの機能]
// - {摂取カロリー, 体重}を入力
// - 各運動と必要な運動時間をRails apiから取得して表示
// - 各運動データのボタンから、運動管理画面に遷移(state: {体重, 摂取カロリー, 運動データ})

import { useCallback, useEffect, useState } from 'react'
import '../builds/build.css'
import axiosCunstom from '../utils/axiosCustoms';
import WorkOutCard from '../components/top/WorkOutCard';
import CalorieForm from '../components/top/CalorieForm';
import { useLocation } from 'react-router-dom';
import SideMenu from '../components/general/SideMenu';
import { getUser } from '../utils/auth';
import { isEmptyObj } from '../utils/objectControl';

function App() {
  // ページ遷移時の処理
  const location = useLocation();

  const [weight        , setWeight        ] = useState(location.state?.weight || 50);
  const [intakedCalorie, setIntakedCalorie] = useState(location.state?.intakedCalorie || 0);
  const [workoutsObj   , setWorkoutsObj   ] = useState([]);
  const [userInfo      , setUserInfo      ] = useState({});

  //クリック時に、apiから運動データを取得する処理
  const fetchWorkoutsData = useCallback(
    async () => {
      const res = await axiosCunstom.get("/work_outs", {
        params: {
          weight:      weight,
          kcal_intake: intakedCalorie,
        }
      });
      setWorkoutsObj(res.data);
    }, [intakedCalorie, weight]
  )

  const firstSetUserInfo = async () => {
    const res = await getUser();
    console.log("ユーザーの認証情報を取得");
    setUserInfo(res.data)
  }

  // ユーザーの認証情報を取得
  useEffect(() => {
    if(isEmptyObj(userInfo)) {
      firstSetUserInfo();
    }
  }, [userInfo])

  // ページ遷移した時、遷移元から体重・カロリーを受け取っているならfetchWorkoutsData
  useEffect(() => {
    if (location.state?.weight && location.state?.intakedCalorie) {
      fetchWorkoutsData();
    }
  }, [fetchWorkoutsData, location])

  return (
    <>
      <div className='p-16 flex min-h-screen'>
        {/* フォーム/運動情報 */}
        <div className='basis-9/12'>
          <div className='mb-8'>
            <CalorieForm
              weight={weight}
              setWeight={setWeight}
              intakedCalorie={intakedCalorie}
              setIntakedCalorie={setIntakedCalorie}
              fetchWorkoutsData={fetchWorkoutsData}
            />
          </div>

          <div>
            <div className='grid grid-cols-3 gap-8'>
              {workoutsObj?.map((workout) => {
                return (
                  <div key={workout.id}>
                    <WorkOutCard
                      weight={weight}
                      workout={workout}
                      intakedCalorie={intakedCalorie}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="divider divider-horizontal"></div>

        {/* メニュー */}
        <SideMenu
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      </div>
    </>
  )
}

export default App
