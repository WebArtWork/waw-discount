module.exports = async (waw) => {
	waw.crud("discount", {
		create: {
			ensure: waw.role("admin owner"),
		},
		get: {
			ensure: waw.role("admin owner"),
			query: () => {
				return {};
			},
		},
		update: {
			ensure: waw.role("admin owner"),
			query: (req) => {
				return { _id: req.body._id };
			},
		},
		unique: {
			name: 'code',
			ensure: waw.role("admin owner"),
			query: (req) => {
				return { _id: req.body._id };
			},
		},
		delete: {
			ensure: waw.role("admin owner"),
			query: (req) => {
				return { _id: req.body._id };
			},
		},
	});

	const router = waw.router('/api/discount');
	router.post('/checkup', async (req, res) => {
		const discountCode = req.body.code;
		const discount = await waw.Discount.findOne({ code: discountCode });

		if (discount) {
			return res.status(200).json({ valid: true, discount: discount });
		} else {
			return res.status(404).json({ valid: false, message: 'Discount not found' });
		}
	});
};