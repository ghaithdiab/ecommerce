import AuthRouter from "./AuthRoute.js";
import BrandRouter from "./BrandRoute.js";
import UserRouter from "./UsersRoute.js";
import categoriesRouter from "./categoryRoute.js";
import productRouter from "./productRoute.js";
import subCategoryRouter from "./subCategoryRoute.js";


const mountRoutes = (app) => {
  app.use('/api/v1/categories', categoriesRouter);
  app.use('/api/v1/subCategories',subCategoryRouter);  
  app.use('/api/v1/categories/:categoryId/subCategories',subCategoryRouter);
  app.use('/api/v1/Brands',BrandRouter);
  app.use('/api/v1/Products',productRouter);
  app.use('/api/v1/Users',UserRouter);
  app.use('/api/v1/Auth',AuthRouter);
};


export default mountRoutes