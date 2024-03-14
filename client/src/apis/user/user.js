import axios from "../../axios"

export const apiGetAllUser = (data) => axios({
    url: `http://localhost:9000/api/user/`,
    method: 'get',
    params: data
})

export const apiDeleteUser = (uid) => axios({
    url: `http://localhost:9000/api/user/${uid}`,
    method: 'delete',
})

export const apiAddUser = (data) => axios({
    url: `http://localhost:9000/api/user/newUser`,
    method: 'post',
    data
})

export const apiUpdateUser = (data) => axios({
    url: `http://localhost:9000/api/user/`,
    method: 'post',
    data
})