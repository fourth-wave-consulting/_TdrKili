define('product_line_sku.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"product-line-sku-container\"><span class=\"product-line-sku-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"SKU:",{"name":"translate","hash":{},"data":data}))
    + " </span><span class=\"product-line-sku-value\" itemprop=\"sku\"> "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"sku") || (depth0 != null ? compilerNameLookup(depth0,"sku") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"sku","hash":{},"data":data}) : helper)))
    + " </span></div>  ";
},"useData":true}); template.Name = 'product_line_sku'; return template;});