import { useDispatch, useSelector } from "react-redux";
import { hideToast, selectToastObj, showToast } from "../Redux/Slice/toastSlice";

const TOAST_MESSAGES = {
  needLogin: 'ログインが必要です',
}

export function useToast() {
  const dispatch = useDispatch();
  const { isVisible } = useSelector(selectToastObj);

  function triggerToast(key) {
    if(isVisible) return; // 連打防止

    const message = TOAST_MESSAGES[key] || ''

    // トースト表示
    dispatch(
      showToast(message)
    );

    // 3秒後にトースト非表示
    setTimeout(() => {
      dispatch(hideToast());
    }, 2000);
  }

  return {
    triggerToast,
  }
}
