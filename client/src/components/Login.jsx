import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { Toaster, toast } from "react-hot-toast";
import { Formik, useFormik } from "formik";
import avatar from "../assets/avatar.jpg";
import { usernameValidate } from "../helper/validate";
// import { useAuthStore } from "../store/store";
import useFetch from "../hooks/fetchhooks";
import {login_verifyPassword} from '../helper/helper'

export default function Username() {
  // const setUsername = useAuthStore((state) => state.setUsername);
  const navigateTo = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      // setUsername(values.username);
      // console.log(username);
      // navigateTo("/password");
      // const [{isLoading,apiData,serverError}]=useFetch(`/user/${values.username}`)
    let loginPromise=login_verifyPassword({username:values.username,password:values.password})
      toast.promise(loginPromise,{
        loading:"Checking...!",
        success:<b>Login Successfully..!</b>,
        error:<b>Invalid credentials</b>
      })
      loginPromise.then(res=>{
        let {token} = res.data
        localStorage.setItem('token',token)
        navigateTo('/chat')
      })
    },
  });



  // const {username}=useAuthStore(state=>state.auth)
  // console.log(username);
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center h-screen items-center">
        {/*   justify-center h-[70%] */}
        <div className={styles.glass}>
        <div className="title flex flex-col items-center ">
            <h4 className="text-4xl font-bold mb-6">Login!</h4>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
            <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              ></input>
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              ></input>
              <button type="submit" className={styles.btn}>
                Sign in
              </button>
            </div>
          </form>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member?{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
        </div>
      </div>
    </div>
  );
}
