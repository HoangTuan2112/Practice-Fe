import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Mail, Trash2, X } from "lucide-react";
import {
  deleteMessage,
  markMessageAsRead,
} from "../../../redux/slices/adminSlice";

function ContactMessages() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleView = async (message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      dispatch(markMessageAsRead(message.id));
    }
  };

  const handleDelete = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessage(messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-12 gap-6">
        {/* Messages List */}
        <div className="col-span-5 bg-white rounded-lg shadow-sm p-4">
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleView(message)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedMessage?.id === message.id ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{message.name}</h3>
                  <span className="text-sm text-gray-500">
                    {message.createdAt}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {message.subject}
                  </p>
                  {message.status === "unread" && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="col-span-7 bg-white rounded-lg shadow-sm p-4">
          {selectedMessage ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {selectedMessage.subject}
                  </h2>
                  <p className="text-sm text-gray-500">
                    From: {selectedMessage.name} ({selectedMessage.email})
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleReply(selectedMessage.email)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Reply"
                  >
                    <Mail size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="prose max-w-none">
                <p>{selectedMessage.message}</p>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a message to view
            </div>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {selectedMessage ? (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {selectedMessage.subject}
              </h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                From: {selectedMessage.name} ({selectedMessage.email})
              </p>
              <p className="text-sm text-gray-500">
                Date: {selectedMessage.date}
              </p>
            </div>
            <div className="prose max-w-none mb-4">
              <p>{selectedMessage.message}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleReply(selectedMessage.email)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Mail size={18} />
              </button>
              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="bg-white p-4 rounded-lg shadow-sm"
                onClick={() => handleView(message)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {message.name}
                    </h3>
                    <p className="text-sm text-gray-500">{message.email}</p>
                  </div>
                  {message.status === "unread" && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {message.subject}
                </p>
                <p className="text-xs text-gray-500 mt-2">{message.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactMessages;
