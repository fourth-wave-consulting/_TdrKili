define('order_wizard_registeremail_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"order-wizard-registeremail-module\"><div class=\"order-wizard-registeremail-module-show-addresses-container\"><h3 class=\"order-wizard-registeremail-module-title\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Enter Email Address",{"name":"translate","hash":{},"data":data}))
    + " </h3><div class=\"order-wizard-registeremail-module-form-placeholder\"><label class=\"order-wizard-registeremail-module-edit-fields-group-label\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Email Address",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"order-wizard-registeremail-module-input-required\">*</span></label><input type=\"email\" name=\"email\" id=\"email\" class=\"order-wizard-registeremail-module-edit-fields-group-input\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"your@email.com",{"name":"translate","hash":{},"data":data}))
    + "\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"email") || (depth0 != null ? compilerNameLookup(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\" ><small class=\"order-wizard-registeremail-module-input-help\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"We need you email address to send you information about your order.",{"name":"translate","hash":{},"data":data}))
    + " </small></div><label class=\"order-wizard-registeremail-module-checkbox\"><input\n				type=\"checkbox\"\n				name=\"sign-up-newsletter\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isEmailSubcribe") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " > "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Sign up for our Newsletter to receive promotions",{"name":"translate","hash":{},"data":data}))
    + " </label></div></div>  ";
},"useData":true}); template.Name = 'order_wizard_registeremail_module'; return template;});