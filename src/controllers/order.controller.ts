import { Request, Response } from "express";
import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/Errors";
import OrderService from "../models/Order.service";
import {
  OrderInquiry,
  OrdersInquiry,
  OrderUpdateInput,
} from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";
import moment from "moment";

const orderController: T = {};

const orderService = new OrderService();

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("createOrder");

    const result = await orderService.createOrder(req.member, req.body);
    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, createOrder:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getMyOrders");

    const { page, limit, orderStatus } = req.query;
    const inquiry: OrderInquiry = {
      page: Number(page),
      limit: Number(limit),
      orderStatus: orderStatus as OrderStatus,
    };

    const result = await orderService.getMyOrders(req.member, inquiry);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getMyOrders:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

orderController.updateOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateOrder");
    const input: OrderUpdateInput = req.body;

    const result = await orderService.updateOrder(req.member, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateOrder:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/** ADMIN - SSR **/

orderController.getAllOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getAllOrders");

    const { page, limit } = req.query;
    const inquiry: OrdersInquiry = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    };

    const data = await orderService.getAllOrders(inquiry);
    res.render("orders", { orders: data, moment: moment });
  } catch (err) {
    console.log("Error, getAllOrders:", err);
    res.redirect("/admin/home");
  }
};

orderController.updateOrderByAdmin = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("updateOrderByAdmin");
    console.log("input", req.body);
    const input: OrderUpdateInput = req.body;

    const result = await orderService.updateOrderByAdmin(input);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateOrderByAdmin:", err);
    res.redirect("/admin/order/all");
  }
};

export default orderController;
