import axios from "axios"
import jwt_decode from "jwt-decode"
/** Make API Requests */
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function getUsername(){
    const token = localStorage.getItem("token");
    if(!token) return Promise.reject("Cannot find Token!");
    let decode = jwt_decode(token);
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post("https://mern-health-app-backend.onrender.com/api/authenticate", {username});
    } catch (error) {
        return {error: "Username dooesn't existj"}
    }
}

/** getuser function */
export async function getUser({username}){
    try {
        const {data} =  await axios.get(`https://mern-health-app-backend.onrender.com/api/user/${username}`);
        return {data};
    } catch (error) {
        return {error:"Password doesn't Match..!"}
    }
}

/** register function */
export async function registerUser(credentials){
    console.log(credentials)
    try {
        const {data:{msg}, status} = await axios.post(`https://mern-health-app-backend.onrender.com/api/register`, credentials);
        let {username, email} = credentials;
         
        

        /** send mail */
        if(status===201){
            await axios.post("https://mern-health-app-backend.onrender.com/api/registerMail", {username, userEmail: email, text:msg);
        }
        return Promise.resolve(msg);
        
       
    } catch (error) {
        return Promise.reject({error})
    }
}


/** login function */
export async function verifyPassword({username, password}){
    try {
        if(username){
           const {data} = await axios.post("https://mern-health-app-backend.onrender.com/api/login", {username, password});
           return Promise.resolve({data})
        }
    } catch (error) {
        return Promise.reject({error:"Password doesn't match"})
    }
}

/** updateUser function */
export async function updateUser(response){
    try {
        const token = await localStorage.getItem('token');
        const {data} = await axios.put("https://mern-health-app-backend.onrender.com/api/updateUser", response, {headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({error:"Couldn't update profile..."})
    }
}

/** generate otp fucntion */
export async function generateOTP(username){
    try {
        const {data:{code}, status} = await axios.get("https://mern-health-app-backend.onrender.com/api/generateOTP", {params:{username}});
        if(status===201){
          let {data:{email}} = await getUser({username});
          console.log(code);
          let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
          await axios.post("https://mern-health-app-backend.onrender.com/api/registerMail", {username, userEmail:email, text, subject:"Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error})
    }
}

/** verify otp function */
export async function verifyOTP({username, code}){
    try {
        const {data, status} = await axios.get("https://mern-health-app-backend.onrender.com/api/verifyOTP", {params: {username, code}});
        return {data, status}
    } catch (error) {
        return Promise.reject({error})
    }
}

/** reset password function */
export async function resetPassword({username, password}){
    try {
       const {data, status} =  await axios.put('https://mern-health-app-backend.onrender.com/api/resetPassword', {username, password});
       return Promise.resolve({data, status})
    } catch (error) {
        return Promise.reject({error})
    }
}
