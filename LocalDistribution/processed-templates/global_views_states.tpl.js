define('global_views_states.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <label class=\"global-views-states-group-label is-required\" for=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "state\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"State",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"global-views-states-input-required\">*</span></label><div  class=\"global-views-states-group-form-controls\" data-validation=\"control\"><select class=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"inputClass") || (depth0 != null ? compilerNameLookup(depth0,"inputClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inputClass","hash":{},"data":data}) : helper)))
    + " global-views-states-group-select\" id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "state\" name=\"state\" data-type=\"selectstate\" data-action=\"selectstate\" ><option value=\"\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"-- Select --",{"name":"translate","hash":{},"data":data}))
    + " </option> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"states") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </select></div> ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <option value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"code") || (depth0 != null ? compilerNameLookup(depth0,"code") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSelected") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " > "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " </option> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <label class=\"global-views-states-group-label\" for=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "state\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"State/Province/Region",{"name":"translate","hash":{},"data":data}))
    + " <p class=\"global-views-states-optional-label\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"(optional)",{"name":"translate","hash":{},"data":data}))
    + "</p></label><div  class=\"global-views-states-group-form-controls\" data-validation=\"control\"><input\n			type=\"text\"\n			id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "state\"\n			name=\"state\"\n			class=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"inputClass") || (depth0 != null ? compilerNameLookup(depth0,"inputClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inputClass","hash":{},"data":data}) : helper)))
    + " global-views-states-group-input\"\n			value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"selectedState") || (depth0 != null ? compilerNameLookup(depth0,"selectedState") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"selectedState","hash":{},"data":data}) : helper)))
    + "\"\n			data-action=\"inputstate\"\n		></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isCountryAndStatePresent") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'global_views_states'; return template;});