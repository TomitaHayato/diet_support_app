import SignupModal from "./SignupModal";

function LoginForm() {
  return (
    <>
      <form action="">
        <label className="input input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-mail" />
          <input type="text" className="grow" placeholder="Email" />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-key-round" />
          <input type="password" className="grow" placeholder="Password" />
        </label>

        <input type="submit" className="btn btn-outline btn-primary w-full" />
      </form>
      <div className="divider text-xs text-gray-500 font-medium my-3">OR</div>
      <SignupModal />
    </>
  )
}

export default LoginForm;