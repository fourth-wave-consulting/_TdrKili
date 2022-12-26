define('return_authorization_detail.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <p class=\"return-authorization-detail-header-info-from\"><span class=\"return-authorization-detail-header-info-from-label\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(alias1,"Created from:",{"name":"translate","hash":{},"data":data}))
    + " </span> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCreatedFromLink") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + " </p> ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return " <a href=\"/purchases/view/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"recordtype") : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"internalid") : stack1), depth0))
    + "\"> "
    + alias2((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Purchase #$(0)",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"tranid") : stack1),{"name":"translate","hash":{},"data":data}))
    + " </a> ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Purchase #$(0)",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"name") : stack1),{"name":"translate","hash":{},"data":data}))
    + " ";
},"6":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Returned Products ($(0))",(depth0 != null ? compilerNameLookup(depth0,"linesLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " ";
},"8":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Returned Product",{"name":"translate","hash":{},"data":data}))
    + " ";
},"10":function(container,depth0,helpers,partials,data) {
    return "in";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"return-authorization-detail-comments-row\"><div class=\"return-authorization-detail-comments\"><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Comments:",{"name":"translate","hash":{},"data":data}))
    + "</p><blockquote>"
    + alias3((compilerNameLookup(helpers,"breaklines") || (depth0 && compilerNameLookup(depth0,"breaklines")) || alias2).call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"memo") : stack1),{"name":"breaklines","hash":{},"data":data}))
    + "</blockquote></div></div> ";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"return-authorization-detail-creditmemo-accordion-row\"><div class=\"return-authorization-detail-creditmemo-accordion-divider\"><div class=\"return-authorization-detail-creditmemo-accordion-head\"><a class=\"return-authorization-detail-creditmemo-accordion-head-toggle "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsedArrow") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsedArrow") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initiallyCollapsedArrow","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"collapse\" data-target=\"#creditmemo-applied-invoices\" aria-expanded=\"true\" aria-controls=\"creditmemo-applied-invoices\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Applied to Transactions",{"name":"translate","hash":{},"data":data}))
    + " <i class=\"return-authorization-detail-creditmemo-accordion-toggle-icon\"></i></a></div><div class=\"return-authorization-detail-creditmemo-accordion-body collapse "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsed") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsed") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initiallyCollapsed","hash":{},"data":data}) : helper)))
    + "\" id=\"creditmemo-applied-invoices\" role=\"tabpanel\" data-target=\"#creditmemo-applied-invoices\"><div data-content=\"items-body\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showInvoicesDetails") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + " </div></div></div></div> ";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return " <table class=\"return-authorization-detail-creditmemo-table-product\"><thead class=\"return-authorization-detail-creditmemo-table-invoices-header\"><th class=\"return-authorization-detail-creditmemo-table-invoices-header-title-record\"></th><th class=\"return-authorization-detail-creditmemo-table-invoices-header-date-record\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Date",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-detail-creditmemo-table-invoices-header-amount-record\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data}))
    + "</th></thead><tbody data-view=\"Invoices.Collection\"></tbody><tfoot><tr><td class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-total\" colspan=\"3\"><p><span class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-total-label\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Applied Subtotal: ",{"name":"translate","hash":{},"data":data}))
    + "</span><span class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-subtotal-value\">"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"amountpaid_formatted") : stack1), depth0))
    + "</span></p><p><span class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-total-label\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Remaining subtotal: ",{"name":"translate","hash":{},"data":data}))
    + "</span><span class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-total-value-remaining\">"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"amountremaining_formatted") : stack1), depth0))
    + "</span></p></td></tr></tfoot></table> ";
},"17":function(container,depth0,helpers,partials,data) {
    return " <div class=\"return-authorization-detail-creditmemo-accordion-body-container-message\"><p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"This return has not been applied yet.",{"name":"translate","hash":{},"data":data}))
    + "</p></div> ";
},"19":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"itemsQuantityNumber") || (depth0 != null ? compilerNameLookup(depth0,"itemsQuantityNumber") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"itemsQuantityNumber","hash":{},"data":data}) : helper)))
    + " "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Items",{"name":"translate","hash":{},"data":data}))
    + " ";
},"21":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"itemsQuantityNumber") || (depth0 != null ? compilerNameLookup(depth0,"itemsQuantityNumber") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"itemsQuantityNumber","hash":{},"data":data}) : helper)))
    + " "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Item",{"name":"translate","hash":{},"data":data}))
    + " ";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return " <p class=\"return-authorization-detail-summary-grid-float\"><span class=\"return-authorization-detail-summary-amount-discount\"> "
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"discounttotal_formatted") : stack1), depth0))
    + " </span> "
    + alias1((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Discount Total",{"name":"translate","hash":{},"data":data}))
    + " </p> ";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return " <p class=\"return-authorization-detail-summary-grid-float\"><span class=\"return-authorization-detail-summary-amount-handling\"> "
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"handlingcost_formatted") : stack1), depth0))
    + " </span> "
    + alias1((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Handling Cost",{"name":"translate","hash":{},"data":data}))
    + " </p> ";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return " <p class=\"return-authorization-detail-summary-grid-float\"><span class=\"return-authorization-detail-summary-amount-shipping\"> "
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"shippingcost_formatted") : stack1), depth0))
    + " </span> "
    + alias1((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Shipping Cost",{"name":"translate","hash":{},"data":data}))
    + " </p> ";
},"29":function(container,depth0,helpers,partials,data) {
    return " <div class=\"return-authorization-detail-summary-cancel-request\"><button class=\"return-authorization-detail-summary-cancel-request-button\" data-action=\"cancel\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Cancel Request",{"name":"translate","hash":{},"data":data}))
    + "</button></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda, alias5="function";

  return " <a href=\"/returns\" class=\"return-authorization-detail-back\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"&lt; Back to Returns",{"name":"translate","hash":{},"data":data}))
    + "</a><article class=\"return-authorization-detail\"><header><h2 class=\"return-authorization-detail-title\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Return <span class=\"return-authorization-detail-number\">#$(0)</span>",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"tranid") : stack1),{"name":"translate","hash":{},"data":data}))
    + " <span class=\"return-authorization-detail-header-total\"> "
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1), depth0))
    + " </span></h2></header><div data-type=\"alert-placeholder\"></div><div class=\"return-authorization-detail-header-info\"><div class=\"return-authorization-detail-header-row\"><div class=\"return-authorization-detail-header-info-left\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCreatedFrom") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <p class=\"return-authorization-detail-header-info-return-date\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Date:",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"return-authorization-detail-header-info-return-date-value\">"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"trandate") : stack1), depth0))
    + "</span></p><p class=\"return-authorization-detail-header-info-amount\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount: <span class=\"return-authorization-detail-header-info-amount-value\">$(0)</span>",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1),{"name":"translate","hash":{},"data":data}))
    + " </p></div><div class=\"return-authorization-detail-header-info-right\"><p class=\"return-authorization-detail-status\"><span class=\"return-authorization-detail-header-info-status-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Status:",{"name":"translate","hash":{},"data":data}))
    + " </span><span class=\"return-authorization-detail-header-info-status-value\"> "
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"status") : stack1)) != null ? compilerNameLookup(stack1,"name") : stack1), depth0))
    + " </span></p></div></div></div><div class=\"return-authorization-detail-row\" name=\"return-content-layout\"><div class=\"return-authorization-detail-content-col\"><div class=\"return-authorization-detail-accordion-divider\"><div class=\"return-authorization-detail-accordion-head\"><a href=\"#\" class=\"return-authorization-detail-head-toggle "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsedArrow") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsedArrow") : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"initiallyCollapsedArrow","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"collapse\" data-target=\"#return-products\" aria-expanded=\"true\" aria-controls=\"return-products\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"linesLengthGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + " <i class=\"return-authorization-detail-head-toggle-icon\"></i></a></div><div class=\"return-authorization-detail-body collapse "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showOpenedAccordion") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"return-products\" role=\"tabpanel\" data-target=\"#return-products\"><table class=\"return-authorization-detail-products-table lg2sm-first\"><thead class=\"return-authorization-detail-headers\"><tr><th class=\"return-authorization-detail-headers-image\"></th><th class=\"return-authorization-detail-headers-product\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Product",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-detail-headers-quantity\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Qty",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-detail-headers-reason\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Reason",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-detail-headers-amount\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data}))
    + "</th></tr></thead><tbody data-view=\"Items.Collection\"></tbody></table></div></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showComments") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showAppliesSection") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div><div class=\"return-authorization-detail-summary-col\"><div class=\"return-authorization-detail-summary-container\"><h3 class=\"return-authorization-detail-summary-title\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"ITEMS SUMMARY",{"name":"translate","hash":{},"data":data}))
    + " </h3><p class=\"return-authorization-detail-summary-grid-float\"><span class=\"return-authorization-detail-summary-subtotal\"> "
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"subtotal_formatted") : stack1), depth0))
    + " </span> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Subtotal",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"return-authorization-detail-summary-subtotal-items\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"linesitemsNumberGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(21, data, 0),"data":data})) != null ? stack1 : "")
    + " </span></p> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showDiscountTotal") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <p class=\"return-authorization-detail-summary-grid-float\"><span class=\"return-authorization-detail-summary-amount-tax\"> "
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"taxtotal_formatted") : stack1), depth0))
    + " </span> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Tax Total",{"name":"translate","hash":{},"data":data}))
    + " </p> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showHandlingTotal") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showShippingTotal") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"return-authorization-detail-summary-total\"><p class=\"return-authorization-detail-summary-grid-float\"><span class=\"return-authorization-detail-summary-amount-total\"> "
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1), depth0))
    + " </span> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"TOTAL",{"name":"translate","hash":{},"data":data}))
    + " </p></div></div><div class=\"return-authorization-detail-summary-pdf\"><a class=\"return-authorization-detail-summary-pdf-download-button\" data-stdnav target=\"_blank\" href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"downloadPDFURL") || (depth0 != null ? compilerNameLookup(depth0,"downloadPDFURL") : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"downloadPDFURL","hash":{},"data":data}) : helper)))
    + "\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Download as PDF",{"name":"translate","hash":{},"data":data}))
    + " </a></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCancelable") : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div></div></div>  ";
},"useData":true}); template.Name = 'return_authorization_detail'; return template;});