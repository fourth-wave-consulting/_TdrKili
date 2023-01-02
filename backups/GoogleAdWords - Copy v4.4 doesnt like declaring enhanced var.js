/*
	© 2021 Fourth Wave Consulting, LLC.
 * License 		THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *			EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 *			MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
 *			THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 *			SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
 *			OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 *			HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 *			TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *			SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// @module GoogleAdWords
// Adds GoogleAdWords tracking pixel on the checkout confirmation page.
define('GoogleAdWords'
	,	[	'Tracker'
		,	'jQuery'
		,'Profile.Model'
	]
	,	function (
		Tracker
		,	jQuery
		, ProfileModel
	)
	{
		'use strict';

		// @lass GoogleAdWords Adds GoogleAdWords tracking pixel on the checkout confirmation page. @extends ApplicationModule
		var GoogleAdWords = {
			// Saves the configuration to be later used on the track transaction.
			setAccount: function (config)
			{
				this.config = config;

				return this;
			}

			, enforcePhoneNumberPattern: function (phoneToFix) {
				/*
				 * Convert string to match E.164 phone number pattern (e.g. +1234567890),
				 * otherwise return empty string.
				 */
				var newString = phoneToFix.match(/[0-9]{0,14}/g);

				if (newString === null) {
					return '';
				}
				// Join parts returned from RegEx match
				newString = newString.join('');

				// Start number with "+"
				newString = '+' + newString;

				// Limit length to 15 characters
				newString = newString.substring(0, 15);

				return newString;
			}
			,	trackPageview: function (url)
			{
				if (_.isString(url))
				{
					// this is just fixing the enhanced conversion data variable
					//console.log('Ads pageview firing: ' + url);
					
					var profile_model = ProfileModel.getInstance();
					//console.log('profile_model: ' + JSON.stringify(profile_model));
					// copy to a string then eval to a regular array so I can use it normally
					var profileModelStr = String(JSON.stringify(profile_model));
					// console.log('profileModelStr: ' + typeof(profileModelStr) + ' and data: ' + profileModelStr);
					var profileModelArr = JSON.parse(profileModelStr);
					console.log('profileModelArr: ' + typeof(profileModelArr) + ' and data: ' + JSON.stringify(profileModelArr));

					//console.log('just addy zero: ' + profileModelArr['addresses'][0]['defaultshipping']); this works
					var fwcEmail = profile_model.get('email');
					//console.log('pageview fwcEmail: ' + fwcEmail);
					enhanced_conversion_data.fwcEmail = fwcEmail;
					/*
					var fwcFirstname = profile_model.get('firstname');
					var fwcLastname = profile_model.get('lastname');


					var PMAddresses = profileModelArr['addresses'];
					console.log('number of addresses: ' + PMAddresses.length);
					for (var z=0; z < PMAddresses.length; z++) {
						console.log('is default shipping? ' + PMAddresses[z]['defaultshipping']);
						if (PMAddresses[z]['defaultshipping'] == 'T') {
							var fwcStreetAddy = PMAddresses[z]['addr1'];
							var fwcCity = PMAddresses[z]['city'];
							var fwcRegion = PMAddresses[z]['state'];
							var fwcZip = PMAddresses[z]['zip'];
							var fwcCountry = PMAddresses[z]['country'];
						}
					}
				console.log('FINAL adwords EM data. email: ' + fwcEmail + ' phone: ' + fwcPhone + ' firstname: ' + fwcFirstname + ' lastname: ' + fwcLastname + ' addr1: ' + fwcStreetAddy + ' city: ' + fwcCity + ' state: ' + fwcRegion + ' zip: ' + fwcZip +  ' and country: ' + fwcCountry);

					var fwcPhone = profile_model.get('phone');
					//convert phone to E.164 format
					if (fwcCountry == 'US' || fwcCountry == 'CA') {
						// add 1 to phone before converting it to E.164 format
						fwcPhone = "1".concat(fwcPhone);
						var newPhone = GoogleAdWords.enforcePhoneNumberPattern(fwcPhone);
						console.log('newPhone: '+ newPhone);
					}
					*/

				}

				return this;
			}

			,	trackTransaction: function (transaction)
			{
				var config = GoogleAdWords.config;
				console.log('adwords track transaction running');
				if (transaction && transaction.get('confirmationNumber'))
				{
					/*
					if (typeof(enhanced_conversion_data) == 'undefined') {
						//create global var if missing
						console.log('ecd var empty, creating');
						var enhanced_conversion_data = new Array();
					}

					 */
					//get data from Profile.Model
					var profile_model = ProfileModel.getInstance();
					// copy to a string then eval to a regular array so I can use it normally
					var profileModelStr = String(JSON.stringify(profile_model));
					var profileModelArr = JSON.parse(profileModelStr);
					console.log('profileModelArr: ' + typeof(profileModelArr) + ' and data: ' + JSON.stringify(profileModelArr));
					enhanced_conversion_data.fwcEmail = profile_model.get('email');
					enhanced_conversion_data.fwcFirstname = profile_model.get('firstname');
					enhanced_conversion_data.fwcLastname = profile_model.get('lastname');

					//get default shipping address
					var PMAddresses = profileModelArr['addresses'];
					console.log('number of addresses: ' + PMAddresses.length);
					for (var z=0; z < PMAddresses.length; z++) {
						console.log('is default shipping? ' + PMAddresses[z]['defaultshipping']);
						if (PMAddresses[z]['defaultshipping'] == 'T') {
							enhanced_conversion_data.fwcStreetAddy = PMAddresses[z]['addr1'];
							enhanced_conversion_data.fwcCity = PMAddresses[z]['city'];
							enhanced_conversion_data.fwcRegion = PMAddresses[z]['state'];
							enhanced_conversion_data.fwcZip = PMAddresses[z]['zip'];
							enhanced_conversion_data.fwcCountry = PMAddresses[z]['country'];
						}
					}


					var fwcPhone = profile_model.get('phone');
					//convert phone to E.164 format
					if (enhanced_conversion_data.fwcCountry == 'US' || enhanced_conversion_data.fwcCountry == 'CA') {
						// add 1 to phone before converting it to E.164 format for USA and Canada
						fwcPhone = "1".concat(fwcPhone);
					}
					var newPhone = GoogleAdWords.enforcePhoneNumberPattern(fwcPhone);
					console.log('newPhone: '+ newPhone);
					enhanced_conversion_data.FWCPhone = newPhone;


					//console.log('FINAL adwords EM data. email: ' + fwcEmail + ' phone: ' + newPhone + ' firstname: ' + fwcFirstname + ' lastname: ' + fwcLastname + ' addr1: ' + fwcStreetAddy + ' city: ' + fwcCity + ' state: ' + fwcRegion + ' zip: ' + fwcZip +  ' and country: ' + fwcCountry);
					console.log('FINAL enhanced_conversion_data: ' + JSON.stringify(enhanced_conversion_data));

					var transaction_id = transaction.get('confirmationNumber')
						,	order_subtotal = transaction.get('subTotal');
					console.log('adwords tt IS firing. trans object:' + JSON.stringify(transaction));
					// send conversion request
					gtag('event', 'conversion', {
						'send_to': config.id + '/' + config.label,
						'value': order_subtotal,
						'currency': 'USD',
						'transaction_id': transaction_id
					});
				} else {
					console.log('adwords tt not firing. order conf:' + JSON.stringify(transaction));
				}


				return this;
			}

			,	mountToApp: function (application)
			{
				GoogleAdWords.application = application;
				var tracking = application.getConfig('tracking.googleAdWordsConversion');
				//console.log('tracking obj:' + JSON.stringify(tracking));
				// Required tracking attributes to generate the pixel url
				if (tracking && tracking.id && tracking.label)
				{
					GoogleAdWords.setAccount(tracking);

					Tracker.getInstance().trackers.push(GoogleAdWords);
				} else {
					console.log('adwords not mounting! tracking.id: ' + tracking.id + ' and label: ' + tracking.label);
				}
			}

		};

		return GoogleAdWords;
	});
