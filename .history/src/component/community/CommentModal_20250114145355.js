import { useState } from "react";
import { X, Send } from "lucide-react";

function CommentModal({ isOpen, onClose, post }) {
  const [comment, setComment] = useState("");

  const comments = [
    {
      id: 1,
      author: {
        name: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      },
      content: "Such a cute cat! 😍",
      createdAt: "1 hour ago",
    },
    // Thêm comments mẫu khác...
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement comment submission
    setComment("");
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl w-full max-w-xl mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl p-3">
                  <h4 className="font-semibold text-sm">{comment.author.name}</h4>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {comment.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
            />
            <button
              type="submit"
              className="p-2 text-[#1A3C8E] hover:bg-gray-100 rounded-full"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentModal; 