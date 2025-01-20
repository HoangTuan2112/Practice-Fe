import { useState } from "react";
import {
  Users,
  Hospital,
  FileText,
  Calendar,
  BarChart2,
  Search,
  Home,
  ArrowLeft,
  X,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "overview",
      name: "Overview",
      icon: BarChart2,
    },
    {
      id: "users",
      name: "Users Management",
      icon: Users,
    },
    {
      id: "hospitals",
      name: "Hospitals Management",
      icon: Hospital,
    },
    {
      id: "blogs",
      name: "Blogs Management",
      icon: FileText,
    },
    {
      id: "appointments",
      name: "Appointments",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-sm"
        >
          {isSidebarOpen ? (
            <X size={24} className="text-gray-600" />
          ) : (
            <Menu size={24} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 bottom-0 w-64 bg-white shadow-sm z-20 transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mt-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Website</span>
          </Link>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find((item) => item.id === activeTab)?.name}
            </h2>
            <Link
              to="/"
              className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Total Hospitals
              </h3>
              <p className="text-3xl font-bold text-blue-600">56</p>
              <p className="text-sm text-gray-500 mt-2">+3 new this month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Total Appointments
              </h3>
              <p className="text-3xl font-bold text-blue-600">892</p>
              <p className="text-sm text-gray-500 mt-2">+25% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Total Blogs
              </h3>
              <p className="text-3xl font-bold text-blue-600">145</p>
              <p className="text-sm text-gray-500 mt-2">+8 new this week</p>
            </div>
          </div>
        )}

        {/* Tables in management tabs */}
        <div className="overflow-x-auto">
          {activeTab === "users" && <UsersManagement />}
          {activeTab === "hospitals" && <HospitalsManagement />}
          {activeTab === "blogs" && <BlogsManagement />}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
