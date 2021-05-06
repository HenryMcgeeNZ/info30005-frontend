import { useState, useEffect } from "react";
import axios from "axios";

//const BASE_URL = "https://info30005-teamstarfleet.herokuapp.com";
const BASE_URL = "http://localhost:8001";

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [BASE_URL];
    const token = localStorage.getItem("token"); // get the token
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`; // we put our token in the header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getFoods() {
  const endpoint = BASE_URL + `/customer/menu/`;
  return fetch(endpoint).then((res) => res.json());
}

export function useFoods() {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFoods()
      .then((foods) => {
        setFoods(foods);
        setLoading(false);
      })
      .catch((e) => {
        //console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    foods,
    error,
  };
}

// component for handling user login
export async function loginUser(user) {
  // unpack user details, email and password
  const { email, password } = user;

  // if the user did not enter an email or password
  if (!email || !password) {
    alert("must provide an email and a password");
    return;
  }

  // define the route which the FoodBuddy API is handling
  // login/authentication
  const endpoint = BASE_URL + `/customer/login`;

  // POST the email and password to FoodBuddy API to
  // authenticate user and receive the token explicitly
  // i.e. data = token
  let data = await axios({
    url: endpoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(
      {
        email: email,
        password: password,
      },
      { withCredentials: true } // IMPORTANT
    ),
  })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      alert("Incorrect email or password");
      return;
    });

  // put token ourselves in the local storage, we will
  // send the token in the request header to the API server
  localStorage.setItem("token", data);

  // redirect to homepage -- another way to redirect
  window.location.href = "/";
  console.log("success");
}
