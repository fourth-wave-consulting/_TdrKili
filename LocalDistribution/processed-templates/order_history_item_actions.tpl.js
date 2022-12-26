define('order_history_item_actions.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return " <a \n		class=\"order-history-item-actions-reorder\" \n		data-action=\"add-to-cart\" \n		data-line-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lineId","hash":{},"data":data}) : helper)))
    + "\" \n		data-item-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data}) : helper)))
    + "\" \n		data-item-quantity=\""
    + alias4(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"quantity") : stack1), depth0))
    + "\"\n		data-partial-quantity=\""
    + alias4(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"partial_quantity") : stack1), depth0))
    + "\" \n		data-parent-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemParentId") || (depth0 != null ? compilerNameLookup(depth0,"itemParentId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemParentId","hash":{},"data":data}) : helper)))
    + "\" \n		data-item-options=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"lineFormatOptions") || (depth0 != null ? compilerNameLookup(depth0,"lineFormatOptions") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lineFormatOptions","hash":{},"data":data}) : helper)))
    + "\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Reorder",{"name":"translate","hash":{},"data":data}))
    + " </a> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showActions") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'order_history_item_actions'; return template;});