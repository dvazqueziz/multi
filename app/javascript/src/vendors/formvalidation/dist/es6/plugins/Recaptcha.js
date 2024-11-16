import e from "../core/Plugin";import t from "../utils/fetch";export default class i extends e{constructor(e){super(e);this.widgetIds=new Map;this.captchaStatus="NotValidated";this.opts=Object.assign({},i.DEFAULT_OPTIONS,e);this.fieldResetHandler=this.onResetField.bind(this);this.preValidateFilter=this.preValidate.bind(this);this.iconPlacedHandler=this.onIconPlaced.bind(this)}install(){this.core.on("core.field.reset",this.fieldResetHandler).on("plugins.icon.placed",this.iconPlacedHandler).registerFilter("validate-pre",this.preValidateFilter);const e=typeof window[i.LOADED_CALLBACK]==="undefined"?()=>{}:window[i.LOADED_CALLBACK];window[i.LOADED_CALLBACK]=()=>{e();const s={badge:this.opts.badge,callback:()=>{if(this.opts.backendVerificationUrl===""){this.captchaStatus="Valid";this.core.updateFieldStatus(i.CAPTCHA_FIELD,"Valid")}},"error-callback":()=>{this.captchaStatus="Invalid";this.core.updateFieldStatus(i.CAPTCHA_FIELD,"Invalid")},"expired-callback":()=>{this.captchaStatus="NotValidated";this.core.updateFieldStatus(i.CAPTCHA_FIELD,"NotValidated")},sitekey:this.opts.siteKey,size:this.opts.size};const a=window["grecaptcha"].render(this.opts.element,s);this.widgetIds.set(this.opts.element,a);this.core.addField(i.CAPTCHA_FIELD,{validators:{promise:{message:this.opts.message,promise: e=>{const s=this.widgetIds.has(this.opts.element)?window["grecaptcha"].getResponse(this.widgetIds.get(this.opts.element)):e.value;if(s===""){this.captchaStatus="Invalid";return Promise.resolve({valid:false})}else if(this.opts.backendVerificationUrl===""){this.captchaStatus="Valid";return Promise.resolve({valid:true})}else if(this.captchaStatus==="Valid"){return Promise.resolve({valid:true})}else{return t(this.opts.backendVerificationUrl,{method:"POST",params:{[i.CAPTCHA_FIELD]:s}}).then((e=>{const t=`${e["success"]}`==="true";this.captchaStatus=t?"Valid":"Invalid";return Promise.resolve({meta:e,valid:t})})).catch((e=>{this.captchaStatus="NotValidated";return Promise.reject({valid:false})}))}}}}})};const s=this.getScript();if(!document.body.querySelector(`script[src="${s}"]`)){const e=document.createElement("script");e.type="text/javascript";e.async=true;e.defer=true;e.src=s;document.body.appendChild(e)}}uninstall(){if(this.timer){clearTimeout(this.timer)}this.core.off("core.field.reset",this.fieldResetHandler).off("plugins.icon.placed",this.iconPlacedHandler).deregisterFilter("validate-pre",this.preValidateFilter);this.widgetIds.clear();const e=this.getScript();const t=[].slice.call(document.body.querySelectorAll(`script[src="${e}"]`));t.forEach((e=>e.parentNode.removeChild(e)));this.core.removeField(i.CAPTCHA_FIELD)}getScript(){const e=this.opts.language?`&hl=${this.opts.language}`:"";return`https://www.google.com/recaptcha/api.js?onload=${i.LOADED_CALLBACK}&render=explicit${e}`}preValidate(){if(this.opts.size==="invisible"&&this.widgetIds.has(this.opts.element)){const e=this.widgetIds.get(this.opts.element);return this.captchaStatus==="Valid"?Promise.resolve():new Promise(((t, i)=>{window["grecaptcha"].execute(e).then((()=>{if(this.timer){clearTimeout(this.timer)}this.timer=window.setTimeout(t,1*1e3)}))}))}else{return Promise.resolve()}}onResetField(e){if(e.field===i.CAPTCHA_FIELD&&this.widgetIds.has(this.opts.element)){const e=this.widgetIds.get(this.opts.element);window["grecaptcha"].reset(e)}}onIconPlaced(e){if(e.field===i.CAPTCHA_FIELD){if(this.opts.size==="invisible"){e.iconElement.style.display="none"}else{const t=document.getElementById(this.opts.element);if(t){t.parentNode.insertBefore(e.iconElement,t.nextSibling)}}}}}i.CAPTCHA_FIELD="g-recaptcha-response";i.DEFAULT_OPTIONS={backendVerificationUrl:"",badge:"bottomright",size:"normal",theme:"light"};i.LOADED_CALLBACK="___reCaptchaLoaded___";