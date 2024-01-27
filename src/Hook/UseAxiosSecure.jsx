import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://chain-teck-project-server.vercel.app'
})
const useAxiosSecure = () => {

    return axiosSecure;
};

export default useAxiosSecure;