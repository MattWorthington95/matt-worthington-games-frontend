import "./RequireLogin.css";
import { Link } from "react-router-dom";

function RequireLogin({ user, usersWithInfo, children, setUser }) {
  if (user) return children;
  return (
    <div>
      <h1>Please Select a User to log in as!</h1>
      <ul>
        {usersWithInfo.map((user) => {
          return (
            <li key={user.user.username} onClick={() => setUser(user.user)}>
              <p>{user.user.username}</p>
              <Link to="/home">
                <img src={user.user.avatar_url} alt="" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RequireLogin;
