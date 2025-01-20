import { useState } from "react";
import { Search, Flag, Eye, Check, X } from "lucide-react";

function ReportsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data
  const reports = [
    {
      id: 1,
      type: "comment",
      content: "Inappropriate comment on blog post",
      reportedItem: "Comment on 'Pet Nutrition Guide'",
      reportedBy: "John Doe",
      reportedAt: "2024-03-15",
      status: "pending",
    },
    {
      id: 2,
      type: "review",
      content: "False review information",
      reportedItem: "Review for PetCare Hospital",
      reportedBy: "Jane Smith",
      reportedAt: "2024-03-14",
      status: "resolved",
    },
  ];

  const handleView = (report) => {
    console.log("View report:", report);
  };

  const handleResolve = (reportId) => {
    console.log("Resolve report:", reportId);
  };

  const handleDismiss = (reportId) => {
    console.log("Dismiss report:", reportId);
  };

  const filteredReports = reports.filter((report) => {
    if (selectedStatus !== "all" && report.status !== selectedStatus)
      return false;
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports Management</h1>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reported Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reported By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      report.type === "comment"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.reportedItem}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.reportedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      report.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.reportedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleView(report)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Eye size={18} />
                  </button>
                  {report.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleResolve(report.id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleDismiss(report.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsManagement;
