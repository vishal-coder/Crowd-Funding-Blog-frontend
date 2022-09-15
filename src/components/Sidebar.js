import { useEffect, useState } from "react";
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
      {user ? (
        <>
          <div className="sidebarItem">
            <div className="sidebarTitle">ABOUT ME</div>
            <img
              className="sidebarImg"
              src="https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Profile Picture"
            />
            <div>
              <span>{user.firstname}</span> <span>{user.lastname}</span>
            </div>
            <p>{user.about}</p>
          </div>
          <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES </span>
            <ul className="sidebarList">
              <li className="sidebarListItem">StartUP</li>
              <li className="sidebarListItem">Environmental</li>
              <li className="sidebarListItem">Health</li>
              <li className="sidebarListItem">Farmers</li>
              <li className="sidebarListItem">Tree Plantation</li>
            </ul>
          </div>{" "}
        </>
      ) : (
        <p>Data is loading</p>
      )}
    </div>
  );
}

export default Sidebar;
