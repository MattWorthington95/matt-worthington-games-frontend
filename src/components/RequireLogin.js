import "../styles/RequireLogin.css";
import { Link } from "react-router-dom";

import { getUsers, getUserInfo } from "../components/api";
import { useUsers } from "../hooks/useApi";

function RequireLogin({ user, children, setUser }) {
  const { usersWithInfo, usersLoading } = useUsers(getUsers, getUserInfo);

  if (user) return children;
  if (usersLoading) return <p>Loading ...</p>;
  return (
    <div id="require-login">
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
