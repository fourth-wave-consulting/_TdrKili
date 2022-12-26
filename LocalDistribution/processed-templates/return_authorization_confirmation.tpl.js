define('return_authorization_confirmation.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "in";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return " <div class=\"return-authorization-confirmation-comments-row\"><div class=\"return-authorization-confirmation-comments\"><p>"
    + alias1((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Comments:",{"name":"translate","hash":{},"data":data}))
    + "</p><blockquote>"
    + alias1(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"memo") : stack1), depth0))
    + "</blockquote></div></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"return-authorization-confirmation\"><h2 class=\"return-authorization-confirmation-title\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"pageTitle") || (depth0 != null ? compilerNameLookup(depth0,"pageTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTitle","hash":{},"data":data}) : helper)))
    + "</h2><div class=\"return-authorization-confirmation-module\"><h2 class=\"return-authorization-confirmation-module-title\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Thank you!",{"name":"translate","hash":{},"data":data}))
    + "</h2><p class=\"return-authorization-confirmation-module-body\"><a href=\"returns/returnauthorization/"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"internalId") || (depth0 != null ? compilerNameLookup(depth0,"internalId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"internalId","hash":{},"data":data}) : helper)))
    + "\" class=\"return-authorization-confirmation-module-body-return-id\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Return request #$(0)",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"tranid") : stack1),{"name":"translate","hash":{},"data":data}))
    + "</a></p><p class=\"return-authorization-confirmation-module-body\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Your request was successfully submitted and a representative will contact you briefly.",{"name":"translate","hash":{},"data":data}))
    + " "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"An email was sent to you with a copy of this request.",{"name":"translate","hash":{},"data":data}))
    + " </p><a href=\"/returns\" class=\"return-authorization-confirmation-module-continue\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Go to list of requests",{"name":"translate","hash":{},"data":data}))
    + "</a></div><h3><span>"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"From:",{"name":"translate","hash":{},"data":data}))
    + "</span>"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Purchase #$(0)",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"tranid") : stack1),{"name":"translate","hash":{},"data":data}))
    + " <span class=\"return-authorization-confirmation-amount\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"totalFormatted") || (depth0 != null ? compilerNameLookup(depth0,"totalFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalFormatted","hash":{},"data":data}) : helper)))
    + "</span></h3><div class=\"return-authorization-confirmation-row\" name=\"return-content-layout\"><div class=\"return-authorization-confirmation-content-col\"><div class=\"return-authorization-confirmation-accordion-divider\"><div class=\"return-authorization-confirmation-accordion-head\"><a href=\"#\" class=\"return-authorization-confirmation-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#return-products\" aria-expanded=\"true\" aria-controls=\"return-products\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Items ($(0))",(depth0 != null ? compilerNameLookup(depth0,"linesLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " <i class=\"return-authorization-confirmation-head-toggle-icon\"></i></a></div><div class=\"return-authorization-confirmation-body collapse "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showOpenedAccordion") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"return-products\" role=\"tabpanel\" data-target=\"#return-products\"><table class=\"return-authorization-confirmation-products-table\"><thead class=\"return-authorization-confirmation-headers\"><tr><th class=\"return-authorization-confirmation-headers-image\"></th><th class=\"return-authorization-confirmation-headers-product\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Item",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-confirmation-headers-amount\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-confirmation-headers-quantity\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Qty to return",{"name":"translate","hash":{},"data":data}))
    + "</th><th class=\"return-authorization-confirmation-headers-reason\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Reason for Return",{"name":"translate","hash":{},"data":data}))
    + "</th></tr></thead><tbody data-view=\"Items.Collection\"></tbody></table></div></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showComments") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div></div></div>  ";
},"useData":true}); template.Name = 'return_authorization_confirmation'; return template;});