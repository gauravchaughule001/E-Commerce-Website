export const config={
    BASE_URL : 'http://localhost:8080/api/v1',
    IMAGE_BASE_URL:"http://localhost:8080/api/v1/photo/downloadFile/"
}
export const ENDPOINTS={

    //Admin Services
    GetAllUser: '/admin/getuserbyid/',
    DeleteUser: '/admin/deleteuser',
    addProduct: '/admin/addproduct',
    updateProduct: 'admin/updateproduct/',
    deleteProduct: 'admin/deleteproduct',
    addCategory: 'admin/addcategory',
    DeleteProduct: 'admin/deleteproduct/',
    getOrdersByDate:'/admin/getorderbydate',
    getOrdersByCuName:'/admin/getorderbycustomername',
    getAllOrders:'/admin/getallorder',
    changeOrderStatus:'/admin/changeorderstatus',
    getOrdersByStatus:'/admin/getordersbystatus',
    getOrdersByFilters:'/admin/getordersbyfilter',
    placeOrderSendMail:'admin/sendMail',



    

    //User Services
    CreateUser: '/auth/register',
    CreateUserCustom: '/admin/register',
    login: '/auth/login',
    UpdateUser: '/users/updateprofile',
    getProducts: '/products/allproducts',
    sortProducts:'/products/sortby',
    findInPrice:'products/findbyprice',
    findProductByUserId:'products/get',
    GetProductsByPageNo:'products/getAllProducts',
    getProductByName:'/products/search',
    getProductByCategoryId:'/products/getbycatid/',
    getCategories:'/products/allcategories',
    addToCart:'/cart/addtocart',
    getCartItems:'/cart/getcartitems',
    deleteCartItem:'/cart/deletecartitem/',
    getcartproducts:'/cart/getallcartitems',
    placeOrder:'order/placeorder',
    getOrders:'order/getallorder/',
    getOrdersPage:'order/getorderpages',



    //Public Service
    getAllCategoriesHomePage:'/home/allcategories',
    getProductsHomePage:'/home/getAllProductshome',
    usernameAvailable: '/auth/checkusernameavailability'


}