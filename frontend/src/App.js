import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://136.110.55.223:3000/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((u) => (
        <p key={u.id}>{u.name} ({u.email})</p>
      ))}
    </div>
  );
}

export default App;
