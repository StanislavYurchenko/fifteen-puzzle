(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"00et":function(t,e,n){},QfWi:function(t,e,n){"use strict";n.r(e);n("00et"),n("hi3g"),n("IlJM"),n("Se8w"),n("RtS0"),n("4owi"),n("uQK7"),n("lmye"),n("x3Br"),n("lAJ5"),n("bEJU"),n("wCa+"),n("WoWj"),n("3dw1");var i=function(){function t(t){this._puzzleRef=document.querySelector(t),this._victory=!1,this._gameState=[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]],this._indexZero=null,this._indexToMove=null,this._directionOfMove=null,this._numberRequestToMove=null,this._mixedArray=null,this._puzzleRef.addEventListener("click",this._puzzleHolder.bind(this)),this._init()}var e=t.prototype;return e.isWin=function(){return!this._gameState.flat().some((function(t,e){return t>0&&t-1!==e}))},e._markup=function(){var t=document.createElement("ul");t.classList.add("square__list"),this._gameState.forEach((function(e,n){e.forEach((function(e,i){var r=document.createElement("li");r.classList.add("square__item"),r.classList.add("square-"+(4*n+i)),r.setAttribute("data-number",""+(4*n+i)),r.textContent=""+(4*n+i),t.appendChild(r)}))}));var e=document.createElement("div");e.classList.add("win-banner"),e.innerHTML='<span>Congratulations!</span><span class="br">You won</span>',this._puzzleRef.appendChild(t),this._puzzleRef.appendChild(e)},e._arrangeGameState=function(){var t=this;this._gameState.forEach((function(e,n){e.forEach((function(e,i){Array.from(t._puzzleRef.querySelectorAll(".square__item")).find((function(e){return e.dataset.number===""+t._gameState[n][i]})).style.transform="translate("+100*i+"%, "+100*n+"%)"}))}))},e._findIndexElement=function(t){return this._gameState.reduce((function(e,n,i){return-1===n.indexOf(t)?e:Object.assign({},e,{rowIndex:i,colIndex:n.indexOf(t)})}),{})},e._findDirectionOfMove=function(){return this._indexToMove.rowIndex===this._indexZero.rowIndex-1&&this._indexToMove.colIndex===this._indexZero.colIndex?"toDown":this._indexToMove.rowIndex===this._indexZero.rowIndex+1&&this._indexToMove.colIndex===this._indexZero.colIndex?"toUp":this._indexToMove.rowIndex===this._indexZero.rowIndex&&this._indexToMove.colIndex===this._indexZero.colIndex-1?"toRight":this._indexToMove.rowIndex===this._indexZero.rowIndex&&this._indexToMove.colIndex===this._indexZero.colIndex+1?"toLeft":"impossible"},e._changePosition=function(){"toDown"!==this._directionOfMove&&"toUp"!==this._directionOfMove||(this._gameState[this._indexZero.rowIndex][this._indexZero.colIndex]=this._gameState[this._indexToMove.rowIndex][this._indexToMove.colIndex],this._gameState[this._indexToMove.rowIndex][this._indexToMove.colIndex]=0),"toRight"!==this._directionOfMove&&"toLeft"!==this._directionOfMove||(this._gameState[this._indexZero.rowIndex][this._indexZero.colIndex]=this._gameState[this._indexToMove.rowIndex][this._indexToMove.colIndex],this._gameState[this._indexToMove.rowIndex][this._indexToMove.colIndex]=0)},e._showWinnerBanner=function(){this._victory&&(this._puzzleRef.querySelector(".win-banner").style.display="block")},e._puzzleHolder=function(t){if(!this._victory){var e=t.target;t.currentTarget!==e&&"0"!==e.dataset.number&&(this._numberRequestToMove=+e.dataset.number,this._indexToMove=this._findIndexElement(this._numberRequestToMove),this._indexZero=this._findIndexElement(0),this._directionOfMove=this._findDirectionOfMove(),this._changePosition(),this._arrangeGameState(),this._victory=this.isWin(),this._showWinnerBanner())}},e._mixArray=function(t){for(var e=0,n=0,i=t.length-1;i>0;i--)n=t[e=Math.floor(Math.random()*(i+1))],t[e]=t[i],t[i]=n;return this._isArraySolvable(t)||this._mixArray(t),t},e._newGameState=function(){var t=this,e=1,n=Array.from({length:15},(function(){return e++}));return this._mixedArray=this._mixArray(n),this._gameState.map((function(e,n){return[].concat(e.map((function(e,i){return 3===n&&3===i?0:t._mixedArray[4*n+i]})))}))},e._isArraySolvable=function(t){for(var e=[].concat(t,[0]),n=0,i=1;i<e.length-1;i++)for(var r=i-1;r>=0;r--)e[r]>e[i]&&n++;return!(n%2)},e._init=function(){this._markup(),this._arrangeGameState()},e.start=function(){this._gameState=this._newGameState(),this._arrangeGameState()},t}(),r=(n("JBxO"),n("9UJh"),n("e+qc"),n("xpjN")),s=n.n(r),a=function(){function t(t,e){this._selector=document.querySelector(t),this._callback=e,this._intervalId=null,this._btnStatus={start:"start",stop:"reset"},this._startTime=null,this._pauseTime=null,this._pauseStartTime=null,this._initRender(),this._refs={hours:this._selector.querySelector(".timer__time-left--hour-value"),mins:this._selector.querySelector(".timer__time-left--min-value"),secs:this._selector.querySelector(".timer__time-left--sec-value"),btnStart:this._selector.querySelector(".timer__btn--start"),btnStop:this._selector.querySelector(".timer__btn--stop"),form:this._selector.querySelector(".form")},this._deltaTargetTime=1e3*this._refs.form.elements.time.value*60,this._refs.btnStart.addEventListener("click",this.start.bind(this)),this._refs.btnStop.addEventListener("click",this.stop.bind(this)),this._refs.form.addEventListener("click",this._updateTargetTime.bind(this)),this._render(!0)}var e=t.prototype;return e._updateTargetTime=function(){this._deltaTargetTime=1e3*this._refs.form.elements.time.value*60,this._render(!0)},e.start=function(){return"start"===this._btnStatus.start?(this._changeBtnSts("start","pause"),this._start(),void(this._refs.btnStop.disabled=!1)):"pause"===this._btnStatus.start?(this._changeBtnSts("start","resume"),void this._pause()):"resume"===this._btnStatus.start?(this._changeBtnSts("start","pause"),void this._resume()):void 0},e.stop=function(){this._changeBtnSts("start","start"),this._stop(),this._refs.btnStop.disabled=!0},e._getTimeNow=function(){return Date.now()},e.getTimeLeft=function(){return this._deltaTargetTime+this._startTime-this._getTimeNow()+this._pauseTime},e._changeBtnSts=function(t,e){this._btnStatus[t]=e},e._getRenderData=function(t){void 0===t&&(t=!1);var e=t?this._deltaTargetTime:this.getTimeLeft(),n=Math.floor(e%864e5/36e5).toString().padStart(2,"0"),i=Math.floor(e%36e5/6e4).toString().padStart(2,"0"),r=Math.floor(e%6e4/1e3).toString().padStart(2,"0");return(n<0||i<0||r<0)&&this.stop(),{hourLeftValue:isNaN(n)||n<0?"00":n,minLeftValue:isNaN(i)||i<0?"00":i,secLeftValue:isNaN(r)||r<0?"00":r,btnStartLabel:this._btnStatus.start,btnStopLabel:this._btnStatus.stop}},e._initRender=function(){var t=s()(this._getRenderData(!0));this._selector.innerHTML=t},e._render=function(t){var e=this._getRenderData(t);this._refs.hours.textContent=e.hourLeftValue,this._refs.mins.textContent=e.minLeftValue,this._refs.secs.textContent=e.secLeftValue,this._refs.btnStart.textContent=e.btnStartLabel,this._refs.btnStop.textContent=e.btnStopLabel},e._tick=function(){var t=this;this._intervalId=setTimeout((function(){t._tick(),t._render()}),1e3)},e._start=function(){this._startTime=this._getTimeNow(),this._render(),this._tick(),this._callback&&this._callback()},e._pause=function(){this._pauseStartTime=this._getTimeNow(),this._render(),clearTimeout(this._intervalId)},e._resume=function(){this._pauseTime+=this._getTimeNow()-this._pauseStartTime,this._render(),this._tick()},e._stop=function(){this._pauseTime=null,this._pauseStartTime=null,clearTimeout(this._intervalId),this._render(!0)},t}(),o=new i(".puzzle");new a(".timer",(function(){return o.start()}))},xpjN:function(t,e,n){var i=n("mp5j");t.exports=(i.default||i).template({compiler:[8,">= 4.3.0"],main:function(t,e,n,i,r){var s,a=null!=e?e:t.nullContext||{},o=t.hooks.helperMissing,l="function",_=t.escapeExpression,u=t.lookupProperty||function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]};return'<div class="timer__time-left">\r\n      <span class="timer__time-left timer__time-left--hour-lbl">hour:</span>\r\n      <span class="timer__time-left timer__time-left--hour-value">'+_(typeof(s=null!=(s=u(n,"hourLeftValue")||(null!=e?u(e,"hourLeftValue"):e))?s:o)===l?s.call(a,{name:"hourLeftValue",hash:{},data:r,loc:{start:{line:3,column:66},end:{line:3,column:83}}}):s)+'</span>\r\n      <span class="timer__time-left timer__time-left--min-lbl">min:</span>\r\n      <span class="timer__time-left timer__time-left--min-value">'+_(typeof(s=null!=(s=u(n,"minLeftValue")||(null!=e?u(e,"minLeftValue"):e))?s:o)===l?s.call(a,{name:"minLeftValue",hash:{},data:r,loc:{start:{line:5,column:65},end:{line:5,column:81}}}):s)+'</span>\r\n      <span class="timer__time-left timer__time-left--sec-lbl">sec:</span>\r\n      <span class="timer__time-left timer__time-left--sec-value">'+_(typeof(s=null!=(s=u(n,"secLeftValue")||(null!=e?u(e,"secLeftValue"):e))?s:o)===l?s.call(a,{name:"secLeftValue",hash:{},data:r,loc:{start:{line:7,column:65},end:{line:7,column:81}}}):s)+'</span>\r\n</div>\r\n\r\n\r\n<div class="timer__control">\r\n    <button class="timer__btn timer__btn--start" type="button">'+_(typeof(s=null!=(s=u(n,"btnStartLabel")||(null!=e?u(e,"btnStartLabel"):e))?s:o)===l?s.call(a,{name:"btnStartLabel",hash:{},data:r,loc:{start:{line:12,column:63},end:{line:12,column:80}}}):s)+'</button>\r\n    <button class="timer__btn timer__btn--stop" type="button" disabled>'+_(typeof(s=null!=(s=u(n,"btnStopLabel")||(null!=e?u(e,"btnStopLabel"):e))?s:o)===l?s.call(a,{name:"btnStopLabel",hash:{},data:r,loc:{start:{line:13,column:71},end:{line:13,column:87}}}):s)+'</button>\r\n</div>\r\n\r\n<form class="form">\r\n    <label class="form__label">\r\n          <input class="form__input" type="radio" name="time" value="1" />\r\n          <span class="form__deck">1 min</span>\r\n    </label>\r\n\r\n    <label class="form__label">\r\n          <input class="form__input" type="radio" name="time" value="3" checked />\r\n          <span class="form__deck">3 min</span>\r\n    </label>\r\n\r\n    <label class="form__label">\r\n          <input class="form__input" type="radio" name="time" value="10" />\r\n          <span class="form__deck">10 min</span>\r\n    </label>\r\n</form>\r\n'},useData:!0})}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.83a0f0bed60479b7e4b3.js.map