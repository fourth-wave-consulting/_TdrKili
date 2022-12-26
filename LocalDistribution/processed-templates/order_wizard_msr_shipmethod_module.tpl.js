define('order_wizard_msr_shipmethod_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <div data-type=\"shipments-list\" data-view=\"Packages.Collection\"></div> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " <p class=\"order-wizard-msr-shipmethod-module-message\"><i class=\"order-wizard-msr-shipmethod-module-message-icon\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"You haven't set any shipments yet",{"name":"translate","hash":{},"data":data}))
    + " </p> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showPackages") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'order_wizard_msr_shipmethod_module'; return template;});