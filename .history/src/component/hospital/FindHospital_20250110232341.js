import React, { useState } from 'react';
import { MapPin, Search, Sliders, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_HOSPITALS = [
  {
    id: 1,
    name: "PetCare Hospital",
    address: "123 Nguyen Van Linh, District 7, HCMC",
    distance: "0.5 km",
    rating: 4.8,
    services: ["Emergency", "Surgery", "Vaccination"],
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
  },
  {
    id: 2,
    name: "VetCare Clinic",
    address: "456 Le Van Viet, District 9, HCMC",
    distance: "1.2 km",
    rating: 4.5,
    services: ["Dental Care", "Grooming", "Vaccination"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
  },
  {
    id: 3,
    name: "Pet Health Center",
    address: "789 Nguyen Thi Minh Khai, District 1, HCMC",
    distance: "2.0 km",
    rating: 4.9,
    services: ["Surgery", "Laboratory", "Emergency"],
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def"
  }
];

const FindHospital = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleGetDirections = (hospitalId) => {
    navigate(`/hospital/${hospitalId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Find a Hospital Near Me
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Locate the nearest veterinary hospitals in your area. Use the map or browse the list below to find the perfect care for your pets.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by hospital name or location..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option value="">Distance</option>
              <option value="1">Within 1 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option value="">Specialty</option>
              <option value="emergency">Emergency Care</option>
              <option value="surgery">Surgery</option>
              <option value="dental">Dental Care</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option value="">Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237116!2d106.66488007465357!3d10.75992005944615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Hospital List */}
          <div className="space-y-4">
            {MOCK_HOSPITALS.map((hospital) => (
              <div key={hospital.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-28 h-28 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg">
                          <Star className="w-4 h-4 fill-current" />
                          {hospital.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{hospital.address}</span>
                      </div>
                      <span className="inline-block px-2 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg">
                        {hospital.distance}
                      </span>
                      <div className="flex gap-2 mt-3">
                        {hospital.services.map((service, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <button 
                    className="w-full py-2 bg-[#98E9E9] hover:bg-[#7CD5D5] text-gray-700 rounded-lg transition-colors"
                    onClick={() => handleGetDirections(hospital.id)}
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHospital; 