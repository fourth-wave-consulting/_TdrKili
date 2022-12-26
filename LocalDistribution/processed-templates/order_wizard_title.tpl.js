define('order_wizard_title.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <p> "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"details") || (depth0 != null ? compilerNameLookup(depth0,"details") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"details","hash":{},"data":data}) : helper)))
    + " </p> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"tag") || (depth0 != null ? compilerNameLookup(depth0,"tag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data}) : helper)))
    + " class=\"order-wizard-title\" "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"attributes") || (depth0 != null ? compilerNameLookup(depth0,"attributes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"attributes","hash":{},"data":data}) : helper)))
    + "> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"title") || (depth0 != null ? compilerNameLookup(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + " </"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"tag") || (depth0 != null ? compilerNameLookup(depth0,"tag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data}) : helper)))
    + "> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showDetails") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'order_wizard_title'; return template;});