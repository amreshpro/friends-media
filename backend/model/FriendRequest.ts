import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IFriendRequest extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "declined";
}

const FriendRequestSchema = new Schema<IFriendRequest>({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
});

export default models.FriendRequest || model<IFriendRequest>("FriendRequest", FriendRequestSchema);
