import "./User.css";

function User({ user, setUser }) {
  return (
    <div>
      <img src={user.avatar_url} alt="" />
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>

      <button onClick={() => setUser(null)}>LOG OUT</button>
    </div>
  );
}

export default User;
