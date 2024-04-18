import { React } from "react";
import logo from "../github-logo.png";
function Header() {
  return (
    <div>
      <img src={logo} className="image" alt="GitHub" />
    </div>
  );
}
export default Header;
