import express from "express";
const routerAdmin = express.Router();
import storeController from "./controllers/store.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";
import orderController from "./controllers/order.controller";

// Admin signup is only for initial setup. Disabled in production unless
// explicitly re-enabled, so the admin account can't be re-seized.
const guardAdminSignup = (req: any, res: any, next: any) => {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_ADMIN_SIGNUP !== "true"
  ) {
    return res.redirect("/admin/login");
  }
  next();
};

/** Restaurant */
routerAdmin.get("/", storeController.goHome);

routerAdmin
  .get("/login", storeController.getLogin) // get serverga malumotni olib kiradi
  .post("/login", storeController.processLogin); // post serverdan databasega olib boradi

routerAdmin
  .get("/signup", guardAdminSignup, storeController.getSignup)
  .post(
    "/signup",
    guardAdminSignup,
    makeUploader("members").single("memberImage"),
    storeController.processSignup
  );

routerAdmin.get("/logout", storeController.logout);

routerAdmin.get("/check-me", storeController.checkAuthSession);

/** Product */
routerAdmin.get(
  "/product/all",
  storeController.verifyRestaurant,
  productController.getAllProduct
);
routerAdmin.post(
  "/product/create",
  storeController.verifyRestaurant,
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct
);
routerAdmin.post(
  "/product/:id", // param
  storeController.verifyRestaurant,
  productController.updateChosenProduct
);

routerAdmin.get(
  "/product/new", // param
  storeController.verifyRestaurant,
  productController.getCreateProduct
);

/** User */
routerAdmin.get(
  "/user/all",
  storeController.verifyRestaurant,
  storeController.getUsers
);

routerAdmin.post(
  "/user/edit",
  storeController.verifyRestaurant,
  storeController.updateChosenUser
);

/* Order */

routerAdmin.get(
  "/order/all",
  storeController.verifyRestaurant,
  orderController.getAllOrders
);

routerAdmin.post(
  "/order/update",
  storeController.verifyRestaurant,
  orderController.updateOrderByAdmin
);

export default routerAdmin;
