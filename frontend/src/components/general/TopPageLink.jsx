import { useNavigate } from "react-router-dom";

export default function TopPageLink() {
  const navi = useNavigate();

  //トップページに遷移
  function transTop() {
    navi('/top');
  }

  return(
    <>
      <button aria-label="link-to-top" onClick={transTop} className="btn btn-wide btn-info btn-outline btn-sm lg:btn-md">運動一覧へ</button>
    </>
  )
}