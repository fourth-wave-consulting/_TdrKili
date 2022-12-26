define('case_detail.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <div class=\"case-detail-reply-section\"><button type=\"button\" class=\"case-detail-close-case-button\" data-action=\"close-case\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Close Case",{"name":"translate","hash":{},"data":data}))
    + "</button></div> ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"case-detail-message-group-row\"><div class=\"case-detail-message-date-section\"><span class=\"case-detail-field-message-date\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"date") || (depth0 != null ? compilerNameLookup(depth0,"date") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</span></div> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"messages") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"case-detail-message-row "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"initialMessage") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"><div class=\"case-detail-message\"><span class=\"case-detail-field-message-author\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"author") || (depth0 != null ? compilerNameLookup(depth0,"author") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</span><span class=\"case-detail-field-message-field-message-time\"> ("
    + alias4(((helper = (helper = compilerNameLookup(helpers,"messageDate") || (depth0 != null ? compilerNameLookup(depth0,"messageDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"messageDate","hash":{},"data":data}) : helper)))
    + ")</span> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"initialMessage") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div><p class=\"case-detail-field-message-text\">"
    + alias4((compilerNameLookup(helpers,"breaklines") || (depth0 && compilerNameLookup(depth0,"breaklines")) || alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"text") : depth0),{"name":"breaklines","hash":{},"data":data}))
    + "</p></div> ";
},"5":function(container,depth0,helpers,partials,data) {
    return "sc-highlighted";
},"7":function(container,depth0,helpers,partials,data) {
    return " <span class=\"case-detail-field-message-original\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"- Original case message",{"name":"translate","hash":{},"data":data}))
    + "</span> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <section class=\"case-detail\"><header class=\"case-detail-title\"><a href=\"/cases\" class=\"case-detail-back-btn\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"&lt; Back to Cases",{"name":"translate","hash":{},"data":data}))
    + "</a><h2 class=\"case-detail-header-title\"><span class=\"case-detail-field-number\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + "</span><span class=\"case-detail-field-subject\"> "
    + alias3(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"title") : stack1), depth0))
    + "</span></h2></header><div data-confirm-message class=\"case-detail-confirm-message\"></div><div data-type=\"alert-placeholder\"></div><div class=\"case-detail-header-information\"><div class=\"case-detail-header-row\"><div class=\"case-detail-header-col-left\"><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"<span class=\"case-detail-label-type\">Type of inquiry: </span><span class=\"case-detail-value-type\">$(0)</span>",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"category") : stack1)) != null ? compilerNameLookup(stack1,"name") : stack1),{"name":"translate","hash":{},"data":data}))
    + "</p><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"<span class=\"case-detail-label-creation-date\">Creation date: </span><span class=\"case-detail-value-creation-date\">$(0)</span>",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdDate") : stack1),{"name":"translate","hash":{},"data":data}))
    + "</p><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"<span class=\"case-detail-label-last-message-date\">Last message: </span><span class=\"case-detail-value-last-message-date\">$(0)</span>",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"lastMessageDate") : stack1),{"name":"translate","hash":{},"data":data}))
    + "</p></div><div class=\"case-detail-header-col-right\"><p class=\"case-detail-header-status-info\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"<span class=\"case-detail-label-status\">Status: </span><span class=\"case-detail-value-status\">$(0)</span>",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"status") : stack1)) != null ? compilerNameLookup(stack1,"name") : stack1),{"name":"translate","hash":{},"data":data}))
    + "</p> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"closeStatusId") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div></div></div><div class=\"case-detail-conversation-background\"><form action=\"#\"><div class=\"case-detail-reply-container\" data-validation=\"control-group\"><label class=\"case-detail-reply-label\" for=\"reply\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Reply with a message:",{"name":"translate","hash":{},"data":data}))
    + "</label><span class=\"case-detail-controls\" data-validation=\"control\"><textarea name=\"reply\" id=\"reply\" class=\"case-detail-reply-textarea\" rows=\"4\"></textarea></span></div><div class=\"case-detail-reply-section\"><button type=\"submit\" class=\"case-detail-reply-button\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Reply",{"name":"translate","hash":{},"data":data}))
    + "</button></div></form><div class=\"case-detail-messages-accordion\"><div class=\"case-detail-accordion-head\"><a class=\"case-detail-accordion-head-toggle\" data-toggle=\"collapse\" data-target=\"#response-messages\" aria-expanded=\"true\" aria-controls=\"response-messages\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Messages ($(0))",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"messages_count") : stack1),{"name":"translate","hash":{},"data":data}))
    + " <i class=\"case-detail-accordion-toggle-icon\"></i></a></div><div class=\"case-detail-accordion-body collapse in\" id=\"response-messages\" role=\"tabpanel\" data-target=\"#response-messages\"><div class=\"case-detail-accordion-container\"> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"grouped_messages") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div></div></div></div></section>  ";
},"useData":true}); template.Name = 'case_detail'; return template;});