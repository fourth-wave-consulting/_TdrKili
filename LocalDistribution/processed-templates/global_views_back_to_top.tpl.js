define('global_views_back_to_top.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <div id=\"back-to-top\" class=\"global-views-back-to-top\"><a href=\"#\" data-action=\"back-to-top\"><i class=\"global-views-back-to-top-icon\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Top",{"name":"translate","hash":{},"data":data}))
    + " </a></div>  ";
},"useData":true}); template.Name = 'global_views_back_to_top'; return template;});