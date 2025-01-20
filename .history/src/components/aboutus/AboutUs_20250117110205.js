import React from "react";
import { useTranslation } from "react-i18next";
import { Search, Calendar, Star } from "lucide-react";

function AboutUs() {
  const { t } = useTranslation();

  const features = [
    { icon: Search, key: 0 },
    { icon: Calendar, key: 1 },
    { icon: Star, key: 2 },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1A3C8E] to-[#98E9E9]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("aboutUs.hero.title")}
            </h1>
            <p className="text-xl opacity-90">{t("aboutUs.hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A3C8E] mb-6">
                {t("aboutUs.intro.title")}
              </h2>
              <p className="text-gray-600 text-lg">
                {t("aboutUs.intro.content")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A3C8E] mb-6">
              {t("aboutUs.mission.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("aboutUs.mission.content")}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1A3C8E] mb-12">
            {t("aboutUs.features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t("aboutUs.features.list", { returnObjects: true }).map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {React.createElement(features[index].icon, {
                  className: "w-12 h-12 text-[#1A3C8E] mx-auto mb-4",
                })}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
