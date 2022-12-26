define('order_wizard_paymentmethod_giftcertificates_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <header class=\"order-wizard-paymentmethod-giftcertificates-module-step-header\"><h2 class=\"order-wizard-paymentmethod-giftcertificates-module-section-header\"> "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + " </h2></header> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add other Gift Certificate",{"name":"translate","hash":{},"data":data}))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Apply a Gift Certificate",{"name":"translate","hash":{},"data":data}))
    + " ";
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <table class=\"order-wizard-paymentmethod-giftcertificates-module-table\"><thead class=\"order-wizard-paymentmethod-giftcertificates-module-table-header\"><tr><th class=\"order-wizard-paymentmethod-giftcertificates-module-row-number\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Gift Certificate number",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"order-wizard-paymentmethod-giftcertificates-module-row-amount\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount applied",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"order-wizard-paymentmethod-giftcertificates-module-row-remaining\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Remaining balance",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"order-wizard-paymentmethod-giftcertificates-module-row-actions\"></th></tr></thead><tbody class=\"order-wizard-paymentmethod-giftcertificates-module-table-body\" data-view=\"GiftCertificatesRecords\"></tbody></table> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"order-wizard-paymentmethod-giftcertificates-module\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"order-wizard-paymentmethod-giftcertificates-module-expander-head\"><a class=\"order-wizard-paymentmethod-giftcertificates-module-expander-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#gift-certificate-form\" aria-expanded=\"false\" aria-controls=\"gift-certificate-form\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasGiftCertificates") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + " <i class=\"order-wizard-paymentmethod-giftcertificates-module-expander-icon\"></i></a></div><form id=\"gift-certificate-form\" class=\"order-wizard-paymentmethod-giftcertificates-module-form collapse\" data-action=\"gift-certificate-form\"><div class=\"order-wizard-paymentmethod-giftcertificates-module-form-expander-container\"><fieldset><div class=\"order-wizard-paymentmethod-giftcertificates-module-form-input-container\"><input type=\"text\" class=\"order-wizard-paymentmethod-giftcertificates-module-form-input\" name=\"code\"></div><div class=\"order-wizard-paymentmethod-giftcertificates-module-form-submit-container\"><button type=\"submit\" class=\"order-wizard-paymentmethod-giftcertificates-module-form-submit\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(alias1,"Apply",{"name":"translate","hash":{},"data":data}))
    + " </button></div><div data-type=\"alert-placeholder-gif-certificate\"></div></fieldset></div></form> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasGiftCertificates") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div>  ";
},"useData":true}); template.Name = 'order_wizard_paymentmethod_giftcertificates_module'; return template;});