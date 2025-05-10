export default function Toast(props) {
  const { message } = props;

  return(
    <>
      <div className="toast toast-end toast-bottom z-50 bottom-16 md:bottom-8">
        <div className="alert bg-amber-400 text-sm md:text-base">
          <span className="flex items-center gap-4 font-semibold text-black">
            <i className="i-lucide-alert-circle"/>
            {message}
          </span>
        </div>
      </div>
    </>
  )
}
