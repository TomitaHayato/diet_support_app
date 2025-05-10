import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikedWorkoutIdsThunk, removeLikedWorkoutIdsThunk, selectCurrentUser, selectLikedWorkoutIds } from "../../Redux/Slice/currentUserSlice";
import { selectCsrfToken } from "../../Redux/Slice/csrfTokenSlice";
import { useToast } from "../../customHooks/useToast";

function LikeWorkoutBtn(props) {
  const {workout} = props;
  const dispatch = useDispatch();

  const likedWorkoutIds = useSelector(selectLikedWorkoutIds);
  const currentUser = useSelector(selectCurrentUser);
  const csrfToken = useSelector(selectCsrfToken);

  const [isLiked, setIsLiked] = useState(false);

  const { triggerToast } = useToast();

  useEffect(() => {
    setIsLiked(likedWorkoutIds.includes(workout.id));
  }, [likedWorkoutIds, workout.id])

  // 指定されたWorkoutをお気に入り登録する
  const likeRequest = async(workout) => {
    if(isLiked) {
      // DELETEリクエスト送信
      dispatch(removeLikedWorkoutIdsThunk({workout, csrfToken}))
    } else {
      // POSTリクエスト送信
      dispatch(addLikedWorkoutIdsThunk({workout, csrfToken}))
    }
  }

  function hundleClick() {
    if(currentUser) {
      likeRequest(workout);
    } else {
      triggerToast('needLogin');
    }
  }

  return (
    <>
      <button className="text-end block leading-none" aria-label="liked-button" onClick={hundleClick}>
        {isLiked ? 
          <i role="liked-icon" aria-label="on"  className={`text-pink-400 lg:size-5 text-lg hover:scale-110 active:scale-95 i-uiw-heart-on`}/> :
          <i role="liked-icon" aria-label="off" className={`text-pink-400 lg:size-5 text-lg hover:scale-110 active:scale-95 i-uiw-heart-off`}/>
        }
      </button>
    </>
  )
}

export default LikeWorkoutBtn;

