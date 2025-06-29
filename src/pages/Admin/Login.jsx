import React, { useState } from "react";
import LoginComponent from "../../components/Admin/LoginComponent";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = (user) => {
    setIsLogged(true);
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");
  };

  return (
    <div>
      <LoginComponent onLogin={handleLogin} />
    </div>
  );
}

export default Login;