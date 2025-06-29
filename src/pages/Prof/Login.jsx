import React, { useState } from "react";
import LoginComponent from "../../components/Prof/LoginComponent";
import { useNavigate } from "react-router-dom";
import { etudiant } from "../../services/data";

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