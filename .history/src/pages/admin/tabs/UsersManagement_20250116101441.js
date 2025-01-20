import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";
import {
  deleteUser,
  updateUserStatus,
  addUser,
} from "../../../redux/slices/adminSlice";

function UsersManagement() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Pet Owner", // Default role
    password: "",
    confirmPassword: "",
  });

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill in all required fields");
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(
      addUser({
        ...newUser,
        id: Date.now(), // Temporary ID generation
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      })
    );
    setIsAddingUser(false);
    setNewUser({
      name: "",
      email: "",
      role: "Pet Owner",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="p-6">
      {/* Header with Add User button */}
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-bold">Users Management</h1> */}
        <button
          onClick={() => setIsAddingUser(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="p-4">Name</th>
              <th className="p-4 hidden md:table-cell">Email</th>
              <th className="p-4 hidden md:table-cell">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 hidden md:table-cell">Join Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="p-4">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500 md:hidden">{user.email}</div>
                </td>
                <td className="p-4 hidden md:table-cell">{user.email}</td>
                <td className="p-4 hidden md:table-cell">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === "Admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 hidden md:table-cell">{user.joinDate}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleView(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isAddingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                >
                  <option value="Pet Owner">Pet Owner</option>
                  <option value="Veterinarian">Veterinarian</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) =>
                    setNewUser({ ...newUser, confirmPassword: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsAddingUser(false);
                  setNewUser({
                    name: "",
                    email: "",
                    role: "Pet Owner",
                    password: "",
                    confirmPassword: "",
                  });
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View/Edit Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser ? "Edit User" : "View User"}
            </h2>
            {/* Modal content */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedUser.name}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedUser.email}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={selectedUser.role}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <input
                  type="text"
                  value={selectedUser.status}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersManagement;
