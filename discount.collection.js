module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		url: { type: String, sparse: true, trim: true, unique: true },
		data: {},
		stores: [{
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Store"
		}],
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Store"
		}
	});

	Schema.methods.create = function (obj, user) {
		this.author = user._id;
		this.stores = obj.stores;
		this.name = obj.name;
		this.description = obj.description;
		this.data = obj.data;
		this.url = obj.url;
	};
	return (waw.Discount = waw.mongoose.model("Discount", Schema));
};
