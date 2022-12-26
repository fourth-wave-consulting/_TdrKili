define('login_register_forgot_password.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <section class=\"login-register-forgot-password\"><header class=\"login-register-forgot-password-header\"><h1 class=\"login-register-forgot-password-header-title\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Log in",{"name":"translate","hash":{},"data":data}))
    + " </h1></header><div class=\"login-register-forgot-password-body\"><h2 class=\"login-register-forgot-password-title\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Reset Password",{"name":"translate","hash":{},"data":data}))
    + " </h2><form class=\"login-register-forgot-password-form\" novalidate><p class=\"login-register-forgot-password-description\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Enter your email below and we'll send you a link to reset your password.",{"name":"translate","hash":{},"data":data}))
    + " </p><fieldset><div class=\"login-register-forgot-password-form-controls-group\" data-validation=\"control-group\"><label class=\"login-register-forgot-password-form-label\" for=\"email\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Email Address <small class=\"login-register-forgot-password-form-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-forgot-password-form-controls\" data-validation=\"control\"><input type=\"email\" name=\"email\" id=\"email\" class=\"login-register-forgot-password-form-input\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"your@email.com",{"name":"translate","hash":{},"data":data}))
    + "\"></div></div><div data-type=\"alert-placeholder\"></div><div class=\"login-register-forgot-password-form-controls-group\"><button type=\"submit\" class=\"login-register-forgot-password-submit\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Send Email",{"name":"translate","hash":{},"data":data}))
    + " </button></div></fieldset></form><a href=\"/login-register\" class=\"login-register-forgot-password-sign-in\" data-target=\".register\" data-action=\"sign-in-now\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Log in now",{"name":"translate","hash":{},"data":data}))
    + " </a></div></section>  ";
},"useData":true}); template.Name = 'login_register_forgot_password'; return template;});