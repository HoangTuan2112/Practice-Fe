import React, { useState, useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MOCK_HOSPITAL = {
  id: 1,
  name: "Pet Care Hospital & Wellness Center",
  specialization: "Full Service Veterinary Hospital",
  phone: "+84 123 456 789",
  address: "123 Nguyen Van Linh, District 7, Ho Chi Minh City",
  latitude: 10.7278,
  longitude: 106.7173,
  rating: 4.9,
  workingHours: [
    { days: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
    { days: "Saturday - Sunday", time: "9:00 AM - 6:00 PM" }
  ],
  services: [
    "General Checkup",
    "Vaccination",
    "Surgery",
    "Pet Grooming",
    "Emergency Care",
    "Dental Care",
    "Laboratory Services",
    "Pet Boarding"
  ]
};

const MOCK_REVIEWS = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "A"
    },
    rating: 5,
    verified: true,
    content: "Exceptional care for my dog! The staff was incredibly professional and caring. The facilities are modern and clean. I particularly appreciated how they took time to explain everything in detail.",
    createdAt: "2024-03-15T10:00:00Z"
  },
  {
    id: 2,
    user: {
      name: "Maria Garcia",
      avatar: "M"
    },
    rating: 5,
    verified: true,
    content: "Best veterinary experience ever! Dr. Garcia was amazing with my anxious cat. The entire team made us feel comfortable and well-cared for. Highly recommend their services!",
    createdAt: "2024-03-12T15:30:00Z"
  },
  {
    id: 3,
    user: {
      name: "James Wilson",
      avatar: "J"
    },
    rating: 4,
    verified: true,
    content: "Outstanding service from start to finish. The online booking was easy, wait times were minimal, and the treatment was excellent. My pet's health improved significantly after the visit.",
    createdAt: "2024-03-10T09:15:00Z"
  }
];

const HospitalDetail = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(MOCK_HOSPITAL);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle view all reviews
  const handleViewAllReviews = () => {
    // Mock loading more reviews
    const moreReviews = [
      {
        id: 4,
        user: {
          name: "Emily Chen",
          avatar: "E"
        },
        rating: 5,
        verified: true,
        content: "I've been bringing my pets here for years. The level of care and attention is consistently excellent. The staff remembers my pets and their specific needs.",
        createdAt: "2024-03-08T14:20:00Z"
      },
      {
        id: 5,
        user: {
          name: "David Brown",
          avatar: "D"
        },
        rating: 5,
        verified: true,
        content: "Very impressed with the emergency services. When my dog needed urgent care late at night, they were quick to respond and provided excellent treatment.",
        createdAt: "2024-03-05T22:45:00Z"
      }
    ];
    
    setReviews([...reviews, ...moreReviews]);
  };

  // Handle call button click
  const handleCall = () => {
    if (hospital?.phone) {
      window.location.href = `tel:${hospital.phone}`;
    }
  };

  // Handle get directions
  const handleGetDirections = () => {
    if (hospital?.latitude && hospital?.longitude) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`,
        '_blank'
      );
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  if (!hospital) return <div className="min-h-screen flex items-center justify-center">Hospital not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Feature Section - Call Now & Get Directions */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{hospital.name}</h1>
              <p className="text-gray-600 mt-1">{hospital.specialization}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleCall}
                className="bg-[#4611a7] text-white px-6 py-2 rounded-lg hover:bg-[#3a0d8c] transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </button>
              <button 
                onClick={handleGetDirections}
                className="bg-[#98E9E9] text-gray-700 px-6 py-2 rounded-lg hover:bg-[#7CD5D5] transition-colors flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-4 h-[400px]">
              {/* Integrate Google Maps */}
              {hospital.latitude && hospital.longitude && (
                <iframe 
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&q=${hospital.latitude},${hospital.longitude}`}
                  width="100%" 
                  height="100%" 
                  style={{border: 0}}
                  allowFullScreen="" 
                  loading="lazy"
                  className="rounded-lg"
                />
              )}
            </div>

            {/* Hospital Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Hospital Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">{hospital.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">{hospital.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Working Hours</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                      {hospital.workingHours?.map((hours, index) => (
                        <div key={index}>
                          <p>{hours.days}</p>
                          <p>{hours.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                <div className="grid grid-cols-2 gap-4">
                  {hospital.services?.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.floor(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{hospital.rating} out of 5</span>
              </div>
            </div>

            <div className="grid gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium shadow-md">
                      {review.user.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {review.user.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {review.verified ? 'Verified Customer' : 'Customer'}
                      </p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.content}</p>
                  <p className="text-gray-500 text-sm mt-4">
                    Posted on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button 
                onClick={handleViewAllReviews}
                className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HospitalDetail; 