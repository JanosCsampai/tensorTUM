import React, {useState} from "react";
import axiosInstance from '../../../api/axios';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import './register.scss'
import { useForm } from "react-hook-form";



const schema = yup.object({
  email: yup.string().required().email(),
  user_name: yup.string().required().max(125),
  password: yup.string().required().max(125),
})



function Register() {
  const { register, handleSubmit, formState: {errors}, getValues, setValue } = useForm<any>({
    resolver: yupResolver(schema), 
  });
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    user_name: "",
    password: "",
  })

  const onSubmit = (data: any, e:any) => {
    console.log("data",data, e);
    e.preventDefault();
    axiosInstance
      .post("user/create/", {
        email: data["email"],
        user_name: data["user_name"],
        password: data["password"] 
      })
      .then((res) => {
        history("/login");
        console.log(res);
        console.log(res.data);
      })
  }

  const onError = (errors: any, e: any) => console.log("errors yay",errors, e);


  return (
    <div className="b96-order-detail">
      <h1 className="b96-order-title">Register</h1>
      <div className="card b96-order-content">
        <div className="card-body">
          <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="form-group my-3">
              <label htmlFor="email"><small className="text-secondary m-0 p-0">Email</small></label>
              <input
                className="form-control" placeholder={"Email"}
                {...register("email")}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="username"><small className="text-secondary m-0 p-0">Username</small></label>
              <input
                className="form-control" placeholder={"Username"}
                {...register("user_name")}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password"><small className="text-secondary m-0 p-0">Password</small></label>
              <input
                type="password"
                className="form-control" placeholder={"Password"}
                {...register("password")}
              />
            </div>
            <button  className="btn btn-secondary " type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;