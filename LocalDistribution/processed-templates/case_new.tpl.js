define('case_new.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <a href=\"/\" class=\"case-new-button-back\"><i class=\"case-new-button-back-icon\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Account",{"name":"translate","hash":{},"data":data}))
    + " </a> ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <option value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"id") || (depth0 != null ? compilerNameLookup(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + " </option> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackToAccount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <section class=\"case-new\"><header class=\"case-new-header\"><h2 class=\"case-new-title\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + "</h2></header><div class=\"case-new-alert-placeholder\" data-type=\"alert-placeholder\"></div><small class=\"case-new-required\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Required",{"name":"translate","hash":{},"data":data}))
    + "<span class=\"case-new-form-required\">*</span></small><form action=\"#\" class=\"case-new-form\" novalidate><div class=\"case-new-form-controls-group\" data-validation=\"control-group\"><label class=\"case-new-form-label\" for=\"title\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Subject <small class=\"case-new-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"case-new-form-controls\" data-validation=\"control\"><input data-action=\"text\" type=\"text\" name=\"title\" id=\"title\" class=\"case-new-form-input\" value=\"\" maxlength=\"300\"/></div></div><div class=\"case-new-form-controls-group\" data-validation=\"control-group\"><label class=\"case-new-form-label\" for=\"category\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Type of inquiry",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"case-new-form-controls\" data-validation=\"control\"><select name=\"category\" id=\"category\" class=\"case-new-form-case-category\"> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </select></div></div><div class=\"case-new-form-controls-group\" data-validation=\"control-group\"><label  class=\"case-new-form-label\" for=\"message\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Message <small class=\"case-new-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"case-new-form-controls\" data-validation=\"control\"><textarea name=\"message\" id=\"message\" class=\"case-new-form-textarea\"></textarea></div></div><div class=\"case-new-form-controls-group\"><label class=\"case-new-form-label\"><input data-action=\"include_email\" type=\"checkbox\" name=\"include_email\" id=\"include_email\" class=\"case-new-form-include-email\"/> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"I want to use another email address for this case",{"name":"translate","hash":{},"data":data}))
    + " </label></div><div class=\"collapse\" data-collapse-content data-validation=\"control-group\"><label for=\"email\" class=\"case-new-form-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Email <small class=\"case-new-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"case-new-form-controls\" data-validation=\"control\"><input type=\"email\" autofocus name=\"email\" id=\"email\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"yourname@company.com",{"name":"translate","hash":{},"data":data}))
    + "\" data-case-email class=\"case-new-form-input\" value=\"\" disabled maxlength=\"300\"/></div></div><div class=\"case-new-form-controls-group\"><button type=\"submit\" class=\"case-new-button-submit\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Submit",{"name":"translate","hash":{},"data":data}))
    + "</button></div></form></section>  ";
},"useData":true}); template.Name = 'case_new'; return template;});