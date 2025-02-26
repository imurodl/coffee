import { ObjectId } from "mongoose";
import { viewGroup } from "../enums/view.enum";

export interface View {
  _id: ObjectId;
  viewGropu: viewGroup;
  memberId: ObjectId;
  viewRefId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ViewInput {
  memberId: ObjectId;
  viewRefId: ObjectId;
  viewGroup: viewGroup;
}
