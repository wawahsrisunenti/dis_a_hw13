import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await loginUser(email, password);

      localStorage.setItem("token", res.token);

      navigate("/");
    } catch (e) {
      window.alert(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: "column"
        }}
      >
        <label style={{ marginTop: 8, marginBottom: 8 }}>
          Email:
          <input required type="email" name="email" />
        </label>
        <label required style={{ marginTop: 8, marginBottom: 8 }}>
          Password:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}