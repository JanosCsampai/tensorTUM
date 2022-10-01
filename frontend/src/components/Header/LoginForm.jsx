
import React, { useState } from "react"

export default function (props) {
    let [authentication, setAuthentication] = useState("login")

    const changeAuthentication = () => {
       setAuthentication(authentication == "login" ? "register" : "login");
    }

    if (authentication == "login") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>

                        <div className="form-group mt-3">
                            <label>Email address: </label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password: </label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid gap-1 mt-3">
                            <button type="submit" className="btn btn-success">
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
                            <label>Full Name</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
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
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                            />
                        </div>
                        <div className="d-grid gap-1 mt-3">
                            <button type="submit" className="btn btn-success">
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