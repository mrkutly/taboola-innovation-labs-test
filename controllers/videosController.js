const Video = require('../models/Video');

module.exports = {
	async index(req, res) {
		try {
			const { publisher_id, date } = req.query;

			const formattedDate = new Date(date).toISOString();

			const videos = await Video.fromPubId(publisher_id, formattedDate);

			res.send({ data: { videos } });
		} catch (error) {
			res.send({ error: error.message });
		}
	},
};
