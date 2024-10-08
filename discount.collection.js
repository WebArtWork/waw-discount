module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		stores: [{
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Store"
		}],
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		code: { type: String, sparse: true, trim: true, unique: true },
		amount: Number,
		discountType: {
			type: String,
			enum: ['coupon', 'productDiscount'],
			default: 'coupon'
		},
		products: [{
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Product"
		}]
	});

	Schema.methods.create = function (obj, user) {
		this.author = user._id;
		this.stores = obj.stores;
		this.name = obj.name;
		this.amount = Number(obj.amount);
		this.discountType = obj.discountType;
		this.products = obj.products;
	};

	return (waw.Discount = waw.mongoose.model("Discount", Schema));
};
