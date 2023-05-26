import { useSelector } from "react-redux";
import { ENDPOINTS, config } from "../config/config";

const { client } = require("./Axios");

export const signup = (data) => {
    return client.post(ENDPOINTS.CreateUser, data, {headers:{}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        // alert(135543)
        console.log(err.response.data.msg)
        throw err
    })
}

export const signupCustom = (data) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.post(ENDPOINTS.CreateUserCustom, data, {headers:{Authorization:"Bearer "+token}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        // alert(135543)
        console.log(err.response.data.msg)
        throw err
    })
}




export const updateuser = (data) => {
    // alert("Signup")
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.put(ENDPOINTS.UpdateUser, data, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        // alert(135543)
        throw err
    })
}




export const deleteUsers = (id) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.DeleteUser+"/"+id}`
    return client.delete(url,  {
        headers: {
            Authorization:"Bearer "+token
        }
    })
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        throw err
    })
    
}

export const getUserById=(id)=>{
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url= `${ENDPOINTS.GetAllUser+""+id}`
    return client.get(url,{headers:{Authorization:"Bearer "+token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}


export const login = (data) => {
    return client.post(ENDPOINTS.login, data, {
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then((res) => {
        console.log(res)
        return res.data;
    })
    .catch((err) => {
        throw err
    })
}

export const createProduct = (data) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.post(ENDPOINTS.addProduct, data, {headers:{Authorization:"Bearer "+token}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        // alert(135543)
        console.log(err.res.data.err)
        throw err
    })
}

export const addCategory = (data) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.post(ENDPOINTS.addCategory, data, {headers:{Authorization:"Bearer "+token}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        // alert(135543)
        console.log(err.res.data.err)
        throw err
    })
}

export const getProducts = () => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getProducts}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
    })
    
}

export const getProductsHomePage = () => {
    let url = `${ENDPOINTS.getProductsHomePage}`
    return client.get(url, {headers: {}})
    .then((res) => {
        console.log(res)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
    })
    
}

export const getProductByCatId=(id)=>{
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getProductByCategoryId+""+id}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
    })
}

export const getProductsByName=(value)=>{
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getProductByName+"?query="+value}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err;
    })
}

export const sortProductsByRequirement=(value)=>{
        let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.sortProducts+"?query="+value}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        // console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err;
    })
}

export const findPriceBetween=(min,max)=>{
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.findInPrice+"?min="+min+"&max="+max}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        // console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err;
    })
}

export const getProductByUserId=(userId,productId)=>{
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.findProductByUserId+"?userid="+userId+"&productid="+productId}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        // console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err;
    })
}

export const getProductsPage=(pageNo)=>{
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.GetProductsByPageNo+"?pageNo="+pageNo+"&pageSize=4"}`
    return client.get(url, {headers: { Authorization : "Bearer "+token}})
    .then((res) => {
        // console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        throw err;
    })
}




export const updateProduct = (data,id) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.put(ENDPOINTS.updateProduct+""+id, data, { headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
            // alert(135543)
            console.log(err.res.data.err)
            throw err
        })
    }

export const deleteProducts = (id) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.DeleteProduct+""+id}`
    return client.delete(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization:"Bearer "+token
        }
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        throw err
    })
    
}



export const getCategory = () => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getCategories}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
    })
    
}

export const getCategoryHomePage = () => {
    let url = `${ENDPOINTS.getAllCategoriesHomePage}`
    return client.get(url, {headers: {}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
    })
    
}

export const addToCart = (data) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.post(ENDPOINTS.addToCart, data, {headers:{Authorization:"Bearer "+token}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        // alert(135543)
        console.log(err.res.data.err)
        throw err
    })
}

export const getCartItems = () => {

    let url = `${ENDPOINTS.getCartItems}`
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
    })
    
}

export const getCartProducts = () => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getcartproducts}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
        
    })
    
}

export const deleteCartItem = (id) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.deleteCartItem+""+id}`
    return client.delete(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization:"Bearer "+token
        }
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        throw err
    })
    
}

export const placeOrder=(data)=>{
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    console.log(data)
    return client.post(ENDPOINTS.placeOrder, data, {headers:{Authorization:"Bearer "+token}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        // alert(135543)
        console.log(err)
        throw err
    })
}

export const placeOrderMail=(data)=>{
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.post(ENDPOINTS.placeOrderSendMail, data, {headers:{Authorization:"Bearer "+token}})
    .then((res) => {
        return res
    })
    .catch((err) => {
        // alert(135543)
        console.log(err.res.data.err)
        throw err
    })
}

export const getOrderHistory = () => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getOrders}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
        
    })
    
}

export const getOrderHistoryPages = (pageNo) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getOrdersPage+"?pageNo="+pageNo+"&pageSize=5"}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
        
    })
    
}


export const getOrderHistoryByDate = (from,to) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getOrdersByDate+"?from="+from+"&to="+to}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        throw err
    })
}

export const getOrdersByCustomerName = (key) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getOrdersByCuName+"?key="+key}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res)
        return res.data
    })
    .catch((err) => {
        return(123)
        throw err
    })
}

export const getOrdersByStatus = (status) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getOrdersByStatus+"?status="+status}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res)
        return res.data
    })
    .catch((err) => {
        return(123)
        throw err
    })
}

export const getOrdersByFilters = (key,data) => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    return client.post(ENDPOINTS.getOrdersByFilters+"?key="+key, data, {headers: {"Content-Type": "application/json",Authorization:"Bearer "+token}})
    .then((res) => {return res})
    .catch((err) => {return err})
}





export const getAllOrderHistory = () => {
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.getAllOrders}`
    return client.get(url, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        
        throw err
        
    })
    
}


export const changeOrderStatus = (id, status) => {
    let data={id:id,changeStatus:status};
    let token = JSON.parse(localStorage.getItem('USER_INFO')).token;
    let url = `${ENDPOINTS.changeOrderStatus}`
    return client.put(url, data, {headers: {Authorization:"Bearer "+token}})
    .then((res) => {
        console.log(res.data)
        return res
    })
    .catch((err) => {
        console.log(err)
        throw err
    })
}

export const checkUsernameAvailability=(value)=>{
    let data={username:value}
    let url = `${ENDPOINTS.usernameAvailable}`
    return client.post(url, data, {headers: {}})
    .then((res) => {
        return res
    })
    .catch((err) => {
        throw err
    })
}

