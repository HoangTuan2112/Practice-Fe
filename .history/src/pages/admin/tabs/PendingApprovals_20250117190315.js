import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Check, X, Trash2 } from "lucide-react";
import {
  approvePending,
  rejectPending,
  deletePending,
} from "../../../redux/slices/adminSlice";
import { useTranslation } from "react-i18next";

function PendingApprovals() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pendingApprovals } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleApprove = (id) => {
    dispatch(approvePending(id));
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      dispatch(rejectPending(id));
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      dispatch(deletePending(id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  const filteredItems = pendingApprovals.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-6">{t("admin.approvals.title")}</h2>
      
      <input
        type="text"
        placeholder={t("admin.approvals.search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
      />

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.approvals.table.type")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.approvals.table.name")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.approvals.table.submittedBy")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.approvals.table.date")}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.approvals.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.type === "hospital"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.submittedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      {item.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>

            <div className="text-sm text-gray-500 mb-3">
              <p>Email: {item.email}</p>
              <p>Submitted: {item.submittedAt}</p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleView(item)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => handleApprove(item.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => handleReject(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedItem.type}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedItem.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedItem.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Details
                </label>
                <div className="mt-1 bg-gray-50 rounded-lg p-4">
                  {Object.entries(selectedItem.details).map(([key, value]) => (
                    <div key={key} className="mb-2">
                      <span className="font-medium text-gray-700 capitalize">
                        {key}:{" "}
                      </span>
                      <span className="text-gray-900">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
              {selectedItem.status === "pending" ? (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedItem.id);
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedItem.id);
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleDelete(selectedItem.id);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingApprovals;
