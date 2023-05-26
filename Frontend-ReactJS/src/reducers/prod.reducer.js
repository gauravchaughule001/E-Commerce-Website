import { PRODUCT } from "../action/action.type"

const initialState = {
    productData: [],
    categoryData: [],
    cartData: [],
    orderData:[]
}

const prodReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case PRODUCT.UPDATE_PRODUCTS_LIST:
            return { ...state, productData: payload }

        case PRODUCT.UPDATE_CATEGORY_LIST:
            return { ...state, categoryData: payload }

        case PRODUCT.UPDATE_CART_LIST:
            return { ...state, cartData: payload }

        case PRODUCT.UPDATE_ORDER_HISTORY:
            return { ...state, orderData: payload }

        default:
            return state
    }
}

export default prodReducer