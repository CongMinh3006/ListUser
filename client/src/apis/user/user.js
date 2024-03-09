import axios from "../../axios"

export const apiGetAllUser = () => axios({
    url: `http://localhost:9000/api/user/`,
    method: 'get',
})