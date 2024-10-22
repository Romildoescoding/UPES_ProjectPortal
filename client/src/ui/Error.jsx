import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return createPortal(
    <div style={styles.outerContainer}>
      <div style={styles.innerContainer}>
        <h1 style={styles.heading}>Access Denied</h1>
        <p style={styles.message}>You do not have access to this page.</p>
        <div>
          <button
            style={styles.button}
            onClick={() => navigate(-1, { replace: true })}
          >
            &larr; Go Back
          </button>
          <button
            style={{ ...styles.button, marginLeft: "1rem" }}
            onClick={() => navigate("/signin", { replace: true })}
          >
            Go to Sign In &rarr;
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

const styles = {
  outerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    // backgroundColor: "red",
    background: 'url("../../images/gradient.png")',
    backgroundSize: "cover",
  },
  innerContainer: {
    padding: "10rem 2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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

export default Error;
