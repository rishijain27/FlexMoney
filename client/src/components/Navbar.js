
import { Link } from "react-router-dom";

const renderList = () => {
  return [
    <li key="1">
      <Link to="/Form">Home</Link>
    </li>,
    <li key="2">
      <Link to="/Participants">Participants</Link>
    </li>,
  ];
};

const Navbar = () => {
  return (
    <div>
      <nav>
        <div class="nav-wrapper">
          <Link to="/Form">YOGA</Link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
