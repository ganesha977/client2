import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { PencilSquare, TrashFill, CurrencyDollar } from "react-bootstrap-icons";
import useCategory from "../../hooks/useCategory";

const UpdateProduct = () => {
  const params = useParams();
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const { categories, error: categoryError } = useCategory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");
  const [existingImages, setExistingImages] = useState([]);

  // Get single product details
  const getSingleProduct = async () => {
    try {
      const response = await fetch(`https://server-1-a1zo.onrender.com/api/v1/product/get-product/${params.slug}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setDiscountedPrice(data.product.discountedPrice);
      setDiscount(data.product.discount);
      setRating(data.product.rating);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping ? "Yes" : "No");
      setCategory(data.product.category._id);
      setExistingImages(data.product.images || []);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error("Failed to load product details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("discountedPrice", discountedPrice);
      productData.append("discount", discount);
      productData.append("rating", rating);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping === "Yes" ? "true" : "false");

      const response = await fetch(`https://server-1-a1zo.onrender.com/api/v1/product/update-product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: productData,
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data.success) {
        toast.success("Product Updated Successfully");
        navigate("/admin/product");
      } else {
        toast.error(data?.message || "Failed to update product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const response = await fetch(`https://server-1-a1zo.onrender.com/api/v1/product/delete-product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data.success) {
        toast.success("Product deleted Successfully");
        navigate("/admin/product");
      } else {
        toast.error(data?.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (price && discount) {
      const calculatedDiscountedPrice = price - (price * discount) / 100;
      setDiscountedPrice(calculatedDiscountedPrice.toFixed(2));
    }
  }, [price, discount]);

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Body>
          <h1 className="text-center mb-4">
            <PencilSquare className="me-2" />
            Update Product
          </h1>
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    rows={3}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <CurrencyDollar /> Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Discount %</Form.Label>
                      <Form.Control
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Enter discount percentage"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <div className="d-flex flex-column align-items-center">
                    {existingImages.map((img, index) => (
                      <Image
                        key={index}
                        src={img.url}
                        alt={`product_image_${index}`}
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        thumbnail
                        className="mb-2"
                      />
                    ))}
                    <Form.Control
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      className="mt-2"
                    />
                  </div>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Discounted Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={discountedPrice}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Enter rating"
                        max={5}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Shipping</Form.Label>
                  <Form.Select
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                    required
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Update Product
              </Button>
              <Button
                variant="danger"
                className="ms-2"
                onClick={handleDelete}
              >
                <TrashFill /> Delete Product
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateProduct;
