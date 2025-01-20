import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";

function BlogList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Posts");

  const filters = [
    "All Posts",
    "Health Tips",
    "Pet Care",
    "Nutrition",
    "Training",
    "Behavior",
    "Grooming"
  ];

  const posts = [
    {
      id: 1,
      title: "Tips for New Pet Owners",
      author: "Dr. Nguyen Van A",
      avatar: "/avatar1.jpg",
      date: "2024-03-15",
      excerpt:
        "Essential guidelines and tips for first-time pet owners to ensure their furry friends stay healthy and happy...",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
      readTime: "5 min read",
      category: "Pet Care",
      tags: ["Pet Care", "Health Tips"],
      likes: 24,
      comments: 8,
    },
    // Thêm các bài viết khác
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeFilter === "All Posts" ||
      post.category === activeFilter ||
      post.tags.includes(activeFilter);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#98E9E9] to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pet Care Blog
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover tips, stories and expert advice for your beloved pets
            </p>
            <Link
              to="/write-blog"
              className="inline-block px-8 py-3 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:border-[#98E9E9]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  activeFilter === filter
                    ? "bg-[#98E9E9] text-[#1A3C8E]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Blog List */}
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link
                    to={`/blogdetail/${post.id}`}
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        {post.readTime}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7CD5D5] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.avatar}
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {post.author}
                            </div>
                            <div className="text-sm text-gray-500">{post.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;
