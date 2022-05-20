import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const APPOINTMENT_URL = "/appointment";



const AppointmentPage = () => {

  const { auth } = useAuth();
  const emailInputRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [description, setDescription] = useState();




  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        APPOINTMENT_URL,
        JSON.stringify({
          username: `${firstname} ${lastname}`,
          age,
          phone,
          email,
          date,
          time,
          description
        }),
        {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.accessToken}` },
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
      setDescription("");
      setTime("");
      setDate("");
      setPopup(true)

      //navigate(from, { replace: true });


    } catch (err) {
      console.log(err.response.data)
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Booking Taken");
      } else {
        setErrMsg("Booking Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div>
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
              <label className="required-field">Select an appointment date</label>
              <input name="f5"
                type="date"
                className="b"
                value={date}
                onChange={(e) => setDate(e.target.value)} />
              <label className="required-field">Time</label>
              <input name="f6"
                type="time" className="b"
                value={time}
                min="09:00"
                max="18:00"
                pattern="[0-9]{2}:[0-9]{2}"
                onChange={(e) => setTime(e.target.value)} />
              <label>Comments</label>
              <br />
              <textarea
                id="comment"
                cols="10"
                rows="10"
                placeholder="Extra description"
                className="b"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="s">
              <button type="submit" className="submit">
                Submit
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
    </div>
  );
};

export default AppointmentPage;
