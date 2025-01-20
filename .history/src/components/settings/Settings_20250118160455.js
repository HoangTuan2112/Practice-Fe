import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useCache from "../../hooks/useCache";

function Settings({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const { getCache, setCache } = useCache();

  // Lấy ngôn ngữ và theme từ cache
  const cachedLanguage = getCache("language") || "en";
  const cachedTheme = getCache("theme") || "light";

  useEffect(() => {
    // Đồng bộ ngôn ngữ từ cache khi component mount
    i18n.changeLanguage(cachedLanguage);
  }, []);

  const handleSave = () => {
    // Lưu settings vào cache
    setCache("language", i18n.language);
    setCache("theme", cachedTheme);
    onClose();
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[110]">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                {t("settings.title")}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t("settings.language")}
                  </label>
                  <select
                    value={i18n.language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200"
                  >
                    <option value="en">{t("settings.languages.en")}</option>
                    <option value="vi">{t("settings.languages.vi")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t("settings.theme")}
                  </label>
                  <select
                    value={cachedTheme}
                    onChange={(e) => setCache("theme", e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200"
                  >
                    <option value="light">{t("settings.themes.light")}</option>
                    <option value="dark">{t("settings.themes.dark")}</option>
                    <option value="system">{t("settings.themes.system")}</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {t("settings.buttons.close")}
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
                >
                  {t("settings.buttons.save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings; 