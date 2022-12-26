define('global_views_breadcrumb.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && compilerNameLookup(data,"last")),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <li class=\"global-views-breadcrumb-item-active\"> "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data}) : helper)))
    + " </li> ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <li class=\"global-views-breadcrumb-item\"><a href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"href") || (depth0 != null ? compilerNameLookup(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasDataTouchpoint") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasDataHashtag") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " > "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + " </a></li><li class=\"global-views-breadcrumb-divider\"><span class=\"global-views-breadcrumb-divider-icon\"></span></li> ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-touchpoint=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"data-touchpoint") || (depth0 != null ? compilerNameLookup(depth0,"data-touchpoint") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"data-touchpoint","hash":{},"data":data}) : helper)))
    + "\" ";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-hashtag=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"data-hashtag") || (depth0 != null ? compilerNameLookup(depth0,"data-hashtag") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"data-hashtag","hash":{},"data":data}) : helper)))
    + "\" ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div id=\"banner-breadcrumb-top\" class=\"content-banner banner-breadcrumb-top\" data-cms-area=\"breadcrumb_top\" data-cms-area-filters=\"global\"></div><ul class=\"global-views-breadcrumb\" itemprop=\"breadcrumb\"> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"pages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </ul><div id=\"banner-breadcrumb-bottom\" class=\"content-banner banner-breadcrumb-bottom\" data-cms-area=\"breadcrumb_bottom\" data-cms-area-filters=\"global\"></div>  ";
},"useData":true}); template.Name = 'global_views_breadcrumb'; return template;});