import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(() => {
            console.log(response.data.accessToken);
            console.log(response.data.email);
            return {
                accessToken: response.data.accessToken,
                email: response.data.email
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;