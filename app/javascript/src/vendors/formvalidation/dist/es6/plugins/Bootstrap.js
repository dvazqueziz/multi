import e from "../utils/classSet";import t from "../utils/hasClass";import n from "./Framework";export default class s extends n{constructor(e){super(Object.assign({},{eleInvalidClass:"is-invalid",eleValidClass:"is-valid",formClass:"fv-plugins-bootstrap",messageClass:"fv-help-block",rowInvalidClass:"has-danger",rowPattern:/^(.*)(col|offset)(-(sm|md|lg|xl))*-[0-9]+(.*)$/,rowSelector:".form-group",rowValidClass:"has-success"},e))}onIconPlaced(n){const s=n.element.parentElement;if(t(s,"input-group")){s.parentElement.insertBefore(n.iconElement,s.nextSibling)}const l=n.element.getAttribute("type");if("checkbox"===l||"radio"===l){const l=s.parentElement;if(t(s,"form-check")){e(n.iconElement,{"fv-plugins-icon-check":true});s.parentElement.insertBefore(n.iconElement,s.nextSibling)}else if(t(s.parentElement,"form-check")){e(n.iconElement,{"fv-plugins-icon-check":true});l.parentElement.insertBefore(n.iconElement,l.nextSibling)}}}}