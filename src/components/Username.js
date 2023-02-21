import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { userNameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";

import styles from "../styles/Username.module.css";

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: userNameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
    },
  });

  return (
    <div className="font-poppins bg-[#dcdce6] bg-venkamala">
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen sm:h-auto">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h2 className="text-sm font-bold sm:text-base">D2D HealthCare</h2>
              <h4 className="text-3xl font-bold sm:text-4xl">hello amigo!</h4>
              <span className="py-2 text-base text-center text-gray-500 sm:text-lg">
                Explore More by connecting with us.
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center">
                <img src={avatar} alt="avatar" className={styles.profile} style={{ width: "60px", height: "60px" }} />
              </div>

              <div className="textbox flex flex-col items-center">
                <input
                  type="text"
                  className={styles.textbox}
                  placeholder="Username"
                  {...formik.getFieldProps("username")}
                />
                <div className="py-3 flex justify-center">
                  <button type="submit" className={styles.btn}>
                    Let's Go
                  </button>
                </div>
              </div>

              <div className="py-2 text-center">
                <span className="text-gray-400 text-base sm:text-lg">
                  Not a Member?{" "}
                  <Link to="/register" className="text-red-500">
                    Register Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
