import {useState, useEffect} from 'react';

import axios from '../api/axios';
import {useAuth} from "../hooks/useAuth";

const LOGIN_URL = '/login';

const Login = () => {

  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({
        email: email,
        password: pwd
      }), {
        headers: {'Content-Type': 'application/json'}
      });

      const result = response?.data?.result;
      login(result)
      setSuccessMsg(response?.data?.message)
      setEmail('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message);
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 404) {
        setErrMsg(err.response?.data?.message);
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  return (<>
    {success ? (<section>
      <h1>You are logged in!</h1>
      <br/>
      <p>{/* <a href="#">Go to Home</a> */}</p>
    </section>) : (// <section>

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
                  <div className="alert alert-danger">
                    {errMsg}
                  </div>
                ) : ''}

                {success ? (
                  <div className="alert alert-success">
                    {successMsg}
                  </div>
                ) : ''}
                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Ketik email anda"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">Password</label>

                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        placeholder="Ketik password anda"
                        aria-describedby="password"
                      />
                      <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="submit">Masuk</button>
                  </div>
                </form>

                <p className="text-center">
                  <span>Belum punya akun? </span>
                  <a href="/register">
                    <span>Buat akun baru</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>)}
  </>);
};

export default Login;