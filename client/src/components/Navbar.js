import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Navbar() {
  const { data} = useQuery(GET_AUTHENTICATED_USER);
  const [logout, {client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

  const handleLogout = async () => {
		try {
			await logout();
			client.resetStore();
		} catch (error) {
			console.error("Error logging out:", error);
			toast.error(error.message);
		}
	};


  const authUser = data?.authUser;

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/" >Ride On</Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {/* Display user's profile picture */}
              <img
                alt={authUser?.name || "User"}
                src={authUser?.profilePicture || "https://imgplaceholder.com/100"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <div className="justify-between">
                {authUser?.username || "Profile"} 
              </div>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
