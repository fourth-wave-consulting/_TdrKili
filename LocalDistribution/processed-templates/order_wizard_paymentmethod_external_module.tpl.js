define('order_wizard_paymentmethod_external_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"order-wizard-paymentmethod-external-module-row\"><div class=\"order-wizard-paymentmethod-external-module-column-left\"><img class=\"order-wizard-paymentmethod-external-module-image\" src=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"imageUrl") || (depth0 != null ? compilerNameLookup(depth0,"imageUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imageUrl","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></div><div class=\"order-wizard-paymentmethod-external-module-column-right\"><p>"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"description") || (depth0 != null ? compilerNameLookup(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p></div></div>  ";
},"useData":true}); template.Name = 'order_wizard_paymentmethod_external_module'; return template;});