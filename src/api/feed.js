import axios from '@/api/axios'

const getFeed = apiUrl => {
    return axios.get(apiUrl)
        .then(response => response.data)
}

export default {
    getFeed
}