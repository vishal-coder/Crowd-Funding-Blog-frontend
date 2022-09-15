import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../services/postService";
import "./css/sidebar.css";

function Sidebar({ userName }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchData() {
      console.log("username in sidebar is", userName);
      const userResponse = await getUserDetails({
        username: userName,
      });
      setUser(userResponse.userDetails);
    }
    fetchData();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES </span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/posts/StartUp">StartUp</Link>
          </li>

          <li className="sidebarListItem">
            <Link to="/posts/Health">Health</Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/posts/Education">Education</Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/posts/Farmers">Farmers</Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/posts/Environment">Environment</Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/posts/Other">Other</Link>
          </li>
        </ul>
      </div>{" "}
      {user ? (
        <>
          <div className="sidebarItem">
            <div className="sidebarTitle">ABOUT ME</div>
            <img
              className="sidebarImg"
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1663268178~exp=1663268778~hmac=947e0c982fb67cd115e1baefc7c206c423de446acff30dc2088ce9d79a76413a"
              alt="Profile Picture"
            />
            <div>
              <span>{user.firstname}</span> <span>{user.lastname}</span>
            </div>
            <p>{user.about}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Sidebar;
