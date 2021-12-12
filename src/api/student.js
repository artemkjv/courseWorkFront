import axios from "@/api/axios";

const getStudent = id => {
    return axios.get(`/students/${id}`)
        .then(response => response.data.data)
}

const updateStudent = (id, student) => {
    return axios.put(`/students/${id}`, student)
        .then(response => response.data.data)
}

const storeStudent = student => {
    return axios.post('/students', student)
        .then(response => response.data.data)
}

export default {
    getStudent,
    updateStudent,
    storeStudent
}