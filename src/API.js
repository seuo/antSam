import axios from 'axios';

// var url = 'http://10.2.24.12:4001/api';
// var server = 'http://10.2.24.12:4001/home/';

var url = 'http://localhost:4001/api';
var server = 'http://localhost:4001/';

var api = {


    addProduct : (data) => {
        return axios.post(url+'/products',data)
    },
    
    updateProduct : (id,data) => {
        return axios.get(url+'/products/'+id,data)
    },
    
    deleteProduct : (id) => {
        return axios.delete(url+'/products/'+id)
    },
    
    getProducts : () => {
        return axios.get(url+'/products')
    },

    getProduct : (id) => {
        return axios.get(url+'/products/'+id)
    },

    addReview : (data) => {
        return axios.post(url+'/reviews',data)
    },
    
    // updateReview : (id,data) => {
    //     return axios.get(url+'/review/'+id,data)
    // },
    
    deleteReview : (id) => {
        return axios.delete(url+'/reviews/'+id)
    },
    
    uploadPhoto : (data) => {
        return axios.post(url+'/upload',data)
    },

    authenticate : (data) => {
        return axios.post(url+'/user',data)
    },

    getUser : (id) => {
        return axios.get(url+'/user/'+id)
    },


}





export {server, api}