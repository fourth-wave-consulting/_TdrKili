define('wizard_step_navigation.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <a data-action=\"previous-step\" class=\"wizard-step-navigation-back\"><i class=\"wizard-step-navigation-back-icon\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Previous",{"name":"translate","hash":{},"data":data}))
    + " </a> ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(data && compilerNameLookup(data,"first")),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <li class=\"wizard-step-navigation-step wizard-step-navigation-step-"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"index") || (data && compilerNameLookup(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"><a class=\"wizard-step-navigation-step-anchor "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"listItemClass") || (depth0 != null ? compilerNameLookup(depth0,"listItemClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listItemClass","hash":{},"data":data}) : helper)))
    + "\" href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"linkUrl") || (depth0 != null ? compilerNameLookup(depth0,"linkUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkUrl","hash":{},"data":data}) : helper)))
    + "\"> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"counter") || (depth0 != null ? compilerNameLookup(depth0,"counter") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"counter","hash":{},"data":data}) : helper)))
    + "<span class=\"wizard-step-navigation-step-anchor-label\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></a></li> ";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <li class=\"wizard-step-navigation-divider wizard-step-navigation-divider-"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"index") || (data && compilerNameLookup(data,"index"))) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data}) : helper)))
    + "\">/</li> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"wizard-step-navigation\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackButton") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <ol class=\"wizard-step-navigation-menu\"> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"stepGroups") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </ol></div>  ";
},"useData":true}); template.Name = 'wizard_step_navigation'; return template;});