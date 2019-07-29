import axios from "axios";

export default class AuthServices {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/auth",
      withCredentials: true
    });
  }

  signup = (username, password, email) => {
    return this.service
      .post("/signup", { username, password, email })
      .then(response => response.data);
  };

  login = (username, password) => {
    return this.service
      .post("/login", { username, password })
      .then(response => response.data);
  };

  checkLogin = () => {
    return this.service.get("/checklogin").then(response => response.data);
  };

  logout = () => {
    return this.service.get("/logout").then(response => response.data);
  };

  handleUpload = file => {
    return this.service.post("/upload", file).then(res => res.data);
  };

  editProfile = (oldPass, newPass, newPassRepeat) => {
    return this.service
      .post("/edit-profile", { oldPass, newPass, newPassRepeat })
      .then(response => response.data);
  };

  editAvatar = avatar => {
    return this.service
      .post("/edit-avatar", { avatar })
      .then(response => response.data);
  };
}
