import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import image1 from "../assets/amazonbanner7.jpg";
import image2 from "../assets/amazonbanner1.jpg";
import image3 from "../assets/amazonbanner3.jpg";
import image4 from "../assets/amazonbanner4.jpg";




const PromotionalSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const promotionalItems = [
    {
      id: 1,
      title: "Summer Collection",
      description: "Exclusive summer wear starting from $29.99",
      imageUrl: image1,
      discount: "30% OFF",
      rating: 4.8,
      category: "New Arrival"
    },
    {
      id: 2,
      title: "Designer Watches",
      description: "Luxury timepieces for every occasion",
      imageUrl: image2,
      discount: "20% OFF",
      rating: 4.9,
      category: "Featured"
    },
    {
      id: 3,
      title: "Sport Essentials",
      description: "Premium sportswear for athletes",
      imageUrl: image3,
      discount: "25% OFF",
      rating: 4.7,
      category: "Trending"
    },
    {
      id: 4,
      title: "Autumn Styles",
      description: "Cozy and comfortable autumn collection",
      imageUrl: image4,
      discount: "15% OFF",
      rating: 4.6,
      category: "Season Special"
    },
    {
      id: 5,
      title: "Accessories Collection",
      description: "Complete your look with premium accessories",
      imageUrl: "/api/placeholder/600/400",
      discount: "40% OFF",
      rating: 4.9,
      category: "Hot Deal"
    },
    {
      id: 6,
      title: "Footwear Range",
      description: "Step into comfort and style",
      imageUrl: "/api/placeholder/600/400",
      discount: "35% OFF",
      rating: 4.8,
      category: "Limited Edition"
    }
  ];

  const totalSlides = Math.ceil(promotionalItems.length / 2);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < Math.floor(rating) ? 'text-warning' : 'text-muted'}`}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="promotional-slider position-relative py-5 bg-light">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="display-6 fw-bold mb-2">Featured Collections</h2>
            <p className="text-muted">Discover our exclusive promotions and deals</p>
          </div>
        </div>

        <div id="promotionalCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-item ${slideIndex === activeIndex ? 'active' : ''}`}
              >
                <div className="row g-4">
                  {promotionalItems.slice(slideIndex * 2, slideIndex * 2 + 2).map((item) => (
                    <div key={item.id} className="col-md-6">
                      <div className="card h-100 border-0 shadow-sm hover-scale">
                        <div className="position-relative overflow-hidden">
                          <img
                            src={item.imageUrl}
                            className="card-img-top"
                            alt={item.title}
                          />
                          <div className="position-absolute top-0 start-0 p-3">
                            <span className="badge bg-danger">{item.discount}</span>
                          </div>
                          <div className="position-absolute top-0 end-0 p-3">
                            <span className="badge bg-primary">{item.category}</span>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="card-title mb-0 fw-bold">{item.title}</h5>
                            <div className="d-flex align-items-center">
                              {renderStars(item.rating)}
                              <span className="ms-2 text-muted small">{item.rating}</span>
                            </div>
                          </div>
                          <p className="card-text text-muted">{item.description}</p>
                          <button className="btn btn-outline-dark w-100">Shop Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            onClick={prevSlide}
            style={{ width: '5%' }}
          >
            <span className="bg-dark rounded-circle p-3 d-flex align-items-center justify-content-center">
              <ChevronLeft size={24} className="text-white" />
            </span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={nextSlide}
            style={{ width: '5%' }}
          >
            <span className="bg-dark rounded-circle p-3 d-flex align-items-center justify-content-center">
              <ChevronRight size={24} className="text-white" />
            </span>
          </button>
        </div>

        {/* Custom Indicators */}
        <div className="d-flex justify-content-center mt-4 gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm rounded-circle p-2 ${
                index === activeIndex ? 'btn-dark' : 'btn-outline-dark'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          .hover-scale {
            transition: transform 0.3s ease;
          }
          .hover-scale:hover {
            transform: translateY(-5px);
          }
          .carousel-control-prev,
          .carousel-control-next {
            opacity: 0.9;
          }
          .carousel-item {
            transition: transform 0.6s ease-in-out;
          }
          .card {
            border-radius: 15px;
          }
          .card img {
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            object-fit: contain;
            height: 300px;
          }
        `}
      </style>
    </div>
  );
};

export default PromotionalSlider;