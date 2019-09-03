const trc = require('../db/trc');
const crawler = require('../db/crawler');
const Audit = require('./Audit');

class Video {
	constructor(params) {
		this.id = params.id;
		this.pub_video_id = params.pub_video_id;
		this.publisher_name = params.name;
		this.url = params.url;
		this.thumbnail_url = params.thumbnail_url;
		this.is_recommendable = params.is_recommendable;
		this.publisher_id = params.publisher_id;
		this.category = params.channel;
		this.create_time = params.create_time;
		this.uploader = params.uploader;
		this.external_data = params.external_data;
	}

	async getCrawlerInfo() {
		const res = await crawler.query(
			`SELECT id,
				first_successful_processing,
				last_successful_processing,
				last_upload,
				error_message,
				nonrecommendable_reason,
				create_time,
				update_time,
				first_fe_reported_time,
				first_queue_time,
				first_attempted_crawl_time,
				first_fe_reported_loaded_time,
				source,
				last_crawl_reason,
				first_nonrecommendable_time 
			FROM crawler.audit 
			WHERE publisher = ? 
			AND pub_item_id = ?`,
			[this.publisher_name, this.pub_video_id]
		);

		this.setCrawlerAuditData(res[0]);
		return this.crawlerAuditData;
	}

	setCrawlerAuditData(crawlerAuditData) {
		this.audit = new Audit(crawlerAuditData);
	}

	static async fromPubId(publisher_id, date_before) {
		date_before = date_before || new Date().toISOString();
		const results = await trc.query(
			`
                SELECT pubs.name, v.uploader, v.external_data, v.create_time, v.item_type, v.create_time, v.pub_video_id, v.url, v.thumbnail_url, v.publisher_id, v.id, v.is_recommendable, pc.channel, v.has_expired, v.url
                FROM trc.video_channels AS vc
                JOIN trc.videos AS v ON v.id = vc.video_id
                JOIN publisher_channels AS pc ON pc.id = vc.channel_id
                JOIN publishers AS pubs ON pubs.id = v.publisher_id
                WHERE pc.publisher_id = ?
                AND v.create_time < ?
                ORDER BY v.create_time DESC
                LIMIT 10;
            `,
			[publisher_id, date_before]
		);

		const videos = Promise.all(
			results.map(async res => {
				const video = new Video(res);
				await video.getCrawlerInfo();
				return video;
			})
		);
		return videos;
	}
}

module.exports = Video;
