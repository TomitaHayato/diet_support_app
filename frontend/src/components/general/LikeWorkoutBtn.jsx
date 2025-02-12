import { useContext, useEffect, useState } from "react";
import { addWorkoutLiked, removeWorkoutLiked } from "../../utils/UserWorkoutLikesRequest";
import { AuthContext } from "../../Contexts/Contexts";

function LikeWorkoutBtn(props) {
  const {workout} = props;
  const {likedIds, setLikedIds, currentUser} = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedIds.includes(workout.id));
  }, [likedIds, workout.id])

  // 指定されたWorkoutをお気に入り登録する
  const likeRequest = async(workout) => {
    if(isLiked) {
      // DELETEリクエスト送信
      try{
        const res = await removeWorkoutLiked(workout);
        setLikedIds(res.data);
      } catch(e) {console.log(e)}
      
    } else {
      // POSTリクエスト送信
      try{
        const res = await addWorkoutLiked(workout);
        setLikedIds(res.data);
      } catch(e) {console.log(e)}
    }
  }

  return (
    <>
      <div className="tooltip" data-tip={currentUser ? null : 'ログイン後に利用できます'}>
        <button onClick={() => {
          if(currentUser) {
            likeRequest(workout);
          }
        }}>
          <i className={`text-pink-400 text-lg hover:scale-110 active:scale-95 ${isLiked ? 'i-uiw-heart-on' : 'i-uiw-heart-off'}`}/>
        </button>
      </div>
    </>
  )
}

export default LikeWorkoutBtn;

