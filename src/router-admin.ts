import express from "express";
const routerAdmin = express.Router();
import storeController from "./controllers/store.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";
import orderController from "./controllers/order.controller";

/** Restaurant */
routerAdmin.get("/", storeController.goHome);

routerAdmin
  .get("/login", storeController.getLogin) // get serverga malumotni olib kiradi
  .post("/login", storeController.processLogin); // post serverdan databasega olib boradi

routerAdmin
  .get("/signup", storeController.getSignup)
  .post(
    "/signup",
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

export default routerAdmin;
