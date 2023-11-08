import axios from 'axios';
import {baseUrl} from "../../config/urlConfig";
import {toast} from 'react-toastify'
import {StorageKeys, StorageService} from "../core/storage.service";
import {Auth} from '@aws-amplify/auth';

export const HTTP = axios.create({
    baseURL: baseUrl,
    headers: { 'accept': 'application/json' }
});

HTTP.interceptors.response.use(undefined, (error) => {
        if (error.message === 'Network Error' && !error.response) {
            return toast.error('Something went wrong, Please try again later');
        }

        
        const {status} = error.response;

        if (status === 401) {
            setTimeout(() => {
                Auth.signOut();
            }, 5000)
            return toast.error('Your Session has Expired. Please login again and continue');
        }
        
        if (status === 404) {
            return toast.error('404 Not Found');
        }

        if (status === 500) {
            return toast.error('Server Error, Please try again in some time');
        }
    }
);


HTTP.interceptors.request.use(request => {
    request.headers['Authorization'] = "Bearer " + StorageService.get(StorageKeys.clientJwt);
    return request;
 });