import axios from '@/api/axios'

const getGroups = apiUrl => {
    return axios.get(apiUrl)
        .then(response => response.data)
}

const getGroup = id => {
    return axios.get(`/groups/${id}`)
        .then(response => response.data.data)
}

const updateGroup = (id, group) => {
    return axios.put(`/groups/${id}`, group)
        .then(response => response.data.data)
}

const storeGroup = group => {
    return axios.post('/groups', group)
        .then(response => response.data.data)
}

export default {
    getGroups,
    getGroup,
    updateGroup,
    storeGroup
}