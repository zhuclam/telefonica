(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[6],{102:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return Q}));var c=t(12),a=t.n(c),s=t(16),r=t(20),o=t(9),l=t(2),i=t(0),d=t(44),b=t(78),j=t(21),u=t(7),h=t(18),m=t(5),O=t(22),x=function(e){var n=e.phone,t=Object(i.useState)(0),c=Object(o.a)(t,2),a=c[0],s=c[1];return Object(i.useEffect)((function(){s(0)}),[n]),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("a",{style:{textDecoration:"underline"},href:"tel:".concat(n),onClick:function(){return s(a+1)},children:n}),Array(a).fill(null).map((function(e){return Object(l.jsx)("span",{className:"d-block text-success",children:"\xa1Tocado!"})}))]})},p=t(14),f=t(81);function N(){var e=Object(u.a)(["\n  .title {\n    display: flex;\n    justify-content: space-between;\n    font-weight: 500;\n\n    span {\n      font-weight: 800;\n    }\n  }\n\n  .inner {\n    display: flex;\n    justify-content: space-between;\n    padding-top: 0.5em;\n  }\n"]);return N=function(){return e},e}var v=function(e){var n=e.phoneId,t=e.initialNoCallOnWeekends,c=Object(i.useState)(!1),s=Object(o.a)(c,2),d=s[0],b=s[1],u=Object(i.useState)(t),m=Object(o.a)(u,2),O=m[0],x=m[1],N=Object(j.i)().AlertManager,v=Object(h.c)(),k=function(){var e=Object(r.a)(a.a.mark((function e(t,c){var s,r,l,i,d;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(){},r=c,"callOnWeekends"===t&&(s=function(){return x(O)},x(c),r=!c),e.prev=3,e.next=6,v().put("phones/".concat(n,"/options"),Object(p.a)({},t,r));case 6:if(l=e.sent,i=Object(o.a)(l,1),!(d=i[0])){e.next=11;break}throw d;case 11:N.show("phone-option-update-success"),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(3),s(),N.hideAll(),N.show("phone-option-update-failed");case 19:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(n,t){return e.apply(this,arguments)}}();return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(j.a,{name:"phone-option-update-success",position:"top",variant:"success",children:"Opci\xf3n de tel\xe9fono actualizada con \xe9xito."}),Object(l.jsx)(j.a,{name:"phone-option-update-failed",position:"bottom",variant:"failure",children:"No se pudo actualizar opci\xf3n de tel\xe9fono."}),Object(l.jsxs)(g,{children:[Object(l.jsxs)("div",{className:"title",onClick:function(){return b(!d)},children:["Opciones de tel\xe9fono",Object(l.jsx)("span",{children:d?"-":"+"})]}),Object(l.jsx)(f.a,{isOpen:d,children:Object(l.jsxs)("div",{className:"inner",children:[Object(l.jsx)("span",{children:"No llamar los fin de semana:"}),Object(l.jsx)(j.h,{label:"",checked:O,onChange:function(e){return k("callOnWeekends",e)}})]})})]})]})},g=m.c.div(N()),k=t(19),E=t(84),w=t(94);function y(){var e=Object(u.a)(["\n  margin-bottom: 0;\n  border: none;\n  color: ",";\n  text-decoration: underline;\n  background: none;\n  margin: auto;\n"]);return y=function(){return e},e}function C(){var e=Object(u.a)(["\n  border-top: 1px solid\n    ",";\n  border-bottom: 1px solid\n    ",";\n  padding: 10px 0;\n  margin-top: 2em;\n  display: flex;\n\n  > div {\n    width: 100%;\n  }\n"]);return C=function(){return e},e}function S(){var e=Object(u.a)(["\n  width: 100%;\n  border-top: none;\n  border-right: none;\n  border-left: none;\n  border-image: initial;\n  border-bottom: 2px solid ",";\n  outline: none;\n  transition: border-bottom-color 0.25s;\n  margin-bottom: 0.5em;\n  border-radius: 5px;\n  padding: 0 10px;\n\n  :focus {\n    border-bottom-color: ",";\n  }\n"]);return S=function(){return e},e}var A=function(e){var n,t,c=e.phone,a=e.comments,s=e.handleComments,r=e.openHelpSection,o=e.handlePhoneFeedback,i=Object(h.b)(),d=i.advancedModeEnabled,u=i.configurations,m=u.campaignMode,p=function(e){return!u.hiddenButtons.split(",").includes(e.toString())},f=Object(j.j)(),N=f.isModalOpen,g=f.data,y=f.askEditConfirmation,C=f.toggleModal,S=f.reset,A=function(e){return function(){d?y(e):o(e)}},R=A(O.b.ANSWERED),W=A(O.b.UNANSWERED),I=A(O.b.NON_EXISTENT),P=A(O.b.NO_CALL),_=A(O.b.ANSWERING_MACHINE),L=A(O.b.POSTPONE),q=A(O.b.IGNORE),F=Object(l.jsx)("div",{className:"table-responsive d-none d-sm-block",children:Object(l.jsxs)("table",{className:"table table-bordered",children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Tel\xe9fono"}),Object(l.jsx)("th",{children:"Otros datos"}),c.comments?Object(l.jsx)("th",{children:"Comentarios"}):null,Object(l.jsx)("th",{children:"\xdaltima fecha que atendi\xf3"}),Object(l.jsx)("th",{children:"\xdaltima fecha que se lo llam\xf3"})]})}),Object(l.jsx)("tbody",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:Object(l.jsx)(x,{phone:c.phone})}),Object(l.jsx)("td",{children:c.info}),c.comments?Object(l.jsx)("td",{children:c.comments}):null,Object(l.jsx)("td",{children:null!==(n=c.answeredOn)&&void 0!==n?n:"Nunca"}),Object(l.jsx)("td",{children:c.unansweredDate?c.unansweredDate:c.fulfilledOn?Object(l.jsxs)(l.Fragment,{children:["jue, 25 jun 2020"===c.fulfilledOn&&"Antes del ",c.fulfilledOn]}):"Nunca"})]})})]})}),H=Object(l.jsxs)("div",{className:"d-block d-sm-none text-center",children:[Object(l.jsx)("span",{style:{fontWeight:500},children:"Tel\xe9fono:"}),Object(l.jsx)("div",{children:Object(l.jsx)(x,{phone:c.phone})}),Object(l.jsx)("br",{}),Object(l.jsx)("span",{style:{fontWeight:500},children:"Otros datos:"}),Object(l.jsx)("div",{children:c.info}),Object(l.jsx)("br",{}),c.comments&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("span",{style:{fontWeight:500},children:"Comentarios:"}),Object(l.jsx)("div",{children:c.comments}),Object(l.jsx)("br",{})]}),Object(l.jsx)("span",{style:{fontWeight:500},children:"\xdaltima fecha que atendi\xf3:"}),Object(l.jsx)("div",{children:null!==(t=c.answeredOn)&&void 0!==t?t:"Nunca"}),Object(l.jsx)("br",{}),Object(l.jsx)("span",{style:{fontWeight:500},children:"\xdaltima fecha que se lo llam\xf3:"}),Object(l.jsx)("div",{children:c.unansweredDate?c.unansweredDate:c.fulfilledOn?Object(l.jsxs)(l.Fragment,{children:["jue, 25 jun 2020"===c.fulfilledOn&&"Antes del ",c.fulfilledOn]}):"Nunca"})]}),G=Object(l.jsx)(T,{children:Object(l.jsx)(D,{onClick:r,children:"\xbfQu\xe9 hace cada bot\xf3n?"})}),z=Object(l.jsx)("div",{className:"row my-4",children:Object(l.jsxs)("div",{className:"col-12",children:[Object(l.jsx)("span",{className:"text-secondary d-inline-block mb-2",children:"Comentarios (opcional):"}),Object(l.jsx)(M,{autoFocus:!0,placeholder:"Sus comentarios ac\xe1...",type:"text",value:a,onChange:function(e){return s(e.target.value)},readOnly:!d}),c.commentedOn&&Object(l.jsxs)("span",{className:"input-helper text-secondary",children:["Comentado el:"," ",Object(l.jsx)("span",{className:"text-success",children:c.commentedOn})]}),c.answeringMachineDate&&Object(l.jsxs)("span",{className:"d-block input-helper text-secondary",children:["\xdaltimo mensaje en el contestador:"," ",Object(l.jsx)("span",{className:"text-success",children:c.answeringMachineDate})]}),!c.commentedOn&&!c.answeringMachineDate&&Object(l.jsx)("span",{className:"input-helper text-secondary",children:"Ej.: lugar de trabajo, no habla espa\xf1ol, etc."})]})}),Q=m?Object(l.jsx)("div",{className:"my-4",children:Object(l.jsx)(E.a,{color:"success",block:!0,onClick:function(){return o(O.a.RUSHED)},children:"Siguiente"})}):d?Object(l.jsxs)("div",{className:"my-4 row d-flex justify-content-center",children:[p(O.b.ANSWERED)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-success btn-lg w-100 mx-auto mx-md-0 d-block",onClick:R,children:"Atendi\xf3"})}),p(O.b.UNANSWERED)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-danger btn-lg w-100 mx-auto mx-md-0 d-block",onClick:W,children:"No en casa"})}),p(O.b.ANSWERING_MACHINE)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-primary btn-lg w-100 mx-auto mx-md-0 d-block",onClick:_,children:"Contestador"})}),p(O.b.POSTPONE)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-info btn-lg w-100 mx-auto mx-md-0 d-block",onClick:L,children:"Aplazar"})}),p(O.b.IGNORE)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-secondary btn-lg w-100 mx-auto mx-md-0 d-block",onClick:q,children:"Ignorar"})}),p(O.b.NO_CALL)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-warning btn-lg w-100 mx-auto mx-md-0 d-block",onClick:P,children:"No visitar"})}),p(O.b.NON_EXISTENT)&&Object(l.jsx)("div",{className:"col-6 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-dark btn-lg w-100 mx-auto mx-md-0 d-block",onClick:I,children:"No existe"})})]}):Object(l.jsxs)("div",{className:"my-4 row d-flex justify-content-center",children:[p(O.b.ANSWERED)&&Object(l.jsx)("div",{className:"col-6 mb-3 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-success btn-lg mx-auto mx-md-0 d-block w-100",onClick:R,children:"Atendi\xf3"})}),p(O.b.UNANSWERED)&&Object(l.jsx)("div",{className:"col-6 mb-3 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-danger btn-lg mx-auto mx-md-0 d-block w-100",onClick:W,children:"No en casa"})}),p(O.b.NO_CALL)&&Object(l.jsx)("div",{className:"col-6 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-warning btn-lg mx-auto mx-md-0 d-block w-100",onClick:P,children:"No visitar"})}),p(O.b.NON_EXISTENT)&&Object(l.jsx)("div",{className:"col-6 col-md-auto",children:Object(l.jsx)("button",{className:"btn btn-dark btn-lg mx-auto mx-md-0 d-block w-100",onClick:I,children:"No existe"})})]});return Object(l.jsxs)(b.a,{className:"py-4",children:[F,H,z,m&&Object(l.jsx)(w.a,{fluid:!0,className:"my-2",children:Object(l.jsxs)(b.a,{children:[Object(l.jsx)("h6",{children:"\xa1Estamos en campa\xf1a!"}),Object(l.jsx)("small",{children:'Durante la campa\xf1a, solo habr\xe1 un bot\xf3n de "siguiente".'})]})}),d&&!m&&Object(l.jsx)(T,{children:Object(l.jsx)(v,{phoneId:c.id,initialNoCallOnWeekends:c.noWeekends})}),Q,d&&!m&&G,null!==g&&Object(l.jsx)(j.c,{isOpen:N,toggleModal:C,onConfirm:function(){null!==g&&(o(g),S())},title:"\xbfSeguro?",buttonColor:k.c[g],confirmationLabel:k.d[g]})]})},M=m.c.input(S(),(function(e){return e.theme.text.colors.secondary}),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.black})),T=m.c.div(C(),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.secondary}),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.secondary})),D=m.c.button(y(),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:"#555"}));function R(){var e=Object(u.a)(["\n  width: 100%;\n"]);return R=function(){return e},e}function W(){var e=Object(u.a)(["\n  display: flex;\n  padding: 20px 0;\n  min-height: calc(100vh - ","px);\n  justify-content: space-evenly;\n  flex-direction: column;\n"]);return W=function(){return e},e}var I=function(e){var n=e.close,t=Object(h.b)(),c=t.advancedModeEnabled,a=t.configurations,s=function(e){return!a.hiddenButtons.split(",").includes(e.toString())};return Object(l.jsxs)(P,{children:[s(O.b.ANSWERED)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de ",Object(l.jsx)("span",{className:"text-success",children:"atendi\xf3"}),"?"]}),Object(l.jsx)("p",{children:"Manda el n\xfamero al final de la cola y registra la fecha en que se atendi\xf3."})]}),s(O.b.UNANSWERED)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-danger",children:"no en casa"}),"?"]}),Object(l.jsxs)("p",{children:["Guarda el n\xfamero para llamarlo de vuelta ma\xf1ana, hasta un m\xe1ximo de"," ",a.unansweredMaxAttemps," intentos. Luego, si no atendi\xf3, se lo manda al final de la cola."]})]}),c&&Object(l.jsxs)(l.Fragment,{children:[s(O.b.ANSWERING_MACHINE)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-primary",children:"contestador"}),"?"]}),Object(l.jsxs)("p",{children:["Registra la \xfaltima vez que se le dej\xf3 un mensaje en el contestador al amo de casa.\xa0",a.answeringMachineMaxAttemps>1&&Object(l.jsxs)("span",{children:["Adem\xe1s, congela el n\xfamero durante"," ",a.answeringMachinePostponedDays," d\xedas para darle un m\xe1ximo de"," ",a.answeringMachineMaxAttemps,' oportunidades. Estas oportunidades se computan junto a las que ya se le dio con el bot\xf3n "no en casa" si ha sido el caso.']})]})]}),s(O.b.POSTPONE)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de ",Object(l.jsx)("span",{className:"text-info",children:"aplazar"}),"?"]}),Object(l.jsxs)("p",{children:["Congela el n\xfamero para que se lo llame dentro de"," ",a.postponedButtonDays," ",a.postponedButtonDays>1?"d\xedas":"d\xeda","."]})]}),s(O.b.IGNORE)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-secondary",children:"ignorar"}),"?"]}),Object(l.jsx)("p",{children:"Manda el n\xfamero directamente al final de la cola."})]})]}),s(O.b.NO_CALL)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-warning",children:"no visitar"}),"?"]}),Object(l.jsx)("p",{children:"Quita el n\xfamero de la cola. No se lo borra pero tampoco se lo volver\xe1 a llamar."})]}),s(O.b.NON_EXISTENT)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-secondary",children:"no existe"}),"?"]}),Object(l.jsxs)("p",{children:["Suspende el n\xfamero durante ",a.nonExistentPostponedDays," ","d\xedas. Luego vuelve a la cola porque existe la posibilidad de que se haya reactivado."]})]}),Object(l.jsx)("p",{className:"text-center",children:"Nota: en ning\xfan caso se borran los n\xfameros. Si correspondiera (por ej. por estar fuera del territorio), por favor, comunicarse con el siervo de territorios."}),Object(l.jsx)(_,{className:"btn btn-secondary",onClick:n,children:"Volver"})]})},P=m.c.div(W(),(function(e){return e.theme.navbarHeight})),_=m.c.button(R()),L=t(98);function q(){var e=Object(u.a)(["\n  position: absolute;\n  left: 0px;\n  background: rgb(34, 34, 34);\n  width: 100%;\n  border: 1px solid rgb(102, 102, 102);\n  padding: "," 10px;\n  display: flex;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n  transition: padding 0.3s, height 0.3s;\n"]);return q=function(){return e},e}var F=function(e){var n=e.currentPhoneId,t=e.onEditRequest,c=e.PhoneStorage,a=Object(i.useState)(null),s=Object(o.a)(a,2),r=s[0],d=s[1],b=Object(j.j)(),u=b.isModalOpen,m=b.data,x=b.askEditConfirmation,p=b.toggleModal,f=b.reset,N=Object(h.b)().configurations.campaignMode,v=(null===m||void 0===m?void 0:m.feedbackToConfirm)||null,g=(null===m||void 0===m?void 0:m.storagePhoneToConfirm)||null,E=function(e,n){return x({storagePhoneToConfirm:n,feedbackToConfirm:e})},w=c.getAll().reverse().map((function(e,t){if(e.id===n)return null;var c=function(e){var n=new Date(e),t=new Date;return n.setHours(0,0,0,0)===t.setHours(0,0,0,0)}(e.savedOn),a=null!==e.status?k.c[e.status]:"",s=c||null!==e.status?null!==e.status?k.d[e.status]:"Sin respuesta":"Asignado a otro publicador",o=t===r;return Object(l.jsxs)("tr",{style:{position:"relative"},children:[Object(l.jsx)("td",{children:e.phone}),!N&&Object(l.jsx)("td",{children:Object(l.jsx)("span",{className:"text-".concat(a),children:s})}),!N&&Object(l.jsxs)("td",{children:[c&&Object(l.jsx)("button",{className:"btn btn-secondary",onClick:function(){return function(e){return d(r!==e?e:null)}(t)},children:"Editar"}),Object(l.jsxs)(H,{isOpen:o,children:[e.status!==O.b.ANSWERED&&Object(l.jsx)("button",{className:"btn btn-success btn-sm d-inline-block mr-1 mb-2",onClick:function(){return E(O.b.ANSWERED,e)},children:"Atendi\xf3"}),e.status!==O.b.UNANSWERED&&Object(l.jsx)("button",{className:"btn btn-danger btn-sm d-inline-block mr-1 mb-2",onClick:function(){return E(O.b.UNANSWERED,e)},children:"No en casa"}),e.status!==O.b.ANSWERING_MACHINE&&Object(l.jsx)("button",{className:"btn btn-primary btn-sm d-inline-block mr-1 mb-2",onClick:function(){return E(O.b.ANSWERING_MACHINE,e)},children:"Contestador"}),e.status!==O.b.POSTPONE&&Object(l.jsx)("button",{className:"btn btn-info btn-sm d-inline-block mr-1 mb-2",onClick:function(){return E(O.b.POSTPONE,e)},children:"Aplazar"}),e.status!==O.b.IGNORE&&Object(l.jsx)("button",{className:"btn btn-secondary btn-sm d-inline-block mr-1 mb-2",onClick:function(){return E(O.b.IGNORE,e)},children:"Ignorar"}),e.status!==O.b.NO_CALL&&Object(l.jsx)("button",{className:"btn btn-warning btn-sm d-inline-block mr-1 mb-2",onClick:function(){return E(O.b.NO_CALL,e)},children:"No visitar"}),e.status!==O.b.NON_EXISTENT&&Object(l.jsx)("button",{className:"btn btn-dark btn-sm d-inline-block mr-1 mb-2",onClick:function(){return E(O.b.NON_EXISTENT,e)},children:"No existe"})]})]})]},e.id)}));return w.filter((function(e){return!!e})).length>0?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h6",{className:"container mb-3",children:"N\xfameros anteriores en este dispositivo:"}),Object(l.jsxs)(L.a,{responsive:!0,className:"text-center",children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Tel\xe9fono"}),!N&&Object(l.jsx)("th",{children:"Estado"}),!N&&Object(l.jsx)("th",{children:"Acciones"})]})}),Object(l.jsx)("tbody",{children:w})]}),null!==v&&Object(l.jsx)(j.c,{isOpen:u,toggleModal:p,onConfirm:function(){g&&"number"===typeof v&&(t(g,v),d(null),f())},title:"\xbfSeguro?",buttonColor:k.c[v],confirmationLabel:k.d[v]})]}):null},H=Object(m.c)(f.a)(q(),(function(e){return e.isOpen?"20px":"0"})),G=t(10),z=t(34),Q=function(){var e=Object(i.useState)(null),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(i.useState)(!0),m=Object(o.a)(u,2),x=m[0],p=m[1],f=Object(i.useState)(!1),N=Object(o.a)(f,2),v=N[0],g=N[1],k=Object(i.useState)(""),E=Object(o.a)(k,2),w=E[0],y=E[1],C=Object(h.d)(),S=Object(h.b)().advancedModeEnabled,M=Object(j.i)().AlertManager,T=Object(h.c)(),D=Object(i.useCallback)(Object(r.a)(a.a.mark((function e(){var n,t,r,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),g(!1),e.next=5,T().get("next");case 5:if(n=e.sent,t=Object(o.a)(n,2),r=t[0],l=t[1],!r){e.next=11;break}throw r;case 11:c(l.phone),y(l.phone.comments),M.show("new-phone-received",{timeout:5e3}),C.add({id:l.phone.id,status:null,phone:l.phone.phone,savedOn:Date.now(),restore:Object(s.a)(Object(s.a)({},l.original),{},{lastStatus:null})}),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(0),console.log({e:e.t0}),g(!0);case 21:return e.prev=21,p(!1),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[0,17,21,24]])}))),[M,C,T]);Object(i.useEffect)((function(){D()}),[D]);var R=function(){var e=Object(r.a)(a.a.mark((function e(n){var c,s,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,p(!0),e.next=6,T().put("update_phone",{id:t.id,answered:n,comments:w});case 6:if(c=e.sent,s=Object(o.a)(c,1),!(r=s[0])){e.next=11;break}throw r;case 11:D(),C.update(t.id,n===O.a.RUSHED?O.b.ANSWERED:n),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(2),M.hideAll(),M.show("feedback-failed"),p(!1);case 20:case"end":return e.stop()}}),e,null,[[2,15]])})));return function(n){return e.apply(this,arguments)}}(),W=function(){var e=Object(r.a)(a.a.mark((function e(n,t){var c,s,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T().put("update_phone",{id:n.id,answered:t,restore:n.restore});case 3:if(c=e.sent,s=Object(o.a)(c,1),!(r=s[0])){e.next=8;break}throw r;case 8:C.update(n.id,t),M.show("edit-success"),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),M.hideAll(),M.show("feedback-failed");case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t){return e.apply(this,arguments)}}(),P=Object(z.d)(R,5e3),_=Object(z.d)(W,5e3),L=Object(G.g)(),q=function(){return L.push("/telefonica/help")},H=function(){return L.goBack()},Q=function(e){return y(e)};if(v)return Object(l.jsx)(j.d,{});if(x||!t)return Object(l.jsx)(j.g,{fulfill:!0,container:!0});return Object(l.jsx)(b.a,{children:Object(l.jsxs)(G.d,{children:[Object(l.jsx)(G.b,{path:"/telefonica",exact:!0,render:function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(d.a,{children:Object(l.jsxs)("title",{children:["EVB"," Telef\xf3nica"]})}),Object(l.jsx)(j.a,{name:"new-phone-received",position:"top",variant:"success",children:Object(l.jsx)("div",{className:"text-center",children:"\u2728 \xa1Nuevo n\xfamero recibido! \u2728\ud83c\udf89"})}),Object(l.jsx)(j.a,{name:"feedback-failed",position:"top",variant:"failure",children:Object(l.jsx)("div",{className:"text-center",children:"No se pudo enviar su feedback \ud83d\ude22"})}),Object(l.jsx)(j.a,{name:"edit-success",position:"bottom",variant:"success",children:Object(l.jsx)("div",{className:"text-center",children:"N\xfamero actualizado."})}),Object(l.jsx)(A,{phone:t,comments:w,handleComments:Q,openHelpSection:q,handlePhoneFeedback:P}),S&&Object(l.jsx)(F,{PhoneStorage:C,currentPhoneId:t.id,onEditRequest:_})]})}}),Object(l.jsx)(G.b,{path:"/telefonica/help",exact:!0,component:function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(d.a,{children:Object(l.jsxs)("title",{children:["EVB"," Telef\xf3nica Ayuda"]})}),Object(l.jsx)(I,{close:H})]})}})]})})}},94:function(e,n,t){"use strict";var c=t(4),a=t(8),s=t(0),r=t.n(s),o=t(1),l=t.n(o),i=t(6),d=t.n(i),b=t(3),j={tag:b.o,fluid:l.a.bool,className:l.a.string,cssModule:l.a.object},u=function(e){var n=e.className,t=e.cssModule,s=e.tag,o=e.fluid,l=Object(a.a)(e,["className","cssModule","tag","fluid"]),i=Object(b.k)(d()(n,"jumbotron",!!o&&"jumbotron-fluid"),t);return r.a.createElement(s,Object(c.a)({},l,{className:i}))};u.propTypes=j,u.defaultProps={tag:"div"},n.a=u},98:function(e,n,t){"use strict";var c=t(4),a=t(8),s=t(0),r=t.n(s),o=t(1),l=t.n(o),i=t(6),d=t.n(i),b=t(3),j={className:l.a.string,cssModule:l.a.object,size:l.a.string,bordered:l.a.bool,borderless:l.a.bool,striped:l.a.bool,dark:l.a.bool,hover:l.a.bool,responsive:l.a.oneOfType([l.a.bool,l.a.string]),tag:b.o,responsiveTag:b.o,innerRef:l.a.oneOfType([l.a.func,l.a.string,l.a.object])},u=function(e){var n=e.className,t=e.cssModule,s=e.size,o=e.bordered,l=e.borderless,i=e.striped,j=e.dark,u=e.hover,h=e.responsive,m=e.tag,O=e.responsiveTag,x=e.innerRef,p=Object(a.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),f=Object(b.k)(d()(n,"table",!!s&&"table-"+s,!!o&&"table-bordered",!!l&&"table-borderless",!!i&&"table-striped",!!j&&"table-dark",!!u&&"table-hover"),t),N=r.a.createElement(m,Object(c.a)({},p,{ref:x,className:f}));if(h){var v=Object(b.k)(!0===h?"table-responsive":"table-responsive-"+h,t);return r.a.createElement(O,{className:v},N)}return N};u.propTypes=j,u.defaultProps={tag:"table",responsiveTag:"div"},n.a=u}}]);
//# sourceMappingURL=6.977dddb6.chunk.js.map