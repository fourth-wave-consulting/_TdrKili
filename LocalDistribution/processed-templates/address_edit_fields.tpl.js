define('address_edit_fields.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"address-edit-fields-group\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCompanyFieldMandatory") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "><label class=\"address-edit-fields-group-label\" for=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "company\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Company",{"name":"translate","hash":{},"data":data}))
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCompanyFieldMandatory") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + " </label><div  class=\"address-edit-fields-group-form-controls\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCompanyFieldMandatory") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "><input type=\"text\" class=\"address-edit-fields-group-input\" id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "company\" name=\"company\" value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"company") || (depth0 != null ? compilerNameLookup(depth0,"company") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"company","hash":{},"data":data}) : helper)))
    + "\" ></div></div> ";
},"2":function(container,depth0,helpers,partials,data) {
    return " data-input=\"company\" data-validation=\"control-group\" ";
},"4":function(container,depth0,helpers,partials,data) {
    return " <span class=\"address-edit-fields-group-label-required\">*</span> ";
},"6":function(container,depth0,helpers,partials,data) {
    return " <p class=\"address-edit-fields-company-optional-label\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"(optional)",{"name":"translate","hash":{},"data":data}))
    + "</p> ";
},"8":function(container,depth0,helpers,partials,data) {
    return " data-validation=\"control\" ";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"address-edit-fields-group address-edit-fields-group-big\" data-input=\"addr2\"><label for=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "addr2\" class=\"address-edit-fields-addr2-optional-label\"> "
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"(optional)",{"name":"translate","hash":{},"data":data}))
    + " </label><div><input type=\"text\" class=\"address-edit-fields-group-input\" id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "addr2\" name=\"addr2\" value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"addressLine2") || (depth0 != null ? compilerNameLookup(depth0,"addressLine2") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + "\"><small class=\"address-edit-fields-input-help\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Example: Apt. 3 or Suite #1516",{"name":"translate","hash":{},"data":data}))
    + "</small></div></div> ";
},"12":function(container,depth0,helpers,partials,data) {
    return " hide ";
},"14":function(container,depth0,helpers,partials,data) {
    return " style=\"display: none;\" ";
},"16":function(container,depth0,helpers,partials,data) {
    return " <span class=\"address-edit-fields-input-required\">*</span> ";
},"18":function(container,depth0,helpers,partials,data) {
    return " <p class=\"address-edit-fields-phone-optional-label\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"(optional)",{"name":"translate","hash":{},"data":data}))
    + "</p> ";
},"20":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"address-edit-fields-group\" data-input=\"defaultbilling\"><label class=\"address-edit-fields-group-input-checkbox\"><input type=\"checkbox\" id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "defaultbilling\" value=\"T\" data-unchecked-value=\"F\" name=\"defaultbilling\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAddressDefaultBilling") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCurrentTouchPointCheckout") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.program(25, data, 0),"data":data})) != null ? stack1 : "")
    + " </label></div><div class=\"address-edit-fields-group\" data-input=\"defaultshipping\"><label class=\"address-edit-fields-group-input-checkbox\"><input type=\"checkbox\" id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "defaultshipping\" value=\"T\" data-unchecked-value=\"F\" name=\"defaultshipping\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAddressDefaultShipping") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCurrentTouchPointCheckout") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.program(29, data, 0),"data":data})) != null ? stack1 : "")
    + " </label></div> ";
},"23":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Save as my primary billing address",{"name":"translate","hash":{},"data":data}))
    + " ";
},"25":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Make this my default billing address",{"name":"translate","hash":{},"data":data}))
    + " ";
},"27":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Save as my primary shipping address",{"name":"translate","hash":{},"data":data}))
    + " ";
},"29":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Make this my default shipping address",{"name":"translate","hash":{},"data":data}))
    + " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return " <div class=\"address-edit-fields\"><div data-type=\"alert-placeholder\"></div><small class=\"address-edit-fields\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Required",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"address-edit-fields-required\">*</span></small><div class=\"address-edit-fields-group\" data-input=\"fullname\" data-validation=\"control-group\"><label class=\"address-edit-fields-group-label\" for=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "fullname\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Full Name",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"address-edit-fields-group-label-required\">*</span></label><div  class=\"address-edit-fields-group-form-controls\" data-validation=\"control\"><input type=\"text\" class=\"address-edit-fields-group-input\" id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "fullname\" name=\"fullname\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"fullName") || (depth0 != null ? compilerNameLookup(depth0,"fullName") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"fullName","hash":{},"data":data}) : helper)))
    + "\"></div></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCompanyField") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"address-edit-fields-group\" data-input=\"addr1\" data-validation=\"control-group\"><label class=\"address-edit-fields-group-label\" for=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "addr1\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Address",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"address-edit-fields-input-required\">*</span></label><div  class=\"address-edit-fields-group-form-controls\" data-validation=\"control\"><input type=\"text\" class=\"address-edit-fields-group-input\" id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "addr1\" name=\"addr1\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"addressLine1") || (depth0 != null ? compilerNameLookup(depth0,"addressLine1") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + "\"><small class=\"address-edit-fields-input-help\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Example: 1234 Main Street",{"name":"translate","hash":{},"data":data}))
    + "</small></div></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showAddressFormSecondAddress") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"address-edit-fields-group\" data-input=\"city\" data-validation=\"control-group\"><label class=\"address-edit-fields-group-label\" for=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "city\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"City",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"address-edit-fields-input-required\">*</span></label><div  class=\"address-edit-fields-group-form-controls\" data-validation=\"control\"><input type=\"text\" class=\"address-edit-fields-group-input\" id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "city\" name=\"city\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"city") || (depth0 != null ? compilerNameLookup(depth0,"city") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "\"></div></div><div class=\"address-edit-fields-group "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCountriesField") : depth0),{"name":"unless","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-view=\"CountriesDropdown\" data-input=\"country\" data-validation=\"control-group\"></div><div class=\"address-edit-fields-group\" data-input=\"state\" data-view=\"StatesView\" data-validation=\"control-group\"></div><div class=\"address-edit-fields-group\" data-input=\"zip\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isZipOptional") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " data-validation=\"control-group\"><label class=\"address-edit-fields-group-label\" for=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "zip\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Zip Code",{"name":"translate","hash":{},"data":data}))
    + " <span class=\"address-edit-fields-input-required\">*</span></label><div  class=\"address-edit-fields-group-form-controls\" data-validation=\"control\"><input type=\"text\" class=\"address-edit-fields-group-input-zip\" id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "zip\" name=\"zip\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"zip") || (depth0 != null ? compilerNameLookup(depth0,"zip") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"zip","hash":{},"data":data}) : helper)))
    + "\" data-type=\"zip\"><small class=\"address-edit-fields-input-help\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Example: 94117",{"name":"translate","hash":{},"data":data}))
    + "</small></div></div><div class=\"address-edit-fields-group\"  data-input=\"phone\" data-validation=\"control-group\"><label class=\"address-edit-fields-group-label\" for=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "phone\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Phone Number",{"name":"translate","hash":{},"data":data}))
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPhoneFieldMandatory") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + " </label><div  class=\"address-edit-fields-group-form-controls\" data-validation=\"control\"><input type=\"tel\" class=\"address-edit-fields-group-input\" id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "phone\" name=\"phone\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"phone") || (depth0 != null ? compilerNameLookup(depth0,"phone") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"phone","hash":{},"data":data}) : helper)))
    + "\" data-action=\"inputphone\"><small class=\"address-edit-fields-input-help\">"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Example: 555-123-1234",{"name":"translate","hash":{},"data":data}))
    + "</small></div></div><div class=\"address-edit-fields-group\" data-input=\"isresidential\"><label class=\"address-edit-fields-group-input-checkbox\"><input type=\"checkbox\" id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"manage","hash":{},"data":data}) : helper)))
    + "isresidential\" value=\"T\" data-unchecked-value=\"F\" name=\"isresidential\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAddressResidential") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " > "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"This is a Residential Address",{"name":"translate","hash":{},"data":data}))
    + " <i class=\"address-edit-fields-icon-question-sign\" data-toggle=\"tooltip\" title=\"\" data-original-title=\""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Indicating that this is a residential address will help us determine the best delivery method for your items.",{"name":"translate","hash":{},"data":data}))
    + "\"></i></label></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showDefaultControls") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div>  ";
},"useData":true}); template.Name = 'address_edit_fields'; return template;});