export const getIsLoggedIn = () => {
    if (localStorage.getItem("isAuth") === "true" && localStorage.getItem("user")) return true;
    return false;
};
export const logIn = (user) => {
    localStorage.setItem("isAuth", true);
    localStorage.setItem("user", JSON.stringify(user));
};
export const logOut = () => {
    localStorage.setItem("isAuth", false);
    localStorage.removeItem("user");
};
export const getUser = (key = "") => {
    if (!getIsLoggedIn()) return "";
    const user = JSON.parse(localStorage.getItem("user"));
    return key ? user[key] : user;
};

export const getIsAdmin = () => {
    if (localStorage.getItem("isAuth") === "true" && localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        return user.profileType === "ADMIN";
    }
    return false;
};