import axios from 'axios'
export function getfiles(data) {
    return axios.post(`${process.env.REACT_APP_URL}user/getfile`, data)
}
export function uploadfile(data) {
    return axios.post(`${process.env.REACT_APP_URL}user/uploadFile`, data, {
        headers: {
            'content-type': 'multipart/form-data',
        }
    })
}
export function downloadFile(data) {
    return axios.post(`${process.env.REACT_APP_URL}user/downloadFile`, data)
}