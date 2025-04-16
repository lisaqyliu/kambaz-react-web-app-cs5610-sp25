import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as client from "./client";
import { FormControl, Table } from "react-bootstrap";
import { FaPlus, FaUserCircle, FaPencilAlt, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();
  const navigate = useNavigate();
  
  // For user details
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [editName, setEditName] = useState("");
  const [editing, setEditing] = useState(false);

  // Fetch all users - with optional filters applied
  const fetchUsers = async (applyFilters = false) => {
    let fetchedUsers;
    
    if (applyFilters) {
      if (role && name) {
        // Apply both filters
        fetchedUsers = await client.findUsersByRoleAndName(role, name);
      } else if (role) {
        // Apply only role filter
        fetchedUsers = await client.findUsersByRole(role);
      } else if (name) {
        // Apply only name filter
        fetchedUsers = await client.findUsersByPartialName(name);
      } else {
        // No filters
        fetchedUsers = await client.findAllUsers();
      }
    } else {
      // Just get all users
      fetchedUsers = await client.findAllUsers();
    }
    
    setUsers(fetchedUsers.reverse());  // Show most recent user first
  };

  // Filter by role
  const filterUsersByRole = async (newRole: string) => {
    setRole(newRole);
    
    // Apply filters
    let filteredUsers;
    if (newRole && name) {
      filteredUsers = await client.findUsersByRoleAndName(newRole, name);
    } else if (newRole) {
      filteredUsers = await client.findUsersByRole(newRole);
    } else if (name) {
      filteredUsers = await client.findUsersByPartialName(name);
    } else {
      filteredUsers = await client.findAllUsers();
    }
    
    setUsers(filteredUsers);
  };

  // Filter by name
  const filterUsersByName = async (newName: string) => {
    setName(newName);
    
    // Apply filters
    let filteredUsers;
    if (role && newName) {
      filteredUsers = await client.findUsersByRoleAndName(role, newName);
    } else if (role) {
      filteredUsers = await client.findUsersByRole(role);
    } else if (newName) {
      filteredUsers = await client.findUsersByPartialName(newName);
    } else {
      filteredUsers = await client.findAllUsers();
    }
    
    setUsers(filteredUsers);
  };

  // Create a new user
  const createUser = async () => {
    await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });

    // We don't reset filters here
    await fetchUsers(true);  // Refresh the list while maintaining filters
  };
  
  // Fetch user details
  const fetchUserDetails = async () => {
    if (!uid) return;
    try {
      const user = await client.findUserById(uid);
      setSelectedUser(user);
      setEditName(`${user.firstName} ${user.lastName}`);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };
  
  // Save edited user
  const saveUser = async () => {
    const [firstName, lastName] = editName.trim().split(" ");
    const updatedUser = { ...selectedUser, firstName, lastName };
    
    try {
      const response = await client.updateUser(updatedUser);
      setSelectedUser(response); // Update the selected user with the response
      setEditing(false);
      
      // Also update the user in the table list
      await fetchUsers(true);
      
      // Refresh the user details to ensure consistency
      await fetchUserDetails();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };
  
  // Delete user
  const deleteUser = async () => {
    if (!uid) return;
    await client.deleteUser(uid);
    navigate("/Kambaz/Account/Users");
    await fetchUsers(true); // Refresh with current filters
  };
  
  // Close details panel
  const handleCloseDetails = () => {
    navigate("/Kambaz/Account/Users");
  };

  useEffect(() => {
    // Always maintain filters when fetching users
    fetchUsers(true);
    
    // If we have a user ID, fetch that user's details
    if (uid) {
      fetchUserDetails();
    }
  }, [uid]);
  
  // On initial load, fetch all users
  useEffect(() => {
    fetchUsers(false);
  }, []);

  return (
    <div className="d-flex flex-column position-relative">
      <div className="flex-fill me-4">
        <h3>Users</h3>

        {/* Filters + Add Button Row */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-2">
            <FormControl
              type="text"
              placeholder="Search people"
              className="w-25"
              value={name}
              onChange={(e) => filterUsersByName(e.target.value)}
            />
            <select
              value={role}
              onChange={(e) => filterUsersByRole(e.target.value)}
              className="form-select w-25"
            >
              <option value="">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="TA">Assistants</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrators</option>
            </select>
          </div>

          <button onClick={createUser} className="btn btn-danger wd-add-people">
            <FaPlus className="me-2" />
            Users
          </button>
        </div>

        {/* Users Table */}
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Role</th>
              <th>Last Activity</th>
              <th>Total Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className={user._id === uid ? "table-primary" : ""}>
                  <td className="wd-full-name text-nowrap">
                    <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName}</span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </Link>
                  </td>
                  <td className="wd-login-id">{user.loginId || "N/A"}</td>
                  <td className="wd-role">{user.role || "N/A"}</td>
                  <td className="wd-last-activity">{user.lastActivity?.substring(0,10) || "N/A"}</td>
                  <td className="wd-total-activity">{user.totalActivity || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">No users found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      
      {/* User Details Panel */}
      {uid && (
        <div className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25 z-3">
          {/* Close Button */}
          <button
            onClick={handleCloseDetails}
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
                    {selectedUser.firstName} {selectedUser.lastName}
                  </div>
                  <FaPencilAlt onClick={() => setEditing(true)} className="wd-edit ms-2" />
                </>
              ) : (
                <>
                  <FormControl
                    className="me-2 wd-edit-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveUser()}
                  />
                  <FaCheck onClick={saveUser} className="wd-save" />
                </>
              )}
            </div>

            {/* Static Info */}
            <div className="mt-3">
              <b>Roles:</b> <span className="wd-roles">{selectedUser.role || "N/A"}</span><br />
              <b>Login ID:</b> <span className="wd-login-id">{selectedUser.loginId || "N/A"}</span><br />
              <b>Email:</b> <span className="wd-email">{selectedUser.email || "N/A"}</span><br />
              <b>Section:</b> <span className="wd-section">{selectedUser.section || "N/A"}</span><br />
              <b>Total Activity:</b> <span className="wd-total-activity">{selectedUser.totalActivity || "N/A"}</span>
            </div>
          </div>

          {/* Buttons */}
          <hr />
          <div className="mt-4">
            <button
              onClick={deleteUser}
              className="btn btn-danger float-end wd-delete"
            >
              Delete
            </button>
            <button
              onClick={handleCloseDetails}
              className="btn btn-secondary float-start me-2 wd-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
