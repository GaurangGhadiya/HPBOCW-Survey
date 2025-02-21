import Cookies from "js-cookie";

// Save the token in localStorage
export const saveToken = (data) => {
  Cookies.set("hpbocw_userName", JSON.stringify(data?.userName)); // expires in 1 days
  Cookies.set("hpbocw_block", JSON.stringify(data?.block)); // expires in 1 days
  Cookies.set("hpbocw_district", JSON.stringify(data?.district)); // expires in 1 days
  Cookies.set("hpbocw_panchayat", JSON.stringify(data?.panchayat)); // expires in 1 days
  Cookies.set("hpbocw_village", JSON.stringify(data?.village));
  Cookies.set("hpbocw_name", JSON.stringify(data?.name));
  Cookies.set("hpbocw_roles", JSON.stringify(data?.roles));
  Cookies.set('hpbocw_authToken', data.token, { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
  Cookies.set('hpbocw_ulb', data?.id, { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
};

// Retrieve the token from localStorage
export const getToken = () => {
  return Cookies.get("hpbocw_authToken");
};

export const getUserName = () => {
  return Cookies.get("hpbocw_userName");
};
export const getName = () => {
  return Cookies.get("hpbocw_name");
};

export const getRoles = () => {
  return Cookies.get("hpbocw_roles");
};
export const getBlock = () => {
  return Cookies.get("hpbocw_block");
};
export const getDistrict = () => {
  return Cookies.get("hpbocw_district");
};
export const getPanchayat = () => {
  return Cookies.get("hpbocw_panchayat");
};
export const getVillage = () => {
  return Cookies.get("hpbocw_village");
};
export const getUlb = () => {
  return Cookies.get("hpbocw_id");
};

// Remove the token from localStorage
export const removeToken = () => {
  // Cookies.set('userName', null, { expires: 1 }); // expires in 1 days
  // Cookies.set('authToken', null, { expires: 1 });
  // Cookies.set('ulb', null, { expires: 1 }); // expires in 1 days

  Cookies.remove("hpbocw_authToken");
  Cookies.remove("hpbocw_userName");
  Cookies.remove("hpbocw_name");
  Cookies.remove("hpbocw_roles");
  Cookies.remove("hpbocw_block");
  Cookies.remove("hpbocw_district");
  Cookies.remove("hpbocw_panchayat");
  Cookies.remove("hpbocw_village");

  // Cookies.remove('authToken', { path: '' })
  // Cookies.remove('userName', { path: '' })
  // Cookies.remove('ulb', { path: '' })

  const cookies = Cookies.get(); // Get all cookies

  for (const cookie in cookies) {
    if (cookies.hasOwnProperty(cookie)) {
      Cookies.remove(cookie); // Remove each cookie
    }
  }
};
