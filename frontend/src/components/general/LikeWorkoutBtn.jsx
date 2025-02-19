import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikedWorkoutIdsThunk, removeLikedWorkoutIdsThunk, selectCurrentUser, selectLikedWorkoutIds } from "../../Redux/Slice/currentUserSlice";

function LikeWorkoutBtn(props) {
  const {workout} = props;
  const dispatch = useDispatch();

  const likedWorkoutIds = useSelector(selectLikedWorkoutIds);
  const currentUser = useSelector(selectCurrentUser);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedWorkoutIds.includes(workout.id));
  }, [likedWorkoutIds, workout.id])

  // 指定されたWorkoutをお気に入り登録する
  const likeRequest = async(workout) => {
    if(isLiked) {
      // DELETEリクエスト送信
      dispatch(removeLikedWorkoutIdsThunk(workout))
    } else {
      // POSTリクエスト送信
      dispatch(addLikedWorkoutIdsThunk(workout))
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

