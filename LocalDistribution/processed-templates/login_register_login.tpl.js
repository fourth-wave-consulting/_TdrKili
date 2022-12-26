define('login_register_login.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Login below or <a class=\"login-register-login-register-now\" href=\"register\" data-toggle=\"show-in-modal\" data-type=\"register-now\">create an account</a>",{"name":"translate","hash":{},"data":data}))
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Login below to checkout with an existing account",{"name":"translate","hash":{},"data":data}))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    return " autofocus ";
},"7":function(container,depth0,helpers,partials,data) {
    return " <div class=\"login-register-login-form-controls-group\" data-validation=\"control-group\"><div class=\"login-register-login-form-controls\" data-validation=\"control\"><input value=\"true\" type=\"hidden\" name=\"redirect\"></div></div> ";
},"9":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"GlobalMessageSessionTimeout\"></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <h2 class=\"login-register-login-title\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Returning customer",{"name":"translate","hash":{},"data":data}))
    + "</h2><p class=\"login-register-login-description\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSkipLogin") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " </p><small class=\"login-register-login-required\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Required <span class=\"login-register-login-form-required\">*</span>",{"name":"translate","hash":{},"data":data}))
    + "</small><form class=\"login-register-login-form\" novalidate><fieldset class=\"login-register-login-form-fieldset\"><div class=\"login-register-login-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-login-form-label\" for=\"login-email\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Email Address <small class=\"login-register-login-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-login-form-controls\" data-validation=\"control\"><input "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasAutoFocus") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " type=\"email\" name=\"email\" id=\"login-email\" class=\"login-register-login-form-input\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"your@email.com",{"name":"translate","hash":{},"data":data}))
    + "\"/></div></div><div class=\"login-register-login-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-login-form-label\" for=\"login-password\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Password <small class=\"login-register-login-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-login-form-controls\" data-validation=\"control\"><input type=\"password\" name=\"password\" id=\"login-password\" class=\"login-register-login-form-input\"></div></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isRedirect") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div data-type=\"alert-placeholder\" class=\"login-register-login-form-messages\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isUserSessionTimedOut") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div><div class=\"login-register-login-form-controls-group\" data-type=\"form-login-action\"><button type=\"submit\" class=\"login-register-login-submit\" data-action=\"login-button\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Log In",{"name":"translate","hash":{},"data":data}))
    + " </button><a class=\"login-register-login-forgot\" data-action=\"forgot-password\" href=\"/forgot-password\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Forgot password?",{"name":"translate","hash":{},"data":data}))
    + " </a></div></fieldset></form>  ";
},"useData":true}); template.Name = 'login_register_login'; return template;});