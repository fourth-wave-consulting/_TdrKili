define('order_wizard_paymentmethod_giftcertificates_module_record.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return " <tr class=\"order-wizard-paymentmethod-giftcertificates-module-record-row\" data-gc-code=\""
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"giftcertificate") : depth0)) != null ? compilerNameLookup(stack1,"code") : stack1), depth0))
    + "\"><td class=\"order-wizard-paymentmethod-giftcertificates-module-record-gift-certificates\"><span class=\"order-wizard-paymentmethod-giftcertificates-module-record-label\">"
    + alias2((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias4).call(alias3,"Gift Certificate: ",{"name":"translate","hash":{},"data":data}))
    + "</span><div data-view=\"GiftCertificates\" class=\"order-wizard-paymentmethod-giftcertificates-module-record-value\"></div></td><td class=\"order-wizard-paymentmethod-giftcertificates-module-record-amount-applied\"><span class=\"order-wizard-paymentmethod-giftcertificates-module-record-label\">"
    + alias2((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias4).call(alias3,"Amount applied: ",{"name":"translate","hash":{},"data":data}))
    + "</span><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"giftcertificate") : depth0)) != null ? compilerNameLookup(stack1,"amountapplied_formatted") : stack1), depth0))
    + "</span></td><td class=\"order-wizard-paymentmethod-giftcertificates-module-record-remaining-balance\"><span class=\"order-wizard-paymentmethod-giftcertificates-module-record-label\">"
    + alias2((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias4).call(alias3,"Remaining balance: ",{"name":"translate","hash":{},"data":data}))
    + "</span><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"giftcertificate") : depth0)) != null ? compilerNameLookup(stack1,"amountremaining_formatted") : stack1), depth0))
    + "</span></td><td class=\"order-wizard-paymentmethod-giftcertificates-module-record-actions\"><a class=\"order-wizard-paymentmethod-giftcertificates-module-record-actions-button\" href=\"#\" data-action=\"remove\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"giftcertificate") : depth0)) != null ? compilerNameLookup(stack1,"code") : stack1), depth0))
    + "\"> "
    + alias2((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias4).call(alias3,"Remove",{"name":"translate","hash":{},"data":data}))
    + " </a></td></tr>  ";
},"useData":true}); template.Name = 'order_wizard_paymentmethod_giftcertificates_module_record'; return template;});