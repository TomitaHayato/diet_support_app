// [ページの機能]
// - {摂取カロリー, 体重}を入力
// - 各運動と必要な運動時間をRails apiから取得して表示
// - 各運動データのボタンから、運動管理画面に遷移(state: {体重, 摂取カロリー, 運動データ})

import { useCallback, useContext, useEffect, useState } from 'react'
import '../builds/build.css'
import axiosCunstom from '../utils/axiosCustoms';
import WorkOutCard from '../components/top/WorkOutCard';
import CalorieForm from '../components/top/CalorieForm';
import { useLocation } from 'react-router-dom';
import SideMenu from '../components/general/SideMenu';
import { getUser } from '../utils/auth';
import { isEmptyObj } from '../utils/objectControl';
import AuthContext from '../Contexts/AuthContext';

function Top() {
  // ページ遷移時の処理
  const location = useLocation();
  const {authInfo, setAuthInfo} = useContext(AuthContext);

  const [weight        , setWeight        ] = useState(location.state?.weight || 50);
  const [intakedCalorie, setIntakedCalorie] = useState(location.state?.intakedCalorie || 0);
  const [workoutsObj   , setWorkoutsObj   ] = useState([]);

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

  const firstAuthInfo = useCallback(
    async () => {
      const res = await getUser();
      setAuthInfo(res.data)
    }, [setAuthInfo]
  );

  // ユーザーの認証情報を取得
  useEffect(() => {
    if(isEmptyObj(authInfo)) {
      firstAuthInfo();
    }
  }, [authInfo, firstAuthInfo])

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
        <div className="basis-3/12">
          <SideMenu/>
        </div>
      </div>
    </>
  )
}

export default Top
