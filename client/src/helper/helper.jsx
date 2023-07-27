import axios from "axios";

import jwt_decode from "jwt-decode";
// import { Promise } from 'node-fetch';
axios.defaults.baseURL = "http://localhost:8080";
// make api request

// get username from token
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Can't find Token");
  let decode = jwt_decode(token);
  // console.log(decode);
  return decode;
}
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "User doesn't exist..!" };
  }
}
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`, { username });
    return { data };
  } catch (error) {
    return { error: "Password doesn't match..!" };
  }
}
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);
    let { username, email } = credentials;
    // send email
    // console.log("hello");
    // if (status === 201) {
    //   await axios.post(`/api/registerMail`, {
    //     username,
    //     userEmail: email,
    //     text: msg,
    //   });
    // }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}
export async function login_verifyPassword({ username, password }) {
  try {
    if (username && password) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
    else {
      return Promise.reject({ error: "All fields are required!" });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't match.!" });
  }
}
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile.!" });
  }
}
// export async function generateOTP(username) {
//   try {
//     const {
//       data: { code },
//       status,
//     } = await axios.get(`api/generateOTP`, { params: { username } });
//     // send mail with OTP
//     if (status === 201) {
//       let {
//         data: { email },
//       } = await getUser({ username });
//       let test = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
//       await axios.post("/api/registerMail", {
//         username,
//         userEmail: email,
//         text: test,
//         subject: "Password Recovery OTP",
//       });
//     }
//     return Promise.resolve(code);
//   } catch (error) {
//     return Promise.reject({ error });
//   }
// }
// export async function verifyOTP(username, code) {
//   try {
//     let url = `/api/verifyOTP?username=${username.username}&code=${username.code}`;
//     let { data, status } = await axios.get(url);
//     return { data, status };
//   } catch (error) {
//     return Promise.reject({ error });
//   }
// }
// export async function resetPassword({ username, password }){
//     try {
//         const { data, status } = await axios.put('/api/resetPassword', { username, password });
//         return Promise.resolve({ data, status})
//     } catch (error) {
//         return Promise.reject({ error })
//     }
// }


export async function addMessage({from,to,message }) {
  try {
      const { data } = await axios.post("/api/addMessage", {from,to,message });
      return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Cann't save message.!" });
  }
}
