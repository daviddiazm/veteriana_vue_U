import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5092/api',
  headers: {
    'Content-Type': 'application/json' 
  }
});

export default {
  getDataMascotas() {
    return api.get(`/mascotas`);
  },

  postDataMascotas(data) {
    return api.post(`/mascotas`, data); 
  },

  putDataMascotas(data, id) {
    return api.put(`/mascotas/${id}`, data); 
  },

  deleteDataMascotas(id) {
    return api.delete(`/mascotas/${id}`);
  }
};
