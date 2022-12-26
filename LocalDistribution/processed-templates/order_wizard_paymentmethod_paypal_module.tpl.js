define('order_wizard_paymentmethod_paypal_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <p> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"You have selected to pay using PayPal as your payment method.",{"name":"translate","hash":{},"data":data}))
    + " </p><p> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"To review your order, click the \"Continue\" button below.",{"name":"translate","hash":{},"data":data}))
    + " </p> ";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <p> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Please select the \"Continue To PayPal\" button below to sign in into your PayPal account.",{"name":"translate","hash":{},"data":data}))
    + " </p><p> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"You will be redirected to PayPal, but will have an opportunity to review your order back on our site before purchasing.",{"name":"translate","hash":{},"data":data}))
    + " </p> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"order-wizard-paymentmethod-paypal-module-row\"><div class=\"order-wizard-paymentmethod-paypal-module-column-left\"><img class=\"order-wizard-paymentmethod-paypal-module-paypal-logo\" src=\""
    + container.escapeExpression((compilerNameLookup(helpers,"getThemeAssetsPathWithDefault") || (depth0 && compilerNameLookup(depth0,"getThemeAssetsPathWithDefault")) || helpers.helperMissing).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"paypalImageUrl") : depth0),"img/paypal.png",{"name":"getThemeAssetsPathWithDefault","hash":{},"data":data}))
    + "\" alt=\"PayPal\"></div><div class=\"order-wizard-paymentmethod-paypal-module-column-right\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPaypalComplete") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " </div></div>  ";
},"useData":true}); template.Name = 'order_wizard_paymentmethod_paypal_module'; return template;});