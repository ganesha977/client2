import React from 'react';
import { useAuth } from '../../store/Auth';

const Users = () => {
  const { users } = useAuth();

  if (!users || users.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <p className="display-4 text-muted">No users found</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 text-center mb-5">Our Valued Customers</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {users.map((user, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-lg border-0 rounded-3 overflow-hidden">
              <div className="card-img-top bg-primary bg-gradient" style={{height: '120px'}}></div>
              <div className="card-body position-relative pt-0">
                <div className="position-absolute top-0 start-50 translate-middle">
                  <img
                    className="rounded-circle border border-4 border-white"
                    src={`https://server-1-a1zo.onrender.com/api/v1/auth/user/photo/${user._id}`|| "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"}
                    alt={user.name}
                    style={{width: '120px', height: '120px', objectFit: 'cover'}}
                    onError={(e) => {e.target.src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"}}
                  />
                </div>
                <h2 className="card-title text-center mt-5 mb-4">{user.name}</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="bi bi-envelope me-2"></i>{user.email}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-geo-alt me-2"></i>{user.address}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-telephone me-2"></i>{user.phone}
                  </li>
                </ul>
                <div className="text-center mt-4">
                  <button className="btn btn-primary rounded-pill px-4 py-2">
                    <i className="bi bi-bag me-2"></i>View Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;