define('return_authorization_list.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <a href=\"/\" class=\"return-authorization-list-button-back\"><i class=\"return-authorization-list-button-back-icon\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Account",{"name":"translate","hash":{},"data":data}))
    + " </a> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"Message\"></div> ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <table class=\"return-authorization-list-results-list\"><thead class=\"return-authorization-list-content-table\"><tr class=\"return-authorization-list-content-table-header-row\"><th class=\"return-authorization-list-content-table-header-row-title\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Return No.",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"return-authorization-list-content-table-header-row-date\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Date",{"name":"translate","hash":{},"data":data}))
    + "</span></th></th><th class=\"return-authorization-list-content-table-header-row-date\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Items",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"return-authorization-list-content-table-header-row-currency\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data}))
    + "</span></th><th class=\"return-authorization-list-content-table-header-row-status\"><span>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Status",{"name":"translate","hash":{},"data":data}))
    + "</span></th></tr></thead><tbody data-view=\"Records.List\" class=\"return-authorization-list-records-list\"></tbody></table> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPagination") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"return-authorization-list-paginator\"><div data-view=\"GlobalViews.Pagination\"></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showCurrentPage") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> ";
},"7":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"GlobalViews.ShowCurrentPage\"></div> ";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"10":function(container,depth0,helpers,partials,data) {
    return " <p class=\"return-authorization-list-empty\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Loading...",{"name":"translate","hash":{},"data":data}))
    + "</p> ";
},"12":function(container,depth0,helpers,partials,data) {
    return " <div class=\"return-authorization-list-empty-section\"><h5>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"No returns were found",{"name":"translate","hash":{},"data":data}))
    + "</h5></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackToAccount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <section class=\"return-authorization-list\"><header class=\"return-authorization-list-header\"><h2>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + "</h2></header> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showMessage") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div data-view=\"ListHeader.View\"></div><div class=\"return-authorization-list-container\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isResultLengthGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + " </div></section>  ";
},"useData":true}); template.Name = 'return_authorization_list'; return template;});