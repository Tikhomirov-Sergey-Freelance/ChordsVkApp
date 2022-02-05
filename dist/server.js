/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui_dist_vkui_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui/dist/vkui.css */ "./node_modules/@vkontakte/vkui/dist/vkui.css");
/* harmony import */ var _vkontakte_vkui_dist_vkui_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui_dist_vkui_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_layout_page_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/layout/page-layout */ "./src/components/layout/page-layout.tsx");
/* harmony import */ var _components_views_view_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/views/view-list */ "./src/components/views/view-list.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








try {
  console.log(window);
} catch (err) {
  global['window'] = {
    isServer: true
  };
}

const App = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.ConfigProvider, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.AdaptivityProvider, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.AppRoot, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout_page_layout__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_views_view_list__WEBPACK_IMPORTED_MODULE_4__["default"], null)))));
};

const _default = App;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\app.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\app.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/code/canvas/chord.ts":
/*!**********************************!*\
  !*** ./src/code/canvas/chord.ts ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

class ChordCanvas {
  constructor(canvas) {
    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "params", void 0);

    _defineProperty(this, "stepStrings", void 0);

    _defineProperty(this, "stepFrets", void 0);

    _defineProperty(this, "padding", 10);

    _defineProperty(this, "topPadding", this.padding * 2);

    _defineProperty(this, "stringsColor", 'black');

    _defineProperty(this, "fretsColor", '#99a2ad');

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  draw(params, width, height) {
    this.params = params;
    this.canvas.width = width;
    this.canvas.height = height;
    this.clear();
    this.drawEmptyFrets();
  }

  drawEmptyFrets() {
    this.context.strokeStyle = this.stringsColor;
    this.context.lineWidth = 1;
    this.drawFrets();
    this.drawStrings();
    this.drawChords();
    this.drawDescription();
  }

  drawFrets() {
    let y = this.topPadding;
    this.stepFrets = (this.canvas.height - this.padding - y) / 5;

    for (let i = 0; i <= 5; i++) {
      this.drawLine(this.padding, y, this.canvas.width - this.padding, y);
      y += this.stepFrets;
    }
  }

  drawStrings() {
    let x = this.canvas.width - this.padding;
    this.stepStrings = (x - this.padding) / (this.params.guitarStrings.length - 1);
    this.params.guitarStrings.forEach(string => {
      this.drawLine(x, this.topPadding, x, this.canvas.height - this.padding);
      x -= this.stepStrings;
    });
  }

  drawChords() {
    this.context.strokeStyle = this.fretsColor;
    this.context.lineWidth = 7;
    this.drawBarre();
    this.drawStringFrets();
  }

  drawBarre() {
    if (!this.params.barre) return;
    const strings = this.params.guitarStrings;
    let skipStrings = 0;

    for (let i = strings.length - 1; i >= 0; i--) {
      if (strings[i].fret !== 'notPlayed') {
        break;
      }

      skipStrings++;
    }

    const startX = this.padding + skipStrings * this.stepStrings - 2;
    const endX = this.canvas.width - this.padding + 2;
    const y = this.topPadding + this.stepFrets / 2;
    this.drawLine(startX, y, endX, y);
  }

  drawStringFrets() {
    const strings = this.params.guitarStrings;

    for (let i = strings.length - 1; i >= 0; i--) {
      const string = strings[i];
      if (string.fret === 'notPlayed' || string.fret === this.params.startFret) continue;
      const fert = string.fret;
      const x = this.canvas.width - this.padding - (string.index - 1) * this.stepStrings;
      const y = this.topPadding + (fert - (this.params.startFret + 1)) * this.stepFrets + this.stepFrets / 2;
      this.context.beginPath();
      this.context.fillStyle = this.fretsColor;
      this.context.arc(x, y, 5, 0, Math.PI * 2);
      this.context.fill();
      this.context.beginPath();
    }
  }

  drawDescription() {
    if (this.params.startFret !== 0) {
      this.context.lineWidth = 0.75;
      this.context.strokeText(this.params.startFret.toString(), this.padding - 10, this.topPadding / 2 - 2);
    }

    for (let i = this.params.guitarStrings.length - 1; i >= 0; i--) {
      const string = this.params.guitarStrings[i];
      if (string.fret !== 'notPlayed') continue;
      const x = this.canvas.width - this.padding - (string.index - 1) * this.stepStrings;
      this.context.lineWidth = 0.5;
      this.context.strokeText('X', x - 2.5, this.topPadding - 2);
    }
  }

  drawLine(startX, startY, endX, endY) {
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.stroke();
    this.context.beginPath();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}

const _default = ChordCanvas;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ChordCanvas, "ChordCanvas", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\canvas\\chord.ts");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\canvas\\chord.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/code/common/alerts.ts":
/*!***********************************!*\
  !*** ./src/code/common/alerts.ts ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "snackbar": () => (/* binding */ snackbar)
/* harmony export */ });
/* harmony import */ var _stores_snackbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stores/snackbar */ "./src/stores/snackbar.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const snackbar = (message, callback) => {
  return _stores_snackbar__WEBPACK_IMPORTED_MODULE_0__["default"].showSnackbar({
    message,
    callback
  });
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(snackbar, "snackbar", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\common\\alerts.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/code/common/guid.ts":
/*!*********************************!*\
  !*** ./src/code/common/guid.ts ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGuid": () => (/* binding */ createGuid)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const createGuid = () => {
  return (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(createGuid, "createGuid", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\common\\guid.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/code/data/guitar-string.ts":
/*!****************************************!*\
  !*** ./src/code/data/guitar-string.ts ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stringsByCount": () => (/* binding */ stringsByCount)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const stringsByCount = ['', 'Первая', 'Вторая', 'Третья', 'Четвертая', 'Пятая', 'Шестая'];
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(stringsByCount, "stringsByCount", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\data\\guitar-string.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/code/data/notes.ts":
/*!********************************!*\
  !*** ./src/code/data/notes.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "notes": () => (/* binding */ notes)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(notes, "notes", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\data\\notes.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/code/firebase/index.ts":
/*!************************************!*\
  !*** ./src/code/firebase/index.ts ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "firebase/app");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/database */ "firebase/database");
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "firebase/firestore");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_2__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

// Import the functions you need from the SDKs you need


 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAG70Q8XMvKfSU48NLjICNcHxm4w1LGGiU",
  authDomain: "chords-test-c25b3.firebaseapp.com",
  projectId: "chords-test-c25b3",
  storageBucket: "chords-test-c25b3.appspot.com",
  messagingSenderId: "961783308721",
  appId: "1:961783308721:web:265426d5c87511d98add90"
};

const init = () => {
  // Initialize Firebase
  const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
  const analytics = null; // = getAnalytics(app)

  const database = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)(app);
  const firestore = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);
  return {
    app,
    database,
    firestore,
    analytics
  };
};

const _default = init;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(firebaseConfig, "firebaseConfig", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\firebase\\index.ts");
  reactHotLoader.register(init, "init", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\firebase\\index.ts");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\code\\firebase\\index.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/barre/index.tsx":
/*!*********************************************************!*\
  !*** ./src/components/chords/add-chord/barre/index.tsx ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../stores/add-chords-store */ "./src/stores/add-chords-store.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const BarreField = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.Checkbox, {
    checked: _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].barre,
    onChange: event => _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].changeProperty('barre', !_stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].barre)
  }, "\u0411\u0430\u0440\u0440\u044D");
});
const _default = BarreField;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BarreField, "BarreField", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\barre\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\barre\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/drawing-fret/index.tsx":
/*!****************************************************************!*\
  !*** ./src/components/chords/add-chord/drawing-fret/index.tsx ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../stores/add-chords-store */ "./src/stores/add-chords-store.ts");
/* harmony import */ var _code_canvas_chord__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../code/canvas/chord */ "./src/code/canvas/chord.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const Fret = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(__signature__(() => {
  const canvas = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const params = _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].chordParams;
  const chordCanvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].canvas = chordCanvasRef.current = new _code_canvas_chord__WEBPACK_IMPORTED_MODULE_4__["default"](canvas.current);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const chordCanvas = chordCanvasRef.current;
    chordCanvas.draw(params, params.instrument === 'ukulele' ? 90 : 110, 170);
  }, [params]);
  console.log('rerender');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.Div, {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {
    ref: canvas,
    width: 110,
    height: 170
  }));
}, "useRef{canvas}\nuseRef{chordCanvasRef}\nuseEffect{}\nuseEffect{}"));
const _default = Fret;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Fret, "Fret", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\drawing-fret\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\drawing-fret\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/guitar-strings/guitar-string.tsx":
/*!**************************************************************************!*\
  !*** ./src/components/chords/add-chord/guitar-strings/guitar-string.tsx ***!
  \**************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _code_data_guitar_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../code/data/guitar-string */ "./src/code/data/guitar-string.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const GuitarStringField = ({
  fret,
  index,
  barre,
  startFret,
  changeFret
}) => {
  const data = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const start = barre ? startFret + 1 : startFret;
    let data = [{
      label: 'Не играется',
      value: 'notPlayed'
    }, {
      label: 'Открытая',
      value: startFret
    }];

    for (let i = start + 1; i <= start + (barre ? 4 : 5); i++) {
      data.push({
        label: i.toString(),
        value: i
      });
    }

    return data;
  }, [startFret, barre, fret]);

  if (!data.some(item => item.value === fret)) {
    changeFret(data[1].value);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.FormItem, {
    top: `${_code_data_guitar_string__WEBPACK_IMPORTED_MODULE_2__.stringsByCount[index]} струна`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    value: fret,
    options: data,
    renderOption: ({
      option,
      ...restProps
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.CustomSelectOption, restProps),
    onChange: event => changeFret(event.target.value)
  }));
};

__signature__(GuitarStringField, "useMemo{data}");

const _default = GuitarStringField;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GuitarStringField, "GuitarStringField", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\guitar-strings\\guitar-string.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\guitar-strings\\guitar-string.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/guitar-strings/index.tsx":
/*!******************************************************************!*\
  !*** ./src/components/chords/add-chord/guitar-strings/index.tsx ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../stores/add-chords-store */ "./src/stores/add-chords-store.ts");
/* harmony import */ var _guitar_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./guitar-string */ "./src/components/chords/add-chord/guitar-strings/guitar-string.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const GuitarStringFields = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_2__["default"].guitarStrings.map(string => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_guitar_string__WEBPACK_IMPORTED_MODULE_3__["default"], {
    key: string.index,
    fret: string.fret,
    index: string.index,
    barre: _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_2__["default"].barre,
    startFret: _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_2__["default"].startFret,
    changeFret: fret => _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_2__["default"].changeString(string.index, fret)
  })));
});
const _default = GuitarStringFields;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GuitarStringFields, "GuitarStringFields", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\guitar-strings\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\guitar-strings\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/index.tsx":
/*!***************************************************!*\
  !*** ./src/components/chords/add-chord/index.tsx ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _vk_layout_header_heade_and_back__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../vk/layout/header/heade-and-back */ "./src/components/vk/layout/header/heade-and-back/index.tsx");
/* harmony import */ var _drawing_fret__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./drawing-fret */ "./src/components/chords/add-chord/drawing-fret/index.tsx");
/* harmony import */ var _instrument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./instrument */ "./src/components/chords/add-chord/instrument/index.tsx");
/* harmony import */ var _notes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notes */ "./src/components/chords/add-chord/notes/index.tsx");
/* harmony import */ var _name__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./name */ "./src/components/chords/add-chord/name/index.tsx");
/* harmony import */ var _startFret__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./startFret */ "./src/components/chords/add-chord/startFret/index.tsx");
/* harmony import */ var _barre__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./barre */ "./src/components/chords/add-chord/barre/index.tsx");
/* harmony import */ var _guitar_strings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./guitar-strings */ "./src/components/chords/add-chord/guitar-strings/index.tsx");
/* harmony import */ var _save_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./save-button */ "./src/components/chords/add-chord/save-button/index.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};













const AddChordsForm = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.FormLayout, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vk_layout_header_heade_and_back__WEBPACK_IMPORTED_MODULE_3__["default"], null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u043A\u043A\u043E\u0440\u0434"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_instrument__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_notes__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_name__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_drawing_fret__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_save_button__WEBPACK_IMPORTED_MODULE_11__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_startFret__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_barre__WEBPACK_IMPORTED_MODULE_9__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_guitar_strings__WEBPACK_IMPORTED_MODULE_10__["default"], null)));
});
const _default = AddChordsForm;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AddChordsForm, "AddChordsForm", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/instrument/index.tsx":
/*!**************************************************************!*\
  !*** ./src/components/chords/add-chord/instrument/index.tsx ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../stores/add-chords-store */ "./src/stores/add-chords-store.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const InstrumentField = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.FormItem, {
    top: "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.SliderSwitch, {
    activeValue: _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].instrument,
    onSwitch: value => _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].changeInstrtument(value),
    options: [{
      name: 'Гитара',
      value: 'guitar'
    }, {
      name: 'Укулеле',
      value: 'ukulele'
    }]
  }));
});
const _default = InstrumentField;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(InstrumentField, "InstrumentField", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\instrument\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\instrument\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/name/index.tsx":
/*!********************************************************!*\
  !*** ./src/components/chords/add-chord/name/index.tsx ***!
  \********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../stores/add-chords-store */ "./src/stores/add-chords-store.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const NameField = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.FormItem, {
    top: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.Input, {
    value: _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].name,
    onChange: event => _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].changeProperty('name', event.target.value)
  }));
});
const _default = NameField;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(NameField, "NameField", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\name\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\name\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/notes/index.tsx":
/*!*********************************************************!*\
  !*** ./src/components/chords/add-chord/notes/index.tsx ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _code_data_notes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../code/data/notes */ "./src/code/data/notes.ts");
/* harmony import */ var _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../stores/add-chords-store */ "./src/stores/add-chords-store.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const NotesField = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.FormItem, {
    top: "\u041D\u043E\u0442\u0430"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.Select, {
    value: _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_4__["default"].note,
    options: _code_data_notes__WEBPACK_IMPORTED_MODULE_3__.notes.map(note => ({
      label: note,
      value: note
    })),
    renderOption: ({
      option,
      ...restProps
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.CustomSelectOption, restProps),
    onChange: event => _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_4__["default"].changeNote(event.target.value)
  }));
});
const _default = NotesField;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(NotesField, "NotesField", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\notes\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\notes\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/save-button/index.tsx":
/*!***************************************************************!*\
  !*** ./src/components/chords/add-chord/save-button/index.tsx ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../stores/add-chords-store */ "./src/stores/add-chords-store.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const SaveButton = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.CellButton, {
    centered: true,
    onClick: _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].saveChord
  }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0430\u043A\u043A\u043E\u0440\u0434");
});
const _default = SaveButton;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SaveButton, "SaveButton", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\save-button\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\save-button\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/chords/add-chord/startFret/index.tsx":
/*!*************************************************************!*\
  !*** ./src/components/chords/add-chord/startFret/index.tsx ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../stores/add-chords-store */ "./src/stores/add-chords-store.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const StartFretField = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(__signature__(() => {
  const fretsData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    let frets = [];

    for (let i = 0; i <= 8; i++) {
      frets.push(i);
    }

    return frets;
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.FormItem, {
    top: `Начальный лад`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.Select, {
    value: _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].startFret,
    options: fretsData.map(fret => ({
      label: fret.toString(),
      value: fret
    })),
    renderOption: ({
      option,
      ...restProps
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.CustomSelectOption, restProps),
    onChange: event => _stores_add_chords_store__WEBPACK_IMPORTED_MODULE_3__["default"].changeProperty('startFret', +event.target.value)
  }));
}, "useMemo{fretsData}"));
const _default = StartFretField;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(StartFretField, "StartFretField", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\startFret\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\chords\\add-chord\\startFret\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/common/dialogs/snackbar/index.tsx":
/*!**********************************************************!*\
  !*** ./src/components/common/dialogs/snackbar/index.tsx ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stores_snackbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../stores/snackbar */ "./src/stores/snackbar.ts");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_3__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const SnackbarContainer = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  const current = _stores_snackbar__WEBPACK_IMPORTED_MODULE_2__["default"].currentSnackbar;
  if (!current) return null;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_3__.Snackbar, {
    onClose: current.close
  }, current.message);
});
const _default = SnackbarContainer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SnackbarContainer, "SnackbarContainer", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\common\\dialogs\\snackbar\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\common\\dialogs\\snackbar\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/layout/page-layout.tsx":
/*!***********************************************!*\
  !*** ./src/components/layout/page-layout.tsx ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const Layout = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(__signature__(({
  children
}) => {
  const platform = (0,_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.usePlatform)();
  const hasHeader = platform !== _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.VKCOM;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.SplitLayout, {
    header: hasHeader && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.PanelHeader, {
      separator: false
    }),
    style: {
      justifyContent: "center"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.SplitCol, {
    width: '100%',
    maxWidth: '100%'
  }, children));
}, "usePlatform{platform}", () => [_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.usePlatform]));
const _default = Layout;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Layout, "Layout", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\layout\\page-layout.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\layout\\page-layout.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/navigation/mobile/index.tsx":
/*!****************************************************!*\
  !*** ./src/components/navigation/mobile/index.tsx ***!
  \****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_global_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../stores/global-store */ "./src/stores/global-store.ts");
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../pages */ "./src/pages.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const MobileNav = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Tabbar, null, _pages__WEBPACK_IMPORTED_MODULE_4__.pages.map(page => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.TabbarItem, {
    key: page.key,
    onClick: () => _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].setActiveStory(page.key),
    selected: _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].activeStory === page.key,
    "data-story": page.key,
    text: page.name
  }, page.iconComponent)));
});
const _default = MobileNav;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MobileNav, "MobileNav", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\navigation\\mobile\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\navigation\\mobile\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/views/add-track.tsx":
/*!********************************************!*\
  !*** ./src/components/views/add-track.tsx ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const AddTrackView = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.PanelHeader, null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0440\u0435\u043A"));
};

const _default = AddTrackView;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AddTrackView, "AddTrackView", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\add-track.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\add-track.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/views/admin/add-chords/index.tsx":
/*!*********************************************************!*\
  !*** ./src/components/views/admin/add-chords/index.tsx ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chords_add_chord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../chords/add-chord */ "./src/components/chords/add-chord/index.tsx");
/* harmony import */ var _common_dialogs_snackbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/dialogs/snackbar */ "./src/components/common/dialogs/snackbar/index.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const AddChordsView = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chords_add_chord__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_common_dialogs_snackbar__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

const _default = AddChordsView;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AddChordsView, "AddChordsView", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\admin\\add-chords\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\admin\\add-chords\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/views/admin/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/views/admin/index.tsx ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_global_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../stores/global-store */ "./src/stores/global-store.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const AdminView = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.PanelHeader, null, "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.CellButton, {
    onClick: () => _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].setActivePanel('addChords')
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u043A\u043A\u043E\u0440\u0434")));
});
const _default = AdminView;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AdminView, "AdminView", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\admin\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\admin\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/views/chords.tsx":
/*!*****************************************!*\
  !*** ./src/components/views/chords.tsx ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const ChordsView = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__.PanelHeader, null, "\u0410\u043A\u043A\u043E\u0440\u0434\u044B"));
};

const _default = ChordsView;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ChordsView, "ChordsView", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\chords.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\chords.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/views/favourites.tsx":
/*!*********************************************!*\
  !*** ./src/components/views/favourites.tsx ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const FavouritesView = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__.PanelHeader, null, "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"));
};

const _default = FavouritesView;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FavouritesView, "FavouritesView", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\favourites.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\favourites.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/views/tracks.tsx":
/*!*****************************************!*\
  !*** ./src/components/views/tracks.tsx ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const TracksView = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_0__.PanelHeader, null, "\u0422\u0440\u0435\u043A\u0438"), "tracks");
};

const _default = TracksView;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TracksView, "TracksView", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\tracks.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\tracks.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/views/view-list.tsx":
/*!********************************************!*\
  !*** ./src/components/views/view-list.tsx ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_global_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../stores/global-store */ "./src/stores/global-store.ts");
/* harmony import */ var _tracks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tracks */ "./src/components/views/tracks.tsx");
/* harmony import */ var _chords__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chords */ "./src/components/views/chords.tsx");
/* harmony import */ var _favourites__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./favourites */ "./src/components/views/favourites.tsx");
/* harmony import */ var _add_track__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-track */ "./src/components/views/add-track.tsx");
/* harmony import */ var _admin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin */ "./src/components/views/admin/index.tsx");
/* harmony import */ var _admin_add_chords__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./admin/add-chords */ "./src/components/views/admin/add-chords/index.tsx");
/* harmony import */ var _navigation_mobile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../navigation/mobile */ "./src/components/navigation/mobile/index.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};












const ViewList = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__.observer)(() => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Epic, {
    activeStory: _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].activeStory,
    tabbar: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_navigation_mobile__WEBPACK_IMPORTED_MODULE_10__["default"], null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.View, {
    id: "tracks",
    activePanel: _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].activePanel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    id: "tracks"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_tracks__WEBPACK_IMPORTED_MODULE_4__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.View, {
    id: "chords",
    activePanel: _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].activePanel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    id: "chords"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chords__WEBPACK_IMPORTED_MODULE_5__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.View, {
    id: "favourites",
    activePanel: _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].activePanel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    id: "favourites"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_favourites__WEBPACK_IMPORTED_MODULE_6__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.View, {
    id: "addTrack",
    activePanel: _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].activePanel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    id: "addTrack"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_add_track__WEBPACK_IMPORTED_MODULE_7__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.View, {
    id: "admin",
    activePanel: _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].activePanel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    id: "admin"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_admin__WEBPACK_IMPORTED_MODULE_8__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    id: "addChords"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_admin_add_chords__WEBPACK_IMPORTED_MODULE_9__["default"], null))));
});
const _default = ViewList;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ViewList, "ViewList", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\view-list.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\views\\view-list.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/components/vk/layout/header/heade-and-back/index.tsx":
/*!******************************************************************!*\
  !*** ./src/components/vk/layout/header/heade-and-back/index.tsx ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_global_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../stores/global-store */ "./src/stores/global-store.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const HeaderWithBack = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__.observer)(props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.PanelHeader, _extends({
    left: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.PanelHeaderClose, {
      onClick: () => _stores_global_store__WEBPACK_IMPORTED_MODULE_3__["default"].toMainPanel()
    })
  }, props), props.children);
});
const _default = HeaderWithBack;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(HeaderWithBack, "HeaderWithBack", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\vk\\layout\\header\\heade-and-back\\index.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\components\\vk\\layout\\header\\heade-and-back\\index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/pages.tsx":
/*!***********************!*\
  !*** ./src/pages.tsx ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pages": () => (/* binding */ pages)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vkontakte_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vkontakte/icons */ "@vkontakte/icons");
/* harmony import */ var _vkontakte_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_icons__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const pages = [{
  key: 'tracks',
  name: 'Треки',
  iconComponent: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_icons__WEBPACK_IMPORTED_MODULE_1__.Icon28PlaylistOutline, null)
}, {
  key: 'chords',
  name: 'Аккорды',
  iconComponent: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_icons__WEBPACK_IMPORTED_MODULE_1__.Icon28MusicOutline, null)
}, {
  key: 'favourites',
  name: 'Избранное',
  iconComponent: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_icons__WEBPACK_IMPORTED_MODULE_1__.Icon28FavoriteOutline, null)
}, {
  key: 'addTrack',
  name: 'Добавить трек',
  iconComponent: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_icons__WEBPACK_IMPORTED_MODULE_1__.Icon28AddSquareOutline, null)
}, {
  key: 'admin',
  name: 'Администрирование',
  iconComponent: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_icons__WEBPACK_IMPORTED_MODULE_1__.Icon28SettingsOutline, null)
}];
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(pages, "pages", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\pages.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express_useragent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-useragent */ "express-useragent");
/* harmony import */ var express_useragent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_useragent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _server_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server/database */ "./src/server/database.ts");
/* harmony import */ var _server_vk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server/vk */ "./src/server/vk.ts");
/* harmony import */ var _server_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./server/auth */ "./src/server/auth.ts");
/* harmony import */ var _ssr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ssr */ "./src/ssr.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






global['window'] = {};

const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
app.use(express_useragent__WEBPACK_IMPORTED_MODULE_1___default().express());
_server_database__WEBPACK_IMPORTED_MODULE_2__["default"].init();
app.get(/\.(js|css|map|ico)$/, express__WEBPACK_IMPORTED_MODULE_0___default()["static"](__dirname));
app.use('*', async (req, res) => {
  global['window'] = {};
  const isValidVk = (0,_server_vk__WEBPACK_IMPORTED_MODULE_3__["default"])(req);
  const adminToken = isValidVk ? await (0,_server_auth__WEBPACK_IMPORTED_MODULE_4__["default"])(req) : null;
  const html = (0,_ssr__WEBPACK_IMPORTED_MODULE_5__["default"])(req['useragent'].source, isValidVk, adminToken);
  res.contentType('text/html');
  res.status(200);
  return res.send(html);
});
app.listen('9000', () => {
  console.log('Сервер на порту 9000');
});
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(app, "app", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/server/auth.ts":
/*!****************************!*\
  !*** ./src/server/auth.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase-admin */ "firebase-admin");
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_admin__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/server/common.ts");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./database */ "./src/server/database.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const createFirebaseToken = async req => {
  const query = req.query;
  const vkId = !_common__WEBPACK_IMPORTED_MODULE_1__.isDev ? query && query.vk_user_id : '222834864';
  if (!vkId) return;
  const store = (0,firebase_admin__WEBPACK_IMPORTED_MODULE_0__.firestore)(_database__WEBPACK_IMPORTED_MODULE_2__["default"].app);
  const isAdmin = !(await store.collection('admins').where('vkId', '==', +vkId).get()).empty;
  if (!isAdmin) return;
  return await _database__WEBPACK_IMPORTED_MODULE_2__["default"].app.auth().createCustomToken(vkId);
};

const _default = createFirebaseToken;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(createFirebaseToken, "createFirebaseToken", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\auth.ts");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\auth.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/server/common.ts":
/*!******************************!*\
  !*** ./src/server/common.ts ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDev": () => (/* binding */ isDev)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const isDev = process.env.NODE_ENV === 'development';
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(isDev, "isDev", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\common.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/server/database.ts":
/*!********************************!*\
  !*** ./src/server/database.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase-admin */ "firebase-admin");
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_admin__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





class Database {
  constructor() {
    _defineProperty(this, "app", void 0);
  }

  init() {
    const config = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync((0,path__WEBPACK_IMPORTED_MODULE_2__.resolve)(__dirname, '..', 'private/service-account-key.json')).toString('utf8'));
    this.app = firebase_admin__WEBPACK_IMPORTED_MODULE_0___default().initializeApp({
      credential: firebase_admin__WEBPACK_IMPORTED_MODULE_0___default().credential.cert(config),
      databaseURL: "https://chords-7f150.firebaseio.com"
    });
    this.app.auth();
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}

const database = new Database();
const _default = database;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Database, "Database", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\database.ts");
  reactHotLoader.register(database, "database", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\database.ts");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\database.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/server/vk.ts":
/*!**************************!*\
  !*** ./src/server/vk.ts ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/server/common.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const config = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync((0,path__WEBPACK_IMPORTED_MODULE_3__.resolve)(__dirname, '..', 'private/vk-secret-key.json')).toString('utf8'));

const validateVkParams = req => {
  if (_common__WEBPACK_IMPORTED_MODULE_2__.isDev) return true;
  const query = req.query;
  let vkParams = [];
  const sign = query.sign;
  if (!sign) return false;

  for (let key in query) {
    if (key.startsWith('vk_')) {
      vkParams.push(`${key}=${query[key]}`);
    }
  }

  const vkParamsString = vkParams.join('&');
  const paramsHash = crypto__WEBPACK_IMPORTED_MODULE_0___default().createHmac('sha256', config.secret).update(vkParamsString).digest().toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=$/, '');
  return paramsHash === sign;
};

const _default = validateVkParams;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(config, "config", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\vk.ts");
  reactHotLoader.register(validateVkParams, "validateVkParams", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\vk.ts");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\server\\vk.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/ssr.tsx":
/*!*********************!*\
  !*** ./src/ssr.tsx ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vkui */ "@vkontakte/vkui");
/* harmony import */ var _vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./src/app.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const _default = (userAgent, validVk, adminToken) => {
  const jsx = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_vkontakte_vkui__WEBPACK_IMPORTED_MODULE_2__.SSRWrapper, {
    userAgent: userAgent
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_app__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  const reactHtml = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_1__.renderToString)(jsx);
  return getHtml(reactHtml, {
    validVk,
    adminToken
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);

const getHtml = (reactHtml, data) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <title>Аккорды</title>
        <link href="/main.css" rel="stylesheet">
    </head>
    <body>
        <script>
        debugger;
            window['adminToken'] = '${data.adminToken}';
            window['validVk'] = ${data.validVk};
        </script>

        <div id="root" class="vkui__root">${reactHtml}</div> 
        <script src="/main.js"></script>
    </body>
    </html>
    `;
};

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getHtml, "getHtml", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\ssr.tsx");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\ssr.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/stores/add-chords-store.ts":
/*!****************************************!*\
  !*** ./src/stores/add-chords-store.ts ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddChordsStore": () => (/* binding */ AddChordsStore),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "mobx");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _code_data_notes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../code/data/notes */ "./src/code/data/notes.ts");
/* harmony import */ var _global_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global-store */ "./src/stores/global-store.ts");
/* harmony import */ var _firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @firebase/firestore */ "@firebase/firestore");
/* harmony import */ var _firebase_firestore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _code_common_alerts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../code/common/alerts */ "./src/code/common/alerts.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const defauiltParams = {
  mode: 'add',
  instrument: 'guitar',
  note: _code_data_notes__WEBPACK_IMPORTED_MODULE_1__.notes[0],
  name: _code_data_notes__WEBPACK_IMPORTED_MODULE_1__.notes[0],
  startFret: 0,
  barre: false,
  guitarStrings: []
};
class AddChordsStore {
  constructor(params = defauiltParams) {
    _defineProperty(this, "mode", void 0);

    _defineProperty(this, "instrument", void 0);

    _defineProperty(this, "note", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "startFret", void 0);

    _defineProperty(this, "barre", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "guitarStrings", void 0);

    this.fillParams(params);
    (0,mobx__WEBPACK_IMPORTED_MODULE_0__.makeAutoObservable)(this, undefined, {
      deep: true
    });
    this.saveChord = this.saveChord.bind(this);
  }

  fillParams(params) {
    for (let prop in params) {
      this[prop] = params[prop];
    }

    if (!this.guitarStrings.length) {
      this.fillStrings();
    }
  }

  changeProperty(property, value) {
    this[property] = value;
  }

  changeNote(note) {
    this.note = note;
    this.name = this.note;
  }

  changeString(index, fret) {
    const string = this.guitarStrings.find(string => string.index === index);

    if (string) {
      string.fret = isNaN(fret) ? fret : +fret;
    }

    this.guitarStrings = [...this.guitarStrings];
  }

  changeInstrtument(instrument) {
    this.instrument = instrument;
    this.fillStrings();
  }

  fillStrings() {
    const guitarStringsCount = this.instrument === 'guitar' ? 6 : 4;
    this.guitarStrings = [];

    for (let i = 1; i <= guitarStringsCount; i++) {
      this.guitarStrings.push({
        index: i,
        fret: 0
      });
    }
  }

  async saveChord() {
    const firestore = _global_store__WEBPACK_IMPORTED_MODULE_2__["default"].firestore;
    const result = await (0,_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.addDoc)((0,_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(firestore, `chords/${this.note}/${this.name}`), this.chordParams);
    console.log(result);
    (0,_code_common_alerts__WEBPACK_IMPORTED_MODULE_4__.snackbar)('Добавили аккорд');
    this.fillParams(defauiltParams);
  }

  get chordParams() {
    const params = {
      mode: this.mode,
      instrument: this.instrument,
      note: this.note,
      name: this.name,
      startFret: this.startFret,
      barre: this.barre,
      guitarStrings: [...this.guitarStrings]
    };
    return params;
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
const store = new AddChordsStore();
const _default = store;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defauiltParams, "defauiltParams", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\add-chords-store.ts");
  reactHotLoader.register(AddChordsStore, "AddChordsStore", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\add-chords-store.ts");
  reactHotLoader.register(store, "store", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\add-chords-store.ts");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\add-chords-store.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/stores/global-store.ts":
/*!************************************!*\
  !*** ./src/stores/global-store.ts ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalStore": () => (/* binding */ GlobalStore),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "mobx");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _code_firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../code/firebase */ "./src/code/firebase/index.ts");
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages */ "./src/pages.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




class GlobalStore {
  constructor() {
    _defineProperty(this, "activeStory", _pages__WEBPACK_IMPORTED_MODULE_2__.pages[0].key);

    _defineProperty(this, "activePanel", _pages__WEBPACK_IMPORTED_MODULE_2__.pages[0].key);

    _defineProperty(this, "firebase", void 0);

    _defineProperty(this, "database", void 0);

    _defineProperty(this, "firestore", void 0);

    _defineProperty(this, "firebaseAnalitics", void 0);

    _defineProperty(this, "adminToken", void 0);

    _defineProperty(this, "validVk", void 0);

    const {
      app,
      database,
      firestore,
      analytics
    } = (0,_code_firebase__WEBPACK_IMPORTED_MODULE_1__["default"])();
    this.firebase = app;
    this.database = database;
    this.firestore = firestore; //this.firebaseAnalitics = analytics

    this.adminToken = global['window'] && global['window'].adminToken;
    this.validVk = global['window'] && global['window'].validVk;
    debugger;
    (0,mobx__WEBPACK_IMPORTED_MODULE_0__.makeObservable)(this, {
      activeStory: mobx__WEBPACK_IMPORTED_MODULE_0__.observable,
      activePanel: mobx__WEBPACK_IMPORTED_MODULE_0__.observable
    });
  }

  toMainPanel() {
    this.activePanel = this.activeStory;
  }

  setActiveStory(activeStory, panel = '') {
    this.activeStory = activeStory;
    this.activePanel = panel || activeStory;
  }

  setActivePanel(panel = '') {
    this.activePanel = panel;
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
var globalStore = new GlobalStore();
const _default = globalStore;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GlobalStore, "GlobalStore", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\global-store.ts");
  reactHotLoader.register(globalStore, "globalStore", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\global-store.ts");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\global-store.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/stores/snackbar.ts":
/*!********************************!*\
  !*** ./src/stores/snackbar.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnackbarsStore": () => (/* binding */ SnackbarsStore),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "mobx");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _code_common_guid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../code/common/guid */ "./src/code/common/guid.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



class SnackbarsStore {
  get currentSnackbar() {
    return this.snackbars[0];
  }

  constructor() {
    _defineProperty(this, "snackbars", []);

    (0,mobx__WEBPACK_IMPORTED_MODULE_0__.makeAutoObservable)(this);
  }

  showSnackbar(snackbar) {
    const id = (0,_code_common_guid__WEBPACK_IMPORTED_MODULE_1__.createGuid)();

    const close = () => {
      if (snackbar.callback) {
        snackbar.callback();
      }

      this.closeSnackbar(id);
    };

    const _snackbar = { ...snackbar,
      id,
      close
    };
    this.snackbars = [...this.snackbars, _snackbar];
    return _snackbar;
  }

  closeSnackbar(id) {
    this.snackbars = this.snackbars.filter(snackbar => snackbar.id !== id);
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
const store = new SnackbarsStore();
const _default = store;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SnackbarsStore, "SnackbarsStore", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\snackbar.ts");
  reactHotLoader.register(store, "store", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\snackbar.ts");
  reactHotLoader.register(_default, "default", "C:\\Programming\\vkapp\\\u0421hords\\chords-vk-app\\ChordsVkApp\\src\\stores\\snackbar.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./node_modules/@vkontakte/vkui/dist/vkui.css":
/*!****************************************************!*\
  !*** ./node_modules/@vkontakte/vkui/dist/vkui.css ***!
  \****************************************************/
/***/ (() => {



/***/ }),

/***/ "@firebase/firestore":
/*!**************************************!*\
  !*** external "@firebase/firestore" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@firebase/firestore");

/***/ }),

/***/ "@vkontakte/icons":
/*!***********************************!*\
  !*** external "@vkontakte/icons" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@vkontakte/icons");

/***/ }),

/***/ "@vkontakte/vkui":
/*!**********************************!*\
  !*** external "@vkontakte/vkui" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@vkontakte/vkui");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-useragent":
/*!************************************!*\
  !*** external "express-useragent" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-useragent");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase-admin");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/app");

/***/ }),

/***/ "firebase/database":
/*!************************************!*\
  !*** external "firebase/database" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/database");

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/firestore");

/***/ }),

/***/ "mobx":
/*!***********************!*\
  !*** external "mobx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("mobx");

/***/ }),

/***/ "mobx-react-lite":
/*!**********************************!*\
  !*** external "mobx-react-lite" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("mobx-react-lite");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=server.js.map