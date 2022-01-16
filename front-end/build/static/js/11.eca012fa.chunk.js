(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[11],{102:function(e,n,t){"use strict";var c=t(4),a=t(8),s=t(0),r=t.n(s),o=t(1),l=t.n(o),i=t(6),d=t.n(i),b=t(3),u={className:l.a.string,cssModule:l.a.object,size:l.a.string,bordered:l.a.bool,borderless:l.a.bool,striped:l.a.bool,dark:l.a.bool,hover:l.a.bool,responsive:l.a.oneOfType([l.a.bool,l.a.string]),tag:b.o,responsiveTag:b.o,innerRef:l.a.oneOfType([l.a.func,l.a.string,l.a.object])},j=function(e){var n=e.className,t=e.cssModule,s=e.size,o=e.bordered,l=e.borderless,i=e.striped,u=e.dark,j=e.hover,h=e.responsive,O=e.tag,m=e.responsiveTag,x=e.innerRef,p=Object(a.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),f=Object(b.k)(d()(n,"table",!!s&&"table-"+s,!!o&&"table-bordered",!!l&&"table-borderless",!!i&&"table-striped",!!u&&"table-dark",!!j&&"table-hover"),t),N=r.a.createElement(O,Object(c.a)({},p,{ref:x,className:f}));if(h){var v=Object(b.k)(!0===h?"table-responsive":"table-responsive-"+h,t);return r.a.createElement(m,{className:v},N)}return N};j.propTypes=u,j.defaultProps={tag:"table",responsiveTag:"div"},n.a=j},112:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return be}));var c=t(14),a=t.n(c),s=t(16),r=t(18),o=t(7),l=t(2),i=t(0),d=t.n(i),b=t(47),u=t(82),j=t(21),h=t(5),O=t(12),m=t(9),x=t(24),p=function(e){var n=e.phone,t=Object(i.useState)(0),c=Object(o.a)(t,2),a=c[0],s=c[1];return Object(i.useEffect)((function(){s(0)}),[n]),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("a",{style:{textDecoration:"underline"},href:"tel:".concat(n),onClick:function(){return s(a+1)},children:n}),Array(a).fill(null).map((function(e){return Object(l.jsx)("span",{className:"d-block text-success",children:"\xa1Tocado!"})}))]})},f=t(19),N=t(84);function v(){var e=Object(h.a)(["\n  display: flex;\n  justify-content: space-between;\n  font-weight: 500;\n  color: ",";\n\n  span {\n    font-weight: 800;\n  }\n"]);return v=function(){return e},e}function g(){var e=Object(h.a)(["\n  display: flex;\n  justify-content: space-between;\n  padding-top: 0.5em;\n"]);return g=function(){return e},e}function E(){var e=Object(h.a)([""]);return E=function(){return e},e}var k=function(e){var n=e.phoneId,t=e.initialNoCallOnWeekends,c=e.initiallyOpen,s=e.onNoCall,d=Object(i.useState)(c),b=Object(o.a)(d,2),u=b[0],h=b[1],m=Object(i.useState)(t),x=Object(o.a)(m,2),p=x[0],v=x[1],g=Object(j.k)().AlertManager,E=Object(O.d)(),k=function(){var e=Object(r.a)(a.a.mark((function e(t,c){var s,r,l,i,d;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(){},r=c,"callOnWeekends"===t&&(s=function(){return v(p)},v(c),r=!c),e.prev=3,e.next=6,E().put("phones/".concat(n,"/options"),Object(f.a)({},t,r));case 6:if(l=e.sent,i=Object(o.a)(l,1),!(d=i[0])){e.next=11;break}throw d;case 11:g.show("phone-option-update-success"),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(3),s(),g.hideAll(),g.show("phone-option-update-failed");case 19:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(n,t){return e.apply(this,arguments)}}();return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(j.a,{name:"phone-option-update-success",position:"top",variant:"success",children:"Opci\xf3n de tel\xe9fono actualizada con \xe9xito."}),Object(l.jsx)(j.a,{name:"phone-option-update-failed",position:"bottom",variant:"failure",children:"No se pudo actualizar opci\xf3n de tel\xe9fono."}),Object(l.jsxs)(w,{children:[Object(l.jsxs)(y,{onClick:function(){return h(!u)},children:["Opciones de tel\xe9fono",Object(l.jsx)("span",{children:u?"-":"+"})]}),Object(l.jsxs)(N.a,{isOpen:u,children:[Object(l.jsxs)(C,{children:[Object(l.jsx)("span",{children:"No llamar los fin de semana:"}),Object(l.jsx)(j.h,{id:"no-weekends",checked:p,onChange:function(e){return k("callOnWeekends",e)}})]}),s&&Object(l.jsxs)(C,{children:[Object(l.jsx)("span",{children:"No visitar:"}),Object(l.jsx)(j.h,{id:"no-call",checked:!1,onChange:s})]})]})]})]})},w=m.c.div(E()),C=m.c.div(g()),y=m.c.div(v(),(function(e){var n=e.theme;return n.text.colors[n.darkMode?"lightgreen":"green"]})),S=t(11),A=t(87),M=t(4),T=t(8),R=t(28),D=t(1),I=t.n(D),P=t(6),W=t.n(P),L=t(3),_=t(29);function G(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);n&&(c=c.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,c)}return t}function H(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?G(Object(t),!0).forEach((function(n){Object(R.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):G(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var U={children:I.a.node,className:I.a.string,closeClassName:I.a.string,closeAriaLabel:I.a.string,cssModule:I.a.object,color:I.a.string,fade:I.a.bool,isOpen:I.a.bool,toggle:I.a.func,tag:L.o,transition:I.a.shape(_.a.propTypes),innerRef:I.a.oneOfType([I.a.object,I.a.string,I.a.func])},F={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:H(H({},_.a.defaultProps),{},{unmountOnExit:!0})};function q(e){var n=e.className,t=e.closeClassName,c=e.closeAriaLabel,a=e.cssModule,s=e.tag,r=e.color,o=e.isOpen,l=e.toggle,i=e.children,b=e.transition,u=e.fade,j=e.innerRef,h=Object(T.a)(e,["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"]),O=Object(L.k)(W()(n,"alert","alert-"+r,{"alert-dismissible":l}),a),m=Object(L.k)(W()("close",t),a),x=H(H(H({},_.a.defaultProps),b),{},{baseClass:u?b.baseClass:"",timeout:u?b.timeout:0});return d.a.createElement(_.a,Object(M.a)({},h,x,{tag:s,className:O,in:o,role:"alert",innerRef:j}),l?d.a.createElement("button",{type:"button",className:m,"aria-label":c,onClick:l},d.a.createElement("span",{"aria-hidden":"true"},"\xd7")):null,i)}q.propTypes=U,q.defaultProps=F;var z=q,Q=t(98);function X(){var e=Object(h.a)(["\n  margin-bottom: 0;\n  border: none;\n  color: ",";\n  text-decoration: underline;\n  background: none;\n  margin: auto;\n"]);return X=function(){return e},e}function B(){var e=Object(h.a)(["\n  border-top: 1px solid\n    ",";\n  border-bottom: 1px solid\n    ",";\n  padding: 10px 0;\n  margin-top: 2em;\n  display: flex;\n\n  > div {\n    width: 100%;\n  }\n"]);return B=function(){return e},e}function J(){var e=Object(h.a)(["\n  width: 100%;\n  border-top: none;\n  border-right: none;\n  border-left: none;\n  border-image: initial;\n  border-bottom: 2px solid ",";\n  outline: none;\n  transition: border-bottom-color 0.25s;\n  margin-bottom: 0.5em;\n  border-radius: 5px;\n  padding: 0 10px;\n\n  :focus {\n    border-bottom-color: ",";\n  }\n"]);return J=function(){return e},e}var V=function(e){var n,t,c=e.phone,a=e.comments,s=e.handleComments,r=e.openHelpSection,o=e.handlePhoneFeedback,i=e.selfAssigned,d=e.isFromAnotherTerritory,b=Object(O.c)(),h=b.advancedModeEnabled,m=b.configurations,f=b.currentTerritory,N=Object(O.b)().buttonColors,v=m.hiddenButtons,g=f.campaignMode,E=function(e){return!v.split(",").includes(e.toString())},w=Object(j.l)(),C=w.isModalOpen,y=w.data,M=w.askEditConfirmation,T=w.toggleModal,R=w.reset,D=function(e){return function(){h?M(e):o(e)}},I=D(x.b.ANSWERED),P=D(x.b.UNANSWERED),W=D(x.b.NON_EXISTENT),L=D(x.b.NO_CALL),_=D(x.b.ANSWERING_MACHINE),G=D(x.b.POSTPONE),H=D(x.b.IGNORE),U=Object(l.jsx)("div",{className:"table-responsive d-none d-sm-block",children:Object(l.jsxs)("table",{className:"table table-bordered",children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Tel\xe9fono"}),Object(l.jsx)("th",{children:"Otros datos"}),c.comments?Object(l.jsx)("th",{children:"Comentarios"}):null,Object(l.jsx)("th",{children:"\xdaltima fecha que atendi\xf3"}),Object(l.jsx)("th",{children:"\xdaltima fecha que se lo llam\xf3"})]})}),Object(l.jsx)("tbody",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:Object(l.jsx)(p,{phone:c.phone})}),Object(l.jsx)("td",{children:c.info}),c.comments?Object(l.jsx)("td",{children:c.comments}):null,Object(l.jsx)("td",{children:null!==(n=c.answeredOn)&&void 0!==n?n:"Nunca"}),Object(l.jsx)("td",{children:c.unansweredDate?c.unansweredDate:c.fulfilledOn?Object(l.jsxs)(l.Fragment,{children:["jue, 25 jun 2020"===c.fulfilledOn&&"Antes del ",c.fulfilledOn]}):"Nunca"})]})})]})}),F=Object(l.jsxs)("div",{className:"d-block d-sm-none text-center",children:[Object(l.jsx)("span",{style:{fontWeight:500},children:"Tel\xe9fono:"}),Object(l.jsx)("div",{children:Object(l.jsx)(p,{phone:c.phone})}),Object(l.jsx)("br",{}),c.info&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("span",{style:{fontWeight:500},children:"Otros datos:"}),Object(l.jsx)("div",{children:c.info}),Object(l.jsx)("br",{})]}),c.comments&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("span",{style:{fontWeight:500},children:"Comentarios:"}),Object(l.jsx)("div",{children:c.comments}),Object(l.jsx)("br",{})]}),Object(l.jsx)("span",{style:{fontWeight:500},children:"\xdaltima fecha que atendi\xf3:"}),Object(l.jsx)("div",{children:null!==(t=c.answeredOn)&&void 0!==t?t:"Nunca"}),Object(l.jsx)("br",{}),Object(l.jsx)("span",{style:{fontWeight:500},children:"\xdaltima fecha que se lo llam\xf3:"}),Object(l.jsx)("div",{children:c.unansweredDate?c.unansweredDate:c.fulfilledOn?Object(l.jsxs)(l.Fragment,{children:["jue, 25 jun 2020"===c.fulfilledOn&&"Antes del ",c.fulfilledOn]}):"Nunca"})]}),q=Object(l.jsx)(Y,{children:Object(l.jsx)(Z,{onClick:r,children:"\xbfQu\xe9 hace cada bot\xf3n?"})}),X=Object(l.jsx)("div",{className:"row my-4",children:Object(l.jsxs)("div",{className:"col-12",children:[Object(l.jsx)("span",{className:"text-secondary d-inline-block mb-2",children:"Comentarios (opcional):"}),Object(l.jsx)(K,{placeholder:"Su comentario ac\xe1...",type:"text",value:a,onChange:function(e){return s(e.target.value)}}),c.commentedOn&&Object(l.jsxs)("span",{className:"input-helper text-secondary",children:["Comentado el:"," ",Object(l.jsx)("span",{className:"text-success",children:c.commentedOn})]}),c.answeringMachineDate&&Object(l.jsxs)("span",{className:"d-block input-helper text-secondary",children:["\xdaltimo mensaje en el contestador:"," ",Object(l.jsx)("span",{className:"text-success",children:c.answeringMachineDate})]}),!c.commentedOn&&!c.answeringMachineDate&&Object(l.jsx)("span",{className:"input-helper text-secondary",children:"Ej.: lugar de trabajo"})]})}),B=g?Object(l.jsx)("div",{className:"my-4",children:Object(l.jsx)(A.a,{color:N.rushed,block:!0,onClick:function(){return o(x.a.RUSHED)},children:"Siguiente"})}):h?Object(l.jsxs)("div",{className:"my-4 row d-flex justify-content-center",children:[E(x.b.ANSWERED)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)(A.a,{color:N.answered,className:"btn-lg w-100 mx-auto mx-md-0 d-block",onClick:I,children:"Atendi\xf3"})}),E(x.b.UNANSWERED)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)(A.a,{color:N.unanswered,className:"btn-lg w-100 mx-auto mx-md-0 d-block",onClick:P,children:"No en casa"})}),E(x.b.ANSWERING_MACHINE)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)(A.a,{color:N.answeringMachine,className:"btn-lg w-100 mx-auto mx-md-0 d-block",onClick:_,children:"Contestador"})}),E(x.b.POSTPONE)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)(A.a,{color:N.postponed,className:"btn-lg w-100 mx-auto mx-md-0 d-block",onClick:G,children:"Aplazar"})}),E(x.b.IGNORE)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)(A.a,{color:N.ignored,className:"btn-lg w-100 mx-auto mx-md-0 d-block",onClick:H,children:"Ignorar"})}),E(x.b.NO_CALL)&&Object(l.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(l.jsx)(A.a,{color:N.noCall,className:"btn-lg w-100 mx-auto mx-md-0 d-block",onClick:L,children:"No visitar"})}),E(x.b.NON_EXISTENT)&&Object(l.jsx)("div",{className:"col-6 col-md-auto",children:Object(l.jsx)(A.a,{color:N.nonExistent,className:"btn-lg w-100 mx-auto mx-md-0 d-block",onClick:W,children:"No existe"})})]}):Object(l.jsxs)("div",{className:"my-4 row d-flex justify-content-center",children:[E(x.b.ANSWERED)&&Object(l.jsx)("div",{className:"col-6 mb-3 col-md-auto",children:Object(l.jsx)(A.a,{color:N.answered,className:"btn-lg mx-auto mx-md-0 d-block w-100",onClick:I,children:"Atendi\xf3"})}),E(x.b.UNANSWERED)&&Object(l.jsx)("div",{className:"col-6 mb-3 col-md-auto",children:Object(l.jsx)(A.a,{color:N.unanswered,className:"btn-lg mx-auto mx-md-0 d-block w-100",onClick:P,children:"No en casa"})}),E(x.b.NO_CALL)&&Object(l.jsx)("div",{className:"col-6 col-md-auto",children:Object(l.jsx)(A.a,{color:N.noCall,className:"btn-lg mx-auto mx-md-0 d-block w-100",onClick:L,children:"No visitar"})}),E(x.b.NON_EXISTENT)&&Object(l.jsx)("div",{className:"col-6 col-md-auto",children:Object(l.jsx)(A.a,{color:N.nonExistent,className:"btn-lg mx-auto mx-md-0 d-block w-100",onClick:W,children:"No existe"})})]}),J={0:N.unanswered,1:N.answered,2:N.nonExistent,3:N.noCall,4:N.answeringMachine,5:N.postponed,6:N.ignored,7:N.rushed};return Object(l.jsxs)(u.a,{className:"py-4",children:[i&&Object(l.jsx)(z,{color:"warning",children:"Usando n\xfamero autoasignado"}),d&&Object(l.jsx)(z,{color:"danger",children:"\xa1El n\xfamero es de otro territorio!"}),U,F,X,!!h&&Object(l.jsx)(Y,{children:Object(l.jsx)(k,{phoneId:c.id,initialNoCallOnWeekends:c.noWeekends,initiallyOpen:!1,onNoCall:!!g&&L})}),!!g&&Object(l.jsx)(Q.a,{fluid:!0,className:"my-2",children:Object(l.jsxs)(u.a,{children:[Object(l.jsx)("h6",{children:"\xa1Estamos en campa\xf1a!"}),Object(l.jsx)("small",{children:'Durante la campa\xf1a, solo habr\xe1 un bot\xf3n de "siguiente".'})]})}),B,h&&!g&&q,null!==y&&Object(l.jsx)(j.c,{isOpen:C,toggleModal:T,onConfirm:function(){null!==y&&(o(y),R())},title:"\xbfSeguro?",buttonColor:J[y],confirmationLabel:S.c[y]})]})},K=m.c.input(J(),(function(e){return e.theme.text.colors.secondary}),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.black})),Y=m.c.div(B(),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.secondary}),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.secondary})),Z=m.c.button(X(),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:"#555"}));function $(){var e=Object(h.a)(["\n  width: 100%;\n"]);return $=function(){return e},e}function ee(){var e=Object(h.a)(["\n  display: flex;\n  padding: 20px 0;\n  min-height: calc(100vh - ","px);\n  justify-content: space-evenly;\n  flex-direction: column;\n"]);return ee=function(){return e},e}var ne=function(e){var n=e.close,t=Object(O.c)(),c=t.advancedModeEnabled,a=t.configurations,s=Object(O.b)().buttonColors,r=function(e){return!a.hiddenButtons.split(",").includes(e.toString())};return Object(l.jsxs)(te,{children:[r(x.b.ANSWERED)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-".concat(s.answered),children:"atendi\xf3"}),"?"]}),Object(l.jsx)("p",{children:"Manda el n\xfamero al final de la cola y registra la fecha en que se atendi\xf3."})]}),r(x.b.UNANSWERED)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-".concat(s.unanswered),children:"no en casa"}),"?"]}),Object(l.jsxs)("p",{children:["Guarda el n\xfamero para llamarlo de vuelta ma\xf1ana, hasta un m\xe1ximo de"," ",a.unansweredMaxAttemps," intentos. Luego, si no atendi\xf3, se lo manda al final de la cola."]})]}),c&&Object(l.jsxs)(l.Fragment,{children:[r(x.b.ANSWERING_MACHINE)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-".concat(s.answeringMachine),children:"contestador"}),"?"]}),Object(l.jsxs)("p",{children:["Registra la \xfaltima vez que se le dej\xf3 un mensaje en el contestador al amo de casa.\xa0",a.answeringMachineMaxAttemps>1&&Object(l.jsxs)("span",{children:["Adem\xe1s, congela el n\xfamero durante"," ",a.answeringMachinePostponedDays," d\xedas para darle un m\xe1ximo de"," ",a.answeringMachineMaxAttemps,' oportunidades. Estas oportunidades se computan junto a las que ya se le dio con el bot\xf3n "no en casa" si ha sido el caso.']})]})]}),r(x.b.POSTPONE)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-".concat(s.postponed),children:"aplazar"}),"?"]}),Object(l.jsxs)("p",{children:["Congela el n\xfamero para que se lo llame dentro de"," ",a.postponedButtonDays," ",a.postponedButtonDays>1?"d\xedas":"d\xeda","."]})]}),r(x.b.IGNORE)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-".concat(s.ignored),children:"ignorar"}),"?"]}),Object(l.jsx)("p",{children:"Manda el n\xfamero directamente al final de la cola."})]})]}),r(x.b.NO_CALL)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-".concat(s.noCall),children:"no visitar"}),"?"]}),Object(l.jsx)("p",{children:"Quita el n\xfamero de la cola. No se lo borra pero tampoco se lo volver\xe1 a llamar."})]}),r(x.b.NON_EXISTENT)&&Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(l.jsx)("span",{className:"text-".concat(s.nonExistent),children:"no existe"}),"?"]}),Object(l.jsxs)("p",{children:["Suspende el n\xfamero durante ",a.nonExistentPostponedDays," ","d\xedas. Luego vuelve a la cola porque existe la posibilidad de que se haya reactivado."]})]}),Object(l.jsx)("p",{className:"text-center",children:"Nota: en ning\xfan caso se borran los n\xfameros. Si correspondiera (por ej. por estar fuera del territorio), por favor, comunicarse con el siervo de territorios."}),Object(l.jsx)(ce,{className:"btn btn-secondary",onClick:n,children:"Volver"})]})},te=m.c.div(ee(),(function(e){return e.theme.navbarHeight})),ce=m.c.button($()),ae=t(102),se=t(52);function re(){var e=Object(h.a)(["\n  position: absolute;\n  left: 0px;\n  background: rgb(34, 34, 34);\n  width: 100%;\n  border: 1px solid rgb(102, 102, 102);\n  padding: "," 10px;\n  display: flex;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n  transition: padding 0.3s, height 0.3s;\n  z-index: 1;\n"]);return re=function(){return e},e}var oe=function(e){var n,t,c=e.currentPhoneId,a=e.onEditRequest,s=e.PhoneStorage,r=Object(i.useState)(null),d=Object(o.a)(r,2),b=d[0],u=d[1],h=Object(j.l)(),m=h.isModalOpen,p=h.data,f=h.askEditConfirmation,N=h.toggleModal,v=h.reset,g=Object(O.c)(),E=g.configurations.hiddenButtons,k=g.currentTerritory.campaignMode,w=Object(O.b)().buttonColors,C=function(e){return!E.split(",").includes(e.toString())&&!(k&&[x.b.UNANSWERED,x.b.ANSWERED,x.b.NON_EXISTENT,x.b.NO_CALL,x.b.ANSWERING_MACHINE,x.b.IGNORE].includes(e))&&!(!k&&[x.a.RUSHED].includes(e))},y=null!==(n=null===p||void 0===p?void 0:p.feedbackToConfirm)&&void 0!==n?n:null,M=null!==(t=null===p||void 0===p?void 0:p.storagePhoneToConfirm)&&void 0!==t?t:null,T=function(e,n){return f({storagePhoneToConfirm:n,feedbackToConfirm:e})},R={0:w.unanswered,1:w.answered,2:w.nonExistent,3:w.noCall,4:w.answeringMachine,5:w.postponed,6:w.ignored,7:w.rushed},D=s.getAll().reverse().map((function(e,n){if(e.id===c)return null;var t=Object(se.a)(e.savedOn),a=null!==e.status?R[e.status]:"",s=t||null!==e.status?null!==e.status?S.c[e.status]:"Sin respuesta":"Asignado a otro publicador",r=n===b;return Object(l.jsxs)("tr",{style:{position:"relative"},children:[Object(l.jsx)("td",{children:e.phone}),Object(l.jsx)("td",{children:Object(l.jsx)("span",{className:"text-".concat(a),children:s})}),Object(l.jsxs)("td",{children:[t&&Object(l.jsx)(A.a,{color:"secondary",onClick:function(){return function(e){return u(b!==e?e:null)}(n)},children:"Editar"}),Object(l.jsxs)(le,{isOpen:r,children:[e.status!==x.a.RUSHED&&C(x.a.RUSHED)&&Object(l.jsx)(A.a,{color:w.rushed,className:"btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.a.RUSHED,e)},children:"Completado"}),e.status!==x.b.ANSWERED&&C(x.b.ANSWERED)&&Object(l.jsx)(A.a,{color:w.answered,className:"btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.ANSWERED,e)},children:"Atendi\xf3"}),e.status!==x.b.UNANSWERED&&C(x.b.UNANSWERED)&&Object(l.jsx)(A.a,{color:w.unanswered,className:"btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.UNANSWERED,e)},children:"No en casa"}),e.status!==x.b.ANSWERING_MACHINE&&C(x.b.ANSWERING_MACHINE)&&Object(l.jsx)(A.a,{color:w.answeringMachine,className:"btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.ANSWERING_MACHINE,e)},children:"Contestador"}),e.status!==x.b.POSTPONE&&C(x.b.POSTPONE)&&Object(l.jsx)(A.a,{color:w.postponed,className:"btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.POSTPONE,e)},children:"Aplazar"}),e.status!==x.b.IGNORE&&C(x.b.IGNORE)&&Object(l.jsx)(A.a,{color:w.ignored,className:"btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.IGNORE,e)},children:"Ignorar"}),e.status!==x.b.NO_CALL&&C(x.b.NO_CALL)&&Object(l.jsx)(A.a,{color:w.noCall,className:"btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.NO_CALL,e)},children:"No visitar"}),e.status!==x.b.NON_EXISTENT&&C(x.b.NON_EXISTENT)&&Object(l.jsx)(A.a,{color:w.nonExistent,className:"btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.NON_EXISTENT,e)},children:"No existe"})]})]})]},e.id)}));return D.filter((function(e){return!!e})).length>0?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h6",{className:"container mb-3",children:"N\xfameros anteriores en este dispositivo:"}),Object(l.jsxs)(ae.a,{responsive:!0,className:"text-center",children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Tel\xe9fono"}),Object(l.jsx)("th",{children:"Estado"}),Object(l.jsx)("th",{children:"Acciones"})]})}),Object(l.jsx)("tbody",{children:D})]}),null!==y&&Object(l.jsx)(j.c,{isOpen:m,toggleModal:N,onConfirm:function(){M&&"number"===typeof y&&(a(M,y),u(null),v())},title:"\xbfSeguro?",buttonColor:R[y],confirmationLabel:S.c[y]})]}):null},le=Object(m.c)(N.a)(re(),(function(e){return e.isOpen?"20px":"0"})),ie=t(10),de=t(27),be=function(){var e=Object(i.useState)(null),n=Object(o.a)(e,2),t=n[0],c=n[1],d=Object(i.useState)(!0),h=Object(o.a)(d,2),m=h[0],x=h[1],p=Object(i.useState)(!1),f=Object(o.a)(p,2),N=f[0],v=f[1],g=Object(i.useState)(""),E=Object(o.a)(g,2),k=E[0],w=E[1],C=Object(O.e)(),y=Object(O.c)(),S=y.CONG_INITIALS,A=y.advancedModeEnabled,M=y.currentTerritory,T=Object(j.k)().AlertManager,R=Object(O.d)(),D=new URLSearchParams(window.location.search).get("id"),I=Object(i.useCallback)(Object(r.a)(a.a.mark((function e(){var n,t,r,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,x(!0),v(!1),e.next=5,R().get(D?{path:"next",params:{id:D}}:"next");case 5:if(n=e.sent,t=Object(o.a)(n,2),r=t[0],l=t[1],!r){e.next=11;break}throw r;case 11:c(l.phone),w(l.phone.comments),T.show("new-phone-received",{timeout:2e3}),C.add({id:l.phone.id,status:null,phone:l.phone.phone,savedOn:Date.now(),restore:Object(s.a)(Object(s.a)({},l.original),{},{lastStatus:null})}),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(0),console.log({e:e.t0}),v(!0);case 21:return e.prev=21,x(!1),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[0,17,21,24]])}))),[T,C,R,D]);Object(i.useEffect)((function(){M.active&&I()}),[I,M]);var P=function(){var e=Object(r.a)(a.a.mark((function e(n){var c,s,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,x(!0),e.next=6,R().put("update_phone",{id:t.id,answered:n,comments:k});case 6:if(c=e.sent,s=Object(o.a)(c,1),!(r=s[0])){e.next=11;break}throw r;case 11:I(),C.update(t.id,n),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(2),T.hideAll(),T.show("feedback-failed"),x(!1);case 20:case"end":return e.stop()}}),e,null,[[2,15]])})));return function(n){return e.apply(this,arguments)}}(),W=function(){var e=Object(r.a)(a.a.mark((function e(n,t){var c,s,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R().put("update_phone",{id:n.id,answered:t,restore:n.restore});case 3:if(c=e.sent,s=Object(o.a)(c,1),!(r=s[0])){e.next=8;break}throw r;case 8:C.update(n.id,t),T.show("edit-success"),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),T.hideAll(),T.show("feedback-failed");case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t){return e.apply(this,arguments)}}(),L=Object(de.e)(P,5e3),_=Object(de.e)(W,5e3),G=Object(ie.g)(),H=function(){return G.push("/".concat(M.name,"/telefonica/help"))},U=function(){return G.goBack()},F=function(e){return w(e)};if(N)return Object(l.jsx)(j.d,{message:"No hay m\xe1s n\xfameros disponibles por el d\xeda de hoy"});if(!M.active)return Object(l.jsx)(j.d,{message:"Este territorio est\xe1 desactivado."});if(m||!t)return Object(l.jsx)(j.g,{fulfill:!0,container:!0});return Object(l.jsx)(u.a,{children:Object(l.jsxs)(ie.d,{children:[Object(l.jsx)(ie.b,{path:"/:territory/telefonica",exact:!0,render:function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(b.a,{children:Object(l.jsxs)("title",{children:[S," Telef\xf3nica"]})}),Object(l.jsx)(j.a,{name:"new-phone-received",position:"top",variant:"success",children:Object(l.jsx)("div",{className:"text-center",children:"\u2728 \xa1Nuevo n\xfamero recibido! \u2728\ud83c\udf89"})}),Object(l.jsx)(j.a,{name:"feedback-failed",position:"top",variant:"failure",children:Object(l.jsx)("div",{className:"text-center",children:"No se pudo enviar su feedback \ud83d\ude22"})}),Object(l.jsx)(j.a,{name:"edit-success",position:"bottom",variant:"success",children:Object(l.jsx)("div",{className:"text-center",children:"N\xfamero actualizado."})}),Object(l.jsx)(V,{phone:t,comments:k,handleComments:F,openHelpSection:H,handlePhoneFeedback:L,selfAssigned:!!D,isFromAnotherTerritory:t.territoryId!==M.id}),A&&Object(l.jsx)(oe,{PhoneStorage:C,currentPhoneId:t.id,onEditRequest:_})]})}}),Object(l.jsx)(ie.b,{path:"/:territory/telefonica/help",exact:!0,component:function(){return Object(l.jsx)(ne,{close:U})}})]})})}},98:function(e,n,t){"use strict";var c=t(4),a=t(8),s=t(0),r=t.n(s),o=t(1),l=t.n(o),i=t(6),d=t.n(i),b=t(3),u={tag:b.o,fluid:l.a.bool,className:l.a.string,cssModule:l.a.object},j=function(e){var n=e.className,t=e.cssModule,s=e.tag,o=e.fluid,l=Object(a.a)(e,["className","cssModule","tag","fluid"]),i=Object(b.k)(d()(n,"jumbotron",!!o&&"jumbotron-fluid"),t);return r.a.createElement(s,Object(c.a)({},l,{className:i}))};j.propTypes=u,j.defaultProps={tag:"div"},n.a=j}}]);
//# sourceMappingURL=11.eca012fa.chunk.js.map