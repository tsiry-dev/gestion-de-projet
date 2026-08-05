import logoutApi from "../api/logoutApi";

const logoutService = async () => {
    await logoutApi();
}

export default logoutService;