import { useState } from "react"
import { useForm } from "react-hook-form";
import { contactRequest } from "../../utils/contact_request";
import { putDev } from "../../utils/devTool";

export default function ContactForm(props) {
  const {setIsSubmitted} = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isNeedResponse, setIsNeedResponse] = useState(false);
  const [reqError      , setReqError      ] = useState(null);
  const [isLoading     , setIsLoading     ] = useState(false);

  function hundleRadioClick(isNeed) {
    setIsNeedResponse(isNeed);
  }

  const onSubmit = async(data) => {
    setIsLoading(true);

    try {
      const res = await contactRequest(data);
      putDev(res);
      setIsSubmitted(true);
      setReqError(null);
    } catch(e) {
      putDev(e);
      setReqError("申し訳ございません。お問い合わせ内容を送信できませんでした")
    }
    setIsLoading(false);
  }

  return(
    <div className="text-sm sm:text-base px-1 pt-3 lg:w-9/12 lg:mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-bold mb-8 text-center">お問い合わせ</h3>

        {reqError && <p className="mb-8 text-error">{reqError}</p>}

        <div className="mb-8">
          {errors.contact?.subject && <p className="text-error">{errors.contact?.subject.message}</p>}
          <select
            className="select select-sm w-full max-w-xs"
            defaultValue="ご用件をお選びください"
            {...register("contact.subject", {
              validate: val => val !== "ご用件をお選びください" || "ご用件を選択してください"
            })}>
            <option disabled>ご用件をお選びください</option>
            <option>バグ・不具合</option>
            <option>ご要望・改善点</option>
            <option>その他</option>
          </select>
        </div>

        <div className="mb-8">
          {errors.contact?.name && <p className="text-error">{errors.contact.name.message}</p>}
          <label className="input input-sm flex items-center gap-2">
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
            className="textarea w-full min-h-36"
            placeholder="本文"
            {...register("contact.body", { required: "内容を入力してください" })}></textarea>
        </div>

        <div className="mb-8">
          <p className="text-center mb-2">返信を求めますか？</p>

          <div className="w-9/12 lg:w-5/12 flex gap-2 mx-auto">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mx-1 text-gray-400">必要</span>
                <input type="radio" name="radio-res" className="radio radio-sm radio-info" onChange={() => hundleRadioClick(true)} />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mx-1 text-gray-400">不要</span>
                <input type="radio" name="radio-res" className="radio radio-sm radio-info" defaultChecked onChange={() => hundleRadioClick(false)} />
              </label>
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
          <button type="submit" className="btn btn-outline btn-info w-8/12" disabled={isLoading}>
          {isLoading ?
            <div className="flex justify-center items-center">
              <span className="loading loading-ring loading-xs text-blue-400"></span>
              <span className="loading loading-ring loading-sm text-blue-400"></span>
              <span className="loading loading-ring loading-md text-blue-400"></span>
              <span className="loading loading-ring loading-lg text-blue-400"></span>
            </div> : "送信"
          }
          </button>
        </div>
      </form>
    </div>
  )
}
