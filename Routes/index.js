import router from "./categoryRoute.js";



const mountRoutes = (app) => {
  app.use('/api/v1/categories', router);
};


export default mountRoutes