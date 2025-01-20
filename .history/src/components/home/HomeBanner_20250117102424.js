import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HomeBanner() {
  const { t } = useTranslation();

  const bannerSlides = [
    {
      image: "https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143920.jpg",
      title: t("home.hero.title"),
      description: t("home.hero.subtitle"),
      button: {
        text: t("home.hero.findButton"),
        link: "/find-hospital",
      },
    },
    {
      image: "https://img.freepik.com/free-photo/front-view-veterinarian-taking-care-pet_23-2149143894.jpg",
      title: t("home.features.expertVets"),
      description: t("home.hero.subtitle"),
      button: {
        text: t("home.hero.joinButton"),
        link: "/community",
      },
    },
    {
      image: "https://img.freepik.com/free-photo/young-female-veterinarian-holding-cat-vet-clinic_23-2147844243.jpg",
      title: t("home.features.modernFacilities"),
      description: t("home.hero.subtitle"),
      button: {
        text: t("home.hero.listButton"),
        link: "/add-hospital",
      },
    },
  ];

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[500px]"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-center mb-8">
                  {slide.description}
                </p>
                <Link
                  to={slide.button.link}
                  className="px-8 py-3 bg-[#98E9E9] text-gray-900 rounded-full font-medium hover:bg-[#7CD5D5] transition-colors shadow-lg"
                >
                  {slide.button.text}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeBanner;
