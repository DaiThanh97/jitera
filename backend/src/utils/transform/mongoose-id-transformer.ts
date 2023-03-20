export default (doc, ret, opts) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret._deleted;
};
