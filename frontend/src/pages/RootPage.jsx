import { useSelector } from "react-redux";
import { selectTheme } from "../Redux/Slice/ThemeSlice";
import { titleColor } from "../utils/style";
import CalorieForm from "../components/top/CalorieForm";

export default function RootPage() {
  const theme = useSelector(selectTheme);

  return(
    <>
      <div className="min-h-max">
        <div className="mt-8 md:mt-10">
          <img src="/icon.png" alt="icon image" className="mask mask-squircle size-24 mx-auto mb-5 md:size-40"/>
          <h1 className={`text-5xl text-center font-semibold md:text-6xl ${titleColor(theme)}`}>Calorie Work</h1>
        </div>

        <div className="mt-16">
          <CalorieForm/>
        </div>

        <div className="mt-24 mx-auto w-11/12">
          <div className="p-3">
            <h1 className={`mb-8 text-5xl md:text-6xl font-semibold ${titleColor(theme)}`}>
              About
            </h1>
            
            <div className="mb-16 grid grid-cols-2">
              <p className="my-auto md:text-xl mx-5">
                消費したいカロリーから、適切な運動時間を計算できます。
              </p>

              <div>
                <img src="/use-search.png" alt="" className="max-h-[550px] rounded-lg"/>
              </div>
            </div>

            <div className="mb-16 grid grid-cols-2">
              <div>
                <img src="/use-workout.png" alt="" className="max-h-[550px] rounded-lg"/>
              </div>

              <p className="my-auto md:text-xl mx-5">
                運動を選択したら、早速取り組みましょう！
              </p>
            </div>

            <div className="mb-16 grid grid-cols-2">
              <p className="my-auto md:text-xl mx-5">
                運動時間や消費したカロリーを記録できます。
              </p>

              <div className="mx-5">
                <img src="/use-record.png" alt="" className="max-h-[550px] rounded-lg"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
