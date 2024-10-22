
import  axios  from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5092/api'
})

export default {
  getDataMascotas() {
    return api.get(`/mascotas`)
  },

  postDataMascotas(data) {
    api.post(`/mascotas`,data)
  }
}