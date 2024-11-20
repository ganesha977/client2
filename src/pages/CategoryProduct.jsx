import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import Pagination from "@mui/material/Pagination";
import { Loader2, Star, ShoppingCart } from "lucide-react";
import './CategoryProduct.css';

const CategoryProduct = () => {
  const params = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug, page]);

  const getProductsByCat = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://server-1-a1zo.onrender.com/api/v1/product/product-category/${params.slug}?page=${page}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setCategory(data?.category);
      setProducts(data?.products);
      setTotalPages(data?.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cat-prod-container">
        <div className="cat-prod-header">
          <h1 className="cat-prod-title">{category?.name}</h1>
          <p className="cat-prod-results">Found {products?.length} products</p>
        </div>

        {loading && (
          <div className="cat-prod-loading">
            <Loader2 className="cat-prod-spinner" />
            <p>Loading amazing products...</p>
          </div>
        )}
        
        {error && <p className="cat-prod-error">{error}</p>}
        
        {products.length > 0 ? (
          <>
            <div className="cat-prod-grid">
              {products.map((p) => (
                <Link key={p._id} to={`/product/${p.slug}`} className="cat-prod-link">
                  <ProductCard
                    title={p.name}
                    originalPrice={p.price}
                    discountedPrice={p.discountedPrice}
                    discount={p.discount}
                    rating={p.rating}
                    images={p.images}
                    inStock={p.quantity > 0}
                  />
                </Link>
              ))}
            </div>
            <div className="cat-prod-pagination">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </div>
          </>
        ) : (
          !loading && <p className="cat-prod-no-results">No products found in this category.</p>
        )}
      </div>
    </Layout>
  );
};

const ProductCard = ({ title, originalPrice, discountedPrice, discount, rating, images, inStock }) => {
  return (
    <div className="cat-prod-card">
      <div className="cat-prod-image-wrapper">
        {images && images.length > 0 ? (
          <img src={images[0].url} alt={title} className="cat-prod-image" />
        ) : (
          <div className="cat-prod-no-image">No Image Available</div>
        )}
        {discount > 0 && (
          <span className="cat-prod-discount">{discount}% OFF</span>
        )}
      </div>
      <div className="cat-prod-info">
        <h3 className="cat-prod-card-title">{title}</h3>
        <div className="cat-prod-price">
          <span className="cat-prod-discounted">₹{discountedPrice}</span>
          {originalPrice && (
            <span className="cat-prod-original">₹{originalPrice}</span>
          )}
        </div>
        <div className="cat-prod-details">
          <p className={`cat-prod-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </p>
          <div className="cat-prod-rating">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`cat-prod-star ${i < Math.floor(rating) ? 'filled' : ''}`}
                size={16}
              />
            ))}
          </div>
        </div>
        <button className="cat-prod-add-to-cart">
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CategoryProduct;