import { useState, useEffect, useRef, useCallback } from "react";
import { Search, MapPin, Star } from "lucide-react";

function FindHospital() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const observer = useRef();
  const lastHospitalElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const newHospitals = Array(10).fill().map((_, index) => ({
        id: hospitals.length + index + 1,
        name: `Pet Hospital ${hospitals.length + index + 1}`,
        location: "District 1, HCMC",
        rating: 4.5,
        reviews: 120,
        distance: "0.5 km",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3",
        specialties: ["Surgery", "Vaccination", "Emergency"]
      }));
      
      setHospitals(prev => [...prev, ...newHospitals]);
      setHasMore(newHospitals.length > 0);
      setLoading(false);
    }, 1000);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filter Section - Full Width */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#98E9E9] focus:border-[#98E9E9] transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#98E9E9] focus:border-[#98E9E9] transition-colors"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
              <option value="district3">District 3</option>
            </select>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#98E9E9] focus:border-[#98E9E9] transition-colors"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">All Services</option>
              <option value="surgery">Surgery</option>
              <option value="vaccination">Vaccination</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex h-[calc(100vh-130px)]">
        {/* Hospital List - Scrollable */}
        <div className="w-1/2 overflow-y-auto p-4">
          <div className="space-y-4">
            {hospitals.map((hospital, index) => (
              <div
                ref={index === hospitals.length - 1 ? lastHospitalElementRef : null}
                key={hospital.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{hospital.name}</h3>
                      <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{hospital.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{hospital.location}</span>
                      <span className="text-sm text-blue-500 ml-2">({hospital.distance})</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hospital.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <button className="bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-[#7CD5D5] transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-4 border-[#98E9E9] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            )}
          </div>
        </div>

        {/* Map - Fixed */}
        <div className="w-1/2 bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.977147902919!2d106.69842159999999!3d10.787312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1710900646899!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default FindHospital;
