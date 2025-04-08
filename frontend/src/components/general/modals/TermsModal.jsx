import { bgColor, grayText } from "../../../utils/style";
import Terms from "../Terms";

export default function TermsModal(props) {
  const {theme} = props;

  return(
    <>
      <dialog id="terms-content" className="modal">
        <div className={`modal-box text-sm w-3/4 h-3/4 ${bgColor(theme)} ${grayText(theme)}`}>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-ghost absolute right-2 top-2">
              <i className="i-uiw-close text-red-500 font-bold"/>
            </button>
          </form>
          <Terms />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
