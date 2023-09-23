import axios from "axios";
const baseurl = "http://localhost:3001/api/login";

const authservice = {
  handlelogin: async (credentials: { username: string; password: string }) => {
    console.log(
      "login posted: ",
      credentials.username,
      " ",
      credentials.password,
      "\n",
      baseurl
    );
    // try{
    // const response = await axios.post(baseurl, credentials);
    // return response.data;
    // } catch (error:any){
    //     console.log("login request failed : ", error.message);
    //     throw error;
    // }
  },
  signin: async (credentials: { username: string; password: string }) => {
    console.log(
      "signin posted: ",
      credentials.username,
      " ",
      credentials.password,
      "\n",
      baseurl
    );
    // try{
    // const response = await axios.post(baseurl, credentials);
    // return response.data;
    // } catch (error:any){
    //     console.log("login request failed : ", error.message);
    //     throw error;
    // }
  },
};

export default authservice;
