import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Form.css";
import { useNavigate, useLocation, Link } from "react-router-dom";


const REGISTER_URL = "/register";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const emailInputRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/auth";

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(true)

    const v1 = PWD_REGEX.test(pwd);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          user: `${firstname} ${lastname}`,
          age,
          phone,
          email,
          pwd,
          doctor
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //clear state and controlled inputs
      setFirstName("");
      setLastName("");
      setAge("");
      setPhone("");
      setEmail("");
      setPwd("");
      setDoctor("");
      setMatchPwd("");
      //

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="body">
      <div className="whole" id="blur">
        <h2>Patient Information</h2>
        <form name="Form" onSubmit={handleSubmit}>
          <label className="required-field">Full Name</label>
          <div className="fn">
            <div>
              <input
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="b"
                placeholder="Enter your First Name"
              />
            </div>
            <div>
              <input
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter your Last Name..."
              />
            </div>
          </div>
          <div className="fn">
            <label className="required-field">Age</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              min="1"
              max="123"
              className="b"
            />
            <label className="required-field">Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              name="phone"
              placeholder="123-456-7890"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              className="b"
            />
            <label className="required-field">Family Doctor Name</label>
            <input
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              type="text"
              className="b"
              placeholder="Enter doctor name"
            />
            <label className="required-field" htmlFor="email">
              Your Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              required
              ref={emailInputRef}
            />
            <label className="required-field" htmlFor="password">
              Your Password
            </label>
            <input
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter Your Password"
              required
            />
            <label className="required-field" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              placeholder="Enter Your Password"
            />
          </div>
          <div className="s">
            <button type="submit" className="submit">
              Submit
            </button>
            <div className="s">
              <button type="button" className="bot-button">
                <Link to="/auth">
                  Login with existing account
                </Link>
              </button>
            </div>
          </div>
        </form>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        {popup == false ? (
          <div></div>
        ) : (
          <div class="popup-message" id="popup">
            <p>You have successfully booked an appointment!</p>
            <p>Your reminder is being sent to your email</p>
            <p>Please click OK to return to Homepage</p>
            <div class="s">
              <button type="button" class="ok-btn" onClick={handleClick}>OK</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );


};

export default Register;
