define('backbone_collection_view_cell.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <div class=\"backbone-collection-view-cell-span"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"spanSize") || (depth0 != null ? compilerNameLookup(depth0,"spanSize") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"spanSize","hash":{},"data":data}) : helper)))
    + "\"><div data-type=\"backbone.collection.view.cell\" ></div></div>  ";
},"useData":true}); template.Name = 'backbone_collection_view_cell'; return template;});