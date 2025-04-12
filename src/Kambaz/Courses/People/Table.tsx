import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PeopleDetails from "./Details";

export default function PeopleTable({users = []}: {users?: any[]}) {
    return (
        <div id="wd-people-table">
            <PeopleDetails />
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
                        users.map((user:any) => (
                            <tr key={user._id}>
                                <td className="wd-full-name text-nowrap">
                                    <Link to= {`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
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
    );
}