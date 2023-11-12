import AuthRouter from "./AuthRoute.js";
import BrandRouter from "./BrandRoute.js";
import ReviewsRouter from "./ReviewsRoute.js";
import UserRouter from "./UsersRoute.js";
import { wishlistRoute } from "./WishlistRoute.js";
import { addressesRoute } from "./addressesRoute.js";
import categoriesRouter from "./categoryRoute.js";
import productRouter from "./productRoute.js";
import subCategoryRouter from "./subCategoryRoute.js";


const mountRoutes = (app) => {
  app.use('/api/v1/categories', categoriesRouter);
  app.use('/api/v1/subCategories',subCategoryRouter);  
  app.use('/api/v1/categories/:categoryId/subCategories',subCategoryRouter);//nested route
  app.use('/api/v1/Brands',BrandRouter);
  app.use('/api/v1/Products',productRouter);
  app.use('/api/v1/Users',UserRouter);
  app.use('/api/v1/Auth',AuthRouter);
  app.use('/api/v1/Reviews',ReviewsRouter);
  app.use('/api/v1/products/:productId/Reviews',ReviewsRouter); //nested route
  app.use('/api/v1/wishlist',wishlistRoute);
  app.use('/api/v1/addresses',addressesRoute);
};


export default mountRoutes