import { useEffect, useState } from "react";
import { bgColor, grayText } from "../../../utils/style";
import ContactForm from "../ContactForm";
import FormSuccessed from "../FormSuccessed";

export default function ContactModal(props) {
  const {theme} = props;
  // お問い合わせが送信完了したかどうか
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSubmitted(false), 3000);
  }, [isSubmitted])

  return(
    <>
      <dialog id="contact-form" className="modal">
        <div className={`modal-box text-sm w-3/4 h-3/4 ${bgColor(theme)} ${grayText(theme)}`}>
          <form method="dialog">
            <button className="btn btn-sm btn-ghost absolute right-2 top-2">
              <i className="i-uiw-close text-red-500 font-bold"/>
            </button>
          </form>
          {isSubmitted ?
            <FormSuccessed /> :
            <ContactForm setIsSubmitted={setIsSubmitted} />
          }
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
