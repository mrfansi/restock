import {useState, useEffect} from 'react';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
const REGISTER_URL = '/register';

const Register = () => {

  const [first, setFirst] = useState('');
  const [validFirst, setValidFirst] = useState(false);
  const [firstFocus, setFirstFocus] = useState(false);

  const [last, setLast] = useState('');
  const [validLast, setValidLast] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);


  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('')
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    setValidFirst(USER_REGEX.test(first));
  }, [first]);

  useEffect(() => {
    setValidLast(USER_REGEX.test(last));
  }, [last]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg('');
  }, [first, last, email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstname: first,
          lastname: last,
          email: email,
          password: pwd
        }),
        {
          headers: {'Content-Type': 'application/json'},
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      setSuccessMsg(response?.data.message)
      //clear state and controlled inputs
      setFirst('');
      setLast('');
      setEmail('');
      setPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
    }
  };

  return (
    <>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <a href="/" className="app-brand-link gap-2">

                    <span className="app-brand-text demo text-body fw-bolder">Restock</span>
                  </a>
                </div>
                {errMsg ? (
                  <div className="alert alert-danger alert-dismissible">
                    {errMsg}
                  </div>
                ) : ''}

                {success ? (
                  <div className="alert alert-success alert-dismissible">
                    {successMsg}
                  </div>
                ) : ''}
                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                      firstname

                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="firstname"
                      onChange={(e) => setFirst(e.target.value)}
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      value={first}
                      placeholder="Ketik nama depan anda"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">lastname</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastname"
                      onChange={(e) => setLast(e.target.value)}
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      value={last}
                      placeholder="Ketik nama belakang anda"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email" name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email}
                      placeholder="Ketik email anda"/>
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        value={pwd}
                        placeholder="Ketik password anda"
                        aria-describedby="password"
                      />
                      <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    </div>
                  </div>


                  <button className="btn btn-primary d-grid w-100">Daftar</button>
                </form>

                <p className="text-center">
                  <span>Sudah punya akun? </span>
                  <a href="/login">
                    <span>Login</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;