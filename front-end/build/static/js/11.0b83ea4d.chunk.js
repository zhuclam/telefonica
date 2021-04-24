(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[11],{101:function(e,n,t){"use strict";var c=t(4),a=t(8),s=t(0),r=t.n(s),o=t(1),i=t.n(o),l=t(7),d=t.n(l),b=t(3),u={className:i.a.string,cssModule:i.a.object,size:i.a.string,bordered:i.a.bool,borderless:i.a.bool,striped:i.a.bool,dark:i.a.bool,hover:i.a.bool,responsive:i.a.oneOfType([i.a.bool,i.a.string]),tag:b.o,responsiveTag:b.o,innerRef:i.a.oneOfType([i.a.func,i.a.string,i.a.object])},j=function(e){var n=e.className,t=e.cssModule,s=e.size,o=e.bordered,i=e.borderless,l=e.striped,u=e.dark,j=e.hover,m=e.responsive,h=e.tag,O=e.responsiveTag,x=e.innerRef,p=Object(a.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),f=Object(b.k)(d()(n,"table",!!s&&"table-"+s,!!o&&"table-bordered",!!i&&"table-borderless",!!l&&"table-striped",!!u&&"table-dark",!!j&&"table-hover"),t),N=r.a.createElement(h,Object(c.a)({},p,{ref:x,className:f}));if(m){var v=Object(b.k)(!0===m?"table-responsive":"table-responsive-"+m,t);return r.a.createElement(O,{className:v},N)}return N};j.propTypes=u,j.defaultProps={tag:"table",responsiveTag:"div"},n.a=j},111:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return oe}));var c=t(15),a=t.n(c),s=t(17),r=t(21),o=t(9),i=t(2),l=t(0),d=t.n(l),b=t(46),u=t(81),j=t(19),m=t(6),h=t(13),O=t(5),x=t(22),p=function(e){var n=e.phone,t=Object(l.useState)(0),c=Object(o.a)(t,2),a=c[0],s=c[1];return Object(l.useEffect)((function(){s(0)}),[n]),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("a",{style:{textDecoration:"underline"},href:"tel:".concat(n),onClick:function(){return s(a+1)},children:n}),Array(a).fill(null).map((function(e){return Object(i.jsx)("span",{className:"d-block text-success",children:"\xa1Tocado!"})}))]})},f=t(16),N=t(84);function v(){var e=Object(m.a)(["\n  .title {\n    display: flex;\n    justify-content: space-between;\n    font-weight: 500;\n\n    span {\n      font-weight: 800;\n    }\n  }\n\n  .inner {\n    display: flex;\n    justify-content: space-between;\n    padding-top: 0.5em;\n  }\n"]);return v=function(){return e},e}var g=function(e){var n=e.phoneId,t=e.initialNoCallOnWeekends,c=Object(l.useState)(!1),s=Object(o.a)(c,2),d=s[0],b=s[1],u=Object(l.useState)(t),m=Object(o.a)(u,2),O=m[0],x=m[1],p=Object(j.k)().AlertManager,v=Object(h.c)(),g=function(){var e=Object(r.a)(a.a.mark((function e(t,c){var s,r,i,l,d;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(){},r=c,"callOnWeekends"===t&&(s=function(){return x(O)},x(c),r=!c),e.prev=3,e.next=6,v().put("phones/".concat(n,"/options"),Object(f.a)({},t,r));case 6:if(i=e.sent,l=Object(o.a)(i,1),!(d=l[0])){e.next=11;break}throw d;case 11:p.show("phone-option-update-success"),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(3),s(),p.hideAll(),p.show("phone-option-update-failed");case 19:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(n,t){return e.apply(this,arguments)}}();return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(j.a,{name:"phone-option-update-success",position:"top",variant:"success",children:"Opci\xf3n de tel\xe9fono actualizada con \xe9xito."}),Object(i.jsx)(j.a,{name:"phone-option-update-failed",position:"bottom",variant:"failure",children:"No se pudo actualizar opci\xf3n de tel\xe9fono."}),Object(i.jsxs)(E,{children:[Object(i.jsxs)("div",{className:"title",onClick:function(){return b(!d)},children:["Opciones de tel\xe9fono",Object(i.jsx)("span",{children:d?"-":"+"})]}),Object(i.jsx)(N.a,{isOpen:d,children:Object(i.jsxs)("div",{className:"inner",children:[Object(i.jsx)("span",{children:"No llamar los fin de semana:"}),Object(i.jsx)(j.h,{label:"",checked:O,onChange:function(e){return g("callOnWeekends",e)}})]})})]})]})},E=O.c.div(v()),k=t(11),y=t(87),w=t(4),C=t(8),S=t(26),A=t(1),T=t.n(A),M=t(7),R=t.n(M),D=t(3),I=t(28);function P(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);n&&(c=c.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,c)}return t}function W(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?P(Object(t),!0).forEach((function(n){Object(S.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):P(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var L={children:T.a.node,className:T.a.string,closeClassName:T.a.string,closeAriaLabel:T.a.string,cssModule:T.a.object,color:T.a.string,fade:T.a.bool,isOpen:T.a.bool,toggle:T.a.func,tag:D.o,transition:T.a.shape(I.a.propTypes),innerRef:T.a.oneOfType([T.a.object,T.a.string,T.a.func])},_={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:W(W({},I.a.defaultProps),{},{unmountOnExit:!0})};function G(e){var n=e.className,t=e.closeClassName,c=e.closeAriaLabel,a=e.cssModule,s=e.tag,r=e.color,o=e.isOpen,i=e.toggle,l=e.children,b=e.transition,u=e.fade,j=e.innerRef,m=Object(C.a)(e,["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"]),h=Object(D.k)(R()(n,"alert","alert-"+r,{"alert-dismissible":i}),a),O=Object(D.k)(R()("close",t),a),x=W(W(W({},I.a.defaultProps),b),{},{baseClass:u?b.baseClass:"",timeout:u?b.timeout:0});return d.a.createElement(I.a,Object(w.a)({},m,x,{tag:s,className:h,in:o,role:"alert",innerRef:j}),i?d.a.createElement("button",{type:"button",className:O,"aria-label":c,onClick:i},d.a.createElement("span",{"aria-hidden":"true"},"\xd7")):null,l)}G.propTypes=L,G.defaultProps=_;var H=G,U=t(97);function F(){var e=Object(m.a)(["\n  margin-bottom: 0;\n  border: none;\n  color: ",";\n  text-decoration: underline;\n  background: none;\n  margin: auto;\n"]);return F=function(){return e},e}function q(){var e=Object(m.a)(["\n  border-top: 1px solid\n    ",";\n  border-bottom: 1px solid\n    ",";\n  padding: 10px 0;\n  margin-top: 2em;\n  display: flex;\n\n  > div {\n    width: 100%;\n  }\n"]);return q=function(){return e},e}function z(){var e=Object(m.a)(["\n  width: 100%;\n  border-top: none;\n  border-right: none;\n  border-left: none;\n  border-image: initial;\n  border-bottom: 2px solid ",";\n  outline: none;\n  transition: border-bottom-color 0.25s;\n  margin-bottom: 0.5em;\n  border-radius: 5px;\n  padding: 0 10px;\n\n  :focus {\n    border-bottom-color: ",";\n  }\n"]);return z=function(){return e},e}var Q=function(e){var n,t,c=e.phone,a=e.comments,s=e.handleComments,r=e.openHelpSection,o=e.handlePhoneFeedback,l=e.selfAssigned,d=e.isFromAnotherTerritory,b=Object(h.b)(),m=b.advancedModeEnabled,O=b.configurations,f=b.currentTerritory,N=O.hiddenButtons,v=f.campaignMode,E=function(e){return!N.split(",").includes(e.toString())},w=Object(j.l)(),C=w.isModalOpen,S=w.data,A=w.askEditConfirmation,T=w.toggleModal,M=w.reset,R=function(e){return function(){m?A(e):o(e)}},D=R(x.b.ANSWERED),I=R(x.b.UNANSWERED),P=R(x.b.NON_EXISTENT),W=R(x.b.NO_CALL),L=R(x.b.ANSWERING_MACHINE),_=R(x.b.POSTPONE),G=R(x.b.IGNORE),F=Object(i.jsx)("div",{className:"table-responsive d-none d-sm-block",children:Object(i.jsxs)("table",{className:"table table-bordered",children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Tel\xe9fono"}),Object(i.jsx)("th",{children:"Otros datos"}),c.comments?Object(i.jsx)("th",{children:"Comentarios"}):null,Object(i.jsx)("th",{children:"\xdaltima fecha que atendi\xf3"}),Object(i.jsx)("th",{children:"\xdaltima fecha que se lo llam\xf3"})]})}),Object(i.jsx)("tbody",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)(p,{phone:c.phone})}),Object(i.jsx)("td",{children:c.info}),c.comments?Object(i.jsx)("td",{children:c.comments}):null,Object(i.jsx)("td",{children:null!==(n=c.answeredOn)&&void 0!==n?n:"Nunca"}),Object(i.jsx)("td",{children:c.unansweredDate?c.unansweredDate:c.fulfilledOn?Object(i.jsxs)(i.Fragment,{children:["jue, 25 jun 2020"===c.fulfilledOn&&"Antes del ",c.fulfilledOn]}):"Nunca"})]})})]})}),q=Object(i.jsxs)("div",{className:"d-block d-sm-none text-center",children:[Object(i.jsx)("span",{style:{fontWeight:500},children:"Tel\xe9fono:"}),Object(i.jsx)("div",{children:Object(i.jsx)(p,{phone:c.phone})}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{style:{fontWeight:500},children:"Otros datos:"}),Object(i.jsx)("div",{children:c.info}),Object(i.jsx)("br",{}),c.comments&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("span",{style:{fontWeight:500},children:"Comentarios:"}),Object(i.jsx)("div",{children:c.comments}),Object(i.jsx)("br",{})]}),Object(i.jsx)("span",{style:{fontWeight:500},children:"\xdaltima fecha que atendi\xf3:"}),Object(i.jsx)("div",{children:null!==(t=c.answeredOn)&&void 0!==t?t:"Nunca"}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{style:{fontWeight:500},children:"\xdaltima fecha que se lo llam\xf3:"}),Object(i.jsx)("div",{children:c.unansweredDate?c.unansweredDate:c.fulfilledOn?Object(i.jsxs)(i.Fragment,{children:["jue, 25 jun 2020"===c.fulfilledOn&&"Antes del ",c.fulfilledOn]}):"Nunca"})]}),z=Object(i.jsx)(B,{children:Object(i.jsx)(J,{onClick:r,children:"\xbfQu\xe9 hace cada bot\xf3n?"})}),Q=Object(i.jsx)("div",{className:"row my-4",children:Object(i.jsxs)("div",{className:"col-12",children:[Object(i.jsx)("span",{className:"text-secondary d-inline-block mb-2",children:"Comentarios (opcional):"}),Object(i.jsx)(X,{placeholder:"Su comentario ac\xe1...",type:"text",value:a,onChange:function(e){return s(e.target.value)}}),c.commentedOn&&Object(i.jsxs)("span",{className:"input-helper text-secondary",children:["Comentado el:"," ",Object(i.jsx)("span",{className:"text-success",children:c.commentedOn})]}),c.answeringMachineDate&&Object(i.jsxs)("span",{className:"d-block input-helper text-secondary",children:["\xdaltimo mensaje en el contestador:"," ",Object(i.jsx)("span",{className:"text-success",children:c.answeringMachineDate})]}),!c.commentedOn&&!c.answeringMachineDate&&Object(i.jsx)("span",{className:"input-helper text-secondary",children:"Ej.: lugar de trabajo, no habla espa\xf1ol, etc."})]})}),V=v?Object(i.jsx)("div",{className:"my-4",children:Object(i.jsx)(y.a,{color:"success",block:!0,onClick:function(){return o(x.a.RUSHED)},children:"Siguiente"})}):m?Object(i.jsxs)("div",{className:"my-4 row d-flex justify-content-center",children:[E(x.b.ANSWERED)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-success btn-lg w-100 mx-auto mx-md-0 d-block",onClick:D,children:"Atendi\xf3"})}),E(x.b.UNANSWERED)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-danger btn-lg w-100 mx-auto mx-md-0 d-block",onClick:I,children:"No en casa"})}),E(x.b.ANSWERING_MACHINE)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-primary btn-lg w-100 mx-auto mx-md-0 d-block",onClick:L,children:"Contestador"})}),E(x.b.POSTPONE)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-info btn-lg w-100 mx-auto mx-md-0 d-block",onClick:_,children:"Aplazar"})}),E(x.b.IGNORE)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-secondary btn-lg w-100 mx-auto mx-md-0 d-block",onClick:G,children:"Ignorar"})}),E(x.b.NO_CALL)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-warning btn-lg w-100 mx-auto mx-md-0 d-block",onClick:W,children:"No visitar"})}),E(x.b.NON_EXISTENT)&&Object(i.jsx)("div",{className:"col-6 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-dark btn-lg w-100 mx-auto mx-md-0 d-block",onClick:P,children:"No existe"})})]}):Object(i.jsxs)("div",{className:"my-4 row d-flex justify-content-center",children:[E(x.b.ANSWERED)&&Object(i.jsx)("div",{className:"col-6 mb-3 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-success btn-lg mx-auto mx-md-0 d-block w-100",onClick:D,children:"Atendi\xf3"})}),E(x.b.UNANSWERED)&&Object(i.jsx)("div",{className:"col-6 mb-3 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-danger btn-lg mx-auto mx-md-0 d-block w-100",onClick:I,children:"No en casa"})}),E(x.b.NO_CALL)&&Object(i.jsx)("div",{className:"col-6 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-warning btn-lg mx-auto mx-md-0 d-block w-100",onClick:W,children:"No visitar"})}),E(x.b.NON_EXISTENT)&&Object(i.jsx)("div",{className:"col-6 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-dark btn-lg mx-auto mx-md-0 d-block w-100",onClick:P,children:"No existe"})})]});return Object(i.jsxs)(u.a,{className:"py-4",children:[l&&Object(i.jsx)(H,{color:"warning",children:"Usando n\xfamero autoasignado"}),d&&Object(i.jsx)(H,{color:"danger",children:"\xa1El n\xfamero es de otro territorio!"}),F,q,Q,!!v&&Object(i.jsx)(U.a,{fluid:!0,className:"my-2",children:Object(i.jsxs)(u.a,{children:[Object(i.jsx)("h6",{children:"\xa1Estamos en campa\xf1a!"}),Object(i.jsx)("small",{children:'Durante la campa\xf1a, solo habr\xe1 un bot\xf3n de "siguiente".'})]})}),m&&!v&&Object(i.jsx)(B,{children:Object(i.jsx)(g,{phoneId:c.id,initialNoCallOnWeekends:c.noWeekends})}),V,m&&!v&&z,null!==S&&Object(i.jsx)(j.c,{isOpen:C,toggleModal:T,onConfirm:function(){null!==S&&(o(S),M())},title:"\xbfSeguro?",buttonColor:k.c[S],confirmationLabel:k.d[S]})]})},X=O.c.input(z(),(function(e){return e.theme.text.colors.secondary}),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.black})),B=O.c.div(q(),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.secondary}),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.secondary})),J=O.c.button(F(),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:"#555"}));function V(){var e=Object(m.a)(["\n  width: 100%;\n"]);return V=function(){return e},e}function K(){var e=Object(m.a)(["\n  display: flex;\n  padding: 20px 0;\n  min-height: calc(100vh - ","px);\n  justify-content: space-evenly;\n  flex-direction: column;\n"]);return K=function(){return e},e}var Y=function(e){var n=e.close,t=Object(h.b)(),c=t.advancedModeEnabled,a=t.configurations,s=function(e){return!a.hiddenButtons.split(",").includes(e.toString())};return Object(i.jsxs)(Z,{children:[s(x.b.ANSWERED)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de ",Object(i.jsx)("span",{className:"text-success",children:"atendi\xf3"}),"?"]}),Object(i.jsx)("p",{children:"Manda el n\xfamero al final de la cola y registra la fecha en que se atendi\xf3."})]}),s(x.b.UNANSWERED)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-danger",children:"no en casa"}),"?"]}),Object(i.jsxs)("p",{children:["Guarda el n\xfamero para llamarlo de vuelta ma\xf1ana, hasta un m\xe1ximo de"," ",a.unansweredMaxAttemps," intentos. Luego, si no atendi\xf3, se lo manda al final de la cola."]})]}),c&&Object(i.jsxs)(i.Fragment,{children:[s(x.b.ANSWERING_MACHINE)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-primary",children:"contestador"}),"?"]}),Object(i.jsxs)("p",{children:["Registra la \xfaltima vez que se le dej\xf3 un mensaje en el contestador al amo de casa.\xa0",a.answeringMachineMaxAttemps>1&&Object(i.jsxs)("span",{children:["Adem\xe1s, congela el n\xfamero durante"," ",a.answeringMachinePostponedDays," d\xedas para darle un m\xe1ximo de"," ",a.answeringMachineMaxAttemps,' oportunidades. Estas oportunidades se computan junto a las que ya se le dio con el bot\xf3n "no en casa" si ha sido el caso.']})]})]}),s(x.b.POSTPONE)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de ",Object(i.jsx)("span",{className:"text-info",children:"aplazar"}),"?"]}),Object(i.jsxs)("p",{children:["Congela el n\xfamero para que se lo llame dentro de"," ",a.postponedButtonDays," ",a.postponedButtonDays>1?"d\xedas":"d\xeda","."]})]}),s(x.b.IGNORE)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-secondary",children:"ignorar"}),"?"]}),Object(i.jsx)("p",{children:"Manda el n\xfamero directamente al final de la cola."})]})]}),s(x.b.NO_CALL)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-warning",children:"no visitar"}),"?"]}),Object(i.jsx)("p",{children:"Quita el n\xfamero de la cola. No se lo borra pero tampoco se lo volver\xe1 a llamar."})]}),s(x.b.NON_EXISTENT)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-secondary",children:"no existe"}),"?"]}),Object(i.jsxs)("p",{children:["Suspende el n\xfamero durante ",a.nonExistentPostponedDays," ","d\xedas. Luego vuelve a la cola porque existe la posibilidad de que se haya reactivado."]})]}),Object(i.jsx)("p",{className:"text-center",children:"Nota: en ning\xfan caso se borran los n\xfameros. Si correspondiera (por ej. por estar fuera del territorio), por favor, comunicarse con el siervo de territorios."}),Object(i.jsx)($,{className:"btn btn-secondary",onClick:n,children:"Volver"})]})},Z=O.c.div(K(),(function(e){return e.theme.navbarHeight})),$=O.c.button(V()),ee=t(101),ne=t(51);function te(){var e=Object(m.a)(["\n  position: absolute;\n  left: 0px;\n  background: rgb(34, 34, 34);\n  width: 100%;\n  border: 1px solid rgb(102, 102, 102);\n  padding: "," 10px;\n  display: flex;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n  transition: padding 0.3s, height 0.3s;\n"]);return te=function(){return e},e}var ce=function(e){var n,t,c=e.currentPhoneId,a=e.onEditRequest,s=e.PhoneStorage,r=Object(l.useState)(null),d=Object(o.a)(r,2),b=d[0],u=d[1],m=Object(j.l)(),O=m.isModalOpen,p=m.data,f=m.askEditConfirmation,N=m.toggleModal,v=m.reset,g=Object(h.b)(),E=g.configurations.hiddenButtons,w=g.currentTerritory.campaignMode,C=function(e){return!E.split(",").includes(e.toString())&&!(w&&[x.b.UNANSWERED,x.b.ANSWERED,x.b.NON_EXISTENT,x.b.NO_CALL,x.b.ANSWERING_MACHINE,x.b.IGNORE].includes(e))&&!(!w&&[x.a.RUSHED].includes(e))},S=null!==(n=null===p||void 0===p?void 0:p.feedbackToConfirm)&&void 0!==n?n:null,A=null!==(t=null===p||void 0===p?void 0:p.storagePhoneToConfirm)&&void 0!==t?t:null,T=function(e,n){return f({storagePhoneToConfirm:n,feedbackToConfirm:e})},M=s.getAll().reverse().map((function(e,n){if(e.id===c)return null;var t=Object(ne.a)(e.savedOn),a=null!==e.status?k.c[e.status]:"",s=t||null!==e.status?null!==e.status?k.d[e.status]:"Sin respuesta":"Asignado a otro publicador",r=n===b;return Object(i.jsxs)("tr",{style:{position:"relative"},children:[Object(i.jsx)("td",{children:e.phone}),Object(i.jsx)("td",{children:Object(i.jsx)("span",{className:"text-".concat(a),children:s})}),Object(i.jsxs)("td",{children:[t&&Object(i.jsx)(y.a,{color:"secondary",onClick:function(){return function(e){return u(b!==e?e:null)}(n)},children:"Editar"}),Object(i.jsxs)(ae,{isOpen:r,children:[e.status!==x.a.RUSHED&&C(x.a.RUSHED)&&Object(i.jsx)("button",{className:"btn btn-success btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.a.RUSHED,e)},children:"Completado"}),e.status!==x.b.ANSWERED&&C(x.b.ANSWERED)&&Object(i.jsx)("button",{className:"btn btn-success btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.ANSWERED,e)},children:"Atendi\xf3"}),e.status!==x.b.UNANSWERED&&C(x.b.UNANSWERED)&&Object(i.jsx)("button",{className:"btn btn-danger btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.UNANSWERED,e)},children:"No en casa"}),e.status!==x.b.ANSWERING_MACHINE&&C(x.b.ANSWERING_MACHINE)&&Object(i.jsx)("button",{className:"btn btn-primary btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.ANSWERING_MACHINE,e)},children:"Contestador"}),e.status!==x.b.POSTPONE&&C(x.b.POSTPONE)&&Object(i.jsx)("button",{className:"btn btn-info btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.POSTPONE,e)},children:"Aplazar"}),e.status!==x.b.IGNORE&&C(x.b.IGNORE)&&Object(i.jsx)("button",{className:"btn btn-secondary btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.IGNORE,e)},children:"Ignorar"}),e.status!==x.b.NO_CALL&&C(x.b.NO_CALL)&&Object(i.jsx)("button",{className:"btn btn-warning btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.NO_CALL,e)},children:"No visitar"}),e.status!==x.b.NON_EXISTENT&&C(x.b.NON_EXISTENT)&&Object(i.jsx)("button",{className:"btn btn-dark btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.NON_EXISTENT,e)},children:"No existe"})]})]})]},e.id)}));return M.filter((function(e){return!!e})).length>0?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h6",{className:"container mb-3",children:"N\xfameros anteriores en este dispositivo:"}),Object(i.jsxs)(ee.a,{responsive:!0,className:"text-center",children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Tel\xe9fono"}),Object(i.jsx)("th",{children:"Estado"}),Object(i.jsx)("th",{children:"Acciones"})]})}),Object(i.jsx)("tbody",{children:M})]}),null!==S&&Object(i.jsx)(j.c,{isOpen:O,toggleModal:N,onConfirm:function(){A&&"number"===typeof S&&(a(A,S),u(null),v())},title:"\xbfSeguro?",buttonColor:k.c[S],confirmationLabel:k.d[S]})]}):null},ae=Object(O.c)(N.a)(te(),(function(e){return e.isOpen?"20px":"0"})),se=t(10),re=t(25),oe=function(){var e=Object(l.useState)(null),n=Object(o.a)(e,2),t=n[0],c=n[1],d=Object(l.useState)(!0),m=Object(o.a)(d,2),O=m[0],x=m[1],p=Object(l.useState)(!1),f=Object(o.a)(p,2),N=f[0],v=f[1],g=Object(l.useState)(""),E=Object(o.a)(g,2),k=E[0],y=E[1],w=Object(h.d)(),C=Object(h.b)(),S=C.advancedModeEnabled,A=C.currentTerritory,T=Object(j.k)().AlertManager,M=Object(h.c)(),R=new URLSearchParams(window.location.search).get("id"),D=Object(l.useCallback)(Object(r.a)(a.a.mark((function e(){var n,t,r,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,x(!0),v(!1),e.next=5,M().get(R?{path:"next",params:{id:R}}:"next");case 5:if(n=e.sent,t=Object(o.a)(n,2),r=t[0],i=t[1],!r){e.next=11;break}throw r;case 11:c(i.phone),y(i.phone.comments),T.show("new-phone-received",{timeout:2e3}),w.add({id:i.phone.id,status:null,phone:i.phone.phone,savedOn:Date.now(),restore:Object(s.a)(Object(s.a)({},i.original),{},{lastStatus:null})}),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(0),console.log({e:e.t0}),v(!0);case 21:return e.prev=21,x(!1),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[0,17,21,24]])}))),[T,w,M,R]);Object(l.useEffect)((function(){A.active&&D()}),[D,A]);var I=function(){var e=Object(r.a)(a.a.mark((function e(n){var c,s,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,x(!0),e.next=6,M().put("update_phone",{id:t.id,answered:n,comments:k});case 6:if(c=e.sent,s=Object(o.a)(c,1),!(r=s[0])){e.next=11;break}throw r;case 11:D(),w.update(t.id,n),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(2),T.hideAll(),T.show("feedback-failed"),x(!1);case 20:case"end":return e.stop()}}),e,null,[[2,15]])})));return function(n){return e.apply(this,arguments)}}(),P=function(){var e=Object(r.a)(a.a.mark((function e(n,t){var c,s,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M().put("update_phone",{id:n.id,answered:t,restore:n.restore});case 3:if(c=e.sent,s=Object(o.a)(c,1),!(r=s[0])){e.next=8;break}throw r;case 8:w.update(n.id,t),T.show("edit-success"),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),T.hideAll(),T.show("feedback-failed");case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t){return e.apply(this,arguments)}}(),W=Object(re.e)(I,5e3),L=Object(re.e)(P,5e3),_=Object(se.g)(),G=function(){return _.push("/".concat(A.name,"/telefonica/help"))},H=function(){return _.goBack()},U=function(e){return y(e)};if(N)return Object(i.jsx)(j.d,{message:"No hay m\xe1s n\xfameros disponibles por el d\xeda de hoy"});if(!A.active)return Object(i.jsx)(j.d,{message:"Este territorio est\xe1 desactivado."});if(O||!t)return Object(i.jsx)(j.g,{fulfill:!0,container:!0});return Object(i.jsx)(u.a,{children:Object(i.jsxs)(se.d,{children:[Object(i.jsx)(se.b,{path:"/:territory/telefonica",exact:!0,render:function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(b.a,{children:Object(i.jsxs)("title",{children:["ESM"," Telef\xf3nica"]})}),Object(i.jsx)(j.a,{name:"new-phone-received",position:"top",variant:"success",children:Object(i.jsx)("div",{className:"text-center",children:"\u2728 \xa1Nuevo n\xfamero recibido! \u2728\ud83c\udf89"})}),Object(i.jsx)(j.a,{name:"feedback-failed",position:"top",variant:"failure",children:Object(i.jsx)("div",{className:"text-center",children:"No se pudo enviar su feedback \ud83d\ude22"})}),Object(i.jsx)(j.a,{name:"edit-success",position:"bottom",variant:"success",children:Object(i.jsx)("div",{className:"text-center",children:"N\xfamero actualizado."})}),Object(i.jsx)(Q,{phone:t,comments:k,handleComments:U,openHelpSection:G,handlePhoneFeedback:W,selfAssigned:!!R,isFromAnotherTerritory:t.territoryId!==A.id}),S&&Object(i.jsx)(ce,{PhoneStorage:w,currentPhoneId:t.id,onEditRequest:L})]})}}),Object(i.jsx)(se.b,{path:"/:territory/telefonica/help",exact:!0,component:function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(b.a,{children:Object(i.jsxs)("title",{children:["ESM"," Telef\xf3nica Ayuda"]})}),Object(i.jsx)(Y,{close:H})]})}})]})})}},97:function(e,n,t){"use strict";var c=t(4),a=t(8),s=t(0),r=t.n(s),o=t(1),i=t.n(o),l=t(7),d=t.n(l),b=t(3),u={tag:b.o,fluid:i.a.bool,className:i.a.string,cssModule:i.a.object},j=function(e){var n=e.className,t=e.cssModule,s=e.tag,o=e.fluid,i=Object(a.a)(e,["className","cssModule","tag","fluid"]),l=Object(b.k)(d()(n,"jumbotron",!!o&&"jumbotron-fluid"),t);return r.a.createElement(s,Object(c.a)({},i,{className:l}))};j.propTypes=u,j.defaultProps={tag:"div"},n.a=j}}]);
//# sourceMappingURL=11.0b83ea4d.chunk.js.map