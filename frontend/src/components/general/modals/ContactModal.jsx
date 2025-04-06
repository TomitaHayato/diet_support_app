import { bgColor, grayText } from "../../../utils/style";
import ContactForm from "../ContactForm";

export default function ContactModal(props) {
  const {theme} = props;

  return(
    <>
      <dialog id="contact-form" className="modal">
        <div className={`modal-box text-sm w-3/4 h-3/4 ${bgColor(theme)} ${grayText(theme)}`}>
          <form method="dialog">
            <button className="btn btn-sm btn-ghost absolute right-2 top-2">
              <i className="i-uiw-close text-red-500 font-bold"/>
            </button>
          </form>
          <ContactForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
