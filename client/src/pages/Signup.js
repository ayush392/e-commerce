import { useState } from "react";
import { useSignupMutation } from "../redux/apiSlices/usersApiSlice";
import { setCredentials } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Signup() {
  const [signup, { isLoading, isError, isSuccess }] = useSignupMutation();
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrMsg("Please fill all the fields");
      return;
    }
    try {
      const data = await signup({ name, email, password }).unwrap();
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
          <h1 className="mb-3 text-center ">Signup</h1>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label" htmlFor="">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                role="button"
                disabled={isLoading}
              >
                Signup
              </button>
            </div>
          </form>

          <div className=" text-center ">
            <p className="mb-0">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      {/* <h1>Signup</h1>
      <button onClick={handleSignup}>Signup</button>
      {isLoading && <div>Loading...</div>}
      {isError && <div>ERROR</div>}
      {isSuccess && console.log(isSuccess)} */}
    </>
  );
}

export default Signup;
