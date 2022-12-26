define('transaction_line_views_cell_selectable.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "transaction-line-views-cell-selectable-multishipto-line-selected";
},"3":function(container,depth0,helpers,partials,data) {
    return "checked";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return " <a "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"itemURLAttributes") || (depth0 != null ? compilerNameLookup(depth0,"itemURLAttributes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemURLAttributes","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"itemName") || (depth0 != null ? compilerNameLookup(depth0,"itemName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemName","hash":{},"data":data}) : helper)))
    + "</a> ";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <span class=\"transaction-line-views-cell-selectable-item-displayname-viewonly\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"itemName") || (depth0 != null ? compilerNameLookup(depth0,"itemName") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"itemName","hash":{},"data":data}) : helper)))
    + "</span> ";
},"9":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"Item.Options\"></div> ";
},"11":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"Detail1.View\"></div> ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showDetail1Title") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"detail1") || (depth0 != null ? compilerNameLookup(depth0,"detail1") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"detail1","hash":{},"data":data}) : helper)))
    + " ";
},"14":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <span class=\"transaction-line-views-cell-selectable-visible-phone\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"detail1Title") || (depth0 != null ? compilerNameLookup(depth0,"detail1Title") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"detail1Title","hash":{},"data":data}) : helper)))
    + "</span> ";
},"16":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <span class=\"transaction-line-views-cell-selectable-item-unit-price-label\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"detail2Title") || (depth0 != null ? compilerNameLookup(depth0,"detail2Title") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"detail2Title","hash":{},"data":data}) : helper)))
    + "</span> ";
},"18":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <span class=\"transaction-line-views-cell-selectable-item-amount-label\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"detail3Title") || (depth0 != null ? compilerNameLookup(depth0,"detail3Title") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"detail3Title","hash":{},"data":data}) : helper)))
    + "</span> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <tr class=\"item-"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLineSelected") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-item-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data}) : helper)))
    + "\" data-type=\"row\" data-line-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lineId","hash":{},"data":data}) : helper)))
    + "\"  data-action=\"select-unselected-item\"><td class=\"transaction-line-views-cell-selectable-item-selector\"><input data-type=\"checkbox-item-selector\" type=\"checkbox\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLineSelected") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " /></td><td class=\"transaction-line-views-cell-selectable-item-image\"><img src=\""
    + alias4((compilerNameLookup(helpers,"resizeImage") || (depth0 && compilerNameLookup(depth0,"resizeImage")) || alias2).call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? compilerNameLookup(stack1,"url") : stack1),"thumbnail",{"name":"resizeImage","hash":{},"data":data}))
    + "\" alt=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? compilerNameLookup(stack1,"altimagetext") : stack1), depth0))
    + "\"></td><td class=\"transaction-line-views-cell-selectable-item-details\"><p class=\"transaction-line-views-cell-selectable-item-displayname\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isNavigable") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + " </p><div data-view=\"Item.Sku\"></div><p class=\"transaction-line-views-cell-selectable-stock\" data-view=\"ItemViews.Stock.View\"></p><div data-view=\"StockDescription\"></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showOptions") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </td><td class=\"transaction-line-views-cell-selectable-item-qty\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isDetail1Composite") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + " </td><td class=\"transaction-line-views-cell-selectable-item-unit-price\"><p> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showDetail2Title") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <span class=\"transaction-line-views-cell-selectable-item-unit-price-value\"> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"detail2") || (depth0 != null ? compilerNameLookup(depth0,"detail2") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"detail2","hash":{},"data":data}) : helper)))
    + " </span></p></td><td class=\"transaction-line-views-cell-selectable-item-amount\"><p> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showDetail3Title") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <span class=\"transaction-line-views-cell-selectable-item-amount-value\"> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"detail3") || (depth0 != null ? compilerNameLookup(depth0,"detail3") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"detail3","hash":{},"data":data}) : helper)))
    + " </span></p></td></tr>  ";
},"useData":true}); template.Name = 'transaction_line_views_cell_selectable'; return template;});