define('login_register_register.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <p class=\"login-register-register-form-description\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Create an account and take advantage of faster checkouts and other great benefits.",{"name":"translate","hash":{},"data":data}))
    + " </p><form class=\"login-register-register-form\" method=\"POST\" novalidate><small class=\"login-register-register-required\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Required <span class=\"login-register-register-form-required\">*</span>",{"name":"translate","hash":{},"data":data}))
    + "</small> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " autofocus ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-register-form-label\" for=\"register-company\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isCompanyFieldRequire") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + " </label><div class=\"login-register-register-form-controls\" data-validation=\"control\"><input type=\"text\" name=\"company\" id=\"register-company\" class=\"login-register-register-form-input\"/></div></div> ";
},"6":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Company <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " ";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Company",{"name":"translate","hash":{},"data":data}))
    + " <small class=\"login-register-register-form-optional\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"(optional)",{"name":"translate","hash":{},"data":data}))
    + "</small> ";
},"10":function(container,depth0,helpers,partials,data) {
    return " <div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\"><div class=\"login-register-register-form-controls\" data-validation=\"control\"><input value=\"true\" type=\"hidden\" name=\"redirect\"></div></div> ";
},"12":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"14":function(container,depth0,helpers,partials,data) {
    return " <div class=\"login-register-register-form-controls-group\"><button type=\"submit\" class=\"login-register-register-form-submit\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Create Account",{"name":"translate","hash":{},"data":data}))
    + " </button></div></form> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showFormFieldsOnly") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-register-form-label\" for=\"register-firstname\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"First Name <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-register-form-controls\" data-validation=\"control\"><input "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasAutoFocus") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " type=\"text\" name=\"firstname\" id=\"register-firstname\" class=\"login-register-register-form-input\"></div></div><div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-register-form-label\" for=\"register-lastname\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Last Name <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-register-form-controls\" data-validation=\"control\"><input type=\"text\" name=\"lastname\" id=\"register-lastname\" class=\"login-register-register-form-input\"></div></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCompanyField") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-register-form-label\" for=\"register-email\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Email Address <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-register-form-controls\" data-validation=\"control\"><input type=\"email\" name=\"email\" id=\"register-email\" class=\"login-register-register-form-input\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"your@email.com",{"name":"translate","hash":{},"data":data}))
    + "\"><p class=\"login-register-register-form-help-block\"><small> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"We need your email address to contact you about your order.",{"name":"translate","hash":{},"data":data}))
    + " </small></p></div></div><div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-register-form-label\" for=\"register-password\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Password <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-register-form-controls\" data-validation=\"control\"><input type=\"password\" name=\"password\" id=\"register-password\" class=\"login-register-register-form-input\"></div></div><div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-register-form-label\" for=\"register-password2\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Re-Enter Password <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-register-form-controls\" data-validation=\"control\"><input type=\"password\" name=\"password2\" id=\"register-password2\" class=\"login-register-register-form-input\"></div></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isRedirect") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"login-register-register-form-controls-group\"><label class=\"login-register-register-form-label\"><input type=\"checkbox\" name=\"emailsubscribe\" id=\"register-emailsubscribe\" value=\"T\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isEmailSubscribeChecked") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Yes, Please sign me up for $(0) exclusive offers and promotions",(depth0 != null ? compilerNameLookup(depth0,"siteName") : depth0),{"name":"translate","hash":{},"data":data}))
    + " </label></div><div class=\"login-register-register-form-messages\" data-type=\"alert-placeholder\"></div> "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showFormFieldsOnly") : depth0),{"name":"unless","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'login_register_register'; return template;});