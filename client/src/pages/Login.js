import { useState } from "react";
import { useLoginMutation } from "../redux/apiSlices/usersApiSlice";
import { setCredentials } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Login() {
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const data = await login({ email, password }).unwrap();
      console.log(data);
      dispatch(setCredentials(data));
    } catch (error) {
      if (error.status === 500) {
        setErrMsg("Something went wrong. Please try again later");
      } else {
        setErrMsg(error.data);
      }
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="bg-danger-subtle d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="p-5 shadow bg-light " style={{ width: "28.125rem" }}>
          <h1 className="mb-3 text-center ">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label" htmlFor="">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="">
                Password
              </label>
              <input
                className="form-control"
                type={viewPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 text-danger ">
              {isError && <div>{errMsg}</div>}
            </div>
            <div className="mb-3">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
          </form>

          <div className=" text-center ">
            <p className="mb-0">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
