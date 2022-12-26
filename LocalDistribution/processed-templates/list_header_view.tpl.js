define('list_header_view.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"list-header-view\" data-type=\"accordion\"><div class=\"list-header-view-accordion\" data-action=\"accordion-header\"><div class=\"list-header-view-accordion-link\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"headerMarkup") || (depth0 != null ? compilerNameLookup(depth0,"headerMarkup") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"headerMarkup","hash":{},"data":data}) : helper)))
    + "</div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showHeaderExpandable") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div></div> ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return " <div class=\"list-header-view-accordion-header\"><button class=\"list-header-view-filter-button\" data-action=\"toggle-filters\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Filter",{"name":"translate","hash":{},"data":data}))
    + " <i class=\"list-header-view-filter-button-icon\" ></i></button></div><div class=\"list-header-view-accordion-body "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsed") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsed") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"initiallyCollapsed","hash":{},"data":data}) : helper)))
    + "\" data-type=\"accordion-body\" "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"accordionStyle") || (depth0 != null ? compilerNameLookup(depth0,"accordionStyle") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"accordionStyle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "><div class=\"list-header-view-accordion-body-header "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"classes") || (depth0 != null ? compilerNameLookup(depth0,"classes") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"classes","hash":{},"data":data}) : helper)))
    + "\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"rangeFilter") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"sorts") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"filters") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div></div> ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class=\"list-header-view-datepicker-from\"><label class=\"list-header-view-from\" for=\"from\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"rangeFilterLabel") || (depth0 != null ? compilerNameLookup(depth0,"rangeFilterLabel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rangeFilterLabel","hash":{},"data":data}) : helper)))
    + "</label><div class=\"list-header-view-datepicker-container-input\"><input class=\"list-header-view-accordion-body-input\" id=\"from\" name=\"from\" type=\"date\" autocomplete=\"off\" data-format=\"yyyy-mm-dd\" data-start-date=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"rangeFilterFromMin") || (depth0 != null ? compilerNameLookup(depth0,"rangeFilterFromMin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rangeFilterFromMin","hash":{},"data":data}) : helper)))
    + "\" data-end-date=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"rangeFilterFromMax") || (depth0 != null ? compilerNameLookup(depth0,"rangeFilterFromMax") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rangeFilterFromMax","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"selectedRangeFrom") || (depth0 != null ? compilerNameLookup(depth0,"selectedRangeFrom") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"selectedRangeFrom","hash":{},"data":data}) : helper)))
    + "\" data-action=\"range-filter\" data-todayhighlight=\"true\"/><i class=\"list-header-view-accordion-body-calendar-icon\"></i><a class=\"list-header-view-accordion-body-clear\" data-action=\"clear-value\"><i class=\"list-header-view-accordion-body-clear-icon\"></i></a></div></div><div class=\"list-header-view-datepicker-to\"><label class=\"list-header-view-to\" for=\"to\">"
    + alias4((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"to",{"name":"translate","hash":{},"data":data}))
    + "</label><div class=\"list-header-view-datepicker-container-input\"><input class=\"list-header-view-accordion-body-input\" id=\"to\" name=\"to\" type=\"date\" autocomplete=\"off\" data-format=\"yyyy-mm-dd\" data-start-date=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"rangeFilterToMin") || (depth0 != null ? compilerNameLookup(depth0,"rangeFilterToMin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rangeFilterToMin","hash":{},"data":data}) : helper)))
    + "\" data-end-date=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"rangeFilterToMax") || (depth0 != null ? compilerNameLookup(depth0,"rangeFilterToMax") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rangeFilterToMax","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"selectedRangeTo") || (depth0 != null ? compilerNameLookup(depth0,"selectedRangeTo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"selectedRangeTo","hash":{},"data":data}) : helper)))
    + "\" data-action=\"range-filter\" data-todayhighlight=\"true\"/><i class=\"list-header-view-accordion-body-calendar-icon\"></i><a class=\"list-header-view-accordion-body-clear\" data-action=\"clear-value\"><i class=\"list-header-view-accordion-body-clear-icon\"></i></a></div></div> ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <span class=\"list-header-view-sorts\"><label class=\"list-header-view-filters\"><select name=\"sort\" class=\"list-header-view-accordion-body-select\" data-action=\"sort\"> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"sorts") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </select></label><button class=\"list-header-view-accordion-body-button-sort\" data-action=\"toggle-sort\"><i class=\"list-header-view-accordion-body-button-sort-up "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"sortIconUp") || (depth0 != null ? compilerNameLookup(depth0,"sortIconUp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sortIconUp","hash":{},"data":data}) : helper)))
    + "\"></i><i class=\"list-header-view-accordion-body-button-sort-down "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"sortIconDown") || (depth0 != null ? compilerNameLookup(depth0,"sortIconDown") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sortIconDown","hash":{},"data":data}) : helper)))
    + "\"></i></button></span> ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <option value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"value") || (depth0 != null ? compilerNameLookup(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" data-permissions=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"permission") || (depth0 != null ? compilerNameLookup(depth0,"permission") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"permission","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option> ";
},"7":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <label class=\"list-header-view-filters\"><select name=\"filter\" class=\"list-header-view-accordion-body-select\" data-action=\"filter\"> "
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"filters") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </select></label> ";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <option value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemValue") || (depth0 != null ? compilerNameLookup(depth0,"itemValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemValue","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"cssClassName") || (depth0 != null ? compilerNameLookup(depth0,"cssClassName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cssClassName","hash":{},"data":data}) : helper)))
    + "\" data-permissions=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"permission") || (depth0 != null ? compilerNameLookup(depth0,"permission") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"permission","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option> ";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"list-header-view-select-all\"><label class=\"list-header-view-select-all-label\" for=\"select-all\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"unselectedLength") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + " </label></div> ";
},"13":function(container,depth0,helpers,partials,data) {
    return " <input type=\"checkbox\" name=\"select-all\" id=\"select-all\" data-action=\"select-all\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Select All ($(0))",(depth0 != null ? compilerNameLookup(depth0,"collectionLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " ";
},"15":function(container,depth0,helpers,partials,data) {
    return " <input type=\"checkbox\" name=\"select-all\" id=\"select-all\" data-action=\"unselect-all\" checked>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Unselect All ($(0))",(depth0 != null ? compilerNameLookup(depth0,"collectionLength") : depth0),{"name":"translate","hash":{},"data":data}))
    + " ";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"list-header-view-paginator\"><div data-view=\"GlobalViews.Pagination\"></div> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showCurrentPage") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> ";
},"18":function(container,depth0,helpers,partials,data) {
    return " <div data-view=\"GlobalViews.ShowCurrentPage\"></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showHeader") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSelectAll") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPagination") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'list_header_view'; return template;});