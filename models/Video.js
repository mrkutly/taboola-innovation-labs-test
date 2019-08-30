const trc = require('../db/trc');
const crawler = require('../db/crawler');

class Video {
	constructor(props) {
		this.id = props.id;
		this.pub_video_id = props.pub_video_id;
		this.publisher_name = props.name;
		this.url = props.url;
		this.thumbnail_url = props.thumbnail_url;
		this.is_recommendable = props.is_recommendable;
		this.publisher_id = props.publisher_id;
		this.category = props.channel;
		this.create_time = props.create_time;
		this.uploader = props.uploader;
		this.external_data = props.external_data;
	}

	async getCrawlerInfo() {
		const res = await crawler.query(
			`SELECT * FROM crawler.audit WHERE publisher = ? AND pub_item_id = ?`,
			[this.publisher_name, this.pub_video_id]
		);

		this.setCrawlerAuditData(res[0]);
		return this.crawlerAuditData;
	}

	setCrawlerAuditData(crawlerAuditData) {
		this.crawlerAuditData = crawlerAuditData;
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

		return results.map(res => new Video(res));
	}
}

async function print() {
	const videos = await Video.fromPubId(1009903);
	await videos[0].getCrawlerInfo();
	console.log(videos[0]);
	return videos[0];
}

print();
