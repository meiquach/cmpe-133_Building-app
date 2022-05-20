import { useRef, useState, useEffect } from "react";
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../api/axios";

const LOGIN_URL = "/auth";


const Login = () => {

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({ email, pwd, accessToken });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  }



  return (
    <div className="body">
      <div className="whole" id="blur">
        <h2>Sign In</h2>
        <form name="Form" onSubmit={handleSubmit}>
          <label className="required-field" htmlFor="email">
            Your Email
          </label>
          <input
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={({ target }) => setEmail(target.value)}
            ref={emailRef}
            required
          />
          <label className="required-field" htmlFor="password">
            Your Password
          </label>
          <input
            value={pwd}
            type="password"
            id="password"
            placeholder="Enter Your Password"
            required
            onChange={({ target }) => setPwd(target.value)}
          />
          <div className="s">
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
          <div className="s">
            <button type="button" className="bot-button">
              <Link to="/register">Create new account</Link>
            </button>
          </div>
        </form>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </div>
    </div>
  );
};

export default Login;
