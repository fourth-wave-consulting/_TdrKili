define('overview_payment.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div data-view=\"CreditCard.View\"></div><a class=\"overview-payment-card-button-edit\" href=\"/creditcards/"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"creditCardInternalid") || (depth0 != null ? compilerNameLookup(depth0,"creditCardInternalid") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"creditCardInternalid","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"show-in-modal\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Edit",{"name":"translate","hash":{},"data":data}))
    + "</a> ";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"overview-payment-card-content\"><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"We have no default credit card on file for this account.",{"name":"translate","hash":{},"data":data}))
    + "</p></div><a href=\"/creditcards/new\" class=\"overview-payment-card-button-edit\" data-toggle=\"show-in-modal\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Add a Credit Card",{"name":"translate","hash":{},"data":data}))
    + "</a> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <article class=\"overview-payment\"><div class=\"overview-payment-header\"><h4>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(alias1,"Payment",{"name":"translate","hash":{},"data":data}))
    + "</h4></div><section class=\"overview-payment-card\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasDefaultCreditCard") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " </section></article>  ";
},"useData":true}); template.Name = 'overview_payment'; return template;});