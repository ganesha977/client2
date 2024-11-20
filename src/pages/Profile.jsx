import React from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../store/Auth";

const Profile = () => {
  const { user } = useAuth(); // Access the user data from AuthContext

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="form-container">
              <h4 className="title">USER PROFILE</h4>
              <div className="mb-3">
                <label>Name:</label>
                <input
                  type="text"
                  value={user.name || ""}
                  className="form-control"
                  placeholder="Enter Your Name"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label>Email:</label>
                <input
                  type="email"
                  value={user.email || ""}
                  className="form-control"
                  placeholder="Enter Your Email"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label>Phone:</label>
                <input
                  type="text"
                  value={user.phone || ""}
                  className="form-control"
                  placeholder="Enter Your Phone"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label>Address:</label>
                <input
                  type="text"
                  value={user.address || ""}
                  className="form-control"
                  placeholder="Enter Your Address"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
