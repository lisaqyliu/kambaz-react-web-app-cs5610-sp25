import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as client from "./client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  // Fetch all users
  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    setUsers(allUsers.reverse());  // Show most recent user first
  };

  // Filter by role
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const filteredUsers = await client.findUsersByRole(role);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  // Filter by name
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const filteredUsers = await client.findUsersByPartialName(name);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
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

    setName("");
    setRole("");
    await fetchUsers();  // Refresh the list after creation
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div className="d-flex">
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
      </div>
    </div>
  );
}
