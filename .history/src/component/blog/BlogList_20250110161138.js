import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;
  const blogData = [
    {
      id: 1,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 2,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 3,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 4,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 5,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 6,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 7,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 8,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 9,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 10,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 11,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 12,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 13,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 14,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 15,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 16,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 17,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 18,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 19,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 20,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 21,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 22,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 23,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 24,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 25,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 26,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 27,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 28,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 29,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 30,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 31,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 32,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
  ];
  const offset = currentPage * limit;
  const currentPageData = blogData.slice(offset, offset + limit);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog cards */}
          {currentPageData.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Blog card content */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogList;
