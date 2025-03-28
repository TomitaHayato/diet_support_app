import Policy from "../components/general/Policy";
import TopPageLink from "../components/general/TopPageLink";

export default function PolicyPage() {
  return(
    <div className="px-5 lg:px-16">
      <div className="mt-5 mb-8 text-center">
        <TopPageLink />
      </div>
      
      <Policy />
    </div>
  )
}
