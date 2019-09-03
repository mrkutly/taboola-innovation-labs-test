class Audit {
	/**
	 * @param {Object} params - contains all of the data from crawler.audit
	 *
	 */
	constructor(params) {
		this.id = params.id;
		this.first_successful_processing = params.first_successful_processing;
		this.last_successful_processing = params.last_successful_processing;
		this.last_upload = params.last_upload;
		this.error_message = params.error_message;
		this.nonrecommendable_reason = params.nonrecommendable_reason;
		this.create_time = params.create_time;
		this.update_time = params.update_time;
		this.first_fe_reported_time = params.first_fe_reported_time;
		this.first_queue_time = params.first_queue_time;
		this.first_attempted_crawl_time = params.first_attempted_crawl_time;
		this.first_fe_reported_loaded_time = params.first_fe_reported_loaded_time;
		this.source = params.source;
		this.last_crawl_reason = params.last_crawl_reason;
		this.first_nonrecommendable_time = params.first_nonrecommendable_time;
	}
}

module.exports = Audit;
