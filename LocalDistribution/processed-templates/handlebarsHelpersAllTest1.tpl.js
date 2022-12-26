define('handlebarsHelpersAllTest1.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return alias1(container.lambda(depth0, depth0))
    + ", first: "
    + alias1(((helper = (helper = compilerNameLookup(helpers,"first") || (data && compilerNameLookup(data,"first"))) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"first","hash":{},"data":data}) : helper)))
    + ", last: "
    + alias1(((helper = (helper = compilerNameLookup(helpers,"last") || (data && compilerNameLookup(data,"last"))) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"last","hash":{},"data":data}) : helper)))
    + ", index: "
    + alias1(((helper = (helper = compilerNameLookup(helpers,"index") || (data && compilerNameLookup(data,"index"))) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"index","hash":{},"data":data}) : helper)))
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"a") || (depth0 != null ? compilerNameLookup(depth0,"a") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"a","hash":{},"data":data}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    return "noimprimo";
},"7":function(container,depth0,helpers,partials,data) {
    return "siimprimo";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"objectToAttributes") || (depth0 != null ? compilerNameLookup(depth0,"objectToAttributes") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"objectToAttributes","hash":{},"data":data}) : helper)))
    + " ";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"objectToAtrributes") || (depth0 != null ? compilerNameLookup(depth0,"objectToAtrributes") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"objectToAtrributes","hash":{},"data":data}) : helper)))
    + " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " {\n	\"description\": \"this template generates json using several combination of all handlebar helpers defined so we can test them :)\",\n	\"translate\": \""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"hello $(0) $(1)","my","precious",{"name":"translate","hash":{},"data":data}))
    + "\",\n	\"formatCurrency\": \""
    + alias3((compilerNameLookup(helpers,"formatCurrency") || (depth0 && compilerNameLookup(depth0,"formatCurrency")) || alias2).call(alias1,"10000","$",{"name":"formatCurrency","hash":{},"data":data}))
    + "\",\n	\"each1\": \""
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"each1") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\",\n	\"each2\": \""
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"each2") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\",\n	\"each3\": \""
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"each3") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\",\n	\"highlightKeyword\": \""
    + alias3((compilerNameLookup(helpers,"highlightKeyword") || (depth0 && compilerNameLookup(depth0,"highlightKeyword")) || alias2).call(alias1,"hello world","world",{"name":"highlightKeyword","hash":{},"data":data}))
    + "\",\n	\"breaklines1\": \""
    + alias3((compilerNameLookup(helpers,"breaklines") || (depth0 && compilerNameLookup(depth0,"breaklines")) || alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"breaklines1") : depth0),{"name":"breaklines","hash":{},"data":data}))
    + "\",\n	\"ifEquals1\": \"ifEquals1:"
    + ((stack1 = (compilerNameLookup(helpers,"ifEquals") || (depth0 && compilerNameLookup(depth0,"ifEquals")) || alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"ifEquals1") : depth0),(depth0 != null ? compilerNameLookup(depth0,"ifEquals2") : depth0),{"name":"ifEquals","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (compilerNameLookup(helpers,"ifEquals") || (depth0 && compilerNameLookup(depth0,"ifEquals")) || alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"ifEquals1") : depth0),(depth0 != null ? compilerNameLookup(depth0,"ifEquals1") : depth0),{"name":"ifEquals","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\",\n	\"objectToAttributes1\": \""
    + ((stack1 = compilerNameLookup(helpers,"with").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"objectToAttributesData1") : depth0),{"name":"with","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\",\n	\"objectToAtrributes1\": \""
    + ((stack1 = compilerNameLookup(helpers,"with").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"objectToAttributesData1") : depth0),{"name":"with","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n}";
},"useData":true}); template.Name = 'handlebarsHelpersAllTest1'; return template;});