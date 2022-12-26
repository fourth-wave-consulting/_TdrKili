define('order_wizard_paymentmethod_purchasenumber_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"order-wizard-paymentmethod-purchasenumber-module\"><h3 class=\"order-wizard-paymentmethod-purchasenumber-module-title\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Purchase Order Number",{"name":"translate","hash":{},"data":data}))
    + " </h3><div class=\"order-wizard-paymentmethod-purchasenumber-module-row\"><label for=\"purchase-order-number\" class=\"order-wizard-paymentmethod-purchasenumber-module-purchase-order-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Enter Purchase Order Number",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"order-wizard-paymentmethod-purchasenumber-module-purchase-order-optional\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"(Optional)",{"name":"translate","hash":{},"data":data}))
    + " </span></label><input\n			type=\"text\"\n			name=\"purchase-order-number\"\n			id=\"purchase-order-number\"\n			class=\"order-wizard-paymentmethod-purchasenumber-module-purchase-order-value\"\n			value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"purchaseNumber") || (depth0 != null ? compilerNameLookup(depth0,"purchaseNumber") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"purchaseNumber","hash":{},"data":data}) : helper)))
    + "\"\n		></div></div>  ";
},"useData":true}); template.Name = 'order_wizard_paymentmethod_purchasenumber_module'; return template;});