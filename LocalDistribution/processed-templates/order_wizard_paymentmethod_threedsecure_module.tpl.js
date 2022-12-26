define('order_wizard_paymentmethod_threedsecure_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"alert alert-error\"> "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"threeDSecureError") : depth0)) != null ? compilerNameLookup(stack1,"errorMessage") : stack1), depth0))
    + " </div> ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"iframe") || (depth0 != null ? compilerNameLookup(depth0,"iframe") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"iframe","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"order-wizard-paymentmethod-threedsecure-module\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"threeDSecureError") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " </div>";
},"useData":true}); template.Name = 'order_wizard_paymentmethod_threedsecure_module'; return template;});