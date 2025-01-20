import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Setting() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showEditName, setShowEditName] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showEditBio, setShowEditBio] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const navigate = useNavigate();

  const [user] = useState({
    name: "Khương Thanh",
    username: "thanhkhuong",
    bio: "Chưa cập nhật",
    avatar: "T",
  });

  const handleClose = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const renderPersonalInfo = () => (
    <div>
      <h2 className="text-xl mb-2">Thông tin cá nhân</h2>
      <p className="text-gray-600 mb-6">Quản lý thông tin cá nhân của bạn.</p>

      <div className="bg-[#F8F9FF] rounded-2xl">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">Thông tin cơ bản</h3>
          <p className="text-gray-600 text-sm">
            Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
          </p>
        </div>

        <div className="bg-white rounded-2xl">
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setShowEditName(true)}
          >
            <div>
              <div className="font-medium">Họ và tên</div>
              <div className="text-gray-600 mt-1">{user.name}</div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setShowEditUsername(true)}
            >
              <div>
                <div className="font-medium">Tên người dùng</div>
                <div className="text-gray-600 mt-1">{user.username}</div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setShowEditBio(true)}
            >
              <div>
                <div className="font-medium">Giới thiệu</div>
                <div className="text-gray-600 mt-1">{user.bio}</div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setShowEditAvatar(true)}
            >
              <div>
                <div className="font-medium">Ảnh đại diện</div>
                <div className="mt-2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl">
                  {user.avatar}
                </div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityInfo = () => (
    <div>
      <h2 className="text-xl mb-2">Mật khẩu và bảo mật</h2>
      <p className="text-gray-600 mb-6">Quản lý mật khẩu và cài đặt bảo mật.</p>

      <div className="bg-[#F8F9FF] rounded-2xl">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">Đăng nhập & khôi phục</h3>
          <p className="text-gray-600 text-sm">Quản lý mật khẩu của bạn.</p>
        </div>

        <div className="bg-white rounded-2xl">
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setShowChangePassword(true)}
          >
            <div>
              <div className="font-medium">Đổi mật khẩu</div>
              <div className="text-gray-600 mt-1">Chưa đổi mật khẩu</div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Thêm các modal components
  const EditNameModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Chỉnh sửa tên</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );

  const EditUsernameModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Chỉnh sửa tên người dùng</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên người dùng
            </label>
            <input
              type="text"
              defaultValue={user.username}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );

  const EditBioModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Chỉnh sửa giới thiệu</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giới thiệu
            </label>
            <textarea
              defaultValue={user.bio}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );

  const ChangePasswordModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Đổi mật khẩu</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu mới
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );

  // Thêm EditAvatarModal component
  const EditAvatarModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Thay đổi ảnh đại diện</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Hiển thị avatar hiện tại */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl">
              {user.avatar}
            </div>
          </div>

          {/* Upload ảnh mới */}
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload" className="cursor-pointer text-center">
                <div className="text-gray-600 mb-2">
                  <span className="text-blue-600 hover:text-blue-700">
                    Click để tải ảnh lên
                  </span>{" "}
                  hoặc kéo thả ảnh vào đây
                </div>
                <div className="text-sm text-gray-500">
                  PNG, JPG (tối đa 2MB)
                </div>
              </label>
            </div>

            {/* Hoặc chọn chữ cái đầu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hoặc nhập chữ cái hiển thị
              </label>
              <input
                type="text"
                maxLength="1"
                defaultValue={user.avatar}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập 1 chữ cái"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen bg-white">
        {/* Header với nút đóng */}
        <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center">
          {/* Spacer bên trái để căn giữa tiêu đề */}
          <div className="w-10" /> 
          
          {/* Tiêu đề ở giữa */}
          <h1 className="flex-1 text-xl font-semibold text-center">
            Cài đặt tài khoản
          </h1>
          
          {/* Nút đóng bên phải */}
          <button 
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-20">
                <button
                  className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 ${
                    activeTab === "personal" ? "bg-[#1A1A37] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  <span className="text-xl">👤</span>
                  <span className="font-medium">Thông tin cá nhân</span>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 mt-1 ${
                    activeTab === "security" ? "bg-[#1A1A37] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <span className="text-xl">🔒</span>
                  <span className="font-medium">Mật khẩu và bảo mật</span>
                </button>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="col-span-12 lg:col-span-9">
              {activeTab === "personal" && renderPersonalInfo()}
              {activeTab === "security" && renderSecurityInfo()}
            </div>
          </div>
        </div>
        
        {/* Render các modal */}
        {showEditName && <EditNameModal onClose={() => setShowEditName(false)} />}
        {showEditUsername && <EditUsernameModal onClose={() => setShowEditUsername(false)} />}
        {showEditBio && <EditBioModal onClose={() => setShowEditBio(false)} />}
        {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
        {showEditAvatar && <EditAvatarModal onClose={() => setShowEditAvatar(false)} />}
      </div>
    </div>
  );
}

export default Setting;
