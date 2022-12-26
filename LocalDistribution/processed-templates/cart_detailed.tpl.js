define('cart_detailed.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <h1 class=\"cart-detailed-title\"> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + " <small class=\"cart-detailed-title-details-count\"> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"productsAndItemsCount") || (depth0 != null ? compilerNameLookup(depth0,"productsAndItemsCount") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productsAndItemsCount","hash":{},"data":data}) : helper)))
    + " </small></h1> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " <h2 class=\"cart-detailed-title\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Your Shopping Cart is empty",{"name":"translate","hash":{},"data":data}))
    + "</h2> ";
},"5":function(container,depth0,helpers,partials,data) {
    return "cart-detailed-left ";
},"7":function(container,depth0,helpers,partials,data) {
    return "cart-detailed-empty";
},"9":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"Quick.Order.EmptyCart\"><p class=\"cart-detailed-body-info\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Continue Shopping on our <a href=\"/\" data-touchpoint=\"home\">Home Page</a>.",{"name":"translate","hash":{},"data":data}))
    + " </p></div> ";
},"11":function(container,depth0,helpers,partials,data) {
    return " <div class=\"cart-detailed-proceed-to-checkout-container\"><a class=\"cart-detailed-proceed-to-checkout\" data-action=\"sticky\" href=\"#\" data-touchpoint=\"checkout\" data-hashtag=\"#\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Proceed to Checkout",{"name":"translate","hash":{},"data":data}))
    + " </a></div><div data-confirm-message class=\"cart-detailed-confirm-message\"></div><div data-view=\"Promocode.Notifications\"></div><table class=\"cart-detailed-item-view-cell-actionable-table cart-detailed-table-row-with-border\"><tbody data-view=\"Item.ListNavigable\"></tbody></table> ";
},"13":function(container,depth0,helpers,partials,data) {
    return " <section class=\"cart-detailed-right\"><div data-view=\"Cart.Summary\"></div></section> ";
},"15":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"SavedForLater\" class=\"cart-detailed-savedforlater\"></div><div data-view=\"RecentlyViewed.Items\" class=\"cart-detailed-recently-viewed\"></div><div data-view=\"Related.Items\" class=\"cart-detailed-related\"></div><div data-view=\"Correlated.Items\" class=\"cart-detailed-correlated\"></div> ";
},"17":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"SavedForLater\" class=\"cart-detailed-savedforlater\"></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"cart-detailed\"><div class=\"cart-detailed-view-header\"><header class=\"cart-detailed-header\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " </header></div><div class=\"cart-detailed-body\"><section class=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\"> "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div data-view=\"Quick.Order\"></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </section> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div><div class=\"cart-detailed-footer\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + " </div></div>  ";
},"useData":true}); template.Name = 'cart_detailed'; return template;});