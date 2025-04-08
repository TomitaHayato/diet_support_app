import { useState } from "react"
import { useForm } from "react-hook-form";
import { contactRequest } from "../../utils/contact_request";

export default function ContactForm() {
  // const currentUser = useSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isNeedResponse, setIsNeedResponse] = useState(false);

  function hundleRadioClick(isNeed) {
    setIsNeedResponse(isNeed);
  }

  const onSubmit = async(data) => {
    console.log(data);
    const res = await contactRequest(data);
    console.log(res);
  }

  return(
    <div className="text-sm sm:text-base px-1 pt-3 lg:w-9/12 lg:mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-bold mb-8 text-center">お問い合わせ</h3>

        <div className="mb-8 text-center">
          {errors.contact?.subject && <p className="text-error">{errors.contact?.subject.message}</p>}
          <select
            className="select select-sm select-info w-full max-w-xs"
            {...register("contact.subject", {
              validate: val => val !== "ご用件をお選びください" || "ご用件を選択してください"
            })} >
            <option disabled selected>ご用件をお選びください</option>
            <option>バグ・不具合</option>
            <option>ご要望・改善点</option>
            <option>その他</option>
          </select>
        </div>

        <div className="mb-8">
          {errors.contact?.name && <p className="text-error">{errors.contact.name.message}</p>}
          <label className="input input-sm input-info input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="お名前"
              {...register("contact.name", { required: "名前を入力してください" })} />
          </label>
        </div>

        <div className="mb-8">
          {errors.contact?.body && <p className="text-error">{errors.contact.body.message}</p>}
          <textarea
            className="textarea textarea-info w-full min-h-36"
            placeholder="本文"
            {...register("contact.body", { required: "内容を入力してください" })}></textarea>
        </div>

        <div className="mb-8">
          <p className="text-center mb-2">返信を求めますか？</p>

          <div className="w-9/12 lg:w-5/12 flex gap-2 mx-auto">
            <div className="form-control">
              <labal className="label cursor-pointer">
                <span className="label-text mx-1">必要</span>
                <input type="radio" name="radio-res" className="radio radio-sm checked:bg-blue-500" onChange={() => hundleRadioClick(true)} />
              </labal>
            </div>

            <div className="form-control">
              <labal className="label cursor-pointer">
                <span className="label-text mx-1">不要</span>
                <input type="radio" name="radio-res" className="radio radio-sm checked:bg-blue-500" defaultChecked onChange={() => hundleRadioClick(false)} />
              </labal>
            </div>
          </div>
        </div>

        {isNeedResponse &&
          <div className="mb-8">
            <p className="text-center mb-2">ご返信先のメールアドレス</p>
            {errors.contact?.email && <p className="text-error">{errors.contact.email.message}</p>}
            <label className="input input-sm lg:input-md input-bordered flex gap-2 items-center">
              <input
                type="email"
                className="grow"
                placeholder="email@example.com"
                {...register("contact.email", {
                  validate: val => (isNeedResponse && !val) ? "メールアドレスを入力してください" : true
                })} />
            </label>
          </div>
        }

        <div className="flex justify-center mb-40">
          <input type="submit" className="btn btn-info w-8/12" onClick={() => console.log(errors)}/>
        </div>
      </form>
    </div>
  )
}
