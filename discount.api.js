module.exports = async (waw) => {
	waw.crud("discount", {
		create: {
			ensure: waw.role("admin owner"),
		},
		get: {
			ensure: waw.role("admin owner"),
			query: (req) => {
				return req.user.is.admin
					? {}
					: {
							$or: [
								{
									global: true,
								},
								{
									author: req.user._id,
								},
							],
					  };
			},
		},
		update: {
			ensure: waw.role("admin owner"),
			query: (req) => {
				return req.user.is.admin
					? {
							_id: req.body._id,
					  }
					: {
							_id: req.body._id,
							author: req.user._id,
					  };
			},
		},
		delete: {
			ensure: waw.role("admin owner"),
			query: (req) => {
				return req.user.is.admin
					? {
							_id: req.body._id,
					  }
					: {
							_id: req.body._id,
							author: req.user._id,
					  };
			},
		},
	});
};
