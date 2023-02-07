import axios from "axios";

const napster = axios.create({
  baseURL: "https://api.napster.com/v2.2/tracks/",
});

export default napster;
