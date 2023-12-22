import axios from "axios";
import { getToken } from '../authorization/auth'
import { HOST } from '../const'

function top(iHeaders) {
    let token = getToken()
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return axios.create({
        baseURL: HOST,
        headers: {
            ...headers,
            ...iHeaders
        }
    })
}

export default top