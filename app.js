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
const moment = require('moment');
const SiteCheck = require('./SiteCheck');
const scheduleSiteCheck = require('./scheduleSiteCheck');


//
// Add Site Checks here.
//

let examplecomSiteCheck = new SiteCheck();
// Refer to https://github.com/node-schedule/node-schedule
// Currently set to every hour on the hour.
examplecomSiteCheck.cronString = '0 0 * * * *';
// URL to check
examplecomSiteCheck.url = 'http://example.com/';
// E164-formatted phone number
examplecomSiteCheck.phoneNumber = '+11234567890';
// Message to send if site appears to be down
examplecomSiteCheck.message = 'http://example.com/ site appears to be down.';
// Maximum frequency to send messages (ms).
examplecomSiteCheck.sendThrottle = 1000 * 60 * 30;

let j0 = scheduleSiteCheck(examplecomSiteCheck);
console.log('Job scheduled for ' + moment.utc(j0.nextInvocation().toDate()).format("YYYY-MM-DD HH:mm:ss") + " UTC.");
