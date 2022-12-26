define('return_authorization_detail_item_comments.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"return-authorization-detail-item-comments-row\"><div class=\"return-authorization-detail-item-comments-column\"><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Comments:",{"name":"translate","hash":{},"data":data}))
    + "</p><blockquote>"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"comment") || (depth0 != null ? compilerNameLookup(depth0,"comment") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</blockquote></div></div>  ";
},"useData":true}); template.Name = 'return_authorization_detail_item_comments'; return template;});