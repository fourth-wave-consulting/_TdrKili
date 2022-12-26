define('order_wizard_confirmation_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <a href=\"#\" data-touchpoint=\"customercenter\" data-hashtag=\"#/purchases/view/salesorder/"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"orderId") || (depth0 != null ? compilerNameLookup(depth0,"orderId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"orderId","hash":{},"data":data}) : helper)))
    + "\">#"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"confirmationNumber") || (depth0 != null ? compilerNameLookup(depth0,"confirmationNumber") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"confirmationNumber","hash":{},"data":data}) : helper)))
    + "</a>. ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return " #"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"confirmationNumber") || (depth0 != null ? compilerNameLookup(depth0,"confirmationNumber") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"confirmationNumber","hash":{},"data":data}) : helper)))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <p class=\"order-wizard-confirmation-module-body\" data-type=\"additional-confirmation-message\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"additionalConfirmationMessage") || (depth0 != null ? compilerNameLookup(depth0,"additionalConfirmationMessage") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"additionalConfirmationMessage","hash":{},"data":data}) : helper)))
    + "</p> ";
},"7":function(container,depth0,helpers,partials,data) {
    return "data-touchpoint=\"home\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return " <div class=\"order-wizard-confirmation-module alert fade in\"><h2 class=\"order-wizard-confirmation-module-title\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Thank you for shopping with us!",{"name":"translate","hash":{},"data":data}))
    + "</h2><p class=\"order-wizard-confirmation-module-body\" name=\"orderNumber\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Your order number is",{"name":"translate","hash":{},"data":data}))
    + " <strong> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isGuestAndCustomerCenter") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " </strong></p><p class=\"order-wizard-confirmation-module-body\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"We received your order and will process it right away.",{"name":"translate","hash":{},"data":data}))
    + "</p> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"additionalConfirmationMessage") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <a class=\"order-wizard-confirmation-module-continue\" href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"continueURL") || (depth0 != null ? compilerNameLookup(depth0,"continueURL") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"continueURL","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"touchPoint") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " data-hashtag=\"#/\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Continue shopping",{"name":"translate","hash":{},"data":data}))
    + "</a><a href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"pdfUrl") || (depth0 != null ? compilerNameLookup(depth0,"pdfUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"pdfUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"order-wizard-confirmation-module-download-pdf\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Download PDF",{"name":"translate","hash":{},"data":data}))
    + " </a></div>  ";
},"useData":true}); template.Name = 'order_wizard_confirmation_module'; return template;});