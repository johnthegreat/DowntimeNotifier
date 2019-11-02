/*
 * MIT License
 * 
 * Copyright (c) 2019 John Nahlen (john.nahlen@gmail.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const axios = require('axios');
const moment = require('moment');
const schedule = require('node-schedule');
const _ = require('lodash');

const sendMessageTo = require('./sendMessageTo');

/**
 * @param {SiteCheck} siteCheck
 */
const scheduleSiteCheck = function (siteCheck) {
	let throttledSendMessageTo = _.throttle(function (to, body) {
		sendMessageTo(to, body);
	}, siteCheck.sendThrottle);

	let job = schedule.scheduleJob(siteCheck.cronString, async function () {
		let now = moment.utc().format('YYYY-MM-DD HH:mm:ss');
		axios.get(siteCheck.url)
			.then(function (response) {
				// handle success
				console.log('[' + now + ' UTC]: Site is online.');
			})
			.catch(function (error) {
				// handle error
				console.log('[' + now + ' UTC]: Site is offline with status code: ', error.response.status);
				//console.log(error);

				throttledSendMessageTo(siteCheck.phoneNumber, siteCheck.message);
			});
	});
	return job;
};
module.exports = scheduleSiteCheck;
