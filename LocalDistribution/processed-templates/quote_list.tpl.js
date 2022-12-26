define('quote_list.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <a href=\"/\" class=\"quote-list-button-back\"><i class=\"quote-list-button-back-icon\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Account",{"name":"translate","hash":{},"data":data}))
    + " </a> ";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <table class=\"quote-list-quotes-table\"><thead class=\"quote-list-content-table\"><tr class=\"quote-list-content-table-header-row\"><th class=\"quote-list-content-table-header-row-title\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Quote No.",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"quote-list-content-table-header-row-request-date\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Request date",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"quote-list-content-table-header-row-expiration-date\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Expiration date",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"quote-list-content-table-header-row-currency\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"quote-list-content-table-header-row-status\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Status",{"name":"translate","hash":{},"data":data}))
    + "</span></th></tr></thead><tbody data-view=\"Quote.List.Items\"></tbody></table> ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"6":function(container,depth0,helpers,partials,data) {
    return " <p class=\"quote-list-empty\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Loading...",{"name":"translate","hash":{},"data":data}))
    + "</p> ";
},"8":function(container,depth0,helpers,partials,data) {
    return " <div class=\"quote-list-empty-section\"><h5>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"No quotes were found",{"name":"translate","hash":{},"data":data}))
    + "</h5></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackToAccount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <section class=\"quote-list\"><header class=\"quote-list-header\"><h2>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + "</h2></header><div data-view=\"List.Header\"></div><div class=\"quote-list-results-container\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"collectionLength") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + " </div></section>  ";
},"useData":true}); template.Name = 'quote_list'; return template;});