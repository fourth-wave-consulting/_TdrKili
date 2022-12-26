define('order_wizard_paymentmethod_invoice_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <p class=\"order-wizard-paymentmethod-invoice-module-conditions\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"I agree to pay with my current Invoice <a data-toggle=\"show-terms\" href=\"#\">Terms & Conditions</a>",{"name":"translate","hash":{},"data":data}))
    + " </p> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return " <div class=\"order-wizard-paymentmethod-invoice-module\"><div class=\"order-wizard-paymentmethod-invoice-module-row\"><div class=\"order-wizard-paymentmethod-invoice-module-terms\"><p class=\"order-wizard-paymentmethod-invoice-module-terms-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Terms",{"name":"translate","hash":{},"data":data}))
    + " </p><p class=\"order-wizard-paymentmethod-invoice-module-terms-value\"> "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"termsName") || (depth0 != null ? compilerNameLookup(depth0,"termsName") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"termsName","hash":{},"data":data}) : helper)))
    + " </p></div><div class=\"order-wizard-paymentmethod-invoice-module-balance\"><p class=\"order-wizard-paymentmethod-invoice-module-balance-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Available Balance",{"name":"translate","hash":{},"data":data}))
    + " </p><p class=\"order-wizard-paymentmethod-invoice-module-balance-value\"> "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"balanceAvailable") || (depth0 != null ? compilerNameLookup(depth0,"balanceAvailable") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"balanceAvailable","hash":{},"data":data}) : helper)))
    + " </p></div></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showTerms") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div>  ";
},"useData":true}); template.Name = 'order_wizard_paymentmethod_invoice_module'; return template;});