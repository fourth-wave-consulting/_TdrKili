define('order_wizard_address_cell.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <div class=\"order-wizard-address-cell"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"spanSize") || (depth0 != null ? compilerNameLookup(depth0,"spanSize") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"spanSize","hash":{},"data":data}) : helper)))
    + "\"><div data-type=\"backbone.collection.view.cell\"></div></div>  ";
},"useData":true}); template.Name = 'order_wizard_address_cell'; return template;});