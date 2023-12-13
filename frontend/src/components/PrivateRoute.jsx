import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken"; 

const PrivateRoute = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await verifyToken(token);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          navigate("/login");
        }
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        children
      ) : (
        <h1>Not authenticated</h1>
      )}
    </div>
  );
};

export default PrivateRoute;