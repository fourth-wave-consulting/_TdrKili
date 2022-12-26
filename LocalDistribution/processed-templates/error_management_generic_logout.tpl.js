define('error_management_generic_logout.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return " <section class=\"error-management-generic-logout-modal-content\"><div class=\"error-management-generic-logout\"><h4><span class=\"error-management-generic-logout-warning-icon\"></span> "
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"labels") : depth0)) != null ? compilerNameLookup(stack1,"title") : stack1), depth0))
    + " </h4><p>"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"labels") : depth0)) != null ? compilerNameLookup(stack1,"explanation") : stack1), depth0))
    + "</p></div><p><button class=\"error-management-generic-logout-close-button\" data-action=\"logouterror\" >"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"labels") : depth0)) != null ? compilerNameLookup(stack1,"login") : stack1), depth0))
    + "</button></p></section>  ";
},"useData":true}); template.Name = 'error_management_generic_logout'; return template;});