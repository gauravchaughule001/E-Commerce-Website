
import { PRODUCT } from "./action.type";

export const updateProducts=(product)=>{
    return{
        type:PRODUCT.UPDATE_PRODUCTS_LIST,
        payload:product
    }
}

export const updateCategoryList=(data)=>{
    return{
        type:PRODUCT.UPDATE_CATEGORY_LIST,
        payload:data
    }
}

export const updateCartData=(data)=>{
    return{
        type:PRODUCT.UPDATE_CART_LIST,
        payload:data
    }
}

export const updateOrderHistory=(data)=>{
    return{
        type:PRODUCT.UPDATE_ORDER_HISTORY,
        payload:data
    }
}