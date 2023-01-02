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

			,	trackPageview: function (url)
			{
				if (_.isString(url))
				{
					// this is just fixing the enhanced conversion data variable
					console.log('Ads pageview firing: ' + url);
					
					var profile_model = ProfileModel.getInstance();
					console.log('profile_model: ' + JSON.stringify(profile_model));
					var fwcPhone = profile_model.get('phone');
					//convert phone to E.164 format

					var fwcEmail = profile_model.email;
					console.log('fwcEmail: ' + fwcEmail);
					var fwcFirstname = profile_model.get('firstname');
					var fwcLastname = profile_model.get('lastname');


					// var fwcAddress = profile_model.get('addresses').get(this.model.get('shipaddress')); // fails
					var fwcAddress = profile_model.get('addresses');
					console.log('fwcAddress length: ' + fwcAddress.length + ' and jSON: ' + JSON.stringify(fwcAddress));
					var fwcAddy2 = JSON.parse(JSON.stringify(fwcAddress));
					console.log('fwcAddy2 with zero: ' + fwcAddy2[0]);

					// or can use profile_model.phone or profile_model.altphone
					//console.log('just addy zero: ' + fwcAddress[0]['defaultshipping']);
					/*
					for (var z=0; z<fwcAddress.length; z++) {
						console.log('is default shipping?' + fwcAddress[z]['defaultshipping']);
						if (fwcAddress[z]['defaultshipping']) {
							var fwcStreetaddy = fwcAddress[z]['addr1'];
							var fwcCity = fwcAddress[z]['city'];
							var fwcRegion = fwcAddress[z]['state'];
							var fwcZip= fwcAddress[z]['zip'];
							var fwcCountry = fwcAddress[z]['country'];
						}
					}
				console.log('FINAL adwords EM data. email: ' + fwcEmail + ' firstname: ' + fwcFirstname + ' lastname: ' +
				fwcLastname + ' addr1: ' + fwcStreetaddy + ' city: ' + fwcCity + ' state: ' + fwcRegion + ' zip: ' +
				fwcZip +  ' and country: ' + fwcCountry);
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
					console.log(' fwcEmail : ' + fwcEmail );
					console.log(' fwcPhone  : ' + fwcPhone  );

					var enhanced_conversion_data = {
						"email": fwcEmail,
						"phone_number": fwcPhone,
					}


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
