define('order_wizard_msr_enablelink_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "multishipto";
},"3":function(container,depth0,helpers,partials,data) {
    return "singleshipto";
},"5":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"I want to ship to a single address",{"name":"translate","hash":{},"data":data}))
    + " ";
},"7":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"I want to ship to multiple addresses",{"name":"translate","hash":{},"data":data}))
    + " ";
},"9":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"PromocodesRemovedWarning\"></div> ";
},"11":function(container,depth0,helpers,partials,data) {
    return " <i class=\"order-wizard-msr-enablelink-module-link-icon\" data-toggle=\"tooltip\" title=\"\" data-original-title=\""
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Click here if you want to divide your order and ship it to multiple addresses. All your data will be saved.",{"name":"translate","hash":{},"data":data}))
    + "\" ></i> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"order-wizard-msr-enablelink-module\"><a class=\"order-wizard-msr-enablelink-module-link\" href=\"#\" data-action=\"change-status-multishipto\" data-type=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isMultiShipToEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\" > "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isMultiShipToEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + " </a> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPromocodesRemovedWarning") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isMultiShipToEnabled") : depth0),{"name":"unless","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div>  ";
},"useData":true}); template.Name = 'order_wizard_msr_enablelink_module'; return template;});