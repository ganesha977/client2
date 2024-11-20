import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-light py-5">
      {/* Newsletter Section */}
      <div className="border-bottom pb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3 className="h2 fw-bold">Join our newsletter</h3>
              <p className="text-muted">Get the latest updates and exclusive offers</p>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <button className="btn btn-dark d-flex align-items-center">
                  Join <ArrowRight className="ms-2" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="fw-bold mb-4">BRAND NAME</h4>
            <p className="text-muted mb-4">
              Creating amazing shopping experiences since 2024. Your trusted destination for quality products.
            </p>
            <div className="d-flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="btn btn-dark rounded-circle p-2">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="fw-bold mb-4">Quick Links</h4>
            <ul className="list-unstyled">
              {['About Us', 'Shop', 'Categories', 'Blog', 'Contact'].map((item) => (
                <li key={item} className="mb-2">
                  <a href="#" className="text-decoration-none text-muted d-flex align-items-center">
                    <ArrowRight size={18} className="me-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="fw-bold mb-4">Contact Us</h4>
            <ul className="list-unstyled">
              {[
                { Icon: MapPin, text: '123 Shopping Street, NY 10001' },
                { Icon: Phone, text: '+1 234 567 8900' },
                { Icon: Mail, text: 'support@brand.com' }
              ].map((item, index) => (
                <li key={index} className="mb-3 d-flex align-items-center">
                  <span className="btn btn-dark rounded-circle p-2 me-3">
                    <item.Icon size={20} />
                  </span>
                  <span className="text-muted">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="col-lg-3 col-md-6">
            <h4 className="fw-bold mb-4">Why Choose Us</h4>
            <ul className="list-unstyled">
              {[
                { Icon: Truck, text: 'Free Shipping Worldwide' },
                { Icon: CreditCard, text: 'Secure Payments' },
                { Icon: ShieldCheck, text: 'Money Back Guarantee' }
              ].map((item, index) => (
                <li key={index} className="mb-3 d-flex align-items-center">
                  <span className="btn btn-dark rounded-circle p-2 me-3">
                    <item.Icon size={20} />
                  </span>
                  <span className="text-muted">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-light border-top py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="text-muted mb-0">
                © 2024 BRAND NAME. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-center justify-content-md-end gap-4">
                {['Privacy Policy', 'Terms of Service', 'FAQ'].map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className="text-decoration-none text-muted"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;