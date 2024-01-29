import mongoose from 'mongoose';
import { ArticleModel } from '../types';
import mongoosePaginate from 'mongoose-paginate-v2';

const ArticleSchema = new mongoose.Schema<ArticleModel>({
  title: String,
  content: String,
  author: String,
  timestamp: { type: Date, default: Date.now },
});

ArticleSchema.plugin(mongoosePaginate);

export default mongoose.model<ArticleModel, mongoose.PaginateModel<ArticleModel>>('Article', ArticleSchema);
