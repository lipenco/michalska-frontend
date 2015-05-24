"use strict";function getVisibleMinutes(e,t){e=new Date(e||new Date),e=new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours());for(var n=[],i=e.getTime()+36e5;e.getTime()<i;)n.push(e),e=new Date(e.getTime()+60*t*1e3);return n}function getVisibleWeeks(e){e=new Date(e||new Date),e.setDate(1),e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),e.setDate(0===e.getDay()?-5:e.getDate()-(e.getDay()-1)),1===e.getDate()&&e.setDate(-6);for(var t=[];t.length<6;){for(var n=[],i=0;7>i;i++)n.push(new Date(e)),e.setDate(e.getDate()+1);t.push(n)}return t}function getVisibleYears(e){var t=[];e=new Date(e||new Date),e.setFullYear(e.getFullYear()-e.getFullYear()%10);for(var n=0;12>n;n++)t.push(new Date(e.getFullYear()+(n-1),0,1));return t}function getDaysOfWeek(e){e=new Date(e||new Date),e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),e.setDate(e.getDate()-(e.getDay()-1));for(var t=[],n=0;7>n;n++)t.push(new Date(e)),e.setDate(e.getDate()+1);return t}function getVisibleMonths(e){e=new Date(e||new Date);for(var t=e.getFullYear(),n=[],i=0;12>i;i++)n.push(new Date(t,i,1));return n}function getVisibleHours(e){e=new Date(e||new Date),e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0);for(var t=[],n=0;24>n;n++)t.push(e),e=new Date(e.getTime()+36e5);return t}var Module=angular.module("datePicker",[]);Module.constant("datePickerConfig",{template:"./app/lib/datepicker/templates/datepicker.html",view:"month",views:["year","month","date","hours","minutes"],step:5}),Module.directive("datePicker",["datePickerConfig",function(e){return{template:'<div ng-include="template"></div>',scope:{model:"=datePicker",after:"=?",before:"=?"},link:function(t,n,i){function o(){var e=t.view,n=t.date;switch(e){case"year":t.years=getVisibleYears(n);break;case"month":t.months=getVisibleMonths(n);break;case"date":t.weekdays=t.weekdays||getDaysOfWeek(),t.weeks=getVisibleWeeks(n);break;case"hours":t.hours=getVisibleHours(n);break;case"minutes":t.minutes=getVisibleMinutes(n,s)}}function a(){return"date"!==t.view?t.view:t.model?t.model.getMonth():null}t.date=new Date(t.model||new Date),t.views=e.views.concat(),t.view=i.view||e.view,t.now=new Date,t.template=i.template||e.template;var s=parseInt(i.step||e.step,10);t.views=t.views.slice(t.views.indexOf(i.maxView||"year"),t.views.indexOf(i.minView||"minutes")+1),(1===t.views.length||-1===t.views.indexOf(t.view))&&(t.view=t.views[0]),t.setView=function(e){-1!==t.views.indexOf(e)&&(t.view=e)},t.setDate=function(e){t.date=e;var n=t.views[t.views.indexOf(t.view)+1];if(!n||t.model){switch(t.model=new Date(t.model||e),t.view){case"minutes":t.model.setMinutes(e.getMinutes());case"hours":t.model.setHours(e.getHours());case"date":t.model.setDate(e.getDate());case"month":t.model.setMonth(e.getMonth());case"year":t.model.setFullYear(e.getFullYear())}t.$emit("setDate",t.model,t.view)}n&&t.setView(n)},t.$watch(a,o),t.next=function(e){var n=t.date;switch(e=e||1,t.view){case"year":case"month":n.setFullYear(n.getFullYear()+e);break;case"date":n.setMonth(n.getMonth()+e);break;case"hours":case"minutes":n.setHours(n.getHours()+e)}o()},t.prev=function(e){return t.next(-e||-1)},t.isAfter=function(e){return t.after?t.after.getTime()<=e.getTime():!1},t.isBefore=function(e){return t.before?t.before.getTime()>=e.getTime():!1},t.isSameMonth=function(e){return t.isSameYear(e)&&t.model.getMonth()===e.getMonth()},t.isSameYear=function(e){return t.model?t.model.getFullYear()===e.getFullYear():!1},t.isSameDay=function(e){return t.isSameMonth(e)&&t.model.getDate()===e.getDate()},t.isSameHour=function(e){return t.isSameDay(e)&&t.model.getHours()===e.getHours()},t.isSameMinutes=function(e){return t.isSameHour(e)&&t.model.getMinutes()===e.getMinutes()},t.isNow=function(e){var n=!0,i=t.now;switch(t.view){case"minutes":n&=~~(e.getMinutes()/s)===~~(i.getMinutes()/s);case"hours":n&=e.getHours()===i.getHours();case"date":n&=e.getDate()===i.getDate();case"month":n&=e.getMonth()===i.getMonth();case"year":n&=e.getFullYear()===i.getFullYear()}return n}}}}]),function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.Layzr=t()}(this,function(){function e(e){this._lastScroll=0,this._ticking=!1,this._optionsAttr=e.attr||"data-layzr",this._optionsAttrRetina=e.retinaAttr||"data-layzr-retina",this._optionsThreshold=e.threshold||0,this._optionsCallback=e.callback||null,this._retina=window.devicePixelRatio>1,this._imgAttr=this._retina?this._optionsAttrRetina:this._optionsAttr,this._images=document.getElementsByTagName("img"),this._create()}return e.prototype._requestScroll=function(){this._lastScroll=window.scrollY||window.pageYOffset,this._requestTick()},e.prototype._requestTick=function(){this._ticking||(requestAnimationFrame(this.update.bind(this)),this._ticking=!0)},e.prototype._create=function(){this._requestScroll(),window.addEventListener("scroll",this._requestScroll.bind(this),!1),window.addEventListener("resize",this._requestScroll.bind(this),!1)},e.prototype._destroy=function(){window.removeEventListener("scroll",this._requestScroll.bind(this),!1),window.removeEventListener("resize",this._requestScroll.bind(this),!1)},e.prototype._getOffset=function(e){var t=0;do isNaN(e.offsetTop)||(t+=e.offsetTop);while(e=e.offsetParent);return t},e.prototype._inViewport=function(e){var t=this._lastScroll,n=t+window.innerHeight,i=this._getOffset(e),o=i+e.offsetHeight,a=this._optionsThreshold/100*window.innerHeight;return o>=t-a&&n+a>=o},e.prototype.update=function(){for(var e=this._images.length,t=0;e>t;t++){var n=this._images[t];(n.hasAttribute(this._imgAttr)||n.hasAttribute(this._optionsAttr))&&this._inViewport(n)&&this.reveal(n)}this._ticking=!1},e.prototype.reveal=function(e){var t=e.getAttribute(this._imgAttr)||e.getAttribute(this._optionsAttr);e.removeAttribute(this._optionsAttr),e.removeAttribute(this._optionsAttrRetina),t&&(e.setAttribute("src",t),"function"==typeof this._optionsCallback&&this._optionsCallback.call(e))},e}),function(e){function t(e,t){e=new Date(e||new Date),e=new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours());for(var n=[],i=e.getTime()+36e5;e.getTime()<i;)n.push(e),e=new Date(e.getTime()+60*t*1e3);return n}function n(e){e=new Date(e||new Date),e.setDate(1),e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),e.setDate(0===e.getDay()?-5:e.getDate()-(e.getDay()-1)),1===e.getDate()&&e.setDate(-6);for(var t=[];t.length<6;){for(var n=[],i=0;7>i;i++)n.push(new Date(e)),e.setDate(e.getDate()+1);t.push(n)}return t}function i(e){var t=[];e=new Date(e||new Date),e.setFullYear(e.getFullYear()-e.getFullYear()%10);for(var n=0;12>n;n++)t.push(new Date(e.getFullYear()+(n-1),0,1));return t}function o(e){e=new Date(e||new Date),e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),e.setDate(e.getDate()-(e.getDay()-1));for(var t=[],n=0;7>n;n++)t.push(new Date(e)),e.setDate(e.getDate()+1);return t}function a(e){e=new Date(e||new Date);for(var t=e.getFullYear(),n=[],i=0;12>i;i++)n.push(new Date(t,i,1));return n}function s(e){e=new Date(e||new Date),e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0);for(var t=[],n=0;24>n;n++)t.push(e),e=new Date(e.getTime()+36e5);return t}var r=e.module("datePicker",[]);r.constant("datePickerConfig",{template:"templates/datepicker.html",view:"month",views:["year","month","date","hours","minutes"],step:5}),r.directive("datePicker",["datePickerConfig",function(e){return{template:'<div ng-include="template"></div>',scope:{model:"=datePicker",after:"=?",before:"=?"},link:function(r,l,c){function u(){var e=r.view,l=r.date;switch(e){case"year":r.years=i(l);break;case"month":r.months=a(l);break;case"date":r.weekdays=r.weekdays||o(),r.weeks=n(l);break;case"hours":r.hours=s(l);break;case"minutes":r.minutes=t(l,p)}}function d(){return"date"!==r.view?r.view:r.model?r.model.getMonth():null}r.date=new Date(r.model||new Date),r.views=e.views.concat(),r.view=c.view||e.view,r.now=new Date,r.template=c.template||e.template;var p=parseInt(c.step||e.step,10);r.views=r.views.slice(r.views.indexOf(c.maxView||"year"),r.views.indexOf(c.minView||"minutes")+1),(1===r.views.length||-1===r.views.indexOf(r.view))&&(r.view=r.views[0]),r.setView=function(e){-1!==r.views.indexOf(e)&&(r.view=e)},r.setDate=function(e){r.date=e;var t=r.views[r.views.indexOf(r.view)+1];if(!t||r.model){switch(r.model=new Date(r.model||e),r.view){case"minutes":r.model.setMinutes(e.getMinutes());case"hours":r.model.setHours(e.getHours());case"date":r.model.setDate(e.getDate());case"month":r.model.setMonth(e.getMonth());case"year":r.model.setFullYear(e.getFullYear())}r.$emit("setDate",r.model,r.view)}t&&r.setView(t)},r.$watch(d,u),r.next=function(e){var t=r.date;switch(e=e||1,r.view){case"year":case"month":t.setFullYear(t.getFullYear()+e);break;case"date":t.setMonth(t.getMonth()+e);break;case"hours":case"minutes":t.setHours(t.getHours()+e)}u()},r.prev=function(e){return r.next(-e||-1)},r.isAfter=function(e){return r.after?r.after.getTime()<=e.getTime():!1},r.isBefore=function(e){return r.before?r.before.getTime()>=e.getTime():!1},r.isSameMonth=function(e){return r.isSameYear(e)&&r.model.getMonth()===e.getMonth()},r.isSameYear=function(e){return r.model?r.model.getFullYear()===e.getFullYear():!1},r.isSameDay=function(e){return r.isSameMonth(e)&&r.model.getDate()===e.getDate()},r.isSameHour=function(e){return r.isSameDay(e)&&r.model.getHours()===e.getHours()},r.isSameMinutes=function(e){return r.isSameHour(e)&&r.model.getMinutes()===e.getMinutes()},r.isNow=function(e){var t=!0,n=r.now;switch(r.view){case"minutes":t&=~~(e.getMinutes()/p)===~~(n.getMinutes()/p);case"hours":t&=e.getHours()===n.getHours();case"date":t&=e.getDate()===n.getDate();case"month":t&=e.getMonth()===n.getMonth();case"year":t&=e.getFullYear()===n.getFullYear()}return t}}}}]);var r=e.module("datePicker");r.directive("dateRange",function(){return{templateUrl:"templates/daterange.html",scope:{start:"=",end:"="},link:function(e){e.$watch("start.getTime()",function(t){t&&e.end&&t>e.end.getTime()&&(e.end=new Date(t))}),e.$watch("end.getTime()",function(t){t&&e.start&&t<e.start.getTime()&&(e.start=new Date(t))})}}});var l="ng-pristine",c="ng-dirty",r=e.module("datePicker");r.constant("dateTimeConfig",{template:function(e){return'<div date-picker="'+e.ngModel+'" '+(e.view?'view="'+e.view+'" ':"")+(e.maxView?'max-view="'+e.maxView+'" ':"")+(e.template?'template="'+e.template+'" ':"")+(e.minView?'min-view="'+e.minView+'" ':"")+'class="dropdown-menu"></div>'},format:"yyyy-MM-dd HH:mm",views:["date","year","month","hours","minutes"],dismiss:!1,position:"relative"}),r.directive("dateTimeAppend",function(){return{link:function(e,t){t.bind("click",function(){t.find("input")[0].focus()})}}}),r.directive("dateTime",["$compile","$document","$filter","dateTimeConfig","$parse",function(t,n,i,o,a){var s=n.find("body"),r=i("date");return{require:"ngModel",scope:!0,link:function(n,i,u,d){function p(e){return r(e,v)}function g(){return d.$modelValue}function m(e){e.stopPropagation(),d.$pristine&&(d.$dirty=!0,d.$pristine=!1,i.removeClass(l).addClass(c),w&&w.$setDirty(),d.$render())}function h(){D&&(D.remove(),D=null),_&&(_.remove(),_=null)}function f(){if(!D){if(D=t(P)(n),n.$digest(),n.$on("setDate",function(e,t,n){m(e),j&&b[b.length-1]===n&&h()}),n.$on("$destroy",h),"absolute"===M){var o=e.extend(i.offset(),{height:i[0].offsetHeight});D.css({top:o.top+o.height,left:o.left,display:"block",position:M}),s.append(D)}else _=e.element("<div date-picker-wrapper></div>"),i[0].parentElement.insertBefore(_[0],i[0]),_.append(D),D.css({top:i[0].offsetHeight+"px",display:"block"});D.bind("mousedown",function(e){e.preventDefault()})}}var v=u.format||o.format,w=i.inheritedData("$formController"),b=a(u.views)(n)||o.views.concat(),y=u.view||b[0],k=b.indexOf(y),j=u.dismiss?a(u.dismiss)(n):o.dismiss,D=null,M=u.position||o.position,_=null;-1===k&&b.splice(k,1),b.unshift(y),d.$formatters.push(p),d.$parsers.unshift(g);var P=o.template(u);i.bind("focus",f),i.bind("blur",h)}}}]),e.module("datePicker").run(["$templateCache",function(e){e.put("templates/datepicker.html",'<div ng-switch="view">\n  <div ng-switch-when="date">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'month\')">{{date|date:"yyyy MMMM"}}</th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      <tr>\n        <th ng-repeat="day in weekdays" style="overflow: hidden">{{ day|date:"EEE" }}</th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr ng-repeat="week in weeks">\n        <td ng-repeat="day in week">\n          <span\n            ng-class="{\'now\':isNow(day),\'active\':isSameDay(day),\'disabled\':(day.getMonth()!=date.getMonth()),\'after\':isAfter(day),\'before\':isBefore(day)}"\n            ng-click="setDate(day)" ng-bind="day.getDate()"></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="year">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev(10)">‹</th>\n        <th colspan="5" class="switch">{{years[0].getFullYear()}}-{{years[years.length-1].getFullYear()}}</th>\n        <th ng-click="next(10)">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                    <span ng-class="{\'active\':isSameYear(year),\'now\':isNow(year)}"\n                          ng-repeat="year in years"\n                          ng-click="setDate(year)" ng-bind="year.getFullYear()"></span>\n\n\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="month">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'year\')">{{ date|date:"yyyy" }}</th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                <span ng-repeat="month in months"\n                      ng-class="{\'active\':isSameMonth(month),\'after\':isAfter(month),\'before\':isBefore(month),\'now\':isNow(month)}"\n                      ng-click="setDate(month)">{{month|date:\'MMM\'}}</span>\n\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="hours">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev(24)">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'date\')">{{ date|date:"dd MMMM yyyy" }}</th>\n        <th ng-click="next(24)">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                <span ng-repeat="hour in hours"\n                      ng-class="{\'now\':isNow(hour),\'active\':isSameHour(hour)}"\n                      ng-click="setDate(hour)" ng-bind="hour.getHours()+\':00\'"></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="minutes">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'hours\')">{{ date|date:"dd MMMM yyyy" }}\n        </th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                    <span ng-repeat="minute in minutes"\n                          ng-class="{active:isSameMinutes(minute),\'now\':isNow(minute)}"\n                          ng-click="setDate(minute)">{{minute|date:"HH:mm"}}</span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n'),e.put("templates/daterange.html",'<div>\n    <table>\n        <tr>\n            <td valign="top">\n                <div date-picker="start" class="date-picker" date after="start" before="end" min-view="date" max-view="date"></div>\n            </td>\n            <td valign="top">\n                <div date-picker="end" class="date-picker" date after="start" before="end"  min-view="date" max-view="date"></div>\n            </td>\n        </tr>\n    </table>\n</div>\n')}])}(angular),function(e,t,n){e.fn.frillsInit=function(i){function o(){u=document.getElementById("frills-canvas"),void 0!==u&&(d=u.getContext("2d"),a(),t.addEventListener("resize",a,!1),r(),document.addEventListener("mousemove",s,!1))}function a(){u.width=t.innerWidth,u.height=t.innerHeight}function s(){_=!1,0>=j&&P&&(j=setInterval(c,40)),P||(_=!0),clearTimeout(k),k=setTimeout(function(){_=!0},3e3)}function r(){p=[];for(var e=20,t=0;w>t;t++){var n={position:{x:b,y:y},shift:{x:b,y:y},size:.2,angle:0,speed:.01+1*Math.random(),targetSize:.2,fillColor:"rgba("+e+", "+e+", "+e+", 1.0)",orbit:.5*h};p.push(n)}}function l(){_=!0;var e=0;clearInterval(j),j=0,d.globalCompositeOperation="destination-out",d.fillStyle="rgba(239,239,239,1.0)",d.fillRect(0,0,d.canvas.width,d.canvas.height),e++}function c(){if(f=Math.min(f,v),d.globalCompositeOperation="destination-out",d.fillStyle="rgba(235,235,235,0.17)",d.fillRect(0,0,d.canvas.width,d.canvas.height),1==_)return d.globalCompositeOperation="lighter",d.fillStyle="rgba(239,239,239,0.1)",d.fillRect(0,0,d.canvas.width,d.canvas.height),M+=40,void(M>=D&&(clearInterval(j),j=0,M=0));for(n=0,g=p.length;g>n;n++){var e=p[n],t={x:e.position.x,y:e.position.y};e.angle+=e.speed,e.shift.x+=(b-e.shift.x)*e.speed,e.shift.y+=(y-e.shift.y)*e.speed,e.position.x=e.shift.x+Math.cos(n+e.angle)*e.orbit*f,e.position.y=e.shift.y+Math.sin(n+e.angle)*e.orbit*f,e.position.x=Math.max(Math.min(e.position.x,u.width),0),e.position.y=Math.max(Math.min(e.position.y,u.height),0),e.size+=.05*(e.targetSize-e.size),d.globalCompositeOperation="source-over",d.beginPath(),d.fillStyle=e.fillColor,d.strokeStyle=e.fillColor,d.lineWidth=e.size,d.moveTo(.5+t.x|0,.5+t.y|0),d.lineTo(.5+e.position.x|0,.5+e.position.y|0),d.stroke(),d.arc(.5+e.position.x|0,.5+e.position.y|0,e.size/2,0,2*Math.PI,!0),d.fill()}}var u,d,p,g,m=e.extend({radius:255},i),h=m.radius,f=1,v=1,w=40,b=40,y=50,k=0,j=0,D=3e3,M=0,_=!0,P=!1;e(t).scroll(function(){P=!1,l()}),e(".projectThumbnail").mouseover(function(){P=!0,b=e(this).offset().left+.5*e(this).width(),y=e(this).offset().top-e(t).scrollTop()+.5*e(this).height()}),e(".projectThumbnail").mouseout(function(){P=!1}),o(),r()}}(jQuery,this,0);var kingaFrontend=angular.module("kingaFrontend",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","kingaApi","datePicker"]);kingaFrontend.config(["$httpProvider","$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){t.state("home",{url:"/",templateUrl:"app/featured/featured.html",controller:"FeaturedCtrl",authenticate:!1}).state("projects",{url:"/projects",templateUrl:"app/main/main.html",controller:"MainCtrl",authenticate:!1}).state("contact",{url:"/contact",templateUrl:"app/contact/contact.html",controller:"ContactCtrl",authenticate:!1}).state("admin",{url:"/admin",templateUrl:"app/login/login.html",controller:"LoginCtrl",authenticate:!1}).state("editProject",{url:"/edit_project",templateUrl:"app/edit_project/edit_project.html",controller:"EditCtrl",authenticate:!0}).state("addNewProject",{url:"/add_project?id",templateUrl:"app/add_project/add_project.html",controller:"AddProjectCtrl",authenticate:!0,params:{title:!0,id:!0,description:!0,thumbnail:!0,project_date:!0,photos:!0,photoset_id:!0,flickr_name:!0}}).state("showProject",{url:"/project?id",templateUrl:"app/show_project/show_project.html",controller:"showProjectCtrl",authenticate:!1,params:{title:!0,id:!0,description:!0,project_date:!0,photos:!0,flickr_name:!0}}),n.otherwise("/"),console.log(localStorage.getItem("auth_token")),e.defaults.headers.common.Authorization=localStorage.getItem("auth_token")}]),kingaFrontend.run(["$rootScope","$state",function(e,t){e.$on("$stateChangeSuccess",function(e,n){n.authenticate&&!localStorage.getItem("auth_token")&&t.go("admin")})}]);var kf=angular.module("kingaFrontend");kf.directive("flashMessages",function(){return{restrict:"E",templateUrl:"directives/flashMessages/flash-message-container.html",controller:"FlashMessageCtrl"}});var kf=angular.module("kingaFrontend");kf.controller("FlashMessageCtrl",["$scope","$timeout","$rootScope","FlashMessages",function(e,t,n,i){e.FlashMessages=i,e.$watch("FlashMessages.messages",function(e,n,o){e&&(o.messages=e,t(function(){i.dismissAll()},1e4))}),e.dismissMessage=function(e){i.dismiss(e)}}]);var kf=angular.module("kingaFrontend");kf.directive("adminGallery",function(){return{restrict:"E",templateUrl:"directives/adminGallery/admin-gallery.html",controller:"AdminGalleryCtrl"}});var kf=angular.module("kingaFrontend");kf.controller("AdminGalleryCtrl",["$scope","$timeout","$rootScope","kingaApi","FlashMessages",function(e,t,n,i){e.deletePhoto=function(t){t.project_id=e.project_id,i.Photo["delete"](t).success(function(){e.photos.splice(e.photos.indexOf(t),1)}).error(function(){})},e.setFeatured=function(t,n){t.project_id=e.project_id,t.featured=n,i.Photo.setUpFeatured(t).success(function(e){console.log(e)}).error(function(){})}}]);var api=angular.module("kingaApi",[]);api.service("kingaApi",["http","User","Project","Photo","Flicker",function(e,t,n,i,o){var a={};return a.User=t,a.Project=n,a.Photo=i,a.Flicker=o,a}]);var api=angular.module("kingaApi");api.service("User",["http",function(e){var t={};return t.getToken=function(t){return e.post("sessions",t)},t["delete"]=function(t){return e.post("user/delete",{username:t.username,updateToken:t.updateToken})},t}]);var api=angular.module("kingaApi");api.service("Project",["http",function(e){var t={};return t.getAllProjects=function(){return e.get("projects")},t.getPublishedProjects=function(){return e.get("published")},t.getProject=function(t){return e.get("projects/"+t)},t.create=function(t){return e.post("projects",t)},t.update=function(t){return e.update("projects/"+t.id,t)},t["delete"]=function(t){return e["delete"]("projects/"+t.id)},t}]);var api=angular.module("kingaApi");api.service("Photo",["http",function(e){var t={};return t.create=function(t){return e.post("projects/"+t.project_id+"/photos",t)},t["delete"]=function(t){return console.log(t),e["delete"]("projects/"+t.project_id+"/photos/"+t.id)},t.setUpFeatured=function(t){return e.update("projects/"+t.project_id+"/photos/"+t.id,t)},t.removeFeatured=function(t){return e.update("projects/"+t.project_id+"/photos/"+t.id,t)},t.getFeaturedPhotos=function(){return e.get("featured")},t.getPhotos=function(t){return e.get("projects/"+t+"/photos")},t}]);var api=angular.module("kingaApi");api.service("http",["$http",function(e){var t={};return t.post=function(t,n){return e.post(Options.API_SERVER+t,n)},t.get=function(t,n){return e.get(Options.API_SERVER+t,n)},t["delete"]=function(t,n){return e["delete"](Options.API_SERVER+t,n)},t.update=function(t,n){return e.put(Options.API_SERVER+t,n)},t}]);var api=angular.module("kingaApi");api.service("Flicker",["http","$http",function(e){var t={};return t.getPhotosFromPhotoset=function(t){return e.get("flickr/"+t)},t}]),angular.module("kingaFrontend").controller("NavbarCtrl",["$scope",function(e){e.selectedIndex=0,e.select=function(t){e.selectedIndex=t}}]),angular.module("kingaFrontend").controller("showProjectCtrl",["$scope","$state","$stateParams","$http","kingaApi",function(e,t,n,i,o){return 1==n.title?(e.description="Loading...",e.title="...",setTimeout(function(){new Layzr({threshold:1e3})}),o.Project.getProject(n.id).success(function(t){e.photos=t.project.photos,e.description=t.project.description,e.title=t.project.title}).error(function(e){switch(e&&e.code){default:console.log("error",e)}})):(e.description=n.description,e.title=n.title,e.photos=n.photos,void 0)}]),angular.module("kingaFrontend").controller("MainCtrl",["$scope","kingaApi",function(e,t){t.Project.getPublishedProjects().success(function(t){e.projects=t.projects,setTimeout(function(){$("#frills").frillsInit();new Layzr({})})}).error(function(e){switch(e&&e.code){default:console.log("error",e)}})}]),angular.module("kingaFrontend").controller("LoginCtrl",["$scope","$http","$state","kingaApi","$timeout","FlashMessages",function(e,t,n,i,o,a){e.username=null,e.password=null,e.loginError=null,localStorage.getItem("auth_token")&&n.go("editProject"),e.attemptLogin=function(){return e.asyncLogin(),!0},e.asyncLogin=function(){if(e.loginError=null,!e.username)return void(e.loginError="Username and password cannot be blank.");var t={email:e.username,password:e.password};i.User.getToken(t).success(function(e){a.add({title:"You are logged in!",info:"Hello beutiful Kinga, add some awesome projects to your site"}),localStorage.setItem("auth_token",e.user.auth_token),n.go("editProject")}).error(function(){})}}]),angular.module("kingaFrontend").controller("FeaturedCtrl",["$scope","kingaApi",function(e,t){t.Photo.getFeaturedPhotos().success(function(t){e.photos=t.photos,setTimeout(function(){$(".rslides").responsiveSlides()})}).error(function(e){switch(e&&e.code){default:console.log("error",e)}})}]),angular.module("kingaFrontend").controller("EditCtrl",["$scope","$state","$http","kingaApi","FlashMessages",function(e,t,n,i,o){e["delete"]=function(t){i.Project["delete"](t).success(function(){o.add({title:"You deleted the project:"+t.title,info:"All photos belongign to this picture were also deleted"}),e.projects.splice(e.projects.indexOf(t),1)})},e.publish=function(e,t){e.published=t,i.Project.update(e).success(function(){o.add({title:"You published:"+e.title,info:"Your audience can see it now"})})},e.edit=function(e){t.go("addNewProject",e)},i.Project.getAllProjects().success(function(t){e.projects=t.projects}).error(function(e){switch(e&&e.code){default:console.log("error",e)}})}]),angular.module("kingaFrontend").controller("ContactCtrl",["$scope","$timeout",function(e,t){e.showAnimation=!1,t(function(){e.showAnimation=!0},400)}]),angular.module("kingaFrontend").controller("AddProjectCtrl",["$scope","$http","$state","$stateParams","kingaApi","FlashMessages",function(e,t,n,i,o,a){1!=i.id?(e.title=i.title,e.thumbnail=i.thumbnail,e.flickr_name=i.flickr_name,e.description=i.description,e.project_date=new Date(i.project_date),e.project_id=i.id,e.photos=i.photos,e.projectError=null,e.projectExist=function(){return!0}):(e.title=null,e.thumbnail=null,e.flickr_name=null,e.description=null,e.project_date=null,e.project_id=null,e.photos=null,e.projectError=null,e.projectExist=function(){return!1}),e.attemptSave=function(){return e.asyncSave(),!0},e.asyncSave=function(){if(e.loginError=null,!e.title)return void(e.loginError="title and flickr name cannot be blank.");var t={title:e.title,flickr_name:e.flickr_name,description:e.description,project_date:$("#project_date").val()};1!=i.id?(t.id=i.id,o.Project.update(t).success(function(t){e.project_id=t.project.id,e.thumbnail=t.project.thumbnail}).error(function(){})):o.Project.create(t).success(function(t){e.project_id=t.project.id,e.thumbnail=t.project.thumbnail,e.projectExist=function(){return!0}}).error(function(){})},e.syncPhotos=function(){e.projectError=null;var t=e.project_id;e.photos=null,a.add({title:"It will take  fiew seconds",info:"please wait...",type:"info"}),o.Flicker.getPhotosFromPhotoset(t).success(function(t){console.log(t),e.photos=t.project.photos,a.add({title:"Great! You can see your photos below",type:"success"})}).error(function(e,t){switch(t){case 500:console.log("error22"),a.add({title:"Something went wrong",info:"please check it again",type:"error"});break;default:console.log("error",t)}})}}]),window.Options={API_SERVER:"http://localhost:3000/"};var kf=angular.module("kingaFrontend");kf.factory("FlashMessages",["$rootScope",function(e){var t={};return t.messages=[],e.$on("flashMessage",function(e,n){t.messages.push(n)}),t.dismiss=function(e){t.messages.splice(e,1)},t.add=function(t){var n={showCloseIcon:!0};t=_.extend(n,t),e.$broadcast("flashMessage",t)},t.dismissAll=function(){t.messages=[]},t.dismissById=function(e){t.messages=t.messages.filter(function(t){return t.id!==e})},t}]),angular.module("kingaFrontend").run(["$templateCache",function(e){e.put("components/navbar/navbar.html",'<div ng-controller="NavbarCtrl" class="row"><div class="small-8 columns"><img src="./assets/images/logo.png"></div><nav class="small-4 columns"><ul><li><a ui-sref="home" ng-click="select(0)" ng-class="{active: 0 === selectedIndex}">Start</a></li><li><a ui-sref="projects" ng-click="select(1)" ng-class="{active: 1 === selectedIndex}">Works</a></li><li><a ui-sref="contact" ng-click="select(2)" ng-class="{active: 2 === selectedIndex}">About</a></li></ul></nav></div>'),e.put("app/add_project/add_project.html",'<br><br><br><br><hr><div class="row"><div class="small-6 columns panel"><form role="form" class="form-horizontal" ng-submit="attemptSave()" method="post"><p class="text-center">Add new project</p><div class="form-group"><div class="errors col-sm-offset-3 col-sm-6"><div class="tip">{{ projectError }}</div></div></div><div class="form-group"><label for="title">Title</label> <input id="title" type="text" class="form-control" ng-model="title" ng-disabled="asyncSave.isLoading()"></div><div class="form-group"><label for="flickr_name">Flickr Name</label> <input id="flickr_name" type="text" class="form-control" ng-model="flickr_name" ng-disabled="asyncSave.isLoading()"></div><div class="form-group"><label for="username">Date (determine the order)</label> <input id="project_date" type="datetime" date-time="" ng-model="project_date"></div><div class="form-group"><label for="description">Description</label> <textarea ng-model="description" rows="4"></textarea></div><div class="form-group text-center"><button type="submit" class="button success" ng-disabled="asyncSave.isLoading()">{{!!thumbnail ? \'Update\' : \'Save\'}}</button></div></form></div><div class="small-6 columns text-center panel"><p ng-bind="title"></p><img class="thumbnail" src="{{ thumbnail }}"><p ng-bind-html="description"></p><div class="text-center"><button class="button success" ng-show="!!thumbnail" ng-click="syncPhotos()">Sync Photos From Flickr</button></div></div></div><admin-gallery ng-show="!!project_id"></admin-gallery>'),e.put("app/contact/contact.html",'<br><br><br><br><hr><div class="row"><div class="small-5 columns text-center"><br><br><br><img src="./assets/images/kinga.jpg" class="repeat-animation" ng-if="showAnimation"><p class="copyright repeat-animation" ng-if="showAnimation">Photo taken by Brooks Yardley</p><div class="devider repeat-animation" ng-if="showAnimation"></div><a href="mailto:kingamichalska@yahoo.com" id="link_email" class="repeat-animation" ng-if="showAnimation">kingamichalska@yahoo.com</a><div class="devider repeat-animation" ng-if="showAnimation"></div></div><div class="small-6 columns end"><div class="about-text"><p id="hi" class="repeat-animation" ng-if="showAnimation">Hi!</p><p class="repeat-animation" ng-if="showAnimation">I am a Polish photographer based in Montreal, specialised in portrait photography. I graduated form Warsaw School of Photography in 2010 and from Cultural Studies at Warsaw University in 2012.</p><p class="repeat-animation" ng-if="showAnimation">I am mostly interested in the issues of body, movement and femininity. My mission as a photographer is to create intimate and authentic connections and provide a safe space for people to freely express themselves through my images.</p><p class="repeat-animation" ng-if="showAnimation">I have a broad perspective on visual culture, which I gathered traveling and doing creative projects for the last 5 years in Europe, North America and South America. My interest in portraiture is primarily anchored in the documentary work of Mary-Ellen Young and Diane Arbus, but I also take inspiration from the minimalist aesthetics of Rinko Kawauchi’s art and the otherworldly, campy ambient of Tsai Ming-liang’s movies.</p><p class="repeat-animation" ng-if="showAnimation">Please contact me if you’re interested in a private photo shoot or a creative collaboration. Yes, I will travel for work.</p><br><br></div></div></div>'),e.put("app/edit_project/edit_project.html",'<br><br><br><br><hr><div class="row"><br><br><div class="large-12 columns text-center"><button class="button success" ui-sref="addNewProject">add new project</button></div><div class="large-4 columns end text-center" ng-if="project" ng-repeat="project in projects | orderBy: \'project_date\':true"><div class="panel"><p>{{project.title}}</p><img class="thumbnail" ng-src="{{project.thumbnail}}" alt="{{project.title}}"><ul class="button-group radius"><li><button class="button small alert" ng-click="delete(project)">X</button></li><li><button class="button small" ng-click="edit(project)">Edit</button></li><li><button class="button small success" ng-if="!project.published" ng-click="publish(project, true)">Publish</button></li><li><button class="button small alert" ng-if="project.published" ng-click="publish(project, false)">Unpublish</button></li></ul></div></div></div>'),e.put("app/featured/featured.html",'<ul class="rslides"><img ng-src="{{photo.url}}" ng-repeat="photo in photos"></ul>'),e.put("app/login/login.html",'<br><br><br><br><hr><div class="small-5 small-centered columns panel"><p class="text-center">Hello Kinga, login to add new projects</p><br><form role="form" class="form-horizontal" ng-controller="LoginCtrl" ng-submit="attemptLogin()" method="post"><div class="form-group"><div class="errors"><div class="tip">{{ loginError }}</div></div></div><div class="form-group"><label for="username">email</label> <input id="username" type="email" class="form-control" ng-model="username" ng-disabled="asyncLogin.isLoading()" required=""> <i class="icon icon-user"></i></div><div class="form-group"><div class="errors"></div></div><div class="form-group"><label for="username" class="col-sm-3">password</label> <input id="password" type="password" class="form-control" ng-model="password" ng-disabled="asyncLogin.isLoading()" required=""> <i class="icon icon-password"></i></div><div class="form-group text-center"><button type="submit" class="button success" ng-disabled="asyncLogin.isLoading()">{{asyncLogin.isLoading() ? \'Logging in...\' : \'Log in\'}}</button></div></form></div>'),e.put("app/main/main.html",'<br><br><br><br><hr><div class="row"><div class="large-10 columns paddint-top"><div class="large-4 columns end thumbnail repeat-animation" ng-repeat="project in projects | orderBy: \'project_date\':true"><a ui-sref="showProject(project)"><img class="projectThumbnail" src="./assets/images/placeholder.gif" data-layzr="{{project.thumbnail}}"> <span class="project-title">{{project.title}}</span></a></div></div><div class="large-2 columns"></div></div>'),e.put("app/show_project/show_project.html",'<div class="small-10 columns"><h2 class="project-title-show">{{title}}</h2><p ng-bind-html="description"></p><br></div><div class="small-2 columns"></div><hr><div class="small-11 columns" ng-animate-children=""><div class="show-photo text-center repeated-item" ng-repeat="photo in photos"><img class="horizontal-{{photo.horizontal}}" src="./assets/images/placeholder.gif" data-layzr="{{photo.url}}"></div></div><div class="small-1 columns"></div>'),e.put("directives/adminGallery/admin-gallery.html",'<div class="row"><p>Photos</p><div class="panel small-3 columns" ng-repeat="photo in photos"><img class="" ng-src="{{photo.url}}"><br><ul class="button-group radius"><li><button class="button small alert" ng-click="deletePhoto(photo)">Delete</button></li><li ng-if="photo.featured"><button class="button small" ng-click="setFeatured(photo, false)">Unfeature</button></li><li ng-if="!photo.featured"><button class="button small" ng-click="setFeatured(photo, true)">Feature</button></li></ul></div></div>'),e.put("directives/flashMessages/flash-message-container.html",'<div class="flash-message-container container" ng-show="messages.length"><div ng-repeat="message in messages" class="flash-message" ng-class="message.type"><i class="icon icon-close" ng-click="dismissMessage($index)" ng-show="message.showCloseIcon">X</i><div class="flash-body"><span ng-if="message.title" class="flash-title">{{ message.title }}</span> <span ng-if="message.info" class="flash-info">{{ message.info }}</span><div ng-if="message.template" class="flash-template" ng-include="message.template"></div></div><div class="flash-accent"></div></div></div>')
}]);