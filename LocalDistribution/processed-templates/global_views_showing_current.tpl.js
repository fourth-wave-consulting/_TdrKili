define('global_views_showing_current.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"global-views-showing-current "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"extraClass") || (depth0 != null ? compilerNameLookup(depth0,"extraClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\"><p>"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Showing $(0) - $(1) of $(2)",(depth0 != null ? compilerNameLookup(depth0,"firstItem") : depth0),(depth0 != null ? compilerNameLookup(depth0,"lastItem") : depth0),(depth0 != null ? compilerNameLookup(depth0,"totalItems") : depth0),{"name":"translate","hash":{},"data":data}))
    + " "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"order_text") || (depth0 != null ? compilerNameLookup(depth0,"order_text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"order_text","hash":{},"data":data}) : helper)))
    + "</p></div>  ";
},"useData":true}); template.Name = 'global_views_showing_current'; return template;});