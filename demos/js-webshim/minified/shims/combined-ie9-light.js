(function(a){if(!navigator.geolocation){var h=function(){setTimeout(function(){throw"document.write is overwritten by geolocation shim. This method is incompatibel with this plugin";},1)},v=0,q=a.webshims.modules.geolocation.options||{};navigator.geolocation=function(){var m,r={getCurrentPosition:function(k,n,p){var d=2,b,e,c,f=function(){if(!c)if(m){c=true;k(a.extend({timestamp:(new Date).getTime()},m));o();if(window.JSON&&window.sessionStorage)try{sessionStorage.setItem("storedGeolocationData654321",
JSON.stringify(m))}catch(j){}}else if(n&&!d){c=true;o();n({code:2,message:"POSITION_UNAVAILABLE"})}},i=function(){d--;g();f()},o=function(){a(document).unbind("google-loader",o);clearTimeout(e);clearTimeout(b)},g=function(){if(m||!window.google||!google.loader||!google.loader.ClientLocation)return false;var j=google.loader.ClientLocation;m={coords:{latitude:j.latitude,longitude:j.longitude,altitude:null,accuracy:43E3,altitudeAccuracy:null,heading:parseInt("NaN",10),velocity:null},address:a.extend({streetNumber:"",
street:"",premises:"",county:"",postalCode:""},j.address)};return true};if(!m){g();if(!(m||!window.JSON||!window.sessionStorage))try{m=(m=sessionStorage.getItem("storedGeolocationData654321"))?JSON.parse(m):false;m.coords||(m=false)}catch(l){m=false}}if(m)setTimeout(f,1);else if(!(q.confirmText&&!confirm(q.confirmText.replace("{location}",location.hostname)))){a.ajax({url:"http://freegeoip.net/json/",dataType:"jsonp",cache:true,jsonp:"callback",success:function(j){d--;if(j){m=m||{coords:{latitude:j.latitude,
longitude:j.longitude,altitude:null,accuracy:43E3,altitudeAccuracy:null,heading:parseInt("NaN",10),velocity:null},address:{city:j.city,country:j.country_name,countryCode:j.country_code,county:"",postalCode:j.zipcode,premises:"",region:j.region_name,street:"",streetNumber:""}};f()}},error:function(){d--;f()}});clearTimeout(e);if(!window.google||!window.google.loader)e=setTimeout(function(){if(q.destroyWrite){document.write=h;document.writeln=h}a(document).one("google-loader",i);a.webshims.loader.loadScript("http://www.google.com/jsapi",
false,"google-loader")},800);else d--;b=p&&p.timeout?setTimeout(function(){o();n&&n({code:3,message:"TIMEOUT"})},p.timeout):setTimeout(function(){d=0;f()},1E4)}},clearWatch:a.noop};r.watchPosition=function(k,n,p){r.getCurrentPosition(k,n,p);v++;return v};return r}()}})(jQuery);jQuery.webshims.gcEval=function(a,h){return function(v){eval(v)}.call(h||window,a)};
jQuery.webshims.ready("es5",function(a,h,v,q,m){h.getVisualInput=function(g){g=a(g);return(g.data("inputUIReplace")||{visual:g}).visual};var r=a.support,k=h.getVisualInput,n={checkbox:1,radio:1},p=a([]),d=function(g){g=a(g);return n[g[0].type]&&g[0].name?a(q.getElementsByName(g[0].name)).not(g[0]):p},b={number:1,range:1,date:1,time:1,"datetime-local":1,datetime:1,month:1,week:1};a.extend(a.expr.filters,{"valid-element":function(g){return!!(a.attr(g,"willValidate")&&(a.attr(g,"validity")||{valid:true}).valid)},
"invalid-element":function(g){return!!(a.attr(g,"willValidate")&&!e(g))},"required-element":function(g){return!!(a.attr(g,"willValidate")&&a.attr(g,"required")===true)},"optional-element":function(g){return!!(a.attr(g,"willValidate")&&a.attr(g,"required")===false)},"in-range":function(g){if(!b[a.attr(g,"type")]||!a.attr(g,"willValidate"))return false;g=a.attr(g,"validity");return!!(g&&!g.rangeOverflow&&!g.rangeUnderflow)},"out-of-range":function(g){if(!b[a.attr(g,"type")]||!a.attr(g,"willValidate"))return false;
g=a.attr(g,"validity");return!!(g&&(g.rangeOverflow||g.rangeUnderflow))}});["required","valid","invalid","required","optional"].forEach(function(g){a.expr.filters[g]=a.expr.filters[g+"-element"]});var e=function(g){return(a.attr(g,"validity")||{valid:true}).valid},c=a.attr,f={selectedIndex:1,value:1,checked:1,disabled:1,readonly:1},i;a.attr=function(g,l,j){if(g.form&&f[l]&&j!==m&&a(g).hasClass("form-ui-invalid")){var s=c.apply(this,arguments);if(e(g)){k(g).removeClass("form-ui-invalid");l=="checked"&&
j&&d(g).removeClass("form-ui-invalid").removeAttr("aria-invalid")}return s}return c.apply(this,arguments)};a(document).bind("focusout change refreshValidityStyle",function(g){if(!(i||!g.target||!g.target.form||g.target.type=="submit")){var l=a.attr(g.target,"html5element")||g.target;if(a.attr(l,"willValidate")){var j,s;if(e(g.target)){j="form-ui-valid";s="form-ui-invalid";n[g.target.type]&&g.target.checked&&d(l).removeClass(s).removeAttr("aria-invalid")}else{j="form-ui-invalid";s="form-ui-valid";
n[g.target.type]&&!g.target.checked&&d(l).removeClass(s)}k(l).addClass(j).removeClass(s);i=true;setTimeout(function(){i=false},9)}else k(l).removeClass("form-ui-invalid form-ui-valid")}});h.triggerInlineForm=function(){var g=function(l){if(typeof l!="string"||l.indexOf("-")!==-1||l.indexOf(".")!==-1||l.indexOf('"')!==-1)return"";return"var "+l+' = this.form["'+l+'"];'};return function(l,j){var s=l["on"+j]||l.getAttribute("on"+j)||"",w;j=a.Event({type:j,target:l[0],currentTarget:l[0]});if(s&&typeof s==
"string"&&l.form&&l.form.elements){w="";for(var y=0,A=l.form.elements,t=A.length;y<t;y++){var u=A[y].name,x=A[y].id;if(u)w+=g(u);if(x&&x!==u)w+=g(x)}w=h.gcEval(w+s,l)}if(w===false){j.stopPropagation();j.preventDefault()}a(l).trigger(j);return w}}();var o=function(){h.scrollRoot=a.browser.webkit||q.compatMode=="BackCompat"?a(q.body):a(q.documentElement)};o();a(o);h.validityAlert=function(){var g=!a.browser.msie||parseInt(a.browser.version,10)>7?"span":"label",l={hideDelay:5E3,showFor:function(t,u,
x){t=a(t);var z=k(t);A();l.clear();this.getMessage(t,u);this.position(z);j.css({fontSize:t.css("fontSize"),fontFamily:t.css("fontFamily")});this.show();if(this.hideDelay)s=setTimeout(w,this.hideDelay);x||this.setFocus(z,t[0])},setFocus:function(t,u){var x=a("input, select, textarea, .ui-slider-handle",t).filter(":visible:first");x[0]||(x=t);var z=h.scrollRoot.scrollTop(),B=x.offset().top,C;j.attr("for",h.getID(x));if(z>B){if((C=u.id&&a('label[for="'+u.id+'"]',u.form).offset())&&C.top<B)B=C.top;h.scrollRoot.animate({scrollTop:B-
5},{queue:false,duration:Math.max(Math.min(450,(z-B)*2),140)});C=true}try{x[0].focus()}catch(D){}C&&h.scrollRoot.scrollTop(z);a(q).bind("focusout.validityalert",w)},getMessage:function(t,u){a("> span.va-box",j).text(u||t.attr("customValidationMessage")||t.attr("validationMessage"))},position:function(t){var u=t.offset();u.top+=t.outerHeight();j.css(u)},show:function(){j.css("display")==="none"?j.fadeIn():j.fadeTo(400,1)},hide:function(){l.clear();j.fadeOut()},clear:function(){clearTimeout(s);a(q).unbind("focusout.validityalert");
j.stop().removeAttr("for")},alert:a("<"+g+' class="validity-alert" role="alert"><span class="va-arrow"><span class="va-arrow-box" /></span><span class="va-box" /></'+g+">").css({position:"absolute",display:"none"})},j=l.alert,s=false,w=a.proxy(l,"hide"),y=false,A=function(){if(!y){y=true;a(function(){j.appendTo("body")})}};return l}();(function(){var g,l=[],j;a(q).bind("invalid",function(s){var w=a(s.target).addClass("form-ui-invalid").removeClass("form-ui-valid");if(!g){g=a.Event("firstinvalid");
w.trigger(g)}g&&g.isDefaultPrevented()&&s.preventDefault();l.push(s.target);s.extraData="fix";clearTimeout(j);j=setTimeout(function(){var y={type:"lastinvalid",cancelable:false,invalidlist:a(l)};g=false;l=[];a(void 0).unbind("submit.preventInvalidSubmit");w.trigger(y,y)},9)})})();(function(){if(!(!r.validity||v.noHTMLExtFixes||r.fieldsetValidation)){var g=function(j){var s=(a.attr(j,"validity")||{valid:true}).valid;!s&&j.checkValidity&&j.checkValidity()&&a(j).trigger("invalid");return s},l=["fieldset"];
r.output||(l=["input","textarea","select","form","fieldset"]);h.defineNodeNamesProperty(l,"checkValidity",{value:function(){if(this.elements||a.nodeName(this,"fieldset")){var j=true;a(this.elements||"input, textarea, select",this).each(function(){g(this)||(j=false)});return j}else if(this.checkValidity)return g(this)}})}})();h.createReadyEvent("form-core")},true);
jQuery.webshims.ready("form-core",function(a,h,v,q){var m=h.validityMessages,r=a.support;m.en=m.en||m["en-US"]||{typeMismatch:{email:"{%value} is not a legal email address",url:"{%value} is not a valid web address",number:"{%value} is not a number!",date:"{%value} is not a date",time:"{%value} is not a time",range:"{%value} is not a number!","datetime-local":"{%value} is not a correct date-time format."},rangeUnderflow:"{%value} is too low. The lowest value you can use is {%min}.",rangeOverflow:"{%value}  is too high. The highest value you can use is {%max}.",
stepMismatch:"The value {%value} is not allowed for this form.",tooLong:"The entered text is too large! You used {%valueLen} letters and the limit is {%maxlength}.",patternMismatch:"{%value} is not in the format this page requires! {%title}",valueMissing:"You have to specify a value"};m["en-US"]=m["en-US"]||m.en;m[""]=m[""]||m["en-US"];m.de=m.de||{typeMismatch:{email:"{%value} ist keine zul\u00e4ssige E-Mail-Adresse",url:"{%value} ist keine zul\u00e4ssige Webadresse",number:"{%value} ist keine Nummer!",
date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen.",rangeOverflow:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen.",stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}",tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Buchstaben eingegeben, dabei sind {%maxlength} das Maximum.",
patternMismatch:"{%value} hat f\u00fcr diese Seite ein falsches Format! {%title}",valueMissing:"Sie m\u00fcssen einen Wert eingeben"};var k=m[""];a(q).bind("htmlExtLangChange",function(){h.activeLang(m,"form-message",function(n){k=n})});h.createValidationMessage=function(n,p){var d=k[p];if(d&&typeof d!=="string")d=d[(n.getAttribute("type")||"").toLowerCase()]||d.defaultMessage;d&&["value","min","max","title","maxlength","label"].forEach(function(b){if(d.indexOf("{%"+b)!==-1){var e=(b=="label"?a.trim(a('label[for="'+
n.id+'"]',n.form).text()).replace(/\*$|:$/,""):a.attr(n,b))||"";d=d.replace("{%"+b+"}",e);if("value"==b)d=d.replace("{%valueLen}",e.length)}});return d||""};q=h.overrideValidationMessages||h.implement.customValidationMessage?["customValidationMessage"]:[];if(!v.noHTMLExtFixes&&!r.validationMessage||!r.validity)q.push("validationMessage");a.each(q,function(n,p){h.defineNodeNamesProperty(["input","select","textarea","fieldset","output"],p,{get:function(d){var b="";if(!a.attr(d,"willValidate"))return b;
var e=a.attr(d,"validity")||{valid:1};if(e.valid)return b;if(b=d.getAttribute("x-moz-errormessage")||d.getAttribute("data-errormessage")||"")return b;if(e.customError&&d.nodeName)if(b="validationMessage"in d?d.validationMessage:a.data(d,"customvalidationMessage"))return b;a.each(e,function(c,f){if(!(c=="valid"||!f))if(b=h.createValidationMessage(d,c))return false});return b||""},set:a.noop})})},true);
jQuery.webshims.ready("form-core",function(a,h,v){if(!a.support.validity){h.inputTypes=h.inputTypes||{};var q=h.inputTypes,m={radio:1,checkbox:1};h.addInputType=function(d,b){q[d]=b};var r={customError:false,typeMismatch:false,rangeUnderflow:false,rangeOverflow:false,stepMismatch:false,tooLong:false,patternMismatch:false,valueMissing:false,valid:true},k={valueMissing:function(d,b,e){if(!d.attr("required"))return false;var c=false;if(!("type"in e))e.type=(d[0].getAttribute("type")||d[0].type||"").toLowerCase();
return c=e.nodeName=="select"?!b&&d[0].type=="select-one"&&d[0].size<2&&a("> option:first-child:not(:disabled)",d).attr("selected"):m[e.type]?!a(d[0].form&&d[0].name?d[0].form[d[0].name]:[]).filter(":checked")[0]:!b},tooLong:function(d,b,e){if(b===""||e.nodeName=="select")return false;d=d.attr("maxlength");e=false;var c=b.length;if(c&&d>=0&&b.replace&&(typeof d=="number"||d&&d==d*1))e=c>d;return e},typeMismatch:function(d,b,e){if(b===""||e.nodeName=="select")return false;var c=false;if(!("type"in
e))e.type=(d[0].getAttribute("type")||d[0].type||"").toLowerCase();if(q[e.type]&&q[e.type].mismatch)c=q[e.type].mismatch(b,d);return c},patternMismatch:function(d,b,e){if(b===""||e.nodeName=="select")return false;d=d.attr("pattern");if(!d)return false;return!RegExp("^(?:"+d+")$").test(b)}};h.addValidityRule=function(d,b){k[d]=b};h.defineNodeNamesProperty(["input","textarea","select","form","fieldset"],"checkValidity",{value:function(){var d,b=function(e){var c,f=a.attr(e,"validity");if(f)a.data(e,
"cachedValidity",f);else return true;if(!f.valid){c=a.Event("invalid");var i=a(e).trigger(c);if(!d&&!c.isDefaultPrevented()){h.validityAlert.showFor(i);d=true}}a.data(e,"cachedValidity",false);return f.valid};return function(){d=false;if(a.nodeName(this,"form")||a.nodeName(this,"fieldset")){for(var e=true,c=this.elements||a("input, textarea, select",this),f=0,i=c.length;f<i;f++)b(c[f])||(e=false);return e}else return this.form?b(this):true}}()});h.defineNodeNamesProperty(["input","textarea","select"],
"setCustomValidity",{value:function(d){a.data(this,"customvalidationMessage",""+d)}});a.event.special.invalid={add:function(){a.data(this,"invalidEventShim")||a.event.special.invalid.setup.call(this)},setup:function(){a(this).bind("submit",a.event.special.invalid.handler).data("invalidEventShim",true);var d=a(this).data("events").submit;d&&d.length>1&&d.unshift(d.pop())},teardown:function(){a(this).unbind("submit",a.event.special.invalid.handler).data("invalidEventShim",false)},handler:function(d){if(!(d.type!=
"submit"||!a.nodeName(d.target,"form")||a.attr(d.target,"novalidate")!=null||a.data(d.target,"novalidate")))if(!a(d.target).checkValidity()){!d.originalEvent&&v.console&&console.log&&console.log("submit");d.stopImmediatePropagation();return false}}};h.defineNodeNamesProperty(["input","select","textarea"],"validity",{set:a.noop,get:function(d){var b=a.data(d,"cachedValidity");if(b)return b;b=a.extend({},r);if(!a.attr(d,"willValidate")||d.type=="submit")return b;var e=a(d),c=e.val(),f={nodeName:d.nodeName.toLowerCase()};
d.getAttribute("aria-invalid");b.customError=!!a.data(d,"customvalidationMessage");if(b.customError)b.valid=false;a.each(k,function(i,o){if(o(e,c,f)){b[i]=true;b.valid=false}});d.setAttribute("aria-invalid",b.valid?"false":"true");return b}});h.defineNodeNamesBooleanProperty(["input","textarea","select"],"required",{set:function(d,b){d.setAttribute("aria-required",b?"true":"false")},init:true});h.defineNodeNamesProperty(["input","select","textarea","fieldset","button","output"],"willValidate",{get:function(){var d=
{button:1,reset:1,add:1,remove:1,"move-up":1,"move-down":1,hidden:1},b={fieldset:1,button:1,output:1};return function(e){return!!(e.form&&!e.disabled&&!e.readOnly&&!d[e.type]&&!b[(e.nodeName||"").toLowerCase()]&&a.attr(e.form,"novalidate")==null)}}()},true,"form-htc-validity.htc");h.addInputType("email",{mismatch:function(){var d=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|(\x22((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?\x22))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
return function(b){return!d.test(b)}}()});h.addInputType("url",{mismatch:function(){var d=/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
return function(b){return!d.test(b)}}()});var n=function(){var d=this;if(d.form){a.data(d.form,"novalidate",true);setTimeout(function(){a.data(d.form,"novalidate",false)},1)}},p={submit:1,button:1};a(document).bind("click",function(d){d.target&&d.target.form&&p[d.target.type]&&a.attr(d.target,"formnovalidate")!=null&&n.call(d.target)});h.addReady(function(d,b){var e=a("form",d).add(b.filter("form")).bind("invalid",a.noop).find("button[formnovalidate]").bind("click",n).end();setTimeout(function(){if(!document.activeElement||
!document.activeElement.form){var c=true;a("input, select, textarea",e).each(function(){if(!c)return false;if(this.getAttribute("autofocus")!=null){c=false;var f=h.getVisualInput(this),i=a("input, select, textarea, .ui-slider-handle",f).filter(":visible:first");i[0]||(i=f);try{i[0].focus()}catch(o){}}})}},9)});h.createReadyEvent("form-extend")}},true);
jQuery.webshims.ready("es5",function(a,h,v,q,m){if(!a.support.placeholder){var r=function(b,e,c){if(b.type!="password"){if(c===false)c=a.attr(b,"value");b.value=c}e.box.removeClass("placeholder-visible")},k=function(b,e,c,f,i){if(!f){f=a.data(b,"placeHolder");if(!f)return}if(i=="focus"||!i&&b===document.activeElement){if(b.type=="password"||a(b).hasClass("placeholder-visible"))r(b,f,"")}else{if(e===false)e=a.attr(b,"value");if(e)r(b,f,e);else{if(c===false)c=a.attr(b,"placeholder")||"";if(c&&!e){e=
f;c=c;if(c===false)c=a.attr(b,"placeholder")||"";if(b.type!="password")b.value=c;e.box.addClass("placeholder-visible")}else r(b,f,e)}}},n=function(b){b=a(b);var e=b.attr("id"),c=!!(b.attr("title")||b.attr("aria-labeledby"));if(!c&&e)c=!!a('label[for="'+e+'"]',b[0].form)[0];return a(c?'<span class="placeholder-text"></span>':'<label for="'+(e||a.webshims.getID(b))+'" class="placeholder-text"></label>')},p=function(){var b=/\n|\r|\f|\t/g,e={text:1,search:1,url:1,email:1,password:1,tel:1};return{create:function(c){var f=
a.data(c,"placeHolder");if(f)return f;f=a.data(c,"placeHolder",{text:n(c)});a(c).bind("focus.placeholder blur.placeholder",function(g){k(this,false,false,f,g.type)});if(c.type=="password"){f.box=a(c).wrap('<span class="placeholder-box placeholder-box-'+(c.nodeName||"").toLowerCase()+'" />').parent();f.text.insertAfter(c).bind("mousedown.placeholder",function(){k(this,false,false,f,"focus");c.focus();return false});a.each(["Left","Top"],function(g,l){var j=(parseInt(a.curCSS(c,"padding"+l),10)||0)+
Math.max(parseInt(a.curCSS(c,"margin"+l),10)||0,0)+(parseInt(a.curCSS(c,"border"+l+"Width"),10)||0);f.text.css("padding"+l,j)});a.curCSS(c,"lineHeight");var i={width:a(c).width(),height:a(c).height()},o=a.curCSS(c,"float");a.each(["lineHeight","fontSize","fontFamily","fontWeight"],function(g,l){var j=a.curCSS(c,l);f.text.css(l)!=j&&f.text.css(l,j)});i.width&&i.height&&f.text.css(i);o!=="none"&&f.box.addClass("placeholder-box-"+o)}else{i=function(){r(c,f,"")};if(a.nodeName(f.text[0],"label"))f.text.hide()[a.browser.msie?
"insertBefore":"insertAfter"](c);a(v).unload(i);f.box=a(c);c.form&&a(c.form).submit(i)}return f},update:function(c,f){if(e[a.attr(c,"type")]||a.nodeName(c,"textarea")){if(a.nodeName(c,"input"))f=f.replace(b,"");var i=p.create(c);h.contentAttr(c,"placeholder")!=f&&h.contentAttr(c,"placeholder",f);i.text.text(f);k(c,false,f,i)}}}}();a.webshims.publicMethods={pHolder:p};h.defineNodeNamesProperty(["input","textarea"],"placeholder",{set:function(b,e){p.update(b,e)},get:function(b){return h.contentAttr(b,
"placeholder")||""},init:true});a.each(["input","textarea"],function(b,e){var c=h.defineNodeNameProperty(e,"value",{set:function(f,i){var o=h.contentAttr(f,"placeholder");o&&"value"in f&&k(f,i,o);return c.set._polyfilled(f,i)},get:function(f){return a(f).hasClass("placeholder-visible")?"":c.get._polyfilled(f)}})});var d=a.fn.val;a.fn.val=function(b){if(b!==m){this.each(b===""?function(){if(this.nodeType===1){var e=this.getAttribute("placeholder");if(a.nodeName(this,"select")||!e)d.call(a(this),"");
else{e&&"value"in this&&k(this,b,e);this.type=="password"&&d.call(a(this),"")}}}:function(){if(this.nodeType===1){var e=this.getAttribute("placeholder");e&&"value"in this&&k(this,b,e)}});if(b==="")return this}else if(this[0]&&this[0].nodeType==1&&this.hasClass("placeholder-visible"))return"";return d.apply(this,arguments)}}});
jQuery.webshims.ready("form-core",function(a,h,v,q,m){(function(){var r={input:1,textarea:1},k={updateInput:1,input:1},n={radio:1,checkbox:1,submit:1,button:1,image:1,reset:1,color:1},p=function(d){var b,e=d.attr("value"),c=function(i){if(d){var o=d.attr("value");if(o!==e){e=o;if(!i||!k[i.type])h.triggerInlineForm(d[0],"input")}}},f=function(){d.unbind("focusout",f).unbind("input",c).unbind("updateInput",c);clearInterval(b);c();d=null};clearInterval(b);b=setInterval(c,a.browser.mozilla?250:111);setTimeout(c,
9);d.bind("focusout",f).bind("input updateInput",c)};a(q).bind("focusin",function(d){if(d.target&&d.target.type&&!d.target.readonly&&!d.target.readOnly&&!d.target.disabled&&r[(d.target.nodeName||"").toLowerCase()]&&!n[d.target.type])p(a(d.target))})})();(function(){if(!("value"in q.createElement("output"))){var r=function(k){if(!k.getAttribute("aria-live")){k=a(k);var n=(k.text()||"").trim(),p=k.attr("id"),d=k.attr("for"),b=a('<input class="output-shim" type="hidden" name="'+(k.attr("name")||"")+
'" value="'+n+'" style="display: none" />').insertAfter(k),e=b[0].form||q,c=function(f){b[0].value=f;f=b[0].value;k.text(f);h.contentAttr(k[0],"value",f)};k[0].defaultValue=n;h.contentAttr(k[0],"value",n);k.attr({"aria-live":"polite"});if(p){b.attr("id",p);k.attr("aria-labeldby",h.getID(a('label[for="'+p+'"]',e)))}if(d){p=h.getID(k);d.split(" ").forEach(function(f){(f=e.getElementById(f))&&f.setAttribute("aria-controls",p)})}k.data("outputShim",c);b.data("outputShim",c);return c}};h.defineNodeNameProperty("output",
"value",{set:function(k,n){var p=a.data(k,"outputShim");p||(p=r(k));p(n)},get:function(k){return h.contentAttr(k,"value")||a(k).text()||""}});h.onNodeNamesPropertyModify("input","value",{set:function(k,n){var p=a.data(k,"outputShim");if(p){p(n);return n}a(k).triggerHandler("updateInput")}});h.addReady(function(k,n){a("output",k).add(n.filter("output")).each(function(){r(this)})})}})();(function(){if(!a.support.datalist){var r=0,k={submit:1,button:1,reset:1,hidden:1,range:1,date:1},n=a.browser.msie&&
parseInt(a.browser.version,10)<7,p=function(b){if(!b)return[];var e;try{e=JSON.parse(localStorage.getItem("storedDatalistOptions"+b))}catch(c){}return e||[]},d={_create:function(b){var e=b.datalist||b.id&&q.getElementById(b.id);if(!k[(b.input.getAttribute("type")||"").toLowerCase()||b.input.type]){var c=a.data(b.input,"datalistWidget");if(e&&c&&c.datalist!==e){c.datalist=e;c.id=b.id;c._resetListCached()}else if(e){r++;var f=this;this.timedHide=function(){clearTimeout(f.hideTimer);f.hideTimer=setTimeout(a.proxy(f,
"hideList"),9)};this.datalist=e;this.id=b.id;this.lazyIDindex=r;this.hasViewableData=true;this._autocomplete=a.attr(b.input,"autocomplete");a.data(b.input,"datalistWidget",this);this.shadowList=a('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=b.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseover.datalistWidget mousedown.datalistWidget click.datalistWidget",function(i){var o=a("li:not(.hidden-item)",f.shadowList),g=i.type=="mousedown"||i.type=="click";
f.markItem(o.index(i.target),g,o);i.type=="click"&&f.hideList();return i.type!="mousedown"}).bind("focusout",this.timedHide);b.input.setAttribute("autocomplete","off");a(b.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",a.proxy(this,"showHideOptions")).bind("keydown.datalistWidget",function(i){var o=i.keyCode;if(o==40&&!f.showList()){f.markItem(f.index+1,true);return false}if(f.isListVisible){if(o==38){f.markItem(f.index-1,true);return false}if(!i.shiftKey&&(o==33||o==36)){f.markItem(0,
true);return false}if(!i.shiftKey&&(o==34||o==35)){i=a("li:not(.hidden-item)",f.shadowList);f.markItem(i.length-1,true,i);return false}if(o==13||o==27){f.hideList();return false}}}).bind("blur.datalistWidget",this.timedHide);a(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",a.proxy(this,"_resetListCached"));this._resetListCached();b.input.form&&b.input.id&&a(b.input.form).bind("submit.datalistWidget"+b.input.id,function(){var i=a.attr(b.input,"value");f.storedOptions=
f.storedOptions||p(b.input.name||b.input.id);if(i&&a.inArray(i,f.storedOptions)==-1){f.storedOptions.push(i);i=b.input.name||b.input.id;var o=f.storedOptions;if(i){o=o||[];try{localStorage.setItem("storedDatalistOptions"+i,JSON.stringify(o))}catch(g){}}}})}else c&&c.destroy()}},destroy:function(){var b=a.attr(this.input,"autocomplete");a(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();a(q).unbind(".datalist"+this.id);this.input.form&&this.input.id&&a(this.input.form).unbind("submit.datalistWidget"+
this.input.id);this.input.removeAttribute("aria-haspopup");b===m?this.input.removeAttribute("autocomplete"):a(this.input).attr("autocomplete",b)},_resetListCached:function(){var b=this;this.needsUpdate=true;this.lastUpdatedValue=false;this.lastUnfoundValue="";clearTimeout(this.updateTimer);this.updateTimer=setTimeout(function(){b.updateListOptions()},this.isListVisible?0:20*this.lazyIDindex)},updateListOptions:function(){this.needsUpdate=false;clearTimeout(this.updateTimer);this.shadowList.css({fontSize:a.curCSS(this.input,
"fontSize"),fontFamily:a.curCSS(this.input,"fontFamily")});var b='<ul role="list" class="'+(this.datalist.className||"")+'">',e=[],c=[];a("option",this.datalist).each(function(f){if(!this.disabled){var i={value:a(this).val(),text:a.trim(a.attr(this,"label")||this.textContent||this.innerText||a.text([this])||""),className:this.className||"",style:a.attr(this,"style")||""};if(!i.text)i.text=i.value;e[f]=i.value;c[f]=i}});this.storedOptions=this.storedOptions||p(this.input.name||this.input.id);this.storedOptions.forEach(function(f){a.inArray(f,
e)==-1&&c.push({value:f,text:f,className:"",style:""})});c.forEach(function(f){b+='<li data-value="'+f.value+'" class="'+f.className+'" style="'+f.style+'" tabindex="-1" role="listitem">'+f.text+"</li>"});b+="</ul>";this.arrayOptions=c;this.shadowList.html(b);this.isListVisible&&this.showHideOptions()},showHideOptions:function(){var b=a.attr(this.input,"value").toLowerCase();if(!(b===this.lastUpdatedValue||this.lastUnfoundValue&&b.indexOf(this.lastUnfoundValue)===0)){this.lastUpdatedValue=b;var e=
false,c=a("li",this.shadowList);if(b)this.arrayOptions.forEach(function(f,i){if(!("lowerText"in f)){f.lowerText=f.text.toLowerCase();f.lowerValue=f.value.toLowerCase()}if(f.lowerText.indexOf(b)!==-1||f.lowerValue.indexOf(b)!==-1){a(c[i]).removeClass("hidden-item");e=true}else a(c[i]).addClass("hidden-item")});else{c.removeClass("hidden-item");e=true}if(this.hasViewableData=e)this.showList();else{this.lastUnfoundValue=b;this.hideList()}}},showList:function(){if(this.isListVisible)return false;this.needsUpdate&&
this.updateListOptions();this.showHideOptions();if(!this.hasViewableData)return false;var b=this,e=a(this.input).offset();e.top+=a(this.input).outerHeight();e.width=a(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);if(n){this.shadowList.css("height","auto");this.shadowList.height()>250&&this.shadowList.css("height",220)}this.shadowList.css(e).addClass("datalist-visible");this.isListVisible=true;a(q).bind("mousedown.datalist"+
this.id+" focusin.datalist"+this.id,function(c){if(c.target===b.input||b.shadowList[0]===c.target||a.contains(b.shadowList[0],c.target)){clearTimeout(b.hideTimer);setTimeout(function(){clearTimeout(b.hideTimer)},0)}else b.timedHide()});return true},hideList:function(){if(!this.isListVisible)return false;this.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");this.index=-1;this.isListVisible=false;a(this.input).removeAttr("aria-activedescendant");
a(q).unbind(".datalist"+this.id);return true},scrollIntoView:function(b){var e=a("> ul",this.shadowList),c=b.position();c.top-=(parseInt(e.css("paddingTop"),10)||0)+(parseInt(e.css("marginTop"),10)||0)+(parseInt(e.css("borderTopWidth"),10)||0);if(c.top<0)this.shadowList.scrollTop(this.shadowList.scrollTop()+c.top-2);else{c.top+=b.outerHeight();b=this.shadowList.height();c.top>b&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(c.top-b)+2)}},markItem:function(b,e,c){if(!(b<0)){c=c||a("li:not(.hidden-item)",
this.shadowList);if(!(b>=c.length)){c.removeClass("active-item");this.shadowList.addClass("list-item-active");c=c.filter(":eq("+b+")").addClass("active-item");if(e){a.attr(this.input,"value",c.attr("data-value"));a.attr(this.input,"aria-activedescendant",a.webshims.getID(c));this.scrollIntoView(c)}this.index=b}}}};h.defineNodeNameProperty("input","list",{get:function(b){b=h.contentAttr(b,"list");if(typeof b=="string")b=q.getElementById(b);return b||null},set:function(b,e){var c;if(e&&e.getAttribute){c=
e;e=h.getID(e)}h.contentAttr(b,"list",e);d&&h.objectCreate(d,m,{input:b,id:e,datalist:c})},init:true});h.defineNodeNameProperty("input","selectedOption",{get:function(b){var e=a.attr(b,"list"),c=null,f;if(!e)return c;f=a.attr(b,"value");if(!f)return c;b=a.attr(e,"options");if(!b.length)return c;a.each(b,function(i,o){if(f==a.attr(o,"value")){c=o;return false}});return c}});h.defineNodeNameProperty("input","autocomplete",{get:function(b){var e=a.data(b,"datalistWidget");if(e)return e._autocomplete;
return"autocomplete"in b?b.autocomplete:b.getAttribute("autocomplete")},set:function(b,e){var c=a.data(b,"datalistWidget");if(c){c._autocomplete=e;e=="off"&&c.hideList()}else if("autocomplete"in b)b.autocomplete=e;else b.setAttribute("autocomplete",e)}});h.defineNodeNameProperty("datalist","options",{get:function(b){b=a("select",b);return b[0]?b[0].options:[]}});h.addReady(function(b,e){e.filter("select, option").each(function(){var c=this.parentNode;if(c&&!a.nodeName(c,"datalist"))c=c.parentNode;
c&&a.nodeName(c,"datalist")&&a(c).triggerHandler("updateDatalist")})})}})();h.createReadyEvent("form-output-datalist")},true);
