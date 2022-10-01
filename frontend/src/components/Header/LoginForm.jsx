
import React, { useState } from "react"

function LoginForm(props) {
    let [authentication, setAuthentication] = useState("login")

    const changeAuthentication = () => {
       setAuthentication(authentication == "login" ? "register" : "login");
    }

    const changeUser = () => {

    }

    const changePassword = () => {

    }

    if (authentication == "login") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>

                        <div className="form-group mt-3">
                            <label>Username: </label>
                            <input
                                id = "user1"
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter username"
                                onChange={changeUser()}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password: </label>
                            <input
                                id = "pass1"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={changePassword()}
                            />
                        </div>
                        <div className="d-grid gap-1 mt-3">
                            <button type="submit" className="btn btn-success" onClick={props.loginUser}>
                                Submit
                            </button>
                        </div>

                        <div className="text-center"> Not registered yet?
                            <span className="link-primary" onClick={changeAuthentication}> Register </span>
                        </div>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <form>
                    <div>
                        <h3>Register</h3>

                        <div className="form-group mt-3">
                            <label>Username:</label>
                            <input
                                id="user2"
                                type="email"
                                className="form-control mt-1"
                                placeholder="Username"
                                onChange={changeUser()}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                id="pass2"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                onChange = {changePassword()}
                            />
                        </div>
                        <div className="d-grid gap-1 mt-3">
                            <button type="submit" className="btn btn-success" onClick={props.registerUser}>
                                Submit
                            </button>
                        </div>

                        <div className="text-center">
                            Already registered?{" "}
                            <span className="link-primary" onClick={changeAuthentication}>
                                  Sign-in
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default LoginForm