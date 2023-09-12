import categoriesRouter from "./categoryRoute.js";
import subCategoryRouter from "./subCategoryRoute.js";


const mountRoutes = (app) => {
  app.use('/api/v1/categories', categoriesRouter);
  app.use('/api/v1/subCategories',subCategoryRouter);  
  app.use('/api/v1/categories/:categoryId/subCategories',subCategoryRouter)
};


export default mountRoutes