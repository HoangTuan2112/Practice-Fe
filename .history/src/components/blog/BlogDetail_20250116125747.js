import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, MoreHorizontal, Flag, Heart } from "lucide-react";
import heart from "../../assets/img/heart.svg";
import comment from "../../assets/img/comment.svg";
import { useParams } from "react-router-dom";
import ReportCommentModal from "./ReportCommentModal";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    // Mock data cho comments
    {
      id: 1,
      userName: "Nguyễn Phan Dank",
      userAvatar: null,
      content: "Bài viết rất hay và bổ ích",
      createdAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: 2,
      userName: "Sơn Đặng",
      userAvatar: null,
      content: "Cảm ơn bạn đã theo dõi!",
      createdAt: "2024-01-02T00:00:00.000Z",
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Giả lập API call
        const data = {
          id,
          title: "Hoàng Bảo Trung - Học viên tiêu biểu của F8...",
          content: "...",
          author: {
            id: 1,
            name: "Sơn Đặng",
            avatar: "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
          },
          createdAt: "3 tháng trước",
          readTime: "6 phút đọc",
          likes: 0
        };
        setBlog(data);
        setLikes(data.likes);
      } catch (error) {
        console.error("Failed to load blog:", error);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const heartIconStyle = {
    filter: isLiked
      ? "invert(27%) sepia(91%) saturate(2352%) hue-rotate(331deg) brightness(94%) contrast(96%)"
      : "none",
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      userName: "User Name", // Thay bằng tên user thật
      userAvatar: null,
      content: newComment,
      createdAt: new Date().toISOString()
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleReport = async (reportData) => {
    try {
      console.log("Report submitted:", reportData);
      setShowReportModal(false);
    } catch (error) {
      console.error("Failed to submit report:", error);
    }
  };

  const handleComment = () => {
    setShowComments(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-2">
            <div className="lg:sticky lg:top-[100px] w-full">
              <div className="font-[600] text-[#000]">Sơn Đặng</div>
              <div className="text-[13px] pt-[5px] pb-[5px] text-[#757575] border-b border-[#7575753f]">
                Stop thinking, start doing!
              </div>
              <div className="flex gap-[20px] mt-[20px]">
                <div
                  className={`flex gap-[4px] items-center ${
                    isLiked ? "text-red-500" : "text-[#757575]"
                  } cursor-pointer hover:text-red-500 transition-colors`}
                  onClick={handleLike}
                >
                  <img
                    src={heart}
                    width={"20px"}
                    style={heartIconStyle}
                    className="transition-all"
                  />
                  {likes}
                </div>

                <div
                  className="ms-4 flex gap-[4px] items-center text-[#757575] cursor-pointer hover:text-blue-500 transition-colors"
                  onClick={handleComment}
                >
                  <img src={comment} width={"20px"} />
                  {comments.length}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="">
              <h1 className="text-[#222] text-2xl lg:text-3xl font-bold leading-tight mb-6">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200 mb-6">
                <div className="flex-shrink-0">
                  <img
                    src={blog.author.avatar}
                    alt="Author avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#292929] text-base">
                    {blog.author.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {blog.createdAt} • {blog.readTime}
                  </span>
                </div>
              </div>
              <p className="text-[#292929] mb-4">{blog.content}</p>
            </div>
            <div className="mt-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  Front-end
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  ReactJS
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  UI
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  UX
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Bài đăng cùng tác giả
              </h2>

              <ul className="space-y-2 list-disc text-[#000] pl-[20px]">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    Tổng hợp các sản phẩm của học viên tại F8
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    [Phần 1] Tạo dự án ReactJS với Webpack và Babel
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    [Vlog] Review tất cả đồ mình sử dụng cho F8
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    Tại sao nên thêm rel="noopener" khi sử dụng
                    target="_blank"?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    Áo Polo F8 Đã Về! Trên Tay Áo Polo F8 Của F8
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Bài viết nổi bật khác
                </h1>
                <p className="text-gray-600 mt-2">
                  Đăng bởi {blog.author.name} · {blog.createdAt}
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Tổng hợp các sản phẩm của học viên tại F8{" "}
                  <span role="img" aria-label="clapping hands">
                    👏👏
                  </span>
                </h2>
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    src="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png"
                    className="w-full object-cover"
                  />
                </div>
                <p className="text-gray-700">
                  Bài viết này nhằm tổng hợp lại các dự án mà học viên F8 đã
                  hoàn thành và chia sẻ trên nhóm
                  <Link
                    href="https://www.facebook.com/groups/f8official"
                    className="text-blue-500 ml-1"
                  >
                    Học lập trình web F8
                  </Link>
                  . Các dự án dưới đây được mình ngẫu nhiên lựa chọn để đăng
                  chứ không mang tính xếp hạng các bạn nhé.
                </p>
                <Link
                  href="https://fullstack.edu.vn"
                  className="text-red-500 font-semibold hover:underline"
                >
                  Xem thêm hàng trăm dự án khác do học viên F8 tự làm.
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-2"></div>
        </div>
      </div>

      {/* Comments Popup */}
      {showComments && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
            onClick={() => setShowComments(false)}
          />

          <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-lg flex flex-col z-[9999]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-sm text-gray-500">{comments.length} comments</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-red-500">
                  <Heart className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 p-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {comment.userName[0]}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{comment.userName}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toISOString().split('T')[0]}
                          </p>
                        </div>

                        <div className="relative">
                          <button
                            onClick={() => setSelectedComment(comment)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </button>

                          {selectedComment?.id === comment.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                              <button
                                onClick={() => {
                                  setShowReportModal(true);
                                  setSelectedComment(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                              >
                                <Flag className="h-4 w-4 mr-2" />
                                Báo cáo
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-gray-600">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Form */}
            <div className="border-t p-4 bg-white">
              <form onSubmit={handleSubmitComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                  rows="3"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <ReportCommentModal
          comment={selectedComment}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
        />
      )}
    </section>
  );
};

export default BlogDetail;
