(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[8],{104:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return P}));var c=t(13),r=t.n(c),a=t(15),s=t(17),i=t(20),o=t(9),l=t(2),j=t(0),d=t(78),b=t(19),h=t(21),u=t(101),O=t(99),x=t(100),f=t(95),m=t(96),p=t(97),v=t(84),k=t(93),g=t(34),N=function(e){var n=e.children;return Object(l.jsx)("span",{className:"text-danger",children:n})},y=function(e){return e.split("/").reverse().join("-")},w=function(e){var n=e.onSearch,t=Object(k.a)({mode:"all"}),c=t.register,r=t.handleSubmit,a=t.errors,s=t.reset,i=t.setValue,o=t.getValues,j=t.formState,d=j.isDirty,b=j.isSubmitting,h=j.isValid,w=Object(g.c)().forceUpdate;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("span",{className:"text-secondary d-block mb-3",children:"Todos los campos son opcionales."}),Object(l.jsxs)(u.a,{onSubmit:r((function(e){var t=e.info,c=e.number,r=e.id,a=e.answeredOn,s=e.calledOn,i=e.noWeekends,o=e.noCall,l=e.nonExistent,j={};t&&(j.info=t),c&&(j.number=c),r&&(j.id=r),a&&(j.answeredOn="Nunca"===a?"never":y(a)),s&&(j.calledOn="Nunca"===s?"never":y(s)),i&&(j.noWeekends=i),o&&(j.noCall=o),l&&(j.nonExistent=l),n(j)})),children:[Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"2",children:Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{for:"id",children:"ID"}),Object(l.jsx)(p.a,{id:"id",name:"id",innerRef:c,autoComplete:"off"})]})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{for:"number",children:"N\xfamero"}),Object(l.jsx)(p.a,{id:"number",name:"number",innerRef:c,autoComplete:"off"})]})}),Object(l.jsx)(x.a,{md:"6",children:Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{for:"info",children:"Informaci\xf3n"}),Object(l.jsx)(p.a,{id:"info",name:"info",innerRef:c,autoComplete:"off"})]})})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsxs)(x.a,{md:"6",children:[Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{for:"answeredOn",children:"\xdaltima vez atendido el"}),Object(l.jsx)(p.a,{id:"answeredOn",name:"answeredOn",innerRef:c({pattern:/^(\d{2}\/\d{2}\/\d{4}|Nunca)$/}),placeholder:"Ej.: 13/04/2020",autoComplete:"off"}),a.answeredOn&&Object(l.jsx)(N,{children:"Formato inv\xe1lido, debe ser dia/mes/a\xf1o, 'Nunca' o dejar vac\xedo."})]}),Object(l.jsx)(f.a,{check:!0,children:Object(l.jsxs)(m.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",checked:"Nunca"===o("answeredOn"),onChange:function(e){i("answeredOn",e.target.checked?"Nunca":""),w()}}),"Nunca antes atendi\xf3"]})})]}),Object(l.jsxs)(x.a,{md:"6",children:[Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{for:"calledOn",children:"\xdaltima vez llamado el"}),Object(l.jsx)(p.a,{id:"calledOn",name:"calledOn",innerRef:c({pattern:/^(\d{2}\/\d{2}\/\d{4}|Nunca)$/}),placeholder:"Ej.: 13/04/2020",autoComplete:"off"}),a.calledOn&&Object(l.jsx)(N,{children:"Formato inv\xe1lido, debe ser dia/mes/a\xf1o, 'Nunca' o dejar vac\xedo."})]}),Object(l.jsx)(f.a,{check:!0,children:Object(l.jsxs)(m.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",checked:"Nunca"===o("calledOn"),onChange:function(e){i("calledOn",e.target.checked?"Nunca":""),w()}}),"Nunca antes llamado"]})})]})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(f.a,{check:!0,children:Object(l.jsxs)(m.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"noWeekends",innerRef:c}),"No llamar los fines de semana"]})})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(f.a,{check:!0,children:Object(l.jsxs)(m.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"noCall",innerRef:c}),"No visitar"]})})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(f.a,{check:!0,children:Object(l.jsxs)(m.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"nonExistent",innerRef:c}),"No existente"]})})})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"6",children:Object(l.jsx)(v.a,{block:!0,outline:!0,onClick:function(){return s()},children:"Limpiar campos"})}),Object(l.jsx)(x.a,{md:"6",children:Object(l.jsx)(v.a,{type:"submit",disabled:!d||!h||b,color:"primary",block:!0,children:"Buscar"})})]})]})]})},C=t(7),R=t(98),E=t(5);function S(){var e=Object(C.a)(["\n  white-space: nowrap;\n\n  button:not(:first-of-type) {\n    margin-left: 1em;\n  }\n"]);return S=function(){return e},e}function D(){var e=Object(C.a)(["\n  white-space: nowrap;\n"]);return D=function(){return e},e}function z(){var e=Object(C.a)(["\n  text-align: center;\n"]);return z=function(){return e},e}function M(){var e=Object(C.a)(["\n  text-align: center;\n\n  > tr > th {\n    vertical-align: middle;\n  }\n"]);return M=function(){return e},e}var T=function(e){var n=e.entries,t=e.onEditRequest,c=e.onDeleteRequest;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("h3",{children:["Resultados: ",n.length]}),Object(l.jsx)("span",{className:"text-secondary",children:"* Se muestra un m\xe1ximo de 100 n\xfameros por b\xfasqueda."}),Object(l.jsxs)(R.a,{striped:!0,responsive:!0,children:[Object(l.jsx)(q,{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"ID"}),Object(l.jsx)("th",{children:"N\xfamero"}),Object(l.jsx)("th",{children:"Info"}),Object(l.jsx)("th",{children:"\xdaltima vez llamado"}),Object(l.jsx)("th",{children:"\xdaltima vez que atendi\xf3"}),Object(l.jsx)("th",{children:"Comentarios"}),Object(l.jsx)("th",{children:"D\xedas pospuesto"}),Object(l.jsx)("th",{children:"Caracter\xedsticas"}),Object(l.jsx)("th",{children:"Acciones"})]})}),Object(l.jsx)(I,{children:n.map((function(e){return Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:e.id}),Object(l.jsx)(V,{children:e.phone}),Object(l.jsx)("td",{children:e.info}),Object(l.jsx)("td",{children:e.unansweredDate||e.fulfilledOn||"Nunca"}),Object(l.jsx)("td",{children:e.answeredOn||"Nunca"}),Object(l.jsx)("td",{children:e.comments}),Object(l.jsx)("td",{children:e.postponedDays}),Object(l.jsx)("td",{children:[e.noCall&&"No visitar",e.nonExistent&&"No existe",e.noWeekends&&"No llamar los finde"].filter(Boolean).join(", ")}),Object(l.jsxs)(W,{children:[Object(l.jsx)(v.a,{color:"warning",onClick:function(){return t(e)},children:"Editar"}),Object(l.jsx)(v.a,{color:"danger",onClick:function(){return c(e.id)},children:"Borrar"})]})]},e.id)}))})]})]})},q=E.c.thead(M()),I=E.c.tbody(z()),V=E.c.td(D()),W=E.c.td(S()),B=function(e){var n,t=e.phone,c=e.onBack,a=e.onUpdated,s=Object(k.a)({mode:"all",defaultValues:{phone:t.phone,comments:t.comments,info:null!==(n=t.info)&&void 0!==n?n:"",noCall:t.noCall,nonExistent:t.nonExistent,postponedDays:t.postponedDays,noWeekends:t.noWeekends}}),g=s.register,N=s.handleSubmit,y=s.errors,w=s.formState,C=w.isDirty,R=w.isValid,E=Object(j.useState)(!1),S=Object(o.a)(E,2),D=S[0],z=S[1],M=Object(b.c)(),T=Object(h.i)().AlertManager,q=function(){var e=Object(i.a)(r.a.mark((function e(n){var c,s,i,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,z(!0),e.next=4,M().put("phones/".concat(t.id),n);case 4:if(c=e.sent,s=Object(o.a)(c,2),i=s[0],l=s[1],!i){e.next=10;break}throw i;case 10:a(l.phone),T.show("update-success"),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),T.show("update-error");case 17:return e.prev=17,z(!1),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[0,14,17,20]])})));return function(n){return e.apply(this,arguments)}}();return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(h.a,{name:"update-success",position:"top",variant:"success",children:"\xa1N\xfamero actualizado con \xe9xito! \u2728"}),Object(l.jsx)(h.a,{name:"update-error",position:"bottom",variant:"failure",children:"No se pudo actualizar el tel\xe9fono. Por favor, intente de nuevo."}),Object(l.jsxs)(d.a,{className:"pt-4",children:[Object(l.jsx)("h1",{children:"Editar n\xfamero"}),Object(l.jsxs)(u.a,{onSubmit:N(q),children:[Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"3",children:Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{children:"N\xfamero"}),Object(l.jsx)(p.a,{name:"phone",innerRef:g})]})}),Object(l.jsx)(x.a,{md:"6",children:Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{children:"Info"}),Object(l.jsx)(p.a,{name:"info",innerRef:g})]})}),Object(l.jsxs)(x.a,{md:"3",children:[Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{children:"D\xedas pospuesto"}),Object(l.jsx)(p.a,{type:"number",name:"postponedDays",innerRef:g({validate:function(e){return e>=0}})})]}),y.postponedDays&&Object(l.jsx)("span",{className:"text-danger",children:"Valor inv\xe1lido"})]}),Object(l.jsx)(x.a,{md:"12",children:Object(l.jsxs)(f.a,{children:[Object(l.jsx)(m.a,{children:"Comentarios"}),Object(l.jsx)(p.a,{name:"comments",innerRef:g})]})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(f.a,{check:!0,children:Object(l.jsxs)(m.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"noWeekends",innerRef:g}),"No llamar los finde"]})})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(f.a,{check:!0,children:Object(l.jsxs)(m.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"noCall",innerRef:g}),"No visitar"]})})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(f.a,{check:!0,children:Object(l.jsxs)(m.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"nonExistent",innerRef:g}),"No existente"]})})})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"6",children:Object(l.jsx)(v.a,{outline:!0,block:!0,onClick:c,children:"Volver atr\xe1s"})}),Object(l.jsx)(x.a,{md:"6",children:Object(l.jsx)(v.a,{type:"submit",block:!0,color:"primary",disabled:!C||!R,children:D?Object(l.jsx)(h.g,{fulfill:!0}):"Guardar"})})]})]})]})]})},F=[{title:"Panel de Administraci\xf3n",linkTo:"/admin-panel"},{title:"Buscar y editar"}],P=function(){var e=Object(j.useState)(null),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(j.useState)(!1),O=Object(o.a)(u,2),x=O[0],f=O[1],m=Object(j.useState)(null),p=Object(o.a)(m,2),v=p[0],k=p[1],g=Object(j.useState)(!1),N=Object(o.a)(g,2),y=N[0],C=N[1],R=Object(b.b)().testModeEnabled,E=Object(h.j)(),S=E.isModalOpen,D=E.data,z=E.askEditConfirmation,M=E.toggleModal,q=E.reset;Object(j.useEffect)((function(){c(null),k(null)}),[R]);var I=Object(b.c)(),V=Object(h.i)().AlertManager,W=function(){var e=Object(i.a)(r.a.mark((function e(n){var t,i,l,j;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,f(!0),e.next=4,I().get({path:"phones",params:Object.entries(n).map((function(e){var n=Object(o.a)(e,2),t=n[0],c=n[1];return[t,"boolean"!==typeof c?c:c?1:0]})).reduce((function(e,n){var t=Object(o.a)(n,2),c=t[0],r=t[1];return Object(s.a)(Object(s.a)({},e),{},Object(a.a)({},c,r))}),{})});case 4:if(t=e.sent,i=Object(o.a)(t,2),l=i[0],j=i[1],!l){e.next=10;break}throw l;case 10:c(j),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),V.show("search-error");case 16:return e.prev=16,f(!1),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[0,13,16,19]])})));return function(n){return e.apply(this,arguments)}}(),P=function(){var e=Object(i.a)(r.a.mark((function e(){var n,a,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,C(!0),e.next=4,I().delete("phones/".concat(D));case 4:if(n=e.sent,a=Object(o.a)(n,1),!(s=a[0])){e.next=9;break}throw s;case 9:q(),c(t.filter((function(e){return e.id!==D}))),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),V.show("deletion-error");case 16:return e.prev=16,C(!1),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[0,13,16,19]])})));return function(){return e.apply(this,arguments)}}();if(null!==v)return Object(l.jsx)(B,{phone:v,onBack:function(){return k(null)},onUpdated:function(e){return t&&c(t.map((function(n){return n.id===e.id?e:n})))}});var A=null!==D&&(null===t||void 0===t?void 0:t.find((function(e){return e.id===D})));return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(h.a,{name:"search-error",position:"top",variant:"failure",children:"No se pudo buscar. Por favor, intente de nuevo."}),Object(l.jsx)(h.a,{name:"deletion-error",position:"top",variant:"failure",children:"No se pudo eliminar el n\xfamero. Por favor, intente de nuevo."}),Object(l.jsxs)(d.a,{className:"pt-4 mb-5",children:[Object(l.jsx)(h.b,{items:F}),Object(l.jsx)(w,{onSearch:W})]}),Object(l.jsx)(d.a,{fluid:!0,children:x?Object(l.jsx)(h.g,{}):t&&Object(l.jsx)(T,{entries:t,onEditRequest:function(e){return k(e)},onDeleteRequest:function(e){return z(e)}})}),null!==D&&A&&Object(l.jsx)(h.c,{isOpen:S,toggleModal:M,onConfirm:P,title:"\xbfSeguro que desea eliminar el siguiente n\xfamero?",body:y?Object(l.jsx)(h.g,{fulfill:!0}):Object(l.jsxs)("div",{children:[Object(l.jsxs)("span",{className:"d-block",children:["ID: ",A.id]}),Object(l.jsxs)("span",{className:"d-block",children:["N\xfamero: ",A.phone]}),Object(l.jsxs)("span",{className:"d-block",children:["Info: ",A.info]})]}),buttonColor:"danger",confirmationLabel:"Eliminar para siempre"})]})}},98:function(e,n,t){"use strict";var c=t(4),r=t(8),a=t(0),s=t.n(a),i=t(1),o=t.n(i),l=t(6),j=t.n(l),d=t(3),b={className:o.a.string,cssModule:o.a.object,size:o.a.string,bordered:o.a.bool,borderless:o.a.bool,striped:o.a.bool,dark:o.a.bool,hover:o.a.bool,responsive:o.a.oneOfType([o.a.bool,o.a.string]),tag:d.o,responsiveTag:d.o,innerRef:o.a.oneOfType([o.a.func,o.a.string,o.a.object])},h=function(e){var n=e.className,t=e.cssModule,a=e.size,i=e.bordered,o=e.borderless,l=e.striped,b=e.dark,h=e.hover,u=e.responsive,O=e.tag,x=e.responsiveTag,f=e.innerRef,m=Object(r.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),p=Object(d.k)(j()(n,"table",!!a&&"table-"+a,!!i&&"table-bordered",!!o&&"table-borderless",!!l&&"table-striped",!!b&&"table-dark",!!h&&"table-hover"),t),v=s.a.createElement(O,Object(c.a)({},m,{ref:f,className:p}));if(u){var k=Object(d.k)(!0===u?"table-responsive":"table-responsive-"+u,t);return s.a.createElement(x,{className:k},v)}return v};h.propTypes=b,h.defaultProps={tag:"table",responsiveTag:"div"},n.a=h}}]);
//# sourceMappingURL=8.7f653002.chunk.js.map