import { useEffect, useState } from "react";
import { FaPencilAlt, FaUserCircle, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!uid) return;
    try {
      const fetchedUser = await client.findUserById(uid);
      setUser(fetchedUser);
      setName(`${fetchedUser.firstName} ${fetchedUser.lastName}`);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.trim().split(" ");
    const updatedUser = { ...user, firstName, lastName };
    const response = await client.updateUser(updatedUser);
    setUser(response);
    setEditing(false);
    navigate(-1); // Go back after saving
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25 z-3">
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn position-absolute end-0 top-0 me-3 mt-3 z-3"
      >
        <IoCloseSharp className="fs-2" />
      </button>

      {/* User Icon */}
      <div className="text-center mt-4">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      {/* Name Section */}
      <div className="text-start mt-4">
        <div className="d-flex justify-content-between align-items-center">
          {!editing ? (
            <>
              <div className="text-danger fs-4 wd-name" onClick={() => setEditing(true)}>
                {user.firstName} {user.lastName}
              </div>
              <FaPencilAlt onClick={() => setEditing(true)} className="wd-edit ms-2" />
            </>
          ) : (
            <>
              <FormControl
                className="me-2 wd-edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveUser()}
              />
              <FaCheck onClick={saveUser} className="wd-save" />
            </>
          )}
        </div>

        {/* Static Info */}
        <div className="mt-3">
          <b>Roles:</b> <span className="wd-roles">{user.role || "N/A"}</span><br />
          <b>Login ID:</b> <span className="wd-login-id">{user.loginId || "N/A"}</span><br />
          <b>Section:</b> <span className="wd-section">{user.section || "N/A"}</span><br />
          <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity || "N/A"}</span>
        </div>
      </div>

      {/* Buttons */}
      <hr />
      <div className="mt-4">
        <button
          onClick={() => deleteUser(uid)}
          className="btn btn-danger float-end wd-delete"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary float-start me-2 wd-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
