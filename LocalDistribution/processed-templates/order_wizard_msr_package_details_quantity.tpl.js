define('order_wizard_msr_package_details_quantity.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <small class=\"muted order-wizard-msr-package-details-quantity-crossed\"> "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"lineAmountFormatted") || (depth0 != null ? compilerNameLookup(depth0,"lineAmountFormatted") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"lineAmountFormatted","hash":{},"data":data}) : helper)))
    + " </small> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return " <div class=\"order-wizard-msr-package-details-quantity\"><p class=\"order-wizard-msr-package-details-quantity-count\"><span class=\"order-wizard-msr-package-details-quantity-count-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Quantity: ",{"name":"translate","hash":{},"data":data}))
    + " </span><span class=\"order-wizard-msr-package-details-quantity-count-value\" data-type=\"item-quantity\"> "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineQuantity") || (depth0 != null ? compilerNameLookup(depth0,"lineQuantity") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"lineQuantity","hash":{},"data":data}) : helper)))
    + " </span></p><div class=\"order-wizard-msr-package-details-quantity-amount\"><p class=\"order-wizard-msr-package-details-quantity-amount\"><span class=\"order-wizard-msr-package-details-quantity-amount-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount: ",{"name":"translate","hash":{},"data":data}))
    + "</span><span class=\"order-wizard-msr-package-details-quantity-amount-value\" data-type=\"item-amount\"> "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineTotalFormatted") || (depth0 != null ? compilerNameLookup(depth0,"lineTotalFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"lineTotalFormatted","hash":{},"data":data}) : helper)))
    + " </span></p> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAmountGreaterThanTotal") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div></div>  ";
},"useData":true}); template.Name = 'order_wizard_msr_package_details_quantity'; return template;});