import React from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import users from "../../Database/users.json"; // Import users data
import enrollments from "../../Database/enrollments.json"; // Import enrollments data

export default function PeopleTable() {
    const { cid } = useParams(); // Get Course ID from URL

    // Filter users who are enrolled in the current course
    const enrolledUsers = users.filter(user =>
        enrollments.some(enrollment => enrollment.user === user._id && enrollment.course === cid)
    );

    return (
        <div id="wd-people-table">
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
                    {enrolledUsers.length > 0 ? (
                        enrolledUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="wd-full-name text-nowrap">
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>{" "}
                                    <span className="wd-last-name">{user.lastName}</span>
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                <td className="wd-role">{user.role}</td>
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center text-muted">No users found for this course.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
