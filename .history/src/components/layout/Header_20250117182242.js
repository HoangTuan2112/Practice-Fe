import {
  ChevronDown,
  Menu,
  X,
  Globe,
  Settings,
  Home,
  Info,
  Mail,
  Search,
  FileText,
  Users,
  User,
  FileEdit,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/img/logocustom.png";
import ButtonLink from "../../core/ButtonLink";
import Register from "../register/Register";
import Overlay from "../../core/Overlay";
import Login from "../login/Login";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const servicesDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Xử lý click outside cho dropdown ngôn ngữ
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
      
      // Xử lý click outside cho các dropdown khác nếu cần
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const handleOpenRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };

  const handleOpenLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };

  const languageOptions = [
    {
      value: "en",
      label: (
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-gray-600 mr-2" />
          <span>English</span>
        </div>
      ),
    },
    {
      value: "vi",
      label: (
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-gray-600 mr-2" />
          <span>Tiếng Việt</span>
        </div>
      ),
    },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      minHeight: "40px",
      "&:hover": {
        border: 0,
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#f3f4f6" : "white",
      color: "#374151",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#e5e7eb",
      },
    }),
    menu: (base) => ({
      ...base,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      borderRadius: "0.5rem",
      marginTop: "0.5rem",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#374151",
      "&:hover": {
        color: "#1d4ed8",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151",
    }),
  };

  const handleNavigate = (path) => {
    setIsServicesOpen(false);
    navigate(path);
  };

  const handleLoginSuccess = (userData) => {
    const adminUser = {
      ...userData,
      role: "admin",
      name: "Admin User",
      email: "admin@example.com",
    };

    setIsLoggedIn(true);
    setUser(adminUser);
    setIsAdmin(true);
    setIsOpenLogin(false);
  };

  const servicesDropdown = [
    {
      name: "Find Hospital",
      link: "/find-hospital",
      description: "Search for nearby veterinary hospitals",
    },
    {
      name: "Book Appointment",
      link: "/appointment",
      description: "Schedule a visit with our veterinarians",
    },
    {
      name: "Blog",
      link: "/bloglist",
      description: "Read latest news and articles",
    },
    {
      name: "Community",
      link: "/community",
      description: "Join our pet lovers community",
    },
    {
      name: "Terms & Conditions",
      link: "/terms",
      description: "Read our terms of service",
    },
  ];

  const handleServicesClick = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 bg-white z-50 ${
          isSticky ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6">
              <Link to="/">
                <img src={logo} alt="Logo" className="h-10" />
              </Link>
              <nav className="hidden lg:block">
                <ul className="flex items-center space-x-4">
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                      {t("nav.home")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aboutus"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {t("nav.aboutUs")}
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={handleContactClick}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {t("nav.contactUs")}
                    </a>
                  </li>
                  <li className="relative" ref={servicesDropdownRef}>
                    <button
                      onClick={handleServicesClick}
                      className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                      {t("nav.services.title")}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {isServicesOpen && (
                      <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border py-1">
                        <Link
                          to="/find-hospital"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-medium">
                            {t("nav.findHospital")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("nav.services.findHospitalDesc")}
                          </div>
                        </Link>
                        <Link
                          to="/bloglist"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-medium">{t("nav.blog")}</div>
                          <div className="text-sm text-gray-600">
                            {t("nav.services.blogDesc")}
                          </div>
                        </Link>
                        <Link
                          to="/community"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-medium">
                            {t("nav.community")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("nav.services.communityDesc")}
                          </div>
                        </Link>
                        <Link
                          to="/terms"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-medium">
                            {t("nav.services.termsTitle")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("nav.services.termsDesc")}
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <div className="hidden md:flex items-center gap-6">
                <div className="relative" ref={languageRef}>
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                  >
                    <Globe className="w-5 h-5" />
                    <span>{t("language")}</span>
                  </button>

                  {isLanguageOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                      <button
                        onClick={() => {
                          i18n.changeLanguage("en");
                          setIsLanguageOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        English
                      </button>
                      <button
                        onClick={() => {
                          i18n.changeLanguage("vi");
                          setIsLanguageOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        Tiếng Việt
                      </button>
                    </div>
                  )}
                </div>

                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={handleOpenLogin}
                      className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                      {t("auth.login")}
                    </button>
                    <button
                      onClick={handleOpenRegister}
                      className="bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5]"
                    >
                      {t("auth.register")}
                    </button>
                  </>
                ) : (
                  <div ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user?.avatar}
                      </div>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          {t("auth.profile")}
                        </Link>
                        <Link
                          to="/my-blogs"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          {t("auth.myBlogs")}
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            {t("auth.adminDashboard")}
                          </Link>
                        )}
                        <Link
                          to="/setting"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          {t("auth.settings")}
                        </Link>
                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            setUser(null);
                            setShowUserMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          {t("auth.signOut")}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              className="lg:hidden text-gray-700 p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleMenu}
            />
            <div className="fixed inset-y-0 right-0 w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-gray-600 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>

              {isLoggedIn && (
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#98E9E9] flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-700">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium">
                        {user?.name}
                      </div>
                      <div className="text-gray-600 text-sm">{user?.email}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <nav className="space-y-6">
                  <div className="space-y-2">
                    <Link
                      to="/"
                      className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Home className="w-5 h-5" />
                      Home
                    </Link>
                    <Link
                      to="/aboutus"
                      className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Info className="w-5 h-5" />
                      About Us
                    </Link>
                    <Link
                      to="/contactus"
                      className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Mail className="w-5 h-5" />
                      Contact Us
                    </Link>
                  </div>

                  <div>
                    <div className="text-[#1A3C8E] uppercase text-sm font-medium px-3 mb-2">
                      Explore More
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/find-hospital"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <Search className="w-5 h-5" />
                        Find Hospital
                      </Link>
                      <Link
                        to="/bloglist"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <FileText className="w-5 h-5" />
                        Blog
                      </Link>
                      <Link
                        to="/community"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <Users className="w-5 h-5" />
                        Community
                      </Link>
                    </div>
                  </div>

                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <div className="text-[#1A3C8E] uppercase text-sm font-medium px-3 mb-2">
                        Account
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <User className="w-5 h-5" />
                        Profile
                      </Link>
                      <Link
                        to="/my-blogs"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <FileEdit className="w-5 h-5" />
                        My Blogs
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                          onClick={toggleMenu}
                        >
                          <Settings className="w-5 h-5" />
                          Admin Dashboard
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setUser(null);
                          toggleMenu();
                        }}
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          toggleMenu();
                          handleOpenLogin();
                        }}
                        className="w-full px-4 py-2 text-[#1A3C8E] border border-[#1A3C8E] rounded-lg hover:bg-[#98E9E9]/20"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          toggleMenu();
                          handleOpenRegister();
                        }}
                        className="w-full px-4 py-2 bg-[#1A3C8E] text-white rounded-lg hover:bg-[#1A3C8E]/90"
                      >
                        Register
                      </button>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </>
        )}
      </header>

      {isOpenRegister && (
        <Overlay
          children={
            <Register
              isOpenRegister={isOpenRegister}
              onLoginClick={handleOpenLogin}
              onClose={() => setIsOpenRegister(false)}
            />
          }
        />
      )}

      {isOpenLogin && (
        <Overlay
          children={
            <Login
              isOpenLogin={isOpenLogin}
              onRegisterClick={handleOpenRegister}
              onClose={() => setIsOpenLogin(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          }
        />
      )}
    </div>
  );
}

export default Header;
