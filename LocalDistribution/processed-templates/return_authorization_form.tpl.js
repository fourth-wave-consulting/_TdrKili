define('return_authorization_form.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <a href=\"/\" class=\"return-authorization-form-button-back\"><i class=\"return-authorization-form-button-back-icon\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Account",{"name":"translate","hash":{},"data":data}))
    + " </a> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<b>$(0)</b> products selected",(depth0 != null ? compilerNameLookup(depth0,"activeLinesLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<b>$(0)</b> product selected",(depth0 != null ? compilerNameLookup(depth0,"activeLinesLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " ";
},"7":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<b>$(0)</b> items in total to return",(depth0 != null ? compilerNameLookup(depth0,"itemsToReturnLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " ";
},"9":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<b>$(0)</b> item in total to return",(depth0 != null ? compilerNameLookup(depth0,"itemsToReturnLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " ";
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"return-authorization-form-accordion-divider\"><div class=\"return-authorization-form-accordion-head\"><a class=\"return-authorization-form-accordion-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#return-authorization-form-products\" aria-expanded=\"true\" aria-controls=\"return-authorization-form-products\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Products from original order not eligible for return ($(0))",(depth0 != null ? compilerNameLookup(depth0,"invalidLinesLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " <i class=\"return-authorization-form-accordion-toggle-icon\"></i></a></div><div class=\"return-authorization-form-accordion-body collapse\" id=\"return-authorization-form-products\" role=\"tabpanel\" data-target=\"#return-authorization-form-products\"><div data-content=\"items-body\"><table class=\"return-authorization-form-products-list\"><thead class=\"return-authorization-form-table-products-header\"><th class=\"return-authorization-form-table-products-header-image\"></th><th class=\"return-authorization-form-table-products-header-product\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Product",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-form-table-products-header-qty\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Qty",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-form-table-products-header-unit-price\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Unit price",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-form-table-products-header-amount\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data}))
    + "</th></thead><tbody data-view=\"Invalid.Lines.Collection\"></tbody></table></div></div></div> ";
},"13":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackToAccount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <section class=\"return-authorization-form\"><header><h2 class=\"return-authorization-form-title\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + "</h2></header><div data-type=\"alert-placeholder\"></div><form class=\"return-authorization-form-form\"><fieldset class=\"return-authorization-form-items-fieldset\"><p class=\"return-authorization-form-items-info\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"<label class=\"return-authorization-form-items-fieldset-from-label\">From: </label><a href=\"$(0)\">Purchase #$(1)</a>",(depth0 != null ? compilerNameLookup(depth0,"createdFromURL") : depth0),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"tranid") : stack1),{"name":"translate","hash":{},"data":data}))
    + " </p><input type=\"hidden\" name=\"type\" value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"recordtype") : stack1), depth0))
    + "\"><h5 class=\"return-authorization-form-products-title\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Select products to return",{"name":"translate","hash":{},"data":data}))
    + "</h5><input type=\"hidden\" name=\"id\" value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"internalid") : stack1), depth0))
    + "\"><div data-view=\"ListHeader\"></div><div class=\"return-authorization-form-list\"><table class=\"return-authorization-form-returnable-products-table md2sm\"><tbody data-view=\"Returnable.Lines.Collection\"></tbody></table></div><p><small class=\"return-authorization-form-counter-legend\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"activeLinesLengthGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + " </small></p><p><small class=\"return-authorization-form-counter-legend\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"itemsToReturnLengthGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + " </small></p></fieldset> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showInvalidLines") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <fieldset class=\"return-authorization-form-comment-fieldset\"><label class=\"return-authorization-form-comment-label\" for=\"comment\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Add a comment <span class=\"return-authorization-form-comment-label-optional\">(optional)</span>",{"name":"translate","hash":{},"data":data}))
    + "</label><textarea data-action=\"comments\"  class=\"return-authorization-form-comment\" rows=\"4\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"comments") || (depth0 != null ? compilerNameLookup(depth0,"comments") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data}) : helper)))
    + "</textarea></fieldset><div class=\"form-actions\"><button type=\"submit\" class=\"return-authorization-form-submit-button\" "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasAtLeastOneActiveLine") : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Submit Request",{"name":"translate","hash":{},"data":data}))
    + "</button></div></form></section>  ";
},"useData":true}); template.Name = 'return_authorization_form'; return template;});