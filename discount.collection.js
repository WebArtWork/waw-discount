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
		code:  { type: String, sparse: true, trim: true, unique: true },
		amount: Number
	});

	Schema.methods.create = function (obj, user) {
		this.author = user._id;
		this.stores = obj.stores;
		this.name = obj.name;
		this.amount = Number(obj.amount);
		
	};
	return (waw.Discount = waw.mongoose.model("Discount", Schema));
};
