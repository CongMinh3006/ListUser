import axios from "../../axios"

export const apiGetAllUser = () => axios({
    url: `http://localhost:9000/api/user/`,
    method: 'get',
})

export const apiDeleteUser = (uid) => axios({
    url: `http://localhost:9000/api/user/${uid}`,
    method: 'delete',
})

export const apiAddUser = (data) => axios({
    url: `http://localhost:9000/api/user/newUser`,
    method: 'post',
    params: data
})