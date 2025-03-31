import { modalOpen } from "../../../utils/modalCtl";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-100 text-base-content rounded p-10 mb-14 lg:mb-0 text-sm lg:text-lg">
      <nav className="grid grid-flow-col gap-4">
        <button className="link link-info link-hover" onClick={() => modalOpen('terms-content')}>利用規約</button>
        <button className="link link-info link-hover" onClick={() => modalOpen('policy-content')}>プライバシーポリシー</button>
      </nav>
      {/* <aside>
        <p>Copyright © {new Date().getFullYear()} - Calorie Work</p>
      </aside> */}
    </footer>
  )
}