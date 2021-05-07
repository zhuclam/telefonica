(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[1],{101:function(e,n,t){"use strict";var r=t(4),c=t(8),a=t(0),s=t.n(a),o=t(1),i=t.n(o),l=t(7),d=t.n(l),j=t(3),b={className:i.a.string,cssModule:i.a.object,size:i.a.string,bordered:i.a.bool,borderless:i.a.bool,striped:i.a.bool,dark:i.a.bool,hover:i.a.bool,responsive:i.a.oneOfType([i.a.bool,i.a.string]),tag:j.o,responsiveTag:j.o,innerRef:i.a.oneOfType([i.a.func,i.a.string,i.a.object])},u=function(e){var n=e.className,t=e.cssModule,a=e.size,o=e.bordered,i=e.borderless,l=e.striped,b=e.dark,u=e.hover,h=e.responsive,O=e.tag,x=e.responsiveTag,m=e.innerRef,f=Object(c.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),p=Object(j.k)(d()(n,"table",!!a&&"table-"+a,!!o&&"table-bordered",!!i&&"table-borderless",!!l&&"table-striped",!!b&&"table-dark",!!u&&"table-hover"),t),v=s.a.createElement(O,Object(r.a)({},f,{ref:m,className:p}));if(h){var k=Object(j.k)(!0===h?"table-responsive":"table-responsive-"+h,t);return s.a.createElement(x,{className:k},v)}return v};u.propTypes=b,u.defaultProps={tag:"table",responsiveTag:"div"},n.a=u},108:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return H}));var r=t(15),c=t.n(r),a=t(16),s=t(17),o=t(21),i=t(9),l=t(2),d=t(0),j=t(81),b=t(13),u=t(19),h=t(105),O=t(103),x=t(104),m=t(99),f=t(100),p=t(79),v=t(86),k=t(98),g=t(25),y=function(e){var n=e.children;return Object(l.jsx)("span",{className:"text-danger",children:n})},N=function(e){return e.split("/").reverse().join("-")},C=function(e){var n=e.onSearch,t=e.isImport,r=Object(b.b)().territories,c=Object(k.a)({mode:"all",reValidateMode:"onChange",defaultValues:{count:100,territoryId:"base"}}),a=c.register,s=c.handleSubmit,o=c.errors,i=c.reset,d=c.setValue,j=c.getValues,C=c.formState,w=C.isDirty,R=C.isSubmitting,I=C.isValid,E=Object(g.d)().forceUpdate;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("span",{className:"text-secondary d-block mb-3",children:"Todos los campos son opcionales."}),Object(l.jsxs)(h.a,{onSubmit:s((function(e){var t=e.info,c=e.number,a=e.id,s=e.answeredOn,o=e.calledOn,i=e.noWeekends,l=e.noCall,d=e.nonExistent,j=e.comments,b=e.count,u=e.territoryId,h={};if(h.count=b,t&&(h.info=t),c&&(h.number=c),a&&(h.id=a),j&&(h.comments=j),s&&(h.answeredOn="Nunca"===s?"never":N(s)),o&&(h.calledOn="Nunca"===o?"never":N(o)),i&&(h.noWeekends=i),l&&(h.noCall=l),d&&(h.nonExistent=d),u){var O=r.find((function(e){return e.name===u})).id;O&&(h.territoryId=O.toString())}n(h)})),children:[Object(l.jsxs)(O.a,{children:[t&&Object(l.jsx)(x.a,{xs:12,md:6,children:Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{children:"Territorio"}),Object(l.jsx)(u.i,{name:"territoryId",ref:a,noEmptyValue:!0,excludeCurrent:!0})]})}),Object(l.jsx)(x.a,{xs:12,md:t?6:12,children:Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{children:"Cantidad a mostrar"}),Object(l.jsx)(p.a,{type:"number",name:"count",innerRef:a({validate:function(e){return e>=1}})})]})})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"2",children:Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{for:"id",children:"ID"}),Object(l.jsx)(p.a,{id:"id",name:"id",innerRef:a,autoComplete:"off"})]})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{for:"number",children:"N\xfamero"}),Object(l.jsx)(p.a,{id:"number",name:"number",innerRef:a,autoComplete:"off"})]})}),Object(l.jsx)(x.a,{md:"6",children:Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{for:"info",children:"Informaci\xf3n"}),Object(l.jsx)(p.a,{id:"info",name:"info",innerRef:a,autoComplete:"off"})]})})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsxs)(x.a,{md:"4",children:[Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{for:"comments",children:"Comentarios"}),Object(l.jsx)(p.a,{id:"comments",name:"comments",innerRef:a,autoComplete:"off"})]}),Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",checked:"*"===j("comments"),onChange:function(e){d("comments",e.target.checked?"*":"",{shouldDirty:!0}),E()}}),"Comentario no vac\xedo"]})})]}),Object(l.jsxs)(x.a,{md:"4",children:[Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{for:"answeredOn",children:"\xdaltima vez atendido el"}),Object(l.jsx)(p.a,{id:"answeredOn",name:"answeredOn",innerRef:a({pattern:/^(\d{2}\/\d{2}\/\d{4}|Nunca)$/}),placeholder:"Ej.: 13/04/2020",autoComplete:"off"}),o.answeredOn&&Object(l.jsx)(y,{children:"Formato inv\xe1lido, debe ser dia/mes/a\xf1o, 'Nunca' o dejar vac\xedo."})]}),Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",checked:"Nunca"===j("answeredOn"),onChange:function(e){d("answeredOn",e.target.checked?"Nunca":"",{shouldDirty:!0}),E()}}),"Nunca antes atendi\xf3"]})})]}),Object(l.jsxs)(x.a,{md:"4",children:[Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{for:"calledOn",children:"\xdaltima vez llamado el"}),Object(l.jsx)(p.a,{id:"calledOn",name:"calledOn",innerRef:a({pattern:/^(\d{2}\/\d{2}\/\d{4}|Nunca)$/}),placeholder:"Ej.: 13/04/2020",autoComplete:"off"}),o.calledOn&&Object(l.jsx)(y,{children:"Formato inv\xe1lido, debe ser dia/mes/a\xf1o, 'Nunca' o dejar vac\xedo."})]}),Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",checked:"Nunca"===j("calledOn"),onChange:function(e){d("calledOn",e.target.checked?"Nunca":"",{shouldDirty:!0}),E()}}),"Nunca antes llamado"]})})]})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"noWeekends",innerRef:a}),"No llamar los fines de semana"]})})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"noCall",innerRef:a}),"No visitar"]})})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"nonExistent",innerRef:a}),"No existente"]})})})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:t?6:4,children:Object(l.jsx)(v.a,{block:!0,outline:!0,onClick:function(){return i()},children:"Limpiar campos"})}),Object(l.jsx)(x.a,{md:t?6:4,children:Object(l.jsxs)(v.a,{type:"submit",disabled:t?!I||R:!w&&!j("answeredOn")&&!j("calledOn")&&!j("comments")||!I||R,color:"primary",block:!0,children:["Buscar",t?"":" con filtros"]})}),!t&&Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(v.a,{color:"success",block:!0,onClick:function(){var e={};e.count=j("count"),e.any=!0,n(e)},children:"Buscar todos"})})]})]})]})},w=t(6),R=t(101),I=t(5);function E(){var e=Object(w.a)(["\n  border-top: ",";\n"]);return E=function(){return e},e}function M(){var e=Object(w.a)(["\n  padding-left: 1.5rem;\n  position: relative;\n"]);return M=function(){return e},e}function S(){var e=Object(w.a)(["\n      background: ",";\n      color: ",";\n    "]);return S=function(){return e},e}function D(){var e=Object(w.a)(["\n  padding: 0.5rem 0;\n  margin-bottom: 1rem;\n  position: sticky;\n  top: 0;\n  background: ",";\n  z-index: 1;\n\n  ","\n\n  button:not(:first-of-type) {\n    margin-left: 1em;\n  }\n"]);return D=function(){return e},e}function T(){var e=Object(w.a)(["\n  white-space: nowrap;\n\n  button:not(:first-of-type) {\n    margin-left: 1em;\n  }\n"]);return T=function(){return e},e}function V(){var e=Object(w.a)(["\n  white-space: nowrap;\n"]);return V=function(){return e},e}function z(){var e=Object(w.a)(["\n  text-align: center;\n"]);return z=function(){return e},e}function q(){var e=Object(w.a)(["\n  text-align: center;\n\n  > tr > th {\n    vertical-align: middle;\n  }\n"]);return q=function(){return e},e}var B=function(e){var n=e.entries,t=e.count,r=e.onEditRequest,c=e.onDeleteRequest,o=e.onDeleteManyRequest,j=e.onImport,h=e.isImport,O=e.isImporting,x=Object(b.b)(),m=x.currentTerritory,f=x.territories,k=Object(d.useCallback)((function(e){return n.reduce((function(n,t){return n[t.id]=e,n}),{})}),[n]),g=Object(d.useState)((function(){return k(!1)})),y=Object(i.a)(g,2),N=y[0],C=y[1],w=Object(d.useMemo)((function(){return!Object.values(N).some((function(e){return!e}))}),[N]),I=Object(d.useMemo)((function(){return Object.values(N).filter(Boolean).length}),[N]);return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("h3",{children:["Mostrando ",n.length," de ",t," resultados."]}),Object(l.jsx)(J,{}),Object(l.jsx)(L,{children:O?Object(l.jsx)(u.g,{}):Object(l.jsxs)(l.Fragment,{children:["(",I," seleccionados)",Object(l.jsx)("span",{style:{margin:"0 1rem"},children:"|"}),Object(l.jsxs)(v.a,{color:"secondary",onClick:function(){return C(k(!w))},children:[w?"Des":"S","eleccionar todos"]}),h?Object(l.jsx)(v.a,{color:"success",disabled:0===I,onClick:function(){return j(Object.entries(N).filter((function(e){return Object(i.a)(e,2)[1]})).map((function(e){var n=Object(i.a)(e,1)[0];return parseInt(n)})))},children:"Importar todos los seleccionados"}):Object(l.jsx)(v.a,{color:"danger",disabled:0===I,onClick:function(){return o(Object.entries(N).filter((function(e){return Object(i.a)(e,2)[1]})).map((function(e){var n=Object(i.a)(e,1)[0];return parseInt(n)})))},children:"Borrar todos los seleccionados"})]})}),Object(l.jsxs)(R.a,{striped:!0,responsive:!0,children:[Object(l.jsx)(A,{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{}),Object(l.jsx)("th",{children:"ID"}),h&&Object(l.jsx)("th",{children:"Territorio"}),Object(l.jsx)("th",{children:"N\xfamero"}),Object(l.jsx)("th",{children:"Info"}),Object(l.jsx)("th",{children:"\xdaltima vez llamado"}),Object(l.jsx)("th",{children:"\xdaltima vez que atendi\xf3"}),Object(l.jsx)("th",{children:"Comentarios"}),Object(l.jsx)("th",{children:"D\xedas pospuesto"}),Object(l.jsx)("th",{children:"Caracter\xedsticas"}),!h&&!!m.campaignMode&&Object(l.jsx)("th",{style:{color:"gold"},children:"Completado en campa\xf1a"}),!h&&Object(l.jsx)("th",{children:"Acciones"})]})}),Object(l.jsx)(F,{children:n.map((function(e){var n;return Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:Object(l.jsx)(U,{children:Object(l.jsx)(p.a,{type:"checkbox",checked:N[e.id],onChange:function(n){return t=e.id,r=n.target.checked,C(Object(s.a)(Object(s.a)({},N),{},Object(a.a)({},t,r)));var t,r}})})}),Object(l.jsx)("td",{children:e.id}),h&&Object(l.jsx)("td",{children:null===(n=f.find((function(n){return n.id===e.territoryId})))||void 0===n?void 0:n.name}),Object(l.jsx)(P,{children:e.phone}),Object(l.jsx)("td",{children:e.info}),Object(l.jsx)("td",{children:e.unansweredDate||e.fulfilledOn||"Nunca"}),Object(l.jsx)("td",{children:e.answeredOn||"Nunca"}),Object(l.jsx)("td",{children:e.comments}),Object(l.jsx)("td",{children:e.postponedDays}),Object(l.jsx)("td",{children:[e.noCall&&"No visitar",e.nonExistent&&"No existe",e.noWeekends&&"No llamar los finde"].filter(Boolean).join(", ")}),!h&&!!m.campaignMode&&Object(l.jsx)("td",{style:{color:"gold"},children:e.campaignStatus?"S\xed":"No"}),!h&&Object(l.jsxs)(W,{children:[Object(l.jsx)(v.a,{color:"success",onClick:function(){return function(e){var n=document.createElement("a");n.href="/".concat(m.name,"/telefonica?id=").concat(e),n.target="_blank",document.body.appendChild(n),n.click(),n.remove()}(e.id)},children:"Autoasignar"}),Object(l.jsx)(v.a,{color:"warning",onClick:function(){return r(e)},children:"Editar"}),Object(l.jsx)(v.a,{color:"danger",onClick:function(){return c(e.id)},children:"Borrar"})]})]},e.id)}))})]})]})},A=I.c.thead(q()),F=I.c.tbody(z()),P=I.c.td(V()),W=I.c.td(T()),L=I.c.div(D(),(function(e){return e.theme.text.colors.white}),(function(e){var n=e.theme;return n.darkMode&&Object(I.b)(S(),n.text.colors.black,n.text.colors.white)})),U=I.c.div(M()),J=I.c.hr(E(),(function(e){return e.theme.darkMode&&"1px solid rgba(255,255,255,.1)"})),$=function(e){var n,t=e.phone,r=e.onBack,a=e.onUpdated,s=Object(k.a)({mode:"all",reValidateMode:"onChange",defaultValues:{phone:t.phone,comments:t.comments,info:null!==(n=t.info)&&void 0!==n?n:"",noCall:t.noCall,nonExistent:t.nonExistent,postponedDays:t.postponedDays,noWeekends:t.noWeekends}}),g=s.register,y=s.handleSubmit,N=s.errors,C=s.formState,w=C.isDirty,R=C.isValid,I=Object(d.useState)(!1),E=Object(i.a)(I,2),M=E[0],S=E[1],D=Object(b.c)(),T=Object(u.k)().AlertManager,V=function(){var e=Object(o.a)(c.a.mark((function e(n){var r,s,o,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,S(!0),e.next=4,D().put("phones/".concat(t.id),n);case 4:if(r=e.sent,s=Object(i.a)(r,2),o=s[0],l=s[1],!o){e.next=10;break}throw o;case 10:a(l.phone),T.show("update-success"),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),T.show("update-error");case 17:return e.prev=17,S(!1),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[0,14,17,20]])})));return function(n){return e.apply(this,arguments)}}();return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(u.a,{name:"update-success",position:"top",variant:"success",children:"\xa1N\xfamero actualizado con \xe9xito! \u2728"}),Object(l.jsx)(u.a,{name:"update-error",position:"bottom",variant:"failure",children:"No se pudo actualizar el tel\xe9fono. Por favor, intente de nuevo."}),Object(l.jsxs)(j.a,{className:"pt-4",children:[Object(l.jsx)("h1",{children:"Editar n\xfamero"}),Object(l.jsxs)(h.a,{onSubmit:y(V),children:[Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"3",children:Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{children:"N\xfamero"}),Object(l.jsx)(p.a,{name:"phone",innerRef:g})]})}),Object(l.jsx)(x.a,{md:"6",children:Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{children:"Info"}),Object(l.jsx)(p.a,{name:"info",innerRef:g})]})}),Object(l.jsxs)(x.a,{md:"3",children:[Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{children:"D\xedas pospuesto"}),Object(l.jsx)(p.a,{type:"number",name:"postponedDays",innerRef:g({validate:function(e){return e>=0}})})]}),N.postponedDays&&Object(l.jsx)("span",{className:"text-danger",children:"Valor inv\xe1lido"})]}),Object(l.jsx)(x.a,{md:"12",children:Object(l.jsxs)(m.a,{children:[Object(l.jsx)(f.a,{children:"Comentarios"}),Object(l.jsx)(p.a,{name:"comments",innerRef:g})]})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"noWeekends",innerRef:g}),"No llamar los finde"]})})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"noCall",innerRef:g}),"No visitar"]})})}),Object(l.jsx)(x.a,{md:"4",children:Object(l.jsx)(m.a,{check:!0,children:Object(l.jsxs)(f.a,{check:!0,children:[Object(l.jsx)(p.a,{type:"checkbox",name:"nonExistent",innerRef:g}),"No existente"]})})})]}),Object(l.jsx)("hr",{}),Object(l.jsxs)(O.a,{children:[Object(l.jsx)(x.a,{md:"6",children:Object(l.jsx)(v.a,{outline:!0,block:!0,onClick:r,children:"Volver atr\xe1s"})}),Object(l.jsx)(x.a,{md:"6",children:Object(l.jsx)(v.a,{type:"submit",block:!0,color:"primary",disabled:!w||!R,children:M?Object(l.jsx)(u.g,{fulfill:!0}):"Guardar"})})]})]})]})]})},G=[{title:"Panel de Administraci\xf3n",linkTo:"/admin-panel"},{title:"Buscar y editar"}],_=[{title:"Panel de Administraci\xf3n",linkTo:"/admin-panel"},{title:"Agregar N\xfameros",linkTo:"/admin-panel/add-phones"},{title:"Importar"}],H=function(e){var n=e.isImport,t=void 0!==n&&n,r=Object(d.useState)(null),h=Object(i.a)(r,2),O=h[0],x=h[1],m=Object(d.useState)(0),f=Object(i.a)(m,2),p=f[0],v=f[1],k=Object(d.useState)(!1),g=Object(i.a)(k,2),y=g[0],N=g[1],w=Object(d.useState)(!1),R=Object(i.a)(w,2),I=R[0],E=R[1],M=Object(d.useState)(null),S=Object(i.a)(M,2),D=S[0],T=S[1],V=Object(d.useState)(!1),z=Object(i.a)(V,2),q=z[0],A=z[1],F=Object(b.b)().testModeEnabled,P=Object(u.l)(),W=P.isModalOpen,L=P.data,U=P.askEditConfirmation,J=P.toggleModal,H=P.reset,K=Object(u.l)(),Q=K.isModalOpen,X=K.data,Y=K.askEditConfirmation,Z=K.toggleModal,ee=K.reset;Object(d.useEffect)((function(){x(null),v(0),T(null)}),[F]);var ne=Object(b.c)(),te=Object(u.k)().AlertManager,re=function(){var e=Object(o.a)(c.a.mark((function e(n){var t,r,o,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,N(!0),e.next=4,ne().get({path:"phones",params:Object.entries(n).map((function(e){var n=Object(i.a)(e,2),t=n[0],r=n[1];return[t,"boolean"!==typeof r?r:r?1:0]})).reduce((function(e,n){var t=Object(i.a)(n,2),r=t[0],c=t[1];return Object(s.a)(Object(s.a)({},e),{},Object(a.a)({},r,c))}),{})});case 4:if(t=e.sent,r=Object(i.a)(t,2),o=r[0],l=r[1],!o){e.next=10;break}throw o;case 10:x(l.phones),v(l.count),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),te.show("search-error");case 17:return e.prev=17,N(!1),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[0,14,17,20]])})));return function(n){return e.apply(this,arguments)}}(),ce=function(){var e=Object(o.a)(c.a.mark((function e(){var n,t,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,A(!0),e.next=4,ne().delete("phones/".concat(L));case 4:if(n=e.sent,t=Object(i.a)(n,1),!(r=t[0])){e.next=9;break}throw r;case 9:H(),x(O.filter((function(e){return e.id!==L}))),v(p-1),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),te.show("deletion-error");case 17:return e.prev=17,A(!1),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[0,14,17,20]])})));return function(){return e.apply(this,arguments)}}(),ae=function(){var e=Object(o.a)(c.a.mark((function e(){var n,t,r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(X){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,A(!0),e.next=6,ne().delete("phones/bulk",{ids:X});case 6:if(n=e.sent,t=Object(i.a)(n,1),!(r=t[0])){e.next=11;break}throw r;case 11:a=O.filter((function(e){return!X.includes(e.id)})),x(a),v(p-X.length),ee(),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(2),te.show("deletion-error");case 20:return e.prev=20,A(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[2,17,20,23]])})));return function(){return e.apply(this,arguments)}}(),se=function(){var e=Object(o.a)(c.a.mark((function e(n){var t,r,a,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==n.length){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,E(!0),e.next=6,ne().post("phones/import",{ids:n});case 6:if(t=e.sent,r=Object(i.a)(t,1),!(a=r[0])){e.next=11;break}throw a;case 11:s=O.filter((function(e){return!n.includes(e.id)})),x(s),v(p-n.length),te.show("import-success"),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(2),te.show("import-error");case 20:return e.prev=20,E(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[2,17,20,23]])})));return function(n){return e.apply(this,arguments)}}();if(null!==D)return Object(l.jsx)($,{phone:D,onBack:function(){return T(null)},onUpdated:function(e){return O&&x(O.map((function(n){return n.id===e.id?e:n})))}});var oe=null!==L&&(null===O||void 0===O?void 0:O.find((function(e){return e.id===L})));return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(u.a,{name:"search-error",position:"top",variant:"failure",children:"No se pudo buscar. Por favor, intente de nuevo."}),Object(l.jsx)(u.a,{name:"deletion-error",position:"top",variant:"failure",children:"No se pudo eliminar. Por favor, intente de nuevo."}),Object(l.jsx)(u.a,{name:"import-success",position:"top",variant:"success",children:"\xa1N\xfameros importados exitosamente!"}),Object(l.jsx)(u.a,{name:"import-error",position:"top",variant:"failure",children:"No se pudo importar. Por favor, intente de nuevo."}),Object(l.jsxs)(j.a,{className:"pt-4 mb-5",children:[Object(l.jsx)(u.b,{items:t?_:G}),Object(l.jsx)(C,{onSearch:re,isImport:t})]}),Object(l.jsx)(j.a,{fluid:!0,children:y?Object(l.jsx)(u.g,{}):O&&Object(l.jsx)(B,{isImport:t,entries:O,count:p,onEditRequest:function(e){return T(e)},onDeleteRequest:function(e){return U(e)},onDeleteManyRequest:function(e){return Y(e)},onImport:se,isImporting:I})}),null!==L&&oe&&Object(l.jsx)(u.c,{isOpen:W,toggleModal:J,onConfirm:ce,title:"\xbfSeguro que desea eliminar el siguiente n\xfamero?",body:q?Object(l.jsx)(u.g,{fulfill:!0}):Object(l.jsxs)("div",{children:[Object(l.jsxs)("span",{className:"d-block",children:["ID: ",oe.id]}),Object(l.jsxs)("span",{className:"d-block",children:["N\xfamero: ",oe.phone]}),Object(l.jsxs)("span",{className:"d-block",children:["Info: ",oe.info]})]}),buttonColor:"danger",confirmationLabel:"Eliminar para siempre"}),null!==X&&Object(l.jsx)(u.c,{isOpen:Q,toggleModal:Z,onConfirm:ae,title:"\xbfSeguro que desea eliminar ".concat(X.length," n\xfameros?"),body:q&&Object(l.jsx)(u.g,{fulfill:!0}),buttonColor:"danger",confirmationLabel:"Eliminar para siempre"})]})}}}]);
//# sourceMappingURL=1.4e216a04.chunk.js.map