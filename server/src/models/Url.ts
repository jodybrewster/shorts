// src/models/Url.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the type for a URL Document
interface IUrl extends Document {
  url: string;
  shortcode: string;
  amountVisited: number;
  // createdAt?: Date;
  // updatedAt?: Date;
}

// Schema for the URL model
const UrlSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    shortcode: { type: String, required: true, unique: true, minlength: 7 },
    amountVisited: { type: Number, default: 0 }
  //   createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date, default: Date.now },
  // },
  // {
  //   timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Create and export the model
const UrlModel = mongoose.model<IUrl>('Url', UrlSchema, 'Urls');
export default UrlModel;