import e from "../core/Plugin";export default class t extends e{constructor(e){super(e);this.handlers=[];this.timers=new Map;const t=document.createElement("div");this.defaultEvent=!("oninput"in t)?"keyup":"input";this.opts=Object.assign({},{delay:0,event:this.defaultEvent,threshold:0},e);this.fieldAddedHandler=this.onFieldAdded.bind(this);this.fieldRemovedHandler=this.onFieldRemoved.bind(this)}install(){this.core.on("core.field.added",this.fieldAddedHandler).on("core.field.removed",this.fieldRemovedHandler)}uninstall(){this.handlers.forEach((e=>e.element.removeEventListener(e.event,e.handler)));this.handlers=[];this.timers.forEach((e=>window.clearTimeout(e)));this.timers.clear();this.core.off("core.field.added",this.fieldAddedHandler).off("core.field.removed",this.fieldRemovedHandler)}prepareHandler(e, t){t.forEach((t=>{let i=[];if(!!this.opts.event&&this.opts.event[e]===false){i=[]}else if(!!this.opts.event&&!!this.opts.event[e]){i=this.opts.event[e].split(" ")}else if("string"===typeof this.opts.event&&this.opts.event!==this.defaultEvent){i=this.opts.event.split(" ")}else{const e=t.getAttribute("type");const s=t.tagName.toLowerCase();const n="radio"===e||"checkbox"===e||"file"===e||"select"===s?"change":this.ieVersion>=10&&t.getAttribute("placeholder")?"keyup":this.defaultEvent;i=[n]}i.forEach((i=>{const s= i=>this.handleEvent(i,e,t);this.handlers.push({element:t,event:i,field:e,handler:s});t.addEventListener(i,s)}))}))}handleEvent(e, t, i){if(this.exceedThreshold(t,i)&&this.core.executeFilter("plugins-trigger-should-validate",true,[t,i])){const s=()=>this.core.validateElement(t,i).then((s=>{this.core.emit("plugins.trigger.executed",{element:i,event:e,field:t})}));const n=this.opts.delay[t]||this.opts.delay;if(n===0){s()}else{const e=this.timers.get(i);if(e){window.clearTimeout(e)}this.timers.set(i,window.setTimeout(s,n*1e3))}}}onFieldAdded(e){this.handlers.filter((t=>t.field===e.field)).forEach((e=>e.element.removeEventListener(e.event,e.handler)));this.prepareHandler(e.field,e.elements)}onFieldRemoved(e){this.handlers.filter((t=>t.field===e.field&&e.elements.indexOf(t.element)>=0)).forEach((e=>e.element.removeEventListener(e.event,e.handler)))}exceedThreshold(e, t){const i=this.opts.threshold[e]===0||this.opts.threshold===0?false:this.opts.threshold[e]||this.opts.threshold;if(!i){return true}const s=t.getAttribute("type");if(["button","checkbox","file","hidden","image","radio","reset","submit"].indexOf(s)!==-1){return true}const n=this.core.getElementValue(e,t);return n.length>=i}}