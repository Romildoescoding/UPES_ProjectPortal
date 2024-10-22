import React from "react";
import { useNavigate } from "react-router-dom";

function DoesNotExist() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/signin");
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.innerContainer}>
        <h1 style={styles.heading}>404 - Page Not Found</h1>
        <p style={styles.message}>
          Oops! The page you{"'"}re looking for does not exist.
        </p>
        <button style={styles.button} onClick={handleGoBack}>
          Go back to Sign In
        </button>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "transparent",
  },
  innerContainer: {
    padding: "10rem 2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    // maxWidth: "400px",
    width: "90%",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.25rem",
    color: "#777",
    marginBottom: "1.5rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "blueviolet",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default DoesNotExist;
