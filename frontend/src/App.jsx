import { useState } from 'react'
import './builds/build.css'
import axiosCunstom from './utils/axiosCustoms';
import WorkOutCard from './components/WorkOutCard';
import CalorieForm from './components/CalorieForm';

function App() {
  const [weight        , setWeight        ] = useState(50);
  const [intakedCalorie, setIntakedCalorie] = useState(100);
  const [workoutsObj   , setWorkoutsObj   ] = useState([]);

  //クリック時に、apiから運動データを取得する処理
  const fetchWorkoutsData = async () => {
    const res = await axiosCunstom.get("/work_outs", {
      params: {
        weight:      weight,
        kcal_intake: intakedCalorie
      }
    });
    setWorkoutsObj(res.data);
  }

  return (
    <>
      <div className=''>
        <div className='mb-8'>
          <CalorieForm
            weight={weight}
            setWeight={setWeight}
            intakedCalorie={intakedCalorie}
            setIntakedCalorie={setIntakedCalorie}
            fetchWorkoutsData={fetchWorkoutsData}
          />
        </div>

        <div className=''>
          <div className='grid grid-cols-3 gap-8'>
            {workoutsObj?.map((workout) => {
              return (
                <div key={workout.id}>
                  <WorkOutCard workout={workout} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
