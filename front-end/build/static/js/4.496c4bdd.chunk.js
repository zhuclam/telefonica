(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[4],{106:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return p}));var s=t(9),n=t(2),o=t(0),c=t(94),i=t(78),r=t(95),l=t(96),d=t(97),u=t(84),f=t(44),b=t(21),j=t(18),p=function(){var e=Object(o.useState)(""),a=Object(s.a)(e,2),t=a[0],p=a[1],h=Object(o.useState)(""),g=Object(s.a)(h,2),m=g[0],O=g[1],v=Object(j.a)(),x=v.doLogin,y=v.isLoading,k=function(){t&&m&&x(t,m)},N=function(e){return"Enter"===e.key&&k()};return y?Object(n.jsx)(b.g,{fulfill:!0,container:!0}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(f.a,{children:Object(n.jsxs)("title",{children:["MTCampa\xf1a"," Telef\xf3nica Login"]})}),Object(n.jsx)(b.a,{name:"wrong-login-credentials",position:"bottom",children:"Usuario o contrase\xf1a incorrectos."}),Object(n.jsx)(c.a,{fluid:!0,children:Object(n.jsxs)(i.a,{children:[Object(n.jsx)("h1",{className:"display-5",children:"Iniciar sesi\xf3n"}),Object(n.jsx)("p",{className:"lead",children:"Solicite los datos de ingreso a su superintendente de servicio."})]})}),Object(n.jsxs)(i.a,{children:[Object(n.jsxs)(r.a,{children:[Object(n.jsx)(l.a,{for:"username",children:"Usuario"}),Object(n.jsx)(d.a,{value:t,onChange:function(e){return p(e.target.value)},onKeyDown:N})]}),Object(n.jsxs)(r.a,{children:[Object(n.jsx)(l.a,{for:"password",children:"Contrase\xf1a"}),Object(n.jsx)(d.a,{value:m,onChange:function(e){return O(e.target.value)},onKeyDown:N,type:"password"})]}),Object(n.jsx)("div",{className:"d-flex justify-content-center mt-4",children:Object(n.jsx)(u.a,{color:"success",onClick:k,children:"Ingresar"})})]})]})}},94:function(e,a,t){"use strict";var s=t(4),n=t(8),o=t(0),c=t.n(o),i=t(1),r=t.n(i),l=t(6),d=t.n(l),u=t(3),f={tag:u.o,fluid:r.a.bool,className:r.a.string,cssModule:r.a.object},b=function(e){var a=e.className,t=e.cssModule,o=e.tag,i=e.fluid,r=Object(n.a)(e,["className","cssModule","tag","fluid"]),l=Object(u.k)(d()(a,"jumbotron",!!i&&"jumbotron-fluid"),t);return c.a.createElement(o,Object(s.a)({},r,{className:l}))};b.propTypes=f,b.defaultProps={tag:"div"},a.a=b},95:function(e,a,t){"use strict";var s=t(4),n=t(8),o=t(0),c=t.n(o),i=t(1),r=t.n(i),l=t(6),d=t.n(l),u=t(3),f={children:r.a.node,row:r.a.bool,check:r.a.bool,inline:r.a.bool,disabled:r.a.bool,tag:u.o,className:r.a.string,cssModule:r.a.object},b=function(e){var a=e.className,t=e.cssModule,o=e.row,i=e.disabled,r=e.check,l=e.inline,f=e.tag,b=Object(n.a)(e,["className","cssModule","row","disabled","check","inline","tag"]),j=Object(u.k)(d()(a,!!o&&"row",r?"form-check":"form-group",!(!r||!l)&&"form-check-inline",!(!r||!i)&&"disabled"),t);return"fieldset"===f&&(b.disabled=i),c.a.createElement(f,Object(s.a)({},b,{className:j}))};b.propTypes=f,b.defaultProps={tag:"div"},a.a=b},96:function(e,a,t){"use strict";var s=t(4),n=t(8),o=t(0),c=t.n(o),i=t(1),r=t.n(i),l=t(6),d=t.n(l),u=t(3),f=r.a.oneOfType([r.a.number,r.a.string]),b=r.a.oneOfType([r.a.bool,r.a.string,r.a.number,r.a.shape({size:f,order:f,offset:f})]),j={children:r.a.node,hidden:r.a.bool,check:r.a.bool,size:r.a.string,for:r.a.string,tag:u.o,className:r.a.string,cssModule:r.a.object,xs:b,sm:b,md:b,lg:b,xl:b,widths:r.a.array},p={tag:"label",widths:["xs","sm","md","lg","xl"]},h=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},g=function(e){var a=e.className,t=e.cssModule,o=e.hidden,i=e.widths,r=e.tag,l=e.check,f=e.size,b=e.for,j=Object(n.a)(e,["className","cssModule","hidden","widths","tag","check","size","for"]),p=[];i.forEach((function(a,s){var n=e[a];if(delete j[a],n||""===n){var o,c=!s;if(Object(u.i)(n)){var i,r=c?"-":"-"+a+"-";o=h(c,a,n.size),p.push(Object(u.k)(d()(((i={})[o]=n.size||""===n.size,i["order"+r+n.order]=n.order||0===n.order,i["offset"+r+n.offset]=n.offset||0===n.offset,i))),t)}else o=h(c,a,n),p.push(o)}}));var g=Object(u.k)(d()(a,!!o&&"sr-only",!!l&&"form-check-label",!!f&&"col-form-label-"+f,p,!!p.length&&"col-form-label"),t);return c.a.createElement(r,Object(s.a)({htmlFor:b},j,{className:g}))};g.propTypes=j,g.defaultProps=p,a.a=g},97:function(e,a,t){"use strict";var s=t(4),n=t(8),o=t(13),c=t(11),i=t(0),r=t.n(i),l=t(1),d=t.n(l),u=t(6),f=t.n(u),b=t(3),j={children:d.a.node,type:d.a.string,size:d.a.oneOfType([d.a.number,d.a.string]),bsSize:d.a.string,valid:d.a.bool,invalid:d.a.bool,tag:b.o,innerRef:d.a.oneOfType([d.a.object,d.a.func,d.a.string]),plaintext:d.a.bool,addon:d.a.bool,className:d.a.string,cssModule:d.a.object},p=function(e){function a(a){var t;return(t=e.call(this,a)||this).getRef=t.getRef.bind(Object(o.a)(t)),t.focus=t.focus.bind(Object(o.a)(t)),t}Object(c.a)(a,e);var t=a.prototype;return t.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},t.focus=function(){this.ref&&this.ref.focus()},t.render=function(){var e=this.props,a=e.className,t=e.cssModule,o=e.type,c=e.bsSize,i=e.valid,l=e.invalid,d=e.tag,u=e.addon,j=e.plaintext,p=e.innerRef,h=Object(n.a)(e,["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"]),g=["radio","checkbox"].indexOf(o)>-1,m=new RegExp("\\D","g"),O=d||("select"===o||"textarea"===o?o:"input"),v="form-control";j?(v+="-plaintext",O=d||"input"):"file"===o?v+="-file":"range"===o?v+="-range":g&&(v=u?null:"form-check-input"),h.size&&m.test(h.size)&&(Object(b.q)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),c=h.size,delete h.size);var x=Object(b.k)(f()(a,l&&"is-invalid",i&&"is-valid",!!c&&"form-control-"+c,v),t);return("input"===O||d&&"function"===typeof d)&&(h.type=o),h.children&&!j&&"select"!==o&&"string"===typeof O&&"select"!==O&&(Object(b.q)('Input with a type of "'+o+'" cannot have children. Please use "value"/"defaultValue" instead.'),delete h.children),r.a.createElement(O,Object(s.a)({},h,{ref:p,className:x,"aria-invalid":l}))},a}(r.a.Component);p.propTypes=j,p.defaultProps={type:"text"},a.a=p}}]);
//# sourceMappingURL=4.496c4bdd.chunk.js.map