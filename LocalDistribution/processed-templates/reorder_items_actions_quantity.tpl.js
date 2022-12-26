define('reorder_items_actions_quantity.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return " <label class=\"reorder-items-actions-quantity-label\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Quantity:",{"name":"translate","hash":{},"data":data}))
    + "</label><div class=\"reorder-items-actions-quantity-input\"><button class=\"reorder-items-actions-quantity-remove\" data-action=\"minus\">-</button><input type=\"number\" name=\"item_quantity\" data-line-id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"lineId","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"itemQuantity") || (depth0 != null ? compilerNameLookup(depth0,"itemQuantity") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"itemQuantity","hash":{},"data":data}) : helper)))
    + "\" class=\"reorder-items-actions-quantity-value\" min=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"minimumQuantity") || (depth0 != null ? compilerNameLookup(depth0,"minimumQuantity") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"minimumQuantity","hash":{},"data":data}) : helper)))
    + "\"><button class=\"reorder-items-actions-quantity-add\" data-action=\"plus\">+</button></div> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"Item.Stock\"></div> ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <p class=\"reorder-items-actions-quantity-last-purchased\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Last purchased on $(0)",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"trandate") : stack1),{"name":"translate","hash":{},"data":data}))
    + "</p> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"reorder-items-actions-quantity\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showQuantityInput") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " </div><div data-view=\"Quantity.Pricing\"></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLastPurchased") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'reorder_items_actions_quantity'; return template;});