/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module SC
// @class SC.Configuration
// All of the applications configurable defaults

define(
	'SC.Configuration'
,	[
		'underscore'
	,	'jQuery'
	]

,	function (
		_
	,	jQuery
	)
{

	'use strict';
	var baseConfiguration = SC.CONFIGURATION || {};

	var Configuration = {

		// @property {String} defaultSearchUrl
		// defaultSearchUrl: 'search'

		/* templates: {
			itemOptions: {
				// each apply to specific item option types
				selectorByType:
				{
					select: item_views_option_tile_tpl
				,	'default': item_views_option_text_tpl
				}
				// for rendering selected options in the shopping cart
			,	selectedByType: {
					'default': item_views_selected_option_tpl
				}
			}
		} */

		// @param {Object} searchApiMasterOptions options to be passed when querying the Search API
	/*,	searchApiMasterOptions: {

			Facets: {
				include: 'facets'
			,	fieldset: 'search'
			}

		,	itemDetails: {
				include: 'facets'
			,	fieldset: 'details'
			}

		,	relatedItems: {
				fieldset: 'relateditems_details'
			}

		,	correlatedItems: {
				fieldset: 'correlateditems_details'
			}

			// don't remove, get extended
		,	merchandisingZone: {}

		,	typeAhead: {
				fieldset: 'typeahead'
			}
		}*/

		// Analytics Settings
		// You need to set up both popertyID and domainName to make the default trackers work
	/*,	tracking: {
			// [Google Universal Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
			googleUniversalAnalytics: {
				propertyID: ''
			,	domainName: ''
			}
			// [Google Analytics](https://developers.google.com/analytics/devguides/collection/gajs/)
		,	google: {
				propertyID: ''
			,	domainName: ''
			}
			// [Google AdWords](https://support.google.com/adwords/answer/1722054/)
		,	googleAdWordsConversion: {
				id: 0
			,	value: 0
			,	label: ''
			}
		}*/

		// @property {Object} imageSizeMapping map of image custom image sizes
		// usefull to be customized for smaller screens
	/*,	imageSizeMapping: {
			thumbnail: 'thumbnail' // 175 * 175
		,	main: 'main' // 600 * 600
		,	tinythumb: 'tinythumb' // 50 * 50
		,	zoom: 'zoom' // 1200 * 1200
		,	fullscreen: 'fullscreen' // 1600 * 1600
		}
		// @property {String} imageNotAvailable url for the not available image
	,	imageNotAvailable: _.getAbsoluteUrl('img/no_image_available.jpeg')*/

		// @property {Array} paymentmethods map of payment methods, please update the keys using your account setup information.

	/*,	paymentmethods: [
			{
				key: '5,5,1555641112' //'VISA'
			,	regex: /^4[0-9]{12}(?:[0-9]{3})?$/
			}
		,	{
				key: '4,5,1555641112' //'Master Card'
			,	regex: /^5[1-5][0-9]{14}$/
			}
		,	{
				key: '6,5,1555641112' //'American Express'
			,	regex: /^3[47][0-9]{13}$/
			}
		,	{
				key: '3,5,1555641112' // 'Discover'
			,	regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/
			}
		,	{
				key: '16,5,1555641112' // 'Maestro'
			,	regex: /^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/
			}
		,	{
				key: '17,3,1555641112' // External
			,	description: 'This company allows both private individuals and businesses to accept payments over the Internet'
			}
		]*/

		siteSettings: SC && SC.ENVIRONMENT && SC.ENVIRONMENT.siteSettings || {}

	/*
		// @property {Boolean} autoPopulateNameAndEmail. If true, first name last name will be automatically fill in the next checkout steps when applicable.
	,	autoPopulateNameAndEmail: true

	,	forms: {
			loginAsGuest: {
					// @property {Boolean} showName. If true, first name and last name will be shown in registered as guest form otherwise fields will be hidden.
					// note: if showName is false setting will be ignored (false) and fields will not automatically populated.
					showName: false
					// @property {Boolean} showEmail. If true, email input field will be shown in registered as guest form otherwise this field will be hidden.
				,	showEmail: true
			}
		,	address: {
				// @property {Boolean} showAddressLine2. If true, Secondary Address will be shown in address form, otherwise will be hide.
				showAddressLine2: true
			}
		}
	*/

	,	get: function (path, defaultValue)
		{
			return _.getPathFromObject(this, path, defaultValue);
		}

	,	getRegistrationType: function ()
		{
			if (Configuration.get('siteSettings.registration.registrationmandatory') === 'T')
			{
				// no login, no register, checkout as guest only
				return 'disabled';
			}
			else
			{
				if (Configuration.get('siteSettings.registration.registrationoptional') === 'T')
				{
					// login, register, guest
					return 'optional';
				}
				else
				{
					if (Configuration.get('siteSettings.registration.registrationallowed') === 'T')
					{
						// login, register, no guest
						return 'required';
					}
					else
					{
						// login, no register, no guest
						return 'existing';
					}
				}
			}
		}
	};

	// Append Product Lists configuration
	/*_.extend(Configuration, {
		product_lists: SC.ENVIRONMENT.PRODUCTLISTS_CONFIG
	});
	*/
	// Append Cases configuration
	_.extend(Configuration, {
		cases: {
			config: SC.ENVIRONMENT.CASES_CONFIG
		,	enabled: SC.ENVIRONMENT.casesManagementEnabled
		}
	});

	/*// Append Bronto Integration configuration
	_.extend(Configuration, {
		bronto: {
			accountId: ''
		}
	});*/
	jQuery.extend(true, baseConfiguration, Configuration);

	//BACKWARDS COMPATIBILITY: all the following is a normalization to the object baseConfiguration to guarantee backguard compatibility with pre montblanc in the sense of configuration property names in application.getConfig('foo')

	//fixing some properties for backward compatibility w montblanc:
	var imageSizeMapping = {};
	_.each(baseConfiguration.imageSizeMapping, function(item)
	{
		imageSizeMapping[item.id] = item.value;
	});
	baseConfiguration.imageSizeMapping = imageSizeMapping;

	var searchApiMasterOptions = {};
	_.each(baseConfiguration.searchApiMasterOptions, function(item)
	{
		searchApiMasterOptions[item.id] = {
			fieldset: item.fieldset
		,	include: item.include
		};
	});
	baseConfiguration.searchApiMasterOptions = searchApiMasterOptions;
	//social sharing backward compatibility
	var addThisOptions = {};
	_.each(baseConfiguration.addThis && baseConfiguration.addThis.options, function(item)
	{
		addThisOptions[item.key] = item.value;
	});
	baseConfiguration.addThis && (baseConfiguration.addThis.options = addThisOptions);
	var addThisServicesToShow = {};
	_.each(baseConfiguration.addThis && baseConfiguration.addThis.servicesToShow, function(item)
	{
		addThisServicesToShow[item.key] = item.value;
	});
	baseConfiguration.addThis && (baseConfiguration.addThis.servicesToShow = addThisServicesToShow);

	_.each(baseConfiguration.paymentmethods, function(item)
	{
		try
		{
			item.regex = new RegExp(item.regex);
		}
		catch(ex)
		{

		}
	});

	if(baseConfiguration.productReviews && baseConfiguration.productReviews.sortOptions)
	{
		_.each(baseConfiguration.productReviews.sortOptions, function(sortOptions)
		{
			try
			{
				sortOptions.params = JSON.parse(sortOptions.params || '{}') || {};
			}
			catch(ex)
			{

			}
		});
	}
	if (baseConfiguration.productReviews && baseConfiguration.productReviews.filterOptions)
	{
		_.each(baseConfiguration.productReviews.filterOptions, function (filterOptions)
		{
			try
			{
				filterOptions.params = JSON.parse(filterOptions.params || '{}') || {};
			}
			catch(ex)
			{

			}
		});
	}

	//ordering facets array according to priority property
	baseConfiguration.facets = baseConfiguration.facets || [];
	baseConfiguration.facets.sort(function (facet1, facet2)
	{
		return facet1.priority > facet2.priority ? 0 : 1;
	});
	//Make of facet color property a object with the color name as
	//the property and the color value as the value of the property.
	function getColorPalette(colorPaletteName)
	{
		var colors = {};
		//empty colorPaletteName is not allowed
		if (!colorPaletteName)
		{
			return colors;
		}
		_.each(baseConfiguration.facetsColorPalette, function(item)
		{
			if(item.paletteId === colorPaletteName)
			{
				colors[item.colorName] = item.colorValue;
			}
		});
		return colors;
	}
	_.each(baseConfiguration.facets, function(facet)
	{
		facet.colors = getColorPalette(facet.colors);
	});
	//Make of itemOptions color property a object with the color name as
	//the property and the color value as the value of the property.
	_.each(baseConfiguration.itemOptions, function(itemOption)
	{
		itemOption.colors = getColorPalette(itemOption.colors);
	});

	//extraTranslations
	var currentLocale = SC && SC.ENVIRONMENT && SC.ENVIRONMENT.currentLanguage && SC.ENVIRONMENT.currentLanguage.locale;
	_.each(baseConfiguration.extraTranslations, function (item)
	{
		if (item[currentLocale])
		{
			SC.Translations[item.key] = item[currentLocale];
		}
	});



	/*//navigation data
	baseConfiguration.navigationData = baseConfiguration.navigationData || [];

	// navigation hierarchy bindings.
	_.each(baseConfiguration.navigationData, function (entry)
	{
		if (!entry)
		{
			return;
		}
		else
		{
			entry.class = 'header-menu-level' + entry.level + '-anchor';
		}
		if (entry.parentId)
		{
			var parent = _.find(baseConfiguration.navigationData, function (e)
			{
				return e.id===entry.parentId;
			});
			parent = parent || {};
			parent.categories = parent.categories || [];
			parent.categories.push(entry);
		}
		if (entry.classnames)
		{
			entry.class += ' ' + entry.classnames;
		}
	});
	// Now, remove  non top level nav entries from the array (root nodes)
	// heads up ! we have to re-iterate :( this is the correct way of deleting and iterating an array - not _.each()
	for (var i = 0; i < baseConfiguration.navigationData.length; i++)
	{
		var entry = baseConfiguration.navigationData[i];
		if(!entry || entry.level > 1)
		{
			baseConfiguration.navigationData.splice(i, 1);
			i--;
		}
	}
	*/
	//dummy categories - to be removed:
	/*var navigationDummyCategories = [
		{
			text: _('Jeans').translate()
		,	href: '/search'
		,	'class': 'header-menu-level3-anchor'
		,	data: {
				touchpoint: 'home'
				, hashtag: '#search'
			}
		},
		{
			text: _('Sweaters').translate()
		,	href: '/search'
		,	'class': 'header-menu-level3-anchor'
		,	data: {
				touchpoint: 'home'
			,	hashtag: '#search'
			}
		},
		{
			text: _('Cardigan').translate()
		,	href: '/search'
		,	'class': 'header-menu-level3-anchor'
		,	data: {
				touchpoint: 'home'
			,	hashtag: '#search'
			}
		},
		{
			text: _('Active').translate()
		,	href: '/search'
		,	'class': 'header-menu-level3-anchor'
		,	data: {
				touchpoint: 'home'
			,	hashtag: '#search'
			}
		},
		{
			text: _('Shoes').translate()
		,	href: '/search'
		,	'class': 'header-menu-level3-anchor'
		,	data: {
				touchpoint: 'home'
			,	hashtag: '#search'
			}
		}
	];

	baseConfiguration.navigationData.push(
		{
			text: _('Categories').translate()
		,	href: '/search'
		,	'class': 'header-menu-level1-anchor'
			// @property {Array<NavigationData>} categories
		,	categories: [
				{
					text: _('Men').translate()
				,	href: '/search'
				,	'class': 'header-menu-level2-anchor'
				,	categories: navigationDummyCategories
				}
			,	{
					text: _('Woman').translate()
				,	href: '/search'
				,	'class': 'header-menu-level2-anchor'
				,	categories: navigationDummyCategories
				}
			,	{
					text: _('Child').translate()
				,	href: '/search'
				,	'class': 'header-menu-level2-anchor'
				,	categories: navigationDummyCategories
				}
			,	{
					text: _('Other').translate()
				,	href: '/search'
				,	'class': 'header-menu-level2-anchor'
				,	categories: navigationDummyCategories
				}
			]
		}
	,	{
		text: _('Other title').translate()
		,	href: '/search'
		,	'class': 'header-menu-level1-anchor'
		,	categories: [
				{
					text: _('Men').translate()
				,	href: '/search'
				,	'class': 'header-menu-level2-anchor'
				,	categories: navigationDummyCategories
				}
			,	{
					text: _('Woman').translate()
				,	href: '/search'
				,	'class': 'header-menu-level2-anchor'
				,	categories: navigationDummyCategories
				}
			,	{
					text: _('Child').translate()
				,	href: '/search'
				,	'class': 'header-menu-level2-anchor'
				,	categories: navigationDummyCategories
				}
			,	{
					text: _('Other').translate()
				,	href: '/search'
				,	'class': 'header-menu-level2-anchor'
				,	categories: navigationDummyCategories
				}
			]
    });
*/


	return baseConfiguration;
});
