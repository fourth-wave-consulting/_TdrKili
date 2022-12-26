define('product_views_price.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isPriceRange") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <span class=\"product-views-price-range\" itemprop=\"offers\" itemscope itemtype=\"https://schema.org/AggregateOffer\"><meta itemprop=\"priceCurrency\" content=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"currencyCode") || (depth0 != null ? compilerNameLookup(depth0,"currencyCode") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"currencyCode","hash":{},"data":data}) : helper)))
    + "\"/><span class=\"product-views-price-lead\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"<span itemprop=\"lowPrice\" data-rate=\"$(0)\" >$(1)</span> to <span itemprop=\"highPrice\" data-rate=\"$(2)\">$(3)</span>",(depth0 != null ? compilerNameLookup(depth0,"minPrice") : depth0),(depth0 != null ? compilerNameLookup(depth0,"minPriceFormatted") : depth0),(depth0 != null ? compilerNameLookup(depth0,"maxPrice") : depth0),(depth0 != null ? compilerNameLookup(depth0,"maxPriceFormatted") : depth0),{"name":"translate","hash":{},"data":data}))
    + " </span> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showComparePrice") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <link itemprop=\"availability\" href=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isInStock") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\"/></span> ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <small class=\"product-views-price-old\"> "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"comparePriceFormatted") || (depth0 != null ? compilerNameLookup(depth0,"comparePriceFormatted") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comparePriceFormatted","hash":{},"data":data}) : helper)))
    + " </small> ";
},"5":function(container,depth0,helpers,partials,data) {
    return "https://schema.org/InStock";
},"7":function(container,depth0,helpers,partials,data) {
    return "https://schema.org/OutOfStock";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <span class=\"product-views-price-exact\" itemprop=\"offers\" itemscope itemtype=\"https://schema.org/Offer\"><meta itemprop=\"priceCurrency\" content=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"currencyCode") || (depth0 != null ? compilerNameLookup(depth0,"currencyCode") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyCode","hash":{},"data":data}) : helper)))
    + "\"/><span class=\"product-views-price-lead\" itemprop=\"price\" data-rate=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"price") || (depth0 != null ? compilerNameLookup(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "\"> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"priceFormatted") || (depth0 != null ? compilerNameLookup(depth0,"priceFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"priceFormatted","hash":{},"data":data}) : helper)))
    + " </span> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showComparePrice") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <link itemprop=\"availability\" href=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isInStock") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\"/></span> ";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showHighlightedMessage") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"12":function(container,depth0,helpers,partials,data) {
    return " <div class=\"product-views-price-login-to-see-prices-highlighted\"><p class=\"product-views-price-message\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Please <a href=\"$(0)\">log in</a> to see price or purchase this item",(depth0 != null ? compilerNameLookup(depth0,"urlLogin") : depth0),{"name":"translate","hash":{},"data":data}))
    + " </p></div> ";
},"14":function(container,depth0,helpers,partials,data) {
    return " <div class=\"product-views-price-login-to-see-prices\"><p class=\"product-views-price-message\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<a href=\"$(0)\">Log in</a> to see price",(depth0 != null ? compilerNameLookup(depth0,"urlLogin") : depth0),{"name":"translate","hash":{},"data":data}))
    + " </p></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"product-views-price\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isPriceEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + " </div>  ";
},"useData":true}); template.Name = 'product_views_price'; return template;});