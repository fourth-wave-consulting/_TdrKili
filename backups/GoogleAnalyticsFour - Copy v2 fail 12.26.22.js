/*
  Google Analytics 4 conversion & page tracking module. Built by Fourth Wave Consulting Dec 2022.
   License 		THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *			EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 *			MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
 *			THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 *			SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
 *			OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 *			HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 *			TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *			SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

//@module GoogleAnalyticsFour
(function (win, name)
{
	'use strict';
	// [Google Universal Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
	// We customized the tracking default start script so it doesn't loads analytics.js
	// (Tracking Start)[https://developers.google.com/analytics/devguides/collection/analyticsjs/#quickstart]

	//win.gtag =
	/* don't think we need this - from GUA module
	win.GoogleAnalyticsObject = name;
	win[name] = win[name] || function ()
	{
		(win[name].q = win[name].q || []).push(arguments);
	};
	win[name].l = 1 * new Date();
*/

	//@class googleAnalyticsFour @extends ApplicationModule
	// ------------------
	// Loads google analytics script and extends application with methods:
	// * trackPageview
	// * trackEvent
	// * trackTransaction
	// Also wraps layout's showInModal
	define('GoogleAnalyticsFour'
		,	[	'Tracker'
			,	'underscore'
			,	'jQuery'
			,	'Backbone'
			,	'Utils'
			,	'SC.Configuration'
		]
		,	function (
			Tracker
			,	_
			,	jQuery
			,	Backbone
			,	Utils
			,	Configuration
		)
		{

		var GoogleAnalyticsFour = {

			trackPageview: function (url)
			{
				if (_.isString(url))
				{
					// [Page Tracking] https://support.google.com/analytics/answer/11403294?hl=en#zippy=%2Cglobal-site-tag-websites
					//gtag('js', new Date());
/*
					gtag('config', this.propertyID, {
						'debug_mode':true,
						page_location: url // Include the full URL
					});
 */					//manual event:
					gtag('event', 'page_view', {
						page_location: url, // Include the full URL
						send_to: this.propertyID
					});
					console.log('GA4 pageview: ' + url);
				}
				return this;
			}
		,	trackEvent: function (event)
			{
				if (event && event.category && event.action)
				{
					// [Event Tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events#implementation)
					/*
					win[name]('send', 'event', event.category, event.action, event.label, parseFloat(event.value) || 0, {
						'hitCallback': event.callback
					});

					 */
					console.log('GUA firing event: ' +event.category);
				}

				return this;
			}


			// Based on the created SalesOrder we trigger each of the analytics
			// ecommerce methods passing the required information
			// [Ecommerce Tracking](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm)
		,	trackTransaction: function (order)
			{
				console.log('GA4 trackTrans start');
				if (order && order.get('confirmation')) {
					dataLayer.push({ecommerce: null});  // Clear the previous ecommerce object.
					var transaction_id = order.get('confirmation').confirmationnumber
					,	order_summary = order.get('summary')
					,	item = null;

					var self = this;
					var eventName = 'purchase';
					var eventData = {
						id: transaction_id,
						affiliation: SC.ENVIRONMENT.siteSettings.displayname,
						revenue: order_summary.subtotal,
						subtotal: order_summary.subtotal,
						tax: order_summary.taxtotal,
						shipping: order_summary.shippingcost + order_summary.handlingcost,
						items: []
				};

					/*
					_.each(transaction.get('promocodes'), function(promo: any) {
						eventData.coupon.push(promo.code);
					});
					 */

					console.log('initial eventData: '+ JSON.stringify(eventData));

					order.get('lines').each(function (line) {
						item = line.get('item');

						console.log(' get lines: ' +
							'item_id: ' + item.get('_id') +
							'affiliation: ' + SC.ENVIRONMENT.siteSettings.displayname +
							'sku: ' + item.get('_sku') +
							'name: ' + item.get('_name') +
							'category: ' + item.get('_category') +
							'price: ' + line.get('rate') +
							'quantity: ' + line.get('quantity')
						);
						eventData.items.push({
							item_id: item.get('_id'),
							item_name: item.get('_sku'),
							affiliation: SC.ENVIRONMENT.siteSettings.displayname,
							currency: 'USD',
							item_category: item.get('_category') || '',
							price: line.get('rate'),
							quantity: line.get('quantity')
						});

					});
					console.log('final eventData: '+ JSON.stringify(eventData));
					// send actual trans request
					gtag('event', 'purchase', eventData);
					return this;
				} else {
					console.log('GA4 error -something is missing. ' + JSON.stringify(Order.get('summary')));
				}
			}

		,	setAccount: function (config)
			{
				if (config && _.isString(config.propertyID) && _.isString(config.domainName))
				{
					// [Multiple Trackers on The Same Domain](https://developers.google.com/analytics/devguides/collection/analyticsjs/domains#multitrackers)
					/*
					win[name]('create', config.propertyID, {
						'cookieDomain': config.domainName
					,	'allowLinker': true
					});

					 */

					console.log('GA4 setting account: '+ config.propertyID);
					this.propertyID = config.propertyID;
					this.domainName = config.domainName;
					this.domainNameSecure = config.domainNameSecure | 'netsuite.com';
					// initialize tracker
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					// set up cross domain
					gtag('set', 'linker', {
						'domains': [config.domainName, config.domainNameSecure],
						'decorate_forms': true
					});
					gtag('js', new Date());
					gtag('config', config.propertyID);
				}

				return this;
			}
		,	loadScript: function ()
			{
				// var tracking = application.getConfig('tracking.GoogleAnalyticsFour'); says getConfig is not a function
				console.log('GA4 loadscript starting: ' + this.propertyID);
				return SC.ENVIRONMENT.jsEnvironment === 'browser' && jQuery.getScript('https://www.googletagmanager.com/gtag/js?' + 'id=' + this.propertyID);
			}

		,	mountToApp: function (application)
			{
				var tracking = application.getConfig('tracking.GoogleAnalyticsFour');

				// if track page view needs to be tracked
				if (tracking && tracking.propertyID)
				{
					//console.log('GA4 mount to app: ' + tracking.propertyID);
					// we get the account and domain name from the configuration file
					GoogleAnalyticsFour.setAccount(tracking);

					application.trackers && application.trackers.push(GoogleAnalyticsFour);

					// the analytics script is only loaded if we are on a browser
					application.getLayout().once('afterAppendView', jQuery.proxy(GoogleAnalyticsFour, 'loadScript'));
				}
			}
		};

		return GoogleAnalyticsFour;
	});
})(window, 'gtag');
