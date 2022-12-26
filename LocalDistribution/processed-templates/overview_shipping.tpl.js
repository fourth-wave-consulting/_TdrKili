define('overview_shipping.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div data-view=\"Address.Details\" class=\"overview-shipping-card-content\"></div><a class=\"overview-shipping-card-button-edit\" href=\"/addressbook/"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"shippingAddressInternalid") || (depth0 != null ? compilerNameLookup(depth0,"shippingAddressInternalid") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"shippingAddressInternalid","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"show-in-modal\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Edit",{"name":"translate","hash":{},"data":data}))
    + "</a> ";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"overview-shipping-card-content\"><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"We have no default address on file for this account.",{"name":"translate","hash":{},"data":data}))
    + "</p></div><a href=\"/addressbook/new\" class=\"overview-shipping-card-button-edit\" data-toggle=\"show-in-modal\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Create New Address",{"name":"translate","hash":{},"data":data}))
    + "</a> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <article class=\"overview-shipping\"><div class=\"overview-shipping-header\"><h4>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(alias1,"Shipping",{"name":"translate","hash":{},"data":data}))
    + "</h4></div><section class=\"overview-shipping-card\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasDefaultShippingAddress") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " </section></article>  ";
},"useData":true}); template.Name = 'overview_shipping'; return template;});