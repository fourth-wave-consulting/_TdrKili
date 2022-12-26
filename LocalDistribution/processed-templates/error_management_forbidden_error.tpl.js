define('error_management_forbidden_error.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <h1>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + "</h1> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return " <div class=\"error-management-forbidden-error\"><div class=\"error-management-forbidden-error-header\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div id=\"main-banner\" class=\"error-management-forbidden-error-main-banner\"></div></div><div id=\"forbidden-error-content\" class=\"error-management-forbidden-error-content\"><p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Sorry! You have no permission to view this page.",{"name":"translate","hash":{},"data":data}))
    + "</p><p>"
    + ((stack1 = (compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Please contact the website administrator, click <a href=\"/\">here</a> to continue.",{"name":"translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</p></div></div>  ";
},"useData":true}); template.Name = 'error_management_forbidden_error'; return template;});