define('return_authorization_form_item_actions.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <label class=\"return-authorization-form-item-actions-label\" for=\"reason\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(alias1,"Reason for return",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"return-authorization-form-item-actions-required\">*</span></label> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showReasons") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <select data-action=\"reasons\" name=\"reason\" class=\"return-authorization-form-item-actions-options\" data-toggle=\"false\"><option value=\"\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(alias1,"Select a reason",{"name":"translate","hash":{},"data":data}))
    + "</option> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"reasons") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </select> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isOtherReasonSelected") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"activeLinesLengthGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <option value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"id") || (depth0 != null ? compilerNameLookup(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSelected") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</option> ";
},"4":function(container,depth0,helpers,partials,data) {
    return "selected";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <input type=\"text\" data-action=\"reason-text\" name=\"reason-text\" value=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"textReason") || (depth0 != null ? compilerNameLookup(depth0,"textReason") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"textReason","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"false\" class=\"return-authorization-form-item-actions-other-reason-input\"> ";
},"8":function(container,depth0,helpers,partials,data) {
    return " <a href=\"#\" class=\"return-authorization-form-item-actions-apply-reason-button\" data-action=\"apply-reason\" data-toggle=\"false\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Apply to all",{"name":"translate","hash":{},"data":data}))
    + "</a> ";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <input type=\"text\" data-action=\"reason-text\" name=\"reason-text\" value=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"textReason") || (depth0 != null ? compilerNameLookup(depth0,"textReason") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"textReason","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"false\" class=\"return-authorization-form-item-actions-other-reason-text\"> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLineActive") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'return_authorization_form_item_actions'; return template;});