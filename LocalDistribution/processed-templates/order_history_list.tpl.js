define('order_history_list.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <a href=\"/\" class=\"order-history-list-button-back\"><i class=\"order-history-list-button-back-icon\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Account",{"name":"translate","hash":{},"data":data}))
    + " </a> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " <span class=\"order-history-list-header-button-open-active\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Open",{"name":"translate","hash":{},"data":data}))
    + "</span> ";
},"5":function(container,depth0,helpers,partials,data) {
    return " <a href=\"/open-purchases\" class=\"order-history-list-header-button-open\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Open",{"name":"translate","hash":{},"data":data}))
    + "</a> ";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"inStoreIsActive") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"8":function(container,depth0,helpers,partials,data) {
    return " <span class=\"order-history-list-header-button-instore-active\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"In Store",{"name":"translate","hash":{},"data":data}))
    + "</span> ";
},"10":function(container,depth0,helpers,partials,data) {
    return " <a href=\"/instore-purchases\" class=\"order-history-list-header-button-instore\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"In Store",{"name":"translate","hash":{},"data":data}))
    + "</a> ";
},"12":function(container,depth0,helpers,partials,data) {
    return " <span class=\"order-history-list-header-button-all-active\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"All",{"name":"translate","hash":{},"data":data}))
    + "</span> ";
},"14":function(container,depth0,helpers,partials,data) {
    return " <a href=\"/purchases\" class=\"order-history-list-header-button-all\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"All",{"name":"translate","hash":{},"data":data}))
    + "</a> ";
},"16":function(container,depth0,helpers,partials,data) {
    return "style=\"display:none;\"";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"order-history-list-recordviews-container\"><table class=\"order-history-list-recordviews-actionable-table\"><thead class=\"order-history-list-recordviews-actionable-header\"><tr><th class=\"order-history-list-recordviews-actionable-title-header\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Purchase No.",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"order-history-list-recordviews-actionable-date-header\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Date",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"order-history-list-recordviews-actionable-currency-header\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data}))
    + "</span></th> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSCISIntegrationEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "")
    + " <th class=\"order-history-list-recordviews-actionable-actions-header\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Track Items",{"name":"translate","hash":{},"data":data}))
    + "</span></th></tr></thead><tbody class=\"order-history-list\" data-view=\"Order.History.Results\"></tbody></table></div> ";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"inStoreIsActive") : depth0),{"name":"unless","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"20":function(container,depth0,helpers,partials,data) {
    return " <th class=\"order-history-list-recordviews-actionable-origin-header\"><span>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Origin",{"name":"translate","hash":{},"data":data}))
    + "</span></th> ";
},"22":function(container,depth0,helpers,partials,data) {
    return " <th class=\"order-history-list-recordviews-actionable-status-header\"><span>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Status",{"name":"translate","hash":{},"data":data}))
    + "</span></th> ";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"25":function(container,depth0,helpers,partials,data) {
    return " <p class=\"order-history-list-empty\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Loading...",{"name":"translate","hash":{},"data":data}))
    + "</p> ";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"order-history-list-empty-section\"><h5>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(alias1,"You don't have any purchases in your account right now.",{"name":"translate","hash":{},"data":data}))
    + "</h5> "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"allIsActive") : depth0),{"name":"unless","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSCISIntegrationEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> ";
},"28":function(container,depth0,helpers,partials,data) {
    return " <p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"To see a list of all your past purchases, you can go to the tab <a href=\"/purchases\" class=\"\">All</a>.",{"name":"translate","hash":{},"data":data}))
    + "</p> ";
},"30":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"openIsActive") : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"31":function(container,depth0,helpers,partials,data) {
    return " <p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"If you are looking to review some past purchases made in one of our brick and mortar stores, please check the tab <a href=\"/instore-purchases\" class=\"\">In Store</a>.",{"name":"translate","hash":{},"data":data}))
    + "</p> ";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"order-history-list-case-list-paginator\"><div data-view=\"GlobalViews.Pagination\"></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showCurrentPage") : depth0),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> ";
},"34":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"GlobalViews.ShowCurrentPage\"></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackToAccount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <section class=\"order-history-list\"><header class=\"order-history-list-header\"><h2>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + "</h2></header><div class=\"order-history-list-header-nav\"><div class=\"order-history-list-header-button-group\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"openIsActive") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSCISIntegrationEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"allIsActive") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "")
    + " </div></div><div data-view=\"ListHeader\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"openIsActive") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"collectionLengthGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPagination") : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </section>  ";
},"useData":true}); template.Name = 'order_history_list'; return template;});