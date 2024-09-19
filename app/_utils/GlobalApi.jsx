const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
                                                 
const getCategory = () => {
  return axiosClient.get("/categories?populate=*");
};                                                  

const getDoctors = () => {
  return axiosClient.get("/doctors?populate=*");
};
                                                 
const getDoctorByCategory = (category) => {
  return axiosClient.get(
    "/doctors?filters[categories][name][$in]=" + category + "&populate=*"
  );
};
const getDoctorById = (id) => {
  return axiosClient.get("/doctors/" + id + "?populate=*");
};
const bookAppointment = (data) => {
  return axiosClient.post("/appointments", data);
};

const sendEmail = (data) => axios.post("/api/sendEmail", data);

const getUserBookingList = (userEmail) => {
  return axiosClient.get(
       "/appointments?filters[email][$eq]=" + userEmail + "&populate[doctor][populate][image][populate]=url"

  );
};
                                                       
const cancelAppointment=(id)=>{
  return axiosClient.delete("/appointments/"+id)
}
export default {
  getCategory,
  getDoctors, 
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  sendEmail,
  getUserBookingList,
  cancelAppointment
};
