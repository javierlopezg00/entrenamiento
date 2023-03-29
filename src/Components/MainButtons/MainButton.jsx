import { Link } from "react-router-dom";

import "./MainButtonStyle.scss";

export default function MainButton(props) {
  return (
    <div className="containerButton">
      <Link to={props.link}>
        <h1>{props.icon}</h1>
        <p>{props.text}</p>
      </Link>
    </div>
  );
}
