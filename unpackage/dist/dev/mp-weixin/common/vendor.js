(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!***************************************!*\
  !*** D:/uni/uni_phone/store/store.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));
var _http = __webpack_require__(/*! @/api/http.js */ 17);


var _index = _interopRequireDefault(__webpack_require__(/*! @/config/cookie-my/index.js */ 8));
var _publicFunction = __webpack_require__(/*! @/util/publicFunction */ 51);



var _index2 = _interopRequireDefault(__webpack_require__(/*! @/config/index */ 52));var _mutations;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    orderType: 'takein', // 0外卖  1自取
    // 加入购物车商品信息
    currentCard: _index.default.get('currentCard') || [],
    // 当前定位的位置
    currentLocation: _index.default.get('currentLocation') || {},
    currentStoreInfo: _index.default.get('currentStoreInfo') || {},
    historyUrl: _index.default.get('historyUrl') || {} },

  mutations: (_mutations = {}, _defineProperty(_mutations,


  'SET_ORDER_TYPE', function SET_ORDER_TYPE(state, type) {
    state.orderType = type;
  }), _defineProperty(_mutations,
  'SET_CURRENT_LOCATION', function SET_CURRENT_LOCATION(state, data) {
    state.currentLocation = data;
    _index.default.set('currentLocation', data);
  }), _defineProperty(_mutations,
  'SET_CURRENT_STORE', function SET_CURRENT_STORE(state, data) {
    state.currentStoreInfo = data;
    _index.default.set('currentStoreInfo', data);
    console.log(state.currentStoreInfo, '地址改变了');
  }), _defineProperty(_mutations,
  'SET_CURRENT_CARD', function SET_CURRENT_CARD(state, data) {
    state.currentCard = data;
    _index.default.set('currentCard', data);
  }), _defineProperty(_mutations,
  'SET_HISTORY_URL', function SET_HISTORY_URL(state, data) {
    // this.$store.state.historyUrl
    // this.$store.commit("SET_HISTORY_URL",{})
    state.historyUrl = data;
    _index.default.set('historyUrl', data);
  }), _mutations),

  actions: {
    // 获取appId 和 保存UserMAC     obj={BusinNo:newBusinNo,code:code} 登录的时候获取
    get_user: function get_user(_ref,

    obj) {var commit = _ref.commit;
      return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (

                    (0, _http.vipCard)(obj, 'UserSign'));case 3:response = _context.sent;
                  if (response.Data.hasOwnProperty('UserMAC')) {
                    // let seconds = 7200000 //两小时 秒
                    // let expires = new Date(new Date() * 1 + seconds * 1000)
                    _index.default.set('UserMACPhone', response.Data.UserMAC);
                  }
                  if (response.Data.hasOwnProperty('UserBind')) {
                    _index.default.set('isMember', response.Data.UserBind);
                  }
                  if (response.Data.hasOwnProperty('CardType')) {
                    _index.default.set('CardType', response.Data.CardType);
                  }

                  //主题模板
                  getApp().globalData.mainStyle = 'theme2';
                  _index.default.set('mainStyle', 'theme2');

                  resolve(response.Data.hasOwnProperty('AppId') ? response.Data.AppId : response.Data.hasOwnProperty('UserBind') ?
                  response.Data.UserBind : '');_context.next = 15;break;case 12:_context.prev = 12;_context.t0 = _context["catch"](0);

                  reject(_context.t0);case 15:case "end":return _context.stop();}}}, _callee, null, [[0, 12]]);}));return function (_x, _x2) {return _ref2.apply(this, arguments);};}());


    } } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 125:
/*!*************************************************!*\
  !*** D:/uni/uni_phone/util/codeChange/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var barcode = __webpack_require__(/*! ./barcode */ 126);
var qrcode = __webpack_require__(/*! ./qrcode */ 127);

// function convert_length(length) {
// 	return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
// }

function barc(id, code, width, height) {
  barcode.code128(wx.createCanvasContext(id), code, width, height);
}

function qrc(id, code, width, height) {
  qrcode.api.draw(code, {
    ctx: wx.createCanvasContext(id),
    width: width,
    height: height });

}

module.exports = {
  barcode: barc,
  qrcode: qrc };

/***/ }),

/***/ 126:
/*!***************************************************!*\
  !*** D:/uni/uni_phone/util/codeChange/barcode.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


!function () {
  var CHAR_TILDE = 126;
  var CODE_FNC1 = 102;

  var SET_STARTA = 103;
  var SET_STARTB = 104;
  var SET_STARTC = 105;
  var SET_SHIFT = 98;
  var SET_CODEA = 101;
  var SET_CODEB = 100;
  var SET_STOP = 106;


  var REPLACE_CODES = {
    CHAR_TILDE: CODE_FNC1 //~ corresponds to FNC1 in GS1-128 standard
  };

  var CODESET = {
    ANY: 1,
    AB: 2,
    A: 3,
    B: 4,
    C: 5 };


  function getBytes(str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
      bytes.push(str.charCodeAt(i));
    }
    return bytes;
  }

  exports.code128 = function (ctx, text, width, height) {

    width = parseInt(width);

    height = parseInt(height);

    var codes = stringToCode128(text);

    var g = new Graphics(ctx, width, height);

    var barWeight = g.area.width / ((codes.length - 3) * 11 + 35);

    var x = g.area.left;
    var y = g.area.top;
    for (var i = 0; i < codes.length; i++) {
      var c = codes[i];
      //two bars at a time: 1 black and 1 white
      for (var bar = 0; bar < 8; bar += 2) {
        var barW = PATTERNS[c][bar] * barWeight;
        // var barH = height - y - this.border;
        var barH = height - y;
        var spcW = PATTERNS[c][bar + 1] * barWeight;

        //no need to draw if 0 width
        if (barW > 0) {
          g.fillFgRect(x, y, barW, barH);
        }

        x += barW + spcW;
      }
    }

    ctx.draw();
  };


  function stringToCode128(text) {

    var barc = {
      currcs: CODESET.C };


    var bytes = getBytes(text);
    //decide starting codeset
    var index = bytes[0] == CHAR_TILDE ? 1 : 0;

    var csa1 = bytes.length > 0 ? codeSetAllowedFor(bytes[index++]) : CODESET.AB;
    var csa2 = bytes.length > 0 ? codeSetAllowedFor(bytes[index++]) : CODESET.AB;
    barc.currcs = getBestStartSet(csa1, csa2);
    barc.currcs = perhapsCodeC(bytes, barc.currcs);

    //if no codeset changes this will end up with bytes.length+3
    //start, checksum and stop
    var codes = new Array();

    switch (barc.currcs) {
      case CODESET.A:
        codes.push(SET_STARTA);
        break;
      case CODESET.B:
        codes.push(SET_STARTB);
        break;
      default:
        codes.push(SET_STARTC);
        break;}



    for (var i = 0; i < bytes.length; i++) {
      var b1 = bytes[i]; //get the first of a pair
      //should we translate/replace
      if (b1 in REPLACE_CODES) {
        codes.push(REPLACE_CODES[b1]);
        i++; //jump to next
        b1 = bytes[i];
      }

      //get the next in the pair if possible
      var b2 = bytes.length > i + 1 ? bytes[i + 1] : -1;

      codes = codes.concat(codesForChar(b1, b2, barc.currcs));
      //code C takes 2 chars each time
      if (barc.currcs == CODESET.C) i++;
    }

    //calculate checksum according to Code 128 standards
    var checksum = codes[0];
    for (var weight = 1; weight < codes.length; weight++) {
      checksum += weight * codes[weight];
    }
    codes.push(checksum % 103);

    codes.push(SET_STOP);

    //encoding should now be complete
    return codes;

    function getBestStartSet(csa1, csa2) {
      //tries to figure out the best codeset
      //to start with to get the most compact code
      var vote = 0;
      vote += csa1 == CODESET.A ? 1 : 0;
      vote += csa1 == CODESET.B ? -1 : 0;
      vote += csa2 == CODESET.A ? 1 : 0;
      vote += csa2 == CODESET.B ? -1 : 0;
      //tie goes to B due to my own predudices
      return vote > 0 ? CODESET.A : CODESET.B;
    }

    function perhapsCodeC(bytes, codeset) {
      for (var i = 0; i < bytes.length; i++) {
        var b = bytes[i];
        if ((b < 48 || b > 57) && b != CHAR_TILDE)
        return codeset;
      }
      return CODESET.C;
    }

    //chr1 is current byte
    //chr2 is the next byte to process. looks ahead.
    function codesForChar(chr1, chr2, currcs) {
      var result = [];
      var shifter = -1;

      if (charCompatible(chr1, currcs)) {
        if (currcs == CODESET.C) {
          if (chr2 == -1) {
            shifter = SET_CODEB;
            currcs = CODESET.B;
          } else
          if (chr2 != -1 && !charCompatible(chr2, currcs)) {
            //need to check ahead as well
            if (charCompatible(chr2, CODESET.A)) {
              shifter = SET_CODEA;
              currcs = CODESET.A;
            } else
            {
              shifter = SET_CODEB;
              currcs = CODESET.B;
            }
          }
        }
      } else
      {
        //if there is a next char AND that next char is also not compatible
        if (chr2 != -1 && !charCompatible(chr2, currcs)) {
          //need to switch code sets
          switch (currcs) {
            case CODESET.A:
              shifter = SET_CODEB;
              currcs = CODESET.B;
              break;
            case CODESET.B:
              shifter = SET_CODEA;
              currcs = CODESET.A;
              break;}

        } else
        {
          //no need to shift code sets, a temporary SHIFT will suffice
          shifter = SET_SHIFT;
        }
      }

      //ok some type of shift is nessecary
      if (shifter != -1) {
        result.push(shifter);
        result.push(codeValue(chr1));
      } else
      {
        if (currcs == CODESET.C) {
          //include next as well
          result.push(codeValue(chr1, chr2));
        } else
        {
          result.push(codeValue(chr1));
        }
      }
      barc.currcs = currcs;

      return result;
    }
  }

  //reduce the ascii code to fit into the Code128 char table
  function codeValue(chr1, chr2) {
    if (typeof chr2 == "undefined") {
      return chr1 >= 32 ? chr1 - 32 : chr1 + 64;
    } else
    {
      return parseInt(String.fromCharCode(chr1) + String.fromCharCode(chr2));
    }
  }

  function charCompatible(chr, codeset) {
    var csa = codeSetAllowedFor(chr);
    if (csa == CODESET.ANY) return true;
    //if we need to change from current
    if (csa == CODESET.AB) return true;
    if (csa == CODESET.A && codeset == CODESET.A) return true;
    if (csa == CODESET.B && codeset == CODESET.B) return true;
    return false;
  }

  function codeSetAllowedFor(chr) {
    if (chr >= 48 && chr <= 57) {
      //0-9
      return CODESET.ANY;
    } else
    if (chr >= 32 && chr <= 95) {
      //0-9 A-Z
      return CODESET.AB;
    } else
    {
      //if non printable
      return chr < 32 ? CODESET.A : CODESET.B;
    }
  }

  var Graphics = function Graphics(ctx, width, height) {

    this.width = width;
    this.height = height;
    this.quiet = Math.round(this.width / 40);

    this.border_size = 0;
    this.padding_width = 0;

    this.area = {
      width: width - this.padding_width * 2 - this.quiet * 2,
      height: height - this.border_size * 2,
      top: this.border_size - 4,
      left: this.padding_width + this.quiet };


    this.ctx = ctx;
    this.fg = "#000000";
    this.bg = "#ffffff";

    // fill background
    this.fillBgRect(0, 0, width, height);

    // fill center to create border
    this.fillBgRect(0, this.border_size, width, height - this.border_size * 2);
  };

  //use native color
  Graphics.prototype._fillRect = function (x, y, width, height, color) {
    this.ctx.setFillStyle(color);
    this.ctx.fillRect(x, y, width, height);
  };

  Graphics.prototype.fillFgRect = function (x, y, width, height) {
    this._fillRect(x, y, width, height, this.fg);
  };

  Graphics.prototype.fillBgRect = function (x, y, width, height) {
    this._fillRect(x, y, width, height, this.bg);
  };

  var PATTERNS = [
  [2, 1, 2, 2, 2, 2, 0, 0], // 0
  [2, 2, 2, 1, 2, 2, 0, 0], // 1
  [2, 2, 2, 2, 2, 1, 0, 0], // 2
  [1, 2, 1, 2, 2, 3, 0, 0], // 3
  [1, 2, 1, 3, 2, 2, 0, 0], // 4
  [1, 3, 1, 2, 2, 2, 0, 0], // 5
  [1, 2, 2, 2, 1, 3, 0, 0], // 6
  [1, 2, 2, 3, 1, 2, 0, 0], // 7
  [1, 3, 2, 2, 1, 2, 0, 0], // 8
  [2, 2, 1, 2, 1, 3, 0, 0], // 9
  [2, 2, 1, 3, 1, 2, 0, 0], // 10
  [2, 3, 1, 2, 1, 2, 0, 0], // 11
  [1, 1, 2, 2, 3, 2, 0, 0], // 12
  [1, 2, 2, 1, 3, 2, 0, 0], // 13
  [1, 2, 2, 2, 3, 1, 0, 0], // 14
  [1, 1, 3, 2, 2, 2, 0, 0], // 15
  [1, 2, 3, 1, 2, 2, 0, 0], // 16
  [1, 2, 3, 2, 2, 1, 0, 0], // 17
  [2, 2, 3, 2, 1, 1, 0, 0], // 18
  [2, 2, 1, 1, 3, 2, 0, 0], // 19
  [2, 2, 1, 2, 3, 1, 0, 0], // 20
  [2, 1, 3, 2, 1, 2, 0, 0], // 21
  [2, 2, 3, 1, 1, 2, 0, 0], // 22
  [3, 1, 2, 1, 3, 1, 0, 0], // 23
  [3, 1, 1, 2, 2, 2, 0, 0], // 24
  [3, 2, 1, 1, 2, 2, 0, 0], // 25
  [3, 2, 1, 2, 2, 1, 0, 0], // 26
  [3, 1, 2, 2, 1, 2, 0, 0], // 27
  [3, 2, 2, 1, 1, 2, 0, 0], // 28
  [3, 2, 2, 2, 1, 1, 0, 0], // 29
  [2, 1, 2, 1, 2, 3, 0, 0], // 30
  [2, 1, 2, 3, 2, 1, 0, 0], // 31
  [2, 3, 2, 1, 2, 1, 0, 0], // 32
  [1, 1, 1, 3, 2, 3, 0, 0], // 33
  [1, 3, 1, 1, 2, 3, 0, 0], // 34
  [1, 3, 1, 3, 2, 1, 0, 0], // 35
  [1, 1, 2, 3, 1, 3, 0, 0], // 36
  [1, 3, 2, 1, 1, 3, 0, 0], // 37
  [1, 3, 2, 3, 1, 1, 0, 0], // 38
  [2, 1, 1, 3, 1, 3, 0, 0], // 39
  [2, 3, 1, 1, 1, 3, 0, 0], // 40
  [2, 3, 1, 3, 1, 1, 0, 0], // 41
  [1, 1, 2, 1, 3, 3, 0, 0], // 42
  [1, 1, 2, 3, 3, 1, 0, 0], // 43
  [1, 3, 2, 1, 3, 1, 0, 0], // 44
  [1, 1, 3, 1, 2, 3, 0, 0], // 45
  [1, 1, 3, 3, 2, 1, 0, 0], // 46
  [1, 3, 3, 1, 2, 1, 0, 0], // 47
  [3, 1, 3, 1, 2, 1, 0, 0], // 48
  [2, 1, 1, 3, 3, 1, 0, 0], // 49
  [2, 3, 1, 1, 3, 1, 0, 0], // 50
  [2, 1, 3, 1, 1, 3, 0, 0], // 51
  [2, 1, 3, 3, 1, 1, 0, 0], // 52
  [2, 1, 3, 1, 3, 1, 0, 0], // 53
  [3, 1, 1, 1, 2, 3, 0, 0], // 54
  [3, 1, 1, 3, 2, 1, 0, 0], // 55
  [3, 3, 1, 1, 2, 1, 0, 0], // 56
  [3, 1, 2, 1, 1, 3, 0, 0], // 57
  [3, 1, 2, 3, 1, 1, 0, 0], // 58
  [3, 3, 2, 1, 1, 1, 0, 0], // 59
  [3, 1, 4, 1, 1, 1, 0, 0], // 60
  [2, 2, 1, 4, 1, 1, 0, 0], // 61
  [4, 3, 1, 1, 1, 1, 0, 0], // 62
  [1, 1, 1, 2, 2, 4, 0, 0], // 63
  [1, 1, 1, 4, 2, 2, 0, 0], // 64
  [1, 2, 1, 1, 2, 4, 0, 0], // 65
  [1, 2, 1, 4, 2, 1, 0, 0], // 66
  [1, 4, 1, 1, 2, 2, 0, 0], // 67
  [1, 4, 1, 2, 2, 1, 0, 0], // 68
  [1, 1, 2, 2, 1, 4, 0, 0], // 69
  [1, 1, 2, 4, 1, 2, 0, 0], // 70
  [1, 2, 2, 1, 1, 4, 0, 0], // 71
  [1, 2, 2, 4, 1, 1, 0, 0], // 72
  [1, 4, 2, 1, 1, 2, 0, 0], // 73
  [1, 4, 2, 2, 1, 1, 0, 0], // 74
  [2, 4, 1, 2, 1, 1, 0, 0], // 75
  [2, 2, 1, 1, 1, 4, 0, 0], // 76
  [4, 1, 3, 1, 1, 1, 0, 0], // 77
  [2, 4, 1, 1, 1, 2, 0, 0], // 78
  [1, 3, 4, 1, 1, 1, 0, 0], // 79
  [1, 1, 1, 2, 4, 2, 0, 0], // 80
  [1, 2, 1, 1, 4, 2, 0, 0], // 81
  [1, 2, 1, 2, 4, 1, 0, 0], // 82
  [1, 1, 4, 2, 1, 2, 0, 0], // 83
  [1, 2, 4, 1, 1, 2, 0, 0], // 84
  [1, 2, 4, 2, 1, 1, 0, 0], // 85
  [4, 1, 1, 2, 1, 2, 0, 0], // 86
  [4, 2, 1, 1, 1, 2, 0, 0], // 87
  [4, 2, 1, 2, 1, 1, 0, 0], // 88
  [2, 1, 2, 1, 4, 1, 0, 0], // 89
  [2, 1, 4, 1, 2, 1, 0, 0], // 90
  [4, 1, 2, 1, 2, 1, 0, 0], // 91
  [1, 1, 1, 1, 4, 3, 0, 0], // 92
  [1, 1, 1, 3, 4, 1, 0, 0], // 93
  [1, 3, 1, 1, 4, 1, 0, 0], // 94
  [1, 1, 4, 1, 1, 3, 0, 0], // 95
  [1, 1, 4, 3, 1, 1, 0, 0], // 96
  [4, 1, 1, 1, 1, 3, 0, 0], // 97
  [4, 1, 1, 3, 1, 1, 0, 0], // 98
  [1, 1, 3, 1, 4, 1, 0, 0], // 99
  [1, 1, 4, 1, 3, 1, 0, 0], // 100
  [3, 1, 1, 1, 4, 1, 0, 0], // 101
  [4, 1, 1, 1, 3, 1, 0, 0], // 102
  [2, 1, 1, 4, 1, 2, 0, 0], // 103
  [2, 1, 1, 2, 1, 4, 0, 0], // 104
  [2, 1, 1, 2, 3, 2, 0, 0], // 105
  [2, 3, 3, 1, 1, 1, 2, 0] // 106
  ];
}();

/***/ }),

/***/ 127:
/*!**************************************************!*\
  !*** D:/uni/uni_phone/util/codeChange/qrcode.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var QR = function () {

  // alignment pattern
  var adelta = [
  0, 11, 15, 19, 23, 27, 31, // force 1 pat
  16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24,
  26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28];


  // version block
  var vpat = [
  0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d,
  0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9,
  0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75,
  0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64,
  0x541, 0xc69];


  // final format bits with mask: level << 3 | mask
  var fmtword = [
  0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976, //L
  0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0, //M
  0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed, //Q
  0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b //H
  ];

  // 4 per version: number of blocks 1,2; data width; ecc width
  var eccblocks = [
  1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17,
  1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28,
  1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22,
  1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16,
  1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22,
  2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28,
  2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26,
  2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26,
  2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24,
  2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28,
  4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24,
  2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28,
  4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22,
  3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24,
  5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24,
  5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30,
  1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28,
  5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28,
  3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26,
  3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28,
  4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30,
  2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24,
  4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30,
  6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30,
  8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30,
  10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30,
  8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30,
  3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30,
  7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30,
  5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30,
  13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30,
  17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30,
  17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30,
  13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30,
  12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30,
  6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30,
  17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30,
  4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30,
  20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30,
  19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30];


  // Galois field log table
  var glog = [
  0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b,
  0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71,
  0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45,
  0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6,
  0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88,
  0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40,
  0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d,
  0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57,
  0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18,
  0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e,
  0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61,
  0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2,
  0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6,
  0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a,
  0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7,
  0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf];


  // Galios field exponent table
  var gexp = [
  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26,
  0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0,
  0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23,
  0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1,
  0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0,
  0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2,
  0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce,
  0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc,
  0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54,
  0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73,
  0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff,
  0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41,
  0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6,
  0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09,
  0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16,
  0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00];


  // Working buffers:
  // data input and ecc append, image working buffer, fixed part of image, run lengths for badness
  var strinbuf = [],eccbuf = [],qrframe = [],framask = [],rlens = [];
  // Control values - width is based on version, last 4 are from table.
  var version, width, neccblk1, neccblk2, datablkw, eccblkwid;
  var ecclevel = 2;
  // set bit to indicate cell in qrframe is immutable.  symmetric around diagonal
  function setmask(x, y)
  {
    var bt;
    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }
    // y*y = 1+3+5...
    bt = y;
    bt *= y;
    bt += y;
    bt >>= 1;
    bt += x;
    framask[bt] = 1;
  }

  // enter alignment pattern - black to qrframe, white to mask (later black frame merged to mask)
  function putalign(x, y)
  {
    var j;

    qrframe[x + width * y] = 1;
    for (j = -2; j < 2; j++) {
      qrframe[x + j + width * (y - 2)] = 1;
      qrframe[x - 2 + width * (y + j + 1)] = 1;
      qrframe[x + 2 + width * (y + j)] = 1;
      qrframe[x + j + 1 + width * (y + 2)] = 1;
    }
    for (j = 0; j < 2; j++) {
      setmask(x - 1, y + j);
      setmask(x + 1, y - j);
      setmask(x - j, y - 1);
      setmask(x + j, y + 1);
    }
  }

  //========================================================================
  // Reed Solomon error correction
  // exponentiation mod N
  function modnn(x)
  {
    while (x >= 255) {
      x -= 255;
      x = (x >> 8) + (x & 255);
    }
    return x;
  }

  var genpoly = [];

  // Calculate and append ECC data to data block.  Block is in strinbuf, indexes to buffers given.
  function appendrs(data, dlen, ecbuf, eclen)
  {
    var i, j, fb;

    for (i = 0; i < eclen; i++) {
      strinbuf[ecbuf + i] = 0;}
    for (i = 0; i < dlen; i++) {
      fb = glog[strinbuf[data + i] ^ strinbuf[ecbuf]];
      if (fb != 255) /* fb term is non-zero */
        for (j = 1; j < eclen; j++) {
          strinbuf[ecbuf + j - 1] = strinbuf[ecbuf + j] ^ gexp[modnn(fb + genpoly[eclen - j])];} else

      for (j = ecbuf; j < ecbuf + eclen; j++) {
        strinbuf[j] = strinbuf[j + 1];}
      strinbuf[ecbuf + eclen - 1] = fb == 255 ? 0 : gexp[modnn(fb + genpoly[0])];
    }
  }

  //========================================================================
  // Frame data insert following the path rules

  // check mask - since symmetrical use half.
  function ismasked(x, y)
  {
    var bt;
    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }
    bt = y;
    bt += y * y;
    bt >>= 1;
    bt += x;
    return framask[bt];
  }

  //========================================================================
  //  Apply the selected mask out of the 8.
  function applymask(m)
  {
    var x, y, r3x, r3y;

    switch (m) {
      case 0:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(x + y & 1) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;}}
        break;
      case 1:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(y & 1) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;}}
        break;
      case 2:
        for (y = 0; y < width; y++) {
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!r3x && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }}
        break;
      case 3:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3)
          r3y = 0;
          for (r3x = r3y, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!r3x && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 4:
        for (y = 0; y < width; y++) {
          for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) {
              r3x = 0;
              r3y = !r3y;
            }
            if (!r3y && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }}
        break;
      case 5:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3)
          r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!((x & y & 1) + !(!r3x | !r3y)) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 6:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3)
          r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!((x & y & 1) + (r3x && r3x == r3y) & 1) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 7:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3)
          r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!((r3x && r3x == r3y) + (x + y & 1) & 1) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }
        }
        break;}

    return;
  }

  // Badness coefficients.
  var N1 = 3,N2 = 3,N3 = 40,N4 = 10;

  // Using the table of the length of each run, calculate the amount of bad image 
  // - long runs or those that look like finders; called twice, once each for X and Y
  function badruns(length)
  {
    var i;
    var runsbad = 0;
    for (i = 0; i <= length; i++) {
      if (rlens[i] >= 5)
      runsbad += N1 + rlens[i] - 5;}
    // BwBBBwB as in finder
    for (i = 3; i < length - 1; i += 2) {
      if (rlens[i - 2] == rlens[i + 2] &&
      rlens[i + 2] == rlens[i - 1] &&
      rlens[i - 1] == rlens[i + 1] &&
      rlens[i - 1] * 3 == rlens[i]
      // white around the black pattern? Not part of spec
      && (rlens[i - 3] == 0 // beginning
      || i + 3 > length // end
      || rlens[i - 3] * 3 >= rlens[i] * 4 || rlens[i + 3] * 3 >= rlens[i] * 4))

      runsbad += N3;}
    return runsbad;
  }

  // Calculate how bad the masked image is - blocks, imbalance, runs, or finders.
  function badcheck()
  {
    var x, y, h, b, b1;
    var thisbad = 0;
    var bw = 0;

    // blocks of same color.
    for (y = 0; y < width - 1; y++) {
      for (x = 0; x < width - 1; x++) {
        if (qrframe[x + width * y] && qrframe[x + 1 + width * y] &&
        qrframe[x + width * (y + 1)] && qrframe[x + 1 + width * (y + 1)] || // all black
        !(qrframe[x + width * y] || qrframe[x + 1 + width * y] ||
        qrframe[x + width * (y + 1)] || qrframe[x + 1 + width * (y + 1)])) // all white
          thisbad += N2;}}

    // X runs
    for (y = 0; y < width; y++) {
      rlens[0] = 0;
      for (h = b = x = 0; x < width; x++) {
        if ((b1 = qrframe[x + width * y]) == b)
        rlens[h]++;else

        rlens[++h] = 1;
        b = b1;
        bw += b ? 1 : -1;
      }
      thisbad += badruns(h);
    }

    // black/white imbalance
    if (bw < 0)
    bw = -bw;

    var big = bw;
    var count = 0;
    big += big << 2;
    big <<= 1;
    while (big > width * width) {
      big -= width * width, count++;}
    thisbad += count * N4;

    // Y runs
    for (x = 0; x < width; x++) {
      rlens[0] = 0;
      for (h = b = y = 0; y < width; y++) {
        if ((b1 = qrframe[x + width * y]) == b)
        rlens[h]++;else

        rlens[++h] = 1;
        b = b1;
      }
      thisbad += badruns(h);
    }
    return thisbad;
  }

  function genframe(instring)
  {
    var x, y, k, t, v, i, j, m;

    // find the smallest version that fits the string
    t = instring.length;
    version = 0;
    do {
      version++;
      k = (ecclevel - 1) * 4 + (version - 1) * 16;
      neccblk1 = eccblocks[k++];
      neccblk2 = eccblocks[k++];
      datablkw = eccblocks[k++];
      eccblkwid = eccblocks[k];
      k = datablkw * (neccblk1 + neccblk2) + neccblk2 - 3 + (version <= 9);
      if (t <= k)
      break;
    } while (version < 40);

    // FIXME - insure that it fits insted of being truncated
    width = 17 + 4 * version;

    // allocate, clear and setup data structures
    v = datablkw + (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
    for (t = 0; t < v; t++) {
      eccbuf[t] = 0;}
    strinbuf = instring.slice(0);

    for (t = 0; t < width * width; t++) {
      qrframe[t] = 0;}

    for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {
      framask[t] = 0;}

    // insert finders - black to frame, white to mask
    for (t = 0; t < 3; t++) {
      k = 0;
      y = 0;
      if (t == 1)
      k = width - 7;
      if (t == 2)
      y = width - 7;
      qrframe[y + 3 + width * (k + 3)] = 1;
      for (x = 0; x < 6; x++) {
        qrframe[y + x + width * k] = 1;
        qrframe[y + width * (k + x + 1)] = 1;
        qrframe[y + 6 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 6)] = 1;
      }
      for (x = 1; x < 5; x++) {
        setmask(y + x, k + 1);
        setmask(y + 1, k + x + 1);
        setmask(y + 5, k + x);
        setmask(y + x + 1, k + 5);
      }
      for (x = 2; x < 4; x++) {
        qrframe[y + x + width * (k + 2)] = 1;
        qrframe[y + 2 + width * (k + x + 1)] = 1;
        qrframe[y + 4 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 4)] = 1;
      }
    }

    // alignment blocks
    if (version > 1) {
      t = adelta[version];
      y = width - 7;
      for (;;) {
        x = width - 7;
        while (x > t - 3) {
          putalign(x, y);
          if (x < t)
          break;
          x -= t;
        }
        if (y <= t + 9)
        break;
        y -= t;
        putalign(6, y);
        putalign(y, 6);
      }
    }

    // single black
    qrframe[8 + width * (width - 8)] = 1;

    // timing gap - mask only
    for (y = 0; y < 7; y++) {
      setmask(7, y);
      setmask(width - 8, y);
      setmask(7, y + width - 7);
    }
    for (x = 0; x < 8; x++) {
      setmask(x, 7);
      setmask(x + width - 8, 7);
      setmask(x, width - 8);
    }

    // reserve mask-format area
    for (x = 0; x < 9; x++) {
      setmask(x, 8);}
    for (x = 0; x < 8; x++) {
      setmask(x + width - 8, 8);
      setmask(8, x);
    }
    for (y = 0; y < 7; y++) {
      setmask(8, y + width - 7);}

    // timing row/col
    for (x = 0; x < width - 14; x++) {
      if (x & 1) {
        setmask(8 + x, 6);
        setmask(6, 8 + x);
      } else
      {
        qrframe[8 + x + width * 6] = 1;
        qrframe[6 + width * (8 + x)] = 1;
      }}

    // version block
    if (version > 6) {
      t = vpat[version - 7];
      k = 17;
      for (x = 0; x < 6; x++) {
        for (y = 0; y < 3; y++, k--) {
          if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
            qrframe[5 - x + width * (2 - y + width - 11)] = 1;
            qrframe[2 - y + width - 11 + width * (5 - x)] = 1;
          } else
          {
            setmask(5 - x, 2 - y + width - 11);
            setmask(2 - y + width - 11, 5 - x);
          }}}
    }

    // sync mask bits - only set above for white spaces, so add in black bits
    for (y = 0; y < width; y++) {
      for (x = 0; x <= y; x++) {
        if (qrframe[x + width * y])
        setmask(x, y);}}

    // convert string to bitstream
    // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)
    v = strinbuf.length;

    // string to array
    for (i = 0; i < v; i++) {
      eccbuf[i] = strinbuf.charCodeAt(i);}
    strinbuf = eccbuf.slice(0);

    // calculate max string length
    x = datablkw * (neccblk1 + neccblk2) + neccblk2;
    if (v >= x - 2) {
      v = x - 2;
      if (version > 9)
      v--;
    }

    // shift and repack to insert length prefix
    i = v;
    if (version > 9) {
      strinbuf[i + 2] = 0;
      strinbuf[i + 3] = 0;
      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 3] |= 255 & t << 4;
        strinbuf[i + 2] = t >> 4;
      }
      strinbuf[2] |= 255 & v << 4;
      strinbuf[1] = v >> 4;
      strinbuf[0] = 0x40 | v >> 12;
    } else
    {
      strinbuf[i + 1] = 0;
      strinbuf[i + 2] = 0;
      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 2] |= 255 & t << 4;
        strinbuf[i + 1] = t >> 4;
      }
      strinbuf[1] |= 255 & v << 4;
      strinbuf[0] = 0x40 | v >> 4;
    }
    // fill to end with pad pattern
    i = v + 3 - (version < 10);
    while (i < x) {
      strinbuf[i++] = 0xec;
      // buffer has room    if (i == x)      break;
      strinbuf[i++] = 0x11;
    }

    // calculate and append ECC

    // calculate generator polynomial
    genpoly[0] = 1;
    for (i = 0; i < eccblkwid; i++) {
      genpoly[i + 1] = 1;
      for (j = i; j > 0; j--) {
        genpoly[j] = genpoly[j] ?
        genpoly[j - 1] ^ gexp[modnn(glog[genpoly[j]] + i)] : genpoly[j - 1];}
      genpoly[0] = gexp[modnn(glog[genpoly[0]] + i)];
    }
    for (i = 0; i <= eccblkwid; i++) {
      genpoly[i] = glog[genpoly[i]];} // use logs for genpoly[] to save calc step

    // append ecc to data buffer
    k = x;
    y = 0;
    for (i = 0; i < neccblk1; i++) {
      appendrs(y, datablkw, k, eccblkwid);
      y += datablkw;
      k += eccblkwid;
    }
    for (i = 0; i < neccblk2; i++) {
      appendrs(y, datablkw + 1, k, eccblkwid);
      y += datablkw + 1;
      k += eccblkwid;
    }
    // interleave blocks
    y = 0;
    for (i = 0; i < datablkw; i++) {
      for (j = 0; j < neccblk1; j++) {
        eccbuf[y++] = strinbuf[i + j * datablkw];}
      for (j = 0; j < neccblk2; j++) {
        eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];}
    }
    for (j = 0; j < neccblk2; j++) {
      eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];}
    for (i = 0; i < eccblkwid; i++) {
      for (j = 0; j < neccblk1 + neccblk2; j++) {
        eccbuf[y++] = strinbuf[x + i + j * eccblkwid];}}
    strinbuf = eccbuf;

    // pack bits into frame avoiding masked area.
    x = y = width - 1;
    k = v = 1; // up, minus
    /* inteleaved data and ecc codes */
    m = (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
    for (i = 0; i < m; i++) {
      t = strinbuf[i];
      for (j = 0; j < 8; j++, t <<= 1) {
        if (0x80 & t)
        qrframe[x + width * y] = 1;
        do {// find next fill position
          if (v)
          x--;else
          {
            x++;
            if (k) {
              if (y != 0)
              y--;else
              {
                x -= 2;
                k = !k;
                if (x == 6) {
                  x--;
                  y = 9;
                }
              }
            } else
            {
              if (y != width - 1)
              y++;else
              {
                x -= 2;
                k = !k;
                if (x == 6) {
                  x--;
                  y -= 8;
                }
              }
            }
          }
          v = !v;
        } while (ismasked(x, y));
      }
    }

    // save pre-mask copy of frame
    strinbuf = qrframe.slice(0);
    t = 0; // best
    y = 30000; // demerit
    // for instead of while since in original arduino code
    // if an early mask was "good enough" it wouldn't try for a better one
    // since they get more complex and take longer.
    for (k = 0; k < 8; k++) {
      applymask(k); // returns black-white imbalance
      x = badcheck();
      if (x < y) {// current mask better than previous best?
        y = x;
        t = k;
      }
      if (t == 7)
      break; // don't increment i to a void redoing mask
      qrframe = strinbuf.slice(0); // reset for next pass
    }
    if (t != k) // redo best mask - none good enough, last wasn't t
      applymask(t);

    // add in final mask/ecclevel bytes
    y = fmtword[t + (ecclevel - 1 << 3)];
    // low byte
    for (k = 0; k < 8; k++, y >>= 1) {
      if (y & 1) {
        qrframe[width - 1 - k + width * 8] = 1;
        if (k < 6)
        qrframe[8 + width * k] = 1;else

        qrframe[8 + width * (k + 1)] = 1;
      }}
    // high byte
    for (k = 0; k < 7; k++, y >>= 1) {
      if (y & 1) {
        qrframe[8 + width * (width - 7 + k)] = 1;
        if (k)
        qrframe[6 - k + width * 8] = 1;else

        qrframe[7 + width * 8] = 1;
      }}

    // return image
    return qrframe;
  }

  var _canvas = null,
  _size = null;

  var api = {

    get ecclevel() {
      return ecclevel;
    },

    set ecclevel(val) {
      ecclevel = val;
    },

    get size() {
      return _size;
    },

    set size(val) {
      _size = val;
    },

    get canvas() {
      return _canvas;
    },

    set canvas(el) {
      _canvas = el;
    },

    getFrame: function getFrame(string) {
      return genframe(string);
    },

    draw: function draw(string, canvas, size, ecc) {

      ecclevel = ecc || ecclevel;
      canvas = canvas || _canvas;

      if (!canvas) {
        console.warn('No canvas provided to draw QR code in!');
        return;
      }

      size = size || _size || Math.min(canvas.width, canvas.height);

      var frame = genframe(string),
      ctx = canvas.ctx,
      px = Math.round(size / (width + 8));

      var roundedSize = px * (width + 8),
      offset = Math.floor((size - roundedSize) / 2);

      size = roundedSize;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setFillStyle('#000000');

      for (var i = 0; i < width; i++) {
        for (var j = 0; j < width; j++) {
          if (frame[j * width + i]) {
            ctx.fillRect(px * (4 + i) + offset, px * (4 + j) + offset, px, px);
          }
        }
      }
      ctx.draw();
    } };


  module.exports = {
    api: api };


}();

/***/ }),

/***/ 13:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 14);

/***/ }),

/***/ 14:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 15);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 142:
/*!***************************************!*\
  !*** D:/uni/uni_phone/config/util.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.refundTypeList = exports.bindList = void 0;var bindList = [
{ name: '姓名', value: '0' },
{ name: '生日', value: '1' },
{ name: '性别', value: '2' },
{ name: '密码', value: '3' }];exports.bindList = bindList;


var refundTypeList = [
{ name: '不想要/不喜欢', value: '1' },
{ name: '已经买了', value: '2' },
{ name: '其它', value: '3' }];exports.refundTypeList = refundTypeList;

/***/ }),

/***/ 15:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 16:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 17:
/*!************************************!*\
  !*** D:/uni/uni_phone/api/http.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.vipCard = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _index = _interopRequireDefault(__webpack_require__(/*! @/config/cookie-my/index.js */ 8));
var _store = _interopRequireDefault(__webpack_require__(/*! ../store/store.js */ 12));
var _index2 = _interopRequireDefault(__webpack_require__(/*! ../router/index.js */ 18));
var _index3 = _interopRequireDefault(__webpack_require__(/*! @/config/index */ 52));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var vipCard = function vipCard(data, ViewKay, businNo) {
  return new Promise(function (resolve, reject) {
    uni.getProvider({
      service: 'oauth',
      success: function () {var _success = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {var providerNew, UserMACPhone, BusinNo, urlaspx, url;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                  providerNew = res.provider[0];if (!
                  providerNew) {_context.next = 5;break;}return _context.abrupt("return",

                  reject());case 5:

                  // h5
                  UserMACPhone = _index.default.get('UserMACPhone');
                  BusinNo = _index.default.get('BusinNo') ? _index.default.get('BusinNo') : businNo;
                  // let BusinNo = '1'
                  urlaspx = 'RenderMobile.aspx';
                  url = _index3.default.url + urlaspx + '?BusinNo=' + BusinNo + '&ViewKay=' + ViewKay + '&UserMAC=' +
                  UserMACPhone;

                  uni.showLoading({
                    title: '加载中' });

                  uni.request({
                    url: url,
                    data: data,
                    method: 'POST',
                    success: function success(response) {
                      // console.log(response, 'response')
                      if (response.data.Message === '请登录') {
                        // return
                        NOMAC();
                      }
                      var success = response.data.Success;
                      var isTip = response.data.hasOwnProperty('Success');
                      if (isTip) {
                        if (success) {
                          uni.hideLoading();
                          return resolve(response.data);
                        } else {
                          console.log(response.data.Message);
                          uni.showToast({
                            title: response.data.Message,
                            icon: 'none' });

                          uni.hideLoading();
                          return reject(response.data.Message || '操作失败');
                        }
                      } else {
                        uni.hideLoading();
                        return resolve(response.data);
                      }
                    },
                    fail: function fail(error) {
                      console.log(error, 'error');
                      var errors = '';
                      if (error.toString().search('TypeError') || error.toString().search('500')) {
                        errors = '获取请求失败';
                      } else if (typeof error == 'string') {
                        errors = error;
                      } else if (error.toString() === '请登录') {
                        errors = '';
                      } else {
                        errors = '获取请求失败';
                      }
                      uni.showToast({
                        title: errors,
                        icon: 'none' });

                      uni.hideLoading();
                      return reject(errors);
                    },
                    complete: function complete() {
                      // uni.hideLoading();
                    } });case 11:case "end":return _context.stop();}}}, _callee);}));function success(_x) {return _success.apply(this, arguments);}return success;}() });





  });
};exports.vipCard = vipCard;

function NOMAC() {
  uni.clearStorageSync();
  var url = document.location.toString();
  var arrUrl = url.split("?");
  var para = arrUrl[1];
  para = para.split("&"); //获取url的参数
  para.forEach(function (D, index) {//删除原本url上的code
    if (D.indexOf('code') > -1) {
      para.splice(index, 1);
    }
  });

  para = para.join(',');
  var currentUrl = arrUrl[0] + '?' + para;
  _index.default.set('currentUrl', currentUrl);

  // let headUrl = window.location.protocol + "//" + window.location.host + '/#/GrantMiddle?BusinNo=' + Cookies.get('BusinNo')
  var headUrl = ( true ? 'http://localhost:8080/' : undefined) +
  '#/GrantMiddle?BusinNo=' + _index.default.get('BusinNo');
  _store.default.dispatch('get_user', {
    BusinNo: _index.default.get('BusinNo') }).
  then(function (appId) {
    if (appId) {
      _index2.default.push({
        path: '/Grant',
        query: {
          appId: appId,
          redirect_uri: headUrl } });


    } else {
      uni.showToast({
        title: '获取appId失败!',
        icon: 'none' });

    }
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!****************************************!*\
  !*** D:/uni/uni_phone/router/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _modules = _interopRequireDefault(__webpack_require__(/*! ./modules */ 19));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _uniSimpleRouter = _interopRequireDefault(__webpack_require__(/*! uni-simple-router */ 23));

var _store = _interopRequireDefault(__webpack_require__(/*! ../store/store.js */ 12));
var _index = _interopRequireDefault(__webpack_require__(/*! @/config/cookie-my/index.js */ 8));
var _publicFunction = __webpack_require__(/*! ../util/publicFunction */ 51);



var _index2 = _interopRequireDefault(__webpack_require__(/*! @/config/index */ 52));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

_vue.default.use(_uniSimpleRouter.default);
//初始化

// encodeURI: false,
var router = new _uniSimpleRouter.default({
  routes: _toConsumableArray(_modules.default) //路由表
});

//全局路由前置守卫
router.beforeEach(function (to, from, next) {
  uni.getProvider({
    service: 'oauth',
    success: function () {var _success = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {var providerNew, GetQuery, newBusinNo, UserMACPhone, obj, currentUrl, headUrl, appId;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                providerNew = res.provider[0];
                if (_index.default.get('mainColor')) {
                  // 保存主题色
                  getApp().globalData.mainColor = _index.default.get('mainColor');
                }if (!
                providerNew) {_context.next = 8;break;}
                // 小程序
                getApp().globalData.mainStyle = 'theme2';
                _index.default.set('mainStyle', 'theme2');
                next();_context.next = 45;break;case 8:

                // h5
                if (_index.default.get('mainStyle')) {
                  getApp().globalData.mainStyle = _index.default.get('mainStyle');
                }
                getApp().globalData.mainStyle = 'theme2';
                _index.default.set('mainStyle', 'theme2');

                GetQuery = (0, _publicFunction.GetQueryString)('BusinNo');
                // let newBusinNo = GetQuery ? GetQuery : Cookie.get('BusinNo')
                newBusinNo = '1';
                UserMACPhone = _index.default.get('UserMACPhone');
                UserMACPhone = UserMACPhone == 'undefined' ? '' : UserMACPhone;
                UserMACPhone = UserMACPhone == 'null' ? '' : UserMACPhone;


                if (!to.query.hasOwnProperty('BusinNo') && newBusinNo && to.path !== '/GrantMiddle' && to.path !== '/Grant') {
                  // 给每个页面加?BusinNo
                  obj = {};
                  Object.assign(obj, to.query);
                  Object.assign(obj, {
                    BusinNo: newBusinNo });

                  next({
                    path: to.path,
                    query: obj });

                }

                currentUrl = (0, _publicFunction.setUrlDelCode)();if (!

                newBusinNo) {_context.next = 44;break;}
                // Cookie.set('BusinNo', newBusinNo)
                _index.default.set('BusinNo', '1');if (!(
                to.path !== '/pages/error/index' && to.path !== '/Grant' && to.path !== '/GrantMiddle' && !UserMACPhone)) {_context.next = 41;break;}
                currentUrl = (0, _publicFunction.setUrlDelCode)();
                _index.default.set('currentUrl', currentUrl);

                headUrl = ( true ? 'http://localhost:9000/' : undefined) +
                '#/GrantMiddle?BusinNo=' + newBusinNo; //调回到固定页面
                if (!(
                UserMACPhone && UserMACPhone !== null && UserMACPhone !== undefined && UserMACPhone !== '')) {_context.next = 28;break;}
                next();_context.next = 39;break;case 28:

                // uni.clearStorageSync();
                //重新登录清除缓存
                _store.default.commit("SET_HISTORY_URL", {});_context.prev = 29;_context.next = 32;return (

                  _store.default.dispatch('get_user', {
                    BusinNo: newBusinNo }));case 32:appId = _context.sent;

                if (appId) {
                  next({
                    path: '/Grant',
                    query: {
                      appId: appId,
                      redirect_uri: headUrl } });


                } else {
                  uni.showToast({
                    title: '获取appId失败',
                    icon: 'none' });

                }_context.next = 39;break;case 36:_context.prev = 36;_context.t0 = _context["catch"](29);

                // 		//获取 获取appId 失败，加一个按钮，让用户手动重新获取这个接口
                if (to.path === '/pages/error/index') {
                  next();
                } else {
                  next({
                    path: '/pages/error/index',
                    query: {
                      redirect_uri: currentUrl,
                      title: '获取appId 失败' } });


                }case 39:_context.next = 42;break;case 41:



                next();case 42:_context.next = 45;break;case 44:

                if (to.path === '/pages/error/index') {
                  next();
                } else {
                  // 没有商户编号
                  next({
                    path: '/pages/error/index',
                    query: {
                      redirect_uri: currentUrl,
                      title: '商户编号为空' } });


                }case 45:case "end":return _context.stop();}}}, _callee, null, [[29, 36]]);}));function success(_x) {return _success.apply(this, arguments);}return success;}() });



});
// 全局路由后置守卫
router.afterEach(function (to, from) {});var _default =
router;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!************************************************!*\
  !*** D:/uni/uni_phone/router/modules/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var files = __webpack_require__(20);
var modules = [];
files.keys().forEach(function (key) {
  if (key === './index.js') return;
  var item = files(key).default;
  modules.push.apply(modules, _toConsumableArray(item));
});var _default =

modules;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***************************************************************!*\
  !*** D:/uni/uni_phone/router/modules sync nonrecursive \.js$ ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./home.js": 21,
	"./index.js": 19,
	"./other.js": 22
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 20;

/***/ }),

/***/ 207:
/*!**********************************************************!*\
  !*** D:/uni/uni_phone/pages/shoppingMall/list/public.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.goodListPublic = void 0;var goodListPublic = {
  data: function data() {
    return {
      valueSearch: '',
      list: [
        // {
        // 	ImgList: ['/img/norder.4ec0662e.png'],
        // 	Name: '5323232323232323423232323232323555',
        // 	SalePrice: '80',
        // 	SaleCnt: '200',
        // 	SID: 2222
        // },
        // {
        // 	ImgList: ['/img/norder.4ec0662e.png'],
        // 	Name: '5323232323232323423232323232323555',
        // 	SalePrice: '80',
        // 	SaleCnt: '200',
        // 	SID: 1111
        // },{
        // 	ImgList: ['/img/norder.4ec0662e.png'],
        // 	Name: '5323232323232323423232323232323555',
        // 	SalePrice: '80',
        // 	SaleCnt: '200',
        // 	SID: 1111
        // },
      ],

      sidebarList: [],
      loading: true };

  } };exports.goodListPublic = goodListPublic;

/***/ }),

/***/ 21:
/*!***********************************************!*\
  !*** D:/uni/uni_phone/router/modules/home.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var home = [{
  // path: '/pages/shoppingMall/index',
  path: '/pages/shoppingMall/login',
  aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
  name: 'login',
  meta: {
    title: '首页' } },


{
  path: '/pages/shoppingMall/index',
  // aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
  name: 'shoppingMallHome',
  meta: {
    title: '商城' } },


{
  path: '/pages/shoppingMall/menu_naixue/menu/menu',
  name: 'menu',
  meta: {
    title: '点餐' } },


{
  path: '/pages/error/index',
  name: 'error',
  meta: {
    title: '错误页面' } },

{
  path: '/pages/home',
  name: 'vip',
  meta: {
    title: '会员中心' } },


{
  path: '/pages/shoppingMall/shoppingCart/index',
  name: 'shoppingCart',
  meta: {
    title: '购物车' } },


{
  path: '/Grant',
  name: 'Grant',
  meta: {
    title: '授权页面' } },

{
  path: '/GrantMiddle',
  name: 'GrantMiddle',
  meta: {
    title: '授权页面' } }];var _default =



home;exports.default = _default;

/***/ }),

/***/ 22:
/*!************************************************!*\
  !*** D:/uni/uni_phone/router/modules/other.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var other = [
// 会员中心
{
  path: '/pages/vip/surplus',
  name: 'surplus',
  meta: {
    title: '微卡交易记录' } },


{
  path: '/pages/vip/allMyOrder',
  name: 'allMyOrder',
  meta: {
    title: '订单列表' } },

{
  path: '/pages/vip/weiFull',
  name: 'weiFull',
  meta: {
    title: '微卡充值' } },

{
  path: '/pages/vip/payCode',
  name: 'payCode',
  meta: {
    title: '付款码' } },

{
  path: '/pages/vip/applyLeader',
  name: 'applyLeader',
  meta: {
    title: '申请团长' } },

{
  path: '/pages/vip/spreadList',
  name: 'spreadList',
  meta: {
    title: '我的分享' } },

{
  path: '/pages/vip/myFans',
  name: 'myFans',
  meta: {
    title: '我的粉丝' } },

{
  path: '/pages/vip/FootPrint',
  name: 'FootPrint',
  meta: {
    title: '足迹' } },

{
  path: '/pages/vip/SpreadOrder',
  name: 'SpreadOrder',
  meta: {
    title: '我的推广订单' } },

{
  path: '/pages/vip/myEarnings',
  name: 'myEarnings',
  meta: {
    title: '我的收益' } },

{
  path: '/pages/vip/rebate',
  name: 'rebate',
  meta: {
    title: '会员申请提现' } },

{
  path: '/pages/shoppingMall/order/orderInfo',
  name: 'orderInfo',
  meta: {
    title: '订单详情' } },

{
  path: '/pages/shoppingMall/order/refundReason',
  name: 'refundReason',
  meta: {
    title: '申请退款' } },

{
  path: '/pages/shoppingMall/order/confirmCard',
  name: 'confirmCard',
  meta: {
    title: '卡支付' } },

{
  path: '/pages/shoppingMall/order/confirmOrder',
  name: 'confirmOrder',
  meta: {
    title: '确定订单' } },

{
  path: '/pages/shoppingMall/order/paySuccess',
  name: 'paySuccess',
  meta: {
    title: '支付成功' } },

{
  path: '/pages/shoppingMall/list/couponList',
  name: 'couponList',
  meta: {
    title: '优惠券商城' } },

{
  path: '/pages/shoppingMall/list/goodsList',
  name: 'goodsList',
  meta: {
    title: '商品列表' } },

{
  path: '/pages/shoppingMall/list/infoCoupon',
  name: 'infoCoupon',
  meta: {
    title: '优惠券详情' } },

{
  path: '/pages/shoppingMall/list/infoGood',
  name: 'infoGood',
  meta: {
    title: '商品详情' } },

{
  path: '/pages/shoppingMall/evaluation/goodEvaluationList',
  name: 'goodEvaluationList',
  meta: {
    title: '商品评价列表' } },

{
  path: '/pages/shoppingMall/seckill/index',
  name: 'seckill',
  meta: {
    title: '秒杀活动' } },

{
  path: '/pages/integralMall/index',
  name: 'integralMall',
  meta: {
    title: '积分商城' } },

{
  path: '/pages/vip/bind/index',
  name: 'bindCard',
  meta: {
    title: '绑定卡' } },

{ //仿奈雪 商品列表
  path: '/pages/shoppingMall/menu_naixue/menu/menu',
  name: 'menuGoodsList',
  meta: {
    title: '商品列表' } },

{ //个人中心-我的地址
  path: '/pages/myAddress/myAddress',
  name: 'myAddress',
  meta: {
    title: '我的地址' } },

{ //个人中心-新增我的地址
  path: '/pages/myAddress/add',
  name: 'myAdd',
  meta: {
    title: '新增地址' } },

{ //login页面 买茶送包 
  path: '/pages/shoppingMall/menu_naixue/invite',
  name: 'invite',
  meta: {
    title: '活动助力' } }];var _default =



other;exports.default = _default;

/***/ }),

/***/ 23:
/*!****************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.RouterMount = exports.default = void 0;var _util = __webpack_require__(/*! ./helpers/util */ 24);
var _util2 = __webpack_require__(/*! ./vueRouter/util */ 28);
var _util3 = __webpack_require__(/*! ./appRouter/util */ 33);
var _util4 = __webpack_require__(/*! ./appletsRouter/util */ 34);
var compile = _interopRequireWildcard(__webpack_require__(/*! ./helpers/compile */ 35));
var _config = __webpack_require__(/*! ./helpers/config */ 25);
var _warn = __webpack_require__(/*! ./helpers/warn */ 27);
var _hooks = __webpack_require__(/*! ./lifeCycle/hooks */ 36);
var _hooks2 = __webpack_require__(/*! ./appRouter/hooks */ 37);
var _hooks3 = __webpack_require__(/*! ./appletsRouter/hooks */ 39);
var _uniNav = __webpack_require__(/*! ./appRouter/uniNav */ 38);
var _appletsNav = __webpack_require__(/*! ./appletsRouter/appletsNav */ 40);
var _base = __webpack_require__(/*! ./vueRouter/base */ 26);
var _appletsPatch = __webpack_require__(/*! ./patch/applets-patch */ 29);
var _appPatch = __webpack_require__(/*! ./patch/app-patch */ 41);
var _mixins = _interopRequireDefault(__webpack_require__(/*! ./helpers/mixins */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}







_config.Global.H5RouterReady = new Promise(function (resolve) {return _config.Global.RouterReadyPromise = resolve;});var

Router = /*#__PURE__*/function () {
  function Router(arg) {_classCallCheck(this, Router);
    Router.$root = this;
    _config.Global.Router = this; //全局缓存一个对象，不必使用时都传递
    this.CONFIG = (0, _util.formatConfig)(arg);
    this.loadded = false;
    this.methods = _config.methods;
    this.lifeCycle = _config.lifeCycle;
    _hooks.registerRouterHooks.call(this); //注册全局Router生命钩子
    if ((0, _util.appPlatform)() === 'H5') {
      H5PATCH.setLoadingStatus(this.CONFIG.h5);
    }
  }_createClass(Router, [{ key: "_pushTo",









    /**
                                            * 用户非h5端外 核心跳转方法
                                            * @param {customRule} param 最终格式化后的跳转路径
                                            */value: function _pushTo(_ref)



    {var _this = this;var toRule = _ref.toRule,ags = _ref.ags;
      return new Promise(function (resolve) {
        //这里是为兼容APP,非APP端是在切换动画完成后响应(https://github.com/SilurianYang/uni-simple-router/issues/16)
        compile.APP(function () {
          _this.loadded = true;
        });
        var URLQuery = (0, _util.formatURLQuery)("?".concat(toRule.query));
        var url = "".concat(toRule.url).concat(URLQuery);
        uni[_this.methods[ags.rule.NAVTYPE]]({
          url: url,
          complete: function complete() {
            _this.loadded = true;
            resolve({
              status: true,
              showId: Router.showId,
              complete: true });

          } });

      });
    }
    /**
       * @param {Object} replace vue-router的跳转方式
       * @param {Object} rule	需要跳转到的路由匹配规则
       * @param {Object} type	对应的官方跳转模式
       */ }, { key: "_H5PushTo", value: function _H5PushTo(
    replace, rule, type) {
      if (this.$route == null) {
        return (0, _warn.err)("h5\u7AEF\u8DEF\u7531\u4E3A\u5C31\u7EEA\uFF0C\u8BF7\u68C0\u67E5\u8C03\u7528\u4EE3\u7801");
      }
      rule = (0, _util2.formatUserRule)(rule, this.selfRoutes, this.CONFIG);
      var objPath = (0, _util2.strPathToObjPath)(rule);
      objPath.type = type;
      this.$route[replace](objPath);
    }
    /**动态的导航到一个新 URL 保留浏览历史
       * navigateTo
       * @param {Object} rule
       */ }, { key: "push", value: function push(
    rule) {
      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return this._H5PushTo('push', rule, 'navigateTo');
        case 'APP':
          return _hooks2.transitionTo.call(this, rule, 'push', _uniNav.uniPushTo);
        case 'APPLETS':
          return _hooks3.appletsTransitionTo.call(this, rule, 'push', _appletsNav.appletsUniPushTo);}

    }
    /**动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
       * redirectTo
       * @param {Object} rule
       */ }, { key: "replace", value: function replace(
    rule) {
      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return this._H5PushTo('replace', rule, 'redirectTo');
        case 'APP':
          return _hooks2.transitionTo.call(this, rule, 'replace', _uniNav.uniPushTo);
        case 'APPLETS':
          return _hooks3.appletsTransitionTo.call(this, rule, 'replace', _appletsNav.appletsUniPushTo);}

    }
    /**动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
       * 	reLaunch
       * @param {Object} rule
       */ }, { key: "replaceAll", value: function replaceAll(
    rule) {
      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return this._H5PushTo('replace', rule, 'reLaunch');
        case 'APP':
          return _hooks2.transitionTo.call(this, rule, 'replaceAll', _uniNav.uniPushTo);
        case 'APPLETS':
          return _hooks3.appletsTransitionTo.call(this, rule, 'replaceAll', _appletsNav.appletsUniPushTo);}

    }
    /**动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
       * @param {Object} rule
       */ }, { key: "pushTab", value: function pushTab(
    rule) {
      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return this._H5PushTo('replace', rule, 'switchTab');
        case 'APP':
          return _hooks2.transitionTo.call(this, rule, 'pushTab', _uniNav.uniPushTo);
        case 'APPLETS':
          return _hooks3.appletsTransitionTo.call(this, rule, 'pushTab', _appletsNav.appletsUniPushTo);}

    }
    /**
       * 返回到指定层级页面上
       */ }, { key: "back", value: function back()
    {var backLayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;var delta = arguments.length > 1 ? arguments[1] : undefined;
      if (backLayer.constructor != Number) {
        return (0, _warn.err)(
        "返回层级参数必须是一个Number类型且必须大于1：" + backLayer);

      }
      compile.H5(function () {
        H5PATCH.on('historyBack', {
          backLayer: backLayer,
          delta: delta });

      });
      compile.notH5(function () {
        _config.Global.backLayerC = backLayer; //告诉路由需要返回几层
        uni.navigateBack({
          delta: backLayer });

      });
    }
    // TODO 目前来不及做啊 有很多事情 版本也很久没更新了
    // async addRoutes(routes){
    // 	if(appPlatform() === 'H5'){
    // 		await Global.H5RouterReady;
    // 		this.CONFIG.routes=this.CONFIG.routes.concat(routes);
    // 		const formatRts= fromatRoutes(routes, true, this.CONFIG.h5);
    // 		this.selfRoutes={...this.selfRoutes||{},...formatRts};
    // 		const Routes= diffRouter(this,Global.vueRouter , this.CONFIG.h5.useUniConfig,Object.values(formatRts));
    // 		console.log(Routes)
    // 		await timeout(20);
    // 		Global.vueRouter.addRoutes(Routes);
    // 	}else{
    // 		warn(`非H5端没有此api ‘addRoutes’ `)
    // 	}
    // }

    /**
     * 获取当前页面下的 Route 信息
     * 
     * @param {Object} Vim 当前开发者可以传递一个 vue 组件对象 来获取当前下的 Route 信息
     */ }, { key: "getPageRoute", value: function getPageRoute(
    Vim) {
      var pages = getCurrentPages();
      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return _util2.H5GetPageRoute.call(this, pages, Vim);
        case 'APP':
          return (0, _util3.APPGetPageRoute)(pages, Vim);
        case 'APPLETS':
          return (0, _util4.AppletsPageRoute)(pages, Vim);}

    } }, { key: "beforeEach", value: function beforeEach(
    fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.beforeHooks, fn);
    } }, { key: "afterEach", value: function afterEach(
    fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.afterHooks, fn);
    } }, { key: "$Route", get: function get() {return this.getPageRoute();} /**
                                                                             * app 获取底部tabbar拦截实例
                                                                             */ }, { key: "$holdTab", get: function get() {return _config.Global.$holdTab;} }]);return Router;}();
Router.install = function (Vue) {
  (0, _mixins.default)(Vue, Router);
  Object.defineProperty(Vue.prototype, "$Router", {
    get: function get() {
      return Router.$root;
    } });

  Object.defineProperty(Vue.prototype, "$Route", {
    get: function get() {
      return Router.$root.getPageRoute(this);
    } });

};var _default =
Router;
/**
         * 
         * @param {VueComponent } Vim vue实例对象
         * @param {dom} el	dom节点选择器 
         */exports.default = _default;
var RouterMount = function RouterMount(Vim, el) {
  switch ((0, _util.appPlatform)(true)) {
    case 'APP':
      (0, _appPatch.appMount)(Vim, el);
      break;
    case 'APPLETS':
      (0, _appletsPatch.appletsMount)(Vim, el);
      break;
    case 'H5':
      _base.vueMount.push({
        Vim: Vim,
        el: el });

      break;
    default:
      (0, _warn.warn)("\u7CDF\u7CD5\uFF01\uFF01\uFF01\u8FD8\u6709\u5176\u4ED6\u7684\u6267\u884C\u73AF\u5883\uFF1F\uFF1F\uFF1F\u6CA1\u542C\u8BF4\u8FC7\u554A\u3002\u4E00\u8138\u61F5\u903C\uFF1F\uFF1F\uFF1F\u52A0QQ\u7FA4\u95EE\u95EE\uFF1A769241495");
      break;}

};exports.RouterMount = RouterMount;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!***********************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/helpers/util.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.timeout = exports.strObjToJsonToStr = exports.copyObject = exports.formatURLQuery = exports.resolveRule = exports.encodeURI = exports.normalizeParams = exports.exactRule = exports.parseQueryD = exports.parseQueryN = exports.parseQuery = exports.filter = exports.queryMp = exports.formatConfig = exports.noop = exports.appPlatform = exports.isObject = exports.isH5 = void 0;var _config = __webpack_require__(/*! ./config.js */ 25);




var _base = __webpack_require__(/*! ../vueRouter/base.js */ 26);


var _warn = __webpack_require__(/*! ./warn.js */ 27);function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * 当前是不是H5运行环境
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */
var isH5 = function isH5() {
  return typeof window !== "undefined" && typeof document !== "undefined";
};
/** 
    * 判断当前变量是否为Object
    * @param {Object} strObj
    */exports.isH5 = isH5;
var isObject = function isObject(strObj) {
  return strObj.toString() === '[object Object]' && strObj.constructor === Object;
};
/**
    * 获取当前运行平台
    * @param {Boolean} applets 默认false  true时所有小程序平台统一返回 APPLETS
    */exports.isObject = isObject;
var appPlatform = function appPlatform() {var applets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var platform = '';


























  platform = 'WEIXIN';






  if (applets) {

    platform = 'APPLETS';

  }

  return platform;
};
/**
    * 定义一个空方法 如果最后一个参数为true则打印所有参数
    * @param  {...any} args 
    */exports.appPlatform = appPlatform;
var noop = function noop() {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
  if (args[args.length - 1] === true) {
    (0, _warn.log)(args);
  }
};
/**
    * 格式化基础配置信息 通过new Router传递过来的参数
    */exports.noop = noop;
var formatConfig = function formatConfig(userConfig) {
  if (!userConfig.routes || userConfig.routes.constructor !== Array) {
    return (0, _warn.err)("\u8DEF\u7531\u53C2\u6570 'routes' \u5FC5\u987B\u4F20\u9012 \r\n\r\n".concat(JSON.stringify(userConfig)));
  }
  if (userConfig.h5 != null && userConfig.h5.constructor !== Object) {
    return (0, _warn.err)("h5\u53C2\u6570\u4F20\u9012\u9519\u8BEF\uFF0C\u5E94\u8BE5\u662F\u4E00\u4E2A 'Object' \u7C7B\u578B \u793A\u4F8B\uFF1A\r\n\r\n".concat(JSON.stringify(_config.baseConfig.h5)));
  }
  var config = Object.create(null);
  for (var key in _config.baseConfig) {
    if (userConfig[key] != null) {
      if (userConfig[key].constructor === Object) {
        config[key] = _objectSpread({},
        _config.baseConfig[key], {},
        userConfig[key]);

      } else if (key == 'routes') {//需要加入已知的白名单
        config[key] = [].concat(_toConsumableArray(_config.baseConfig[key]), _toConsumableArray(userConfig[key]), _toConsumableArray(_base.builtIn));
      } else {
        config[key] = userConfig[key];
      }
    } else {
      config[key] = _config.baseConfig[key];
    }
  }
  return config;
};
/**递归查找当前page路径对应的vue组件
    * @param {Object} Vim
    */exports.formatConfig = formatConfig;
var queryMp = function queryMp(Vim) {
  if (Vim.constructor.name == 'Vue') {
    Vim.$options.page = '';
    Vim.$options.ONLAUNCH = true;
    return Vim.$options;
  } else {
    if (Object.keys(Vim).length < 6) {
      return Vim;
    }
    if (Vim.$mp && Vim.$mp.page) {
      return Vim.$mp;
    }
    return queryMp(Vim.$parent);
  }
};exports.queryMp = queryMp;
var filter = function filter(str) {
  str += "";
  str = str.replace(/%/g, "%25");
  str = str.replace(/\+/g, "%2B");
  str = str.replace(/ /g, "%20");
  str = str.replace(/\//g, "%2F");
  str = str.replace(/\?/g, "%3F");
  str = str.replace(/&/g, "%26");
  str = str.replace(/\=/g, "%3D");
  str = str.replace(/#/g, "%23");
  return str;
};
/**
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.filter = filter;
var parseQuery = function parseQuery(routerName, query) {var Encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    return parseQueryN(routerName, query, Encode);
  }
  return parseQueryD(routerName, query, Encode);
};
/**
    * 使用encodeURI:true的情况	需要进行编码后再传递，解码等等 可以传递深度对象并会在路径后面加入一个query=
    * 
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.parseQuery = parseQuery;
var parseQueryN = function parseQueryN(routerName, query, Encode) {
  if (Encode) {
    return {
      url: routerName,
      query: JSON.parse(decodeURIComponent(query.replace(/^query=/, ''))) };

  } else {
    return {
      url: routerName,
      query: "query=".concat(encodeURIComponent(JSON.stringify(query))) };

  }
};
/**
    * 使用encodeURI:false的情况 直接格式化为普通的queryURl参数形式传递即可 扁平深度对象
    * 
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.parseQueryN = parseQueryN;
var parseQueryD = function parseQueryD(routerName, query, Encode) {
  if (Encode) {
    var obj = {};
    var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2;
    }
    return {
      url: routerName,
      query: obj };

  } else {
    var encodeArr = [];
    for (var attr in query) {
      var encodeStr = '';
      if (query[attr].constructor == Object) {
        encodeStr = parseQueryD(routerName, query[attr], Encode).query;
        encodeArr.push(encodeStr);
      } else {
        encodeStr = filter(query[attr]);
        encodeArr.push("".concat(attr, "=").concat(encodeStr));
      }
    }
    return {
      url: routerName,
      query: encodeArr.join("&") };

  }
};exports.parseQueryD = parseQueryD;

var exactRule = function exactRule(cloneRule, routes, ruleKey) {var getRule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var params = {};
  var i = 0;
  while (true) {
    var item = routes[i];
    if (item == null) {
      if (!getRule) {
        (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u672A\u67E5\u627E\u5230 '".concat(ruleKey, "' \u4E3A '").concat(cloneRule[ruleKey], "'"));
      }
      return {
        path: '',
        name: '' };

    }
    if (item[ruleKey] != null && item[ruleKey] === cloneRule[ruleKey]) {
      if (!getRule) {
        params.url = item['path'];
        params.rule = item;
        if (isH5()) {//如果是h5 则使用优先使用自定义路径名称
          params.url = item['aliasPath'] || item['path'];
        }
        return params;
      }
      return item;
    }
    i++;
  }
};exports.exactRule = exactRule;

var normalizeParams = function normalizeParams(cloneRule, routes) {
  var params = {};
  if (cloneRule.constructor === String) {
    var rule = {};
    rule.path = cloneRule;
    rule.query = {};
    cloneRule = rule;
  }
  params =
  cloneRule["path"] && parseQuery("path", cloneRule["query"] || {}) ||
  cloneRule["name"] && parseQuery("name", cloneRule["params"] || {});
  params = _objectSpread({},
  exactRule(cloneRule, routes, params.url), {
    query: params.query });

  return params;
};exports.normalizeParams = normalizeParams;

var encodeURI = function encodeURI(rule) {
  return encodeURIComponent(rule);
};exports.encodeURI = encodeURI;

var resolveRule = function resolveRule(router, rule) {var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var ruleKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'path';
  var ruleInfo = (0, _config.route)(
  exactRule(_objectSpread({},
  rule),

  router.CONFIG.routes,
  ruleKey,
  router));


  return _objectSpread({},
  ruleInfo, {
    query: query });

};
/**
    * 把一些不必要的参数进行格式化掉，完成url的美观
    * @param {String} URLQuery URL中传递的参数
    */exports.resolveRule = resolveRule;
var formatURLQuery = function formatURLQuery(URLQuery) {
  switch (URLQuery.trim()) {
    case "query=%7B%7D":
    case "%7B%7D":
    case "?query=%7B%7D":
    case "?":
    case "?[object Object]":
    case "?query={}":
      URLQuery = '';
      break;}

  return URLQuery;
};
/**
    * 拷贝对象
    * @param {Object} object 
    */exports.formatURLQuery = formatURLQuery;
var copyObject = function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
};
/**
    * 把一个字符串对象转json再转字符串
    * @param {Object} strObj 字符串对象
    */exports.copyObject = copyObject;
var strObjToJsonToStr = function strObjToJsonToStr(strObj) {
  return JSON.stringify(JSON.parse(strObj));
};
/**
    * 延迟函数 返回一个promise来进行延迟
    * @param {Number} time 需要延迟的时间戳
    */exports.strObjToJsonToStr = strObjToJsonToStr;
var timeout = function timeout() {var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  });
};exports.timeout = timeout;

/***/ }),

/***/ 25:
/*!*************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/helpers/config.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.route = exports.appletsConfig = exports.uniAppHook = exports.Global = exports.lifeCycle = exports.methods = exports.baseConfig = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var baseConfig = {
  h5: {
    rewriteFun: true, //是否对uni-app reLaunch/navigateBack 两个方法重写 处理uni刷新直接返回到首页和触发路由守卫
    paramsToQuery: false, //h5端上通过params传参时规则是vue-router 刷新会丢失 开启此开关将变成?连接的方式
    loading: true, //是否显示加载动画
    hinderTab: false, //是否拦截uni-app自带底部菜单   TODO
    vueRouterDev: false, //完全使用采用vue-router的开发模式
    useUniConfig: true, //是否采用在pages.json下的所有页面配置信息,false时需开发者自行设置页面
    keepUniIntercept: false, //保留uni-app使用vue-router的拦截器
    vueNext: false, //在next管道函数中是否获取vueRouter next的原本参数
    replaceStyle: false, //是否对resetStyle函数中返回的style节点进行全部替换，否则为追加
    resetStyle: function resetStyle() {return JSON.parse('{}');}, //自定义加载样式函数 可返回一个包涵 html、style、script 的对象来重置Router内置的加载动画
    mode: 'hash',
    base: '/',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    scrollBehavior: function scrollBehavior(to, from, savedPostion) {return savedPostion;},
    fallback: true },

  APP: {
    V3: false, //是否开启v3编辑器
    holdTabbar: true, //是否开启底部菜单拦截
    rewriteFun: true, //是否对uni-app 下的chooseLocation/openLocation 两个方法重写 目的是隐藏和显示拦截tabbar
    loddingPageStyle: function loddingPageStyle() {return JSON.parse('{"backgroundColor":"#FFF"}');}, //当前等待页面的样式 必须返回一个json
    loddingPageHook: function loddingPageHook() {plus.navigator.closeSplashscreen();}, //刚刚打开页面处于等待状态,会触发此事件
    holdTabbarStyle: function holdTabbarStyle() {return JSON.parse('{}');},
    animation: { animationType: 'pop-in', animationDuration: 300 }, //页面切换动画
    switchPageOutTime: 1000 //最高能忍耐的页面切换时间 达到此时间 不管切换有没有完成都会显示页面出来 这对启动页帮助很大
  },
  debugger: false, //是否处于开发阶段 设置为true则打印日志
  encodeURI: true, //是否对url传递的参数进行编码
  routerBeforeEach: function routerBeforeEach() {}, //router 前置路由函数 每次触发跳转前先会触发此函数
  routerAfterEach: function routerAfterEach() {}, //router 后置路由函数 每次触发跳转后会触发此函数
  routes: [] };exports.baseConfig = baseConfig;


var methods = {
  push: "navigateTo",
  replace: "redirectTo",
  replaceAll: "reLaunch",
  pushTab: "switchTab",
  back: "navigateBack" };exports.methods = methods;

var lifeCycle = {
  beforeHooks: [],
  afterHooks: [],
  routerHooks: [],
  routerbeforeHooks: [], //内部跳转前生命周期
  routerAfterHooks: [] //内部跳转后生命周期
};exports.lifeCycle = lifeCycle;

var Global = { //缓存一些必要的对象，作为全局可以访问的参数
  Router: {},
  vueRouter: {},
  addedRoutes: [], //用于缓存用户动态添加的路由
  RouterReadyPromise: function RouterReadyPromise() {},
  H5RouterReady: null, //当前router是否就绪
  $holdTab: null, //当前底部实例对象
  backLayerC: 1 //返回api调用时开发者传递的 delta
};exports.Global = Global;

var uniAppHook = {
  indexVue: {}, //首页 组件对象
  appVue: {}, //同getApp()获取到的对象一毛一样的  其实就是app.vue组件
  onLaunch: { fun: [], args: {}, isHijack: false }, //这两个是app.vue
  onShow: { fun: [], args: {}, isHijack: false },
  variationFuns: ['onReady', 'onUnload'], //一些uni-app的变异方法 需要处理下
  waitHooks: {}, //首页等待中的生命钩子 一些需要等待的Hooks,就是在页面没有进来之前一些提前触发的生命钩子 主要是用户已经声明好的
  indexCallHooks: ['onLoad', 'onReady', 'created', 'onShow'], //在首页首次启动时需要触发的生命周期
  needHooks: ['onLoad', 'onReady', 'onShow', 'created', 'onHide', 'onUnload', 'onResize'], //首页需要拦截的生命钩子
  pageReady: false,
  onLaunched: false //否触发onLaunch事件
};exports.uniAppHook = uniAppHook;

var appletsConfig = { //小程序端的一些路由所需配置
  onLaunchEd: false //当前小程序端是否触发onLaunch事件
};exports.appletsConfig = appletsConfig;

var route = function route() {var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({},
  object, {
    params: {},
    query: {} });

};exports.route = route;

/***/ }),

/***/ 26:
/*!*************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/vueRouter/base.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.vueMount = exports.vuelifeHooks = exports.builtIn = void 0;var builtIn = [{
  path: '/preview-image',
  name: 'previewImage',
  component: {
    render: function render() {} } },

{
  path: '/choose-location',
  name: 'chooseLocation',
  component: {
    render: function render() {} } },

{
  path: '/open-location',
  name: 'openLocation',
  component: {
    render: function render() {} } }];

//uni-app内置路由
exports.builtIn = builtIn;var vuelifeHooks = { //vueRouter的原始生命周期
  beforeHooks: [],
  afterHooks: [] };exports.vuelifeHooks = vuelifeHooks;

var vueMount = []; //使用内部对象保留实例化下的appVue，并使用Router进行挂载触发第一次路由钩子
exports.vueMount = vueMount;

/***/ }),

/***/ 27:
/*!***********************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/helpers/warn.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.warnLock = exports.log = exports.warn = exports.err = void 0;var _config = __webpack_require__(/*! ./config.js */ 25);



var isLog = function isLog(type, errText) {
  var dev = _config.Global.Router.CONFIG.debugger;
  var isObject = dev.toString() === '[object Object]';
  if (dev === false) {
    return false;
  } else if (dev === false) {
    return false;
  } else if (isObject) {
    if (dev[type] === false) {
      return false;
    }
  }
  console[type](errText);
};
var err = function err(_err) {
  isLog('error', _err);
};exports.err = err;

var warn = function warn(err) {
  isLog('warn', err);
};exports.warn = warn;

var log = function log(err) {
  isLog('log', err);
};exports.log = log;
var warnLock = function warnLock(err) {
  console.warn(err);
};exports.warnLock = warnLock;

/***/ }),

/***/ 28:
/*!*************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/vueRouter/util.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.diffRouter = exports.H5GetPageRoute = exports.strPathToObjPath = exports.encodeURLQuery = exports.vueDevRouteProxy = exports.APushBOject = exports.getRouterNextInfo = exports.formatUserRule = exports.nameToRute = exports.pathToRute = exports.getFuntionConfig = exports.resloveChildrenPath = exports.fromatRoutes = exports.resolveRender = void 0;var _warn = __webpack_require__(/*! ../helpers/warn.js */ 27);
var _util = __webpack_require__(/*! ../helpers/util.js */ 24);
var _appletsPatch = __webpack_require__(/*! ../patch/applets-patch.js */ 29);
var _proxy = __webpack_require__(/*! ./proxy/proxy.js */ 30);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var pagesConfigReg = /props:\s*\(.*\)\s*(\([\s\S]*\))\s*},/;
var pagesConfigRegCli = /props:\s*Object\.assign\s*(\([\s\S]*\))\s*},/; //脚手架项目
var defRoutersReg = /props:\s*{([\s\S]+)}\s*},/;

/**
                                                  * 解析验证当前的 component 选项是否配置正确 只有vueRouterDev:false 才会调用此方法
                                                  * @param {Function|Object} component 
                                                  * @param {Object} item 
                                                  * @param {Boolean} useUniConfig 
                                                  */
var resolveRender = function resolveRender(_ref,


item, useUniConfig) {var component = _ref.component,components = _ref.components;
  if (components != null) {
    (0, _warn.warn)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018components\u2019 \u65E0\u6548\uFF0C\r\n\r\n ".concat(JSON.stringify(item)));
  }
  if (useUniConfig == true) {//采用uni-pages.json中的配置时component可以为空
    return false;
  }
  if (item.path == '*') {//唯独这个情况在vue-router中可以不用component
    return true;
  }
  if (component == null) {
    return (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u4E2D \u2018component\u2019 \u9009\u9879\u4E0D\u80FD\u4E3A\u7A7A\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
  }
  if (component.constructor === Function) {
    item.component = {
      render: component };

  } else if (component.constructor === Object) {
    if (component.render == null || component.render.constructor !== Function) {
      (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018render\u2019 \u51FD\u6570\u7F3A\u5931\u6216\u7C7B\u578B\u4E0D\u6B63\u786E\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
    }
  } else {
    (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018component\u2019 \u9009\u9879\u4EC5\u652F\u6301 Function\u3001Object \u7C7B\u578B\u3002\u5E76\u786E\u4FDD Object \u7C7B\u578B\u65F6\u4F20\u9012\u4E86 \u2018render\u2019 \u51FD\u6570  \uFF1A\r\n\r\n ".concat(
    JSON.stringify(item)));

  }
};

/**
    * 格式化原始路由表
    * @param {Object} routes  路由表
    * @param {Boolean} userRoute  是否为用户自己配置的路由表
    * @param {Boolean} H5CONFIG 
    */exports.resolveRender = resolveRender;
var fromatRoutes = function fromatRoutes(routes, userRoute, _ref2)


{var vueRouterDev = _ref2.vueRouterDev,useUniConfig = _ref2.useUniConfig;
  if (userRoute && vueRouterDev) {//如果是用户的路由表并且 完全采用vueRouter开发 则不作处理直接返回
    return routes;
  }
  var objRoutes = {};
  for (var i = 0; i < routes.length; i++) {
    var item = routes[i];
    var path = item.path === '/' ? item.alias : item.path;
    if (userRoute) {
      if (item.children && item.children.constructor === Array) {
        resloveChildrenPath(objRoutes, item.children, useUniConfig);
      }
      resolveRender(item, item, useUniConfig); //是否使用pages.json下的页面配置
    }
    objRoutes[path] = _objectSpread({},
    item, {},
    {
      _PAGEPATH: path.substring(1) });


  }
  return objRoutes;
};
/**
    * 递归解析 H5配置中有存在嵌套对象的情况,优先以path为key存储。没有则找aliasPath作为key
    * @param {Object} objRoutes 
    * @param {Array} children 
    * @param {Boolean} useUniConfig 是否使用pages.json下的页面配置
    */exports.fromatRoutes = fromatRoutes;
var resloveChildrenPath = function resloveChildrenPath(objRoutes, children, useUniConfig) {
  for (var i = 0; i < children.length; i++) {
    var item = children[i];
    resolveRender(item, item, useUniConfig);
    if (item.path != null) {
      objRoutes[item.path] = _objectSpread({},
      item, {},
      {
        _ROUTERPATH: true //使用page.json中的path为路径
      });

    } else {
      objRoutes[item.aliasPath] = _objectSpread({},
      item, {},
      {
        _ROUTERPATH: false });


    }
    if (item.children && item.children.constructor === Array) {
      resloveChildrenPath(objRoutes, item.children, useUniConfig);
    }
  }
};
/**
    * 解析vueRouter中 component 下 render函数中的配置信息
    * @param {String} FunStr 
    */exports.resloveChildrenPath = resloveChildrenPath;
var getFuntionConfig = function getFuntionConfig(FunStr) {
  var matchText = FunStr.match(pagesConfigReg);
  var prefix = '';
  if (matchText == null) {//是uni-app自带的默认路由及配置 也可能是脚手架项目
    matchText = FunStr.match(pagesConfigRegCli);
    if (matchText == null) {//确认不是脚手架项目
      try {
        matchText = FunStr.match(defRoutersReg)[1];
        matchText = eval("Object.assign({".concat(matchText, "})"));
        prefix = 'system-';
      } catch (error) {
        (0, _warn.err)("\u8BFB\u53D6uni-app\u9875\u9762\u6784\u5EFA\u65B9\u6CD5\u914D\u7F6E\u9519\u8BEF \r\n\r\n ".concat(error));
      }
    } else {
      matchText = eval("Object.assign".concat(matchText[1]));
    }
  } else {
    matchText = eval("Object.assign".concat(matchText[1]));
  }
  return {
    config: matchText,
    prefix: prefix,
    FunStr: FunStr };

};
/**
    * 通过一个未知的路径名称 在路由表中查找指定路由表 并返回
    * @param {String} path //不管是aliasPath名的路径还是path名的路径
    * @param {Object} routes 	//当前对象的所有路由表
    */exports.getFuntionConfig = getFuntionConfig;
var pathToRute = function pathToRute(path, routes) {
  var PATHKEY = '';
  var rute = {};
  for (var key in routes) {
    var item = routes[key];
    rute = item;
    if (item.aliasPath == path) {//path参数是优先采用aliasPath为值得 所以可以先判断是否与aliasPath相同
      PATHKEY = 'aliasPath';
      break;
    }
    if ("/".concat(item._PAGEPATH) == path) {//路径相同
      PATHKEY = 'path';
      break;
    }
  }
  return {
    PATHKEY: _defineProperty({},
    PATHKEY, path),

    rute: rute };

};
/**
    * 通过一个路径name 在路由表中查找指定路由表 并返回
    * @param {String} name //实例化路由时传递的路径表中所匹配的对应路由name
    * @param {Object} routes 	//当前对象的所有路由表
    */exports.pathToRute = pathToRute;
var nameToRute = function nameToRute(name, routes) {
  for (var key in routes) {
    var item = routes[key];
    if (item.name == name) {
      return item;
    }
  }
  (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230 name\u4E3A:'".concat(name, "' \u7684\u8DEF\u7531"));
};
/**
    * 根据用户传入的路由规则 格式化成正确的路由规则
    * @param {Object} rule 用户需要跳转的路由规则
    * @param {Object} selfRoutes	simple-router下的所有routes对象 
    * @param {Object} CONFIG	当前路由下的所有配置信息 
    */exports.nameToRute = nameToRute;
var formatUserRule = function formatUserRule(rule, selfRoutes, CONFIG) {
  var type = '';
  var ruleQuery = (type = 'query', rule.query || (type = 'params', rule.params)) || (type = '', {});
  var rute = {}; //默认在router中的配置
  if (type == '' && rule.name != null) {//那就是可能没有穿任何值咯
    type = 'params';
  }
  if (type != 'params') {
    var route = pathToRute(rule.path || rule, selfRoutes);
    if (Object.keys(route.PATHKEY)[0] == '') {
      (0, _warn.err)("'".concat(route.PATHKEY[''], "' \u8DEF\u5F84\u5728\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230"));
      return null;
    }
    rute = route.rute;
    rule.path && (rule.path = rute.path);
  }
  if (type != '') {//当然是对象啦 这个主要是首页_H5PushTo调用时的
    if (type == 'params' && CONFIG.h5.paramsToQuery) {//如果是name规则并且设置了转query,那么就转path跳转了
      var _nameToRute =


      nameToRute(rule.name, selfRoutes),aliasPath = _nameToRute.aliasPath,path = _nameToRute.path;
      delete rule.name;
      delete rule.params;
      rule.path = aliasPath || path;
      type = 'query';
    }var _parseQuery =


    (0, _util.parseQuery)(type, ruleQuery, false),query = _parseQuery.query;
    if (CONFIG.encodeURI) {
      query = (0, _util.formatURLQuery)(query);
      if (query != '') {
        rule[type] = {
          query: query.replace(/^query\=/, '') };

      }
    } else {
      rule[type] = ruleQuery;
    }
  } else {//纯字符串,那就只有是path啦
    rule = rute.path;
  }
  return rule;
};

/**
    * 根据是否获取非vue-Router next管道参数，来进行格式化
    * 
    * @param {Object} to
    * @param {Object} from
    * @param {Router} Router  //router当前实例对象
    */exports.formatUserRule = formatUserRule;
var getRouterNextInfo = function getRouterNextInfo(to, from, Router) {var
  toRoute = to,fromRoute = from;
  var H5 = Router.CONFIG.h5;
  if (H5.vueNext === false && H5.vueRouterDev === false) {//不采用vue-router中的to和from,需要格式化成Router中$Route获取的一样一样的
    var toPath = {},fromPath = {};
    toPath[to.meta.PATHKEY] = to.meta.PATHKEY === 'path' ? "/".concat(to.meta.pagePath) : "".concat(to.path);
    fromPath[from.meta.PATHKEY] = from.meta.PATHKEY === 'path' ? "/".concat(from.meta.pagePath) : "".concat(from.path);

    if (to.meta.PATHKEY == null) {//未使用uni-pages.json中的配置、通过addRoutes时 meta.PATHKEY 可能未undefined
      toPath = pathToRute(to.path, Router.selfRoutes).PATHKEY;
    }
    if (from.meta.PATHKEY == null) {
      fromPath = pathToRute(from.path, Router.selfRoutes).PATHKEY;
    }

    var isEmptyTo = Object.keys(to.query).length != 0 ? (0, _util.copyObject)(to.query) : (0, _util.copyObject)(to.params);
    var isEmptyFrom = Object.keys(from.query).length != 0 ? (0, _util.copyObject)(from.query) : (0, _util.copyObject)(from.params);

    delete isEmptyTo['__id__']; //删除uni-app下的内置属性
    delete isEmptyFrom['__id__'];

    var toQuery = (0, _appletsPatch.queryInfo)({
      query: isEmptyTo }).
    query;
    var fromQuery = (0, _appletsPatch.queryInfo)({
      query: isEmptyFrom }).
    query;

    toRoute = (0, _util.resolveRule)(Router, toPath, toQuery, Object.keys(toPath)[0]);
    fromRoute = (0, _util.resolveRule)(Router, fromPath, fromQuery, Object.keys(fromPath)[0]);
  } else {
    if (fromRoute.name == null && toRoute.name != null) {//这种情况是因为uni-app在使用vue-router时搞了骚操作。
      fromRoute = _objectSpread({},
      fromRoute, {},
      {
        name: toRoute.name });

      //这个情况一般出现在首次加载页面
    }
  }
  return {
    toRoute: toRoute,
    fromRoute: fromRoute };

};exports.getRouterNextInfo = getRouterNextInfo;
var APushBOject = function APushBOject(Router, from, to) {
  for (var k in from) {
    Router, to, k, from[k];
  }
};exports.APushBOject = APushBOject;
var vueDevRouteProxy = function vueDevRouteProxy(routes, Router) {
  var proxyRoutes = [];
  for (var i = 0; i < routes.length; i++) {
    var item = routes[i];
    var childrenRoutes = Reflect.get(item, 'children');
    if (childrenRoutes != null) {
      var childrenProxy = vueDevRouteProxy(childrenRoutes, Router);
      item.children = childrenProxy;
    }
    var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
    proxyRoutes.push(ProxyRoute);
  }
  return proxyRoutes;
};
/**
    * 组装成编码后的路由query传递信息
    * @param {Object} CONFIG	simple-router 对象配置
    * @param {Object} query 传递的参数
    * @param {Object} mode 路由模式
    */exports.vueDevRouteProxy = vueDevRouteProxy;

var encodeURLQuery = function encodeURLQuery(CONFIG, query, mode) {
  var URLQuery = '';
  if (CONFIG.encodeURI === true && CONFIG.h5.vueRouterDev === false) {
    URLQuery = "?query=".concat(encodeURIComponent((0, _util.strObjToJsonToStr)(query.query || '{}')));
  } else {
    URLQuery = "?".concat((0, _util.parseQuery)('', query, false).query);
  }
  URLQuery = (0, _util.formatURLQuery)(URLQuery);
  if (mode === 'history') {
    var queryT = URLQuery.replace(/\?query\=/, function (t) {
      if (t != '') {
        URLQuery = {
          query: '' };

      }
      return '';
    });
    if (URLQuery.constructor === Object) {
      URLQuery.query = queryT;
    }
  }

  return URLQuery;
};
/**
    * 把一个未知的路由跳转规则进行格式化为 hash、history 可用的,主要表现在 history模式下直接传入path会报错__id__错误的问题
    * @param {*} path 需要判断修改的路径规则
    */exports.encodeURLQuery = encodeURLQuery;
var strPathToObjPath = function strPathToObjPath(path) {
  if (path == null) {//我们也不用管啦,这个情况是路由守卫中传递的
    return path;
  }
  if ((0, _util.isObject)(path)) {//是对象我们不用管
    return path;
  }
  return { //这种情况就是只有path时,直接返回path对象了
    path: path };

};
/**
    * 获取当前页面下的 Route 信息
    * 
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.strPathToObjPath = strPathToObjPath;
var H5GetPageRoute = function H5GetPageRoute(pages, Vim) {
  if (pages.length > 0) {//直接取当前页面的对象
    var currentRoute = pages[pages.length - 1].$route;
    return getRouterNextInfo(currentRoute, currentRoute, this).toRoute;
  } else if (Vim && Vim.$route) {
    return getRouterNextInfo(Vim.$route, Vim.$route, this).toRoute;
  } else {
    return {};
  }
};

/**
    * 在useUniConfig:true 的情况下重新拼装路由表 useUniConfig:false 不需要读取page.json中的数据 直接使用component作为页面组件
    * @param {Router} Router 		//unis-simple-router 路由对象
    * @param {vueRouter} vueRouter 	//vue-router对象
    * @param {Boolean} useUniConfig  //是否采用uni-page.json中的配置选项
    * @param {Array} routes   //需要循环的routes表
    */exports.H5GetPageRoute = H5GetPageRoute;
var diffRouter = function diffRouter(Router, vueRouter, useUniConfig, routes) {
  var newRouterMap = [];
  if (useUniConfig) {//使用pages.json的样式配置 只是单纯的把url路径改成用户自定义的 保留uni的所以的配置及生命周期、缓存
    var Routes = routes ? routes : vueRouter.options.routes;
    var cloneSelfRoutes = (0, _util.copyObject)(Router.selfRoutes); //copy一个对象随便搞xxoo
    Routes.forEach(function (item, index) {
      var path = item.path === '/' ? item.alias : item.path;
      var vueRoute = Router.vueRoutes[path] || Router.vueRoutes[item.path] || Router.selfRoutes[path];
      var CselfRoute = Router.selfRoutes[path];
      delete cloneSelfRoutes[path]; //移除已经添加到容器中的路由，用于最后做对比 是否page.json中没有，而实例化时传递了
      if (CselfRoute == null) {
        return (0, _warn.err)("\u8BFB\u53D6 \u2018pages.json\u2019 \u4E2D\u9875\u9762\u914D\u7F6E\u9519\u8BEF\u3002\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230\u8DEF\u5F84\u4E3A\uFF1A".concat(
        path, " \r\n\r\n \u53EF\u4EE5\u5C1D\u8BD5\u628A \u2018useUniConfig\u2019 \u8BBE\u7F6E\u4E3A \u2018false\u2019\u3002\u6216\u8005\u914D\u7F6E\u6B63\u786E\u7684\u8DEF\u5F84\u3002\u5982\u679C\u4F60\u662F\u52A8\u6001\u6DFB\u52A0\u7684\u5219\u4E0D\u7528\u7406\u4F1A"));

      }
      var pageConfigJson = {
        config: {} };

      if (vueRoute.component) {
        pageConfigJson = getFuntionConfig(vueRoute.component.render.toString());
        CselfRoute.component = {
          render: function render(h) {return vueRoute.component.render(h);} };

      }
      delete CselfRoute.components; //useUniConfig:true 时不允许携带components
      delete CselfRoute.children; //useUniConfig:true 时不允许携带children
      CselfRoute.meta = _objectSpread({},
      pageConfigJson.config, {},
      item.meta || {}, {
        PATHKEY: CselfRoute.aliasPath ? 'aliasPath' : 'path',
        pagePath: CselfRoute.path.substring(1) });

      CselfRoute.path = CselfRoute.aliasPath || (item.path === '/' ? item.path : CselfRoute.path);
      item.alias = item.path === '/' ? item.alias : CselfRoute.path; //重新给vueRouter赋值一个新的路径，欺骗uni-app源码判断
      var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, CselfRoute);
      newRouterMap.push(ProxyRoute);

    });
    if (Object.keys(cloneSelfRoutes).length > 0) {//确实page.json中没有，而实例化时传递了
      var testG = cloneSelfRoutes['*']; //全局通配符 他是个例外 通配符	可以被添加
      if (testG && routes == null) {
        var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, Router.selfRoutes['*']);
        newRouterMap.push(ProxyRoute);
      }
      if (routes == null) {//非动态添加时才打印警告
        for (var key in cloneSelfRoutes) {
          if (key !== '*') {//通配符不警告
            (0, _warn.warn)("\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684routes\u53C2\u6570\uFF1A\r\n\r\n ".concat(JSON.stringify(cloneSelfRoutes[key]), " \r\n\r\n \u5728pages.json\u4E2D\u672A\u627E\u5230\u3002\u81EA\u5B9A\u6392\u9664\u6389\uFF0C\u4E0D\u4F1A\u6DFB\u52A0\u5230\u8DEF\u7531\u4E2D"));
          }
        }
      }
    }
  } else {//不使用任何的uni配置完全使用 完全使用component作为页面使用
    var _Routes = routes ? routes : Router.selfRoutes;
    for (var _key in _Routes) {
      var item = _Routes[_key];
      if (item._ROUTERPATH != null) {//不寻找children下的路径，只取第一层
        continue;
      }
      delete item.components;
      delete item.children;
      item.path = item.aliasPath || item.path; //优先获取别名为路径
      if (item.path !== '*') {
        item.component = item.component.render || item.component; //render可能是用户使用addRoutes api进行动态添加的
      }
      item.meta = _objectSpread({},
      item.meta || {}, {
        PATHKEY: item.aliasPath ? 'aliasPath' : 'path',
        pagePath: item.path.substring(1) });

      var _ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
      newRouterMap.push(_ProxyRoute);
    }
  }
  return newRouterMap;
};exports.diffRouter = diffRouter;

/***/ }),

/***/ 29:
/*!******************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/patch/applets-patch.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.appletsMount = exports.queryInfo = void 0;var _util = __webpack_require__(/*! ../helpers/util.js */ 24);



var _config = __webpack_require__(/*! ../helpers/config.js */ 25);




var queryInfo = function queryInfo(Vim) {
  var query = {};
  Vim.query = Vim.query || {}; //计算属性中query会丢失 https://github.com/SilurianYang/uni-simple-router/issues/26
  if (_config.Global.Router.CONFIG.encodeURI) {
    if (Vim.ONLAUNCH == null) {
      try {
        query = JSON.parse(decodeURIComponent(Vim.query.query || encodeURIComponent('{}')));
      } catch (e) {
        query = JSON.parse(Vim.query.query);
      }
    }
  } else {
    query = Vim.query;
  }
  var path = '';
  var ruleKey = 'path';
  switch ((0, _util.appPlatform)()) {
    case 'H5':
      path = Vim.page && (ruleKey = 'aliasPath', Vim.page.$page.path || '/' + Vim.page.route);
      break;
    case 'BAIDU':
      path = '/' + Vim.page.pageinstance.route || false;
      break;
    default:
      path = '/' + Vim.page.route || false;
      break;}

  var route = {};
  route[ruleKey] = path;
  return {
    route: route,
    ruleKey: ruleKey,
    query: query };

};

/**
    * 截止 1.3.5 版本 不做任何操作
    * @param {element} el dom节点 
    */exports.queryInfo = queryInfo;
var appletsMount = function appletsMount(Vim, el) {
  Vim.$mount();
};exports.appletsMount = appletsMount;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!********************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/vueRouter/proxy/proxy.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.proxyEachHooks = exports.proxyBeforeEnter = void 0;var _concat = __webpack_require__(/*! ../concat.js */ 31);
var _base = __webpack_require__(/*! ../base.js */ 26);
var _myArray = _interopRequireDefault(__webpack_require__(/*! ../extends/myArray.js */ 32));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                       * 通过 Object.defineProperty 代理一个对象主要是拦截beforeEnter 生命钩子
                                                                                                                                                                       * @param {Router} Router  路由实例对象	
                                                                                                                                                                       * @param {Object} BeProxy 需要代理的路由表
                                                                                                                                                                       */
var proxyBeforeEnter = function proxyBeforeEnter(Router, BeProxy) {
  var proxyDc = Object.create(null); // 创建没有继承的属性
  var _loop = function _loop(key) {
    Object.defineProperty(proxyDc, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        var value = BeProxy[key];
        if (key == 'beforeEnter' && value !== undefined) {
          return function (to, from, next) {
            (0, _concat.beforeEnterHooks)(to, from, next, value, Router);
          };
        }
        return value;
      },
      set: function set(v) {
        BeProxy[key] = v;
      } });};for (var key in BeProxy) {_loop(key);

  }
  return proxyDc;
};

/**
    * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
    * @param {Object} Router
    * @param {Object} key		
    * @param {Funtion} hookFun 
    */exports.proxyBeforeEnter = proxyBeforeEnter;
var proxyEachHooks = function proxyEachHooks(Router, key, hookFun) {
  var vueOldHooks = _base.vuelifeHooks[key];
  return new _myArray.default(Router, vueOldHooks, hookFun);
};


/**
    * 通过proxy 代理一个对象主要是拦截beforeEnter 生命钩子
    * @param {Router} Router  路由实例对象	ES6+ 方法 高版本浏览器可使用
    */
// export const proxyBeforeEnter = function(Router) {
// 	return new Proxy({}, {
// 		get: function(t, k, r) {
// 			const value = Reflect.get(t, k, r);
// 			if (k == 'beforeEnter' && value !== undefined) {
// 				return (to, from, next) => {
// 					beforeEnterHooks(to, from, next, value, Router)
// 				};
// 			}
// 			return value;
// 		},
// 		set: function(t, k, v, r) {
// 			return Reflect.set(t, k, v, r);
// 		}
// 	})
// }


/**
 * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
 * @param {Object} Router
 * @param {Object} key		ES6+ 方法 高版本浏览器可使用
 */
// export const proxyEachHooks = function(Router, key, hookFun) {
// 	const vueOldHooks = vuelifeHooks[key];
// 	return new Proxy([], {
// 		get: (target, prop) => {
// 			return prop in target ? target[prop] : undefined
// 		},
// 		set: (target, prop, value) => {
// 			if (typeof value == 'function') {
// 				vueOldHooks.splice(0, 1, value);
// 				target[prop] = (to, from, next) => {
// 					hookFun(to, from, next, Router)
// 				};
// 			} else {
// 				target[prop] = value;
// 			}
// 			return true
// 		}
// 	})
// }
exports.proxyEachHooks = proxyEachHooks;

/***/ }),

/***/ 31:
/*!***************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/vueRouter/concat.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerRouter = exports.triggerLifeCycle = exports.appMount = exports.beforeHooks = exports.afterHooks = exports.beforeEnterHooks = exports.forMatNext = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _warn = __webpack_require__(/*! ../helpers/warn.js */ 27);
var _util = __webpack_require__(/*! ./util.js */ 28);
var _util2 = __webpack_require__(/*! ../helpers/util.js */ 24);
var _base = __webpack_require__(/*! ./base.js */ 26);
var _config = __webpack_require__(/*! ../helpers/config.js */ 25);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _readOnlyError(name) {throw new Error("\"" + name + "\" is read-only");}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var beforeEachCount = 0;
var afterEachCount = 0;
var resolveLaunch = null;
var beforeEnterDep = []; //记录当前是否有重复的页面进入 避免重复触发
var beforeEachLaunch = new Promise(function (resolve) {return resolveLaunch = resolve;});

/**
                                                                                           * 格式化 next传递过来的参数 作为vue-router可用的
                                                                                           * @param {Object} to   //即将跳转到的路由页面
                                                                                           * @param {*} Intercept 
                                                                                           * @param {Funtion} next	//路由连接管道
                                                                                           * @param {Router} Router	//路由对象
                                                                                           */
var forMatNext = function forMatNext(to, Intercept, next, Router) {var
  CONFIG = Router.CONFIG,selfRoutes = Router.selfRoutes;
  if (CONFIG.h5.vueRouterDev) {//完全使用vue-router开发的时候 vueRouterDev:true 不用做啥直接略过
    next(Intercept);
    return Intercept;
  }
  if (typeof Intercept === 'object') {//只有是对象类型的时候 我们才进行格式化
    var navType = Reflect.get(Intercept, 'NAVTYPE');
    delete Intercept.NAVTYPE;
    if (navType == 'push') {
      Intercept.replace = false;
      Intercept.type = 'navigateTo';
    } else {
      Intercept.replace = true; //uni-app导航api所谓的NAVTYPE取值在h5都是replace:true
      Intercept.type = 'reLaunch';
    }
    var name = Reflect.get(Intercept, 'name'); //统一格式化path
    Intercept.query = Intercept.params || Intercept.query;
    delete Intercept.name;
    delete Intercept.params;
    if (Intercept.query == null) {
      Intercept.query = {};
    }
    if (name != null) {var _nameToRute =
      (0, _util.nameToRute)(name, selfRoutes),aliasPath = _nameToRute.aliasPath,path = _nameToRute.path;
      Intercept.path = aliasPath || path;
    } else {//当设置别名时可以是别名跳转也可以path跳转
      Intercept.path = Reflect.get(Intercept, 'path');
      var rute = (0, _util.formatUserRule)(Intercept.path, selfRoutes, CONFIG);
      if (rute == null) {
        return false;
      }
      Intercept.path = rute;
    }
    if (CONFIG.encodeURI) {//如果设置的编码传递则进行编码后传递
      var query = encodeURIComponent(JSON.stringify(Intercept.query));
      var formatQuery = (0, _util2.formatURLQuery)(query);
      Intercept.query = {};
      if (formatQuery != '') {
        Intercept.query.query = formatQuery;
      }
    }
  } else if (Intercept != null && Intercept.constructor === String) {
    Intercept = (0, _util.formatUserRule)(Intercept, selfRoutes, CONFIG);
  }
  var objPath = Intercept;
  if (Intercept != null && Intercept.constructor !== Boolean) {
    objPath = (0, _util.strPathToObjPath)(Intercept);
    if (objPath != null) {
      var type = Reflect.get(objPath, 'type');
      if (type == null) {//当next()是一个路径时 
        objPath.type = 'navigateTo';
      }
    }
  } else if (Intercept === false) {
    Router.lifeCycle["routerAfterHooks"][0].call(Router, { H5Intercept: true });
  }
  next(objPath); //统一格式化为对象的方式传递
  return Intercept;
};

/**
    * 修复首页beforeEnter执行两次的问题 https://github.com/SilurianYang/uni-simple-router/issues/67
    * 
    * beforeEnter 生命周期
    * @param {Object} to
    * @param {Object} from
    * @param {Object} next
    * @param {Object} userHooks
    * @param {Object} Router
    */exports.forMatNext = forMatNext;
var beforeEnterHooks = function beforeEnterHooks(to, from, next, userHooks, Router) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!

              beforeEnterDep.includes(to.path)) {_context2.next = 5;break;}
              next();return _context2.abrupt("return",
              resolve());case 5:

              beforeEnterDep = [to.path];case 6:if (!

              Reflect.get(Router, 'H5RouterReady')) {_context2.next = 13;break;}_context2.next = 9;return (
                new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var _getRouterNextInfo, toRoute, fromRoute;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_getRouterNextInfo =



                            (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo.toRoute, fromRoute = _getRouterNextInfo.fromRoute;_context.next = 3;return (
                              userHooks(toRoute, fromRoute, resolve));case 3:case "end":return _context.stop();}}}, _callee);}));return function (_x2) {return _ref2.apply(this, arguments);};}()));case 9:res = _context2.sent;

              forMatNext(to, res, next, Router);_context2.next = 14;break;case 13:

              next();case 14:

              resolve();case 15:case "end":return _context2.stop();}}}, _callee2);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * vueAfter 生命周期
    * @param {Object} to
    * @param {Object} from
    * @param {Object} next
    * @param {Object} Router
    */exports.beforeEnterHooks = beforeEnterHooks;
var afterHooks = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(to, from, next, Router) {var _getRouterNextInfo2, toRoute, fromRoute;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            _base.vuelifeHooks['afterHooks'][0](to, from);if (!
            _config.lifeCycle["afterHooks"][0]) {_context3.next = 10;break;}if (!(
            afterEachCount === 0)) {_context3.next = 6;break;}_context3.next = 5;return (
              beforeEachLaunch);case 5:
            appMount(Router);case 6:_getRouterNextInfo2 =




            (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo2.toRoute, fromRoute = _getRouterNextInfo2.fromRoute;
            _config.lifeCycle["afterHooks"][0](toRoute, fromRoute);_context3.next = 11;break;case 10:
            if (afterEachCount === 0) {
              appMount(Router);
            }case 11:
            afterEachCount++;
            Router.lifeCycle["routerAfterHooks"][0].call(Router);case 13:case "end":return _context3.stop();}}}, _callee3);}));return function afterHooks(_x3, _x4, _x5, _x6) {return _ref3.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                           * vueBefore 生命周期
                                                                                                                                                                                                                           * @param {Object} to
                                                                                                                                                                                                                           * @param {Object} from
                                                                                                                                                                                                                           * @param {Object} next
                                                                                                                                                                                                                           * @param {Object} H5Config
                                                                                                                                                                                                                           */exports.afterHooks = afterHooks;
var beforeHooks = function beforeHooks(to, from, next, Router) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(resolve) {var H5;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                Router.lifeCycle["routerbeforeHooks"][0].call(Router));case 2: //触发Router内置前置生命周期
              H5 = Router.CONFIG.h5;
              _base.vuelifeHooks.beforeHooks[0](to, from, /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(Intercept) {var res, beforeIntercept, selfRoutes, beforeEnter;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:if (!(
                          Intercept != null && H5.keepUniIntercept === true && H5.vueRouterDev === false)) {_context5.next = 5;break;}
                          next(Intercept);
                          (0, _warn.warn)("uni-app \u5185\u90E8\u5F3A\u5236\u89E6\u53D1\u8DF3\u8F6C\u62E6\u622A");
                          beforeEachCount++;return _context5.abrupt("return",
                          resolve());case 5:if (


                          _config.lifeCycle['beforeHooks'][0]) {_context5.next = 10;break;}
                          next();
                          beforeEachCount++;
                          resolveLaunch();return _context5.abrupt("return",
                          resolve());case 10:_context5.next = 12;return (

                            new Promise( /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve) {var _getRouterNextInfo3, toRoute, fromRoute;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_getRouterNextInfo3 =



                                        (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo3.toRoute, fromRoute = _getRouterNextInfo3.fromRoute;_context4.next = 3;return (
                                          _config.lifeCycle["beforeHooks"][0](toRoute, fromRoute, resolve));case 3:case "end":return _context4.stop();}}}, _callee4);}));return function (_x9) {return _ref6.apply(this, arguments);};}()));case 12:res = _context5.sent;

                          beforeIntercept = forMatNext(to, res, next, Router);if (!(
                          beforeEachCount == 0 && beforeIntercept == null && to.meta.isTabBar)) {_context5.next = 20;break;} //首次触发beforeEach，并且首页没有进行跳转的情况下才触发beforeEnter 主要是keep-alive

                          selfRoutes =
                          Router.selfRoutes;
                          beforeEnter = Reflect.get(selfRoutes["/".concat(to.meta.pagePath)], 'beforeEnter');if (!
                          beforeEnter) {_context5.next = 20;break;}_context5.next = 20;return (
                            beforeEnterHooks(to, from, next, beforeEnter, Router));case 20:


                          beforeEachCount++;
                          resolveLaunch();
                          resolve();case 23:case "end":return _context5.stop();}}}, _callee5);}));return function (_x8) {return _ref5.apply(this, arguments);};}());case 4:case "end":return _context6.stop();}}}, _callee6);}));return function (_x7) {return _ref4.apply(this, arguments);};}());


};
/**
    * 把vue实例进行挂载到dom下
    * @param {Router} Router uni-simple-router实例对象 
    */exports.beforeHooks = beforeHooks;
var appMount = function appMount(Router) {
  if (_base.vueMount.length == 0) {
    return (0, _warn.err)("\u68C0\u6D4B\u5230\u60A8\u672A\u8FDB\u884Cdom\u6A21\u578B\u6302\u8F7D\u64CD\u4F5C\uFF0C\u8BF7\u8C03\u7528api\r\n\r\n RouterMount(Vim: any, el: any): void");
  }var _vueMount$ =



  _base.vueMount[0],Vim = _vueMount$.Vim,el = _vueMount$.el;
  if (el == null) {
    el = (_readOnlyError("el"), '#app'); //这是uni-app在h5中的官方节点
  }
  try {
    Vim.$mount(el);
  } catch (error) {
    (0, _warn.warn)("\u6302\u8F7Dvue\u8282\u70B9\u65F6\u9519\u8BEF\u5566".concat(error));
  }
};
/**
    * 通过自动调用router api来完成触发生命周期
    * 修复 history 模式下报错的问题  https://github.com/SilurianYang/uni-simple-router/issues/38
    * 修复 history 模式下刷新页面参数丢失的问题 https://github.com/SilurianYang/uni-simple-router/issues/45
    * 修复 history 模式下首次打开页面url错误时不走 path:* 的匹配项  https://github.com/SilurianYang/uni-simple-router/issues/58
    * 
    * @param {Object} Router	//当前simple-router 对象
    * @param {Object} vueRouter vue-router对象
    */exports.appMount = appMount;
var triggerLifeCycle = function triggerLifeCycle(Router, vueRouter) {
  var CONFIG = Router.CONFIG;
  var currRoute = vueRouter.currentRoute;
  if (vueRouter.mode === 'hash') {var

    query =

    currRoute.query,path = currRoute.path;

    var URLQuery = (0, _util.encodeURLQuery)(CONFIG, query, 'hash');

    vueRouter.replace("".concat(path).concat(URLQuery));
  } else {var _getRouterNextInfo4 =



    (0, _util.getRouterNextInfo)(currRoute, currRoute, Router),toRoute = _getRouterNextInfo4.toRoute,fromRoute = _getRouterNextInfo4.fromRoute;
    var _URLQuery = toRoute.query;
    if (CONFIG.encodeURI) {
      _URLQuery = (0, _util.encodeURLQuery)(CONFIG, {
        query: JSON.stringify(toRoute.query) },
      'history');
    }
    vueRouter.replace({
      path: toRoute.aliasPath || toRoute.path || currRoute.path,
      query: _URLQuery,
      type: 'redirectTo' });


  }
};

/** 注册自定义的路由到vue-router中 前提是必须使用vueRouter开发模式
    * @param {Object} Router
    * @param {Object} vueRouter
    * @param {Boolean} vueRouterDev
    */exports.triggerLifeCycle = triggerLifeCycle;
var registerRouter = function registerRouter(Router, vueRouter, vueRouterDev) {
  var routeMap = [];
  if (!vueRouterDev) {//则进行对比两个路由表  主要工作是做路径的优化
    routeMap = (0, _util.diffRouter)(Router, vueRouter, Router.CONFIG.h5.useUniConfig);
  } else {//完全使用vue-router开发时直接采用开发者的路由表
    routeMap = (0, _util.vueDevRouteProxy)(Router.CONFIG.routes, Router);
  }
  var createRouter = function createRouter() {return new vueRouter.constructor({
      base: vueRouter.options.base,
      mode: vueRouter.options.mode,
      routes: routeMap });};

  var router = createRouter();
  vueRouter.matcher = router.matcher;
  _config.Global.vueRouter = vueRouter; //把当前vueRouter缓存到全局对象中
  _config.Global.RouterReadyPromise(); //router已经准备就绪 调用promise.resolve();
  Router.H5RouterReady = true; //并挂载到Router对象下
  //注册完成所有的钩子及相关参数，手动触发Router的生命周期
  setTimeout(function () {
    triggerLifeCycle(Router, vueRouter);
  });
};exports.registerRouter = registerRouter;

/***/ }),

/***/ 32:
/*!************************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/vueRouter/extends/myArray.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * 实现一个继承的 数组类  代理掉 vue-router 生命钩子的数据
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */var
MyArray = /*#__PURE__*/function (_Array) {_inherits(MyArray, _Array);var _super = _createSuper(MyArray);
  function MyArray(Router, vueOldHooks, hookFun) {var _this;_classCallCheck(this, MyArray);
    _this = _super.call(this);
    _this.Router = Router;
    _this.vueOldHooks = vueOldHooks;
    _this.hookFun = hookFun;return _this;
  }_createClass(MyArray, [{ key: "push", value: function push(
    v) {var _this2 = this;
      this.vueOldHooks.splice(0, 1, v); //把vue-router路由生命钩子保存起来
      this[this.length] = function (to, from, next) {
        _this2.hookFun(to, from, next, _this2.Router);
      };
    } }]);return MyArray;}( /*#__PURE__*/_wrapNativeSuper(Array));var _default =


MyArray;exports.default = _default;

/***/ }),

/***/ 329:
/*!*************************************************!*\
  !*** D:/uni/uni_phone/config/area_json/area.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  province_list: {
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省',
    150000: '内蒙古自治区',
    210000: '辽宁省',
    220000: '吉林省',
    230000: '黑龙江省',
    310000: '上海市',
    320000: '江苏省',
    330000: '浙江省',
    340000: '安徽省',
    350000: '福建省',
    360000: '江西省',
    370000: '山东省',
    410000: '河南省',
    420000: '湖北省',
    430000: '湖南省',
    440000: '广东省',
    450000: '广西壮族自治区',
    460000: '海南省',
    500000: '重庆市',
    510000: '四川省',
    520000: '贵州省',
    530000: '云南省',
    540000: '西藏自治区',
    610000: '陕西省',
    620000: '甘肃省',
    630000: '青海省',
    640000: '宁夏回族自治区',
    650000: '新疆维吾尔自治区',
    710000: '台湾省',
    810000: '香港特别行政区',
    820000: '澳门特别行政区'
    //     900000: '海外'
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
    130100: '石家庄市',
    130200: '唐山市',
    130300: '秦皇岛市',
    130400: '邯郸市',
    130500: '邢台市',
    130600: '保定市',
    130700: '张家口市',
    130800: '承德市',
    130900: '沧州市',
    131000: '廊坊市',
    131100: '衡水市',
    140100: '太原市',
    140200: '大同市',
    140300: '阳泉市',
    140400: '长治市',
    140500: '晋城市',
    140600: '朔州市',
    140700: '晋中市',
    140800: '运城市',
    140900: '忻州市',
    141000: '临汾市',
    141100: '吕梁市',
    150100: '呼和浩特市',
    150200: '包头市',
    150300: '乌海市',
    150400: '赤峰市',
    150500: '通辽市',
    150600: '鄂尔多斯市',
    150700: '呼伦贝尔市',
    150800: '巴彦淖尔市',
    150900: '乌兰察布市',
    152200: '兴安盟',
    152500: '锡林郭勒盟',
    152900: '阿拉善盟',
    210100: '沈阳市',
    210200: '大连市',
    210300: '鞍山市',
    210400: '抚顺市',
    210500: '本溪市',
    210600: '丹东市',
    210700: '锦州市',
    210800: '营口市',
    210900: '阜新市',
    211000: '辽阳市',
    211100: '盘锦市',
    211200: '铁岭市',
    211300: '朝阳市',
    211400: '葫芦岛市',
    220100: '长春市',
    220200: '吉林市',
    220300: '四平市',
    220400: '辽源市',
    220500: '通化市',
    220600: '白山市',
    220700: '松原市',
    220800: '白城市',
    222400: '延边朝鲜族自治州',
    230100: '哈尔滨市',
    230200: '齐齐哈尔市',
    230300: '鸡西市',
    230400: '鹤岗市',
    230500: '双鸭山市',
    230600: '大庆市',
    230700: '伊春市',
    230800: '佳木斯市',
    230900: '七台河市',
    231000: '牡丹江市',
    231100: '黑河市',
    231200: '绥化市',
    232700: '大兴安岭地区',
    310100: '上海市',
    320100: '南京市',
    320200: '无锡市',
    320300: '徐州市',
    320400: '常州市',
    320500: '苏州市',
    320600: '南通市',
    320700: '连云港市',
    320800: '淮安市',
    320900: '盐城市',
    321000: '扬州市',
    321100: '镇江市',
    321200: '泰州市',
    321300: '宿迁市',
    330100: '杭州市',
    330200: '宁波市',
    330300: '温州市',
    330400: '嘉兴市',
    330500: '湖州市',
    330600: '绍兴市',
    330700: '金华市',
    330800: '衢州市',
    330900: '舟山市',
    331000: '台州市',
    331100: '丽水市',
    340100: '合肥市',
    340200: '芜湖市',
    340300: '蚌埠市',
    340400: '淮南市',
    340500: '马鞍山市',
    340600: '淮北市',
    340700: '铜陵市',
    340800: '安庆市',
    341000: '黄山市',
    341100: '滁州市',
    341200: '阜阳市',
    341300: '宿州市',
    341500: '六安市',
    341600: '亳州市',
    341700: '池州市',
    341800: '宣城市',
    350100: '福州市',
    350200: '厦门市',
    350300: '莆田市',
    350400: '三明市',
    350500: '泉州市',
    350600: '漳州市',
    350700: '南平市',
    350800: '龙岩市',
    350900: '宁德市',
    360100: '南昌市',
    360200: '景德镇市',
    360300: '萍乡市',
    360400: '九江市',
    360500: '新余市',
    360600: '鹰潭市',
    360700: '赣州市',
    360800: '吉安市',
    360900: '宜春市',
    361000: '抚州市',
    361100: '上饶市',
    370100: '济南市',
    370200: '青岛市',
    370300: '淄博市',
    370400: '枣庄市',
    370500: '东营市',
    370600: '烟台市',
    370700: '潍坊市',
    370800: '济宁市',
    370900: '泰安市',
    371000: '威海市',
    371100: '日照市',
    371300: '临沂市',
    371400: '德州市',
    371500: '聊城市',
    371600: '滨州市',
    371700: '菏泽市',
    410100: '郑州市',
    410200: '开封市',
    410300: '洛阳市',
    410400: '平顶山市',
    410500: '安阳市',
    410600: '鹤壁市',
    410700: '新乡市',
    410800: '焦作市',
    410900: '濮阳市',
    411000: '许昌市',
    411100: '漯河市',
    411200: '三门峡市',
    411300: '南阳市',
    411400: '商丘市',
    411500: '信阳市',
    411600: '周口市',
    411700: '驻马店市',
    419000: '省直辖县',
    420100: '武汉市',
    420200: '黄石市',
    420300: '十堰市',
    420500: '宜昌市',
    420600: '襄阳市',
    420700: '鄂州市',
    420800: '荆门市',
    420900: '孝感市',
    421000: '荆州市',
    421100: '黄冈市',
    421200: '咸宁市',
    421300: '随州市',
    422800: '恩施土家族苗族自治州',
    429000: '省直辖县',
    430100: '长沙市',
    430200: '株洲市',
    430300: '湘潭市',
    430400: '衡阳市',
    430500: '邵阳市',
    430600: '岳阳市',
    430700: '常德市',
    430800: '张家界市',
    430900: '益阳市',
    431000: '郴州市',
    431100: '永州市',
    431200: '怀化市',
    431300: '娄底市',
    433100: '湘西土家族苗族自治州',
    440100: '广州市',
    440200: '韶关市',
    440300: '深圳市',
    440400: '珠海市',
    440500: '汕头市',
    440600: '佛山市',
    440700: '江门市',
    440800: '湛江市',
    440900: '茂名市',
    441200: '肇庆市',
    441300: '惠州市',
    441400: '梅州市',
    441500: '汕尾市',
    441600: '河源市',
    441700: '阳江市',
    441800: '清远市',
    441900: '东莞市',
    442000: '中山市',
    445100: '潮州市',
    445200: '揭阳市',
    445300: '云浮市',
    450100: '南宁市',
    450200: '柳州市',
    450300: '桂林市',
    450400: '梧州市',
    450500: '北海市',
    450600: '防城港市',
    450700: '钦州市',
    450800: '贵港市',
    450900: '玉林市',
    451000: '百色市',
    451100: '贺州市',
    451200: '河池市',
    451300: '来宾市',
    451400: '崇左市',
    460100: '海口市',
    460200: '三亚市',
    460300: '三沙市',
    460400: '儋州市',
    469000: '省直辖县',
    500100: '重庆市',
    500200: '县',
    510100: '成都市',
    510300: '自贡市',
    510400: '攀枝花市',
    510500: '泸州市',
    510600: '德阳市',
    510700: '绵阳市',
    510800: '广元市',
    510900: '遂宁市',
    511000: '内江市',
    511100: '乐山市',
    511300: '南充市',
    511400: '眉山市',
    511500: '宜宾市',
    511600: '广安市',
    511700: '达州市',
    511800: '雅安市',
    511900: '巴中市',
    512000: '资阳市',
    513200: '阿坝藏族羌族自治州',
    513300: '甘孜藏族自治州',
    513400: '凉山彝族自治州',
    520100: '贵阳市',
    520200: '六盘水市',
    520300: '遵义市',
    520400: '安顺市',
    520500: '毕节市',
    520600: '铜仁市',
    522300: '黔西南布依族苗族自治州',
    522600: '黔东南苗族侗族自治州',
    522700: '黔南布依族苗族自治州',
    530100: '昆明市',
    530300: '曲靖市',
    530400: '玉溪市',
    530500: '保山市',
    530600: '昭通市',
    530700: '丽江市',
    530800: '普洱市',
    530900: '临沧市',
    532300: '楚雄彝族自治州',
    532500: '红河哈尼族彝族自治州',
    532600: '文山壮族苗族自治州',
    532800: '西双版纳傣族自治州',
    532900: '大理白族自治州',
    533100: '德宏傣族景颇族自治州',
    533300: '怒江傈僳族自治州',
    533400: '迪庆藏族自治州',
    540100: '拉萨市',
    540200: '日喀则市',
    540300: '昌都市',
    540400: '林芝市',
    540500: '山南市',
    540600: '那曲市',
    542500: '阿里地区',
    610100: '西安市',
    610200: '铜川市',
    610300: '宝鸡市',
    610400: '咸阳市',
    610500: '渭南市',
    610600: '延安市',
    610700: '汉中市',
    610800: '榆林市',
    610900: '安康市',
    611000: '商洛市',
    620100: '兰州市',
    620200: '嘉峪关市',
    620300: '金昌市',
    620400: '白银市',
    620500: '天水市',
    620600: '武威市',
    620700: '张掖市',
    620800: '平凉市',
    620900: '酒泉市',
    621000: '庆阳市',
    621100: '定西市',
    621200: '陇南市',
    622900: '临夏回族自治州',
    623000: '甘南藏族自治州',
    630100: '西宁市',
    630200: '海东市',
    632200: '海北藏族自治州',
    632300: '黄南藏族自治州',
    632500: '海南藏族自治州',
    632600: '果洛藏族自治州',
    632700: '玉树藏族自治州',
    632800: '海西蒙古族藏族自治州',
    640100: '银川市',
    640200: '石嘴山市',
    640300: '吴忠市',
    640400: '固原市',
    640500: '中卫市',
    650100: '乌鲁木齐市',
    650200: '克拉玛依市',
    650400: '吐鲁番市',
    650500: '哈密市',
    652300: '昌吉回族自治州',
    652700: '博尔塔拉蒙古自治州',
    652800: '巴音郭楞蒙古自治州',
    652900: '阿克苏地区',
    653000: '克孜勒苏柯尔克孜自治州',
    653100: '喀什地区',
    653200: '和田地区',
    654000: '伊犁哈萨克自治州',
    654200: '塔城地区',
    654300: '阿勒泰地区',
    659000: '自治区直辖县级行政区划',
    710100: '台北市',
    710200: '高雄市',
    710300: '台南市',
    710400: '台中市',
    710500: '金门县',
    710600: '南投县',
    710700: '基隆市',
    710800: '新竹市',
    710900: '嘉义市',
    711100: '新北市',
    711200: '宜兰县',
    711300: '新竹县',
    711400: '桃园县',
    711500: '苗栗县',
    711700: '彰化县',
    711900: '嘉义县',
    712100: '云林县',
    712400: '屏东县',
    712500: '台东县',
    712600: '花莲县',
    712700: '澎湖县',
    712800: '连江县',
    810100: '香港岛',
    810200: '九龙',
    810300: '新界',
    820100: '澳门半岛',
    820200: '离岛',
    900400: '阿富汗',
    900800: '阿尔巴尼亚',
    901000: '南极洲',
    901200: '阿尔及利亚',
    901600: '美属萨摩亚',
    902000: '安道尔',
    902400: '安哥拉',
    902800: '安提瓜和巴布达',
    903100: '阿塞拜疆',
    903200: '阿根廷',
    903600: '澳大利亚',
    904000: '奥地利',
    904400: '巴哈马',
    904800: '巴林',
    905000: '孟加拉',
    905100: '亚美尼亚',
    905200: '巴巴多斯',
    905600: '比利时',
    906000: '百慕大',
    906400: '不丹',
    906800: '玻利维亚',
    907000: '波黑',
    907200: '博茨瓦纳',
    907400: '布韦岛',
    907600: '巴西',
    908400: '伯利兹',
    908600: '英属印度洋领地',
    909000: '所罗门群岛',
    909200: '英属维尔京群岛',
    909600: '文莱',
    910000: '保加利亚',
    910400: '缅甸',
    910800: '布隆迪',
    911200: '白俄罗斯',
    911600: '柬埔寨',
    912000: '喀麦隆',
    912400: '加拿大',
    913200: '佛得角',
    913600: '开曼群岛',
    914000: '中非',
    914400: '斯里兰卡',
    914800: '乍得',
    915200: '智利',
    916200: '圣诞岛',
    916600: '科科斯群岛',
    917000: '哥伦比亚',
    917400: '科摩罗',
    917500: '马约特',
    917800: '刚果（布）',
    918000: '刚果（金）',
    918400: '库克群岛',
    918800: '哥斯达黎加',
    919100: '克罗地亚',
    919200: '古巴',
    919600: '塞浦路斯',
    920300: '捷克',
    920400: '贝宁',
    920800: '丹麦',
    921200: '多米尼克',
    921400: '多米尼加',
    921800: '厄瓜多尔',
    922200: '萨尔瓦多',
    922600: '赤道几内亚',
    923100: '埃塞俄比亚',
    923200: '厄立特里亚',
    923300: '爱沙尼亚',
    923400: '法罗群岛',
    923800: '马尔维纳斯群岛（ 福克兰）',
    923900: '南乔治亚岛和南桑威奇群岛',
    924200: '斐济群岛',
    924600: '芬兰',
    924800: '奥兰群岛',
    925000: '法国',
    925400: '法属圭亚那',
    925800: '法属波利尼西亚',
    926000: '法属南部领地',
    926200: '吉布提',
    926600: '加蓬',
    926800: '格鲁吉亚',
    927000: '冈比亚',
    927500: '巴勒斯坦',
    927600: '德国',
    928800: '加纳',
    929200: '直布罗陀',
    929600: '基里巴斯',
    930000: '希腊',
    930400: '格陵兰',
    930800: '格林纳达',
    931200: '瓜德罗普',
    931600: '关岛',
    932000: '危地马拉',
    932400: '几内亚',
    932800: '圭亚那',
    933200: '海地',
    933400: '赫德岛和麦克唐纳群岛',
    933600: '梵蒂冈',
    934000: '洪都拉斯',
    934800: '匈牙利',
    935200: '冰岛',
    935600: '印度',
    936000: '印尼',
    936400: '伊朗',
    936800: '伊拉克',
    937200: '爱尔兰',
    937600: '以色列',
    938000: '意大利',
    938400: '科特迪瓦',
    938800: '牙买加',
    939200: '日本',
    939800: '哈萨克斯坦',
    940000: '约旦',
    940400: '肯尼亚',
    940800: '朝鲜 北朝鲜',
    941000: '韩国',
    941400: '科威特',
    941700: '吉尔吉斯斯坦',
    941800: '老挝',
    942200: '黎巴嫩',
    942600: '莱索托',
    942800: '拉脱维亚',
    943000: '利比里亚',
    943400: '利比亚',
    943800: '列支敦士登',
    944000: '立陶宛',
    944200: '卢森堡',
    945000: '马达加斯加',
    945400: '马拉维',
    945800: '马来西亚',
    946200: '马尔代夫',
    946600: '马里',
    947000: '马耳他',
    947400: '马提尼克',
    947800: '毛里塔尼亚',
    948000: '毛里求斯',
    948400: '墨西哥',
    949200: '摩纳哥',
    949600: '蒙古国',
    949800: '摩尔多瓦',
    949900: '黑山',
    950000: '蒙塞拉特岛',
    950400: '摩洛哥',
    950800: '莫桑比克',
    951200: '阿曼',
    951600: '纳米比亚',
    952000: '瑙鲁',
    952400: '尼泊尔',
    952800: '荷兰',
    953300: '阿鲁巴',
    953500: '荷兰加勒比区',
    954000: '新喀里多尼亚',
    954800: '瓦努阿图',
    955400: '新西兰',
    955800: '尼加拉瓜',
    956200: '尼日尔',
    956600: '尼日利亚',
    957000: '纽埃',
    957400: '诺福克岛',
    957800: '挪威',
    958000: '北马里亚纳群岛',
    958100: '美国本土外小岛屿',
    958300: '密克罗尼西亚联邦',
    958400: '马绍尔群岛',
    958500: '帕劳',
    958600: '巴基斯坦',
    959100: '巴拿马',
    959800: '巴布亚新几内亚',
    960000: '巴拉圭',
    960400: '秘鲁',
    960800: '菲律宾',
    961200: '皮特凯恩群岛',
    961600: '波兰',
    962000: '葡萄牙',
    962400: '几内亚比绍',
    962600: '东帝汶',
    963000: '波多黎各',
    963400: '卡塔尔',
    963800: '留尼汪',
    964200: '罗马尼亚',
    964300: '俄罗斯',
    964600: '卢旺达',
    965200: '圣巴泰勒米岛',
    965400: '圣赫勒拿',
    965900: '圣基茨和尼维斯',
    966000: '安圭拉',
    966200: '圣卢西亚',
    966300: '法属圣马丁',
    966600: '圣皮埃尔和密克隆',
    967000: '圣文森特和格林纳丁斯',
    967400: '圣马力诺',
    967800: '圣多美和普林西比',
    968200: '沙特阿拉伯',
    968600: '塞内加尔',
    968800: '塞尔维亚',
    969000: '塞舌尔',
    969400: '塞拉利昂',
    970200: '新加坡',
    970300: '斯洛伐克',
    970400: '越南',
    970500: '斯洛文尼亚',
    970600: '索马里',
    971000: '南非',
    971600: '津巴布韦',
    972400: '西班牙',
    972800: '南苏丹',
    972900: '苏丹',
    973200: '西撒哈拉',
    974000: '苏里南',
    974400: '斯瓦尔巴群岛和 扬马延岛',
    974800: '斯威士兰',
    975200: '瑞典',
    975600: '瑞士',
    976000: '叙利亚',
    976200: '塔吉克斯坦',
    976400: '泰国',
    976800: '多哥',
    977200: '托克劳',
    977600: '汤加',
    978000: '特立尼达和多巴哥',
    978400: '阿联酋',
    978800: '突尼斯',
    979200: '土耳其',
    979500: '土库曼斯坦',
    979600: '特克斯和凯科斯群岛',
    979800: '图瓦卢',
    980000: '乌干达',
    980400: '乌克兰',
    980700: '马其顿',
    981800: '埃及',
    982600: '英国',
    983100: '根西岛',
    983200: '泽西岛',
    983300: '马恩岛',
    983400: '坦桑尼亚',
    984000: '美国',
    985000: '美属维尔京群岛',
    985400: '布基纳法索',
    985800: '乌拉圭',
    986000: '乌兹别克斯坦',
    986200: '委内瑞拉',
    987600: '瓦利斯和富图纳',
    988200: '萨摩亚',
    988700: '也门',
    989400: '赞比亚' },

  county_list: {
    110101: '东城区',
    110102: '西城区',
    110105: '朝阳区',
    110106: '丰台区',
    110107: '石景山区',
    110108: '海淀区',
    110109: '门头沟区',
    110111: '房山区',
    110112: '通州区',
    110113: '顺义区',
    110114: '昌平区',
    110115: '大兴区',
    110116: '怀柔区',
    110117: '平谷区',
    110118: '密云区',
    110119: '延庆区',
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
    120106: '红桥区',
    120110: '东丽区',
    120111: '西青区',
    120112: '津南区',
    120113: '北辰区',
    120114: '武清区',
    120115: '宝坻区',
    120116: '滨海新区',
    120117: '宁河区',
    120118: '静海区',
    120119: '蓟州区',
    130102: '长安区',
    130104: '桥西区',
    130105: '新华区',
    130107: '井陉矿区',
    130108: '裕华区',
    130109: '藁城区',
    130110: '鹿泉区',
    130111: '栾城区',
    130121: '井陉县',
    130123: '正定县',
    130125: '行唐县',
    130126: '灵寿县',
    130127: '高邑县',
    130128: '深泽县',
    130129: '赞皇县',
    130130: '无极县',
    130131: '平山县',
    130132: '元氏县',
    130133: '赵县',
    130181: '辛集市',
    130183: '晋州市',
    130184: '新乐市',
    130202: '路南区',
    130203: '路北区',
    130204: '古冶区',
    130205: '开平区',
    130207: '丰南区',
    130208: '丰润区',
    130209: '曹妃甸区',
    130224: '滦南县',
    130225: '乐亭县',
    130227: '迁西县',
    130229: '玉田县',
    130281: '遵化市',
    130283: '迁安市',
    130284: '滦州市',
    130302: '海港区',
    130303: '山海关区',
    130304: '北戴河区',
    130306: '抚宁区',
    130321: '青龙满族自治县',
    130322: '昌黎县',
    130324: '卢龙县',
    130390: '经济技术开发区',
    130402: '邯山区',
    130403: '丛台区',
    130404: '复兴区',
    130406: '峰峰矿区',
    130407: '肥乡区',
    130408: '永年区',
    130423: '临漳县',
    130424: '成安县',
    130425: '大名县',
    130426: '涉县',
    130427: '磁县',
    130430: '邱县',
    130431: '鸡泽县',
    130432: '广平县',
    130433: '馆陶县',
    130434: '魏县',
    130435: '曲周县',
    130481: '武安市',
    130502: '桥东区',
    130503: '桥西区',
    130521: '邢台县',
    130522: '临城县',
    130523: '内丘县',
    130524: '柏乡县',
    130525: '隆尧县',
    130526: '任县',
    130527: '南和县',
    130528: '宁晋县',
    130529: '巨鹿县',
    130530: '新河县',
    130531: '广宗县',
    130532: '平乡县',
    130533: '威县',
    130534: '清河县',
    130535: '临西县',
    130581: '南宫市',
    130582: '沙河市',
    130602: '竞秀区',
    130606: '莲池区',
    130607: '满城区',
    130608: '清苑区',
    130609: '徐水区',
    130623: '涞水县',
    130624: '阜平县',
    130626: '定兴县',
    130627: '唐县',
    130628: '高阳县',
    130629: '容城县',
    130630: '涞源县',
    130631: '望都县',
    130632: '安新县',
    130633: '易县',
    130634: '曲阳县',
    130635: '蠡县',
    130636: '顺平县',
    130637: '博野县',
    130638: '雄县',
    130681: '涿州市',
    130682: '定州市',
    130683: '安国市',
    130684: '高碑店市',
    130702: '桥东区',
    130703: '桥西区',
    130705: '宣化区',
    130706: '下花园区',
    130708: '万全区',
    130709: '崇礼区',
    130722: '张北县',
    130723: '康保县',
    130724: '沽源县',
    130725: '尚义县',
    130726: '蔚县',
    130727: '阳原县',
    130728: '怀安县',
    130730: '怀来县',
    130731: '涿鹿县',
    130732: '赤城县',
    130802: '双桥区',
    130803: '双滦区',
    130804: '鹰手营子矿区',
    130821: '承德县',
    130822: '兴隆县',
    130824: '滦平县',
    130825: '隆化县',
    130826: '丰宁满族自治县',
    130827: '宽城满族自治县',
    130828: '围场满族蒙古族自治县',
    130881: '平泉市',
    130902: '新华区',
    130903: '运河区',
    130921: '沧县',
    130922: '青县',
    130923: '东光县',
    130924: '海兴县',
    130925: '盐山县',
    130926: '肃宁县',
    130927: '南皮县',
    130928: '吴桥县',
    130929: '献县',
    130930: '孟村回族自治县',
    130981: '泊头市',
    130982: '任丘市',
    130983: '黄骅市',
    130984: '河间市',
    131002: '安次区',
    131003: '广阳区',
    131022: '固安县',
    131023: '永清县',
    131024: '香河县',
    131025: '大城县',
    131026: '文安县',
    131028: '大厂回族自治县',
    131081: '霸州市',
    131082: '三河市',
    131090: '开发区',
    131102: '桃城区',
    131103: '冀州区',
    131121: '枣强县',
    131122: '武邑县',
    131123: '武强县',
    131124: '饶阳县',
    131125: '安平县',
    131126: '故城县',
    131127: '景县',
    131128: '阜城县',
    131182: '深州市',
    140105: '小店区',
    140106: '迎泽区',
    140107: '杏花岭区',
    140108: '尖草坪区',
    140109: '万柏林区',
    140110: '晋源区',
    140121: '清徐县',
    140122: '阳曲县',
    140123: '娄烦县',
    140181: '古交市',
    140212: '新荣区',
    140213: '平城区',
    140214: '云冈区',
    140215: '云州区',
    140221: '阳高县',
    140222: '天镇县',
    140223: '广灵县',
    140224: '灵丘县',
    140225: '浑源县',
    140226: '左云县',
    140302: '城区',
    140303: '矿区',
    140311: '郊区',
    140321: '平定县',
    140322: '盂县',
    140403: '潞州区',
    140404: '上党区',
    140405: '屯留区',
    140406: '潞城区',
    140423: '襄垣县',
    140425: '平顺县',
    140426: '黎城县',
    140427: '壶关县',
    140428: '长子县',
    140429: '武乡县',
    140430: '沁县',
    140431: '沁源县',
    140502: '城区',
    140521: '沁水县',
    140522: '阳城县',
    140524: '陵川县',
    140525: '泽州县',
    140581: '高平市',
    140602: '朔城区',
    140603: '平鲁区',
    140621: '山阴县',
    140622: '应县',
    140623: '右玉县',
    140681: '怀仁市',
    140702: '榆次区',
    140721: '榆社县',
    140722: '左权县',
    140723: '和顺县',
    140724: '昔阳县',
    140725: '寿阳县',
    140726: '太谷县',
    140727: '祁县',
    140728: '平遥县',
    140729: '灵石县',
    140781: '介休市',
    140802: '盐湖区',
    140821: '临猗县',
    140822: '万荣县',
    140823: '闻喜县',
    140824: '稷山县',
    140825: '新绛县',
    140826: '绛县',
    140827: '垣曲县',
    140828: '夏县',
    140829: '平陆县',
    140830: '芮城县',
    140881: '永济市',
    140882: '河津市',
    140902: '忻府区',
    140921: '定襄县',
    140922: '五台县',
    140923: '代县',
    140924: '繁峙县',
    140925: '宁武县',
    140926: '静乐县',
    140927: '神池县',
    140928: '五寨县',
    140929: '岢岚县',
    140930: '河曲县',
    140931: '保德县',
    140932: '偏关县',
    140981: '原平市',
    141002: '尧都区',
    141021: '曲沃县',
    141022: '翼城县',
    141023: '襄汾县',
    141024: '洪洞县',
    141025: '古县',
    141026: '安泽县',
    141027: '浮山县',
    141028: '吉县',
    141029: '乡宁县',
    141030: '大宁县',
    141031: '隰县',
    141032: '永和县',
    141033: '蒲县',
    141034: '汾西县',
    141081: '侯马市',
    141082: '霍州市',
    141102: '离石区',
    141121: '文水县',
    141122: '交城县',
    141123: '兴县',
    141124: '临县',
    141125: '柳林县',
    141126: '石楼县',
    141127: '岚县',
    141128: '方山县',
    141129: '中阳县',
    141130: '交口县',
    141181: '孝义市',
    141182: '汾阳市',
    150102: '新城区',
    150103: '回民区',
    150104: '玉泉区',
    150105: '赛罕区',
    150121: '土默特左旗',
    150122: '托克托县',
    150123: '和林格尔县',
    150124: '清水河县',
    150125: '武川县',
    150202: '东河区',
    150203: '昆都仑区',
    150204: '青山区',
    150205: '石拐区',
    150206: '白云鄂博矿区',
    150207: '九原区',
    150221: '土默特右旗',
    150222: '固阳县',
    150223: '达尔罕茂明安联合旗',
    150302: '海勃湾区',
    150303: '海南区',
    150304: '乌达区',
    150402: '红山区',
    150403: '元宝山区',
    150404: '松山区',
    150421: '阿鲁科尔沁旗',
    150422: '巴林左旗',
    150423: '巴林右旗',
    150424: '林西县',
    150425: '克什克腾旗',
    150426: '翁牛特旗',
    150428: '喀喇沁旗',
    150429: '宁城县',
    150430: '敖汉旗',
    150502: '科尔沁区',
    150521: '科尔沁左翼中旗',
    150522: '科尔沁左翼后旗',
    150523: '开鲁县',
    150524: '库伦旗',
    150525: '奈曼旗',
    150526: '扎鲁特旗',
    150581: '霍林郭勒市',
    150602: '东胜区',
    150603: '康巴什区',
    150621: '达拉特旗',
    150622: '准格尔旗',
    150623: '鄂托克前旗',
    150624: '鄂托克旗',
    150625: '杭锦旗',
    150626: '乌审旗',
    150627: '伊金霍洛旗',
    150702: '海拉尔区',
    150703: '扎赉诺尔区',
    150721: '阿荣旗',
    150722: '莫力达瓦达斡尔族自治旗',
    150723: '鄂伦春自治旗',
    150724: '鄂温克族自治旗',
    150725: '陈巴尔虎旗',
    150726: '新巴尔虎左旗',
    150727: '新巴尔虎右旗',
    150781: '满洲里市',
    150782: '牙克石市',
    150783: '扎兰屯市',
    150784: '额尔古纳市',
    150785: '根河市',
    150802: '临河区',
    150821: '五原县',
    150822: '磴口县',
    150823: '乌拉特前旗',
    150824: '乌拉特中旗',
    150825: '乌拉特后旗',
    150826: '杭锦后旗',
    150902: '集宁区',
    150921: '卓资县',
    150922: '化德县',
    150923: '商都县',
    150924: '兴和县',
    150925: '凉城县',
    150926: '察哈尔右翼前旗',
    150927: '察哈尔右翼中旗',
    150928: '察哈尔右翼后旗',
    150929: '四子王旗',
    150981: '丰镇市',
    152201: '乌兰浩特市',
    152202: '阿尔山市',
    152221: '科尔沁右翼前旗',
    152222: '科尔沁右翼中旗',
    152223: '扎赉特旗',
    152224: '突泉县',
    152501: '二连浩特市',
    152502: '锡林浩特市',
    152522: '阿巴嘎旗',
    152523: '苏尼特左旗',
    152524: '苏尼特右旗',
    152525: '东乌珠穆沁旗',
    152526: '西乌珠穆沁旗',
    152527: '太仆寺旗',
    152528: '镶黄旗',
    152529: '正镶白旗',
    152530: '正蓝旗',
    152531: '多伦县',
    152921: '阿拉善左旗',
    152922: '阿拉善右旗',
    152923: '额济纳旗',
    210102: '和平区',
    210103: '沈河区',
    210104: '大东区',
    210105: '皇姑区',
    210106: '铁西区',
    210111: '苏家屯区',
    210112: '浑南区',
    210113: '沈北新区',
    210114: '于洪区',
    210115: '辽中区',
    210123: '康平县',
    210124: '法库县',
    210181: '新民市',
    210190: '经济技术开发区',
    210202: '中山区',
    210203: '西岗区',
    210204: '沙河口区',
    210211: '甘井子区',
    210212: '旅顺口区',
    210213: '金州区',
    210214: '普兰店区',
    210224: '长海县',
    210281: '瓦房店市',
    210283: '庄河市',
    210302: '铁东区',
    210303: '铁西区',
    210304: '立山区',
    210311: '千山区',
    210321: '台安县',
    210323: '岫岩满族自治县',
    210381: '海城市',
    210390: '高新区',
    210402: '新抚区',
    210403: '东洲区',
    210404: '望花区',
    210411: '顺城区',
    210421: '抚顺县',
    210422: '新宾满族自治县',
    210423: '清原满族自治县',
    210502: '平山区',
    210503: '溪湖区',
    210504: '明山区',
    210505: '南芬区',
    210521: '本溪满族自治县',
    210522: '桓仁满族自治县',
    210602: '元宝区',
    210603: '振兴区',
    210604: '振安区',
    210624: '宽甸满族自治县',
    210681: '东港市',
    210682: '凤城市',
    210702: '古塔区',
    210703: '凌河区',
    210711: '太和区',
    210726: '黑山县',
    210727: '义县',
    210781: '凌海市',
    210782: '北镇市',
    210793: '经济技术开发区',
    210802: '站前区',
    210803: '西市区',
    210804: '鲅鱼圈区',
    210811: '老边区',
    210881: '盖州市',
    210882: '大石桥市',
    210902: '海州区',
    210903: '新邱区',
    210904: '太平区',
    210905: '清河门区',
    210911: '细河区',
    210921: '阜新蒙古族自治县',
    210922: '彰武县',
    211002: '白塔区',
    211003: '文圣区',
    211004: '宏伟区',
    211005: '弓长岭区',
    211011: '太子河区',
    211021: '辽阳县',
    211081: '灯塔市',
    211102: '双台子区',
    211103: '兴隆台区',
    211104: '大洼区',
    211122: '盘山县',
    211202: '银州区',
    211204: '清河区',
    211221: '铁岭县',
    211223: '西丰县',
    211224: '昌图县',
    211281: '调兵山市',
    211282: '开原市',
    211302: '双塔区',
    211303: '龙城区',
    211321: '朝阳县',
    211322: '建平县',
    211324: '喀喇沁左翼蒙古族自治县',
    211381: '北票市',
    211382: '凌源市',
    211402: '连山区',
    211403: '龙港区',
    211404: '南票区',
    211421: '绥中县',
    211422: '建昌县',
    211481: '兴城市',
    220102: '南关区',
    220103: '宽城区',
    220104: '朝阳区',
    220105: '二道区',
    220106: '绿园区',
    220112: '双阳区',
    220113: '九台区',
    220122: '农安县',
    220182: '榆树市',
    220183: '德惠市',
    220192: '经济技术开发区',
    220202: '昌邑区',
    220203: '龙潭区',
    220204: '船营区',
    220211: '丰满区',
    220221: '永吉县',
    220281: '蛟河市',
    220282: '桦甸市',
    220283: '舒兰市',
    220284: '磐石市',
    220302: '铁西区',
    220303: '铁东区',
    220322: '梨树县',
    220323: '伊通满族自治县',
    220381: '公主岭市',
    220382: '双辽市',
    220402: '龙山区',
    220403: '西安区',
    220421: '东丰县',
    220422: '东辽县',
    220502: '东昌区',
    220503: '二道江区',
    220521: '通化县',
    220523: '辉南县',
    220524: '柳河县',
    220581: '梅河口市',
    220582: '集安市',
    220602: '浑江区',
    220605: '江源区',
    220621: '抚松县',
    220622: '靖宇县',
    220623: '长白朝鲜族自治县',
    220681: '临江市',
    220702: '宁江区',
    220721: '前郭尔罗斯蒙古族自治县',
    220722: '长岭县',
    220723: '乾安县',
    220781: '扶余市',
    220802: '洮北区',
    220821: '镇赉县',
    220822: '通榆县',
    220881: '洮南市',
    220882: '大安市',
    222401: '延吉市',
    222402: '图们市',
    222403: '敦化市',
    222404: '珲春市',
    222405: '龙井市',
    222406: '和龙市',
    222424: '汪清县',
    222426: '安图县',
    230102: '道里区',
    230103: '南岗区',
    230104: '道外区',
    230108: '平房区',
    230109: '松北区',
    230110: '香坊区',
    230111: '呼兰区',
    230112: '阿城区',
    230113: '双城区',
    230123: '依兰县',
    230124: '方正县',
    230125: '宾县',
    230126: '巴彦县',
    230127: '木兰县',
    230128: '通河县',
    230129: '延寿县',
    230183: '尚志市',
    230184: '五常市',
    230202: '龙沙区',
    230203: '建华区',
    230204: '铁锋区',
    230205: '昂昂溪区',
    230206: '富拉尔基区',
    230207: '碾子山区',
    230208: '梅里斯达斡尔族区',
    230221: '龙江县',
    230223: '依安县',
    230224: '泰来县',
    230225: '甘南县',
    230227: '富裕县',
    230229: '克山县',
    230230: '克东县',
    230231: '拜泉县',
    230281: '讷河市',
    230302: '鸡冠区',
    230303: '恒山区',
    230304: '滴道区',
    230305: '梨树区',
    230306: '城子河区',
    230307: '麻山区',
    230321: '鸡东县',
    230381: '虎林市',
    230382: '密山市',
    230402: '向阳区',
    230403: '工农区',
    230404: '南山区',
    230405: '兴安区',
    230406: '东山区',
    230407: '兴山区',
    230421: '萝北县',
    230422: '绥滨县',
    230502: '尖山区',
    230503: '岭东区',
    230505: '四方台区',
    230506: '宝山区',
    230521: '集贤县',
    230522: '友谊县',
    230523: '宝清县',
    230524: '饶河县',
    230602: '萨尔图区',
    230603: '龙凤区',
    230604: '让胡路区',
    230605: '红岗区',
    230606: '大同区',
    230621: '肇州县',
    230622: '肇源县',
    230623: '林甸县',
    230624: '杜尔伯特蒙古族自治县',
    230702: '伊春区',
    230703: '南岔区',
    230704: '友好区',
    230705: '西林区',
    230706: '翠峦区',
    230707: '新青区',
    230708: '美溪区',
    230709: '金山屯区',
    230710: '五营区',
    230711: '乌马河区',
    230712: '汤旺河区',
    230713: '带岭区',
    230714: '乌伊岭区',
    230715: '红星区',
    230716: '上甘岭区',
    230722: '嘉荫县',
    230781: '铁力市',
    230803: '向阳区',
    230804: '前进区',
    230805: '东风区',
    230811: '郊区',
    230822: '桦南县',
    230826: '桦川县',
    230828: '汤原县',
    230881: '同江市',
    230882: '富锦市',
    230883: '抚远市',
    230902: '新兴区',
    230903: '桃山区',
    230904: '茄子河区',
    230921: '勃利县',
    231002: '东安区',
    231003: '阳明区',
    231004: '爱民区',
    231005: '西安区',
    231025: '林口县',
    231081: '绥芬河市',
    231083: '海林市',
    231084: '宁安市',
    231085: '穆棱市',
    231086: '东宁市',
    231102: '爱辉区',
    231121: '嫩江县',
    231123: '逊克县',
    231124: '孙吴县',
    231181: '北安市',
    231182: '五大连池市',
    231202: '北林区',
    231221: '望奎县',
    231222: '兰西县',
    231223: '青冈县',
    231224: '庆安县',
    231225: '明水县',
    231226: '绥棱县',
    231281: '安达市',
    231282: '肇东市',
    231283: '海伦市',
    232701: '漠河市',
    232721: '呼玛县',
    232722: '塔河县',
    232790: '松岭区',
    232791: '呼中区',
    232792: '加格达奇区',
    232793: '新林区',
    310101: '黄浦区',
    310104: '徐汇区',
    310105: '长宁区',
    310106: '静安区',
    310107: '普陀区',
    310109: '虹口区',
    310110: '杨浦区',
    310112: '闵行区',
    310113: '宝山区',
    310114: '嘉定区',
    310115: '浦东新区',
    310116: '金山区',
    310117: '松江区',
    310118: '青浦区',
    310120: '奉贤区',
    310151: '崇明区',
    320102: '玄武区',
    320104: '秦淮区',
    320105: '建邺区',
    320106: '鼓楼区',
    320111: '浦口区',
    320113: '栖霞区',
    320114: '雨花台区',
    320115: '江宁区',
    320116: '六合区',
    320117: '溧水区',
    320118: '高淳区',
    320205: '锡山区',
    320206: '惠山区',
    320211: '滨湖区',
    320213: '梁溪区',
    320214: '新吴区',
    320281: '江阴市',
    320282: '宜兴市',
    320302: '鼓楼区',
    320303: '云龙区',
    320305: '贾汪区',
    320311: '泉山区',
    320312: '铜山区',
    320321: '丰县',
    320322: '沛县',
    320324: '睢宁县',
    320381: '新沂市',
    320382: '邳州市',
    320391: '工业园区',
    320402: '天宁区',
    320404: '钟楼区',
    320411: '新北区',
    320412: '武进区',
    320413: '金坛区',
    320481: '溧阳市',
    320505: '虎丘区',
    320506: '吴中区',
    320507: '相城区',
    320508: '姑苏区',
    320509: '吴江区',
    320581: '常熟市',
    320582: '张家港市',
    320583: '昆山市',
    320585: '太仓市',
    320590: '工业园区',
    320591: '高新区',
    320602: '崇川区',
    320611: '港闸区',
    320612: '通州区',
    320623: '如东县',
    320681: '启东市',
    320682: '如皋市',
    320684: '海门市',
    320685: '海安市',
    320691: '高新区',
    320703: '连云区',
    320706: '海州区',
    320707: '赣榆区',
    320722: '东海县',
    320723: '灌云县',
    320724: '灌南县',
    320803: '淮安区',
    320804: '淮阴区',
    320812: '清江浦区',
    320813: '洪泽区',
    320826: '涟水县',
    320830: '盱眙县',
    320831: '金湖县',
    320890: '经济开发区',
    320902: '亭湖区',
    320903: '盐都区',
    320904: '大丰区',
    320921: '响水县',
    320922: '滨海县',
    320923: '阜宁县',
    320924: '射阳县',
    320925: '建湖县',
    320981: '东台市',
    321002: '广陵区',
    321003: '邗江区',
    321012: '江都区',
    321023: '宝应县',
    321081: '仪征市',
    321084: '高邮市',
    321090: '经济开发区',
    321102: '京口区',
    321111: '润州区',
    321112: '丹徒区',
    321181: '丹阳市',
    321182: '扬中市',
    321183: '句容市',
    321202: '海陵区',
    321203: '高港区',
    321204: '姜堰区',
    321281: '兴化市',
    321282: '靖江市',
    321283: '泰兴市',
    321302: '宿城区',
    321311: '宿豫区',
    321322: '沭阳县',
    321323: '泗阳县',
    321324: '泗洪县',
    330102: '上城区',
    330103: '下城区',
    330104: '江干区',
    330105: '拱墅区',
    330106: '西湖区',
    330108: '滨江区',
    330109: '萧山区',
    330110: '余杭区',
    330111: '富阳区',
    330112: '临安区',
    330122: '桐庐县',
    330127: '淳安县',
    330182: '建德市',
    330203: '海曙区',
    330205: '江北区',
    330206: '北仑区',
    330211: '镇海区',
    330212: '鄞州区',
    330213: '奉化区',
    330225: '象山县',
    330226: '宁海县',
    330281: '余姚市',
    330282: '慈溪市',
    330302: '鹿城区',
    330303: '龙湾区',
    330304: '瓯海区',
    330305: '洞头区',
    330324: '永嘉县',
    330326: '平阳县',
    330327: '苍南县',
    330328: '文成县',
    330329: '泰顺县',
    330381: '瑞安市',
    330382: '乐清市',
    330402: '南湖区',
    330411: '秀洲区',
    330421: '嘉善县',
    330424: '海盐县',
    330481: '海宁市',
    330482: '平湖市',
    330483: '桐乡市',
    330502: '吴兴区',
    330503: '南浔区',
    330521: '德清县',
    330522: '长兴县',
    330523: '安吉县',
    330602: '越城区',
    330603: '柯桥区',
    330604: '上虞区',
    330624: '新昌县',
    330681: '诸暨市',
    330683: '嵊州市',
    330702: '婺城区',
    330703: '金东区',
    330723: '武义县',
    330726: '浦江县',
    330727: '磐安县',
    330781: '兰溪市',
    330782: '义乌市',
    330783: '东阳市',
    330784: '永康市',
    330802: '柯城区',
    330803: '衢江区',
    330822: '常山县',
    330824: '开化县',
    330825: '龙游县',
    330881: '江山市',
    330902: '定海区',
    330903: '普陀区',
    330921: '岱山县',
    330922: '嵊泗县',
    331002: '椒江区',
    331003: '黄岩区',
    331004: '路桥区',
    331022: '三门县',
    331023: '天台县',
    331024: '仙居县',
    331081: '温岭市',
    331082: '临海市',
    331083: '玉环市',
    331102: '莲都区',
    331121: '青田县',
    331122: '缙云县',
    331123: '遂昌县',
    331124: '松阳县',
    331125: '云和县',
    331126: '庆元县',
    331127: '景宁畲族自治县',
    331181: '龙泉市',
    340102: '瑶海区',
    340103: '庐阳区',
    340104: '蜀山区',
    340111: '包河区',
    340121: '长丰县',
    340122: '肥东县',
    340123: '肥西县',
    340124: '庐江县',
    340181: '巢湖市',
    340190: '高新技术开发区',
    340191: '经济技术开发区',
    340202: '镜湖区',
    340203: '弋江区',
    340207: '鸠江区',
    340208: '三山区',
    340221: '芜湖县',
    340222: '繁昌县',
    340223: '南陵县',
    340225: '无为县',
    340302: '龙子湖区',
    340303: '蚌山区',
    340304: '禹会区',
    340311: '淮上区',
    340321: '怀远县',
    340322: '五河县',
    340323: '固镇县',
    340402: '大通区',
    340403: '田家庵区',
    340404: '谢家集区',
    340405: '八公山区',
    340406: '潘集区',
    340421: '凤台县',
    340422: '寿县',
    340503: '花山区',
    340504: '雨山区',
    340506: '博望区',
    340521: '当涂县',
    340522: '含山县',
    340523: '和县',
    340602: '杜集区',
    340603: '相山区',
    340604: '烈山区',
    340621: '濉溪县',
    340705: '铜官区',
    340706: '义安区',
    340711: '郊区',
    340722: '枞阳县',
    340802: '迎江区',
    340803: '大观区',
    340811: '宜秀区',
    340822: '怀宁县',
    340824: '潜山县',
    340825: '太湖县',
    340826: '宿松县',
    340827: '望江县',
    340828: '岳西县',
    340881: '桐城市',
    341002: '屯溪区',
    341003: '黄山区',
    341004: '徽州区',
    341021: '歙县',
    341022: '休宁县',
    341023: '黟县',
    341024: '祁门县',
    341102: '琅琊区',
    341103: '南谯区',
    341122: '来安县',
    341124: '全椒县',
    341125: '定远县',
    341126: '凤阳县',
    341181: '天长市',
    341182: '明光市',
    341202: '颍州区',
    341203: '颍东区',
    341204: '颍泉区',
    341221: '临泉县',
    341222: '太和县',
    341225: '阜南县',
    341226: '颍上县',
    341282: '界首市',
    341302: '埇桥区',
    341321: '砀山县',
    341322: '萧县',
    341323: '灵璧县',
    341324: '泗县',
    341390: '经济开发区',
    341502: '金安区',
    341503: '裕安区',
    341504: '叶集区',
    341522: '霍邱县',
    341523: '舒城县',
    341524: '金寨县',
    341525: '霍山县',
    341602: '谯城区',
    341621: '涡阳县',
    341622: '蒙城县',
    341623: '利辛县',
    341702: '贵池区',
    341721: '东至县',
    341722: '石台县',
    341723: '青阳县',
    341802: '宣州区',
    341821: '郎溪县',
    341822: '广德县',
    341823: '泾县',
    341824: '绩溪县',
    341825: '旌德县',
    341881: '宁国市',
    350102: '鼓楼区',
    350103: '台江区',
    350104: '仓山区',
    350105: '马尾区',
    350111: '晋安区',
    350112: '长乐区',
    350121: '闽侯县',
    350122: '连江县',
    350123: '罗源县',
    350124: '闽清县',
    350125: '永泰县',
    350128: '平潭县',
    350181: '福清市',
    350203: '思明区',
    350205: '海沧区',
    350206: '湖里区',
    350211: '集美区',
    350212: '同安区',
    350213: '翔安区',
    350302: '城厢区',
    350303: '涵江区',
    350304: '荔城区',
    350305: '秀屿区',
    350322: '仙游县',
    350402: '梅列区',
    350403: '三元区',
    350421: '明溪县',
    350423: '清流县',
    350424: '宁化县',
    350425: '大田县',
    350426: '尤溪县',
    350427: '沙县',
    350428: '将乐县',
    350429: '泰宁县',
    350430: '建宁县',
    350481: '永安市',
    350502: '鲤城区',
    350503: '丰泽区',
    350504: '洛江区',
    350505: '泉港区',
    350521: '惠安县',
    350524: '安溪县',
    350525: '永春县',
    350526: '德化县',
    350527: '金门县',
    350581: '石狮市',
    350582: '晋江市',
    350583: '南安市',
    350602: '芗城区',
    350603: '龙文区',
    350622: '云霄县',
    350623: '漳浦县',
    350624: '诏安县',
    350625: '长泰县',
    350626: '东山县',
    350627: '南靖县',
    350628: '平和县',
    350629: '华安县',
    350681: '龙海市',
    350702: '延平区',
    350703: '建阳区',
    350721: '顺昌县',
    350722: '浦城县',
    350723: '光泽县',
    350724: '松溪县',
    350725: '政和县',
    350781: '邵武市',
    350782: '武夷山市',
    350783: '建瓯市',
    350802: '新罗区',
    350803: '永定区',
    350821: '长汀县',
    350823: '上杭县',
    350824: '武平县',
    350825: '连城县',
    350881: '漳平市',
    350902: '蕉城区',
    350921: '霞浦县',
    350922: '古田县',
    350923: '屏南县',
    350924: '寿宁县',
    350925: '周宁县',
    350926: '柘荣县',
    350981: '福安市',
    350982: '福鼎市',
    360102: '东湖区',
    360103: '西湖区',
    360104: '青云谱区',
    360105: '湾里区',
    360111: '青山湖区',
    360112: '新建区',
    360121: '南昌县',
    360123: '安义县',
    360124: '进贤县',
    360190: '经济技术开发区',
    360192: '高新区',
    360202: '昌江区',
    360203: '珠山区',
    360222: '浮梁县',
    360281: '乐平市',
    360302: '安源区',
    360313: '湘东区',
    360321: '莲花县',
    360322: '上栗县',
    360323: '芦溪县',
    360402: '濂溪区',
    360403: '浔阳区',
    360404: '柴桑区',
    360423: '武宁县',
    360424: '修水县',
    360425: '永修县',
    360426: '德安县',
    360428: '都昌县',
    360429: '湖口县',
    360430: '彭泽县',
    360481: '瑞昌市',
    360482: '共青城市',
    360483: '庐山市',
    360490: '经济技术开发区',
    360502: '渝水区',
    360521: '分宜县',
    360602: '月湖区',
    360603: '余江区',
    360681: '贵溪市',
    360702: '章贡区',
    360703: '南康区',
    360704: '赣县区',
    360722: '信丰县',
    360723: '大余县',
    360724: '上犹县',
    360725: '崇义县',
    360726: '安远县',
    360727: '龙南县',
    360728: '定南县',
    360729: '全南县',
    360730: '宁都县',
    360731: '于都县',
    360732: '兴国县',
    360733: '会昌县',
    360734: '寻乌县',
    360735: '石城县',
    360781: '瑞金市',
    360802: '吉州区',
    360803: '青原区',
    360821: '吉安县',
    360822: '吉水县',
    360823: '峡江县',
    360824: '新干县',
    360825: '永丰县',
    360826: '泰和县',
    360827: '遂川县',
    360828: '万安县',
    360829: '安福县',
    360830: '永新县',
    360881: '井冈山市',
    360902: '袁州区',
    360921: '奉新县',
    360922: '万载县',
    360923: '上高县',
    360924: '宜丰县',
    360925: '靖安县',
    360926: '铜鼓县',
    360981: '丰城市',
    360982: '樟树市',
    360983: '高安市',
    361002: '临川区',
    361003: '东乡区',
    361021: '南城县',
    361022: '黎川县',
    361023: '南丰县',
    361024: '崇仁县',
    361025: '乐安县',
    361026: '宜黄县',
    361027: '金溪县',
    361028: '资溪县',
    361030: '广昌县',
    361102: '信州区',
    361103: '广丰区',
    361121: '上饶县',
    361123: '玉山县',
    361124: '铅山县',
    361125: '横峰县',
    361126: '弋阳县',
    361127: '余干县',
    361128: '鄱阳县',
    361129: '万年县',
    361130: '婺源县',
    361181: '德兴市',
    370102: '历下区',
    370103: '市中区',
    370104: '槐荫区',
    370105: '天桥区',
    370112: '历城区',
    370113: '长清区',
    370114: '章丘区',
    370115: '济阳区',
    370124: '平阴县',
    370126: '商河县',
    370190: '高新区',
    370191: '莱芜区',
    370202: '市南区',
    370203: '市北区',
    370211: '黄岛区',
    370212: '崂山区',
    370213: '李沧区',
    370214: '城阳区',
    370215: '即墨区',
    370281: '胶州市',
    370283: '平度市',
    370285: '莱西市',
    370290: '开发区',
    370302: '淄川区',
    370303: '张店区',
    370304: '博山区',
    370305: '临淄区',
    370306: '周村区',
    370321: '桓台县',
    370322: '高青县',
    370323: '沂源县',
    370402: '市中区',
    370403: '薛城区',
    370404: '峄城区',
    370405: '台儿庄区',
    370406: '山亭区',
    370481: '滕州市',
    370502: '东营区',
    370503: '河口区',
    370505: '垦利区',
    370522: '利津县',
    370523: '广饶县',
    370602: '芝罘区',
    370611: '福山区',
    370612: '牟平区',
    370613: '莱山区',
    370634: '长岛县',
    370681: '龙口市',
    370682: '莱阳市',
    370683: '莱州市',
    370684: '蓬莱市',
    370685: '招远市',
    370686: '栖霞市',
    370687: '海阳市',
    370690: '开发区',
    370702: '潍城区',
    370703: '寒亭区',
    370704: '坊子区',
    370705: '奎文区',
    370724: '临朐县',
    370725: '昌乐县',
    370781: '青州市',
    370782: '诸城市',
    370783: '寿光市',
    370784: '安丘市',
    370785: '高密市',
    370786: '昌邑市',
    370790: '开发区',
    370791: '高新区',
    370811: '任城区',
    370812: '兖州区',
    370826: '微山县',
    370827: '鱼台县',
    370828: '金乡县',
    370829: '嘉祥县',
    370830: '汶上县',
    370831: '泗水县',
    370832: '梁山县',
    370881: '曲阜市',
    370883: '邹城市',
    370890: '高新区',
    370902: '泰山区',
    370911: '岱岳区',
    370921: '宁阳县',
    370923: '东平县',
    370982: '新泰市',
    370983: '肥城市',
    371002: '环翠区',
    371003: '文登区',
    371082: '荣成市',
    371083: '乳山市',
    371091: '经济技术开发区',
    371102: '东港区',
    371103: '岚山区',
    371121: '五莲县',
    371122: '莒县',
    371302: '兰山区',
    371311: '罗庄区',
    371312: '河东区',
    371321: '沂南县',
    371322: '郯城县',
    371323: '沂水县',
    371324: '兰陵县',
    371325: '费县',
    371326: '平邑县',
    371327: '莒南县',
    371328: '蒙阴县',
    371329: '临沭县',
    371402: '德城区',
    371403: '陵城区',
    371422: '宁津县',
    371423: '庆云县',
    371424: '临邑县',
    371425: '齐河县',
    371426: '平原县',
    371427: '夏津县',
    371428: '武城县',
    371481: '乐陵市',
    371482: '禹城市',
    371502: '东昌府区',
    371521: '阳谷县',
    371522: '莘县',
    371523: '茌平县',
    371524: '东阿县',
    371525: '冠县',
    371526: '高唐县',
    371581: '临清市',
    371602: '滨城区',
    371603: '沾化区',
    371621: '惠民县',
    371622: '阳信县',
    371623: '无棣县',
    371625: '博兴县',
    371681: '邹平市',
    371702: '牡丹区',
    371703: '定陶区',
    371721: '曹县',
    371722: '单县',
    371723: '成武县',
    371724: '巨野县',
    371725: '郓城县',
    371726: '鄄城县',
    371728: '东明县',
    410102: '中原区',
    410103: '二七区',
    410104: '管城回族区',
    410105: '金水区',
    410106: '上街区',
    410108: '惠济区',
    410122: '中牟县',
    410181: '巩义市',
    410182: '荥阳市',
    410183: '新密市',
    410184: '新郑市',
    410185: '登封市',
    410190: '高新技术开发区',
    410191: '经济技术开发区',
    410202: '龙亭区',
    410203: '顺河回族区',
    410204: '鼓楼区',
    410205: '禹王台区',
    410212: '祥符区',
    410221: '杞县',
    410222: '通许县',
    410223: '尉氏县',
    410225: '兰考县',
    410302: '老城区',
    410303: '西工区',
    410304: '瀍河回族区',
    410305: '涧西区',
    410306: '吉利区',
    410311: '洛龙区',
    410322: '孟津县',
    410323: '新安县',
    410324: '栾川县',
    410325: '嵩县',
    410326: '汝阳县',
    410327: '宜阳县',
    410328: '洛宁县',
    410329: '伊川县',
    410381: '偃师市',
    410402: '新华区',
    410403: '卫东区',
    410404: '石龙区',
    410411: '湛河区',
    410421: '宝丰县',
    410422: '叶县',
    410423: '鲁山县',
    410425: '郏县',
    410481: '舞钢市',
    410482: '汝州市',
    410502: '文峰区',
    410503: '北关区',
    410505: '殷都区',
    410506: '龙安区',
    410522: '安阳县',
    410523: '汤阴县',
    410526: '滑县',
    410527: '内黄县',
    410581: '林州市',
    410590: '开发区',
    410602: '鹤山区',
    410603: '山城区',
    410611: '淇滨区',
    410621: '浚县',
    410622: '淇县',
    410702: '红旗区',
    410703: '卫滨区',
    410704: '凤泉区',
    410711: '牧野区',
    410721: '新乡县',
    410724: '获嘉县',
    410725: '原阳县',
    410726: '延津县',
    410727: '封丘县',
    410728: '长垣县',
    410781: '卫辉市',
    410782: '辉县市',
    410802: '解放区',
    410803: '中站区',
    410804: '马村区',
    410811: '山阳区',
    410821: '修武县',
    410822: '博爱县',
    410823: '武陟县',
    410825: '温县',
    410882: '沁阳市',
    410883: '孟州市',
    410902: '华龙区',
    410922: '清丰县',
    410923: '南乐县',
    410926: '范县',
    410927: '台前县',
    410928: '濮阳县',
    411002: '魏都区',
    411003: '建安区',
    411024: '鄢陵县',
    411025: '襄城县',
    411081: '禹州市',
    411082: '长葛市',
    411102: '源汇区',
    411103: '郾城区',
    411104: '召陵区',
    411121: '舞阳县',
    411122: '临颍县',
    411202: '湖滨区',
    411203: '陕州区',
    411221: '渑池县',
    411224: '卢氏县',
    411281: '义马市',
    411282: '灵宝市',
    411302: '宛城区',
    411303: '卧龙区',
    411321: '南召县',
    411322: '方城县',
    411323: '西峡县',
    411324: '镇平县',
    411325: '内乡县',
    411326: '淅川县',
    411327: '社旗县',
    411328: '唐河县',
    411329: '新野县',
    411330: '桐柏县',
    411381: '邓州市',
    411402: '梁园区',
    411403: '睢阳区',
    411421: '民权县',
    411422: '睢县',
    411423: '宁陵县',
    411424: '柘城县',
    411425: '虞城县',
    411426: '夏邑县',
    411481: '永城市',
    411502: '浉河区',
    411503: '平桥区',
    411521: '罗山县',
    411522: '光山县',
    411523: '新县',
    411524: '商城县',
    411525: '固始县',
    411526: '潢川县',
    411527: '淮滨县',
    411528: '息县',
    411602: '川汇区',
    411621: '扶沟县',
    411622: '西华县',
    411623: '商水县',
    411624: '沈丘县',
    411625: '郸城县',
    411626: '淮阳县',
    411627: '太康县',
    411628: '鹿邑县',
    411681: '项城市',
    411690: '经济开发区',
    411702: '驿城区',
    411721: '西平县',
    411722: '上蔡县',
    411723: '平舆县',
    411724: '正阳县',
    411725: '确山县',
    411726: '泌阳县',
    411727: '汝南县',
    411728: '遂平县',
    411729: '新蔡县',
    419001: '济源市',
    420102: '江岸区',
    420103: '江汉区',
    420104: '硚口区',
    420105: '汉阳区',
    420106: '武昌区',
    420107: '青山区',
    420111: '洪山区',
    420112: '东西湖区',
    420113: '汉南区',
    420114: '蔡甸区',
    420115: '江夏区',
    420116: '黄陂区',
    420117: '新洲区',
    420202: '黄石港区',
    420203: '西塞山区',
    420204: '下陆区',
    420205: '铁山区',
    420222: '阳新县',
    420281: '大冶市',
    420302: '茅箭区',
    420303: '张湾区',
    420304: '郧阳区',
    420322: '郧西县',
    420323: '竹山县',
    420324: '竹溪县',
    420325: '房县',
    420381: '丹江口市',
    420502: '西陵区',
    420503: '伍家岗区',
    420504: '点军区',
    420505: '猇亭区',
    420506: '夷陵区',
    420525: '远安县',
    420526: '兴山县',
    420527: '秭归县',
    420528: '长阳土家族自治县',
    420529: '五峰土家族自治县',
    420581: '宜都市',
    420582: '当阳市',
    420583: '枝江市',
    420590: '经济开发区',
    420602: '襄城区',
    420606: '樊城区',
    420607: '襄州区',
    420624: '南漳县',
    420625: '谷城县',
    420626: '保康县',
    420682: '老河口市',
    420683: '枣阳市',
    420684: '宜城市',
    420702: '梁子湖区',
    420703: '华容区',
    420704: '鄂城区',
    420802: '东宝区',
    420804: '掇刀区',
    420822: '沙洋县',
    420881: '钟祥市',
    420882: '京山市',
    420902: '孝南区',
    420921: '孝昌县',
    420922: '大悟县',
    420923: '云梦县',
    420981: '应城市',
    420982: '安陆市',
    420984: '汉川市',
    421002: '沙市区',
    421003: '荆州区',
    421022: '公安县',
    421023: '监利县',
    421024: '江陵县',
    421081: '石首市',
    421083: '洪湖市',
    421087: '松滋市',
    421102: '黄州区',
    421121: '团风县',
    421122: '红安县',
    421123: '罗田县',
    421124: '英山县',
    421125: '浠水县',
    421126: '蕲春县',
    421127: '黄梅县',
    421181: '麻城市',
    421182: '武穴市',
    421202: '咸安区',
    421221: '嘉鱼县',
    421222: '通城县',
    421223: '崇阳县',
    421224: '通山县',
    421281: '赤壁市',
    421303: '曾都区',
    421321: '随县',
    421381: '广水市',
    422801: '恩施市',
    422802: '利川市',
    422822: '建始县',
    422823: '巴东县',
    422825: '宣恩县',
    422826: '咸丰县',
    422827: '来凤县',
    422828: '鹤峰县',
    429004: '仙桃市',
    429005: '潜江市',
    429006: '天门市',
    429021: '神农架林区',
    430102: '芙蓉区',
    430103: '天心区',
    430104: '岳麓区',
    430105: '开福区',
    430111: '雨花区',
    430112: '望城区',
    430121: '长沙县',
    430181: '浏阳市',
    430182: '宁乡市',
    430202: '荷塘区',
    430203: '芦淞区',
    430204: '石峰区',
    430211: '天元区',
    430212: '渌口区',
    430223: '攸县',
    430224: '茶陵县',
    430225: '炎陵县',
    430281: '醴陵市',
    430302: '雨湖区',
    430304: '岳塘区',
    430321: '湘潭县',
    430381: '湘乡市',
    430382: '韶山市',
    430405: '珠晖区',
    430406: '雁峰区',
    430407: '石鼓区',
    430408: '蒸湘区',
    430412: '南岳区',
    430421: '衡阳县',
    430422: '衡南县',
    430423: '衡山县',
    430424: '衡东县',
    430426: '祁东县',
    430481: '耒阳市',
    430482: '常宁市',
    430502: '双清区',
    430503: '大祥区',
    430511: '北塔区',
    430521: '邵东县',
    430522: '新邵县',
    430523: '邵阳县',
    430524: '隆回县',
    430525: '洞口县',
    430527: '绥宁县',
    430528: '新宁县',
    430529: '城步苗族自治县',
    430581: '武冈市',
    430602: '岳阳楼区',
    430603: '云溪区',
    430611: '君山区',
    430621: '岳阳县',
    430623: '华容县',
    430624: '湘阴县',
    430626: '平江县',
    430681: '汨罗市',
    430682: '临湘市',
    430702: '武陵区',
    430703: '鼎城区',
    430721: '安乡县',
    430722: '汉寿县',
    430723: '澧县',
    430724: '临澧县',
    430725: '桃源县',
    430726: '石门县',
    430781: '津市市',
    430802: '永定区',
    430811: '武陵源区',
    430821: '慈利县',
    430822: '桑植县',
    430902: '资阳区',
    430903: '赫山区',
    430921: '南县',
    430922: '桃江县',
    430923: '安化县',
    430981: '沅江市',
    431002: '北湖区',
    431003: '苏仙区',
    431021: '桂阳县',
    431022: '宜章县',
    431023: '永兴县',
    431024: '嘉禾县',
    431025: '临武县',
    431026: '汝城县',
    431027: '桂东县',
    431028: '安仁县',
    431081: '资兴市',
    431102: '零陵区',
    431103: '冷水滩区',
    431121: '祁阳县',
    431122: '东安县',
    431123: '双牌县',
    431124: '道县',
    431125: '江永县',
    431126: '宁远县',
    431127: '蓝山县',
    431128: '新田县',
    431129: '江华瑶族自治县',
    431202: '鹤城区',
    431221: '中方县',
    431222: '沅陵县',
    431223: '辰溪县',
    431224: '溆浦县',
    431225: '会同县',
    431226: '麻阳苗族自治县',
    431227: '新晃侗族自治县',
    431228: '芷江侗族自治县',
    431229: '靖州苗族侗族自治县',
    431230: '通道侗族自治县',
    431281: '洪江市',
    431302: '娄星区',
    431321: '双峰县',
    431322: '新化县',
    431381: '冷水江市',
    431382: '涟源市',
    433101: '吉首市',
    433122: '泸溪县',
    433123: '凤凰县',
    433124: '花垣县',
    433125: '保靖县',
    433126: '古丈县',
    433127: '永顺县',
    433130: '龙山县',
    440103: '荔湾区',
    440104: '越秀区',
    440105: '海珠区',
    440106: '天河区',
    440111: '白云区',
    440112: '黄埔区',
    440113: '番禺区',
    440114: '花都区',
    440115: '南沙区',
    440117: '从化区',
    440118: '增城区',
    440203: '武江区',
    440204: '浈江区',
    440205: '曲江区',
    440222: '始兴县',
    440224: '仁化县',
    440229: '翁源县',
    440232: '乳源瑶族自治县',
    440233: '新丰县',
    440281: '乐昌市',
    440282: '南雄市',
    440303: '罗湖区',
    440304: '福田区',
    440305: '南山区',
    440306: '宝安区',
    440307: '龙岗区',
    440308: '盐田区',
    440309: '龙华区',
    440310: '坪山区',
    440311: '光明区',
    440402: '香洲区',
    440403: '斗门区',
    440404: '金湾区',
    440507: '龙湖区',
    440511: '金平区',
    440512: '濠江区',
    440513: '潮阳区',
    440514: '潮南区',
    440515: '澄海区',
    440523: '南澳县',
    440604: '禅城区',
    440605: '南海区',
    440606: '顺德区',
    440607: '三水区',
    440608: '高明区',
    440703: '蓬江区',
    440704: '江海区',
    440705: '新会区',
    440781: '台山市',
    440783: '开平市',
    440784: '鹤山市',
    440785: '恩平市',
    440802: '赤坎区',
    440803: '霞山区',
    440804: '坡头区',
    440811: '麻章区',
    440823: '遂溪县',
    440825: '徐闻县',
    440881: '廉江市',
    440882: '雷州市',
    440883: '吴川市',
    440890: '经济技术开发区',
    440902: '茂南区',
    440904: '电白区',
    440981: '高州市',
    440982: '化州市',
    440983: '信宜市',
    441202: '端州区',
    441203: '鼎湖区',
    441204: '高要区',
    441223: '广宁县',
    441224: '怀集县',
    441225: '封开县',
    441226: '德庆县',
    441284: '四会市',
    441302: '惠城区',
    441303: '惠阳区',
    441322: '博罗县',
    441323: '惠东县',
    441324: '龙门县',
    441402: '梅江区',
    441403: '梅县区',
    441422: '大埔县',
    441423: '丰顺县',
    441424: '五华县',
    441426: '平远县',
    441427: '蕉岭县',
    441481: '兴宁市',
    441502: '城区',
    441521: '海丰县',
    441523: '陆河县',
    441581: '陆丰市',
    441602: '源城区',
    441621: '紫金县',
    441622: '龙川县',
    441623: '连平县',
    441624: '和平县',
    441625: '东源县',
    441702: '江城区',
    441704: '阳东区',
    441721: '阳西县',
    441781: '阳春市',
    441802: '清城区',
    441803: '清新区',
    441821: '佛冈县',
    441823: '阳山县',
    441825: '连山壮族瑶族自治县',
    441826: '连南瑶族自治县',
    441881: '英德市',
    441882: '连州市',
    441901: '中堂镇',
    441903: '南城街道办事处',
    441904: '长安镇',
    441905: '东坑镇',
    441906: '樟木头镇',
    441907: '莞城街道办事处',
    441908: '石龙镇',
    441909: '桥头镇',
    441910: '万江街道办事处',
    441911: '麻涌镇',
    441912: '虎门镇',
    441913: '谢岗镇',
    441914: '石碣镇',
    441915: '茶山镇',
    441916: '东城街道办事处',
    441917: '洪梅镇',
    441918: '道滘镇',
    441919: '高埗镇',
    441920: '企石镇',
    441921: '凤岗镇',
    441922: '大岭山镇',
    441923: '松山湖管委会',
    441924: '清溪镇',
    441925: '望牛墩镇',
    441926: '厚街镇',
    441927: '常平镇',
    441928: '寮步镇',
    441929: '石排镇',
    441930: '横沥镇',
    441931: '塘厦镇',
    441932: '黄江镇',
    441933: '大朗镇',
    441934: '东莞港',
    441935: '东莞生态园',
    441990: '沙田镇',
    442001: '南头镇',
    442002: '神湾镇',
    442003: '东凤镇',
    442004: '五桂山街道办事处',
    442005: '黄圃镇',
    442006: '小榄镇',
    442007: '石岐区街道办事处',
    442008: '横栏镇',
    442009: '三角镇',
    442010: '三乡镇',
    442011: '港口镇',
    442012: '沙溪镇',
    442013: '板芙镇',
    442015: '东升镇',
    442016: '阜沙镇',
    442017: '民众镇',
    442018: '东区街道办事处',
    442019: '火炬开发区街道办事处',
    442020: '西区街道办事处',
    442021: '南区街道办事处',
    442022: '古镇镇',
    442023: '坦洲镇',
    442024: '大涌镇',
    442025: '南朗镇',
    445102: '湘桥区',
    445103: '潮安区',
    445122: '饶平县',
    445202: '榕城区',
    445203: '揭东区',
    445222: '揭西县',
    445224: '惠来县',
    445281: '普宁市',
    445302: '云城区',
    445303: '云安区',
    445321: '新兴县',
    445322: '郁南县',
    445381: '罗定市',
    450102: '兴宁区',
    450103: '青秀区',
    450105: '江南区',
    450107: '西乡塘区',
    450108: '良庆区',
    450109: '邕宁区',
    450110: '武鸣区',
    450123: '隆安县',
    450124: '马山县',
    450125: '上林县',
    450126: '宾阳县',
    450127: '横县',
    450202: '城中区',
    450203: '鱼峰区',
    450204: '柳南区',
    450205: '柳北区',
    450206: '柳江区',
    450222: '柳城县',
    450223: '鹿寨县',
    450224: '融安县',
    450225: '融水苗族自治县',
    450226: '三江侗族自治县',
    450302: '秀峰区',
    450303: '叠彩区',
    450304: '象山区',
    450305: '七星区',
    450311: '雁山区',
    450312: '临桂区',
    450321: '阳朔县',
    450323: '灵川县',
    450324: '全州县',
    450325: '兴安县',
    450326: '永福县',
    450327: '灌阳县',
    450328: '龙胜各族自治县',
    450329: '资源县',
    450330: '平乐县',
    450332: '恭城瑶族自治县',
    450381: '荔浦市',
    450403: '万秀区',
    450405: '长洲区',
    450406: '龙圩区',
    450421: '苍梧县',
    450422: '藤县',
    450423: '蒙山县',
    450481: '岑溪市',
    450502: '海城区',
    450503: '银海区',
    450512: '铁山港区',
    450521: '合浦县',
    450602: '港口区',
    450603: '防城区',
    450621: '上思县',
    450681: '东兴市',
    450702: '钦南区',
    450703: '钦北区',
    450721: '灵山县',
    450722: '浦北县',
    450802: '港北区',
    450803: '港南区',
    450804: '覃塘区',
    450821: '平南县',
    450881: '桂平市',
    450902: '玉州区',
    450903: '福绵区',
    450921: '容县',
    450922: '陆川县',
    450923: '博白县',
    450924: '兴业县',
    450981: '北流市',
    451002: '右江区',
    451021: '田阳县',
    451022: '田东县',
    451023: '平果县',
    451024: '德保县',
    451026: '那坡县',
    451027: '凌云县',
    451028: '乐业县',
    451029: '田林县',
    451030: '西林县',
    451031: '隆林各族自治县',
    451081: '靖西市',
    451102: '八步区',
    451103: '平桂区',
    451121: '昭平县',
    451122: '钟山县',
    451123: '富川瑶族自治县',
    451202: '金城江区',
    451203: '宜州区',
    451221: '南丹县',
    451222: '天峨县',
    451223: '凤山县',
    451224: '东兰县',
    451225: '罗城仫佬族自治县',
    451226: '环江毛南族自治县',
    451227: '巴马瑶族自治县',
    451228: '都安瑶族自治县',
    451229: '大化瑶族自治县',
    451302: '兴宾区',
    451321: '忻城县',
    451322: '象州县',
    451323: '武宣县',
    451324: '金秀瑶族自治县',
    451381: '合山市',
    451402: '江州区',
    451421: '扶绥县',
    451422: '宁明县',
    451423: '龙州县',
    451424: '大新县',
    451425: '天等县',
    451481: '凭祥市',
    460105: '秀英区',
    460106: '龙华区',
    460107: '琼山区',
    460108: '美兰区',
    460202: '海棠区',
    460203: '吉阳区',
    460204: '天涯区',
    460205: '崖州区',
    460321: '西沙群岛',
    460322: '南沙群岛',
    460323: '中沙群岛的岛礁及其海域',
    460401: '那大镇',
    460402: '和庆镇',
    460403: '南丰镇',
    460404: '大成镇',
    460405: '雅星镇',
    460406: '兰洋镇',
    460407: '光村镇',
    460408: '木棠镇',
    460409: '海头镇',
    460410: '峨蔓镇',
    460411: '王五镇',
    460412: '白马井镇',
    460413: '中和镇',
    460414: '排浦镇',
    460415: '东成镇',
    460416: '新州镇',
    460417: '洋浦经济开发区',
    460418: '华南热作学院',
    469001: '五指山市',
    469002: '琼海市',
    469005: '文昌市',
    469006: '万宁市',
    469007: '东方市',
    469021: '定安县',
    469022: '屯昌县',
    469023: '澄迈县',
    469024: '临高县',
    469025: '白沙黎族自治县',
    469026: '昌江黎族自治县',
    469027: '乐东黎族自治县',
    469028: '陵水黎族自治县',
    469029: '保亭黎族苗族自治县',
    469030: '琼中黎族苗族自治县',
    500101: '万州区',
    500102: '涪陵区',
    500103: '渝中区',
    500104: '大渡口区',
    500105: '江北区',
    500106: '沙坪坝区',
    500107: '九龙坡区',
    500108: '南岸区',
    500109: '北碚区',
    500110: '綦江区',
    500111: '大足区',
    500112: '渝北区',
    500113: '巴南区',
    500114: '黔江区',
    500115: '长寿区',
    500116: '江津区',
    500117: '合川区',
    500118: '永川区',
    500119: '南川区',
    500120: '璧山区',
    500151: '铜梁区',
    500152: '潼南区',
    500153: '荣昌区',
    500154: '开州区',
    500155: '梁平区',
    500156: '武隆区',
    500229: '城口县',
    500230: '丰都县',
    500231: '垫江县',
    500233: '忠县',
    500235: '云阳县',
    500236: '奉节县',
    500237: '巫山县',
    500238: '巫溪县',
    500240: '石柱土家族自治县',
    500241: '秀山土家族苗族自治县',
    500242: '酉阳土家族苗族自治县',
    500243: '彭水苗族土家族自治县',
    510104: '锦江区',
    510105: '青羊区',
    510106: '金牛区',
    510107: '武侯区',
    510108: '成华区',
    510112: '龙泉驿区',
    510113: '青白江区',
    510114: '新都区',
    510115: '温江区',
    510116: '双流区',
    510117: '郫都区',
    510121: '金堂县',
    510129: '大邑县',
    510131: '蒲江县',
    510132: '新津县',
    510181: '都江堰市',
    510182: '彭州市',
    510183: '邛崃市',
    510184: '崇州市',
    510185: '简阳市',
    510191: '高新区',
    510302: '自流井区',
    510303: '贡井区',
    510304: '大安区',
    510311: '沿滩区',
    510321: '荣县',
    510322: '富顺县',
    510402: '东区',
    510403: '西区',
    510411: '仁和区',
    510421: '米易县',
    510422: '盐边县',
    510502: '江阳区',
    510503: '纳溪区',
    510504: '龙马潭区',
    510521: '泸县',
    510522: '合江县',
    510524: '叙永县',
    510525: '古蔺县',
    510603: '旌阳区',
    510604: '罗江区',
    510623: '中江县',
    510681: '广汉市',
    510682: '什邡市',
    510683: '绵竹市',
    510703: '涪城区',
    510704: '游仙区',
    510705: '安州区',
    510722: '三台县',
    510723: '盐亭县',
    510725: '梓潼县',
    510726: '北川羌族自治县',
    510727: '平武县',
    510781: '江油市',
    510791: '高新区',
    510802: '利州区',
    510811: '昭化区',
    510812: '朝天区',
    510821: '旺苍县',
    510822: '青川县',
    510823: '剑阁县',
    510824: '苍溪县',
    510903: '船山区',
    510904: '安居区',
    510921: '蓬溪县',
    510922: '射洪县',
    510923: '大英县',
    511002: '市中区',
    511011: '东兴区',
    511024: '威远县',
    511025: '资中县',
    511083: '隆昌市',
    511102: '市中区',
    511111: '沙湾区',
    511112: '五通桥区',
    511113: '金口河区',
    511123: '犍为县',
    511124: '井研县',
    511126: '夹江县',
    511129: '沐川县',
    511132: '峨边彝族自治县',
    511133: '马边彝族自治县',
    511181: '峨眉山市',
    511302: '顺庆区',
    511303: '高坪区',
    511304: '嘉陵区',
    511321: '南部县',
    511322: '营山县',
    511323: '蓬安县',
    511324: '仪陇县',
    511325: '西充县',
    511381: '阆中市',
    511402: '东坡区',
    511403: '彭山区',
    511421: '仁寿县',
    511423: '洪雅县',
    511424: '丹棱县',
    511425: '青神县',
    511502: '翠屏区',
    511503: '南溪区',
    511504: '叙州区',
    511523: '江安县',
    511524: '长宁县',
    511525: '高县',
    511526: '珙县',
    511527: '筠连县',
    511528: '兴文县',
    511529: '屏山县',
    511602: '广安区',
    511603: '前锋区',
    511621: '岳池县',
    511622: '武胜县',
    511623: '邻水县',
    511681: '华蓥市',
    511702: '通川区',
    511703: '达川区',
    511722: '宣汉县',
    511723: '开江县',
    511724: '大竹县',
    511725: '渠县',
    511781: '万源市',
    511802: '雨城区',
    511803: '名山区',
    511822: '荥经县',
    511823: '汉源县',
    511824: '石棉县',
    511825: '天全县',
    511826: '芦山县',
    511827: '宝兴县',
    511902: '巴州区',
    511903: '恩阳区',
    511921: '通江县',
    511922: '南江县',
    511923: '平昌县',
    512002: '雁江区',
    512021: '安岳县',
    512022: '乐至县',
    513201: '马尔康市',
    513221: '汶川县',
    513222: '理县',
    513223: '茂县',
    513224: '松潘县',
    513225: '九寨沟县',
    513226: '金川县',
    513227: '小金县',
    513228: '黑水县',
    513230: '壤塘县',
    513231: '阿坝县',
    513232: '若尔盖县',
    513233: '红原县',
    513301: '康定市',
    513322: '泸定县',
    513323: '丹巴县',
    513324: '九龙县',
    513325: '雅江县',
    513326: '道孚县',
    513327: '炉霍县',
    513328: '甘孜县',
    513329: '新龙县',
    513330: '德格县',
    513331: '白玉县',
    513332: '石渠县',
    513333: '色达县',
    513334: '理塘县',
    513335: '巴塘县',
    513336: '乡城县',
    513337: '稻城县',
    513338: '得荣县',
    513401: '西昌市',
    513422: '木里藏族自治县',
    513423: '盐源县',
    513424: '德昌县',
    513425: '会理县',
    513426: '会东县',
    513427: '宁南县',
    513428: '普格县',
    513429: '布拖县',
    513430: '金阳县',
    513431: '昭觉县',
    513432: '喜德县',
    513433: '冕宁县',
    513434: '越西县',
    513435: '甘洛县',
    513436: '美姑县',
    513437: '雷波县',
    520102: '南明区',
    520103: '云岩区',
    520111: '花溪区',
    520112: '乌当区',
    520113: '白云区',
    520115: '观山湖区',
    520121: '开阳县',
    520122: '息烽县',
    520123: '修文县',
    520181: '清镇市',
    520201: '钟山区',
    520203: '六枝特区',
    520221: '水城县',
    520281: '盘州市',
    520302: '红花岗区',
    520303: '汇川区',
    520304: '播州区',
    520322: '桐梓县',
    520323: '绥阳县',
    520324: '正安县',
    520325: '道真仡佬族苗族自治县',
    520326: '务川仡佬族苗族自治县',
    520327: '凤冈县',
    520328: '湄潭县',
    520329: '余庆县',
    520330: '习水县',
    520381: '赤水市',
    520382: '仁怀市',
    520402: '西秀区',
    520403: '平坝区',
    520422: '普定县',
    520423: '镇宁布依族苗族自治县',
    520424: '关岭布依族苗族自治县',
    520425: '紫云苗族布依族自治县',
    520502: '七星关区',
    520521: '大方县',
    520522: '黔西县',
    520523: '金沙县',
    520524: '织金县',
    520525: '纳雍县',
    520526: '威宁彝族回族苗族自治县',
    520527: '赫章县',
    520602: '碧江区',
    520603: '万山区',
    520621: '江口县',
    520622: '玉屏侗族自治县',
    520623: '石阡县',
    520624: '思南县',
    520625: '印江土家族苗族自治县',
    520626: '德江县',
    520627: '沿河土家族自治县',
    520628: '松桃苗族自治县',
    522301: '兴义市',
    522302: '兴仁市',
    522323: '普安县',
    522324: '晴隆县',
    522325: '贞丰县',
    522326: '望谟县',
    522327: '册亨县',
    522328: '安龙县',
    522601: '凯里市',
    522622: '黄平县',
    522623: '施秉县',
    522624: '三穗县',
    522625: '镇远县',
    522626: '岑巩县',
    522627: '天柱县',
    522628: '锦屏县',
    522629: '剑河县',
    522630: '台江县',
    522631: '黎平县',
    522632: '榕江县',
    522633: '从江县',
    522634: '雷山县',
    522635: '麻江县',
    522636: '丹寨县',
    522701: '都匀市',
    522702: '福泉市',
    522722: '荔波县',
    522723: '贵定县',
    522725: '瓮安县',
    522726: '独山县',
    522727: '平塘县',
    522728: '罗甸县',
    522729: '长顺县',
    522730: '龙里县',
    522731: '惠水县',
    522732: '三都水族自治县',
    530102: '五华区',
    530103: '盘龙区',
    530111: '官渡区',
    530112: '西山区',
    530113: '东川区',
    530114: '呈贡区',
    530115: '晋宁区',
    530124: '富民县',
    530125: '宜良县',
    530126: '石林彝族自治县',
    530127: '嵩明县',
    530128: '禄劝彝族苗族自治县',
    530129: '寻甸回族彝族自治县',
    530181: '安宁市',
    530302: '麒麟区',
    530303: '沾益区',
    530304: '马龙区',
    530322: '陆良县',
    530323: '师宗县',
    530324: '罗平县',
    530325: '富源县',
    530326: '会泽县',
    530381: '宣威市',
    530402: '红塔区',
    530403: '江川区',
    530422: '澄江县',
    530423: '通海县',
    530424: '华宁县',
    530425: '易门县',
    530426: '峨山彝族自治县',
    530427: '新平彝族傣族自治县',
    530428: '元江哈尼族彝族傣族自治县',
    530502: '隆阳区',
    530521: '施甸县',
    530523: '龙陵县',
    530524: '昌宁县',
    530581: '腾冲市',
    530602: '昭阳区',
    530621: '鲁甸县',
    530622: '巧家县',
    530623: '盐津县',
    530624: '大关县',
    530625: '永善县',
    530626: '绥江县',
    530627: '镇雄县',
    530628: '彝良县',
    530629: '威信县',
    530681: '水富市',
    530702: '古城区',
    530721: '玉龙纳西族自治县',
    530722: '永胜县',
    530723: '华坪县',
    530724: '宁蒗彝族自治县',
    530802: '思茅区',
    530821: '宁洱哈尼族彝族自治县',
    530822: '墨江哈尼族自治县',
    530823: '景东彝族自治县',
    530824: '景谷傣族彝族自治县',
    530825: '镇沅彝族哈尼族拉祜族自治县',
    530826: '江城哈尼族彝族自治县',
    530827: '孟连傣族拉祜族佤族自治县',
    530828: '澜沧拉祜族自治县',
    530829: '西盟佤族自治县',
    530902: '临翔区',
    530921: '凤庆县',
    530922: '云县',
    530923: '永德县',
    530924: '镇康县',
    530925: '双江拉祜族佤族布朗族傣族自治县',
    530926: '耿马傣族佤族自治县',
    530927: '沧源佤族自治县',
    532301: '楚雄市',
    532322: '双柏县',
    532323: '牟定县',
    532324: '南华县',
    532325: '姚安县',
    532326: '大姚县',
    532327: '永仁县',
    532328: '元谋县',
    532329: '武定县',
    532331: '禄丰县',
    532501: '个旧市',
    532502: '开远市',
    532503: '蒙自市',
    532504: '弥勒市',
    532523: '屏边苗族自治县',
    532524: '建水县',
    532525: '石屏县',
    532527: '泸西县',
    532528: '元阳县',
    532529: '红河县',
    532530: '金平苗族瑶族傣族自治县',
    532531: '绿春县',
    532532: '河口瑶族自治县',
    532601: '文山市',
    532622: '砚山县',
    532623: '西畴县',
    532624: '麻栗坡县',
    532625: '马关县',
    532626: '丘北县',
    532627: '广南县',
    532628: '富宁县',
    532801: '景洪市',
    532822: '勐海县',
    532823: '勐腊县',
    532901: '大理市',
    532922: '漾濞彝族自治县',
    532923: '祥云县',
    532924: '宾川县',
    532925: '弥渡县',
    532926: '南涧彝族自治县',
    532927: '巍山彝族回族自治县',
    532928: '永平县',
    532929: '云龙县',
    532930: '洱源县',
    532931: '剑川县',
    532932: '鹤庆县',
    533102: '瑞丽市',
    533103: '芒市',
    533122: '梁河县',
    533123: '盈江县',
    533124: '陇川县',
    533301: '泸水市',
    533323: '福贡县',
    533324: '贡山独龙族怒族自治县',
    533325: '兰坪白族普米族自治县',
    533401: '香格里拉市',
    533422: '德钦县',
    533423: '维西傈僳族自治县',
    540102: '城关区',
    540103: '堆龙德庆区',
    540104: '达孜区',
    540121: '林周县',
    540122: '当雄县',
    540123: '尼木县',
    540124: '曲水县',
    540127: '墨竹工卡县',
    540202: '桑珠孜区',
    540221: '南木林县',
    540222: '江孜县',
    540223: '定日县',
    540224: '萨迦县',
    540225: '拉孜县',
    540226: '昂仁县',
    540227: '谢通门县',
    540228: '白朗县',
    540229: '仁布县',
    540230: '康马县',
    540231: '定结县',
    540232: '仲巴县',
    540233: '亚东县',
    540234: '吉隆县',
    540235: '聂拉木县',
    540236: '萨嘎县',
    540237: '岗巴县',
    540302: '卡若区',
    540321: '江达县',
    540322: '贡觉县',
    540323: '类乌齐县',
    540324: '丁青县',
    540325: '察雅县',
    540326: '八宿县',
    540327: '左贡县',
    540328: '芒康县',
    540329: '洛隆县',
    540330: '边坝县',
    540402: '巴宜区',
    540421: '工布江达县',
    540422: '米林县',
    540423: '墨脱县',
    540424: '波密县',
    540425: '察隅县',
    540426: '朗县',
    540502: '乃东区',
    540521: '扎囊县',
    540522: '贡嘎县',
    540523: '桑日县',
    540524: '琼结县',
    540525: '曲松县',
    540526: '措美县',
    540527: '洛扎县',
    540528: '加查县',
    540529: '隆子县',
    540530: '错那县',
    540531: '浪卡子县',
    540602: '色尼区',
    540621: '嘉黎县',
    540622: '比如县',
    540623: '聂荣县',
    540624: '安多县',
    540625: '申扎县',
    540626: '索县',
    540627: '班戈县',
    540628: '巴青县',
    540629: '尼玛县',
    540630: '双湖县',
    542521: '普兰县',
    542522: '札达县',
    542523: '噶尔县',
    542524: '日土县',
    542525: '革吉县',
    542526: '改则县',
    542527: '措勤县',
    610102: '新城区',
    610103: '碑林区',
    610104: '莲湖区',
    610111: '灞桥区',
    610112: '未央区',
    610113: '雁塔区',
    610114: '阎良区',
    610115: '临潼区',
    610116: '长安区',
    610117: '高陵区',
    610118: '鄠邑区',
    610122: '蓝田县',
    610124: '周至县',
    610202: '王益区',
    610203: '印台区',
    610204: '耀州区',
    610222: '宜君县',
    610302: '渭滨区',
    610303: '金台区',
    610304: '陈仓区',
    610322: '凤翔县',
    610323: '岐山县',
    610324: '扶风县',
    610326: '眉县',
    610327: '陇县',
    610328: '千阳县',
    610329: '麟游县',
    610330: '凤县',
    610331: '太白县',
    610402: '秦都区',
    610403: '杨陵区',
    610404: '渭城区',
    610422: '三原县',
    610423: '泾阳县',
    610424: '乾县',
    610425: '礼泉县',
    610426: '永寿县',
    610428: '长武县',
    610429: '旬邑县',
    610430: '淳化县',
    610431: '武功县',
    610481: '兴平市',
    610482: '彬州市',
    610502: '临渭区',
    610503: '华州区',
    610522: '潼关县',
    610523: '大荔县',
    610524: '合阳县',
    610525: '澄城县',
    610526: '蒲城县',
    610527: '白水县',
    610528: '富平县',
    610581: '韩城市',
    610582: '华阴市',
    610602: '宝塔区',
    610603: '安塞区',
    610621: '延长县',
    610622: '延川县',
    610623: '子长县',
    610625: '志丹县',
    610626: '吴起县',
    610627: '甘泉县',
    610628: '富县',
    610629: '洛川县',
    610630: '宜川县',
    610631: '黄龙县',
    610632: '黄陵县',
    610702: '汉台区',
    610703: '南郑区',
    610722: '城固县',
    610723: '洋县',
    610724: '西乡县',
    610725: '勉县',
    610726: '宁强县',
    610727: '略阳县',
    610728: '镇巴县',
    610729: '留坝县',
    610730: '佛坪县',
    610802: '榆阳区',
    610803: '横山区',
    610822: '府谷县',
    610824: '靖边县',
    610825: '定边县',
    610826: '绥德县',
    610827: '米脂县',
    610828: '佳县',
    610829: '吴堡县',
    610830: '清涧县',
    610831: '子洲县',
    610881: '神木市',
    610902: '汉滨区',
    610921: '汉阴县',
    610922: '石泉县',
    610923: '宁陕县',
    610924: '紫阳县',
    610925: '岚皋县',
    610926: '平利县',
    610927: '镇坪县',
    610928: '旬阳县',
    610929: '白河县',
    611002: '商州区',
    611021: '洛南县',
    611022: '丹凤县',
    611023: '商南县',
    611024: '山阳县',
    611025: '镇安县',
    611026: '柞水县',
    620102: '城关区',
    620103: '七里河区',
    620104: '西固区',
    620105: '安宁区',
    620111: '红古区',
    620121: '永登县',
    620122: '皋兰县',
    620123: '榆中县',
    620201: '市辖区',
    620290: '雄关区',
    620291: '长城区',
    620292: '镜铁区',
    620293: '新城镇',
    620294: '峪泉镇',
    620295: '文殊镇',
    620302: '金川区',
    620321: '永昌县',
    620402: '白银区',
    620403: '平川区',
    620421: '靖远县',
    620422: '会宁县',
    620423: '景泰县',
    620502: '秦州区',
    620503: '麦积区',
    620521: '清水县',
    620522: '秦安县',
    620523: '甘谷县',
    620524: '武山县',
    620525: '张家川回族自治县',
    620602: '凉州区',
    620621: '民勤县',
    620622: '古浪县',
    620623: '天祝藏族自治县',
    620702: '甘州区',
    620721: '肃南裕固族自治县',
    620722: '民乐县',
    620723: '临泽县',
    620724: '高台县',
    620725: '山丹县',
    620802: '崆峒区',
    620821: '泾川县',
    620822: '灵台县',
    620823: '崇信县',
    620825: '庄浪县',
    620826: '静宁县',
    620881: '华亭市',
    620902: '肃州区',
    620921: '金塔县',
    620922: '瓜州县',
    620923: '肃北蒙古族自治县',
    620924: '阿克塞哈萨克族自治县',
    620981: '玉门市',
    620982: '敦煌市',
    621002: '西峰区',
    621021: '庆城县',
    621022: '环县',
    621023: '华池县',
    621024: '合水县',
    621025: '正宁县',
    621026: '宁县',
    621027: '镇原县',
    621102: '安定区',
    621121: '通渭县',
    621122: '陇西县',
    621123: '渭源县',
    621124: '临洮县',
    621125: '漳县',
    621126: '岷县',
    621202: '武都区',
    621221: '成县',
    621222: '文县',
    621223: '宕昌县',
    621224: '康县',
    621225: '西和县',
    621226: '礼县',
    621227: '徽县',
    621228: '两当县',
    622901: '临夏市',
    622921: '临夏县',
    622922: '康乐县',
    622923: '永靖县',
    622924: '广河县',
    622925: '和政县',
    622926: '东乡族自治县',
    622927: '积石山保安族东乡族撒拉族自治县',
    623001: '合作市',
    623021: '临潭县',
    623022: '卓尼县',
    623023: '舟曲县',
    623024: '迭部县',
    623025: '玛曲县',
    623026: '碌曲县',
    623027: '夏河县',
    630102: '城东区',
    630103: '城中区',
    630104: '城西区',
    630105: '城北区',
    630121: '大通回族土族自治县',
    630122: '湟中县',
    630123: '湟源县',
    630202: '乐都区',
    630203: '平安区',
    630222: '民和回族土族自治县',
    630223: '互助土族自治县',
    630224: '化隆回族自治县',
    630225: '循化撒拉族自治县',
    632221: '门源回族自治县',
    632222: '祁连县',
    632223: '海晏县',
    632224: '刚察县',
    632321: '同仁县',
    632322: '尖扎县',
    632323: '泽库县',
    632324: '河南蒙古族自治县',
    632521: '共和县',
    632522: '同德县',
    632523: '贵德县',
    632524: '兴海县',
    632525: '贵南县',
    632621: '玛沁县',
    632622: '班玛县',
    632623: '甘德县',
    632624: '达日县',
    632625: '久治县',
    632626: '玛多县',
    632701: '玉树市',
    632722: '杂多县',
    632723: '称多县',
    632724: '治多县',
    632725: '囊谦县',
    632726: '曲麻莱县',
    632801: '格尔木市',
    632802: '德令哈市',
    632803: '茫崖市',
    632821: '乌兰县',
    632822: '都兰县',
    632823: '天峻县',
    640104: '兴庆区',
    640105: '西夏区',
    640106: '金凤区',
    640121: '永宁县',
    640122: '贺兰县',
    640181: '灵武市',
    640202: '大武口区',
    640205: '惠农区',
    640221: '平罗县',
    640302: '利通区',
    640303: '红寺堡区',
    640323: '盐池县',
    640324: '同心县',
    640381: '青铜峡市',
    640402: '原州区',
    640422: '西吉县',
    640423: '隆德县',
    640424: '泾源县',
    640425: '彭阳县',
    640502: '沙坡头区',
    640521: '中宁县',
    640522: '海原县',
    650102: '天山区',
    650103: '沙依巴克区',
    650104: '新市区',
    650105: '水磨沟区',
    650106: '头屯河区',
    650107: '达坂城区',
    650109: '米东区',
    650121: '乌鲁木齐县',
    650202: '独山子区',
    650203: '克拉玛依区',
    650204: '白碱滩区',
    650205: '乌尔禾区',
    650402: '高昌区',
    650421: '鄯善县',
    650422: '托克逊县',
    650502: '伊州区',
    650521: '巴里坤哈萨克自治县',
    650522: '伊吾县',
    652301: '昌吉市',
    652302: '阜康市',
    652323: '呼图壁县',
    652324: '玛纳斯县',
    652325: '奇台县',
    652327: '吉木萨尔县',
    652328: '木垒哈萨克自治县',
    652701: '博乐市',
    652702: '阿拉山口市',
    652722: '精河县',
    652723: '温泉县',
    652801: '库尔勒市',
    652822: '轮台县',
    652823: '尉犁县',
    652824: '若羌县',
    652825: '且末县',
    652826: '焉耆回族自治县',
    652827: '和静县',
    652828: '和硕县',
    652829: '博湖县',
    652901: '阿克苏市',
    652922: '温宿县',
    652923: '库车县',
    652924: '沙雅县',
    652925: '新和县',
    652926: '拜城县',
    652927: '乌什县',
    652928: '阿瓦提县',
    652929: '柯坪县',
    653001: '阿图什市',
    653022: '阿克陶县',
    653023: '阿合奇县',
    653024: '乌恰县',
    653101: '喀什市',
    653121: '疏附县',
    653122: '疏勒县',
    653123: '英吉沙县',
    653124: '泽普县',
    653125: '莎车县',
    653126: '叶城县',
    653127: '麦盖提县',
    653128: '岳普湖县',
    653129: '伽师县',
    653130: '巴楚县',
    653131: '塔什库尔干塔吉克自治县',
    653201: '和田市',
    653221: '和田县',
    653222: '墨玉县',
    653223: '皮山县',
    653224: '洛浦县',
    653225: '策勒县',
    653226: '于田县',
    653227: '民丰县',
    654002: '伊宁市',
    654003: '奎屯市',
    654004: '霍尔果斯市',
    654021: '伊宁县',
    654022: '察布查尔锡伯自治县',
    654023: '霍城县',
    654024: '巩留县',
    654025: '新源县',
    654026: '昭苏县',
    654027: '特克斯县',
    654028: '尼勒克县',
    654201: '塔城市',
    654202: '乌苏市',
    654221: '额敏县',
    654223: '沙湾县',
    654224: '托里县',
    654225: '裕民县',
    654226: '和布克赛尔蒙古自治县',
    654301: '阿勒泰市',
    654321: '布尔津县',
    654322: '富蕴县',
    654323: '福海县',
    654324: '哈巴河县',
    654325: '青河县',
    654326: '吉木乃县',
    659001: '石河子市',
    659002: '阿拉尔市',
    659003: '图木舒克市',
    659004: '五家渠市',
    659005: '北屯市',
    659006: '铁门关市',
    659007: '双河市',
    659008: '可克达拉市',
    659009: '昆玉市',
    710101: '中正区',
    710102: '大同区',
    710103: '中山区',
    710104: '松山区',
    710105: '大安区',
    710106: '万华区',
    710107: '信义区',
    710108: '士林区',
    710109: '北投区',
    710110: '内湖区',
    710111: '南港区',
    710112: '文山区',
    710199: '其它区',
    710201: '新兴区',
    710202: '前金区',
    710203: '芩雅区',
    710204: '盐埕区',
    710205: '鼓山区',
    710206: '旗津区',
    710207: '前镇区',
    710208: '三民区',
    710209: '左营区',
    710210: '楠梓区',
    710211: '小港区',
    710241: '苓雅区',
    710242: '仁武区',
    710243: '大社区',
    710244: '冈山区',
    710245: '路竹区',
    710246: '阿莲区',
    710247: '田寮区',
    710248: '燕巢区',
    710249: '桥头区',
    710250: '梓官区',
    710251: '弥陀区',
    710252: '永安区',
    710253: '湖内区',
    710254: '凤山区',
    710255: '大寮区',
    710256: '林园区',
    710257: '鸟松区',
    710258: '大树区',
    710259: '旗山区',
    710260: '美浓区',
    710261: '六龟区',
    710262: '内门区',
    710263: '杉林区',
    710264: '甲仙区',
    710265: '桃源区',
    710266: '那玛夏区',
    710267: '茂林区',
    710268: '茄萣区',
    710299: '其它区',
    710301: '中西区',
    710302: '东区',
    710303: '南区',
    710304: '北区',
    710305: '安平区',
    710306: '安南区',
    710339: '永康区',
    710340: '归仁区',
    710341: '新化区',
    710342: '左镇区',
    710343: '玉井区',
    710344: '楠西区',
    710345: '南化区',
    710346: '仁德区',
    710347: '关庙区',
    710348: '龙崎区',
    710349: '官田区',
    710350: '麻豆区',
    710351: '佳里区',
    710352: '西港区',
    710353: '七股区',
    710354: '将军区',
    710355: '学甲区',
    710356: '北门区',
    710357: '新营区',
    710358: '后壁区',
    710359: '白河区',
    710360: '东山区',
    710361: '六甲区',
    710362: '下营区',
    710363: '柳营区',
    710364: '盐水区',
    710365: '善化区',
    710366: '大内区',
    710367: '山上区',
    710368: '新市区',
    710369: '安定区',
    710399: '其它区',
    710401: '中区',
    710402: '东区',
    710403: '南区',
    710404: '西区',
    710405: '北区',
    710406: '北屯区',
    710407: '西屯区',
    710408: '南屯区',
    710431: '太平区',
    710432: '大里区',
    710433: '雾峰区',
    710434: '乌日区',
    710435: '丰原区',
    710436: '后里区',
    710437: '石冈区',
    710438: '东势区',
    710439: '和平区',
    710440: '新社区',
    710441: '潭子区',
    710442: '大雅区',
    710443: '神冈区',
    710444: '大肚区',
    710445: '沙鹿区',
    710446: '龙井区',
    710447: '梧栖区',
    710448: '清水区',
    710449: '大甲区',
    710450: '外埔区',
    710451: '大安区',
    710499: '其它区',
    710507: '金沙镇',
    710508: '金湖镇',
    710509: '金宁乡',
    710510: '金城镇',
    710511: '烈屿乡',
    710512: '乌坵乡',
    710614: '南投市',
    710615: '中寮乡',
    710616: '草屯镇',
    710617: '国姓乡',
    710618: '埔里镇',
    710619: '仁爱乡',
    710620: '名间乡',
    710621: '集集镇',
    710622: '水里乡',
    710623: '鱼池乡',
    710624: '信义乡',
    710625: '竹山镇',
    710626: '鹿谷乡',
    710701: '仁爱区',
    710702: '信义区',
    710703: '中正区',
    710704: '中山区',
    710705: '安乐区',
    710706: '暖暖区',
    710707: '七堵区',
    710799: '其它区',
    710801: '东区',
    710802: '北区',
    710803: '香山区',
    710899: '其它区',
    710901: '东区',
    710902: '西区',
    710999: '其它区',
    711130: '万里区',
    711132: '板桥区',
    711133: '汐止区',
    711134: '深坑区',
    711135: '石碇区',
    711136: '瑞芳区',
    711137: '平溪区',
    711138: '双溪区',
    711139: '贡寮区',
    711140: '新店区',
    711141: '坪林区',
    711142: '乌来区',
    711143: '永和区',
    711144: '中和区',
    711145: '土城区',
    711146: '三峡区',
    711147: '树林区',
    711148: '莺歌区',
    711149: '三重区',
    711150: '新庄区',
    711151: '泰山区',
    711152: '林口区',
    711153: '芦洲区',
    711154: '五股区',
    711155: '八里区',
    711156: '淡水区',
    711157: '三芝区',
    711158: '石门区',
    711287: '宜兰市',
    711288: '头城镇',
    711289: '礁溪乡',
    711290: '壮围乡',
    711291: '员山乡',
    711292: '罗东镇',
    711293: '三星乡',
    711294: '大同乡',
    711295: '五结乡',
    711296: '冬山乡',
    711297: '苏澳镇',
    711298: '南澳乡',
    711299: '钓鱼台',
    711387: '竹北市',
    711388: '湖口乡',
    711389: '新丰乡',
    711390: '新埔镇',
    711391: '关西镇',
    711392: '芎林乡',
    711393: '宝山乡',
    711394: '竹东镇',
    711395: '五峰乡',
    711396: '横山乡',
    711397: '尖石乡',
    711398: '北埔乡',
    711399: '峨眉乡',
    711414: '中坜区',
    711415: '平镇区',
    711417: '杨梅区',
    711418: '新屋区',
    711419: '观音区',
    711420: '桃园区',
    711421: '龟山区',
    711422: '八德区',
    711423: '大溪区',
    711425: '大园区',
    711426: '芦竹区',
    711487: '中坜市',
    711488: '平镇市',
    711489: '龙潭乡',
    711490: '杨梅市',
    711491: '新屋乡',
    711492: '观音乡',
    711493: '桃园市',
    711494: '龟山乡',
    711495: '八德市',
    711496: '大溪镇',
    711497: '复兴乡',
    711498: '大园乡',
    711499: '芦竹乡',
    711520: '头份市',
    711582: '竹南镇',
    711583: '头份镇',
    711584: '三湾乡',
    711585: '南庄乡',
    711586: '狮潭乡',
    711587: '后龙镇',
    711588: '通霄镇',
    711589: '苑里镇',
    711590: '苗栗市',
    711591: '造桥乡',
    711592: '头屋乡',
    711593: '公馆乡',
    711594: '大湖乡',
    711595: '泰安乡',
    711596: '铜锣乡',
    711597: '三义乡',
    711598: '西湖乡',
    711599: '卓兰镇',
    711736: '员林市',
    711774: '彰化市',
    711775: '芬园乡',
    711776: '花坛乡',
    711777: '秀水乡',
    711778: '鹿港镇',
    711779: '福兴乡',
    711780: '线西乡',
    711781: '和美镇',
    711782: '伸港乡',
    711783: '员林镇',
    711784: '社头乡',
    711785: '永靖乡',
    711786: '埔心乡',
    711787: '溪湖镇',
    711788: '大村乡',
    711789: '埔盐乡',
    711790: '田中镇',
    711791: '北斗镇',
    711792: '田尾乡',
    711793: '埤头乡',
    711794: '溪州乡',
    711795: '竹塘乡',
    711796: '二林镇',
    711797: '大城乡',
    711798: '芳苑乡',
    711799: '二水乡',
    711982: '番路乡',
    711983: '梅山乡',
    711984: '竹崎乡',
    711985: '阿里山乡',
    711986: '中埔乡',
    711987: '大埔乡',
    711988: '水上乡',
    711989: '鹿草乡',
    711990: '太保市',
    711991: '朴子市',
    711992: '东石乡',
    711993: '六脚乡',
    711994: '新港乡',
    711995: '民雄乡',
    711996: '大林镇',
    711997: '溪口乡',
    711998: '义竹乡',
    711999: '布袋镇',
    712180: '斗南镇',
    712181: '大埤乡',
    712182: '虎尾镇',
    712183: '土库镇',
    712184: '褒忠乡',
    712185: '东势乡',
    712186: '台西乡',
    712187: '仑背乡',
    712188: '麦寮乡',
    712189: '斗六市',
    712190: '林内乡',
    712191: '古坑乡',
    712192: '莿桐乡',
    712193: '西螺镇',
    712194: '二仑乡',
    712195: '北港镇',
    712196: '水林乡',
    712197: '口湖乡',
    712198: '四湖乡',
    712199: '元长乡',
    712451: '崁顶乡',
    712467: '屏东市',
    712468: '三地门乡',
    712469: '雾台乡',
    712470: '玛家乡',
    712471: '九如乡',
    712472: '里港乡',
    712473: '高树乡',
    712474: '盐埔乡',
    712475: '长治乡',
    712476: '麟洛乡',
    712477: '竹田乡',
    712478: '内埔乡',
    712479: '万丹乡',
    712480: '潮州镇',
    712481: '泰武乡',
    712482: '来义乡',
    712483: '万峦乡',
    712484: '莰顶乡',
    712485: '新埤乡',
    712486: '南州乡',
    712487: '林边乡',
    712488: '东港镇',
    712489: '琉球乡',
    712490: '佳冬乡',
    712491: '新园乡',
    712492: '枋寮乡',
    712493: '枋山乡',
    712494: '春日乡',
    712495: '狮子乡',
    712496: '车城乡',
    712497: '牡丹乡',
    712498: '恒春镇',
    712499: '满州乡',
    712584: '台东市',
    712585: '绿岛乡',
    712586: '兰屿乡',
    712587: '延平乡',
    712588: '卑南乡',
    712589: '鹿野乡',
    712590: '关山镇',
    712591: '海端乡',
    712592: '池上乡',
    712593: '东河乡',
    712594: '成功镇',
    712595: '长滨乡',
    712596: '金峰乡',
    712597: '大武乡',
    712598: '达仁乡',
    712599: '太麻里乡',
    712686: '花莲市',
    712687: '新城乡',
    712688: '太鲁阁',
    712689: '秀林乡',
    712690: '吉安乡',
    712691: '寿丰乡',
    712692: '凤林镇',
    712693: '光复乡',
    712694: '丰滨乡',
    712695: '瑞穗乡',
    712696: '万荣乡',
    712697: '玉里镇',
    712698: '卓溪乡',
    712699: '富里乡',
    712794: '马公市',
    712795: '西屿乡',
    712796: '望安乡',
    712797: '七美乡',
    712798: '白沙乡',
    712799: '湖西乡',
    712896: '南竿乡',
    712897: '北竿乡',
    712898: '东引乡',
    712899: '莒光乡',
    810101: '中西区',
    810102: '湾仔区',
    810103: '东区',
    810104: '南区',
    810201: '九龙城区',
    810202: '油尖旺区',
    810203: '深水埗区',
    810204: '黄大仙区',
    810205: '观塘区',
    810301: '北区',
    810302: '大埔区',
    810303: '沙田区',
    810304: '西贡区',
    810305: '元朗区',
    810306: '屯门区',
    810307: '荃湾区',
    810308: '葵青区',
    810309: '离岛区',
    820101: '澳门半岛',
    820201: '离岛' } };exports.default = _default;

/***/ }),

/***/ 33:
/*!*************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/appRouter/util.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.assertCanBack = exports.getPageOnBeforeBack = exports.APPGetPageRoute = exports.getFormatQuery = exports.ruleToUniNavInfo = exports.pathOrNameToRoute = exports.formatFrom = exports.formatTo = exports.getPageVmOrMp = exports.isNvuePage = exports.getPages = exports.callAppHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _warn = __webpack_require__(/*! ../helpers/warn */ 27);
var _util = __webpack_require__(/*! ../helpers/util */ 24);
var _config = __webpack_require__(/*! ../helpers/config */ 25);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 触发指定生命钩子
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Array} funList	//需要执行的方法列表
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Object} args //触发生命钩子传递的参数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
var callAppHook = function callAppHook(funList, args) {
  for (var i = 0; i < funList.length; i++) {
    funList[i].call(this, args);
  }
};
/**
    * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
    * @param {Boolean} all //是否获取全部的页面
    */exports.callAppHook = callAppHook;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  if (index === -1) {
    return pages;
  }
  if (index === -2) {
    return pages[pages.length - 1];
  }
  if (index === -3) {
    return pages[pages.length - 2];
  }
  return pages[index];
};
/**
    * 验证当前页面是否为nvue页面
    * @param {Object} page 当前页面对象
    */exports.getPages = getPages;
var isNvuePage = function isNvuePage(page) {
  var cstr = page.constructor.name;
  var pageType = {
    s: true,
    z: false };

  return pageType[cstr];
};

/**
    * @param {Object} page //当前顶级页面对象
    * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
    */exports.isNvuePage = isNvuePage;
var getPageVmOrMp = function getPageVmOrMp(page) {var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vim) {
    return page.$vm;
  }
  if (page.$vm.$mp) {
    return page.$vm.$mp;
  } else {
    if (isNvuePage(page)) {//nvue 页面
      return {
        page: page,
        query: page.__displayReporter.query };

    }
  }
};

/**
    * 获取 to 的配置参数
    * @param {Object} rule 当前跳转的规则
    */exports.getPageVmOrMp = getPageVmOrMp;
var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);
  var rule = finalRoute.rule;
  route.query = rule['query'] || rule['params'] || {};
  return route;
};
/**
    * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
    * 
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatTo = formatTo;
var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);var _getPageVmOrMp =
  getPageVmOrMp(topPage, false),page = _getPageVmOrMp.page,query = _getPageVmOrMp.query;
  var route = pathOrNameToRoute(page.route, routes); //获取到当前路由表下的 route
  route.query = getFormatQuery(query); //不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
  return route;
};
/**
    * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
    * @param {string} type   //path 或者 name
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatFrom = formatFrom;
var pathOrNameToRoute = function pathOrNameToRoute(type) {var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  for (var key in routes) {
    var item = routes[key];
    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); //合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.path === type) {
      return (0, _config.route)(item); //合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.name == type) {
      return (0, _config.route)(item); //合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }
  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};
/**
    * 
    * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
    * 
    * @param {Object} rule  //当前用户跳转的路由规则
    * @param {Object} routes //当前simple-router 下的路由表 
    */exports.pathOrNameToRoute = pathOrNameToRoute;
var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)("\u5F53\u524D\u8DF3\u8F6C\u89C4\u5219\u4E3A\u7A7A,\u8BF7\u68C0\u67E5\u8DF3\u8F6C\u4EE3\u7801");
  }var
  navType = 'path',route = null,query = {},animation = {};
  if (rule.constructor === String) {//是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); //直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {//对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule['path'] || (navType = 'name', rule['name']), routes); //两则必有其一 报错自己处理
    query = rule['query'] || rule['params'] || {};
    animation = rule.animation || {};
  } else {
    return (0, _warn.err)("\u4F20\u7684\u4EC0\u4E48\u4E71\u4E03\u516B\u7CDF\u7684\u7C7B\u578B?\u8DEF\u7531\u8DF3\u8F6C\u89C4\u5219\u53EA\u8BA4\u5B57\u7B26\u4E32 'path' , \u5BF9\u8C61 'path' , \u5BF9\u8C61 'name' ");
  }
  animation = _objectSpread({}, _config.Global.Router.CONFIG.APP.animation, {}, route.animation || {}, {}, animation); //合并多种方式声明的动画效果
  route.animation = animation; //这才是最终的页面切换效果
  //路径处理完后   开始格式化参数
  var uniRoute = (0, _util.parseQuery)(route.path, query); //uni-app 需要的跳转规则
  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute };

};
/**
    * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
    * 
    * @param {Object} query 当前的路由参数
    * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
    */exports.ruleToUniNavInfo = ruleToUniNavInfo;
var getFormatQuery = function getFormatQuery() {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var getter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    try {
      query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
    } catch (e) {
      query = JSON.parse(query.query);
    }
  }
  return query;
};
/**
    * 获取当前页面下的 Route 信息
    * 
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.getFormatQuery = getFormatQuery;
var APPGetPageRoute = function APPGetPageRoute(pages, Vim) {var
  query = {},path = '';
  if (pages.length > 0) {
    var _page = pages[pages.length - 1]; //获取到当前页面
    query = getFormatQuery(_page.options, true);
    path = _page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }
  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};
/**
    * 获取当前页面下的onBeforeBack 生命周期并执行
    * 
    * @param {Object} args 当前返回页面时uni-app传递的参数
    */exports.APPGetPageRoute = APPGetPageRoute;
var getPageOnBeforeBack = function getPageOnBeforeBack(args) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var currPage, onBeforeBack, isNext;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              currPage = getPages(-2); //获取到当前页面
              onBeforeBack = currPage.$vm.$options.onBeforeBack;if (!(
              onBeforeBack != null && onBeforeBack.constructor === Function)) {_context.next = 8;break;}_context.next = 5;return (
                onBeforeBack.call(currPage.$vm, args));case 5:isNext = _context.sent;if (!(
              isNext === true)) {_context.next = 8;break;}return _context.abrupt("return",
              resolve(false));case 8:return _context.abrupt("return",


              resolve(true));case 9:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 断言当前页面是否可返回上一级
    * @param {Object} page 当前页面webview对象
    */exports.getPageOnBeforeBack = getPageOnBeforeBack;
var assertCanBack = function assertCanBack(page) {
  var pageStyle = page.$getAppWebview().getStyle();
  if (pageStyle.titleNView != null && pageStyle.titleNView.autoBackButton) {//只有处理有带返回按钮的页面  
    return true;
  }
  //两种情况 1.真的是顶级页面时  2.自定义头部
  var $page = page.$page;
  if ($page && $page.meta.isQuit === false) {//自定义头部 不是顶级页面
    return true;
  }
  return false; //不可返回 真的是顶级页面时 返回就直接退出app了
};exports.assertCanBack = assertCanBack;

/***/ }),

/***/ 330:
/*!************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/weixin-js-sdk/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}!function (e, n) {
  module.exports = n(e);
}(window, function (o, e) {
  if (!o.jWeixin) {var _w;
    var n,
    c = {
      config: "preVerifyJSAPI",
      onMenuShareTimeline: "menu:share:timeline",
      onMenuShareAppMessage: "menu:share:appmessage",
      onMenuShareQQ: "menu:share:qq",
      onMenuShareWeibo: "menu:share:weiboApp",
      onMenuShareQZone: "menu:share:QZone",
      previewImage: "imagePreview",
      getLocation: "geoLocation",
      openProductSpecificView: "openProductViewWithPid",
      addCard: "batchAddCard",
      openCard: "batchViewCard",
      chooseWXPay: "getBrandWCPayRequest",
      openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
      startSearchBeacons: "startMonitoringBeacons",
      stopSearchBeacons: "stopMonitoringBeacons",
      onSearchBeacons: "onBeaconsInRange",
      consumeAndShareCard: "consumedShareCard",
      openAddress: "editAddress" },

    a = function () {
      var e = {};
      for (var n in c) {e[c[n]] = n;}
      return e;
    }(),
    i = o.document,
    t = i.title,
    r = navigator.userAgent.toLowerCase(),
    s = navigator.platform.toLowerCase(),
    d = !(!s.match("mac") && !s.match("win")),
    u = -1 != r.indexOf("wxdebugger"),
    l = -1 != r.indexOf("micromessenger"),
    p = -1 != r.indexOf("android"),
    f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),
    m = (n =
    r.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
    r.match(/micromessenger\/(\d+\.\d+)/)) ?
    n[1] :
    "",
    g = {
      initStartTime: L(),
      initEndTime: 0,
      preVerifyStartTime: 0,
      preVerifyEndTime: 0 },

    h = {
      version: 1,
      appId: "",
      initTime: 0,
      preVerifyTime: 0,
      networkType: "",
      isPreVerifyOk: 1,
      systemType: f ? 1 : p ? 2 : -1,
      clientVersion: m,
      url: encodeURIComponent(location.href) },

    v = {},
    S = { _completes: [] },
    y = { state: 0, data: {} };
    O(function () {
      g.initEndTime = L();
    });
    var I = !1,
    _ = [],
    w = (_w = {
      config: function config(e) {
        B("config", v = e);
        var t = !1 !== v.check;
        O(function () {
          if (t)
          M(
          c.config,
          {
            verifyJsApiList: C(v.jsApiList),
            verifyOpenTagList: C(v.openTagList) },

          function () {
            S._complete = function (e) {
              g.preVerifyEndTime = L(), y.state = 1, y.data = e;
            },
            S.success = function (e) {
              h.isPreVerifyOk = 0;
            },
            S.fail = function (e) {
              S._fail ? S._fail(e) : y.state = -1;
            };
            var t = S._completes;
            return (
              t.push(function () {
                !function () {
                  if (
                  !(
                  d ||
                  u ||
                  v.debug ||
                  m < "6.0.2" ||
                  h.systemType < 0))

                  {
                    var i = new Image();
                    h.appId = v.appId,
                    h.initTime = g.initEndTime - g.initStartTime,
                    h.preVerifyTime =
                    g.preVerifyEndTime - g.preVerifyStartTime,
                    w.getNetworkType({
                      isInnerInvoke: !0,
                      success: function success(e) {
                        h.networkType = e.networkType;
                        var n =
                        "https://open.weixin.qq.com/sdk/report?v=" +
                        h.version +
                        "&o=" +
                        h.isPreVerifyOk +
                        "&s=" +
                        h.systemType +
                        "&c=" +
                        h.clientVersion +
                        "&a=" +
                        h.appId +
                        "&n=" +
                        h.networkType +
                        "&i=" +
                        h.initTime +
                        "&p=" +
                        h.preVerifyTime +
                        "&u=" +
                        h.url;
                        i.src = n;
                      } });

                  }
                }();
              }),
              S.complete = function (e) {
                for (var n = 0, i = t.length; n < i; ++n) {t[n]();}
                S._completes = [];
              },
              S);

          }()),

          g.preVerifyStartTime = L();else
          {
            y.state = 1;
            for (var e = S._completes, n = 0, i = e.length; n < i; ++n) {
              e[n]();}
            S._completes = [];
          }
        }),
        w.invoke || (
        w.invoke = function (e, n, i) {
          o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);
        },
        w.on = function (e, n) {
          o.WeixinJSBridge && WeixinJSBridge.on(e, n);
        });
      },
      ready: function ready(e) {
        0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());
      },
      error: function error(e) {
        m < "6.0.2" || (-1 == y.state ? e(y.data) : S._fail = e);
      },
      checkJsApi: function checkJsApi(e) {
        M(
        "checkJsApi",
        { jsApiList: C(e.jsApiList) }, (
        e._complete = function (e) {
          if (p) {
            var n = e.checkResult;
            n && (e.checkResult = JSON.parse(n));
          }
          e = function (e) {
            var n = e.checkResult;
            for (var i in n) {
              var t = a[i];
              t && (n[t] = n[i], delete n[i]);
            }
            return e;
          }(e);
        },
        e));

      },
      onMenuShareTimeline: function onMenuShareTimeline(e) {
        P(
        c.onMenuShareTimeline,
        {
          complete: function complete() {
            M(
            "shareTimeline",
            {
              title: e.title || t,
              desc: e.title || t,
              img_url: e.imgUrl || "",
              link: e.link || location.href,
              type: e.type || "link",
              data_url: e.dataUrl || "" },

            e);

          } },

        e);

      },
      onMenuShareAppMessage: function onMenuShareAppMessage(n) {
        P(
        c.onMenuShareAppMessage,
        {
          complete: function complete(e) {
            "favorite" === e.scene ?
            M("sendAppMessage", {
              title: n.title || t,
              desc: n.desc || "",
              link: n.link || location.href,
              img_url: n.imgUrl || "",
              type: n.type || "link",
              data_url: n.dataUrl || "" }) :

            M(
            "sendAppMessage",
            {
              title: n.title || t,
              desc: n.desc || "",
              link: n.link || location.href,
              img_url: n.imgUrl || "",
              type: n.type || "link",
              data_url: n.dataUrl || "" },

            n);

          } },

        n);

      },
      onMenuShareQQ: function onMenuShareQQ(e) {
        P(
        c.onMenuShareQQ,
        {
          complete: function complete() {
            M(
            "shareQQ",
            {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },

            e);

          } },

        e);

      },
      onMenuShareWeibo: function onMenuShareWeibo(e) {
        P(
        c.onMenuShareWeibo,
        {
          complete: function complete() {
            M(
            "shareWeiboApp",
            {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },

            e);

          } },

        e);

      },
      onMenuShareQZone: function onMenuShareQZone(e) {
        P(
        c.onMenuShareQZone,
        {
          complete: function complete() {
            M(
            "shareQZone",
            {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },

            e);

          } },

        e);

      },
      updateTimelineShareData: function updateTimelineShareData(e) {
        M(
        "updateTimelineShareData",
        { title: e.title, link: e.link, imgUrl: e.imgUrl },
        e);

      },
      updateAppMessageShareData: function updateAppMessageShareData(e) {
        M(
        "updateAppMessageShareData",
        { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl },
        e);

      },
      startRecord: function startRecord(e) {
        M("startRecord", {}, e);
      },
      stopRecord: function stopRecord(e) {
        M("stopRecord", {}, e);
      },
      onVoiceRecordEnd: function onVoiceRecordEnd(e) {
        P("onVoiceRecordEnd", e);
      },
      playVoice: function playVoice(e) {
        M("playVoice", { localId: e.localId }, e);
      },
      pauseVoice: function pauseVoice(e) {
        M("pauseVoice", { localId: e.localId }, e);
      },
      stopVoice: function stopVoice(e) {
        M("stopVoice", { localId: e.localId }, e);
      },
      onVoicePlayEnd: function onVoicePlayEnd(e) {
        P("onVoicePlayEnd", e);
      },
      uploadVoice: function uploadVoice(e) {
        M(
        "uploadVoice",
        {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      downloadVoice: function downloadVoice(e) {
        M(
        "downloadVoice",
        {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      translateVoice: function translateVoice(e) {
        M(
        "translateVoice",
        {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      chooseImage: function chooseImage(e) {
        M(
        "chooseImage",
        {
          scene: "1|2",
          count: e.count || 9,
          sizeType: e.sizeType || ["original", "compressed"],
          sourceType: e.sourceType || ["album", "camera"] }, (

        e._complete = function (e) {
          if (p) {
            var n = e.localIds;
            try {
              n && (e.localIds = JSON.parse(n));
            } catch (e) {}
          }
        },
        e));

      },
      getLocation: function getLocation(e) {},
      previewImage: function previewImage(e) {
        M(c.previewImage, { current: e.current, urls: e.urls }, e);
      },
      uploadImage: function uploadImage(e) {
        M(
        "uploadImage",
        {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      downloadImage: function downloadImage(e) {
        M(
        "downloadImage",
        {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      getLocalImgData: function getLocalImgData(e) {
        !1 === I ? (
        I = !0,
        M(
        "getLocalImgData",
        { localId: e.localId }, (
        e._complete = function (e) {
          if (I = !1, 0 < _.length) {
            var n = _.shift();
            wx.getLocalImgData(n);
          }
        },
        e))) :

        _.push(e);
      },
      getNetworkType: function getNetworkType(e) {
        M(
        "getNetworkType",
        {}, (
        e._complete = function (e) {
          e = function (e) {
            var n = e.errMsg;
            e.errMsg = "getNetworkType:ok";
            var i = e.subtype;
            if (delete e.subtype, i) e.networkType = i;else
            {
              var t = n.indexOf(":"),
              o = n.substring(t + 1);
              switch (o) {
                case "wifi":
                case "edge":
                case "wwan":
                  e.networkType = o;
                  break;
                default:
                  e.errMsg = "getNetworkType:fail";}

            }
            return e;
          }(e);
        },
        e));

      },
      openLocation: function openLocation(e) {
        M(
        "openLocation",
        {
          latitude: e.latitude,
          longitude: e.longitude,
          name: e.name || "",
          address: e.address || "",
          scale: e.scale || 28,
          infoUrl: e.infoUrl || "" },

        e);

      } }, _defineProperty(_w, "getLocation",
    function getLocation(e) {
      M(
      c.getLocation,
      { type: (e = e || {}).type || "wgs84" }, (
      e._complete = function (e) {
        delete e.type;
      },
      e));

    }), _defineProperty(_w, "hideOptionMenu",
    function hideOptionMenu(e) {
      M("hideOptionMenu", {}, e);
    }), _defineProperty(_w, "showOptionMenu",
    function showOptionMenu(e) {
      M("showOptionMenu", {}, e);
    }), _defineProperty(_w, "closeWindow",
    function closeWindow(e) {
      M("closeWindow", {}, e = e || {});
    }), _defineProperty(_w, "hideMenuItems",
    function hideMenuItems(e) {
      M("hideMenuItems", { menuList: e.menuList }, e);
    }), _defineProperty(_w, "showMenuItems",
    function showMenuItems(e) {
      M("showMenuItems", { menuList: e.menuList }, e);
    }), _defineProperty(_w, "hideAllNonBaseMenuItem",
    function hideAllNonBaseMenuItem(e) {
      M("hideAllNonBaseMenuItem", {}, e);
    }), _defineProperty(_w, "showAllNonBaseMenuItem",
    function showAllNonBaseMenuItem(e) {
      M("showAllNonBaseMenuItem", {}, e);
    }), _defineProperty(_w, "scanQRCode",
    function scanQRCode(e) {
      M(
      "scanQRCode",
      {
        needResult: (e = e || {}).needResult || 0,
        scanType: e.scanType || ["qrCode", "barCode"] }, (

      e._complete = function (e) {
        if (f) {
          var n = e.resultStr;
          if (n) {
            var i = JSON.parse(n);
            e.resultStr = i && i.scan_code && i.scan_code.scan_result;
          }
        }
      },
      e));

    }), _defineProperty(_w, "openAddress",
    function openAddress(e) {
      M(
      c.openAddress,
      {}, (
      e._complete = function (e) {
        e = function (e) {
          return (
            e.postalCode = e.addressPostalCode,
            delete e.addressPostalCode,
            e.provinceName = e.proviceFirstStageName,
            delete e.proviceFirstStageName,
            e.cityName = e.addressCitySecondStageName,
            delete e.addressCitySecondStageName,
            e.countryName = e.addressCountiesThirdStageName,
            delete e.addressCountiesThirdStageName,
            e.detailInfo = e.addressDetailInfo,
            delete e.addressDetailInfo,
            e);

        }(e);
      },
      e));

    }), _defineProperty(_w, "openProductSpecificView",
    function openProductSpecificView(e) {
      M(
      c.openProductSpecificView,
      {
        pid: e.productId,
        view_type: e.viewType || 0,
        ext_info: e.extInfo },

      e);

    }), _defineProperty(_w, "addCard",
    function addCard(e) {
      for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
        var r = n[t],
        a = { card_id: r.cardId, card_ext: r.cardExt };
        i.push(a);
      }
      M(
      c.addCard,
      { card_list: i }, (
      e._complete = function (e) {
        var n = e.card_list;
        if (n) {
          for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
            var o = n[i];
            o.cardId = o.card_id,
            o.cardExt = o.card_ext,
            o.isSuccess = !!o.is_succ,
            delete o.card_id,
            delete o.card_ext,
            delete o.is_succ;
          }
          e.cardList = n, delete e.card_list;
        }
      },
      e));

    }), _defineProperty(_w, "chooseCard",
    function chooseCard(e) {
      M(
      "chooseCard",
      {
        app_id: v.appId,
        location_id: e.shopId || "",
        sign_type: e.signType || "SHA1",
        card_id: e.cardId || "",
        card_type: e.cardType || "",
        card_sign: e.cardSign,
        time_stamp: e.timestamp + "",
        nonce_str: e.nonceStr }, (

      e._complete = function (e) {
        e.cardList = e.choose_card_info, delete e.choose_card_info;
      },
      e));

    }), _defineProperty(_w, "openCard",
    function openCard(e) {
      for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
        var r = n[t],
        a = { card_id: r.cardId, code: r.code };
        i.push(a);
      }
      M(c.openCard, { card_list: i }, e);
    }), _defineProperty(_w, "consumeAndShareCard",
    function consumeAndShareCard(e) {
      M(
      c.consumeAndShareCard,
      { consumedCardId: e.cardId, consumedCode: e.code },
      e);

    }), _defineProperty(_w, "chooseWXPay",
    function chooseWXPay(e) {
      M(c.chooseWXPay, V(e), e);
    }), _defineProperty(_w, "openEnterpriseRedPacket",
    function openEnterpriseRedPacket(e) {
      M(c.openEnterpriseRedPacket, V(e), e);
    }), _defineProperty(_w, "startSearchBeacons",
    function startSearchBeacons(e) {
      M(c.startSearchBeacons, { ticket: e.ticket }, e);
    }), _defineProperty(_w, "stopSearchBeacons",
    function stopSearchBeacons(e) {
      M(c.stopSearchBeacons, {}, e);
    }), _defineProperty(_w, "onSearchBeacons",
    function onSearchBeacons(e) {
      P(c.onSearchBeacons, e);
    }), _defineProperty(_w, "openEnterpriseChat",
    function openEnterpriseChat(e) {
      M(
      "openEnterpriseChat",
      { useridlist: e.userIds, chatname: e.groupName },
      e);

    }), _defineProperty(_w, "launchMiniProgram",
    function launchMiniProgram(e) {
      M(
      "launchMiniProgram",
      {
        targetAppId: e.targetAppId,
        path: function (e) {
          if ("string" == typeof e && 0 < e.length) {
            var n = e.split("?")[0],
            i = e.split("?")[1];
            return n += ".html", void 0 !== i ? n + "?" + i : n;
          }
        }(e.path),
        envVersion: e.envVersion },

      e);

    }), _defineProperty(_w, "openBusinessView",
    function openBusinessView(e) {
      M(
      "openBusinessView",
      {
        businessType: e.businessType,
        queryString: e.queryString || "",
        envVersion: e.envVersion }, (

      e._complete = function (n) {
        if (p) {
          var e = n.extraData;
          if (e)
          try {
            n.extraData = JSON.parse(e);
          } catch (e) {
            n.extraData = {};
          }
        }
      },
      e));

    }), _defineProperty(_w, "miniProgram",
    {
      navigateBack: function navigateBack(e) {
        e = e || {},
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "navigateBack", arg: { delta: e.delta || 1 } },
          e);

        });
      },
      navigateTo: function navigateTo(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "navigateTo", arg: { url: e.url } },
          e);

        });
      },
      redirectTo: function redirectTo(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "redirectTo", arg: { url: e.url } },
          e);

        });
      },
      switchTab: function switchTab(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "switchTab", arg: { url: e.url } },
          e);

        });
      },
      reLaunch: function reLaunch(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "reLaunch", arg: { url: e.url } },
          e);

        });
      },
      postMessage: function postMessage(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "postMessage", arg: e.data || {} },
          e);

        });
      },
      getEnv: function getEnv(e) {
        O(function () {
          e({ miniprogram: "miniprogram" === o.__wxjs_environment });
        });
      } }), _w),


    T = 1,
    k = {};
    return (
      i.addEventListener(
      "error",
      function (e) {
        if (!p) {
          var n = e.target,
          i = n.tagName,
          t = n.src;
          if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i)
          if (-1 != t.indexOf("wxlocalresource://")) {
            e.preventDefault(), e.stopPropagation();
            var o = n["wx-id"];
            if (o || (o = T++, n["wx-id"] = o), k[o]) return;
            k[o] = !0,
            wx.ready(function () {
              wx.getLocalImgData({
                localId: t,
                success: function success(e) {
                  n.src = e.localData;
                } });

            });
          }
        }
      },
      !0),

      i.addEventListener(
      "load",
      function (e) {
        if (!p) {
          var n = e.target,
          i = n.tagName;
          n.src;
          if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
            var t = n["wx-id"];
            t && (k[t] = !1);
          }
        }
      },
      !0),

      e && (o.wx = o.jWeixin = w),
      w);

  }
  function M(n, e, i) {
    o.WeixinJSBridge ?
    WeixinJSBridge.invoke(n, x(e), function (e) {
      A(n, e, i);
    }) :
    B(n, i);
  }
  function P(n, i, t) {
    o.WeixinJSBridge ?
    WeixinJSBridge.on(n, function (e) {
      t && t.trigger && t.trigger(e), A(n, e, i);
    }) :
    B(n, t || i);
  }
  function x(e) {
    return (
      (e = e || {}).appId = v.appId,
      e.verifyAppId = v.appId,
      e.verifySignType = "sha1",
      e.verifyTimestamp = v.timestamp + "",
      e.verifyNonceStr = v.nonceStr,
      e.verifySignature = v.signature,
      e);

  }
  function V(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1" };

  }
  function A(e, n, i) {
    "openEnterpriseChat" != e && "openBusinessView" !== e || (
    n.errCode = n.err_code),
    delete n.err_code,
    delete n.err_desc,
    delete n.err_detail;
    var t = n.errMsg;
    t || (
    t = n.err_msg,
    delete n.err_msg,
    t = function (e, n) {
      var i = e,
      t = a[i];
      t && (i = t);
      var o = "ok";
      if (n) {
        var r = n.indexOf(":");
        "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
        "failed" == o && (o = "fail"),
        -1 != o.indexOf("failed_") && (o = o.substring(7)),
        -1 != o.indexOf("fail_") && (o = o.substring(5)),
        "access denied" != (
        o = (o = o.replace(/_/g, " ")).toLowerCase()) &&
        "no permission to execute" != o || (
        o = "permission denied"),
        "config" == i && "function not exist" == o && (o = "ok"),
        "" == o && (o = "fail");
      }
      return n = i + ":" + o;
    }(e, t),
    n.errMsg = t),
    (i = i || {})._complete && (i._complete(n), delete i._complete),
    t = n.errMsg || "",
    v.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n);}

    i.complete && i.complete(n);
  }
  function C(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
        o = c[t];
        o && (e[n] = o);
      }
      return e;
    }
  }
  function B(e, n) {
    if (!(!v.debug || n && n.isInnerInvoke)) {
      var i = a[e];
      i && (e = i),
      n && n._complete && delete n._complete,
      console.log('"' + e + '",', n || "");
    }
  }
  function L() {
    return new Date().getTime();
  }
  function O(e) {
    l && (
    o.WeixinJSBridge ?
    e() :
    i.addEventListener &&
    i.addEventListener("WeixinJSBridgeReady", e, !1));
  }
});

/***/ }),

/***/ 34:
/*!*****************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/appletsRouter/util.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.AppletsPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.formatTo = exports.pathOrNameToRoute = exports.getPages = exports.getFormatQuery = exports.getPageVmOrMp = exports.callAppHook = void 0;var _config = __webpack_require__(/*! ../helpers/config */ 25);
var _util = __webpack_require__(/*! ../helpers/util */ 24);
var _warn = __webpack_require__(/*! ../helpers/warn */ 27);
var _compile = __webpack_require__(/*! ../helpers/compile.js */ 35);
/**
                                                  * 触发指定生命钩子
                                                  * @param {Array} funList	//需要执行的方法列表
                                                  * @param {Object} args //触发生命钩子传递的参数
                                                  */
var callAppHook = function callAppHook(funList, args) {
  for (var i = 0; i < funList.length; i++) {
    funList[i].call(this, args);
  }
};
/**
    * @param {Object} page //当前顶级页面对象
    * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
    */exports.callAppHook = callAppHook;
var getPageVmOrMp = function getPageVmOrMp(page) {var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vim) {
    return page.$vm;
  }var
  $mp = page.$vm.$mp;
  (0, _compile.baiduApple)(function () {//百度小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  (0, _compile.touTiao)(function () {//头条小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  return $mp;
};
/**
    * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
    * 
    * @param {Object} query 当前的路由参数
    * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
    */exports.getPageVmOrMp = getPageVmOrMp;
var getFormatQuery = function getFormatQuery() {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var getter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    if (getter) {
      try {//除去微信小程序都不需要 decodeURIComponent
        query = JSON.parse(decodeURIComponent(query.query) || '{}');
      } catch (e) {//其他小程序
        query = JSON.parse(query.query || '{}');
      }
    } else {
      try {
        query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
      } catch (e) {
        query = JSON.parse(query.query);
      }
    }
  }
  return query;
};
/**
    * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
    * @param {Boolean} all //是否获取全部的页面
    */exports.getFormatQuery = getFormatQuery;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  if (index === -1) {
    return pages;
  }
  if (index === -2) {
    return pages[pages.length - 1];
  }
  if (index === -3) {
    return pages[pages.length - 2];
  }
  return pages[index];
};
/**
    * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
    * @param {string} type   //path 或者 name
    * @param {Object} routes //当前对象的所有路由表
    */exports.getPages = getPages;
var pathOrNameToRoute = function pathOrNameToRoute(type) {var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  for (var key in routes) {
    var item = routes[key];
    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); //合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.path === type) {
      return (0, _config.route)(item); //合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.name == type) {
      return (0, _config.route)(item); //合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }
  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};

/**
    * 获取 to 的配置参数
    * @param {Object} rule 当前跳转的规则
    */exports.pathOrNameToRoute = pathOrNameToRoute;
var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);
  var rule = finalRoute.rule;
  route.query = rule['query'] || rule['params'] || {};
  return route;
};

/**
    * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
    * 
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatTo = formatTo;
var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);var _getPageVmOrMp =
  getPageVmOrMp(topPage, false),page = _getPageVmOrMp.page,query = _getPageVmOrMp.query;
  var route = pathOrNameToRoute(page.route, routes); //获取到当前路由表下的 route
  route.query = getFormatQuery(query); //不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
  return route;
};

/**
    * 
    * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
    * 
    * @param {Object} rule  //当前用户跳转的路由规则
    * @param {Object} routes //当前simple-router 下的路由表 
    */exports.formatFrom = formatFrom;
var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)("\u5F53\u524D\u8DF3\u8F6C\u89C4\u5219\u4E3A\u7A7A,\u8BF7\u68C0\u67E5\u8DF3\u8F6C\u4EE3\u7801");
  }var
  navType = 'path',route = null,query = {};
  if (rule.constructor === String) {//是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); //直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {//对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule['path'] || (navType = 'name', rule['name']), routes); //两则必有其一 报错自己处理
    query = rule['query'] || rule['params'] || {};
  } else {
    return (0, _warn.err)("\u4F20\u7684\u4EC0\u4E48\u4E71\u4E03\u516B\u7CDF\u7684\u7C7B\u578B?\u8DEF\u7531\u8DF3\u8F6C\u89C4\u5219\u53EA\u8BA4\u5B57\u7B26\u4E32 'path' , \u5BF9\u8C61 'path' , \u5BF9\u8C61 'name' ");
  }
  //路径处理完后   开始格式化参数
  var uniRoute = (0, _util.parseQuery)(route.path, query); //uni-app 需要的跳转规则
  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute };

};
/**
    * 获取当前页面下的 Route 信息
    * 
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.ruleToUniNavInfo = ruleToUniNavInfo;
var AppletsPageRoute = function AppletsPageRoute(pages, Vim) {var
  query = {},path = '';
  if (pages.length > 0) {
    var _page = pages[pages.length - 1]; //获取到当前页面
    var uniQuery = getPageVmOrMp(_page, false).query;
    query = getFormatQuery(uniQuery, true);
    path = _page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }
  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};exports.AppletsPageRoute = AppletsPageRoute;

/***/ }),

/***/ 35:
/*!**************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/helpers/compile.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.touTiao = exports.baiduApple = exports.notH5 = exports.applets = exports.APP = exports.H5 = void 0;var H5 = function H5(fn) {



};exports.H5 = H5;
var APP = function APP(fn) {



};exports.APP = APP;
var applets = function applets(fn) {

  fn();

};exports.applets = applets;
var notH5 = function notH5(fn) {

  fn();

};exports.notH5 = notH5;
var baiduApple = function baiduApple(fn) {



};exports.baiduApple = baiduApple;
var touTiao = function touTiao(fn) {



};exports.touTiao = touTiao;

/***/ }),

/***/ 36:
/*!**************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/lifeCycle/hooks.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerRouterHooks = exports.registerHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _util = __webpack_require__(/*! ../helpers/util */ 24);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}






var registerHook = function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) list.splice(i, 1);
  };
};
/**
    * 注册全局Router生命钩子
    */exports.registerHook = registerHook;
var registerRouterHooks = function registerRouterHooks() {
  registerHook(this.lifeCycle.routerbeforeHooks, function (fnType) {var _this = this;
    return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                _this.CONFIG.routerBeforeEach(); //触发暴露给开发者的生命钩子
                if ((0, _util.appPlatform)(true) === 'H5') {
                  H5PATCH.on('toogle', 'startLodding');
                }return _context.abrupt("return",
                resolve(true));case 3:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

  });
  registerHook(this.lifeCycle.routerAfterHooks, function () {var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (res.H5Intercept !== true) {
      this.CONFIG.routerAfterEach(); //触发暴露给开发者的生命钩子
    }
    if ((0, _util.appPlatform)(true) === 'H5') {
      H5PATCH.on('toogle', 'stopLodding');
    }
    return true;
  });
};exports.registerRouterHooks = registerRouterHooks;

/***/ }),

/***/ 37:
/*!**************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/appRouter/hooks.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.beforeTabHooks = exports.backApiCallHook = exports.beforeBackHooks = exports.transitionTo = exports.triggerLifeCycle = exports.proxyIndexHook = exports.proxyLaunchHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _config = __webpack_require__(/*! ../helpers/config */ 25);
var _util = __webpack_require__(/*! ./util */ 33);
var _util2 = __webpack_require__(/*! ../helpers/util */ 24);
var _warn = __webpack_require__(/*! ../helpers/warn */ 27);
var _uniNav = __webpack_require__(/*! ./uniNav */ 38);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var startBack = false; // 主要是兼容低端手机返回卡 然后多次返回直接提示退出的问题 

/**
 * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期 
 * @param {Boolean} callHome // 是否触发首页的生命周期
 * 
 * this 为当前 page 对象
 */
var callwaitHooks = function callwaitHooks(callHome) {var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var variation, appVue, indexVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _loop, _key;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              variation = []; //存储一下在uni-app上的变异生命钩子  奇葩的要死
              appVue = _config.uniAppHook.appVue, indexVue = _config.uniAppHook.indexVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;_context.next = 5;return (
                onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args));case 5: //确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); //onshow 不保证异步 直接确保执行最后一个
              if (callHome) {//触发首页生命周期
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {//只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }
              if (onLaunch.isHijack) {//还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }
              if (onShow.isHijack) {//继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              }_loop = function _loop(
              _key) {//还原 首页下的生命钩子
                var item = waitHooks[_key];
                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {//变异方法
                    variation.push({ key: _key, fun: item.fun[0] });
                  } else {
                    var indeHooks = indexVue[_key];
                    //修复 https://github.com/SilurianYang/uni-simple-router/issues/76
                    setTimeout(function () {//异步延迟还原 不然 uni-app 给给触发了
                      indeHooks.splice(indeHooks.length - 1, 1, item.fun[0]);
                    }, 50);
                  }
                }};for (_key in waitHooks) {_loop(_key);
              }
              resolve(variation);case 12:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 还原剩下的奇葩生命钩子
    * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
    */
var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i++) {var _variation$i =
    variation[i],key = _variation$i.key,fun = _variation$i.fun;
    var indeHooks = _config.uniAppHook.indexVue[key];
    indeHooks.splice(indeHooks.length - 1, 1, fun);
  }
};

/**
    * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
    * 
    * this 为当前 page 对象
    */
var proxyLaunchHook = function proxyLaunchHook() {var _this2 = this;var _this$$options =



  this.$options,onLaunch = _this$$options.onLaunch,onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; //缓存 当前app.vue组件对象
  if (onLaunch.length > 1) {//确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); //替换uni-app自带的生命周期
  }
  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;
      if (_config.uniAppHook.pageReady) {//因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); //替换替换 都替换
  }
};
/**
    * 把指定页面的生命钩子函数保存并替换
    * this 为当前 page 对象
    */exports.proxyLaunchHook = proxyLaunchHook;
var proxyIndexHook = function proxyIndexHook(Router) {var
  needHooks = _config.uniAppHook.needHooks,waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;
  for (var i = 0; i < needHooks.length; i++) {
    var key = needHooks[i];
    if (options[key] != null) {//只劫持开发者声明的生命周期
      var length = options[key].length;
      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); //把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
      whObject.isHijack = true;
    }
  }
  triggerLifeCycle.call(this, Router); //接着 主动我们触发导航守卫
};

/**
    * 主动触发导航守卫
    * @param {Object} Router 当前路由对象
    * 
    * this  当前vue页面组件对象
    */exports.proxyIndexHook = proxyIndexHook;
var triggerLifeCycle = function triggerLifeCycle(Router) {var _this3 = this;
  var topPage = getCurrentPages()[0];
  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }var _getPageVmOrMp =
  (0, _util.getPageVmOrMp)(topPage, false),query = _getPageVmOrMp.query,page = _getPageVmOrMp.page;
  transitionTo.call(Router, { path: page.route, query: query }, 'push', /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(finalRoute, fnType) {var variation;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              variation = [];if (!(
              "/".concat(page.route) == finalRoute.route.path)) {_context2.next = 8;break;} //在首页不动的情况下
              (0, _uniNav.pageNavFinish)('launch', page.route);
              _config.uniAppHook.pageReady = true; //标致着路由已经就绪 可能准备起飞
              _context2.next = 6;return callwaitHooks.call(_this3, true);case 6:_context2.next = 13;break;case 8:_context2.next = 10;return (

                callwaitHooks.call(_this3, false));case 10:variation = _context2.sent;_context2.next = 13;return (
                (0, _uniNav.uniPushTo)(finalRoute, fnType));case 13:

              plus.nativeObj.View.getViewById('router-loadding').close();
              callVariationHooks(variation);
              _config.uniAppHook.pageReady = true; //标致着路由已经就绪 可能准备起飞
            case 16:case "end":return _context2.stop();}}}, _callee2);}));return function (_x2, _x3) {return _ref2.apply(this, arguments);};}());
};
/**
    * 核心方法 处理一系列的跳转配置
    * @param {Object} rule 当前跳转规则
    * @param {Object} fnType 跳转页面的类型方法
    * @param {Object} navCB:? 回调函数
    * 
    * this 为当前 Router 对象
    * 
    */exports.triggerLifeCycle = triggerLifeCycle;
var transitionTo = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(rule, fnType, navCB) {var finalRoute, _from, _to, beforeResult, enterResult;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
              this.lifeCycle["routerbeforeHooks"][0].call(this));case 2: //触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); //获得到最终的 route 对象
            _from = (0, _util.formatFrom)(this.CONFIG.routes); //先根据跳转类型获取 from 数据
            _to = (0, _util.formatTo)(finalRoute); //再根据跳转类型获取 to 数据
            _context3.next = 7;return beforeHooks.call(this, _from, _to);case 7:beforeResult = _context3.sent;_context3.prev = 8;_context3.next = 11;return (

              isNext.call(this, beforeResult, fnType, navCB));case 11:_context3.next = 13;return (
              beforeEnterHooks.call(this, finalRoute, _from, _to));case 13:enterResult = _context3.sent;_context3.next = 16;return (
              isNext.call(this, enterResult, fnType, navCB));case 16:_context3.next = 21;break;case 18:_context3.prev = 18;_context3.t0 = _context3["catch"](8);return _context3.abrupt("return",

            false);case 21:

            navCB && navCB.call(this, finalRoute, fnType); //执行当前回调生命周期
            afterEachHooks.call(this, _from, _to);_context3.next = 25;return (
              this.lifeCycle["routerAfterHooks"][0].call(this));case 25:case "end":return _context3.stop();}}}, _callee3, this, [[8, 18]]);}));return function transitionTo(_x4, _x5, _x6) {return _ref3.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                                        * 触发全局beforeHooks 生命钩子
                                                                                                                                                                                                                                        * @param {Object} _from // from  参数
                                                                                                                                                                                                                                        * @param {Object} _to  // to 参数
                                                                                                                                                                                                                                        * 
                                                                                                                                                                                                                                        * this 为当前 Router 对象
                                                                                                                                                                                                                                        */exports.transitionTo = transitionTo;
var beforeHooks = function beforeHooks(_from, _to) {var _this4 = this;
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve) {var beforeHooks;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              beforeHooks = _this4.lifeCycle["beforeHooks"][0];if (!(
              beforeHooks == null)) {_context4.next = 3;break;}return _context4.abrupt("return",
              resolve());case 3:_context4.next = 5;return (

                beforeHooks.call(_this4, _to, _from, resolve));case 5:case "end":return _context4.stop();}}}, _callee4);}));return function (_x7) {return _ref4.apply(this, arguments);};}());

};
/**
    * 触发全局afterEachHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    * 
    * this 为当前 Router 对象
    */
var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle["afterHooks"][0];
  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
    * 触发全局 beforeEnter 生命钩子
    * @param {Object} finalRoute 	// 当前格式化后的路由参数
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    * 
    * this 为当前 Router 对象
    */
var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {var _this5 = this;
  return new Promise( /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(resolve) {var beforeEnter;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
              beforeEnter = finalRoute.route.beforeEnter;if (!(
              beforeEnter == null || beforeEnter.constructor !== Function)) {_context5.next = 3;break;}return _context5.abrupt("return",
              resolve());case 3:_context5.next = 5;return (

                beforeEnter.call(_this5, _to, _from, resolve));case 5:case "end":return _context5.stop();}}}, _callee5);}));return function (_x8) {return _ref5.apply(this, arguments);};}());

};
/**
    * 处理返回按钮的生命钩子
    * @param {Object} options 当前 vue 组件对象下的$options对象
    * @param {Array} args  当前页面是点击头部返回还是底部返回
    * 
    * this 为当前 Router 对象
    */
var beforeBackHooks = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(options, args) {var isNext, page;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
              (0, _util.getPageOnBeforeBack)(args));case 2:isNext = _context6.sent;if (!(
            isNext === false)) {_context6.next = 5;break;}return _context6.abrupt("return",
            false);case 5:

            page = (0, _util.getPages)(-3); //上一个页面对象
            backCallHook.call(this, page, options);case 7:case "end":return _context6.stop();}}}, _callee6, this);}));return function beforeBackHooks(_x9, _x10) {return _ref6.apply(this, arguments);};}();

/**
                                                                                                                                                                                                              * 处理back api的生命钩子
                                                                                                                                                                                                              * @param {Object} options 当前 vue 组件对象下的$options对象
                                                                                                                                                                                                              * @param {Array} args  当前页面是点击头部返回还是底部返回
                                                                                                                                                                                                              * 
                                                                                                                                                                                                              * this 为当前 Router 对象
                                                                                                                                                                                                              */exports.beforeBackHooks = beforeBackHooks;
var backApiCallHook = /*#__PURE__*/function () {var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(options, args) {var isNext, backLayerC, pages, page;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
              (0, _util.getPageOnBeforeBack)(args));case 2:isNext = _context7.sent;
            backLayerC = _config.Global.backLayerC;
            pages = (0, _util.getPages)();
            page = null;
            if (backLayerC > pages.length - 1 || backLayerC == pages.length - 1) {//返回的首页 我们需要显示tabbar拦截
              page = pages[0];
            } else {
              page = pages[pages.length - 2];
            }
            backCallHook.call(this, page, options, backLayerC);case 8:case "end":return _context7.stop();}}}, _callee7, this);}));return function backApiCallHook(_x11, _x12) {return _ref7.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                           * 触发返回事件公共方法
                                                                                                                                                                                                                           * @param {Object} page	用getPages获取到的页面栈对象
                                                                                                                                                                                                                           * @param {Object} options 	当前vue页面对象
                                                                                                                                                                                                                           * @param {Object} backLayerC	需要返回页面的层级
                                                                                                                                                                                                                             * 
                                                                                                                                                                                                                           * this 为当前 Router 对象
                                                                                                                                                                                                                           */exports.backApiCallHook = backApiCallHook;
var backCallHook = function backCallHook(page, options) {var _this6 = this;var backLayerC = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var route = (0, _util.APPGetPageRoute)([page]);
  transitionTo.call(this, { path: route.path, query: route.query }, 'RouterBack', function () {
    if (startBack) {return false;}; //如果当前处于正在放回的状态
    startBack = true; //标记开始返回
    options.onBackPress = [_util2.noop]; //改回uni-app可执行的状态
    setTimeout(function () {
      _this6.back(backLayerC);
      startBack = false; //返回结束
      (0, _uniNav.pageNavFinish)('bcak', route.path);
    });
  });
};
/**
    * 处理tabbar点击拦截事件
    * @param {Object} path 当前需要跳转的tab页面路径
    * 
    * this 为当前 Router 对象
    */
var beforeTabHooks = function beforeTabHooks(path) {
  transitionTo.call(this, { path: "/".concat(path), query: {} }, 'pushTab', function (finalRoute, fnType) {
    (0, _uniNav.uniPushTo)(finalRoute, fnType);
  });
};
/**
    * 验证当前 next() 管道函数是否支持下一步
    * 
    * @param {Object} Intercept 拦截到的新路由规则
    * @param {Object} fnType 跳转页面的类型方法 原始的
    * @param {Object} navCB 回调函数 原始的
    * 
    * this 为当前 Router 对象
    * 
    */exports.beforeTabHooks = beforeTabHooks;
var isNext = function isNext(Intercept, fnType, navCB) {var _this7 = this;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {//什么也不做 直接执行下一个钩子
      return resolve();
    }
    if (Intercept === false) {//路由中断
      return reject('路由终止');
    }
    if (Intercept.constructor === String) {//说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject(1);
      return transitionTo.call(_this7, Intercept, fnType, navCB);
    }
    if (Intercept.constructor === Object) {//有一系列的配置 包括页面切换动画什么的
      reject(1);
      return transitionTo.call(_this7, Intercept, Intercept.NAVTYPE || fnType, navCB);
    }
  });
};

/***/ }),

/***/ 38:
/*!***************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/appRouter/uniNav.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.pageNavFinish = exports.uniPushTo = void 0;
var _config = __webpack_require__(/*! ../helpers/config */ 25);
var _util = __webpack_require__(/*! ../helpers/util */ 24);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var stop = null;

/**
                  * @param {Object} finalRoute 格式化后的路由跳转规则
                  * @param {Object} NAVTYPE 需要调用的跳转方法
                  */
var uniPushTo = function uniPushTo(finalRoute, NAVTYPE) {
  var promise = new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));
    var APP = _config.baseConfig.APP;
    var url = finalRoute.uniRoute.url;
    stop = setTimeout(function () {
      resolve(url);
      resolve = _util.noop; //执行完了就没了 确保不会被下一次执行
    }, APP.switchPageOutTime);

    uni[_config.methods[NAVTYPE]](_objectSpread({
      url: url + query },
    finalRoute.route.animation, {
      complete: function complete() {
        clearTimeout(stop);
        resolve(url);
        resolve = _util.noop; //执行完了就没了 确保不会被下一次执行
      } }));

  });
  promise.then(function (url) {
    pageNavFinish('NAV', url);
  });
  return promise;
};
/**
    * 验证页面是否跳转完成
    * @param {Object} type 是用怎么样的方式进行跳转的
    * @param {Object} path 当前切换完成的页面路径
    */exports.uniPushTo = uniPushTo;
var pageNavFinish = function pageNavFinish(type, path) {var
  $holdTab = _config.Global.$holdTab,Router = _config.Global.Router;
  if (Router.CONFIG.APP.holdTabbar === false) {//没有开启不必处理
    return false;
  }
  var tabbarList = [];
  if (__uniConfig.tabBar && __uniConfig.tabBar.list) {//有tabbar才触发
    tabbarList = __uniConfig.tabBar.list;
  } else {
    return false;
  }
  for (var i = 0; i < tabbarList.length; i++) {var
    pagePath = tabbarList[i].pagePath;
    if (pagePath == "".concat(path, ".html") || "/".concat(pagePath) == "".concat(path, ".html")) {//在当前tabbar下
      return $holdTab.showHoldTab();
    }
  }
  if ($holdTab.isVisible === true) {
    return $holdTab.hideHoldTab();
  }
};exports.pageNavFinish = pageNavFinish;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 39:
/*!******************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/appletsRouter/hooks.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.appletsTransitionTo = exports.triggerLifeCycle = exports.appletsProxyIndexHook = exports.proxyLaunchHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _config = __webpack_require__(/*! ../helpers/config */ 25);
var _util = __webpack_require__(/*! ./util */ 34);
var _appletsNav = __webpack_require__(/*! ./appletsNav */ 40);
var _util2 = __webpack_require__(/*! ../helpers/util */ 24);
var _warn = __webpack_require__(/*! ../helpers/warn */ 27);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {Boolean} callHome // 是否触发首页的生命周期
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * this 为当前 page 对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var callwaitHooks = function callwaitHooks(callHome) {var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var variation, appVue, indexVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _loop, _key;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              variation = []; //存储一下在uni-app上的变异生命钩子  奇葩的要死
              appVue = _config.uniAppHook.appVue, indexVue = _config.uniAppHook.indexVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;_context.next = 5;return (
                onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args));case 5: //确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); //onshow 不保证异步 直接确保执行最后一个
              if (callHome) {//触发首页生命周期
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {//只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }
              if (onLaunch.isHijack) {//还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }
              if (onShow.isHijack) {//继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              }_loop = function _loop(
              _key) {//还原 首页下的生命钩子
                var item = waitHooks[_key];
                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {//变异方法
                    variation.push({ key: _key, fun: item.fun[0] });
                  } else {
                    var indeHooks = indexVue[_key];
                    //修复 https://github.com/SilurianYang/uni-simple-router/issues/76
                    setTimeout(function () {//异步延迟还原 不然 uni-app 给给触发了
                      indeHooks.splice(indeHooks.length - 1, 1, item.fun[0]);
                    }, 50);
                  }
                }};for (_key in waitHooks) {_loop(_key);
              }
              resolve(variation);case 12:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 还原剩下的奇葩生命钩子
    * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
    */
var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i++) {var _variation$i =
    variation[i],key = _variation$i.key,fun = _variation$i.fun;
    var indeHooks = _config.uniAppHook.indexVue[key];
    indeHooks.splice(indeHooks.length - 1, 1, fun);
  }
};
/**
    * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
    * 
    * this 为当前 page 对象
    */
var proxyLaunchHook = function proxyLaunchHook() {var _this2 = this;var _this$$options =



  this.$options,onLaunch = _this$$options.onLaunch,onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; //缓存 当前app.vue组件对象
  if (onLaunch.length > 1) {//确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); //替换uni-app自带的生命周期
  }
  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;
      if (_config.uniAppHook.pageReady) {//因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); //替换替换 都替换
  }
};
/**
    * 把指定页面的生命钩子函数保存并替换
    * this 为当前 page 对象
    */exports.proxyLaunchHook = proxyLaunchHook;
var appletsProxyIndexHook = function appletsProxyIndexHook(Router) {var
  needHooks = _config.uniAppHook.needHooks,waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;
  for (var i = 0; i < needHooks.length; i++) {
    var key = needHooks[i];
    if (options[key] != null) {//只劫持开发者声明的生命周期
      var length = options[key].length;
      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); //把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
      whObject.isHijack = true;
    }
  }
  triggerLifeCycle.call(this, Router); //接着 主动我们触发导航守卫
};

/**
    * 主动触发导航守卫
    * @param {Object} Router 当前路由对象
    * 
    */exports.appletsProxyIndexHook = appletsProxyIndexHook;
var triggerLifeCycle = function triggerLifeCycle(Router) {var _this3 = this;
  var topPage = getCurrentPages()[0];
  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }var _getPageVmOrMp =
  (0, _util.getPageVmOrMp)(topPage, false),query = _getPageVmOrMp.query,page = _getPageVmOrMp.page;
  appletsTransitionTo.call(Router, { path: page.route, query: query }, 'push', /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(finalRoute, fnType) {var variation;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              variation = [];if (!(
              "/".concat(page.route) == finalRoute.route.path)) {_context2.next = 7;break;} //在首页不动的情况下
              _config.uniAppHook.pageReady = true; //标致着路由已经就绪 可能准备起飞
              _context2.next = 5;return callwaitHooks.call(_this3, true);case 5:_context2.next = 12;break;case 7:_context2.next = 9;return (

                callwaitHooks.call(_this3, false));case 9:variation = _context2.sent;_context2.next = 12;return (
                (0, _appletsNav.appletsUniPushTo)(finalRoute, fnType));case 12:

              _config.uniAppHook.pageReady = true; //标致着路由已经就绪 可能准备起飞
              callVariationHooks(variation);case 14:case "end":return _context2.stop();}}}, _callee2);}));return function (_x2, _x3) {return _ref2.apply(this, arguments);};}());

};
/**
    * 核心方法 处理一系列的跳转配置
    * @param {Object} rule 当前跳转规则
    * @param {Object} fnType 跳转页面的类型方法
    * @param {Object} navCB:? 回调函数
    * 
    * this 为当前 Router 对象
    * 
    */exports.triggerLifeCycle = triggerLifeCycle;
var appletsTransitionTo = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(rule, fnType, navCB) {var finalRoute, _from, _to, beforeResult, enterResult;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
              this.lifeCycle["routerbeforeHooks"][0].call(this));case 2: //触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); //获得到最终的 route 对象
            _from = (0, _util.formatFrom)(this.CONFIG.routes); //先根据跳转类型获取 from 数据
            _to = (0, _util.formatTo)(finalRoute); //再根据跳转类型获取 to 数据
            _context3.next = 7;return beforeHooks.call(this, _from, _to);case 7:beforeResult = _context3.sent;_context3.prev = 8;_context3.next = 11;return (

              isNext.call(this, beforeResult, fnType, navCB));case 11:_context3.next = 13;return (
              beforeEnterHooks.call(this, finalRoute, _from, _to));case 13:enterResult = _context3.sent;_context3.next = 16;return (
              isNext.call(this, enterResult, fnType, navCB));case 16:_context3.next = 21;break;case 18:_context3.prev = 18;_context3.t0 = _context3["catch"](8);return _context3.abrupt("return",

            false);case 21:

            navCB && navCB.call(this, finalRoute, fnType); //执行当前回调生命周期
            afterEachHooks.call(this, _from, _to);_context3.next = 25;return (
              this.lifeCycle["routerAfterHooks"][0].call(this));case 25:case "end":return _context3.stop();}}}, _callee3, this, [[8, 18]]);}));return function appletsTransitionTo(_x4, _x5, _x6) {return _ref3.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                                               * 触发全局beforeHooks 生命钩子
                                                                                                                                                                                                                                               * @param {Object} _from // from  参数
                                                                                                                                                                                                                                               * @param {Object} _to  // to 参数
                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                               * this 为当前 Router 对象
                                                                                                                                                                                                                                               */exports.appletsTransitionTo = appletsTransitionTo;
var beforeHooks = function beforeHooks(_from, _to) {var _this4 = this;
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve) {var beforeHooks;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              beforeHooks = _this4.lifeCycle["beforeHooks"][0];if (!(
              beforeHooks == null)) {_context4.next = 3;break;}return _context4.abrupt("return",
              resolve());case 3:_context4.next = 5;return (

                beforeHooks.call(_this4, _to, _from, resolve));case 5:case "end":return _context4.stop();}}}, _callee4);}));return function (_x7) {return _ref4.apply(this, arguments);};}());

};
/**
    * 触发全局afterEachHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    * 
    * this 为当前 Router 对象
    */
var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle["afterHooks"][0];
  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
    * 触发全局 beforeEnter 生命钩子
    * @param {Object} finalRoute 	// 当前格式化后的路由参数
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    * 
    * this 为当前 Router 对象
    */
var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {var _this5 = this;
  return new Promise( /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(resolve) {var beforeEnter;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
              beforeEnter = finalRoute.route.beforeEnter;if (!(
              beforeEnter == null || beforeEnter.constructor !== Function)) {_context5.next = 3;break;}return _context5.abrupt("return",
              resolve());case 3:_context5.next = 5;return (

                beforeEnter.call(_this5, _to, _from, resolve));case 5:case "end":return _context5.stop();}}}, _callee5);}));return function (_x8) {return _ref5.apply(this, arguments);};}());

};

/**
    * 验证当前 next() 管道函数是否支持下一步
    * 
    * @param {Object} Intercept 拦截到的新路由规则
    * @param {Object} fnType 跳转页面的类型方法 原始的
    * @param {Object} navCB 回调函数 原始的
    * 
    * this 为当前 Router 对象
    * 
    */
var isNext = function isNext(Intercept, fnType, navCB) {var _this6 = this;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {//什么也不做 直接执行下一个钩子
      return resolve();
    }
    if (Intercept === false) {//路由中断
      return reject('路由终止');
    }
    if (Intercept.constructor === String) {//说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject(1);
      return appletsTransitionTo.call(_this6, Intercept, fnType, navCB);
    }
    if (Intercept.constructor === Object) {//有一系列的配置 包括页面切换动画什么的
      reject(1);
      return appletsTransitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB);
    }
  });
};

/***/ }),

/***/ 4:
/*!***********************************!*\
  !*** D:/uni/uni_phone/pages.json ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!***********************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/appletsRouter/appletsNav.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.appletsUniPushTo = void 0;
var _config = __webpack_require__(/*! ../helpers/config */ 25);
var _util = __webpack_require__(/*! ../helpers/util */ 24);


/**
                                         * @param {Object} finalRoute 格式化后的路由跳转规则
                                         * @param {Object} NAVTYPE 需要调用的跳转方法
                                         */
var appletsUniPushTo = function appletsUniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));
    var url = finalRoute.uniRoute.url;
    uni[_config.methods[NAVTYPE]]({
      url: url + query,
      complete: function complete() {
        resolve(url);
      } });

  });
};exports.appletsUniPushTo = appletsUniPushTo;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 41:
/*!**************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/patch/app-patch.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.appMount = void 0; /**
                                                                                                       * 截止 1.3.5 版本 不做任何操作
                                                                                                       * @param {element} el dom节点 
                                                                                                       */
var appMount = function appMount(Vim, el) {
  Vim.$mount();
};exports.appMount = appMount;

/***/ }),

/***/ 42:
/*!*************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/helpers/mixins.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 25);
var _init = __webpack_require__(/*! ../vueRouter/init */ 43);
var _init2 = __webpack_require__(/*! ../appRouter/init */ 44);
var _init3 = __webpack_require__(/*! ../appletsRouter/init */ 50);
var _util = __webpack_require__(/*! ../helpers/util */ 24);
var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 37);
var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 39);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * 获取一些需要在各个平台混入的事件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * @param {Object} Router 当前原始路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */
var getMixins = function getMixins(Router) {
  return {
    H5: {
      beforeCreate: function beforeCreate() {
        if (this.$options.router) {
          (0, _init.init)(Router.$root, this.$options.router, this);
        }
      } },

    APP: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; //标志已经触发了 onLaunch 事件
        _init2.appInit.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        //第一个页面 拦截所有生命周期
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {
          _config.uniAppHook.onLaunched = false;
          _hooks.proxyIndexHook.call(this, Router.$root);
        }
        (0, _init2.removeBackPressEvent)(this.$mp.page, this.$options); //移除页面的onBackPress事件
      },
      onBackPress: function onBackPress() {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
        return _init2.pageIsHeadBack.call(Router.$root, this.$mp.page, this.$options, args);
      } },

    APPLETS: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; //标志已经触发了 onLaunch 事件
        _init3.appletsInit.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {//必须是第一个页面
          _config.uniAppHook.onLaunched = false;
          _hooks2.appletsProxyIndexHook.call(this, Router.$root);
        }
      } } };


};

var initMixins = function initMixins(Vue, Router) {
  Vue.mixin(_objectSpread({},
  getMixins(Router)[(0, _util.appPlatform)(true)]));

};var _default =

initMixins;exports.default = _default;

/***/ }),

/***/ 426:
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 427)
var ieee754 = __webpack_require__(/*! ieee754 */ 428)
var isArray = __webpack_require__(/*! isarray */ 429)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 427:
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 428:
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 429:
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 43:
/*!*************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/vueRouter/init.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.init = void 0;var _concat = __webpack_require__(/*! ./concat.js */ 31);
var _util = __webpack_require__(/*! ./util.js */ 28);
var _warn = __webpack_require__(/*! ../helpers/warn.js */ 27);
var _proxy = __webpack_require__(/*! ./proxy/proxy.js */ 30);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 重写掉H5端 uni-app原始存在的bug
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Object} Router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
var rewriteUniFun = function rewriteUniFun(Router) {
  if (Router.CONFIG.h5.rewriteFun === false) {//不需要重写
    return false;
  }
  uni.reLaunch = function (_ref)

  {var url = _ref.url;
    if (url === '/') {
      (0, _warn.warn)("H5\u7AEF uni.reLaunch('/')\u65F6 \u9ED8\u8BA4\u88AB\u91CD\u5199\u4E86! \u4F60\u53EF\u4EE5\u4F7F\u7528 this.$Router.replaceAll() \u6216\u8005 uni.reLaunch('/'?xxx)");
      if (history.length > 1) {//只有在有历史记录的时候才返回  不然直接返回首页
        return Router.back();
      }
      return Router.replaceAll('/');
    }
    var path = url.match(/^[^?]+|(\/)/)[0];
    try {
      var query = {};
      url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        query[v] = decodeURIComponent(k);
        return k + '=' + v;
      });
      Router.replaceAll({
        path: path,
        query: query });

    } catch (e) {
      (0, _warn.err)("".concat(url, "\u89E3\u6790\u5931\u8D25\u4E86....  \u8BD5\u8BD5 this.$Router.replaceAll() \u5427"));
    }
  };
  uni.navigateBack = function (delta) {
    var backLayer = delta;
    if (delta.constructor === Object) {//这种可能就只是uni-app自带的返回按钮,还有种可能就是开发者另类传递的
      backLayer = 1;
    }
    Router.back(backLayer, delta);
  };
};
/**
    * 拦截并注册vueRouter中的生命钩子，路由表解析
    * @param {Object} Router 
    * @param {vueRouter} vueRouter 
    * @param {VueComponent} vueVim
    */
var init = function init(Router, vueRouter, vueVim) {
  var CONFIG = Router.CONFIG.h5;
  vueRouter.afterHooks = (0, _proxy.proxyEachHooks)(Router, 'afterHooks', _concat.afterHooks);
  vueRouter.beforeHooks = (0, _proxy.proxyEachHooks)(Router, 'beforeHooks', _concat.beforeHooks);
  var objVueRoutes = (0, _util.fromatRoutes)(vueRouter.options.routes, false, {}); //返回一个格式化好的routes 键值对的形式
  var objSelfRoutes = (0, _util.fromatRoutes)(Router.CONFIG.routes, true, CONFIG);
  Router.vueRoutes = objVueRoutes; //挂载vue-routes到当前的路由下
  Router.selfRoutes = _objectSpread({}, Router.selfRoutes || {}, {},
  objSelfRoutes);
  //挂载self-routes到当前路由下
  Router.$route = vueRouter; //挂载vue-router到$route
  rewriteUniFun(Router); //重新掉uniapp上的一些有异常的方法
  (0, _concat.registerRouter)(Router, vueRouter, CONFIG.vueRouterDev);
};exports.init = init;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 430:
/*!*********************************************************!*\
  !*** D:/uni/uni_phone/node_modules/js-base64/base64.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 *  base64.js
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
;(function (global, factory) {
   true ?
  module.exports = factory(global) :
  undefined;
})(
typeof self !== 'undefined' ? self :
typeof window !== 'undefined' ? window :
typeof global !== 'undefined' ? global :
this,
function (global) {
  'use strict';
  // existing version for noConflict()
  global = global || {};
  var _Base64 = global.Base64;
  var version = "2.5.2";
  // if node.js and NOT React Native, we use Buffer
  var buffer;
  if ( true && module.exports) {
    try {
      buffer = eval("require('buffer').Buffer");
    } catch (err) {
      buffer = undefined;
    }
  }
  // constants
  var b64chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var b64tab = function (bin) {
    var t = {};
    for (var i = 0, l = bin.length; i < l; i++) {t[bin.charAt(i)] = i;}
    return t;
  }(b64chars);
  var fromCharCode = String.fromCharCode;
  // encoder stuff
  var cb_utob = function cb_utob(c) {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 0x80 ? c :
      cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) +
      fromCharCode(0x80 | cc & 0x3f) :
      fromCharCode(0xe0 | cc >>> 12 & 0x0f) +
      fromCharCode(0x80 | cc >>> 6 & 0x3f) +
      fromCharCode(0x80 | cc & 0x3f);
    } else {
      var cc = 0x10000 +
      (c.charCodeAt(0) - 0xD800) * 0x400 + (
      c.charCodeAt(1) - 0xDC00);
      return fromCharCode(0xf0 | cc >>> 18 & 0x07) +
      fromCharCode(0x80 | cc >>> 12 & 0x3f) +
      fromCharCode(0x80 | cc >>> 6 & 0x3f) +
      fromCharCode(0x80 | cc & 0x3f);
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = function utob(u) {
    return u.replace(re_utob, cb_utob);
  };
  var cb_encode = function cb_encode(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
    ord = ccc.charCodeAt(0) << 16 |
    (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (
    ccc.length > 2 ? ccc.charCodeAt(2) : 0),
    chars = [
    b64chars.charAt(ord >>> 18),
    b64chars.charAt(ord >>> 12 & 63),
    padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63),
    padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];

    return chars.join('');
  };
  var btoa = global.btoa ? function (b) {
    return global.btoa(b);
  } : function (b) {
    return b.replace(/[\s\S]{1,3}/g, cb_encode);
  };
  var _encode = function _encode(u) {
    var isUint8Array = Object.prototype.toString.call(u) === '[object Uint8Array]';
    return isUint8Array ? u.toString('base64') :
    btoa(utob(String(u)));
  };
  var encode = function encode(u, urisafe) {
    return !urisafe ?
    _encode(u) :
    _encode(String(u)).replace(/[+\/]/g, function (m0) {
      return m0 == '+' ? '-' : '_';
    }).replace(/=/g, '');
  };
  var encodeURI = function encodeURI(u) {return encode(u, true);};
  // decoder stuff
  var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
  var cb_btou = function cb_btou(cccc) {
    switch (cccc.length) {
      case 4:
        var cp = (0x07 & cccc.charCodeAt(0)) << 18 |
        (0x3f & cccc.charCodeAt(1)) << 12 |
        (0x3f & cccc.charCodeAt(2)) << 6 |
        0x3f & cccc.charCodeAt(3),
        offset = cp - 0x10000;
        return fromCharCode((offset >>> 10) + 0xD800) +
        fromCharCode((offset & 0x3FF) + 0xDC00);
      case 3:
        return fromCharCode(
        (0x0f & cccc.charCodeAt(0)) << 12 |
        (0x3f & cccc.charCodeAt(1)) << 6 |
        0x3f & cccc.charCodeAt(2));

      default:
        return fromCharCode(
        (0x1f & cccc.charCodeAt(0)) << 6 |
        0x3f & cccc.charCodeAt(1));}


  };
  var btou = function btou(b) {
    return b.replace(re_btou, cb_btou);
  };
  var cb_decode = function cb_decode(cccc) {
    var len = cccc.length,
    padlen = len % 4,
    n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (
    len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (
    len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (
    len > 3 ? b64tab[cccc.charAt(3)] : 0),
    chars = [
    fromCharCode(n >>> 16),
    fromCharCode(n >>> 8 & 0xff),
    fromCharCode(n & 0xff)];

    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join('');
  };
  var _atob = global.atob ? function (a) {
    return global.atob(a);
  } : function (a) {
    return a.replace(/\S{1,4}/g, cb_decode);
  };
  var atob = function atob(a) {
    return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
  };
  var _decode = buffer ?
  buffer.from && Uint8Array && buffer.from !== Uint8Array.from ?
  function (a) {
    return (a.constructor === buffer.constructor ?
    a : buffer.from(a, 'base64')).toString();
  } :
  function (a) {
    return (a.constructor === buffer.constructor ?
    a : new buffer(a, 'base64')).toString();
  } :
  function (a) {return btou(_atob(a));};
  var decode = function decode(a) {
    return _decode(
    String(a).replace(/[-_]/g, function (m0) {return m0 == '-' ? '+' : '/';}).
    replace(/[^A-Za-z0-9\+\/]/g, ''));

  };
  var noConflict = function noConflict() {
    var Base64 = global.Base64;
    global.Base64 = _Base64;
    return Base64;
  };
  // export Base64
  global.Base64 = {
    VERSION: version,
    atob: atob,
    btoa: btoa,
    fromBase64: decode,
    toBase64: encode,
    utob: utob,
    encode: encode,
    encodeURI: encodeURI,
    btou: btou,
    decode: decode,
    noConflict: noConflict,
    __buffer__: buffer };

  // if ES5 is available, make Base64.extendString() available
  if (typeof Object.defineProperty === 'function') {
    var noEnum = function noEnum(v) {
      return { value: v, enumerable: false, writable: true, configurable: true };
    };
    global.Base64.extendString = function () {
      Object.defineProperty(
      String.prototype, 'fromBase64', noEnum(function () {
        return decode(this);
      }));
      Object.defineProperty(
      String.prototype, 'toBase64', noEnum(function (urisafe) {
        return encode(this, urisafe);
      }));
      Object.defineProperty(
      String.prototype, 'toBase64URI', noEnum(function () {
        return encode(this, true);
      }));
    };
  }
  //
  // export Base64 to the namespace
  //
  if (global['Meteor']) {// Meteor.js
    Base64 = global.Base64;
  }
  // module.exports and AMD are mutually exclusive.
  // module.exports has precedence.
  if ( true && module.exports) {
    module.exports.Base64 = global.Base64;
  } else
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {return global.Base64;}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // that's it!
  return { Base64: global.Base64 };
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../下载/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 44:
/*!*************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/appRouter/init.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.appInit = exports.pageIsHeadBack = exports.removeBackPressEvent = exports.registerLoddingPage = exports.rewriteUniFun = exports.uniRewritePublicFun = void 0;var _hooks = __webpack_require__(/*! ./hooks */ 37);
var _config = __webpack_require__(/*! ../helpers/config */ 25);
var _util = __webpack_require__(/*! ./util */ 33);
var _uniNav = __webpack_require__(/*! ./uniNav */ 38);
var _uniHoldTabbar = _interopRequireDefault(__webpack_require__(/*! uni-hold-tabbar */ 45));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 创建底部菜单拦截
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} Router  当前路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var createdHoldTab = function createdHoldTab(Router) {var
  holdTabbarStyle = Router.CONFIG.APP.holdTabbarStyle; //获取app所有配置
  var holdTab = new _uniHoldTabbar.default({
    style: holdTabbarStyle.call(Router),
    event: {
      click: function click(index, _ref) {var pagePath = _ref.pagePath;
        _hooks.beforeTabHooks.call(Router, pagePath);
      } } });


  _config.Global.$holdTab = holdTab;
};
/**
    * uni-app 重写共用的方法
    * @param {Object} object 开发者传递的相关参数
    * @param {Object} callFun 需要执行的uni方法
    */
var uniRewritePublicFun = function uniRewritePublicFun(object, finishFun, callFun) {
  var page = (0, _util.getPages)(-2);
  var complete = object.complete; //获取到开发者传递的complete事件
  if (complete) {//有写此函数的时候
    object.complete = function (arg) {
      finishFun && finishFun('pageShow', page.route);
      complete.call(page.$vm, arg);
    };
  } else {//没有写次函数
    object.complete = function (arg) {
      finishFun && finishFun('pageShow', page.route);
    };
  }
  if (_config.Global.$holdTab.isVisible) {
    _config.Global.$holdTab.hideHoldTab(); //先隐藏底部tabbar拦截器
  }
  callFun && callFun(object);
};

/**
    * 重写掉uni-app的 uni.getLocation 和 uni.chooseLocation APi
    * @param {Boolean}  rewriteFun 是否重写方法
    */exports.uniRewritePublicFun = uniRewritePublicFun;
var rewriteUniFun = function rewriteUniFun(rewriteFun) {
  if (rewriteFun === false) {
    return false;
  }
  var oldChooseLocation = uni.chooseLocation; //打开地图选择位置
  var oldOpenLocation = uni.openLocation; //打开内置地图
  uni.chooseLocation = function (object) {
    uniRewritePublicFun(object, _uniNav.pageNavFinish, oldChooseLocation);
  };
  uni.openLocation = function (object) {
    uniRewritePublicFun(object, function () {
      var webViews = plus.webview.all();
      var webview = webViews[webViews.length - 1];
      webview.addEventListener('close', function () {
        var page = (0, _util.getPages)(-2);
        (0, _uniNav.pageNavFinish)('pageShow', page.route);
      }, false);
    }, oldOpenLocation);
  };
};

/**
    * 对当前app做一个动画页面 用来过渡首次next 等待时间过长的尴尬
    * @param {Object} Router 当前路由对象
    */exports.rewriteUniFun = rewriteUniFun;
var registerLoddingPage = function registerLoddingPage(Router) {var _Router$CONFIG$APP =
  Router.CONFIG.APP,loddingPageHook = _Router$CONFIG$APP.loddingPageHook,loddingPageStyle = _Router$CONFIG$APP.loddingPageStyle; //获取app所有配置
  var view = new plus.nativeObj.View('router-loadding', _objectSpread({
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%' },
  loddingPageStyle.call(Router)));

  loddingPageHook.call(Router, view); //触发等待页面生命周期
  view.show();
};
/**
    * 移除当前 页面上 非router 声明的 onBackPress 事件
    * @param {Object} page 当前 vue 组件对象 
    * @param {Object} options	当前page对象的 $options
    * 修复 https://github.com/SilurianYang/uni-simple-router/issues/106
    */exports.registerLoddingPage = registerLoddingPage;
var removeBackPressEvent = function removeBackPressEvent(page, options) {
  var isBack = (0, _util.assertCanBack)(page);
  if (isBack) {//可返回
    options.onBackPress = [options.onBackPress[0]]; //路由混入的都干掉
  }
};
/**
    * 判断当前页面是否需要拦截返回
    * 
    * @param {Object} page 当前 vue 组件对象 
    * @param {Object} options 当前 vue 组件对象下的$options对象
    * @param {Array} args  当前页面是点击头部返回还是底部返回
    * 修复 https://github.com/SilurianYang/uni-simple-router/issues/66
    * 
    * this 为当前 Router 对象
    */exports.removeBackPressEvent = removeBackPressEvent;
var pageIsHeadBack = function pageIsHeadBack(page, options, args) {
  if (args[0].from == 'navigateBack') {//调用api返回 
    _hooks.backApiCallHook.call(this, options, args);
    return true;
  }
  var isBack = (0, _util.assertCanBack)(page);
  if (isBack) {//可返回
    _hooks.beforeBackHooks.call(this, options, args);
    return true;
  }
  return false;
};

/**
    * 开始初始化app端路由配置
    * 
    * @param {Object} Router
    * 
    * this 为当前 page 对象
    */exports.pageIsHeadBack = pageIsHeadBack;
var appInit = function appInit(Router) {
  _hooks.proxyLaunchHook.call(this);var _Router$CONFIG$APP2 =
  Router.CONFIG.APP,holdTabbar = _Router$CONFIG$APP2.holdTabbar,rewriteFun = _Router$CONFIG$APP2.rewriteFun;
  if (holdTabbar) {
    rewriteUniFun(rewriteFun);
    createdHoldTab(Router);
  }
  registerLoddingPage(Router);
};exports.appInit = appInit;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 45:
/*!**************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-hold-tabbar/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _createdTab = __webpack_require__(/*! ./init/createdTab */ 46);
var _util = __webpack_require__(/*! ./util/util */ 49);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

HoldTabbar = /*#__PURE__*/function () {
  function HoldTabbar() {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, HoldTabbar);
    var isNext = (0, _util.assertTabbar)();
    if (!isNext) {
      return false;
    }
    config = (0, _util.mergeConfig)(config);
    this.tabbarView = (0, _createdTab.init)(config, isNext);
  }_createClass(HoldTabbar, [{ key: "hideHoldTab", value: function hideHoldTab()






    {
      this.tabbarView.hide();
    } }, { key: "showHoldTab", value: function showHoldTab()
    {
      this.tabbarView.show();
    } }, { key: "getTabbarView", get: function get() {return this.tabbarView;} }, { key: "isVisible", get: function get() {return this.tabbarView.isVisible();} }]);return HoldTabbar;}();var _default =


HoldTabbar;exports.default = _default;

/***/ }),

/***/ 46:
/*!************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-hold-tabbar/init/createdTab.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.init = void 0;var _addEvent = __webpack_require__(/*! ./addEvent */ 47);

/**
                                                                                                                                         * 通过配置信息创建指定tabbar层
                                                                                                                                         */
var createdTab = function createdTab()






{var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},id = _ref.id,style = _ref.style,beforeMount = _ref.beforeMount,mounted = _ref.mounted,event = _ref.event,registerPageHook = _ref.registerPageHook;var tabList = arguments.length > 1 ? arguments[1] : undefined;
  var tabbarView = new plus.nativeObj.View(id, style);
  var isHold = beforeMount(tabbarView, tabList);
  if (!isHold) {
    (0, _addEvent.initAddEvents)(event, tabbarView, tabList, registerPageHook);
    mounted(tabbarView, tabList);
    tabbarView.show();
    return tabbarView;
  }
};
/**
    * 初始化入口
    * @param {*} config 
    * @param {*} tabList 
    */
var init = function init(config, tabList) {
  return createdTab(config, tabList);
};exports.init = init;

/***/ }),

/***/ 47:
/*!**********************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-hold-tabbar/init/addEvent.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.initAddEvents = void 0;var _base = __webpack_require__(/*! ../config/base */ 48);
var _util = __webpack_require__(/*! ../util/util */ 49);

/**
                                      * 根据坐标获得点击的位置 并传入到开发者声明的回调函数中
                                      */
var xyTransformTo = function xyTransformTo(type, _ref, tabList, callBack, isHook) {var pageX = _ref.pageX;var
  length = tabList.length;
  var screenWidth = plus.screen.resolutionWidth;
  var single = (screenWidth / length).toFixed(4);
  var index = Math.ceil(pageX.toFixed(4) / single) - 1;
  var tab = tabList[index];var _getActiveTabPage =
  (0, _util.getActiveTabPage)(),route = _getActiveTabPage.route; //获取当前页面的路径
  if (route != tab.pagePath) {
    callBack(index, tab, function () {
      callPageHook(type, isHook, tab);
    });
  } else {
    callBack(index, tab, function () {});
    callPageHook(type, isHook, tab);
  }
};
/**
    * 执行页面生命钩子
    * @param {Object} type
    * @param {Object} isHook
    * @param {Object} tab
    */
var callPageHook = function callPageHook(type, isHook, tab) {
  if (isHook) {//如果有设置页面拦截函数 则调用
    var page = (0, _util.getActiveTabPage)(tab.pagePath);
    if (page) {
      var onTabEvent = page.$vm.$options.onTabEvent;
      onTabEvent && onTabEvent.call(page.$vm, type, tab);
    }
  }
};
/**
    * 绑定一些指定的事件
    * @param {Object} event 事假json对象
    * @param {Object} view 当前底部的tabbar遮罩层
    */
var initAddEvents = function initAddEvents(event, view, tabList, isHook) {var _loop = function _loop(
  key) {
    var callBack = event[key];
    var type = _base.eventBind[key];
    view.addEventListener(type, function (e) {
      xyTransformTo(type, e, tabList, callBack, isHook);
    });};for (var key in event) {_loop(key);
  }
};exports.initAddEvents = initAddEvents;

/***/ }),

/***/ 48:
/*!********************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-hold-tabbar/config/base.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.BaseConfig = exports.eventBind = void 0;
var eventBind = {
  dbClick: 'doubleclick',
  click: 'click',
  touchstart: 'touchstart',
  touchmove: 'touchmove',
  touchend: 'touchend' };exports.eventBind = eventBind;


var BaseConfig = {
  registerPageHook: false,
  id: 'HoldTabbar',
  style: {
    width: '100%',
    height: '50px',
    opacity: 0,
    bottom: '0' },

  event: {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {} };exports.BaseConfig = BaseConfig;

/***/ }),

/***/ 49:
/*!******************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-hold-tabbar/util/util.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getActiveTabPage = exports.assertTabbar = exports.mergeConfig = void 0;var _base = __webpack_require__(/*! ../config/base */ 48);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * 合并配置信息 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * @param {Object} config 开发者传递的配置信息
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */
var mergeConfig = function mergeConfig(config) {
  var CONFIG = {};
  for (var key in _base.BaseConfig) {
    var item = _base.BaseConfig[key];
    if (config[key] == null) {
      CONFIG[key] = item;
    } else if (config[key].constructor === Object) {
      CONFIG[key] = _objectSpread({}, item, {}, config[key]);
    } else {
      CONFIG[key] = config[key];
    }
  }
  return CONFIG;
};
/**
    * 断言当前是否有 原生tabbar
    */exports.mergeConfig = mergeConfig;
var assertTabbar = function assertTabbar() {
  if (__uniConfig.tabBar && __uniConfig.tabBar.list && __uniConfig.tabBar.list.length > 0) {
    var list = JSON.parse(JSON.stringify(__uniConfig.tabBar.list));
    for (var i = 0; i < list.length; i++) {
      list[i].pagePath = list[i].pagePath.replace(/\.html$/, '');
    }
    return list;
  } else {
    console.error('当前没有uni-app自带的原生tabbar 无须进行拦截  告辞!!');
    return false;
  }
};
/**
    * 获取当前底部tabbar页面对象
    * @param {Object} path 当前点击的页面路径
    */exports.assertTabbar = assertTabbar;
var getActiveTabPage = function getActiveTabPage(path) {
  var pages = getCurrentPages();
  if (path == null) {
    return pages[0];
  }
  for (var i = 0; i < pages.length; i++) {
    var item = pages[i];
    if (item.route === path) {
      return item;
    }
  }
  return false;
};exports.getActiveTabPage = getActiveTabPage;

/***/ }),

/***/ 50:
/*!*****************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/uni-simple-router/appletsRouter/init.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.appletsInit = void 0;var _hooks = __webpack_require__(/*! ./hooks */ 39);

/**
                                                                                                                                          * 开始初始化app端路由配置
                                                                                                                                          * 
                                                                                                                                          * @param {Object} Router 	当前Router对象
                                                                                                                                          * 
                                                                                                                                          * this 为当前 page 对象
                                                                                                                                          */
var appletsInit = function appletsInit(Router) {
  _hooks.proxyLaunchHook.call(this);
};exports.appletsInit = appletsInit;

/***/ }),

/***/ 501:
/*!******************************************************!*\
  !*** D:/uni/uni_phone/components/uni-icons/icons.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 51:
/*!***********************************************!*\
  !*** D:/uni/uni_phone/util/publicFunction.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.GetQueryString = GetQueryString;exports.getTime = getTime;exports.bottomScrollbar = bottomScrollbar;exports.setUrlDelCode = setUrlDelCode;exports.checkMobile = checkMobile;exports.weChatPayment = weChatPayment;exports.formatDate = void 0; // 获取商户编号 获取 ?name='' 的值
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r;
  // console.log(window.location.search)
  if (window.location.search) {
    r = window.location.search.substr(1).match(reg);
  } else {
    var a = window.location.href;
    if (a.indexOf('query') > -1) {
      a = decodeA(a);
      console.log(JSON.stringify(a) + '0000');
      if (JSON.stringify(a) != '{}') return a[name];
    } else {
      var b = a.substr(a.indexOf(name), a.length - 1);
      r = b.match(reg);
      if (r != null) return unescape(r[2]);
    }
  }
  return null;
}

function decodeA(a) {
  if (a.indexOf('query') > -1) {
    var queryObj = a.substr(a.indexOf('query') + 6, a.length - 1);
    // console.log(queryObj)
    try {
      var queryObjP = JSON.parse(queryObj);
      // console.log(queryObjP)
      if (typeof queryObjP == 'object') {
        return queryObjP;
      }
    } catch (e) {
      a = decodeURIComponent(a);
      return decodeA(a);
    }

  } else {
    return a;
  }
}

function getTime(time, bool, dataBool) {
  var z = '- -';
  var date;
  if (time) {
    // time.replace(/-/g,"/")
    date = new Date(time);
  } else {
    date = new Date();
  }
  if (!isNaN(date) && date !== 0) {

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? '0' + d : d;
    var h = date.getHours();
    h = h < 10 ? '0' + h : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    if (bool) {
      z = y + '-' + m + '-' + d;
    } else if (dataBool) {
      z = h + ':' + minute + ':' + second;
    } else {
      z = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
  }

  return z;
}

function bottomScrollbar(_this, Dom, faDom) {var bottom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;var top = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;var _uni$getSystemInfoSyn =



  uni.getSystemInfoSync(),windowWidth = _uni$getSystemInfoSyn.windowWidth,windowHeight = _uni$getSystemInfoSyn.windowHeight;
  var faDomHeight = '';
  var faDomInfo = uni.createSelectorQuery().select(faDom);
  faDomInfo.boundingClientRect(function (data) {
    console.log(data.height); // 获取元素宽度
    faDomHeight = data.height;
  }).exec();
  var a = windowHeight - faDomHeight - top - 10;

  if (a <= 0) {
    uni.createSelectorQuery().select(faDom).boundingClientRect(function (data) {});
    uni.createSelectorQuery().select(Dom).boundingClientRect(function (data) {});
    // $(Dom).css('transform', `translateY(0px)`)
    // $(faDom).css({
    // 	'marginBottom': 60 + 'px'
    // })
  } else {
      // $('.btnBottom').css('transform', `translateY(${a}px)`)
      // $(Dom).css({
      // 	'position': `absolute`,
      // 	'bottom': bottom + 'px',
      // 	'width': `96%`
      // })
    }
}

function setUrlDelCode() {
  var url = document.location.toString();
  if (!url) {
    return url;
  }
  if (url.indexOf('?') < 0) {
    return url;
  }
  var arrUrl = url.split("?");
  var para = arrUrl[1];
  if (para.indexOf('&')) {
    para = para.split("&"); //获取url的参数
  }
  para.forEach(function (D, index) {//删除原本url上的code
    if (D.indexOf('code') > -1) {
      para.splice(index, 1);
    }
  });
  para = para.join(',');
  // let currentUrl = arrUrl[0] + '?' + para
  return arrUrl[0] + '?' + para;
}

// export function setImg(img){
// 	return process.env.VUE_APP_PREFIX + img
// }

function checkMobile(s) {
  var regu = /^1[3456789]\d{9}$/;
  var re = new RegExp(regu);
  if (re.test(s)) {
    return true;
  } else {
    return false;
  }
}

function weChatPayment(that, Data, bool) {
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }

  function onBridgeReady() {
    WeixinJSBridge.invoke(
    "getBrandWCPayRequest", {
      appId: Data.appId,
      timeStamp: Data.timeStamp,
      nonceStr: Data.nonceStr,
      package: Data.package,
      signType: Data.signType,
      paySign: Data.paySign },

    function (res) {
      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      if (res.err_msg === "get_brand_wcpay_request:ok") {
        if (bool) {
          that.$router.push({
            path: "/home/index" });

        } else {
          that.$router.push({
            path: "/home/index" });

        }

        // that.$router.push('/shoppingMall/order/OrderPaySuccess')
      } else {
        //失败
        that.$toast.fail("支付失败");

        setTimeout(function () {
          if (bool) {
            that.$router.push({
              path: "/shoppingMall/order/orderInfo?order_id=" +
              that.OrderInfo.SID });

          } else {
            that.$router.push({
              path: "/home/myOrder",
              query: {
                id: "1" } },

            2000);
          }

        });
      }
    });

  }
}

var formatDate = function formatDate(dateObj) {var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Y-m-d H:i';var empty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  var months = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月'];

  var lz = function lz(n) {
    var num = n.toString();
    if (num.length === 1) return "0".concat(num);
    return num;
  };
  var t = dateObj;
  // typeof dateObj !== 'string'是为了判断万一传过来的是y-m-d h:i:s格式，会直接执行最后一个else if，格式化为日期格式
  if (dateObj === null || Number.isNaN(dateObj) && typeof dateObj !== 'string') {
    if (typeof empty === 'string') return empty;
    t = new Date();
  } else if (typeof dateObj === 'number') {
    t = new Date(dateObj * 1000);
  } else if (typeof dateObj === 'string') {
    t = new Date(dateObj.replace(/-/g, '/'));
  }
  if (!(t instanceof Date)) {
    throw new Error('被处理的只能是Date对象');
  }
  if (Number.isNaN(t.getTime())) {
    throw new Error('非法日期对象');
  }
  var date = t.getDate();
  var year = t.getFullYear();
  var hours = t.getHours();
  var day = t.getDay();
  var dayName = days[day];
  var min = t.getMinutes();
  var sec = t.getSeconds();
  var month = t.getMonth();
  var am = hours < 12 ? 'am' : 'pm';
  var ms = t.getTime() % 1000;
  var hours12 = hours % 12;
  hours12 = hours12 || 12;
  var fd = new Date(t.getFullYear(), 0, 1);
  var dayOfYear = Math.round((t - fd) / 8.64e7);
  var weekNum = Math.ceil(((t - fd) / 8.64e7 + fd.getDay() - 1) / 7);
  var a = {
    d: lz(date),
    D: dayName.substr(0, 3),
    l: dayName,
    w: day,
    j: date,
    z: dayOfYear,
    W: weekNum,
    M: months[month].substr(0, 3),
    F: months[month],
    Y: year,
    a: am,
    A: am.toUpperCase(),
    y: year.toString().substr(2, 2),
    c: t.toISOString(),
    m: lz(month + 1),
    U: Math.round(t / 1000),
    g: hours12,
    G: lz(hours12),
    h: hours,
    H: lz(hours),
    i: lz(min),
    s: lz(sec),
    e: ms };

  var v = [];
  Object.keys(a).forEach(function (k) {
    v.push("(\\\\)?".concat(k));
  });
  return fmt.replace(new RegExp(v.join('|'), 'g'), function (k) {
    if (a[k]) return a[k];
    return k.replace('\\', '');
  });
};exports.formatDate = formatDate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!****************************************!*\
  !*** D:/uni/uni_phone/config/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // let token = ''
var _default = {
  isMock: true,
  BusinNoMy: uni.getStorageSync('BusinNo'),
  codeMy: 'code' + uni.getStorageSync('BusinNo'),
  url:  true ? "http://192.168.0.106:8001/" : undefined,
  // url:process.env.NODE_ENV ==='development'? 'http://dingtalk.bak365.cn/WeixinNew/':'../',
  // process.env.NODE_ENV === "development" ? '/' : '../'
  VUE_APP_PREFIX: '../',
  homeRoute: '/bind',
  BASE_URL_OnLine: 'http://dingtalk.bak365.cn/WeixinNew/Dist/'
  // BASE_URL: 'http://192.168.0.101:8001'
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 53:
/*!********************************************!*\
  !*** D:/uni/uni_phone/config/vueFilter.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _index = _interopRequireDefault(__webpack_require__(/*! @/config/index */ 52));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.filter('setName', function (val) {
  // + String(val).slice(-1)
  return String(val).slice(0, 1) + '**';
});

// 剪切0-6
// <span>{{String(Balance).length>6?'+':''}}</span>
_vue.default.filter('spliceNum', function (num) {
  var newNum = String(num);
  if (newNum.length > 6) {
    return newNum.slice(0, 6) + '+';
  } else {
    return num;
  }
});

_vue.default.filter('orderState', function (num) {
  if (num === '') {
    return '已作废';
  }
  num = Number(num);
  switch (num) {
    case -3:
      return '已取消';
    case -1:
      return '待付款';
    case 0:
      return '已付款';
    case 1:
      return '生产中';
    case 2:
      return '已送货';
    case 3:
      return '已提货';
    case 4:
      return '已作废';
    default:'已作废';}

});
_vue.default.filter('orderType', function (num) {
  // 2普通商品类型
  num = Number(num);
  switch (num) {
    case 1:
      return '充值';
    case 3:
      return '电子券';
    case 4:
      return '积分兑换';
    case 5:
      return '活动';
    default:'';}

});

_vue.default.filter('RefundState', function (num) {
  if (!num) {
    return '--';
  }
  num = Number(num);
  switch (num) {
    case 1:
      return '退款';
    case 2:
      return '退款中';
    case 3:
      return '退款成功';
    case 4:
      return '退款失败';}

});

_vue.default.filter('numSet', function (num) {
  if (!num) {
    return num;
  }
  return parseFloat(Number(num).toFixed(2));
});

_vue.default.filter('setMoney', function (val) {
  val = Number(val);
  if (val > 10000) {
    var thousand = (val / 10000).toFixed(1);
    return thousand + '万+';
  } else {
    return val;
  }
});
_vue.default.filter('setImgPrex', function (val) {
  if (val) {
    return _index.default.VUE_APP_PREFIX + val;
  } else {
    return '';
  }
});

_vue.default.filter('payTypeOrder', function (val) {
  var num = Number(val);
  if (num) {
    return num === 1 ? '微卡支付' : num === 2 ? '微信支付' : '货到付款';
  } else {
    return '';
  }
});

_vue.default.filter('deliveryType', function (val) {
  var num = Number(val);
  if (num) {
    return num === 1 ? '到店取餐' : num === 2 ? '外卖配送' : '物流配送';
  } else {
    return '';
  }
});

_vue.default.filter('setSex', function (val) {
  if (!val) {
    return '';
  }
  var num = Number(val);
  if (num) {
    return num == 0 ? '先生' : '女士';
  } else {
    return num;
  }
});
_vue.default.filter('setBuyTime', function (val) {
  var str = val;
  if (val) {
    str = val.split(",").join("至");
  }
  return str;
});

/***/ }),

/***/ 54:
/*!*************************************************!*\
  !*** D:/uni/uni_phone/assets/icon/iconfont.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 544:
/*!************************************************************!*\
  !*** D:/uni/uni_phone/components/a-good-lineBox/public.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Mixin = void 0;var Mixin = {
  props: {
    itemData: {
      type: Object,
      default: function _default() {
        return {};
      } },

    imgHeight: {
      type: String,
      default: '80px' },

    isShoppingCard: {
      type: Boolean,
      default: false },

    isOrder: {
      type: Boolean,
      default: false },

    isIntegral: {
      type: Boolean,
      default: false },

    seckill: {
      type: Boolean,
      default: false } },


  data: function data() {
    return {
      list: [] };

  },
  methods: {
    goodBoxCoupon: function goodBoxCoupon(val) {
      this.$emit('goodBox', val);
      // this.$router.push({path: '/shoppingMall/couponPage/' + val.SID})
    },
    addCart: function addCart() {
      // 加入购物车
    } } };exports.Mixin = Mixin;

/***/ }),

/***/ 625:
/*!******************************************************************!*\
  !*** D:/uni/uni_phone/components/uni-swipe-action-item/mpwxs.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  data: function data() {
    return {
      position: [],
      button: [] };

  },
  computed: {
    pos: function pos() {
      return JSON.stringify(this.position);
    },
    btn: function btn() {
      return JSON.stringify(this.button);
    } },

  watch: {
    show: function show(newVal) {
      if (this.autoClose) return;
      var valueObj = this.position[0];
      if (!valueObj) {
        this.init();
        return;
      }
      valueObj.show = newVal;
      this.$set(this.position, 0, valueObj);
    } },

  created: function created() {
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.init();

  },
  beforeDestroy: function beforeDestroy() {var _this = this;
    this.swipeaction.children.forEach(function (item, index) {
      if (item === _this) {
        _this.swipeaction.children.splice(index, 1);
      }
    });
  },
  methods: {
    init: function init() {var _this2 = this;

      setTimeout(function () {
        _this2.getSize();
        _this2.getButtonSize();
      }, 50);
    },
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      var valueObj = this.position[0];
      if (valueObj.show !== e.open) {
        valueObj.show = e.open;
        this.$set(this.position, 0, valueObj);
      }
    },
    onClick: function onClick(index, item) {
      this.$emit('click', {
        content: item,
        index: index });

    },
    getSize: function getSize() {var _this3 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.selector-query-hock').
      boundingClientRect(function (data) {
        if (_this3.autoClose) {
          data[0].show = false;
        } else {
          data[0].show = _this3.show;
        }
        _this3.position = data;
      }).
      exec();
    },
    getButtonSize: function getButtonSize() {var _this4 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.button-hock').
      boundingClientRect(function (data) {
        _this4.button = data;
      }).
      exec();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 635:
/*!***************************************************!*\
  !*** D:/uni/uni_phone/util/qqmap-wx-jssdk.min.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var ERROR_CONF = { KEY_ERR: 311, KEY_ERR_MSG: 'key格式错误', PARAM_ERR: 310, PARAM_ERR_MSG: '请求参数信息有误', SYSTEM_ERR: 600, SYSTEM_ERR_MSG: '系统错误', WX_ERR_CODE: 1000, WX_OK_CODE: 200 };var BASE_URL = 'https://apis.map.qq.com/ws/';var URL_SEARCH = BASE_URL + 'place/v1/search';var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';var URL_CITY_LIST = BASE_URL + 'district/v1/list';var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';var URL_DISTANCE = BASE_URL + 'distance/v1/';var URL_DIRECTION = BASE_URL + 'direction/v1/';var MODE = { driving: 'driving', transit: 'transit' };var EARTH_RADIUS = 6378136.49;var Utils = { safeAdd: function safeAdd(x, y) {var lsw = (x & 0xffff) + (y & 0xffff);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return msw << 16 | lsw & 0xffff;}, bitRotateLeft: function bitRotateLeft(num, cnt) {return num << cnt | num >>> 32 - cnt;}, md5cmn: function md5cmn(q, a, b, x, s, t) {return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);}, md5ff: function md5ff(a, b, c, d, x, s, t) {return this.md5cmn(b & c | ~b & d, a, b, x, s, t);}, md5gg: function md5gg(a, b, c, d, x, s, t) {return this.md5cmn(b & d | c & ~d, a, b, x, s, t);}, md5hh: function md5hh(a, b, c, d, x, s, t) {return this.md5cmn(b ^ c ^ d, a, b, x, s, t);}, md5ii: function md5ii(a, b, c, d, x, s, t) {return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);}, binlMD5: function binlMD5(x, len) {x[len >> 5] |= 0x80 << len % 32;x[(len + 64 >>> 9 << 4) + 14] = len;var i;var olda;var oldb;var oldc;var oldd;var a = 1732584193;var b = -271733879;var c = -1732584194;var d = 271733878;for (i = 0; i < x.length; i += 16) {olda = a;oldb = b;oldc = c;oldd = d;a = this.md5ff(a, b, c, d, x[i], 7, -680876936);d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);b = this.md5gg(b, c, d, a, x[i], 20, -373897302);a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);d = this.md5hh(d, a, b, c, x[i], 11, -358537222);c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);a = this.md5ii(a, b, c, d, x[i], 6, -198630844);d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);a = this.safeAdd(a, olda);b = this.safeAdd(b, oldb);c = this.safeAdd(c, oldc);d = this.safeAdd(d, oldd);}return [a, b, c, d];}, binl2rstr: function binl2rstr(input) {var i;var output = '';var length32 = input.length * 32;for (i = 0; i < length32; i += 8) {output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);}return output;}, rstr2binl: function rstr2binl(input) {var i;var output = [];output[(input.length >> 2) - 1] = undefined;for (i = 0; i < output.length; i += 1) {output[i] = 0;}var length8 = input.length * 8;for (i = 0; i < length8; i += 8) {output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;}return output;}, rstrMD5: function rstrMD5(s) {return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));}, rstrHMACMD5: function rstrHMACMD5(key, data) {var i;var bkey = this.rstr2binl(key);var ipad = [];var opad = [];var hash;ipad[15] = opad[15] = undefined;if (bkey.length > 16) {bkey = this.binlMD5(bkey, key.length * 8);}for (i = 0; i < 16; i += 1) {ipad[i] = bkey[i] ^ 0x36363636;opad[i] = bkey[i] ^ 0x5c5c5c5c;}hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));}, rstr2hex: function rstr2hex(input) {var hexTab = '0123456789abcdef';var output = '';var x;var i;for (i = 0; i < input.length; i += 1) {x = input.charCodeAt(i);output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);}return output;}, str2rstrUTF8: function str2rstrUTF8(input) {return unescape(encodeURIComponent(input));}, rawMD5: function rawMD5(s) {return this.rstrMD5(this.str2rstrUTF8(s));}, hexMD5: function hexMD5(s) {return this.rstr2hex(this.rawMD5(s));}, rawHMACMD5: function rawHMACMD5(k, d) {return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));}, hexHMACMD5: function hexHMACMD5(k, d) {return this.rstr2hex(this.rawHMACMD5(k, d));}, md5: function md5(string, key, raw) {if (!key) {if (!raw) {return this.hexMD5(string);}return this.rawMD5(string);}if (!raw) {return this.hexHMACMD5(key, string);}return this.rawHMACMD5(key, string);}, getSig: function getSig(requestParam, sk, feature, mode) {var sig = null;var requestArr = [];Object.keys(requestParam).sort().forEach(function (key) {requestArr.push(key + '=' + requestParam[key]);});if (feature == 'search') {sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;}if (feature == 'suggest') {sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;}if (feature == 'reverseGeocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'geocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'getCityList') {sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;}if (feature == 'getDistrictByCityId') {sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;}if (feature == 'calculateDistance') {sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;}if (feature == 'direction') {sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;}sig = this.md5(sig);return sig;}, location2query: function location2query(data) {if (typeof data == 'string') {return data;}var query = '';for (var i = 0; i < data.length; i++) {var d = data[i];if (!!query) {query += ';';}if (d.location) {query = query + d.location.lat + ',' + d.location.lng;}if (d.latitude && d.longitude) {query = query + d.latitude + ',' + d.longitude;}}return query;}, rad: function rad(d) {return d * Math.PI / 180.0;}, getEndLocation: function getEndLocation(location) {var to = location.split(';');var endLocation = [];for (var i = 0; i < to.length; i++) {endLocation.push({ lat: parseFloat(to[i].split(',')[0]), lng: parseFloat(to[i].split(',')[1]) });}return endLocation;}, getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {var radLatFrom = this.rad(latFrom);var radLatTo = this.rad(latTo);var a = radLatFrom - radLatTo;var b = this.rad(lngFrom) - this.rad(lngTo);var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));distance = distance * EARTH_RADIUS;distance = Math.round(distance * 10000) / 10000;return parseFloat(distance.toFixed(0));}, getWXLocation: function getWXLocation(success, fail, complete) {wx.getLocation({ type: 'gcj02', success: success, fail: fail, complete: complete });}, getLocationParam: function getLocationParam(location) {if (typeof location == 'string') {var locationArr = location.split(',');if (locationArr.length === 2) {location = { latitude: location.split(',')[0], longitude: location.split(',')[1] };} else {location = {};}}return location;}, polyfillParam: function polyfillParam(param) {param.success = param.success || function () {};param.fail = param.fail || function () {};param.complete = param.complete || function () {};}, checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {if (!param[key]) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');param.fail(errconf);param.complete(errconf);return true;}return false;}, checkKeyword: function checkKeyword(param) {return !this.checkParamKeyEmpty(param, 'keyword');}, checkLocation: function checkLocation(param) {var location = this.getLocationParam(param.location);if (!location || !location.latitude || !location.longitude) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');param.fail(errconf);param.complete(errconf);return false;}return true;}, buildErrorConfig: function buildErrorConfig(errCode, errMsg) {return { status: errCode, message: errMsg };}, handleData: function handleData(param, data, feature) {if (feature == 'search') {var searchResult = data.data;var searchSimplify = [];for (var i = 0; i < searchResult.length; i++) {searchSimplify.push({ id: searchResult[i].id || null, title: searchResult[i].title || null, latitude: searchResult[i].location && searchResult[i].location.lat || null, longitude: searchResult[i].location && searchResult[i].location.lng || null, address: searchResult[i].address || null, category: searchResult[i].category || null, tel: searchResult[i].tel || null, adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null, city: searchResult[i].ad_info && searchResult[i].ad_info.city || null, district: searchResult[i].ad_info && searchResult[i].ad_info.district || null, province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });}param.success(data, { searchResult: searchResult, searchSimplify: searchSimplify });} else if (feature == 'suggest') {var suggestResult = data.data;var suggestSimplify = [];for (var i = 0; i < suggestResult.length; i++) {suggestSimplify.push({ adcode: suggestResult[i].adcode || null, address: suggestResult[i].address || null, category: suggestResult[i].category || null, city: suggestResult[i].city || null, district: suggestResult[i].district || null, id: suggestResult[i].id || null, latitude: suggestResult[i].location && suggestResult[i].location.lat || null, longitude: suggestResult[i].location && suggestResult[i].location.lng || null, province: suggestResult[i].province || null, title: suggestResult[i].title || null, type: suggestResult[i].type || null });}param.success(data, { suggestResult: suggestResult, suggestSimplify: suggestSimplify });} else if (feature == 'reverseGeocoder') {var reverseGeocoderResult = data.result;var reverseGeocoderSimplify = { address: reverseGeocoderResult.address || null, latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null, longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null, adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null, city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null, district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null, nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null, province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null, street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null, street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null, recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null, rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };if (reverseGeocoderResult.pois) {var pois = reverseGeocoderResult.pois;var poisSimplify = [];for (var i = 0; i < pois.length; i++) {poisSimplify.push({ id: pois[i].id || null, title: pois[i].title || null, latitude: pois[i].location && pois[i].location.lat || null, longitude: pois[i].location && pois[i].location.lng || null, address: pois[i].address || null, category: pois[i].category || null, adcode: pois[i].ad_info && pois[i].ad_info.adcode || null, city: pois[i].ad_info && pois[i].ad_info.city || null, district: pois[i].ad_info && pois[i].ad_info.district || null, province: pois[i].ad_info && pois[i].ad_info.province || null });}param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify, pois: pois, poisSimplify: poisSimplify });} else {param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify });}} else if (feature == 'geocoder') {var geocoderResult = data.result;var geocoderSimplify = { title: geocoderResult.title || null, latitude: geocoderResult.location && geocoderResult.location.lat || null, longitude: geocoderResult.location && geocoderResult.location.lng || null, adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null, province: geocoderResult.address_components && geocoderResult.address_components.province || null, city: geocoderResult.address_components && geocoderResult.address_components.city || null, district: geocoderResult.address_components && geocoderResult.address_components.district || null, street: geocoderResult.address_components && geocoderResult.address_components.street || null, street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null, level: geocoderResult.level || null };param.success(data, { geocoderResult: geocoderResult, geocoderSimplify: geocoderSimplify });} else if (feature == 'getCityList') {var provinceResult = data.result[0];var cityResult = data.result[1];var districtResult = data.result[2];param.success(data, { provinceResult: provinceResult, cityResult: cityResult, districtResult: districtResult });} else if (feature == 'getDistrictByCityId') {var districtByCity = data.result[0];param.success(data, districtByCity);} else if (feature == 'calculateDistance') {var calculateDistanceResult = data.result.elements;var distance = [];for (var i = 0; i < calculateDistanceResult.length; i++) {distance.push(calculateDistanceResult[i].distance);}param.success(data, { calculateDistanceResult: calculateDistanceResult, distance: distance });} else if (feature == 'direction') {var direction = data.result.routes;param.success(data, direction);} else {param.success(data);}}, buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {var that = this;options.header = { "content-type": "application/json" };options.method = 'GET';options.success = function (res) {var data = res.data;if (data.status === 0) {that.handleData(param, data, feature);} else {param.fail(data);}};options.fail = function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};options.complete = function (res) {var statusCode = +res.statusCode;switch (statusCode) {case ERROR_CONF.WX_ERR_CODE:{param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));break;}case ERROR_CONF.WX_OK_CODE:{var data = res.data;if (data.status === 0) {param.complete(data);} else {param.complete(that.buildErrorConfig(data.status, data.message));}break;}default:{param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));}}};return options;}, locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {var that = this;locationfail = locationfail || function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};locationcomplete = locationcomplete || function (res) {if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));}};if (!param.location) {that.getWXLocation(locationsuccess, locationfail, locationcomplete);} else if (that.checkLocation(param)) {var location = Utils.getLocationParam(param.location);locationsuccess(location);}} };var QQMapWX = /*#__PURE__*/function () {"use strict";function QQMapWX(options) {_classCallCheck(this, QQMapWX);if (!options.key) {throw Error('key值不能为空');}this.key = options.key;}_createClass(QQMapWX, [{ key: "search", value: function search(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, orderby: options.orderby || '_distance', page_size: options.page_size || 10, page_index: options.page_index || 1, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}var distance = options.distance || "1000";var auto_extend = options.auto_extend || 1;var region = null;var rectangle = null;if (options.region) {region = options.region;}if (options.rectangle) {rectangle = options.rectangle;}var locationsuccess = function locationsuccess(result) {if (region && !rectangle) {requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else if (rectangle && !region) {requestParam.boundary = "rectangle(" + rectangle + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else {requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SEARCH, data: requestParam }, 'search'));};Utils.locationProcess(options, locationsuccess);} }, { key: "getSuggestion", value: function getSuggestion(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, region: options.region || '全国', region_fix: options.region_fix || 0, policy: options.policy || 0, page_size: options.page_size || 10, page_index: options.page_index || 1, get_subpois: options.get_subpois || 0, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}if (options.location) {var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));};Utils.locationProcess(options, locationsuccess);} else {if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));}} }, { key: "reverseGeocoder", value: function reverseGeocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { coord_type: options.coord_type || 5, get_poi: options.get_poi || 0, output: 'json', key: that.key };if (options.poi_options) {requestParam.poi_options = options.poi_options;}var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'reverseGeocoder'));};Utils.locationProcess(options, locationsuccess);} }, { key: "geocoder", value: function geocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'address')) {return;}var requestParam = { address: options.address, output: 'json', key: that.key };if (options.region) {requestParam.region = options.region;}if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'geocoder'));} }, { key: "getCityList", value: function getCityList(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_CITY_LIST, data: requestParam }, 'getCityList'));} }, { key: "getDistrictByCityId", value: function getDistrictByCityId(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'id')) {return;}var requestParam = { id: options.id || '', output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_AREA_LIST, data: requestParam }, 'getDistrictByCityId'));} }, { key: "calculateDistance", value: function calculateDistance(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { mode: options.mode || 'walking', to: Utils.location2query(options.to), output: 'json', key: that.key };if (options.from) {options.location = options.from;}if (requestParam.mode == 'straight') {var locationsuccess = function locationsuccess(result) {var locationTo = Utils.getEndLocation(requestParam.to);var data = { message: "query ok", result: { elements: [] }, status: 0 };for (var i = 0; i < locationTo.length; i++) {data.result.elements.push({ distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng), duration: 0, from: { lat: result.latitude, lng: result.longitude }, to: { lat: locationTo[i].lat, lng: locationTo[i].lng } });}var calculateResult = data.result.elements;var distanceResult = [];for (var i = 0; i < calculateResult.length; i++) {distanceResult.push(calculateResult[i].distance);}return options.success(data, { calculateResult: calculateResult, distanceResult: distanceResult });};Utils.locationProcess(options, locationsuccess);} else {var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_DISTANCE, data: requestParam }, 'calculateDistance'));};Utils.locationProcess(options, locationsuccess);}} }, { key: "direction", value: function direction(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { output: 'json', key: that.key };if (typeof options.to == 'string') {requestParam.to = options.to;} else {requestParam.to = options.to.latitude + ',' + options.to.longitude;}var SET_URL_DIRECTION = null;options.mode = options.mode || MODE.driving;SET_URL_DIRECTION = URL_DIRECTION + options.mode;if (options.from) {options.location = options.from;}if (options.mode == MODE.driving) {if (options.from_poi) {requestParam.from_poi = options.from_poi;}if (options.heading) {requestParam.heading = options.heading;}if (options.speed) {requestParam.speed = options.speed;}if (options.accuracy) {requestParam.accuracy = options.accuracy;}if (options.road_type) {requestParam.road_type = options.road_type;}if (options.to_poi) {requestParam.to_poi = options.to_poi;}if (options.from_track) {requestParam.from_track = options.from_track;}if (options.waypoints) {requestParam.waypoints = options.waypoints;}if (options.policy) {requestParam.policy = options.policy;}if (options.plate_number) {requestParam.plate_number = options.plate_number;}}if (options.mode == MODE.transit) {if (options.departure_time) {requestParam.departure_time = options.departure_time;}if (options.policy) {requestParam.policy = options.policy;}}var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);}wx.request(Utils.buildWxRequestConfig(options, { url: SET_URL_DIRECTION, data: requestParam }, 'direction'));};Utils.locationProcess(options, locationsuccess);} }]);return QQMapWX;}();;module.exports = QQMapWX;

/***/ }),

/***/ 643:
/*!************************************************************************!*\
  !*** D:/uni/uni_phone/components/simple-address/city-data/province.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },

{
  "label": "河南省",
  "value": "41" },

{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" },

{
  "label": "钓鱼岛",
  "value": "69" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 644:
/*!********************************************************************!*\
  !*** D:/uni/uni_phone/components/simple-address/city-data/city.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "市辖区",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1201" }],

[{
  "label": "石家庄市",
  "value": "1301" },

{
  "label": "唐山市",
  "value": "1302" },

{
  "label": "秦皇岛市",
  "value": "1303" },

{
  "label": "邯郸市",
  "value": "1304" },

{
  "label": "邢台市",
  "value": "1305" },

{
  "label": "保定市",
  "value": "1306" },

{
  "label": "张家口市",
  "value": "1307" },

{
  "label": "承德市",
  "value": "1308" },

{
  "label": "沧州市",
  "value": "1309" },

{
  "label": "廊坊市",
  "value": "1310" },

{
  "label": "衡水市",
  "value": "1311" }],


[{
  "label": "太原市",
  "value": "1401" },

{
  "label": "大同市",
  "value": "1402" },

{
  "label": "阳泉市",
  "value": "1403" },

{
  "label": "长治市",
  "value": "1404" },

{
  "label": "晋城市",
  "value": "1405" },

{
  "label": "朔州市",
  "value": "1406" },

{
  "label": "晋中市",
  "value": "1407" },

{
  "label": "运城市",
  "value": "1408" },

{
  "label": "忻州市",
  "value": "1409" },

{
  "label": "临汾市",
  "value": "1410" },

{
  "label": "吕梁市",
  "value": "1411" }],


[{
  "label": "呼和浩特市",
  "value": "1501" },

{
  "label": "包头市",
  "value": "1502" },

{
  "label": "乌海市",
  "value": "1503" },

{
  "label": "赤峰市",
  "value": "1504" },

{
  "label": "通辽市",
  "value": "1505" },

{
  "label": "鄂尔多斯市",
  "value": "1506" },

{
  "label": "呼伦贝尔市",
  "value": "1507" },

{
  "label": "巴彦淖尔市",
  "value": "1508" },

{
  "label": "乌兰察布市",
  "value": "1509" },

{
  "label": "兴安盟",
  "value": "1522" },

{
  "label": "锡林郭勒盟",
  "value": "1525" },

{
  "label": "阿拉善盟",
  "value": "1529" }],


[{
  "label": "沈阳市",
  "value": "2101" },

{
  "label": "大连市",
  "value": "2102" },

{
  "label": "鞍山市",
  "value": "2103" },

{
  "label": "抚顺市",
  "value": "2104" },

{
  "label": "本溪市",
  "value": "2105" },

{
  "label": "丹东市",
  "value": "2106" },

{
  "label": "锦州市",
  "value": "2107" },

{
  "label": "营口市",
  "value": "2108" },

{
  "label": "阜新市",
  "value": "2109" },

{
  "label": "辽阳市",
  "value": "2110" },

{
  "label": "盘锦市",
  "value": "2111" },

{
  "label": "铁岭市",
  "value": "2112" },

{
  "label": "朝阳市",
  "value": "2113" },

{
  "label": "葫芦岛市",
  "value": "2114" }],


[{
  "label": "长春市",
  "value": "2201" },

{
  "label": "吉林市",
  "value": "2202" },

{
  "label": "四平市",
  "value": "2203" },

{
  "label": "辽源市",
  "value": "2204" },

{
  "label": "通化市",
  "value": "2205" },

{
  "label": "白山市",
  "value": "2206" },

{
  "label": "松原市",
  "value": "2207" },

{
  "label": "白城市",
  "value": "2208" },

{
  "label": "延边朝鲜族自治州",
  "value": "2224" }],


[{
  "label": "哈尔滨市",
  "value": "2301" },

{
  "label": "齐齐哈尔市",
  "value": "2302" },

{
  "label": "鸡西市",
  "value": "2303" },

{
  "label": "鹤岗市",
  "value": "2304" },

{
  "label": "双鸭山市",
  "value": "2305" },

{
  "label": "大庆市",
  "value": "2306" },

{
  "label": "伊春市",
  "value": "2307" },

{
  "label": "佳木斯市",
  "value": "2308" },

{
  "label": "七台河市",
  "value": "2309" },

{
  "label": "牡丹江市",
  "value": "2310" },

{
  "label": "黑河市",
  "value": "2311" },

{
  "label": "绥化市",
  "value": "2312" },

{
  "label": "大兴安岭地区",
  "value": "2327" }],


[{
  "label": "市辖区",
  "value": "3101" }],

[{
  "label": "南京市",
  "value": "3201" },

{
  "label": "无锡市",
  "value": "3202" },

{
  "label": "徐州市",
  "value": "3203" },

{
  "label": "常州市",
  "value": "3204" },

{
  "label": "苏州市",
  "value": "3205" },

{
  "label": "南通市",
  "value": "3206" },

{
  "label": "连云港市",
  "value": "3207" },

{
  "label": "淮安市",
  "value": "3208" },

{
  "label": "盐城市",
  "value": "3209" },

{
  "label": "扬州市",
  "value": "3210" },

{
  "label": "镇江市",
  "value": "3211" },

{
  "label": "泰州市",
  "value": "3212" },

{
  "label": "宿迁市",
  "value": "3213" }],


[{
  "label": "杭州市",
  "value": "3301" },

{
  "label": "宁波市",
  "value": "3302" },

{
  "label": "温州市",
  "value": "3303" },

{
  "label": "嘉兴市",
  "value": "3304" },

{
  "label": "湖州市",
  "value": "3305" },

{
  "label": "绍兴市",
  "value": "3306" },

{
  "label": "金华市",
  "value": "3307" },

{
  "label": "衢州市",
  "value": "3308" },

{
  "label": "舟山市",
  "value": "3309" },

{
  "label": "台州市",
  "value": "3310" },

{
  "label": "丽水市",
  "value": "3311" }],


[{
  "label": "合肥市",
  "value": "3401" },

{
  "label": "芜湖市",
  "value": "3402" },

{
  "label": "蚌埠市",
  "value": "3403" },

{
  "label": "淮南市",
  "value": "3404" },

{
  "label": "马鞍山市",
  "value": "3405" },

{
  "label": "淮北市",
  "value": "3406" },

{
  "label": "铜陵市",
  "value": "3407" },

{
  "label": "安庆市",
  "value": "3408" },

{
  "label": "黄山市",
  "value": "3410" },

{
  "label": "滁州市",
  "value": "3411" },

{
  "label": "阜阳市",
  "value": "3412" },

{
  "label": "宿州市",
  "value": "3413" },

{
  "label": "六安市",
  "value": "3415" },

{
  "label": "亳州市",
  "value": "3416" },

{
  "label": "池州市",
  "value": "3417" },

{
  "label": "宣城市",
  "value": "3418" }],


[{
  "label": "福州市",
  "value": "3501" },

{
  "label": "厦门市",
  "value": "3502" },

{
  "label": "莆田市",
  "value": "3503" },

{
  "label": "三明市",
  "value": "3504" },

{
  "label": "泉州市",
  "value": "3505" },

{
  "label": "漳州市",
  "value": "3506" },

{
  "label": "南平市",
  "value": "3507" },

{
  "label": "龙岩市",
  "value": "3508" },

{
  "label": "宁德市",
  "value": "3509" }],


[{
  "label": "南昌市",
  "value": "3601" },

{
  "label": "景德镇市",
  "value": "3602" },

{
  "label": "萍乡市",
  "value": "3603" },

{
  "label": "九江市",
  "value": "3604" },

{
  "label": "新余市",
  "value": "3605" },

{
  "label": "鹰潭市",
  "value": "3606" },

{
  "label": "赣州市",
  "value": "3607" },

{
  "label": "吉安市",
  "value": "3608" },

{
  "label": "宜春市",
  "value": "3609" },

{
  "label": "抚州市",
  "value": "3610" },

{
  "label": "上饶市",
  "value": "3611" }],


[{
  "label": "济南市",
  "value": "3701" },

{
  "label": "青岛市",
  "value": "3702" },

{
  "label": "淄博市",
  "value": "3703" },

{
  "label": "枣庄市",
  "value": "3704" },

{
  "label": "东营市",
  "value": "3705" },

{
  "label": "烟台市",
  "value": "3706" },

{
  "label": "潍坊市",
  "value": "3707" },

{
  "label": "济宁市",
  "value": "3708" },

{
  "label": "泰安市",
  "value": "3709" },

{
  "label": "威海市",
  "value": "3710" },

{
  "label": "日照市",
  "value": "3711" },

{
  "label": "莱芜市",
  "value": "3712" },

{
  "label": "临沂市",
  "value": "3713" },

{
  "label": "德州市",
  "value": "3714" },

{
  "label": "聊城市",
  "value": "3715" },

{
  "label": "滨州市",
  "value": "3716" },

{
  "label": "菏泽市",
  "value": "3717" }],


[{
  "label": "郑州市",
  "value": "4101" },

{
  "label": "开封市",
  "value": "4102" },

{
  "label": "洛阳市",
  "value": "4103" },

{
  "label": "平顶山市",
  "value": "4104" },

{
  "label": "安阳市",
  "value": "4105" },

{
  "label": "鹤壁市",
  "value": "4106" },

{
  "label": "新乡市",
  "value": "4107" },

{
  "label": "焦作市",
  "value": "4108" },

{
  "label": "濮阳市",
  "value": "4109" },

{
  "label": "许昌市",
  "value": "4110" },

{
  "label": "漯河市",
  "value": "4111" },

{
  "label": "三门峡市",
  "value": "4112" },

{
  "label": "南阳市",
  "value": "4113" },

{
  "label": "商丘市",
  "value": "4114" },

{
  "label": "信阳市",
  "value": "4115" },

{
  "label": "周口市",
  "value": "4116" },

{
  "label": "驻马店市",
  "value": "4117" },

{
  "label": "省直辖县级行政区划",
  "value": "4190" }],


[{
  "label": "武汉市",
  "value": "4201" },

{
  "label": "黄石市",
  "value": "4202" },

{
  "label": "十堰市",
  "value": "4203" },

{
  "label": "宜昌市",
  "value": "4205" },

{
  "label": "襄阳市",
  "value": "4206" },

{
  "label": "鄂州市",
  "value": "4207" },

{
  "label": "荆门市",
  "value": "4208" },

{
  "label": "孝感市",
  "value": "4209" },

{
  "label": "荆州市",
  "value": "4210" },

{
  "label": "黄冈市",
  "value": "4211" },

{
  "label": "咸宁市",
  "value": "4212" },

{
  "label": "随州市",
  "value": "4213" },

{
  "label": "恩施土家族苗族自治州",
  "value": "4228" },

{
  "label": "省直辖县级行政区划",
  "value": "4290" }],


[{
  "label": "长沙市",
  "value": "4301" },

{
  "label": "株洲市",
  "value": "4302" },

{
  "label": "湘潭市",
  "value": "4303" },

{
  "label": "衡阳市",
  "value": "4304" },

{
  "label": "邵阳市",
  "value": "4305" },

{
  "label": "岳阳市",
  "value": "4306" },

{
  "label": "常德市",
  "value": "4307" },

{
  "label": "张家界市",
  "value": "4308" },

{
  "label": "益阳市",
  "value": "4309" },

{
  "label": "郴州市",
  "value": "4310" },

{
  "label": "永州市",
  "value": "4311" },

{
  "label": "怀化市",
  "value": "4312" },

{
  "label": "娄底市",
  "value": "4313" },

{
  "label": "湘西土家族苗族自治州",
  "value": "4331" }],


[{
  "label": "广州市",
  "value": "4401" },

{
  "label": "韶关市",
  "value": "4402" },

{
  "label": "深圳市",
  "value": "4403" },

{
  "label": "珠海市",
  "value": "4404" },

{
  "label": "汕头市",
  "value": "4405" },

{
  "label": "佛山市",
  "value": "4406" },

{
  "label": "江门市",
  "value": "4407" },

{
  "label": "湛江市",
  "value": "4408" },

{
  "label": "茂名市",
  "value": "4409" },

{
  "label": "肇庆市",
  "value": "4412" },

{
  "label": "惠州市",
  "value": "4413" },

{
  "label": "梅州市",
  "value": "4414" },

{
  "label": "汕尾市",
  "value": "4415" },

{
  "label": "河源市",
  "value": "4416" },

{
  "label": "阳江市",
  "value": "4417" },

{
  "label": "清远市",
  "value": "4418" },

{
  "label": "东莞市",
  "value": "4419" },

{
  "label": "中山市",
  "value": "4420" },

{
  "label": "潮州市",
  "value": "4451" },

{
  "label": "揭阳市",
  "value": "4452" },

{
  "label": "云浮市",
  "value": "4453" }],


[{
  "label": "南宁市",
  "value": "4501" },

{
  "label": "柳州市",
  "value": "4502" },

{
  "label": "桂林市",
  "value": "4503" },

{
  "label": "梧州市",
  "value": "4504" },

{
  "label": "北海市",
  "value": "4505" },

{
  "label": "防城港市",
  "value": "4506" },

{
  "label": "钦州市",
  "value": "4507" },

{
  "label": "贵港市",
  "value": "4508" },

{
  "label": "玉林市",
  "value": "4509" },

{
  "label": "百色市",
  "value": "4510" },

{
  "label": "贺州市",
  "value": "4511" },

{
  "label": "河池市",
  "value": "4512" },

{
  "label": "来宾市",
  "value": "4513" },

{
  "label": "崇左市",
  "value": "4514" }],


[{
  "label": "海口市",
  "value": "4601" },

{
  "label": "三亚市",
  "value": "4602" },

{
  "label": "三沙市",
  "value": "4603" },

{
  "label": "儋州市",
  "value": "4604" },

{
  "label": "省直辖县级行政区划",
  "value": "4690" }],


[{
  "label": "市辖区",
  "value": "5001" },

{
  "label": "县",
  "value": "5002" }],


[{
  "label": "成都市",
  "value": "5101" },

{
  "label": "自贡市",
  "value": "5103" },

{
  "label": "攀枝花市",
  "value": "5104" },

{
  "label": "泸州市",
  "value": "5105" },

{
  "label": "德阳市",
  "value": "5106" },

{
  "label": "绵阳市",
  "value": "5107" },

{
  "label": "广元市",
  "value": "5108" },

{
  "label": "遂宁市",
  "value": "5109" },

{
  "label": "内江市",
  "value": "5110" },

{
  "label": "乐山市",
  "value": "5111" },

{
  "label": "南充市",
  "value": "5113" },

{
  "label": "眉山市",
  "value": "5114" },

{
  "label": "宜宾市",
  "value": "5115" },

{
  "label": "广安市",
  "value": "5116" },

{
  "label": "达州市",
  "value": "5117" },

{
  "label": "雅安市",
  "value": "5118" },

{
  "label": "巴中市",
  "value": "5119" },

{
  "label": "资阳市",
  "value": "5120" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "5132" },

{
  "label": "甘孜藏族自治州",
  "value": "5133" },

{
  "label": "凉山彝族自治州",
  "value": "5134" }],


[{
  "label": "贵阳市",
  "value": "5201" },

{
  "label": "六盘水市",
  "value": "5202" },

{
  "label": "遵义市",
  "value": "5203" },

{
  "label": "安顺市",
  "value": "5204" },

{
  "label": "毕节市",
  "value": "5205" },

{
  "label": "铜仁市",
  "value": "5206" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "5223" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "5226" },

{
  "label": "黔南布依族苗族自治州",
  "value": "5227" }],


[{
  "label": "昆明市",
  "value": "5301" },

{
  "label": "曲靖市",
  "value": "5303" },

{
  "label": "玉溪市",
  "value": "5304" },

{
  "label": "保山市",
  "value": "5305" },

{
  "label": "昭通市",
  "value": "5306" },

{
  "label": "丽江市",
  "value": "5307" },

{
  "label": "普洱市",
  "value": "5308" },

{
  "label": "临沧市",
  "value": "5309" },

{
  "label": "楚雄彝族自治州",
  "value": "5323" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "5325" },

{
  "label": "文山壮族苗族自治州",
  "value": "5326" },

{
  "label": "西双版纳傣族自治州",
  "value": "5328" },

{
  "label": "大理白族自治州",
  "value": "5329" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "5331" },

{
  "label": "怒江傈僳族自治州",
  "value": "5333" },

{
  "label": "迪庆藏族自治州",
  "value": "5334" }],


[{
  "label": "拉萨市",
  "value": "5401" },

{
  "label": "日喀则市",
  "value": "5402" },

{
  "label": "昌都市",
  "value": "5403" },

{
  "label": "林芝市",
  "value": "5404" },

{
  "label": "山南市",
  "value": "5405" },

{
  "label": "那曲地区",
  "value": "5424" },

{
  "label": "阿里地区",
  "value": "5425" }],


[{
  "label": "西安市",
  "value": "6101" },

{
  "label": "铜川市",
  "value": "6102" },

{
  "label": "宝鸡市",
  "value": "6103" },

{
  "label": "咸阳市",
  "value": "6104" },

{
  "label": "渭南市",
  "value": "6105" },

{
  "label": "延安市",
  "value": "6106" },

{
  "label": "汉中市",
  "value": "6107" },

{
  "label": "榆林市",
  "value": "6108" },

{
  "label": "安康市",
  "value": "6109" },

{
  "label": "商洛市",
  "value": "6110" }],


[{
  "label": "兰州市",
  "value": "6201" },

{
  "label": "嘉峪关市",
  "value": "6202" },

{
  "label": "金昌市",
  "value": "6203" },

{
  "label": "白银市",
  "value": "6204" },

{
  "label": "天水市",
  "value": "6205" },

{
  "label": "武威市",
  "value": "6206" },

{
  "label": "张掖市",
  "value": "6207" },

{
  "label": "平凉市",
  "value": "6208" },

{
  "label": "酒泉市",
  "value": "6209" },

{
  "label": "庆阳市",
  "value": "6210" },

{
  "label": "定西市",
  "value": "6211" },

{
  "label": "陇南市",
  "value": "6212" },

{
  "label": "临夏回族自治州",
  "value": "6229" },

{
  "label": "甘南藏族自治州",
  "value": "6230" }],


[{
  "label": "西宁市",
  "value": "6301" },

{
  "label": "海东市",
  "value": "6302" },

{
  "label": "海北藏族自治州",
  "value": "6322" },

{
  "label": "黄南藏族自治州",
  "value": "6323" },

{
  "label": "海南藏族自治州",
  "value": "6325" },

{
  "label": "果洛藏族自治州",
  "value": "6326" },

{
  "label": "玉树藏族自治州",
  "value": "6327" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "6328" }],


[{
  "label": "银川市",
  "value": "6401" },

{
  "label": "石嘴山市",
  "value": "6402" },

{
  "label": "吴忠市",
  "value": "6403" },

{
  "label": "固原市",
  "value": "6404" },

{
  "label": "中卫市",
  "value": "6405" }],


[{
  "label": "乌鲁木齐市",
  "value": "6501" },

{
  "label": "克拉玛依市",
  "value": "6502" },

{
  "label": "吐鲁番市",
  "value": "6504" },

{
  "label": "哈密市",
  "value": "6505" },

{
  "label": "昌吉回族自治州",
  "value": "6523" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "6527" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "6528" },

{
  "label": "阿克苏地区",
  "value": "6529" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530" },

{
  "label": "喀什地区",
  "value": "6531" },

{
  "label": "和田地区",
  "value": "6532" },

{
  "label": "伊犁哈萨克自治州",
  "value": "6540" },

{
  "label": "塔城地区",
  "value": "6542" },

{
  "label": "阿勒泰地区",
  "value": "6543" },

{
  "label": "自治区直辖县级行政区划",
  "value": "6590" }],


[{
  "label": "台北",
  "value": "6601" },

{
  "label": "高雄",
  "value": "6602" },

{
  "label": "基隆",
  "value": "6603" },

{
  "label": "台中",
  "value": "6604" },

{
  "label": "台南",
  "value": "6605" },

{
  "label": "新竹",
  "value": "6606" },

{
  "label": "嘉义",
  "value": "6607" },

{
  "label": "宜兰",
  "value": "6608" },

{
  "label": "桃园",
  "value": "6609" },

{
  "label": "苗栗",
  "value": "6610" },

{
  "label": "彰化",
  "value": "6611" },

{
  "label": "南投",
  "value": "6612" },

{
  "label": "云林",
  "value": "6613" },

{
  "label": "屏东",
  "value": "6614" },

{
  "label": "台东",
  "value": "6615" },

{
  "label": "花莲",
  "value": "6616" },

{
  "label": "澎湖",
  "value": "6617" }],


[{
  "label": "香港岛",
  "value": "6701" },

{
  "label": "九龙",
  "value": "6702" },

{
  "label": "新界",
  "value": "6703" }],


[{
  "label": "澳门半岛",
  "value": "6801" },

{
  "label": "氹仔岛",
  "value": "6802" },

{
  "label": "路环岛",
  "value": "6803" },

{
  "label": "路氹城",
  "value": "6804" }],


[{
  "label": "钓鱼岛",
  "value": "6901" }]];var _default =


cityData;exports.default = _default;

/***/ }),

/***/ 645:
/*!********************************************************************!*\
  !*** D:/uni/uni_phone/components/simple-address/city-data/area.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "东城区",
  "value": "110101" },

{
  "label": "西城区",
  "value": "110102" },

{
  "label": "朝阳区",
  "value": "110105" },

{
  "label": "丰台区",
  "value": "110106" },

{
  "label": "石景山区",
  "value": "110107" },

{
  "label": "海淀区",
  "value": "110108" },

{
  "label": "门头沟区",
  "value": "110109" },

{
  "label": "房山区",
  "value": "110111" },

{
  "label": "通州区",
  "value": "110112" },

{
  "label": "顺义区",
  "value": "110113" },

{
  "label": "昌平区",
  "value": "110114" },

{
  "label": "大兴区",
  "value": "110115" },

{
  "label": "怀柔区",
  "value": "110116" },

{
  "label": "平谷区",
  "value": "110117" },

{
  "label": "密云区",
  "value": "110118" },

{
  "label": "延庆区",
  "value": "110119" }]],



[
[{
  "label": "和平区",
  "value": "120101" },

{
  "label": "河东区",
  "value": "120102" },

{
  "label": "河西区",
  "value": "120103" },

{
  "label": "南开区",
  "value": "120104" },

{
  "label": "河北区",
  "value": "120105" },

{
  "label": "红桥区",
  "value": "120106" },

{
  "label": "东丽区",
  "value": "120110" },

{
  "label": "西青区",
  "value": "120111" },

{
  "label": "津南区",
  "value": "120112" },

{
  "label": "北辰区",
  "value": "120113" },

{
  "label": "武清区",
  "value": "120114" },

{
  "label": "宝坻区",
  "value": "120115" },

{
  "label": "滨海新区",
  "value": "120116" },

{
  "label": "宁河区",
  "value": "120117" },

{
  "label": "静海区",
  "value": "120118" },

{
  "label": "蓟州区",
  "value": "120119" }]],



[
[{
  "label": "长安区",
  "value": "130102" },

{
  "label": "桥西区",
  "value": "130104" },

{
  "label": "新华区",
  "value": "130105" },

{
  "label": "井陉矿区",
  "value": "130107" },

{
  "label": "裕华区",
  "value": "130108" },

{
  "label": "藁城区",
  "value": "130109" },

{
  "label": "鹿泉区",
  "value": "130110" },

{
  "label": "栾城区",
  "value": "130111" },

{
  "label": "井陉县",
  "value": "130121" },

{
  "label": "正定县",
  "value": "130123" },

{
  "label": "行唐县",
  "value": "130125" },

{
  "label": "灵寿县",
  "value": "130126" },

{
  "label": "高邑县",
  "value": "130127" },

{
  "label": "深泽县",
  "value": "130128" },

{
  "label": "赞皇县",
  "value": "130129" },

{
  "label": "无极县",
  "value": "130130" },

{
  "label": "平山县",
  "value": "130131" },

{
  "label": "元氏县",
  "value": "130132" },

{
  "label": "赵县",
  "value": "130133" },

{
  "label": "石家庄高新技术产业开发区",
  "value": "130171" },

{
  "label": "石家庄循环化工园区",
  "value": "130172" },

{
  "label": "辛集市",
  "value": "130181" },

{
  "label": "晋州市",
  "value": "130183" },

{
  "label": "新乐市",
  "value": "130184" }],


[{
  "label": "路南区",
  "value": "130202" },

{
  "label": "路北区",
  "value": "130203" },

{
  "label": "古冶区",
  "value": "130204" },

{
  "label": "开平区",
  "value": "130205" },

{
  "label": "丰南区",
  "value": "130207" },

{
  "label": "丰润区",
  "value": "130208" },

{
  "label": "曹妃甸区",
  "value": "130209" },

{
  "label": "滦县",
  "value": "130223" },

{
  "label": "滦南县",
  "value": "130224" },

{
  "label": "乐亭县",
  "value": "130225" },

{
  "label": "迁西县",
  "value": "130227" },

{
  "label": "玉田县",
  "value": "130229" },

{
  "label": "唐山市芦台经济技术开发区",
  "value": "130271" },

{
  "label": "唐山市汉沽管理区",
  "value": "130272" },

{
  "label": "唐山高新技术产业开发区",
  "value": "130273" },

{
  "label": "河北唐山海港经济开发区",
  "value": "130274" },

{
  "label": "遵化市",
  "value": "130281" },

{
  "label": "迁安市",
  "value": "130283" }],


[{
  "label": "海港区",
  "value": "130302" },

{
  "label": "山海关区",
  "value": "130303" },

{
  "label": "北戴河区",
  "value": "130304" },

{
  "label": "抚宁区",
  "value": "130306" },

{
  "label": "青龙满族自治县",
  "value": "130321" },

{
  "label": "昌黎县",
  "value": "130322" },

{
  "label": "卢龙县",
  "value": "130324" },

{
  "label": "秦皇岛市经济技术开发区",
  "value": "130371" },

{
  "label": "北戴河新区",
  "value": "130372" }],


[{
  "label": "邯山区",
  "value": "130402" },

{
  "label": "丛台区",
  "value": "130403" },

{
  "label": "复兴区",
  "value": "130404" },

{
  "label": "峰峰矿区",
  "value": "130406" },

{
  "label": "肥乡区",
  "value": "130407" },

{
  "label": "永年区",
  "value": "130408" },

{
  "label": "临漳县",
  "value": "130423" },

{
  "label": "成安县",
  "value": "130424" },

{
  "label": "大名县",
  "value": "130425" },

{
  "label": "涉县",
  "value": "130426" },

{
  "label": "磁县",
  "value": "130427" },

{
  "label": "邱县",
  "value": "130430" },

{
  "label": "鸡泽县",
  "value": "130431" },

{
  "label": "广平县",
  "value": "130432" },

{
  "label": "馆陶县",
  "value": "130433" },

{
  "label": "魏县",
  "value": "130434" },

{
  "label": "曲周县",
  "value": "130435" },

{
  "label": "邯郸经济技术开发区",
  "value": "130471" },

{
  "label": "邯郸冀南新区",
  "value": "130473" },

{
  "label": "武安市",
  "value": "130481" }],


[{
  "label": "桥东区",
  "value": "130502" },

{
  "label": "桥西区",
  "value": "130503" },

{
  "label": "邢台县",
  "value": "130521" },

{
  "label": "临城县",
  "value": "130522" },

{
  "label": "内丘县",
  "value": "130523" },

{
  "label": "柏乡县",
  "value": "130524" },

{
  "label": "隆尧县",
  "value": "130525" },

{
  "label": "任县",
  "value": "130526" },

{
  "label": "南和县",
  "value": "130527" },

{
  "label": "宁晋县",
  "value": "130528" },

{
  "label": "巨鹿县",
  "value": "130529" },

{
  "label": "新河县",
  "value": "130530" },

{
  "label": "广宗县",
  "value": "130531" },

{
  "label": "平乡县",
  "value": "130532" },

{
  "label": "威县",
  "value": "130533" },

{
  "label": "清河县",
  "value": "130534" },

{
  "label": "临西县",
  "value": "130535" },

{
  "label": "河北邢台经济开发区",
  "value": "130571" },

{
  "label": "南宫市",
  "value": "130581" },

{
  "label": "沙河市",
  "value": "130582" }],


[{
  "label": "竞秀区",
  "value": "130602" },

{
  "label": "莲池区",
  "value": "130606" },

{
  "label": "满城区",
  "value": "130607" },

{
  "label": "清苑区",
  "value": "130608" },

{
  "label": "徐水区",
  "value": "130609" },

{
  "label": "涞水县",
  "value": "130623" },

{
  "label": "阜平县",
  "value": "130624" },

{
  "label": "定兴县",
  "value": "130626" },

{
  "label": "唐县",
  "value": "130627" },

{
  "label": "高阳县",
  "value": "130628" },

{
  "label": "容城县",
  "value": "130629" },

{
  "label": "涞源县",
  "value": "130630" },

{
  "label": "望都县",
  "value": "130631" },

{
  "label": "安新县",
  "value": "130632" },

{
  "label": "易县",
  "value": "130633" },

{
  "label": "曲阳县",
  "value": "130634" },

{
  "label": "蠡县",
  "value": "130635" },

{
  "label": "顺平县",
  "value": "130636" },

{
  "label": "博野县",
  "value": "130637" },

{
  "label": "雄县",
  "value": "130638" },

{
  "label": "保定高新技术产业开发区",
  "value": "130671" },

{
  "label": "保定白沟新城",
  "value": "130672" },

{
  "label": "涿州市",
  "value": "130681" },

{
  "label": "定州市",
  "value": "130682" },

{
  "label": "安国市",
  "value": "130683" },

{
  "label": "高碑店市",
  "value": "130684" }],


[{
  "label": "桥东区",
  "value": "130702" },

{
  "label": "桥西区",
  "value": "130703" },

{
  "label": "宣化区",
  "value": "130705" },

{
  "label": "下花园区",
  "value": "130706" },

{
  "label": "万全区",
  "value": "130708" },

{
  "label": "崇礼区",
  "value": "130709" },

{
  "label": "张北县",
  "value": "130722" },

{
  "label": "康保县",
  "value": "130723" },

{
  "label": "沽源县",
  "value": "130724" },

{
  "label": "尚义县",
  "value": "130725" },

{
  "label": "蔚县",
  "value": "130726" },

{
  "label": "阳原县",
  "value": "130727" },

{
  "label": "怀安县",
  "value": "130728" },

{
  "label": "怀来县",
  "value": "130730" },

{
  "label": "涿鹿县",
  "value": "130731" },

{
  "label": "赤城县",
  "value": "130732" },

{
  "label": "张家口市高新技术产业开发区",
  "value": "130771" },

{
  "label": "张家口市察北管理区",
  "value": "130772" },

{
  "label": "张家口市塞北管理区",
  "value": "130773" }],


[{
  "label": "双桥区",
  "value": "130802" },

{
  "label": "双滦区",
  "value": "130803" },

{
  "label": "鹰手营子矿区",
  "value": "130804" },

{
  "label": "承德县",
  "value": "130821" },

{
  "label": "兴隆县",
  "value": "130822" },

{
  "label": "滦平县",
  "value": "130824" },

{
  "label": "隆化县",
  "value": "130825" },

{
  "label": "丰宁满族自治县",
  "value": "130826" },

{
  "label": "宽城满族自治县",
  "value": "130827" },

{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },

{
  "label": "承德高新技术产业开发区",
  "value": "130871" },

{
  "label": "平泉市",
  "value": "130881" }],


[{
  "label": "新华区",
  "value": "130902" },

{
  "label": "运河区",
  "value": "130903" },

{
  "label": "沧县",
  "value": "130921" },

{
  "label": "青县",
  "value": "130922" },

{
  "label": "东光县",
  "value": "130923" },

{
  "label": "海兴县",
  "value": "130924" },

{
  "label": "盐山县",
  "value": "130925" },

{
  "label": "肃宁县",
  "value": "130926" },

{
  "label": "南皮县",
  "value": "130927" },

{
  "label": "吴桥县",
  "value": "130928" },

{
  "label": "献县",
  "value": "130929" },

{
  "label": "孟村回族自治县",
  "value": "130930" },

{
  "label": "河北沧州经济开发区",
  "value": "130971" },

{
  "label": "沧州高新技术产业开发区",
  "value": "130972" },

{
  "label": "沧州渤海新区",
  "value": "130973" },

{
  "label": "泊头市",
  "value": "130981" },

{
  "label": "任丘市",
  "value": "130982" },

{
  "label": "黄骅市",
  "value": "130983" },

{
  "label": "河间市",
  "value": "130984" }],


[{
  "label": "安次区",
  "value": "131002" },

{
  "label": "广阳区",
  "value": "131003" },

{
  "label": "固安县",
  "value": "131022" },

{
  "label": "永清县",
  "value": "131023" },

{
  "label": "香河县",
  "value": "131024" },

{
  "label": "大城县",
  "value": "131025" },

{
  "label": "文安县",
  "value": "131026" },

{
  "label": "大厂回族自治县",
  "value": "131028" },

{
  "label": "廊坊经济技术开发区",
  "value": "131071" },

{
  "label": "霸州市",
  "value": "131081" },

{
  "label": "三河市",
  "value": "131082" }],


[{
  "label": "桃城区",
  "value": "131102" },

{
  "label": "冀州区",
  "value": "131103" },

{
  "label": "枣强县",
  "value": "131121" },

{
  "label": "武邑县",
  "value": "131122" },

{
  "label": "武强县",
  "value": "131123" },

{
  "label": "饶阳县",
  "value": "131124" },

{
  "label": "安平县",
  "value": "131125" },

{
  "label": "故城县",
  "value": "131126" },

{
  "label": "景县",
  "value": "131127" },

{
  "label": "阜城县",
  "value": "131128" },

{
  "label": "河北衡水经济开发区",
  "value": "131171" },

{
  "label": "衡水滨湖新区",
  "value": "131172" },

{
  "label": "深州市",
  "value": "131182" }]],



[
[{
  "label": "小店区",
  "value": "140105" },

{
  "label": "迎泽区",
  "value": "140106" },

{
  "label": "杏花岭区",
  "value": "140107" },

{
  "label": "尖草坪区",
  "value": "140108" },

{
  "label": "万柏林区",
  "value": "140109" },

{
  "label": "晋源区",
  "value": "140110" },

{
  "label": "清徐县",
  "value": "140121" },

{
  "label": "阳曲县",
  "value": "140122" },

{
  "label": "娄烦县",
  "value": "140123" },

{
  "label": "山西转型综合改革示范区",
  "value": "140171" },

{
  "label": "古交市",
  "value": "140181" }],


[{
  "label": "城区",
  "value": "140202" },

{
  "label": "矿区",
  "value": "140203" },

{
  "label": "南郊区",
  "value": "140211" },

{
  "label": "新荣区",
  "value": "140212" },

{
  "label": "阳高县",
  "value": "140221" },

{
  "label": "天镇县",
  "value": "140222" },

{
  "label": "广灵县",
  "value": "140223" },

{
  "label": "灵丘县",
  "value": "140224" },

{
  "label": "浑源县",
  "value": "140225" },

{
  "label": "左云县",
  "value": "140226" },

{
  "label": "大同县",
  "value": "140227" },

{
  "label": "山西大同经济开发区",
  "value": "140271" }],


[{
  "label": "城区",
  "value": "140302" },

{
  "label": "矿区",
  "value": "140303" },

{
  "label": "郊区",
  "value": "140311" },

{
  "label": "平定县",
  "value": "140321" },

{
  "label": "盂县",
  "value": "140322" },

{
  "label": "山西阳泉经济开发区",
  "value": "140371" }],


[{
  "label": "城区",
  "value": "140402" },

{
  "label": "郊区",
  "value": "140411" },

{
  "label": "长治县",
  "value": "140421" },

{
  "label": "襄垣县",
  "value": "140423" },

{
  "label": "屯留县",
  "value": "140424" },

{
  "label": "平顺县",
  "value": "140425" },

{
  "label": "黎城县",
  "value": "140426" },

{
  "label": "壶关县",
  "value": "140427" },

{
  "label": "长子县",
  "value": "140428" },

{
  "label": "武乡县",
  "value": "140429" },

{
  "label": "沁县",
  "value": "140430" },

{
  "label": "沁源县",
  "value": "140431" },

{
  "label": "山西长治高新技术产业园区",
  "value": "140471" },

{
  "label": "潞城市",
  "value": "140481" }],


[{
  "label": "城区",
  "value": "140502" },

{
  "label": "沁水县",
  "value": "140521" },

{
  "label": "阳城县",
  "value": "140522" },

{
  "label": "陵川县",
  "value": "140524" },

{
  "label": "泽州县",
  "value": "140525" },

{
  "label": "高平市",
  "value": "140581" }],


[{
  "label": "朔城区",
  "value": "140602" },

{
  "label": "平鲁区",
  "value": "140603" },

{
  "label": "山阴县",
  "value": "140621" },

{
  "label": "应县",
  "value": "140622" },

{
  "label": "右玉县",
  "value": "140623" },

{
  "label": "怀仁县",
  "value": "140624" },

{
  "label": "山西朔州经济开发区",
  "value": "140671" }],


[{
  "label": "榆次区",
  "value": "140702" },

{
  "label": "榆社县",
  "value": "140721" },

{
  "label": "左权县",
  "value": "140722" },

{
  "label": "和顺县",
  "value": "140723" },

{
  "label": "昔阳县",
  "value": "140724" },

{
  "label": "寿阳县",
  "value": "140725" },

{
  "label": "太谷县",
  "value": "140726" },

{
  "label": "祁县",
  "value": "140727" },

{
  "label": "平遥县",
  "value": "140728" },

{
  "label": "灵石县",
  "value": "140729" },

{
  "label": "介休市",
  "value": "140781" }],


[{
  "label": "盐湖区",
  "value": "140802" },

{
  "label": "临猗县",
  "value": "140821" },

{
  "label": "万荣县",
  "value": "140822" },

{
  "label": "闻喜县",
  "value": "140823" },

{
  "label": "稷山县",
  "value": "140824" },

{
  "label": "新绛县",
  "value": "140825" },

{
  "label": "绛县",
  "value": "140826" },

{
  "label": "垣曲县",
  "value": "140827" },

{
  "label": "夏县",
  "value": "140828" },

{
  "label": "平陆县",
  "value": "140829" },

{
  "label": "芮城县",
  "value": "140830" },

{
  "label": "永济市",
  "value": "140881" },

{
  "label": "河津市",
  "value": "140882" }],


[{
  "label": "忻府区",
  "value": "140902" },

{
  "label": "定襄县",
  "value": "140921" },

{
  "label": "五台县",
  "value": "140922" },

{
  "label": "代县",
  "value": "140923" },

{
  "label": "繁峙县",
  "value": "140924" },

{
  "label": "宁武县",
  "value": "140925" },

{
  "label": "静乐县",
  "value": "140926" },

{
  "label": "神池县",
  "value": "140927" },

{
  "label": "五寨县",
  "value": "140928" },

{
  "label": "岢岚县",
  "value": "140929" },

{
  "label": "河曲县",
  "value": "140930" },

{
  "label": "保德县",
  "value": "140931" },

{
  "label": "偏关县",
  "value": "140932" },

{
  "label": "五台山风景名胜区",
  "value": "140971" },

{
  "label": "原平市",
  "value": "140981" }],


[{
  "label": "尧都区",
  "value": "141002" },

{
  "label": "曲沃县",
  "value": "141021" },

{
  "label": "翼城县",
  "value": "141022" },

{
  "label": "襄汾县",
  "value": "141023" },

{
  "label": "洪洞县",
  "value": "141024" },

{
  "label": "古县",
  "value": "141025" },

{
  "label": "安泽县",
  "value": "141026" },

{
  "label": "浮山县",
  "value": "141027" },

{
  "label": "吉县",
  "value": "141028" },

{
  "label": "乡宁县",
  "value": "141029" },

{
  "label": "大宁县",
  "value": "141030" },

{
  "label": "隰县",
  "value": "141031" },

{
  "label": "永和县",
  "value": "141032" },

{
  "label": "蒲县",
  "value": "141033" },

{
  "label": "汾西县",
  "value": "141034" },

{
  "label": "侯马市",
  "value": "141081" },

{
  "label": "霍州市",
  "value": "141082" }],


[{
  "label": "离石区",
  "value": "141102" },

{
  "label": "文水县",
  "value": "141121" },

{
  "label": "交城县",
  "value": "141122" },

{
  "label": "兴县",
  "value": "141123" },

{
  "label": "临县",
  "value": "141124" },

{
  "label": "柳林县",
  "value": "141125" },

{
  "label": "石楼县",
  "value": "141126" },

{
  "label": "岚县",
  "value": "141127" },

{
  "label": "方山县",
  "value": "141128" },

{
  "label": "中阳县",
  "value": "141129" },

{
  "label": "交口县",
  "value": "141130" },

{
  "label": "孝义市",
  "value": "141181" },

{
  "label": "汾阳市",
  "value": "141182" }]],



[
[{
  "label": "新城区",
  "value": "150102" },

{
  "label": "回民区",
  "value": "150103" },

{
  "label": "玉泉区",
  "value": "150104" },

{
  "label": "赛罕区",
  "value": "150105" },

{
  "label": "土默特左旗",
  "value": "150121" },

{
  "label": "托克托县",
  "value": "150122" },

{
  "label": "和林格尔县",
  "value": "150123" },

{
  "label": "清水河县",
  "value": "150124" },

{
  "label": "武川县",
  "value": "150125" },

{
  "label": "呼和浩特金海工业园区",
  "value": "150171" },

{
  "label": "呼和浩特经济技术开发区",
  "value": "150172" }],


[{
  "label": "东河区",
  "value": "150202" },

{
  "label": "昆都仑区",
  "value": "150203" },

{
  "label": "青山区",
  "value": "150204" },

{
  "label": "石拐区",
  "value": "150205" },

{
  "label": "白云鄂博矿区",
  "value": "150206" },

{
  "label": "九原区",
  "value": "150207" },

{
  "label": "土默特右旗",
  "value": "150221" },

{
  "label": "固阳县",
  "value": "150222" },

{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },

{
  "label": "包头稀土高新技术产业开发区",
  "value": "150271" }],


[{
  "label": "海勃湾区",
  "value": "150302" },

{
  "label": "海南区",
  "value": "150303" },

{
  "label": "乌达区",
  "value": "150304" }],


[{
  "label": "红山区",
  "value": "150402" },

{
  "label": "元宝山区",
  "value": "150403" },

{
  "label": "松山区",
  "value": "150404" },

{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },

{
  "label": "巴林左旗",
  "value": "150422" },

{
  "label": "巴林右旗",
  "value": "150423" },

{
  "label": "林西县",
  "value": "150424" },

{
  "label": "克什克腾旗",
  "value": "150425" },

{
  "label": "翁牛特旗",
  "value": "150426" },

{
  "label": "喀喇沁旗",
  "value": "150428" },

{
  "label": "宁城县",
  "value": "150429" },

{
  "label": "敖汉旗",
  "value": "150430" }],


[{
  "label": "科尔沁区",
  "value": "150502" },

{
  "label": "科尔沁左翼中旗",
  "value": "150521" },

{
  "label": "科尔沁左翼后旗",
  "value": "150522" },

{
  "label": "开鲁县",
  "value": "150523" },

{
  "label": "库伦旗",
  "value": "150524" },

{
  "label": "奈曼旗",
  "value": "150525" },

{
  "label": "扎鲁特旗",
  "value": "150526" },

{
  "label": "通辽经济技术开发区",
  "value": "150571" },

{
  "label": "霍林郭勒市",
  "value": "150581" }],


[{
  "label": "东胜区",
  "value": "150602" },

{
  "label": "康巴什区",
  "value": "150603" },

{
  "label": "达拉特旗",
  "value": "150621" },

{
  "label": "准格尔旗",
  "value": "150622" },

{
  "label": "鄂托克前旗",
  "value": "150623" },

{
  "label": "鄂托克旗",
  "value": "150624" },

{
  "label": "杭锦旗",
  "value": "150625" },

{
  "label": "乌审旗",
  "value": "150626" },

{
  "label": "伊金霍洛旗",
  "value": "150627" }],


[{
  "label": "海拉尔区",
  "value": "150702" },

{
  "label": "扎赉诺尔区",
  "value": "150703" },

{
  "label": "阿荣旗",
  "value": "150721" },

{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },

{
  "label": "鄂伦春自治旗",
  "value": "150723" },

{
  "label": "鄂温克族自治旗",
  "value": "150724" },

{
  "label": "陈巴尔虎旗",
  "value": "150725" },

{
  "label": "新巴尔虎左旗",
  "value": "150726" },

{
  "label": "新巴尔虎右旗",
  "value": "150727" },

{
  "label": "满洲里市",
  "value": "150781" },

{
  "label": "牙克石市",
  "value": "150782" },

{
  "label": "扎兰屯市",
  "value": "150783" },

{
  "label": "额尔古纳市",
  "value": "150784" },

{
  "label": "根河市",
  "value": "150785" }],


[{
  "label": "临河区",
  "value": "150802" },

{
  "label": "五原县",
  "value": "150821" },

{
  "label": "磴口县",
  "value": "150822" },

{
  "label": "乌拉特前旗",
  "value": "150823" },

{
  "label": "乌拉特中旗",
  "value": "150824" },

{
  "label": "乌拉特后旗",
  "value": "150825" },

{
  "label": "杭锦后旗",
  "value": "150826" }],


[{
  "label": "集宁区",
  "value": "150902" },

{
  "label": "卓资县",
  "value": "150921" },

{
  "label": "化德县",
  "value": "150922" },

{
  "label": "商都县",
  "value": "150923" },

{
  "label": "兴和县",
  "value": "150924" },

{
  "label": "凉城县",
  "value": "150925" },

{
  "label": "察哈尔右翼前旗",
  "value": "150926" },

{
  "label": "察哈尔右翼中旗",
  "value": "150927" },

{
  "label": "察哈尔右翼后旗",
  "value": "150928" },

{
  "label": "四子王旗",
  "value": "150929" },

{
  "label": "丰镇市",
  "value": "150981" }],


[{
  "label": "乌兰浩特市",
  "value": "152201" },

{
  "label": "阿尔山市",
  "value": "152202" },

{
  "label": "科尔沁右翼前旗",
  "value": "152221" },

{
  "label": "科尔沁右翼中旗",
  "value": "152222" },

{
  "label": "扎赉特旗",
  "value": "152223" },

{
  "label": "突泉县",
  "value": "152224" }],


[{
  "label": "二连浩特市",
  "value": "152501" },

{
  "label": "锡林浩特市",
  "value": "152502" },

{
  "label": "阿巴嘎旗",
  "value": "152522" },

{
  "label": "苏尼特左旗",
  "value": "152523" },

{
  "label": "苏尼特右旗",
  "value": "152524" },

{
  "label": "东乌珠穆沁旗",
  "value": "152525" },

{
  "label": "西乌珠穆沁旗",
  "value": "152526" },

{
  "label": "太仆寺旗",
  "value": "152527" },

{
  "label": "镶黄旗",
  "value": "152528" },

{
  "label": "正镶白旗",
  "value": "152529" },

{
  "label": "正蓝旗",
  "value": "152530" },

{
  "label": "多伦县",
  "value": "152531" },

{
  "label": "乌拉盖管委会",
  "value": "152571" }],


[{
  "label": "阿拉善左旗",
  "value": "152921" },

{
  "label": "阿拉善右旗",
  "value": "152922" },

{
  "label": "额济纳旗",
  "value": "152923" },

{
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971" }]],



[
[{
  "label": "和平区",
  "value": "210102" },

{
  "label": "沈河区",
  "value": "210103" },

{
  "label": "大东区",
  "value": "210104" },

{
  "label": "皇姑区",
  "value": "210105" },

{
  "label": "铁西区",
  "value": "210106" },

{
  "label": "苏家屯区",
  "value": "210111" },

{
  "label": "浑南区",
  "value": "210112" },

{
  "label": "沈北新区",
  "value": "210113" },

{
  "label": "于洪区",
  "value": "210114" },

{
  "label": "辽中区",
  "value": "210115" },

{
  "label": "康平县",
  "value": "210123" },

{
  "label": "法库县",
  "value": "210124" },

{
  "label": "新民市",
  "value": "210181" }],


[{
  "label": "中山区",
  "value": "210202" },

{
  "label": "西岗区",
  "value": "210203" },

{
  "label": "沙河口区",
  "value": "210204" },

{
  "label": "甘井子区",
  "value": "210211" },

{
  "label": "旅顺口区",
  "value": "210212" },

{
  "label": "金州区",
  "value": "210213" },

{
  "label": "普兰店区",
  "value": "210214" },

{
  "label": "长海县",
  "value": "210224" },

{
  "label": "瓦房店市",
  "value": "210281" },

{
  "label": "庄河市",
  "value": "210283" }],


[{
  "label": "铁东区",
  "value": "210302" },

{
  "label": "铁西区",
  "value": "210303" },

{
  "label": "立山区",
  "value": "210304" },

{
  "label": "千山区",
  "value": "210311" },

{
  "label": "台安县",
  "value": "210321" },

{
  "label": "岫岩满族自治县",
  "value": "210323" },

{
  "label": "海城市",
  "value": "210381" }],


[{
  "label": "新抚区",
  "value": "210402" },

{
  "label": "东洲区",
  "value": "210403" },

{
  "label": "望花区",
  "value": "210404" },

{
  "label": "顺城区",
  "value": "210411" },

{
  "label": "抚顺县",
  "value": "210421" },

{
  "label": "新宾满族自治县",
  "value": "210422" },

{
  "label": "清原满族自治县",
  "value": "210423" }],


[{
  "label": "平山区",
  "value": "210502" },

{
  "label": "溪湖区",
  "value": "210503" },

{
  "label": "明山区",
  "value": "210504" },

{
  "label": "南芬区",
  "value": "210505" },

{
  "label": "本溪满族自治县",
  "value": "210521" },

{
  "label": "桓仁满族自治县",
  "value": "210522" }],


[{
  "label": "元宝区",
  "value": "210602" },

{
  "label": "振兴区",
  "value": "210603" },

{
  "label": "振安区",
  "value": "210604" },

{
  "label": "宽甸满族自治县",
  "value": "210624" },

{
  "label": "东港市",
  "value": "210681" },

{
  "label": "凤城市",
  "value": "210682" }],


[{
  "label": "古塔区",
  "value": "210702" },

{
  "label": "凌河区",
  "value": "210703" },

{
  "label": "太和区",
  "value": "210711" },

{
  "label": "黑山县",
  "value": "210726" },

{
  "label": "义县",
  "value": "210727" },

{
  "label": "凌海市",
  "value": "210781" },

{
  "label": "北镇市",
  "value": "210782" }],


[{
  "label": "站前区",
  "value": "210802" },

{
  "label": "西市区",
  "value": "210803" },

{
  "label": "鲅鱼圈区",
  "value": "210804" },

{
  "label": "老边区",
  "value": "210811" },

{
  "label": "盖州市",
  "value": "210881" },

{
  "label": "大石桥市",
  "value": "210882" }],


[{
  "label": "海州区",
  "value": "210902" },

{
  "label": "新邱区",
  "value": "210903" },

{
  "label": "太平区",
  "value": "210904" },

{
  "label": "清河门区",
  "value": "210905" },

{
  "label": "细河区",
  "value": "210911" },

{
  "label": "阜新蒙古族自治县",
  "value": "210921" },

{
  "label": "彰武县",
  "value": "210922" }],


[{
  "label": "白塔区",
  "value": "211002" },

{
  "label": "文圣区",
  "value": "211003" },

{
  "label": "宏伟区",
  "value": "211004" },

{
  "label": "弓长岭区",
  "value": "211005" },

{
  "label": "太子河区",
  "value": "211011" },

{
  "label": "辽阳县",
  "value": "211021" },

{
  "label": "灯塔市",
  "value": "211081" }],


[{
  "label": "双台子区",
  "value": "211102" },

{
  "label": "兴隆台区",
  "value": "211103" },

{
  "label": "大洼区",
  "value": "211104" },

{
  "label": "盘山县",
  "value": "211122" }],


[{
  "label": "银州区",
  "value": "211202" },

{
  "label": "清河区",
  "value": "211204" },

{
  "label": "铁岭县",
  "value": "211221" },

{
  "label": "西丰县",
  "value": "211223" },

{
  "label": "昌图县",
  "value": "211224" },

{
  "label": "调兵山市",
  "value": "211281" },

{
  "label": "开原市",
  "value": "211282" }],


[{
  "label": "双塔区",
  "value": "211302" },

{
  "label": "龙城区",
  "value": "211303" },

{
  "label": "朝阳县",
  "value": "211321" },

{
  "label": "建平县",
  "value": "211322" },

{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" },

{
  "label": "北票市",
  "value": "211381" },

{
  "label": "凌源市",
  "value": "211382" }],


[{
  "label": "连山区",
  "value": "211402" },

{
  "label": "龙港区",
  "value": "211403" },

{
  "label": "南票区",
  "value": "211404" },

{
  "label": "绥中县",
  "value": "211421" },

{
  "label": "建昌县",
  "value": "211422" },

{
  "label": "兴城市",
  "value": "211481" }]],



[
[{
  "label": "南关区",
  "value": "220102" },

{
  "label": "宽城区",
  "value": "220103" },

{
  "label": "朝阳区",
  "value": "220104" },

{
  "label": "二道区",
  "value": "220105" },

{
  "label": "绿园区",
  "value": "220106" },

{
  "label": "双阳区",
  "value": "220112" },

{
  "label": "九台区",
  "value": "220113" },

{
  "label": "农安县",
  "value": "220122" },

{
  "label": "长春经济技术开发区",
  "value": "220171" },

{
  "label": "长春净月高新技术产业开发区",
  "value": "220172" },

{
  "label": "长春高新技术产业开发区",
  "value": "220173" },

{
  "label": "长春汽车经济技术开发区",
  "value": "220174" },

{
  "label": "榆树市",
  "value": "220182" },

{
  "label": "德惠市",
  "value": "220183" }],


[{
  "label": "昌邑区",
  "value": "220202" },

{
  "label": "龙潭区",
  "value": "220203" },

{
  "label": "船营区",
  "value": "220204" },

{
  "label": "丰满区",
  "value": "220211" },

{
  "label": "永吉县",
  "value": "220221" },

{
  "label": "吉林经济开发区",
  "value": "220271" },

{
  "label": "吉林高新技术产业开发区",
  "value": "220272" },

{
  "label": "吉林中国新加坡食品区",
  "value": "220273" },

{
  "label": "蛟河市",
  "value": "220281" },

{
  "label": "桦甸市",
  "value": "220282" },

{
  "label": "舒兰市",
  "value": "220283" },

{
  "label": "磐石市",
  "value": "220284" }],


[{
  "label": "铁西区",
  "value": "220302" },

{
  "label": "铁东区",
  "value": "220303" },

{
  "label": "梨树县",
  "value": "220322" },

{
  "label": "伊通满族自治县",
  "value": "220323" },

{
  "label": "公主岭市",
  "value": "220381" },

{
  "label": "双辽市",
  "value": "220382" }],


[{
  "label": "龙山区",
  "value": "220402" },

{
  "label": "西安区",
  "value": "220403" },

{
  "label": "东丰县",
  "value": "220421" },

{
  "label": "东辽县",
  "value": "220422" }],


[{
  "label": "东昌区",
  "value": "220502" },

{
  "label": "二道江区",
  "value": "220503" },

{
  "label": "通化县",
  "value": "220521" },

{
  "label": "辉南县",
  "value": "220523" },

{
  "label": "柳河县",
  "value": "220524" },

{
  "label": "梅河口市",
  "value": "220581" },

{
  "label": "集安市",
  "value": "220582" }],


[{
  "label": "浑江区",
  "value": "220602" },

{
  "label": "江源区",
  "value": "220605" },

{
  "label": "抚松县",
  "value": "220621" },

{
  "label": "靖宇县",
  "value": "220622" },

{
  "label": "长白朝鲜族自治县",
  "value": "220623" },

{
  "label": "临江市",
  "value": "220681" }],


[{
  "label": "宁江区",
  "value": "220702" },

{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },

{
  "label": "长岭县",
  "value": "220722" },

{
  "label": "乾安县",
  "value": "220723" },

{
  "label": "吉林松原经济开发区",
  "value": "220771" },

{
  "label": "扶余市",
  "value": "220781" }],


[{
  "label": "洮北区",
  "value": "220802" },

{
  "label": "镇赉县",
  "value": "220821" },

{
  "label": "通榆县",
  "value": "220822" },

{
  "label": "吉林白城经济开发区",
  "value": "220871" },

{
  "label": "洮南市",
  "value": "220881" },

{
  "label": "大安市",
  "value": "220882" }],


[{
  "label": "延吉市",
  "value": "222401" },

{
  "label": "图们市",
  "value": "222402" },

{
  "label": "敦化市",
  "value": "222403" },

{
  "label": "珲春市",
  "value": "222404" },

{
  "label": "龙井市",
  "value": "222405" },

{
  "label": "和龙市",
  "value": "222406" },

{
  "label": "汪清县",
  "value": "222424" },

{
  "label": "安图县",
  "value": "222426" }]],



[
[{
  "label": "道里区",
  "value": "230102" },

{
  "label": "南岗区",
  "value": "230103" },

{
  "label": "道外区",
  "value": "230104" },

{
  "label": "平房区",
  "value": "230108" },

{
  "label": "松北区",
  "value": "230109" },

{
  "label": "香坊区",
  "value": "230110" },

{
  "label": "呼兰区",
  "value": "230111" },

{
  "label": "阿城区",
  "value": "230112" },

{
  "label": "双城区",
  "value": "230113" },

{
  "label": "依兰县",
  "value": "230123" },

{
  "label": "方正县",
  "value": "230124" },

{
  "label": "宾县",
  "value": "230125" },

{
  "label": "巴彦县",
  "value": "230126" },

{
  "label": "木兰县",
  "value": "230127" },

{
  "label": "通河县",
  "value": "230128" },

{
  "label": "延寿县",
  "value": "230129" },

{
  "label": "尚志市",
  "value": "230183" },

{
  "label": "五常市",
  "value": "230184" }],


[{
  "label": "龙沙区",
  "value": "230202" },

{
  "label": "建华区",
  "value": "230203" },

{
  "label": "铁锋区",
  "value": "230204" },

{
  "label": "昂昂溪区",
  "value": "230205" },

{
  "label": "富拉尔基区",
  "value": "230206" },

{
  "label": "碾子山区",
  "value": "230207" },

{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },

{
  "label": "龙江县",
  "value": "230221" },

{
  "label": "依安县",
  "value": "230223" },

{
  "label": "泰来县",
  "value": "230224" },

{
  "label": "甘南县",
  "value": "230225" },

{
  "label": "富裕县",
  "value": "230227" },

{
  "label": "克山县",
  "value": "230229" },

{
  "label": "克东县",
  "value": "230230" },

{
  "label": "拜泉县",
  "value": "230231" },

{
  "label": "讷河市",
  "value": "230281" }],


[{
  "label": "鸡冠区",
  "value": "230302" },

{
  "label": "恒山区",
  "value": "230303" },

{
  "label": "滴道区",
  "value": "230304" },

{
  "label": "梨树区",
  "value": "230305" },

{
  "label": "城子河区",
  "value": "230306" },

{
  "label": "麻山区",
  "value": "230307" },

{
  "label": "鸡东县",
  "value": "230321" },

{
  "label": "虎林市",
  "value": "230381" },

{
  "label": "密山市",
  "value": "230382" }],


[{
  "label": "向阳区",
  "value": "230402" },

{
  "label": "工农区",
  "value": "230403" },

{
  "label": "南山区",
  "value": "230404" },

{
  "label": "兴安区",
  "value": "230405" },

{
  "label": "东山区",
  "value": "230406" },

{
  "label": "兴山区",
  "value": "230407" },

{
  "label": "萝北县",
  "value": "230421" },

{
  "label": "绥滨县",
  "value": "230422" }],


[{
  "label": "尖山区",
  "value": "230502" },

{
  "label": "岭东区",
  "value": "230503" },

{
  "label": "四方台区",
  "value": "230505" },

{
  "label": "宝山区",
  "value": "230506" },

{
  "label": "集贤县",
  "value": "230521" },

{
  "label": "友谊县",
  "value": "230522" },

{
  "label": "宝清县",
  "value": "230523" },

{
  "label": "饶河县",
  "value": "230524" }],


[{
  "label": "萨尔图区",
  "value": "230602" },

{
  "label": "龙凤区",
  "value": "230603" },

{
  "label": "让胡路区",
  "value": "230604" },

{
  "label": "红岗区",
  "value": "230605" },

{
  "label": "大同区",
  "value": "230606" },

{
  "label": "肇州县",
  "value": "230621" },

{
  "label": "肇源县",
  "value": "230622" },

{
  "label": "林甸县",
  "value": "230623" },

{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },

{
  "label": "大庆高新技术产业开发区",
  "value": "230671" }],


[{
  "label": "伊春区",
  "value": "230702" },

{
  "label": "南岔区",
  "value": "230703" },

{
  "label": "友好区",
  "value": "230704" },

{
  "label": "西林区",
  "value": "230705" },

{
  "label": "翠峦区",
  "value": "230706" },

{
  "label": "新青区",
  "value": "230707" },

{
  "label": "美溪区",
  "value": "230708" },

{
  "label": "金山屯区",
  "value": "230709" },

{
  "label": "五营区",
  "value": "230710" },

{
  "label": "乌马河区",
  "value": "230711" },

{
  "label": "汤旺河区",
  "value": "230712" },

{
  "label": "带岭区",
  "value": "230713" },

{
  "label": "乌伊岭区",
  "value": "230714" },

{
  "label": "红星区",
  "value": "230715" },

{
  "label": "上甘岭区",
  "value": "230716" },

{
  "label": "嘉荫县",
  "value": "230722" },

{
  "label": "铁力市",
  "value": "230781" }],


[{
  "label": "向阳区",
  "value": "230803" },

{
  "label": "前进区",
  "value": "230804" },

{
  "label": "东风区",
  "value": "230805" },

{
  "label": "郊区",
  "value": "230811" },

{
  "label": "桦南县",
  "value": "230822" },

{
  "label": "桦川县",
  "value": "230826" },

{
  "label": "汤原县",
  "value": "230828" },

{
  "label": "同江市",
  "value": "230881" },

{
  "label": "富锦市",
  "value": "230882" },

{
  "label": "抚远市",
  "value": "230883" }],


[{
  "label": "新兴区",
  "value": "230902" },

{
  "label": "桃山区",
  "value": "230903" },

{
  "label": "茄子河区",
  "value": "230904" },

{
  "label": "勃利县",
  "value": "230921" }],


[{
  "label": "东安区",
  "value": "231002" },

{
  "label": "阳明区",
  "value": "231003" },

{
  "label": "爱民区",
  "value": "231004" },

{
  "label": "西安区",
  "value": "231005" },

{
  "label": "林口县",
  "value": "231025" },

{
  "label": "牡丹江经济技术开发区",
  "value": "231071" },

{
  "label": "绥芬河市",
  "value": "231081" },

{
  "label": "海林市",
  "value": "231083" },

{
  "label": "宁安市",
  "value": "231084" },

{
  "label": "穆棱市",
  "value": "231085" },

{
  "label": "东宁市",
  "value": "231086" }],


[{
  "label": "爱辉区",
  "value": "231102" },

{
  "label": "嫩江县",
  "value": "231121" },

{
  "label": "逊克县",
  "value": "231123" },

{
  "label": "孙吴县",
  "value": "231124" },

{
  "label": "北安市",
  "value": "231181" },

{
  "label": "五大连池市",
  "value": "231182" }],


[{
  "label": "北林区",
  "value": "231202" },

{
  "label": "望奎县",
  "value": "231221" },

{
  "label": "兰西县",
  "value": "231222" },

{
  "label": "青冈县",
  "value": "231223" },

{
  "label": "庆安县",
  "value": "231224" },

{
  "label": "明水县",
  "value": "231225" },

{
  "label": "绥棱县",
  "value": "231226" },

{
  "label": "安达市",
  "value": "231281" },

{
  "label": "肇东市",
  "value": "231282" },

{
  "label": "海伦市",
  "value": "231283" }],


[{
  "label": "加格达奇区",
  "value": "232701" },

{
  "label": "松岭区",
  "value": "232702" },

{
  "label": "新林区",
  "value": "232703" },

{
  "label": "呼中区",
  "value": "232704" },

{
  "label": "呼玛县",
  "value": "232721" },

{
  "label": "塔河县",
  "value": "232722" },

{
  "label": "漠河县",
  "value": "232723" }]],



[
[{
  "label": "黄浦区",
  "value": "310101" },

{
  "label": "徐汇区",
  "value": "310104" },

{
  "label": "长宁区",
  "value": "310105" },

{
  "label": "静安区",
  "value": "310106" },

{
  "label": "普陀区",
  "value": "310107" },

{
  "label": "虹口区",
  "value": "310109" },

{
  "label": "杨浦区",
  "value": "310110" },

{
  "label": "闵行区",
  "value": "310112" },

{
  "label": "宝山区",
  "value": "310113" },

{
  "label": "嘉定区",
  "value": "310114" },

{
  "label": "浦东新区",
  "value": "310115" },

{
  "label": "金山区",
  "value": "310116" },

{
  "label": "松江区",
  "value": "310117" },

{
  "label": "青浦区",
  "value": "310118" },

{
  "label": "奉贤区",
  "value": "310120" },

{
  "label": "崇明区",
  "value": "310151" }]],



[
[{
  "label": "玄武区",
  "value": "320102" },

{
  "label": "秦淮区",
  "value": "320104" },

{
  "label": "建邺区",
  "value": "320105" },

{
  "label": "鼓楼区",
  "value": "320106" },

{
  "label": "浦口区",
  "value": "320111" },

{
  "label": "栖霞区",
  "value": "320113" },

{
  "label": "雨花台区",
  "value": "320114" },

{
  "label": "江宁区",
  "value": "320115" },

{
  "label": "六合区",
  "value": "320116" },

{
  "label": "溧水区",
  "value": "320117" },

{
  "label": "高淳区",
  "value": "320118" }],


[{
  "label": "锡山区",
  "value": "320205" },

{
  "label": "惠山区",
  "value": "320206" },

{
  "label": "滨湖区",
  "value": "320211" },

{
  "label": "梁溪区",
  "value": "320213" },

{
  "label": "新吴区",
  "value": "320214" },

{
  "label": "江阴市",
  "value": "320281" },

{
  "label": "宜兴市",
  "value": "320282" }],


[{
  "label": "鼓楼区",
  "value": "320302" },

{
  "label": "云龙区",
  "value": "320303" },

{
  "label": "贾汪区",
  "value": "320305" },

{
  "label": "泉山区",
  "value": "320311" },

{
  "label": "铜山区",
  "value": "320312" },

{
  "label": "丰县",
  "value": "320321" },

{
  "label": "沛县",
  "value": "320322" },

{
  "label": "睢宁县",
  "value": "320324" },

{
  "label": "徐州经济技术开发区",
  "value": "320371" },

{
  "label": "新沂市",
  "value": "320381" },

{
  "label": "邳州市",
  "value": "320382" }],


[{
  "label": "天宁区",
  "value": "320402" },

{
  "label": "钟楼区",
  "value": "320404" },

{
  "label": "新北区",
  "value": "320411" },

{
  "label": "武进区",
  "value": "320412" },

{
  "label": "金坛区",
  "value": "320413" },

{
  "label": "溧阳市",
  "value": "320481" }],


[{
  "label": "虎丘区",
  "value": "320505" },

{
  "label": "吴中区",
  "value": "320506" },

{
  "label": "相城区",
  "value": "320507" },

{
  "label": "姑苏区",
  "value": "320508" },

{
  "label": "吴江区",
  "value": "320509" },

{
  "label": "苏州工业园区",
  "value": "320571" },

{
  "label": "常熟市",
  "value": "320581" },

{
  "label": "张家港市",
  "value": "320582" },

{
  "label": "昆山市",
  "value": "320583" },

{
  "label": "太仓市",
  "value": "320585" }],


[{
  "label": "崇川区",
  "value": "320602" },

{
  "label": "港闸区",
  "value": "320611" },

{
  "label": "通州区",
  "value": "320612" },

{
  "label": "海安县",
  "value": "320621" },

{
  "label": "如东县",
  "value": "320623" },

{
  "label": "南通经济技术开发区",
  "value": "320671" },

{
  "label": "启东市",
  "value": "320681" },

{
  "label": "如皋市",
  "value": "320682" },

{
  "label": "海门市",
  "value": "320684" }],


[{
  "label": "连云区",
  "value": "320703" },

{
  "label": "海州区",
  "value": "320706" },

{
  "label": "赣榆区",
  "value": "320707" },

{
  "label": "东海县",
  "value": "320722" },

{
  "label": "灌云县",
  "value": "320723" },

{
  "label": "灌南县",
  "value": "320724" },

{
  "label": "连云港经济技术开发区",
  "value": "320771" },

{
  "label": "连云港高新技术产业开发区",
  "value": "320772" }],


[{
  "label": "淮安区",
  "value": "320803" },

{
  "label": "淮阴区",
  "value": "320804" },

{
  "label": "清江浦区",
  "value": "320812" },

{
  "label": "洪泽区",
  "value": "320813" },

{
  "label": "涟水县",
  "value": "320826" },

{
  "label": "盱眙县",
  "value": "320830" },

{
  "label": "金湖县",
  "value": "320831" },

{
  "label": "淮安经济技术开发区",
  "value": "320871" }],


[{
  "label": "亭湖区",
  "value": "320902" },

{
  "label": "盐都区",
  "value": "320903" },

{
  "label": "大丰区",
  "value": "320904" },

{
  "label": "响水县",
  "value": "320921" },

{
  "label": "滨海县",
  "value": "320922" },

{
  "label": "阜宁县",
  "value": "320923" },

{
  "label": "射阳县",
  "value": "320924" },

{
  "label": "建湖县",
  "value": "320925" },

{
  "label": "盐城经济技术开发区",
  "value": "320971" },

{
  "label": "东台市",
  "value": "320981" }],


[{
  "label": "广陵区",
  "value": "321002" },

{
  "label": "邗江区",
  "value": "321003" },

{
  "label": "江都区",
  "value": "321012" },

{
  "label": "宝应县",
  "value": "321023" },

{
  "label": "扬州经济技术开发区",
  "value": "321071" },

{
  "label": "仪征市",
  "value": "321081" },

{
  "label": "高邮市",
  "value": "321084" }],


[{
  "label": "京口区",
  "value": "321102" },

{
  "label": "润州区",
  "value": "321111" },

{
  "label": "丹徒区",
  "value": "321112" },

{
  "label": "镇江新区",
  "value": "321171" },

{
  "label": "丹阳市",
  "value": "321181" },

{
  "label": "扬中市",
  "value": "321182" },

{
  "label": "句容市",
  "value": "321183" }],


[{
  "label": "海陵区",
  "value": "321202" },

{
  "label": "高港区",
  "value": "321203" },

{
  "label": "姜堰区",
  "value": "321204" },

{
  "label": "泰州医药高新技术产业开发区",
  "value": "321271" },

{
  "label": "兴化市",
  "value": "321281" },

{
  "label": "靖江市",
  "value": "321282" },

{
  "label": "泰兴市",
  "value": "321283" }],


[{
  "label": "宿城区",
  "value": "321302" },

{
  "label": "宿豫区",
  "value": "321311" },

{
  "label": "沭阳县",
  "value": "321322" },

{
  "label": "泗阳县",
  "value": "321323" },

{
  "label": "泗洪县",
  "value": "321324" },

{
  "label": "宿迁经济技术开发区",
  "value": "321371" }]],



[
[{
  "label": "上城区",
  "value": "330102" },

{
  "label": "下城区",
  "value": "330103" },

{
  "label": "江干区",
  "value": "330104" },

{
  "label": "拱墅区",
  "value": "330105" },

{
  "label": "西湖区",
  "value": "330106" },

{
  "label": "滨江区",
  "value": "330108" },

{
  "label": "萧山区",
  "value": "330109" },

{
  "label": "余杭区",
  "value": "330110" },

{
  "label": "富阳区",
  "value": "330111" },

{
  "label": "临安区",
  "value": "330112" },

{
  "label": "桐庐县",
  "value": "330122" },

{
  "label": "淳安县",
  "value": "330127" },

{
  "label": "建德市",
  "value": "330182" }],


[{
  "label": "海曙区",
  "value": "330203" },

{
  "label": "江北区",
  "value": "330205" },

{
  "label": "北仑区",
  "value": "330206" },

{
  "label": "镇海区",
  "value": "330211" },

{
  "label": "鄞州区",
  "value": "330212" },

{
  "label": "奉化区",
  "value": "330213" },

{
  "label": "象山县",
  "value": "330225" },

{
  "label": "宁海县",
  "value": "330226" },

{
  "label": "余姚市",
  "value": "330281" },

{
  "label": "慈溪市",
  "value": "330282" }],


[{
  "label": "鹿城区",
  "value": "330302" },

{
  "label": "龙湾区",
  "value": "330303" },

{
  "label": "瓯海区",
  "value": "330304" },

{
  "label": "洞头区",
  "value": "330305" },

{
  "label": "永嘉县",
  "value": "330324" },

{
  "label": "平阳县",
  "value": "330326" },

{
  "label": "苍南县",
  "value": "330327" },

{
  "label": "文成县",
  "value": "330328" },

{
  "label": "泰顺县",
  "value": "330329" },

{
  "label": "温州经济技术开发区",
  "value": "330371" },

{
  "label": "瑞安市",
  "value": "330381" },

{
  "label": "乐清市",
  "value": "330382" }],


[{
  "label": "南湖区",
  "value": "330402" },

{
  "label": "秀洲区",
  "value": "330411" },

{
  "label": "嘉善县",
  "value": "330421" },

{
  "label": "海盐县",
  "value": "330424" },

{
  "label": "海宁市",
  "value": "330481" },

{
  "label": "平湖市",
  "value": "330482" },

{
  "label": "桐乡市",
  "value": "330483" }],


[{
  "label": "吴兴区",
  "value": "330502" },

{
  "label": "南浔区",
  "value": "330503" },

{
  "label": "德清县",
  "value": "330521" },

{
  "label": "长兴县",
  "value": "330522" },

{
  "label": "安吉县",
  "value": "330523" }],


[{
  "label": "越城区",
  "value": "330602" },

{
  "label": "柯桥区",
  "value": "330603" },

{
  "label": "上虞区",
  "value": "330604" },

{
  "label": "新昌县",
  "value": "330624" },

{
  "label": "诸暨市",
  "value": "330681" },

{
  "label": "嵊州市",
  "value": "330683" }],


[{
  "label": "婺城区",
  "value": "330702" },

{
  "label": "金东区",
  "value": "330703" },

{
  "label": "武义县",
  "value": "330723" },

{
  "label": "浦江县",
  "value": "330726" },

{
  "label": "磐安县",
  "value": "330727" },

{
  "label": "兰溪市",
  "value": "330781" },

{
  "label": "义乌市",
  "value": "330782" },

{
  "label": "东阳市",
  "value": "330783" },

{
  "label": "永康市",
  "value": "330784" }],


[{
  "label": "柯城区",
  "value": "330802" },

{
  "label": "衢江区",
  "value": "330803" },

{
  "label": "常山县",
  "value": "330822" },

{
  "label": "开化县",
  "value": "330824" },

{
  "label": "龙游县",
  "value": "330825" },

{
  "label": "江山市",
  "value": "330881" }],


[{
  "label": "定海区",
  "value": "330902" },

{
  "label": "普陀区",
  "value": "330903" },

{
  "label": "岱山县",
  "value": "330921" },

{
  "label": "嵊泗县",
  "value": "330922" }],


[{
  "label": "椒江区",
  "value": "331002" },

{
  "label": "黄岩区",
  "value": "331003" },

{
  "label": "路桥区",
  "value": "331004" },

{
  "label": "三门县",
  "value": "331022" },

{
  "label": "天台县",
  "value": "331023" },

{
  "label": "仙居县",
  "value": "331024" },

{
  "label": "温岭市",
  "value": "331081" },

{
  "label": "临海市",
  "value": "331082" },

{
  "label": "玉环市",
  "value": "331083" }],


[{
  "label": "莲都区",
  "value": "331102" },

{
  "label": "青田县",
  "value": "331121" },

{
  "label": "缙云县",
  "value": "331122" },

{
  "label": "遂昌县",
  "value": "331123" },

{
  "label": "松阳县",
  "value": "331124" },

{
  "label": "云和县",
  "value": "331125" },

{
  "label": "庆元县",
  "value": "331126" },

{
  "label": "景宁畲族自治县",
  "value": "331127" },

{
  "label": "龙泉市",
  "value": "331181" }]],



[
[{
  "label": "瑶海区",
  "value": "340102" },

{
  "label": "庐阳区",
  "value": "340103" },

{
  "label": "蜀山区",
  "value": "340104" },

{
  "label": "包河区",
  "value": "340111" },

{
  "label": "长丰县",
  "value": "340121" },

{
  "label": "肥东县",
  "value": "340122" },

{
  "label": "肥西县",
  "value": "340123" },

{
  "label": "庐江县",
  "value": "340124" },

{
  "label": "合肥高新技术产业开发区",
  "value": "340171" },

{
  "label": "合肥经济技术开发区",
  "value": "340172" },

{
  "label": "合肥新站高新技术产业开发区",
  "value": "340173" },

{
  "label": "巢湖市",
  "value": "340181" }],


[{
  "label": "镜湖区",
  "value": "340202" },

{
  "label": "弋江区",
  "value": "340203" },

{
  "label": "鸠江区",
  "value": "340207" },

{
  "label": "三山区",
  "value": "340208" },

{
  "label": "芜湖县",
  "value": "340221" },

{
  "label": "繁昌县",
  "value": "340222" },

{
  "label": "南陵县",
  "value": "340223" },

{
  "label": "无为县",
  "value": "340225" },

{
  "label": "芜湖经济技术开发区",
  "value": "340271" },

{
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272" }],


[{
  "label": "龙子湖区",
  "value": "340302" },

{
  "label": "蚌山区",
  "value": "340303" },

{
  "label": "禹会区",
  "value": "340304" },

{
  "label": "淮上区",
  "value": "340311" },

{
  "label": "怀远县",
  "value": "340321" },

{
  "label": "五河县",
  "value": "340322" },

{
  "label": "固镇县",
  "value": "340323" },

{
  "label": "蚌埠市高新技术开发区",
  "value": "340371" },

{
  "label": "蚌埠市经济开发区",
  "value": "340372" }],


[{
  "label": "大通区",
  "value": "340402" },

{
  "label": "田家庵区",
  "value": "340403" },

{
  "label": "谢家集区",
  "value": "340404" },

{
  "label": "八公山区",
  "value": "340405" },

{
  "label": "潘集区",
  "value": "340406" },

{
  "label": "凤台县",
  "value": "340421" },

{
  "label": "寿县",
  "value": "340422" }],


[{
  "label": "花山区",
  "value": "340503" },

{
  "label": "雨山区",
  "value": "340504" },

{
  "label": "博望区",
  "value": "340506" },

{
  "label": "当涂县",
  "value": "340521" },

{
  "label": "含山县",
  "value": "340522" },

{
  "label": "和县",
  "value": "340523" }],


[{
  "label": "杜集区",
  "value": "340602" },

{
  "label": "相山区",
  "value": "340603" },

{
  "label": "烈山区",
  "value": "340604" },

{
  "label": "濉溪县",
  "value": "340621" }],


[{
  "label": "铜官区",
  "value": "340705" },

{
  "label": "义安区",
  "value": "340706" },

{
  "label": "郊区",
  "value": "340711" },

{
  "label": "枞阳县",
  "value": "340722" }],


[{
  "label": "迎江区",
  "value": "340802" },

{
  "label": "大观区",
  "value": "340803" },

{
  "label": "宜秀区",
  "value": "340811" },

{
  "label": "怀宁县",
  "value": "340822" },

{
  "label": "潜山县",
  "value": "340824" },

{
  "label": "太湖县",
  "value": "340825" },

{
  "label": "宿松县",
  "value": "340826" },

{
  "label": "望江县",
  "value": "340827" },

{
  "label": "岳西县",
  "value": "340828" },

{
  "label": "安徽安庆经济开发区",
  "value": "340871" },

{
  "label": "桐城市",
  "value": "340881" }],


[{
  "label": "屯溪区",
  "value": "341002" },

{
  "label": "黄山区",
  "value": "341003" },

{
  "label": "徽州区",
  "value": "341004" },

{
  "label": "歙县",
  "value": "341021" },

{
  "label": "休宁县",
  "value": "341022" },

{
  "label": "黟县",
  "value": "341023" },

{
  "label": "祁门县",
  "value": "341024" }],


[{
  "label": "琅琊区",
  "value": "341102" },

{
  "label": "南谯区",
  "value": "341103" },

{
  "label": "来安县",
  "value": "341122" },

{
  "label": "全椒县",
  "value": "341124" },

{
  "label": "定远县",
  "value": "341125" },

{
  "label": "凤阳县",
  "value": "341126" },

{
  "label": "苏滁现代产业园",
  "value": "341171" },

{
  "label": "滁州经济技术开发区",
  "value": "341172" },

{
  "label": "天长市",
  "value": "341181" },

{
  "label": "明光市",
  "value": "341182" }],


[{
  "label": "颍州区",
  "value": "341202" },

{
  "label": "颍东区",
  "value": "341203" },

{
  "label": "颍泉区",
  "value": "341204" },

{
  "label": "临泉县",
  "value": "341221" },

{
  "label": "太和县",
  "value": "341222" },

{
  "label": "阜南县",
  "value": "341225" },

{
  "label": "颍上县",
  "value": "341226" },

{
  "label": "阜阳合肥现代产业园区",
  "value": "341271" },

{
  "label": "阜阳经济技术开发区",
  "value": "341272" },

{
  "label": "界首市",
  "value": "341282" }],


[{
  "label": "埇桥区",
  "value": "341302" },

{
  "label": "砀山县",
  "value": "341321" },

{
  "label": "萧县",
  "value": "341322" },

{
  "label": "灵璧县",
  "value": "341323" },

{
  "label": "泗县",
  "value": "341324" },

{
  "label": "宿州马鞍山现代产业园区",
  "value": "341371" },

{
  "label": "宿州经济技术开发区",
  "value": "341372" }],


[{
  "label": "金安区",
  "value": "341502" },

{
  "label": "裕安区",
  "value": "341503" },

{
  "label": "叶集区",
  "value": "341504" },

{
  "label": "霍邱县",
  "value": "341522" },

{
  "label": "舒城县",
  "value": "341523" },

{
  "label": "金寨县",
  "value": "341524" },

{
  "label": "霍山县",
  "value": "341525" }],


[{
  "label": "谯城区",
  "value": "341602" },

{
  "label": "涡阳县",
  "value": "341621" },

{
  "label": "蒙城县",
  "value": "341622" },

{
  "label": "利辛县",
  "value": "341623" }],


[{
  "label": "贵池区",
  "value": "341702" },

{
  "label": "东至县",
  "value": "341721" },

{
  "label": "石台县",
  "value": "341722" },

{
  "label": "青阳县",
  "value": "341723" }],


[{
  "label": "宣州区",
  "value": "341802" },

{
  "label": "郎溪县",
  "value": "341821" },

{
  "label": "广德县",
  "value": "341822" },

{
  "label": "泾县",
  "value": "341823" },

{
  "label": "绩溪县",
  "value": "341824" },

{
  "label": "旌德县",
  "value": "341825" },

{
  "label": "宣城市经济开发区",
  "value": "341871" },

{
  "label": "宁国市",
  "value": "341881" }]],



[
[{
  "label": "鼓楼区",
  "value": "350102" },

{
  "label": "台江区",
  "value": "350103" },

{
  "label": "仓山区",
  "value": "350104" },

{
  "label": "马尾区",
  "value": "350105" },

{
  "label": "晋安区",
  "value": "350111" },

{
  "label": "闽侯县",
  "value": "350121" },

{
  "label": "连江县",
  "value": "350122" },

{
  "label": "罗源县",
  "value": "350123" },

{
  "label": "闽清县",
  "value": "350124" },

{
  "label": "永泰县",
  "value": "350125" },

{
  "label": "平潭县",
  "value": "350128" },

{
  "label": "福清市",
  "value": "350181" },

{
  "label": "长乐市",
  "value": "350182" }],


[{
  "label": "思明区",
  "value": "350203" },

{
  "label": "海沧区",
  "value": "350205" },

{
  "label": "湖里区",
  "value": "350206" },

{
  "label": "集美区",
  "value": "350211" },

{
  "label": "同安区",
  "value": "350212" },

{
  "label": "翔安区",
  "value": "350213" }],


[{
  "label": "城厢区",
  "value": "350302" },

{
  "label": "涵江区",
  "value": "350303" },

{
  "label": "荔城区",
  "value": "350304" },

{
  "label": "秀屿区",
  "value": "350305" },

{
  "label": "仙游县",
  "value": "350322" }],


[{
  "label": "梅列区",
  "value": "350402" },

{
  "label": "三元区",
  "value": "350403" },

{
  "label": "明溪县",
  "value": "350421" },

{
  "label": "清流县",
  "value": "350423" },

{
  "label": "宁化县",
  "value": "350424" },

{
  "label": "大田县",
  "value": "350425" },

{
  "label": "尤溪县",
  "value": "350426" },

{
  "label": "沙县",
  "value": "350427" },

{
  "label": "将乐县",
  "value": "350428" },

{
  "label": "泰宁县",
  "value": "350429" },

{
  "label": "建宁县",
  "value": "350430" },

{
  "label": "永安市",
  "value": "350481" }],


[{
  "label": "鲤城区",
  "value": "350502" },

{
  "label": "丰泽区",
  "value": "350503" },

{
  "label": "洛江区",
  "value": "350504" },

{
  "label": "泉港区",
  "value": "350505" },

{
  "label": "惠安县",
  "value": "350521" },

{
  "label": "安溪县",
  "value": "350524" },

{
  "label": "永春县",
  "value": "350525" },

{
  "label": "德化县",
  "value": "350526" },

{
  "label": "金门县",
  "value": "350527" },

{
  "label": "石狮市",
  "value": "350581" },

{
  "label": "晋江市",
  "value": "350582" },

{
  "label": "南安市",
  "value": "350583" }],


[{
  "label": "芗城区",
  "value": "350602" },

{
  "label": "龙文区",
  "value": "350603" },

{
  "label": "云霄县",
  "value": "350622" },

{
  "label": "漳浦县",
  "value": "350623" },

{
  "label": "诏安县",
  "value": "350624" },

{
  "label": "长泰县",
  "value": "350625" },

{
  "label": "东山县",
  "value": "350626" },

{
  "label": "南靖县",
  "value": "350627" },

{
  "label": "平和县",
  "value": "350628" },

{
  "label": "华安县",
  "value": "350629" },

{
  "label": "龙海市",
  "value": "350681" }],


[{
  "label": "延平区",
  "value": "350702" },

{
  "label": "建阳区",
  "value": "350703" },

{
  "label": "顺昌县",
  "value": "350721" },

{
  "label": "浦城县",
  "value": "350722" },

{
  "label": "光泽县",
  "value": "350723" },

{
  "label": "松溪县",
  "value": "350724" },

{
  "label": "政和县",
  "value": "350725" },

{
  "label": "邵武市",
  "value": "350781" },

{
  "label": "武夷山市",
  "value": "350782" },

{
  "label": "建瓯市",
  "value": "350783" }],


[{
  "label": "新罗区",
  "value": "350802" },

{
  "label": "永定区",
  "value": "350803" },

{
  "label": "长汀县",
  "value": "350821" },

{
  "label": "上杭县",
  "value": "350823" },

{
  "label": "武平县",
  "value": "350824" },

{
  "label": "连城县",
  "value": "350825" },

{
  "label": "漳平市",
  "value": "350881" }],


[{
  "label": "蕉城区",
  "value": "350902" },

{
  "label": "霞浦县",
  "value": "350921" },

{
  "label": "古田县",
  "value": "350922" },

{
  "label": "屏南县",
  "value": "350923" },

{
  "label": "寿宁县",
  "value": "350924" },

{
  "label": "周宁县",
  "value": "350925" },

{
  "label": "柘荣县",
  "value": "350926" },

{
  "label": "福安市",
  "value": "350981" },

{
  "label": "福鼎市",
  "value": "350982" }]],



[
[{
  "label": "东湖区",
  "value": "360102" },

{
  "label": "西湖区",
  "value": "360103" },

{
  "label": "青云谱区",
  "value": "360104" },

{
  "label": "湾里区",
  "value": "360105" },

{
  "label": "青山湖区",
  "value": "360111" },

{
  "label": "新建区",
  "value": "360112" },

{
  "label": "南昌县",
  "value": "360121" },

{
  "label": "安义县",
  "value": "360123" },

{
  "label": "进贤县",
  "value": "360124" }],


[{
  "label": "昌江区",
  "value": "360202" },

{
  "label": "珠山区",
  "value": "360203" },

{
  "label": "浮梁县",
  "value": "360222" },

{
  "label": "乐平市",
  "value": "360281" }],


[{
  "label": "安源区",
  "value": "360302" },

{
  "label": "湘东区",
  "value": "360313" },

{
  "label": "莲花县",
  "value": "360321" },

{
  "label": "上栗县",
  "value": "360322" },

{
  "label": "芦溪县",
  "value": "360323" }],


[{
  "label": "濂溪区",
  "value": "360402" },

{
  "label": "浔阳区",
  "value": "360403" },

{
  "label": "柴桑区",
  "value": "360404" },

{
  "label": "武宁县",
  "value": "360423" },

{
  "label": "修水县",
  "value": "360424" },

{
  "label": "永修县",
  "value": "360425" },

{
  "label": "德安县",
  "value": "360426" },

{
  "label": "都昌县",
  "value": "360428" },

{
  "label": "湖口县",
  "value": "360429" },

{
  "label": "彭泽县",
  "value": "360430" },

{
  "label": "瑞昌市",
  "value": "360481" },

{
  "label": "共青城市",
  "value": "360482" },

{
  "label": "庐山市",
  "value": "360483" }],


[{
  "label": "渝水区",
  "value": "360502" },

{
  "label": "分宜县",
  "value": "360521" }],


[{
  "label": "月湖区",
  "value": "360602" },

{
  "label": "余江县",
  "value": "360622" },

{
  "label": "贵溪市",
  "value": "360681" }],


[{
  "label": "章贡区",
  "value": "360702" },

{
  "label": "南康区",
  "value": "360703" },

{
  "label": "赣县区",
  "value": "360704" },

{
  "label": "信丰县",
  "value": "360722" },

{
  "label": "大余县",
  "value": "360723" },

{
  "label": "上犹县",
  "value": "360724" },

{
  "label": "崇义县",
  "value": "360725" },

{
  "label": "安远县",
  "value": "360726" },

{
  "label": "龙南县",
  "value": "360727" },

{
  "label": "定南县",
  "value": "360728" },

{
  "label": "全南县",
  "value": "360729" },

{
  "label": "宁都县",
  "value": "360730" },

{
  "label": "于都县",
  "value": "360731" },

{
  "label": "兴国县",
  "value": "360732" },

{
  "label": "会昌县",
  "value": "360733" },

{
  "label": "寻乌县",
  "value": "360734" },

{
  "label": "石城县",
  "value": "360735" },

{
  "label": "瑞金市",
  "value": "360781" }],


[{
  "label": "吉州区",
  "value": "360802" },

{
  "label": "青原区",
  "value": "360803" },

{
  "label": "吉安县",
  "value": "360821" },

{
  "label": "吉水县",
  "value": "360822" },

{
  "label": "峡江县",
  "value": "360823" },

{
  "label": "新干县",
  "value": "360824" },

{
  "label": "永丰县",
  "value": "360825" },

{
  "label": "泰和县",
  "value": "360826" },

{
  "label": "遂川县",
  "value": "360827" },

{
  "label": "万安县",
  "value": "360828" },

{
  "label": "安福县",
  "value": "360829" },

{
  "label": "永新县",
  "value": "360830" },

{
  "label": "井冈山市",
  "value": "360881" }],


[{
  "label": "袁州区",
  "value": "360902" },

{
  "label": "奉新县",
  "value": "360921" },

{
  "label": "万载县",
  "value": "360922" },

{
  "label": "上高县",
  "value": "360923" },

{
  "label": "宜丰县",
  "value": "360924" },

{
  "label": "靖安县",
  "value": "360925" },

{
  "label": "铜鼓县",
  "value": "360926" },

{
  "label": "丰城市",
  "value": "360981" },

{
  "label": "樟树市",
  "value": "360982" },

{
  "label": "高安市",
  "value": "360983" }],


[{
  "label": "临川区",
  "value": "361002" },

{
  "label": "东乡区",
  "value": "361003" },

{
  "label": "南城县",
  "value": "361021" },

{
  "label": "黎川县",
  "value": "361022" },

{
  "label": "南丰县",
  "value": "361023" },

{
  "label": "崇仁县",
  "value": "361024" },

{
  "label": "乐安县",
  "value": "361025" },

{
  "label": "宜黄县",
  "value": "361026" },

{
  "label": "金溪县",
  "value": "361027" },

{
  "label": "资溪县",
  "value": "361028" },

{
  "label": "广昌县",
  "value": "361030" }],


[{
  "label": "信州区",
  "value": "361102" },

{
  "label": "广丰区",
  "value": "361103" },

{
  "label": "上饶县",
  "value": "361121" },

{
  "label": "玉山县",
  "value": "361123" },

{
  "label": "铅山县",
  "value": "361124" },

{
  "label": "横峰县",
  "value": "361125" },

{
  "label": "弋阳县",
  "value": "361126" },

{
  "label": "余干县",
  "value": "361127" },

{
  "label": "鄱阳县",
  "value": "361128" },

{
  "label": "万年县",
  "value": "361129" },

{
  "label": "婺源县",
  "value": "361130" },

{
  "label": "德兴市",
  "value": "361181" }]],



[
[{
  "label": "历下区",
  "value": "370102" },

{
  "label": "市中区",
  "value": "370103" },

{
  "label": "槐荫区",
  "value": "370104" },

{
  "label": "天桥区",
  "value": "370105" },

{
  "label": "历城区",
  "value": "370112" },

{
  "label": "长清区",
  "value": "370113" },

{
  "label": "章丘区",
  "value": "370114" },

{
  "label": "平阴县",
  "value": "370124" },

{
  "label": "济阳县",
  "value": "370125" },

{
  "label": "商河县",
  "value": "370126" },

{
  "label": "济南高新技术产业开发区",
  "value": "370171" }],


[{
  "label": "市南区",
  "value": "370202" },

{
  "label": "市北区",
  "value": "370203" },

{
  "label": "黄岛区",
  "value": "370211" },

{
  "label": "崂山区",
  "value": "370212" },

{
  "label": "李沧区",
  "value": "370213" },

{
  "label": "城阳区",
  "value": "370214" },

{
  "label": "即墨区",
  "value": "370215" },

{
  "label": "青岛高新技术产业开发区",
  "value": "370271" },

{
  "label": "胶州市",
  "value": "370281" },

{
  "label": "平度市",
  "value": "370283" },

{
  "label": "莱西市",
  "value": "370285" }],


[{
  "label": "淄川区",
  "value": "370302" },

{
  "label": "张店区",
  "value": "370303" },

{
  "label": "博山区",
  "value": "370304" },

{
  "label": "临淄区",
  "value": "370305" },

{
  "label": "周村区",
  "value": "370306" },

{
  "label": "桓台县",
  "value": "370321" },

{
  "label": "高青县",
  "value": "370322" },

{
  "label": "沂源县",
  "value": "370323" }],


[{
  "label": "市中区",
  "value": "370402" },

{
  "label": "薛城区",
  "value": "370403" },

{
  "label": "峄城区",
  "value": "370404" },

{
  "label": "台儿庄区",
  "value": "370405" },

{
  "label": "山亭区",
  "value": "370406" },

{
  "label": "滕州市",
  "value": "370481" }],


[{
  "label": "东营区",
  "value": "370502" },

{
  "label": "河口区",
  "value": "370503" },

{
  "label": "垦利区",
  "value": "370505" },

{
  "label": "利津县",
  "value": "370522" },

{
  "label": "广饶县",
  "value": "370523" },

{
  "label": "东营经济技术开发区",
  "value": "370571" },

{
  "label": "东营港经济开发区",
  "value": "370572" }],


[{
  "label": "芝罘区",
  "value": "370602" },

{
  "label": "福山区",
  "value": "370611" },

{
  "label": "牟平区",
  "value": "370612" },

{
  "label": "莱山区",
  "value": "370613" },

{
  "label": "长岛县",
  "value": "370634" },

{
  "label": "烟台高新技术产业开发区",
  "value": "370671" },

{
  "label": "烟台经济技术开发区",
  "value": "370672" },

{
  "label": "龙口市",
  "value": "370681" },

{
  "label": "莱阳市",
  "value": "370682" },

{
  "label": "莱州市",
  "value": "370683" },

{
  "label": "蓬莱市",
  "value": "370684" },

{
  "label": "招远市",
  "value": "370685" },

{
  "label": "栖霞市",
  "value": "370686" },

{
  "label": "海阳市",
  "value": "370687" }],


[{
  "label": "潍城区",
  "value": "370702" },

{
  "label": "寒亭区",
  "value": "370703" },

{
  "label": "坊子区",
  "value": "370704" },

{
  "label": "奎文区",
  "value": "370705" },

{
  "label": "临朐县",
  "value": "370724" },

{
  "label": "昌乐县",
  "value": "370725" },

{
  "label": "潍坊滨海经济技术开发区",
  "value": "370772" },

{
  "label": "青州市",
  "value": "370781" },

{
  "label": "诸城市",
  "value": "370782" },

{
  "label": "寿光市",
  "value": "370783" },

{
  "label": "安丘市",
  "value": "370784" },

{
  "label": "高密市",
  "value": "370785" },

{
  "label": "昌邑市",
  "value": "370786" }],


[{
  "label": "任城区",
  "value": "370811" },

{
  "label": "兖州区",
  "value": "370812" },

{
  "label": "微山县",
  "value": "370826" },

{
  "label": "鱼台县",
  "value": "370827" },

{
  "label": "金乡县",
  "value": "370828" },

{
  "label": "嘉祥县",
  "value": "370829" },

{
  "label": "汶上县",
  "value": "370830" },

{
  "label": "泗水县",
  "value": "370831" },

{
  "label": "梁山县",
  "value": "370832" },

{
  "label": "济宁高新技术产业开发区",
  "value": "370871" },

{
  "label": "曲阜市",
  "value": "370881" },

{
  "label": "邹城市",
  "value": "370883" }],


[{
  "label": "泰山区",
  "value": "370902" },

{
  "label": "岱岳区",
  "value": "370911" },

{
  "label": "宁阳县",
  "value": "370921" },

{
  "label": "东平县",
  "value": "370923" },

{
  "label": "新泰市",
  "value": "370982" },

{
  "label": "肥城市",
  "value": "370983" }],


[{
  "label": "环翠区",
  "value": "371002" },

{
  "label": "文登区",
  "value": "371003" },

{
  "label": "威海火炬高技术产业开发区",
  "value": "371071" },

{
  "label": "威海经济技术开发区",
  "value": "371072" },

{
  "label": "威海临港经济技术开发区",
  "value": "371073" },

{
  "label": "荣成市",
  "value": "371082" },

{
  "label": "乳山市",
  "value": "371083" }],


[{
  "label": "东港区",
  "value": "371102" },

{
  "label": "岚山区",
  "value": "371103" },

{
  "label": "五莲县",
  "value": "371121" },

{
  "label": "莒县",
  "value": "371122" },

{
  "label": "日照经济技术开发区",
  "value": "371171" },

{
  "label": "日照国际海洋城",
  "value": "371172" }],


[{
  "label": "莱城区",
  "value": "371202" },

{
  "label": "钢城区",
  "value": "371203" }],


[{
  "label": "兰山区",
  "value": "371302" },

{
  "label": "罗庄区",
  "value": "371311" },

{
  "label": "河东区",
  "value": "371312" },

{
  "label": "沂南县",
  "value": "371321" },

{
  "label": "郯城县",
  "value": "371322" },

{
  "label": "沂水县",
  "value": "371323" },

{
  "label": "兰陵县",
  "value": "371324" },

{
  "label": "费县",
  "value": "371325" },

{
  "label": "平邑县",
  "value": "371326" },

{
  "label": "莒南县",
  "value": "371327" },

{
  "label": "蒙阴县",
  "value": "371328" },

{
  "label": "临沭县",
  "value": "371329" },

{
  "label": "临沂高新技术产业开发区",
  "value": "371371" },

{
  "label": "临沂经济技术开发区",
  "value": "371372" },

{
  "label": "临沂临港经济开发区",
  "value": "371373" }],


[{
  "label": "德城区",
  "value": "371402" },

{
  "label": "陵城区",
  "value": "371403" },

{
  "label": "宁津县",
  "value": "371422" },

{
  "label": "庆云县",
  "value": "371423" },

{
  "label": "临邑县",
  "value": "371424" },

{
  "label": "齐河县",
  "value": "371425" },

{
  "label": "平原县",
  "value": "371426" },

{
  "label": "夏津县",
  "value": "371427" },

{
  "label": "武城县",
  "value": "371428" },

{
  "label": "德州经济技术开发区",
  "value": "371471" },

{
  "label": "德州运河经济开发区",
  "value": "371472" },

{
  "label": "乐陵市",
  "value": "371481" },

{
  "label": "禹城市",
  "value": "371482" }],


[{
  "label": "东昌府区",
  "value": "371502" },

{
  "label": "阳谷县",
  "value": "371521" },

{
  "label": "莘县",
  "value": "371522" },

{
  "label": "茌平县",
  "value": "371523" },

{
  "label": "东阿县",
  "value": "371524" },

{
  "label": "冠县",
  "value": "371525" },

{
  "label": "高唐县",
  "value": "371526" },

{
  "label": "临清市",
  "value": "371581" }],


[{
  "label": "滨城区",
  "value": "371602" },

{
  "label": "沾化区",
  "value": "371603" },

{
  "label": "惠民县",
  "value": "371621" },

{
  "label": "阳信县",
  "value": "371622" },

{
  "label": "无棣县",
  "value": "371623" },

{
  "label": "博兴县",
  "value": "371625" },

{
  "label": "邹平县",
  "value": "371626" }],


[{
  "label": "牡丹区",
  "value": "371702" },

{
  "label": "定陶区",
  "value": "371703" },

{
  "label": "曹县",
  "value": "371721" },

{
  "label": "单县",
  "value": "371722" },

{
  "label": "成武县",
  "value": "371723" },

{
  "label": "巨野县",
  "value": "371724" },

{
  "label": "郓城县",
  "value": "371725" },

{
  "label": "鄄城县",
  "value": "371726" },

{
  "label": "东明县",
  "value": "371728" },

{
  "label": "菏泽经济技术开发区",
  "value": "371771" },

{
  "label": "菏泽高新技术开发区",
  "value": "371772" }]],



[
[{
  "label": "中原区",
  "value": "410102" },

{
  "label": "二七区",
  "value": "410103" },

{
  "label": "管城回族区",
  "value": "410104" },

{
  "label": "金水区",
  "value": "410105" },

{
  "label": "上街区",
  "value": "410106" },

{
  "label": "惠济区",
  "value": "410108" },

{
  "label": "中牟县",
  "value": "410122" },

{
  "label": "郑州经济技术开发区",
  "value": "410171" },

{
  "label": "郑州高新技术产业开发区",
  "value": "410172" },

{
  "label": "郑州航空港经济综合实验区",
  "value": "410173" },

{
  "label": "巩义市",
  "value": "410181" },

{
  "label": "荥阳市",
  "value": "410182" },

{
  "label": "新密市",
  "value": "410183" },

{
  "label": "新郑市",
  "value": "410184" },

{
  "label": "登封市",
  "value": "410185" }],


[{
  "label": "龙亭区",
  "value": "410202" },

{
  "label": "顺河回族区",
  "value": "410203" },

{
  "label": "鼓楼区",
  "value": "410204" },

{
  "label": "禹王台区",
  "value": "410205" },

{
  "label": "祥符区",
  "value": "410212" },

{
  "label": "杞县",
  "value": "410221" },

{
  "label": "通许县",
  "value": "410222" },

{
  "label": "尉氏县",
  "value": "410223" },

{
  "label": "兰考县",
  "value": "410225" }],


[{
  "label": "老城区",
  "value": "410302" },

{
  "label": "西工区",
  "value": "410303" },

{
  "label": "瀍河回族区",
  "value": "410304" },

{
  "label": "涧西区",
  "value": "410305" },

{
  "label": "吉利区",
  "value": "410306" },

{
  "label": "洛龙区",
  "value": "410311" },

{
  "label": "孟津县",
  "value": "410322" },

{
  "label": "新安县",
  "value": "410323" },

{
  "label": "栾川县",
  "value": "410324" },

{
  "label": "嵩县",
  "value": "410325" },

{
  "label": "汝阳县",
  "value": "410326" },

{
  "label": "宜阳县",
  "value": "410327" },

{
  "label": "洛宁县",
  "value": "410328" },

{
  "label": "伊川县",
  "value": "410329" },

{
  "label": "洛阳高新技术产业开发区",
  "value": "410371" },

{
  "label": "偃师市",
  "value": "410381" }],


[{
  "label": "新华区",
  "value": "410402" },

{
  "label": "卫东区",
  "value": "410403" },

{
  "label": "石龙区",
  "value": "410404" },

{
  "label": "湛河区",
  "value": "410411" },

{
  "label": "宝丰县",
  "value": "410421" },

{
  "label": "叶县",
  "value": "410422" },

{
  "label": "鲁山县",
  "value": "410423" },

{
  "label": "郏县",
  "value": "410425" },

{
  "label": "平顶山高新技术产业开发区",
  "value": "410471" },

{
  "label": "平顶山市新城区",
  "value": "410472" },

{
  "label": "舞钢市",
  "value": "410481" },

{
  "label": "汝州市",
  "value": "410482" }],


[{
  "label": "文峰区",
  "value": "410502" },

{
  "label": "北关区",
  "value": "410503" },

{
  "label": "殷都区",
  "value": "410505" },

{
  "label": "龙安区",
  "value": "410506" },

{
  "label": "安阳县",
  "value": "410522" },

{
  "label": "汤阴县",
  "value": "410523" },

{
  "label": "滑县",
  "value": "410526" },

{
  "label": "内黄县",
  "value": "410527" },

{
  "label": "安阳高新技术产业开发区",
  "value": "410571" },

{
  "label": "林州市",
  "value": "410581" }],


[{
  "label": "鹤山区",
  "value": "410602" },

{
  "label": "山城区",
  "value": "410603" },

{
  "label": "淇滨区",
  "value": "410611" },

{
  "label": "浚县",
  "value": "410621" },

{
  "label": "淇县",
  "value": "410622" },

{
  "label": "鹤壁经济技术开发区",
  "value": "410671" }],


[{
  "label": "红旗区",
  "value": "410702" },

{
  "label": "卫滨区",
  "value": "410703" },

{
  "label": "凤泉区",
  "value": "410704" },

{
  "label": "牧野区",
  "value": "410711" },

{
  "label": "新乡县",
  "value": "410721" },

{
  "label": "获嘉县",
  "value": "410724" },

{
  "label": "原阳县",
  "value": "410725" },

{
  "label": "延津县",
  "value": "410726" },

{
  "label": "封丘县",
  "value": "410727" },

{
  "label": "长垣县",
  "value": "410728" },

{
  "label": "新乡高新技术产业开发区",
  "value": "410771" },

{
  "label": "新乡经济技术开发区",
  "value": "410772" },

{
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773" },

{
  "label": "卫辉市",
  "value": "410781" },

{
  "label": "辉县市",
  "value": "410782" }],


[{
  "label": "解放区",
  "value": "410802" },

{
  "label": "中站区",
  "value": "410803" },

{
  "label": "马村区",
  "value": "410804" },

{
  "label": "山阳区",
  "value": "410811" },

{
  "label": "修武县",
  "value": "410821" },

{
  "label": "博爱县",
  "value": "410822" },

{
  "label": "武陟县",
  "value": "410823" },

{
  "label": "温县",
  "value": "410825" },

{
  "label": "焦作城乡一体化示范区",
  "value": "410871" },

{
  "label": "沁阳市",
  "value": "410882" },

{
  "label": "孟州市",
  "value": "410883" }],


[{
  "label": "华龙区",
  "value": "410902" },

{
  "label": "清丰县",
  "value": "410922" },

{
  "label": "南乐县",
  "value": "410923" },

{
  "label": "范县",
  "value": "410926" },

{
  "label": "台前县",
  "value": "410927" },

{
  "label": "濮阳县",
  "value": "410928" },

{
  "label": "河南濮阳工业园区",
  "value": "410971" },

{
  "label": "濮阳经济技术开发区",
  "value": "410972" }],


[{
  "label": "魏都区",
  "value": "411002" },

{
  "label": "建安区",
  "value": "411003" },

{
  "label": "鄢陵县",
  "value": "411024" },

{
  "label": "襄城县",
  "value": "411025" },

{
  "label": "许昌经济技术开发区",
  "value": "411071" },

{
  "label": "禹州市",
  "value": "411081" },

{
  "label": "长葛市",
  "value": "411082" }],


[{
  "label": "源汇区",
  "value": "411102" },

{
  "label": "郾城区",
  "value": "411103" },

{
  "label": "召陵区",
  "value": "411104" },

{
  "label": "舞阳县",
  "value": "411121" },

{
  "label": "临颍县",
  "value": "411122" },

{
  "label": "漯河经济技术开发区",
  "value": "411171" }],


[{
  "label": "湖滨区",
  "value": "411202" },

{
  "label": "陕州区",
  "value": "411203" },

{
  "label": "渑池县",
  "value": "411221" },

{
  "label": "卢氏县",
  "value": "411224" },

{
  "label": "河南三门峡经济开发区",
  "value": "411271" },

{
  "label": "义马市",
  "value": "411281" },

{
  "label": "灵宝市",
  "value": "411282" }],


[{
  "label": "宛城区",
  "value": "411302" },

{
  "label": "卧龙区",
  "value": "411303" },

{
  "label": "南召县",
  "value": "411321" },

{
  "label": "方城县",
  "value": "411322" },

{
  "label": "西峡县",
  "value": "411323" },

{
  "label": "镇平县",
  "value": "411324" },

{
  "label": "内乡县",
  "value": "411325" },

{
  "label": "淅川县",
  "value": "411326" },

{
  "label": "社旗县",
  "value": "411327" },

{
  "label": "唐河县",
  "value": "411328" },

{
  "label": "新野县",
  "value": "411329" },

{
  "label": "桐柏县",
  "value": "411330" },

{
  "label": "南阳高新技术产业开发区",
  "value": "411371" },

{
  "label": "南阳市城乡一体化示范区",
  "value": "411372" },

{
  "label": "邓州市",
  "value": "411381" }],


[{
  "label": "梁园区",
  "value": "411402" },

{
  "label": "睢阳区",
  "value": "411403" },

{
  "label": "民权县",
  "value": "411421" },

{
  "label": "睢县",
  "value": "411422" },

{
  "label": "宁陵县",
  "value": "411423" },

{
  "label": "柘城县",
  "value": "411424" },

{
  "label": "虞城县",
  "value": "411425" },

{
  "label": "夏邑县",
  "value": "411426" },

{
  "label": "豫东综合物流产业聚集区",
  "value": "411471" },

{
  "label": "河南商丘经济开发区",
  "value": "411472" },

{
  "label": "永城市",
  "value": "411481" }],


[{
  "label": "浉河区",
  "value": "411502" },

{
  "label": "平桥区",
  "value": "411503" },

{
  "label": "罗山县",
  "value": "411521" },

{
  "label": "光山县",
  "value": "411522" },

{
  "label": "新县",
  "value": "411523" },

{
  "label": "商城县",
  "value": "411524" },

{
  "label": "固始县",
  "value": "411525" },

{
  "label": "潢川县",
  "value": "411526" },

{
  "label": "淮滨县",
  "value": "411527" },

{
  "label": "息县",
  "value": "411528" },

{
  "label": "信阳高新技术产业开发区",
  "value": "411571" }],


[{
  "label": "川汇区",
  "value": "411602" },

{
  "label": "扶沟县",
  "value": "411621" },

{
  "label": "西华县",
  "value": "411622" },

{
  "label": "商水县",
  "value": "411623" },

{
  "label": "沈丘县",
  "value": "411624" },

{
  "label": "郸城县",
  "value": "411625" },

{
  "label": "淮阳县",
  "value": "411626" },

{
  "label": "太康县",
  "value": "411627" },

{
  "label": "鹿邑县",
  "value": "411628" },

{
  "label": "河南周口经济开发区",
  "value": "411671" },

{
  "label": "项城市",
  "value": "411681" }],


[{
  "label": "驿城区",
  "value": "411702" },

{
  "label": "西平县",
  "value": "411721" },

{
  "label": "上蔡县",
  "value": "411722" },

{
  "label": "平舆县",
  "value": "411723" },

{
  "label": "正阳县",
  "value": "411724" },

{
  "label": "确山县",
  "value": "411725" },

{
  "label": "泌阳县",
  "value": "411726" },

{
  "label": "汝南县",
  "value": "411727" },

{
  "label": "遂平县",
  "value": "411728" },

{
  "label": "新蔡县",
  "value": "411729" },

{
  "label": "河南驻马店经济开发区",
  "value": "411771" }],


[{
  "label": "济源市",
  "value": "419001" }]],


[
[{
  "label": "江岸区",
  "value": "420102" },

{
  "label": "江汉区",
  "value": "420103" },

{
  "label": "硚口区",
  "value": "420104" },

{
  "label": "汉阳区",
  "value": "420105" },

{
  "label": "武昌区",
  "value": "420106" },

{
  "label": "青山区",
  "value": "420107" },

{
  "label": "洪山区",
  "value": "420111" },

{
  "label": "东西湖区",
  "value": "420112" },

{
  "label": "汉南区",
  "value": "420113" },

{
  "label": "蔡甸区",
  "value": "420114" },

{
  "label": "江夏区",
  "value": "420115" },

{
  "label": "黄陂区",
  "value": "420116" },

{
  "label": "新洲区",
  "value": "420117" }],


[{
  "label": "黄石港区",
  "value": "420202" },

{
  "label": "西塞山区",
  "value": "420203" },

{
  "label": "下陆区",
  "value": "420204" },

{
  "label": "铁山区",
  "value": "420205" },

{
  "label": "阳新县",
  "value": "420222" },

{
  "label": "大冶市",
  "value": "420281" }],


[{
  "label": "茅箭区",
  "value": "420302" },

{
  "label": "张湾区",
  "value": "420303" },

{
  "label": "郧阳区",
  "value": "420304" },

{
  "label": "郧西县",
  "value": "420322" },

{
  "label": "竹山县",
  "value": "420323" },

{
  "label": "竹溪县",
  "value": "420324" },

{
  "label": "房县",
  "value": "420325" },

{
  "label": "丹江口市",
  "value": "420381" }],


[{
  "label": "西陵区",
  "value": "420502" },

{
  "label": "伍家岗区",
  "value": "420503" },

{
  "label": "点军区",
  "value": "420504" },

{
  "label": "猇亭区",
  "value": "420505" },

{
  "label": "夷陵区",
  "value": "420506" },

{
  "label": "远安县",
  "value": "420525" },

{
  "label": "兴山县",
  "value": "420526" },

{
  "label": "秭归县",
  "value": "420527" },

{
  "label": "长阳土家族自治县",
  "value": "420528" },

{
  "label": "五峰土家族自治县",
  "value": "420529" },

{
  "label": "宜都市",
  "value": "420581" },

{
  "label": "当阳市",
  "value": "420582" },

{
  "label": "枝江市",
  "value": "420583" }],


[{
  "label": "襄城区",
  "value": "420602" },

{
  "label": "樊城区",
  "value": "420606" },

{
  "label": "襄州区",
  "value": "420607" },

{
  "label": "南漳县",
  "value": "420624" },

{
  "label": "谷城县",
  "value": "420625" },

{
  "label": "保康县",
  "value": "420626" },

{
  "label": "老河口市",
  "value": "420682" },

{
  "label": "枣阳市",
  "value": "420683" },

{
  "label": "宜城市",
  "value": "420684" }],


[{
  "label": "梁子湖区",
  "value": "420702" },

{
  "label": "华容区",
  "value": "420703" },

{
  "label": "鄂城区",
  "value": "420704" }],


[{
  "label": "东宝区",
  "value": "420802" },

{
  "label": "掇刀区",
  "value": "420804" },

{
  "label": "京山县",
  "value": "420821" },

{
  "label": "沙洋县",
  "value": "420822" },

{
  "label": "钟祥市",
  "value": "420881" }],


[{
  "label": "孝南区",
  "value": "420902" },

{
  "label": "孝昌县",
  "value": "420921" },

{
  "label": "大悟县",
  "value": "420922" },

{
  "label": "云梦县",
  "value": "420923" },

{
  "label": "应城市",
  "value": "420981" },

{
  "label": "安陆市",
  "value": "420982" },

{
  "label": "汉川市",
  "value": "420984" }],


[{
  "label": "沙市区",
  "value": "421002" },

{
  "label": "荆州区",
  "value": "421003" },

{
  "label": "公安县",
  "value": "421022" },

{
  "label": "监利县",
  "value": "421023" },

{
  "label": "江陵县",
  "value": "421024" },

{
  "label": "荆州经济技术开发区",
  "value": "421071" },

{
  "label": "石首市",
  "value": "421081" },

{
  "label": "洪湖市",
  "value": "421083" },

{
  "label": "松滋市",
  "value": "421087" }],


[{
  "label": "黄州区",
  "value": "421102" },

{
  "label": "团风县",
  "value": "421121" },

{
  "label": "红安县",
  "value": "421122" },

{
  "label": "罗田县",
  "value": "421123" },

{
  "label": "英山县",
  "value": "421124" },

{
  "label": "浠水县",
  "value": "421125" },

{
  "label": "蕲春县",
  "value": "421126" },

{
  "label": "黄梅县",
  "value": "421127" },

{
  "label": "龙感湖管理区",
  "value": "421171" },

{
  "label": "麻城市",
  "value": "421181" },

{
  "label": "武穴市",
  "value": "421182" }],


[{
  "label": "咸安区",
  "value": "421202" },

{
  "label": "嘉鱼县",
  "value": "421221" },

{
  "label": "通城县",
  "value": "421222" },

{
  "label": "崇阳县",
  "value": "421223" },

{
  "label": "通山县",
  "value": "421224" },

{
  "label": "赤壁市",
  "value": "421281" }],


[{
  "label": "曾都区",
  "value": "421303" },

{
  "label": "随县",
  "value": "421321" },

{
  "label": "广水市",
  "value": "421381" }],


[{
  "label": "恩施市",
  "value": "422801" },

{
  "label": "利川市",
  "value": "422802" },

{
  "label": "建始县",
  "value": "422822" },

{
  "label": "巴东县",
  "value": "422823" },

{
  "label": "宣恩县",
  "value": "422825" },

{
  "label": "咸丰县",
  "value": "422826" },

{
  "label": "来凤县",
  "value": "422827" },

{
  "label": "鹤峰县",
  "value": "422828" }],


[{
  "label": "仙桃市",
  "value": "429004" },

{
  "label": "潜江市",
  "value": "429005" },

{
  "label": "天门市",
  "value": "429006" },

{
  "label": "神农架林区",
  "value": "429021" }]],



[
[{
  "label": "芙蓉区",
  "value": "430102" },

{
  "label": "天心区",
  "value": "430103" },

{
  "label": "岳麓区",
  "value": "430104" },

{
  "label": "开福区",
  "value": "430105" },

{
  "label": "雨花区",
  "value": "430111" },

{
  "label": "望城区",
  "value": "430112" },

{
  "label": "长沙县",
  "value": "430121" },

{
  "label": "浏阳市",
  "value": "430181" },

{
  "label": "宁乡市",
  "value": "430182" }],


[{
  "label": "荷塘区",
  "value": "430202" },

{
  "label": "芦淞区",
  "value": "430203" },

{
  "label": "石峰区",
  "value": "430204" },

{
  "label": "天元区",
  "value": "430211" },

{
  "label": "株洲县",
  "value": "430221" },

{
  "label": "攸县",
  "value": "430223" },

{
  "label": "茶陵县",
  "value": "430224" },

{
  "label": "炎陵县",
  "value": "430225" },

{
  "label": "云龙示范区",
  "value": "430271" },

{
  "label": "醴陵市",
  "value": "430281" }],


[{
  "label": "雨湖区",
  "value": "430302" },

{
  "label": "岳塘区",
  "value": "430304" },

{
  "label": "湘潭县",
  "value": "430321" },

{
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371" },

{
  "label": "湘潭昭山示范区",
  "value": "430372" },

{
  "label": "湘潭九华示范区",
  "value": "430373" },

{
  "label": "湘乡市",
  "value": "430381" },

{
  "label": "韶山市",
  "value": "430382" }],


[{
  "label": "珠晖区",
  "value": "430405" },

{
  "label": "雁峰区",
  "value": "430406" },

{
  "label": "石鼓区",
  "value": "430407" },

{
  "label": "蒸湘区",
  "value": "430408" },

{
  "label": "南岳区",
  "value": "430412" },

{
  "label": "衡阳县",
  "value": "430421" },

{
  "label": "衡南县",
  "value": "430422" },

{
  "label": "衡山县",
  "value": "430423" },

{
  "label": "衡东县",
  "value": "430424" },

{
  "label": "祁东县",
  "value": "430426" },

{
  "label": "衡阳综合保税区",
  "value": "430471" },

{
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472" },

{
  "label": "湖南衡阳松木经济开发区",
  "value": "430473" },

{
  "label": "耒阳市",
  "value": "430481" },

{
  "label": "常宁市",
  "value": "430482" }],


[{
  "label": "双清区",
  "value": "430502" },

{
  "label": "大祥区",
  "value": "430503" },

{
  "label": "北塔区",
  "value": "430511" },

{
  "label": "邵东县",
  "value": "430521" },

{
  "label": "新邵县",
  "value": "430522" },

{
  "label": "邵阳县",
  "value": "430523" },

{
  "label": "隆回县",
  "value": "430524" },

{
  "label": "洞口县",
  "value": "430525" },

{
  "label": "绥宁县",
  "value": "430527" },

{
  "label": "新宁县",
  "value": "430528" },

{
  "label": "城步苗族自治县",
  "value": "430529" },

{
  "label": "武冈市",
  "value": "430581" }],


[{
  "label": "岳阳楼区",
  "value": "430602" },

{
  "label": "云溪区",
  "value": "430603" },

{
  "label": "君山区",
  "value": "430611" },

{
  "label": "岳阳县",
  "value": "430621" },

{
  "label": "华容县",
  "value": "430623" },

{
  "label": "湘阴县",
  "value": "430624" },

{
  "label": "平江县",
  "value": "430626" },

{
  "label": "岳阳市屈原管理区",
  "value": "430671" },

{
  "label": "汨罗市",
  "value": "430681" },

{
  "label": "临湘市",
  "value": "430682" }],


[{
  "label": "武陵区",
  "value": "430702" },

{
  "label": "鼎城区",
  "value": "430703" },

{
  "label": "安乡县",
  "value": "430721" },

{
  "label": "汉寿县",
  "value": "430722" },

{
  "label": "澧县",
  "value": "430723" },

{
  "label": "临澧县",
  "value": "430724" },

{
  "label": "桃源县",
  "value": "430725" },

{
  "label": "石门县",
  "value": "430726" },

{
  "label": "常德市西洞庭管理区",
  "value": "430771" },

{
  "label": "津市市",
  "value": "430781" }],


[{
  "label": "永定区",
  "value": "430802" },

{
  "label": "武陵源区",
  "value": "430811" },

{
  "label": "慈利县",
  "value": "430821" },

{
  "label": "桑植县",
  "value": "430822" }],


[{
  "label": "资阳区",
  "value": "430902" },

{
  "label": "赫山区",
  "value": "430903" },

{
  "label": "南县",
  "value": "430921" },

{
  "label": "桃江县",
  "value": "430922" },

{
  "label": "安化县",
  "value": "430923" },

{
  "label": "益阳市大通湖管理区",
  "value": "430971" },

{
  "label": "湖南益阳高新技术产业园区",
  "value": "430972" },

{
  "label": "沅江市",
  "value": "430981" }],


[{
  "label": "北湖区",
  "value": "431002" },

{
  "label": "苏仙区",
  "value": "431003" },

{
  "label": "桂阳县",
  "value": "431021" },

{
  "label": "宜章县",
  "value": "431022" },

{
  "label": "永兴县",
  "value": "431023" },

{
  "label": "嘉禾县",
  "value": "431024" },

{
  "label": "临武县",
  "value": "431025" },

{
  "label": "汝城县",
  "value": "431026" },

{
  "label": "桂东县",
  "value": "431027" },

{
  "label": "安仁县",
  "value": "431028" },

{
  "label": "资兴市",
  "value": "431081" }],


[{
  "label": "零陵区",
  "value": "431102" },

{
  "label": "冷水滩区",
  "value": "431103" },

{
  "label": "祁阳县",
  "value": "431121" },

{
  "label": "东安县",
  "value": "431122" },

{
  "label": "双牌县",
  "value": "431123" },

{
  "label": "道县",
  "value": "431124" },

{
  "label": "江永县",
  "value": "431125" },

{
  "label": "宁远县",
  "value": "431126" },

{
  "label": "蓝山县",
  "value": "431127" },

{
  "label": "新田县",
  "value": "431128" },

{
  "label": "江华瑶族自治县",
  "value": "431129" },

{
  "label": "永州经济技术开发区",
  "value": "431171" },

{
  "label": "永州市金洞管理区",
  "value": "431172" },

{
  "label": "永州市回龙圩管理区",
  "value": "431173" }],


[{
  "label": "鹤城区",
  "value": "431202" },

{
  "label": "中方县",
  "value": "431221" },

{
  "label": "沅陵县",
  "value": "431222" },

{
  "label": "辰溪县",
  "value": "431223" },

{
  "label": "溆浦县",
  "value": "431224" },

{
  "label": "会同县",
  "value": "431225" },

{
  "label": "麻阳苗族自治县",
  "value": "431226" },

{
  "label": "新晃侗族自治县",
  "value": "431227" },

{
  "label": "芷江侗族自治县",
  "value": "431228" },

{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },

{
  "label": "通道侗族自治县",
  "value": "431230" },

{
  "label": "怀化市洪江管理区",
  "value": "431271" },

{
  "label": "洪江市",
  "value": "431281" }],


[{
  "label": "娄星区",
  "value": "431302" },

{
  "label": "双峰县",
  "value": "431321" },

{
  "label": "新化县",
  "value": "431322" },

{
  "label": "冷水江市",
  "value": "431381" },

{
  "label": "涟源市",
  "value": "431382" }],


[{
  "label": "吉首市",
  "value": "433101" },

{
  "label": "泸溪县",
  "value": "433122" },

{
  "label": "凤凰县",
  "value": "433123" },

{
  "label": "花垣县",
  "value": "433124" },

{
  "label": "保靖县",
  "value": "433125" },

{
  "label": "古丈县",
  "value": "433126" },

{
  "label": "永顺县",
  "value": "433127" },

{
  "label": "龙山县",
  "value": "433130" },

{
  "label": "湖南吉首经济开发区",
  "value": "433172" },

{
  "label": "湖南永顺经济开发区",
  "value": "433173" }]],



[
[{
  "label": "荔湾区",
  "value": "440103" },

{
  "label": "越秀区",
  "value": "440104" },

{
  "label": "海珠区",
  "value": "440105" },

{
  "label": "天河区",
  "value": "440106" },

{
  "label": "白云区",
  "value": "440111" },

{
  "label": "黄埔区",
  "value": "440112" },

{
  "label": "番禺区",
  "value": "440113" },

{
  "label": "花都区",
  "value": "440114" },

{
  "label": "南沙区",
  "value": "440115" },

{
  "label": "从化区",
  "value": "440117" },

{
  "label": "增城区",
  "value": "440118" }],


[{
  "label": "武江区",
  "value": "440203" },

{
  "label": "浈江区",
  "value": "440204" },

{
  "label": "曲江区",
  "value": "440205" },

{
  "label": "始兴县",
  "value": "440222" },

{
  "label": "仁化县",
  "value": "440224" },

{
  "label": "翁源县",
  "value": "440229" },

{
  "label": "乳源瑶族自治县",
  "value": "440232" },

{
  "label": "新丰县",
  "value": "440233" },

{
  "label": "乐昌市",
  "value": "440281" },

{
  "label": "南雄市",
  "value": "440282" }],


[{
  "label": "罗湖区",
  "value": "440303" },

{
  "label": "福田区",
  "value": "440304" },

{
  "label": "南山区",
  "value": "440305" },

{
  "label": "宝安区",
  "value": "440306" },

{
  "label": "龙岗区",
  "value": "440307" },

{
  "label": "盐田区",
  "value": "440308" },

{
  "label": "龙华区",
  "value": "440309" },

{
  "label": "坪山区",
  "value": "440310" }],


[{
  "label": "香洲区",
  "value": "440402" },

{
  "label": "斗门区",
  "value": "440403" },

{
  "label": "金湾区",
  "value": "440404" }],


[{
  "label": "龙湖区",
  "value": "440507" },

{
  "label": "金平区",
  "value": "440511" },

{
  "label": "濠江区",
  "value": "440512" },

{
  "label": "潮阳区",
  "value": "440513" },

{
  "label": "潮南区",
  "value": "440514" },

{
  "label": "澄海区",
  "value": "440515" },

{
  "label": "南澳县",
  "value": "440523" }],


[{
  "label": "禅城区",
  "value": "440604" },

{
  "label": "南海区",
  "value": "440605" },

{
  "label": "顺德区",
  "value": "440606" },

{
  "label": "三水区",
  "value": "440607" },

{
  "label": "高明区",
  "value": "440608" }],


[{
  "label": "蓬江区",
  "value": "440703" },

{
  "label": "江海区",
  "value": "440704" },

{
  "label": "新会区",
  "value": "440705" },

{
  "label": "台山市",
  "value": "440781" },

{
  "label": "开平市",
  "value": "440783" },

{
  "label": "鹤山市",
  "value": "440784" },

{
  "label": "恩平市",
  "value": "440785" }],


[{
  "label": "赤坎区",
  "value": "440802" },

{
  "label": "霞山区",
  "value": "440803" },

{
  "label": "坡头区",
  "value": "440804" },

{
  "label": "麻章区",
  "value": "440811" },

{
  "label": "遂溪县",
  "value": "440823" },

{
  "label": "徐闻县",
  "value": "440825" },

{
  "label": "廉江市",
  "value": "440881" },

{
  "label": "雷州市",
  "value": "440882" },

{
  "label": "吴川市",
  "value": "440883" }],


[{
  "label": "茂南区",
  "value": "440902" },

{
  "label": "电白区",
  "value": "440904" },

{
  "label": "高州市",
  "value": "440981" },

{
  "label": "化州市",
  "value": "440982" },

{
  "label": "信宜市",
  "value": "440983" }],


[{
  "label": "端州区",
  "value": "441202" },

{
  "label": "鼎湖区",
  "value": "441203" },

{
  "label": "高要区",
  "value": "441204" },

{
  "label": "广宁县",
  "value": "441223" },

{
  "label": "怀集县",
  "value": "441224" },

{
  "label": "封开县",
  "value": "441225" },

{
  "label": "德庆县",
  "value": "441226" },

{
  "label": "四会市",
  "value": "441284" }],


[{
  "label": "惠城区",
  "value": "441302" },

{
  "label": "惠阳区",
  "value": "441303" },

{
  "label": "博罗县",
  "value": "441322" },

{
  "label": "惠东县",
  "value": "441323" },

{
  "label": "龙门县",
  "value": "441324" }],


[{
  "label": "梅江区",
  "value": "441402" },

{
  "label": "梅县区",
  "value": "441403" },

{
  "label": "大埔县",
  "value": "441422" },

{
  "label": "丰顺县",
  "value": "441423" },

{
  "label": "五华县",
  "value": "441424" },

{
  "label": "平远县",
  "value": "441426" },

{
  "label": "蕉岭县",
  "value": "441427" },

{
  "label": "兴宁市",
  "value": "441481" }],


[{
  "label": "城区",
  "value": "441502" },

{
  "label": "海丰县",
  "value": "441521" },

{
  "label": "陆河县",
  "value": "441523" },

{
  "label": "陆丰市",
  "value": "441581" }],


[{
  "label": "源城区",
  "value": "441602" },

{
  "label": "紫金县",
  "value": "441621" },

{
  "label": "龙川县",
  "value": "441622" },

{
  "label": "连平县",
  "value": "441623" },

{
  "label": "和平县",
  "value": "441624" },

{
  "label": "东源县",
  "value": "441625" }],


[{
  "label": "江城区",
  "value": "441702" },

{
  "label": "阳东区",
  "value": "441704" },

{
  "label": "阳西县",
  "value": "441721" },

{
  "label": "阳春市",
  "value": "441781" }],


[{
  "label": "清城区",
  "value": "441802" },

{
  "label": "清新区",
  "value": "441803" },

{
  "label": "佛冈县",
  "value": "441821" },

{
  "label": "阳山县",
  "value": "441823" },

{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },

{
  "label": "连南瑶族自治县",
  "value": "441826" },

{
  "label": "英德市",
  "value": "441881" },

{
  "label": "连州市",
  "value": "441882" }],


[{
  "label": "东莞市",
  "value": "441900" }],

[{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "湘桥区",
  "value": "445102" },

{
  "label": "潮安区",
  "value": "445103" },

{
  "label": "饶平县",
  "value": "445122" }],


[{
  "label": "榕城区",
  "value": "445202" },

{
  "label": "揭东区",
  "value": "445203" },

{
  "label": "揭西县",
  "value": "445222" },

{
  "label": "惠来县",
  "value": "445224" },

{
  "label": "普宁市",
  "value": "445281" }],


[{
  "label": "云城区",
  "value": "445302" },

{
  "label": "云安区",
  "value": "445303" },

{
  "label": "新兴县",
  "value": "445321" },

{
  "label": "郁南县",
  "value": "445322" },

{
  "label": "罗定市",
  "value": "445381" }]],



[
[{
  "label": "兴宁区",
  "value": "450102" },

{
  "label": "青秀区",
  "value": "450103" },

{
  "label": "江南区",
  "value": "450105" },

{
  "label": "西乡塘区",
  "value": "450107" },

{
  "label": "良庆区",
  "value": "450108" },

{
  "label": "邕宁区",
  "value": "450109" },

{
  "label": "武鸣区",
  "value": "450110" },

{
  "label": "隆安县",
  "value": "450123" },

{
  "label": "马山县",
  "value": "450124" },

{
  "label": "上林县",
  "value": "450125" },

{
  "label": "宾阳县",
  "value": "450126" },

{
  "label": "横县",
  "value": "450127" }],


[{
  "label": "城中区",
  "value": "450202" },

{
  "label": "鱼峰区",
  "value": "450203" },

{
  "label": "柳南区",
  "value": "450204" },

{
  "label": "柳北区",
  "value": "450205" },

{
  "label": "柳江区",
  "value": "450206" },

{
  "label": "柳城县",
  "value": "450222" },

{
  "label": "鹿寨县",
  "value": "450223" },

{
  "label": "融安县",
  "value": "450224" },

{
  "label": "融水苗族自治县",
  "value": "450225" },

{
  "label": "三江侗族自治县",
  "value": "450226" }],


[{
  "label": "秀峰区",
  "value": "450302" },

{
  "label": "叠彩区",
  "value": "450303" },

{
  "label": "象山区",
  "value": "450304" },

{
  "label": "七星区",
  "value": "450305" },

{
  "label": "雁山区",
  "value": "450311" },

{
  "label": "临桂区",
  "value": "450312" },

{
  "label": "阳朔县",
  "value": "450321" },

{
  "label": "灵川县",
  "value": "450323" },

{
  "label": "全州县",
  "value": "450324" },

{
  "label": "兴安县",
  "value": "450325" },

{
  "label": "永福县",
  "value": "450326" },

{
  "label": "灌阳县",
  "value": "450327" },

{
  "label": "龙胜各族自治县",
  "value": "450328" },

{
  "label": "资源县",
  "value": "450329" },

{
  "label": "平乐县",
  "value": "450330" },

{
  "label": "荔浦县",
  "value": "450331" },

{
  "label": "恭城瑶族自治县",
  "value": "450332" }],


[{
  "label": "万秀区",
  "value": "450403" },

{
  "label": "长洲区",
  "value": "450405" },

{
  "label": "龙圩区",
  "value": "450406" },

{
  "label": "苍梧县",
  "value": "450421" },

{
  "label": "藤县",
  "value": "450422" },

{
  "label": "蒙山县",
  "value": "450423" },

{
  "label": "岑溪市",
  "value": "450481" }],


[{
  "label": "海城区",
  "value": "450502" },

{
  "label": "银海区",
  "value": "450503" },

{
  "label": "铁山港区",
  "value": "450512" },

{
  "label": "合浦县",
  "value": "450521" }],


[{
  "label": "港口区",
  "value": "450602" },

{
  "label": "防城区",
  "value": "450603" },

{
  "label": "上思县",
  "value": "450621" },

{
  "label": "东兴市",
  "value": "450681" }],


[{
  "label": "钦南区",
  "value": "450702" },

{
  "label": "钦北区",
  "value": "450703" },

{
  "label": "灵山县",
  "value": "450721" },

{
  "label": "浦北县",
  "value": "450722" }],


[{
  "label": "港北区",
  "value": "450802" },

{
  "label": "港南区",
  "value": "450803" },

{
  "label": "覃塘区",
  "value": "450804" },

{
  "label": "平南县",
  "value": "450821" },

{
  "label": "桂平市",
  "value": "450881" }],


[{
  "label": "玉州区",
  "value": "450902" },

{
  "label": "福绵区",
  "value": "450903" },

{
  "label": "容县",
  "value": "450921" },

{
  "label": "陆川县",
  "value": "450922" },

{
  "label": "博白县",
  "value": "450923" },

{
  "label": "兴业县",
  "value": "450924" },

{
  "label": "北流市",
  "value": "450981" }],


[{
  "label": "右江区",
  "value": "451002" },

{
  "label": "田阳县",
  "value": "451021" },

{
  "label": "田东县",
  "value": "451022" },

{
  "label": "平果县",
  "value": "451023" },

{
  "label": "德保县",
  "value": "451024" },

{
  "label": "那坡县",
  "value": "451026" },

{
  "label": "凌云县",
  "value": "451027" },

{
  "label": "乐业县",
  "value": "451028" },

{
  "label": "田林县",
  "value": "451029" },

{
  "label": "西林县",
  "value": "451030" },

{
  "label": "隆林各族自治县",
  "value": "451031" },

{
  "label": "靖西市",
  "value": "451081" }],


[{
  "label": "八步区",
  "value": "451102" },

{
  "label": "平桂区",
  "value": "451103" },

{
  "label": "昭平县",
  "value": "451121" },

{
  "label": "钟山县",
  "value": "451122" },

{
  "label": "富川瑶族自治县",
  "value": "451123" }],


[{
  "label": "金城江区",
  "value": "451202" },

{
  "label": "宜州区",
  "value": "451203" },

{
  "label": "南丹县",
  "value": "451221" },

{
  "label": "天峨县",
  "value": "451222" },

{
  "label": "凤山县",
  "value": "451223" },

{
  "label": "东兰县",
  "value": "451224" },

{
  "label": "罗城仫佬族自治县",
  "value": "451225" },

{
  "label": "环江毛南族自治县",
  "value": "451226" },

{
  "label": "巴马瑶族自治县",
  "value": "451227" },

{
  "label": "都安瑶族自治县",
  "value": "451228" },

{
  "label": "大化瑶族自治县",
  "value": "451229" }],


[{
  "label": "兴宾区",
  "value": "451302" },

{
  "label": "忻城县",
  "value": "451321" },

{
  "label": "象州县",
  "value": "451322" },

{
  "label": "武宣县",
  "value": "451323" },

{
  "label": "金秀瑶族自治县",
  "value": "451324" },

{
  "label": "合山市",
  "value": "451381" }],


[{
  "label": "江州区",
  "value": "451402" },

{
  "label": "扶绥县",
  "value": "451421" },

{
  "label": "宁明县",
  "value": "451422" },

{
  "label": "龙州县",
  "value": "451423" },

{
  "label": "大新县",
  "value": "451424" },

{
  "label": "天等县",
  "value": "451425" },

{
  "label": "凭祥市",
  "value": "451481" }]],



[
[{
  "label": "秀英区",
  "value": "460105" },

{
  "label": "龙华区",
  "value": "460106" },

{
  "label": "琼山区",
  "value": "460107" },

{
  "label": "美兰区",
  "value": "460108" }],


[{
  "label": "海棠区",
  "value": "460202" },

{
  "label": "吉阳区",
  "value": "460203" },

{
  "label": "天涯区",
  "value": "460204" },

{
  "label": "崖州区",
  "value": "460205" }],


[{
  "label": "西沙群岛",
  "value": "460321" },

{
  "label": "南沙群岛",
  "value": "460322" },

{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" }],


[{
  "label": "儋州市",
  "value": "460400" }],

[{
  "label": "五指山市",
  "value": "469001" },

{
  "label": "琼海市",
  "value": "469002" },

{
  "label": "文昌市",
  "value": "469005" },

{
  "label": "万宁市",
  "value": "469006" },

{
  "label": "东方市",
  "value": "469007" },

{
  "label": "定安县",
  "value": "469021" },

{
  "label": "屯昌县",
  "value": "469022" },

{
  "label": "澄迈县",
  "value": "469023" },

{
  "label": "临高县",
  "value": "469024" },

{
  "label": "白沙黎族自治县",
  "value": "469025" },

{
  "label": "昌江黎族自治县",
  "value": "469026" },

{
  "label": "乐东黎族自治县",
  "value": "469027" },

{
  "label": "陵水黎族自治县",
  "value": "469028" },

{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },

{
  "label": "琼中黎族苗族自治县",
  "value": "469030" }]],



[
[{
  "label": "万州区",
  "value": "500101" },

{
  "label": "涪陵区",
  "value": "500102" },

{
  "label": "渝中区",
  "value": "500103" },

{
  "label": "大渡口区",
  "value": "500104" },

{
  "label": "江北区",
  "value": "500105" },

{
  "label": "沙坪坝区",
  "value": "500106" },

{
  "label": "九龙坡区",
  "value": "500107" },

{
  "label": "南岸区",
  "value": "500108" },

{
  "label": "北碚区",
  "value": "500109" },

{
  "label": "綦江区",
  "value": "500110" },

{
  "label": "大足区",
  "value": "500111" },

{
  "label": "渝北区",
  "value": "500112" },

{
  "label": "巴南区",
  "value": "500113" },

{
  "label": "黔江区",
  "value": "500114" },

{
  "label": "长寿区",
  "value": "500115" },

{
  "label": "江津区",
  "value": "500116" },

{
  "label": "合川区",
  "value": "500117" },

{
  "label": "永川区",
  "value": "500118" },

{
  "label": "南川区",
  "value": "500119" },

{
  "label": "璧山区",
  "value": "500120" },

{
  "label": "铜梁区",
  "value": "500151" },

{
  "label": "潼南区",
  "value": "500152" },

{
  "label": "荣昌区",
  "value": "500153" },

{
  "label": "开州区",
  "value": "500154" },

{
  "label": "梁平区",
  "value": "500155" },

{
  "label": "武隆区",
  "value": "500156" }],


[{
  "label": "城口县",
  "value": "500229" },

{
  "label": "丰都县",
  "value": "500230" },

{
  "label": "垫江县",
  "value": "500231" },

{
  "label": "忠县",
  "value": "500233" },

{
  "label": "云阳县",
  "value": "500235" },

{
  "label": "奉节县",
  "value": "500236" },

{
  "label": "巫山县",
  "value": "500237" },

{
  "label": "巫溪县",
  "value": "500238" },

{
  "label": "石柱土家族自治县",
  "value": "500240" },

{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },

{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },

{
  "label": "彭水苗族土家族自治县",
  "value": "500243" }]],



[
[{
  "label": "锦江区",
  "value": "510104" },

{
  "label": "青羊区",
  "value": "510105" },

{
  "label": "金牛区",
  "value": "510106" },

{
  "label": "武侯区",
  "value": "510107" },

{
  "label": "成华区",
  "value": "510108" },

{
  "label": "龙泉驿区",
  "value": "510112" },

{
  "label": "青白江区",
  "value": "510113" },

{
  "label": "新都区",
  "value": "510114" },

{
  "label": "温江区",
  "value": "510115" },

{
  "label": "双流区",
  "value": "510116" },

{
  "label": "郫都区",
  "value": "510117" },

{
  "label": "金堂县",
  "value": "510121" },

{
  "label": "大邑县",
  "value": "510129" },

{
  "label": "蒲江县",
  "value": "510131" },

{
  "label": "新津县",
  "value": "510132" },

{
  "label": "都江堰市",
  "value": "510181" },

{
  "label": "彭州市",
  "value": "510182" },

{
  "label": "邛崃市",
  "value": "510183" },

{
  "label": "崇州市",
  "value": "510184" },

{
  "label": "简阳市",
  "value": "510185" }],


[{
  "label": "自流井区",
  "value": "510302" },

{
  "label": "贡井区",
  "value": "510303" },

{
  "label": "大安区",
  "value": "510304" },

{
  "label": "沿滩区",
  "value": "510311" },

{
  "label": "荣县",
  "value": "510321" },

{
  "label": "富顺县",
  "value": "510322" }],


[{
  "label": "东区",
  "value": "510402" },

{
  "label": "西区",
  "value": "510403" },

{
  "label": "仁和区",
  "value": "510411" },

{
  "label": "米易县",
  "value": "510421" },

{
  "label": "盐边县",
  "value": "510422" }],


[{
  "label": "江阳区",
  "value": "510502" },

{
  "label": "纳溪区",
  "value": "510503" },

{
  "label": "龙马潭区",
  "value": "510504" },

{
  "label": "泸县",
  "value": "510521" },

{
  "label": "合江县",
  "value": "510522" },

{
  "label": "叙永县",
  "value": "510524" },

{
  "label": "古蔺县",
  "value": "510525" }],


[{
  "label": "旌阳区",
  "value": "510603" },

{
  "label": "罗江区",
  "value": "510604" },

{
  "label": "中江县",
  "value": "510623" },

{
  "label": "广汉市",
  "value": "510681" },

{
  "label": "什邡市",
  "value": "510682" },

{
  "label": "绵竹市",
  "value": "510683" }],


[{
  "label": "涪城区",
  "value": "510703" },

{
  "label": "游仙区",
  "value": "510704" },

{
  "label": "安州区",
  "value": "510705" },

{
  "label": "三台县",
  "value": "510722" },

{
  "label": "盐亭县",
  "value": "510723" },

{
  "label": "梓潼县",
  "value": "510725" },

{
  "label": "北川羌族自治县",
  "value": "510726" },

{
  "label": "平武县",
  "value": "510727" },

{
  "label": "江油市",
  "value": "510781" }],


[{
  "label": "利州区",
  "value": "510802" },

{
  "label": "昭化区",
  "value": "510811" },

{
  "label": "朝天区",
  "value": "510812" },

{
  "label": "旺苍县",
  "value": "510821" },

{
  "label": "青川县",
  "value": "510822" },

{
  "label": "剑阁县",
  "value": "510823" },

{
  "label": "苍溪县",
  "value": "510824" }],


[{
  "label": "船山区",
  "value": "510903" },

{
  "label": "安居区",
  "value": "510904" },

{
  "label": "蓬溪县",
  "value": "510921" },

{
  "label": "射洪县",
  "value": "510922" },

{
  "label": "大英县",
  "value": "510923" }],


[{
  "label": "市中区",
  "value": "511002" },

{
  "label": "东兴区",
  "value": "511011" },

{
  "label": "威远县",
  "value": "511024" },

{
  "label": "资中县",
  "value": "511025" },

{
  "label": "内江经济开发区",
  "value": "511071" },

{
  "label": "隆昌市",
  "value": "511083" }],


[{
  "label": "市中区",
  "value": "511102" },

{
  "label": "沙湾区",
  "value": "511111" },

{
  "label": "五通桥区",
  "value": "511112" },

{
  "label": "金口河区",
  "value": "511113" },

{
  "label": "犍为县",
  "value": "511123" },

{
  "label": "井研县",
  "value": "511124" },

{
  "label": "夹江县",
  "value": "511126" },

{
  "label": "沐川县",
  "value": "511129" },

{
  "label": "峨边彝族自治县",
  "value": "511132" },

{
  "label": "马边彝族自治县",
  "value": "511133" },

{
  "label": "峨眉山市",
  "value": "511181" }],


[{
  "label": "顺庆区",
  "value": "511302" },

{
  "label": "高坪区",
  "value": "511303" },

{
  "label": "嘉陵区",
  "value": "511304" },

{
  "label": "南部县",
  "value": "511321" },

{
  "label": "营山县",
  "value": "511322" },

{
  "label": "蓬安县",
  "value": "511323" },

{
  "label": "仪陇县",
  "value": "511324" },

{
  "label": "西充县",
  "value": "511325" },

{
  "label": "阆中市",
  "value": "511381" }],


[{
  "label": "东坡区",
  "value": "511402" },

{
  "label": "彭山区",
  "value": "511403" },

{
  "label": "仁寿县",
  "value": "511421" },

{
  "label": "洪雅县",
  "value": "511423" },

{
  "label": "丹棱县",
  "value": "511424" },

{
  "label": "青神县",
  "value": "511425" }],


[{
  "label": "翠屏区",
  "value": "511502" },

{
  "label": "南溪区",
  "value": "511503" },

{
  "label": "宜宾县",
  "value": "511521" },

{
  "label": "江安县",
  "value": "511523" },

{
  "label": "长宁县",
  "value": "511524" },

{
  "label": "高县",
  "value": "511525" },

{
  "label": "珙县",
  "value": "511526" },

{
  "label": "筠连县",
  "value": "511527" },

{
  "label": "兴文县",
  "value": "511528" },

{
  "label": "屏山县",
  "value": "511529" }],


[{
  "label": "广安区",
  "value": "511602" },

{
  "label": "前锋区",
  "value": "511603" },

{
  "label": "岳池县",
  "value": "511621" },

{
  "label": "武胜县",
  "value": "511622" },

{
  "label": "邻水县",
  "value": "511623" },

{
  "label": "华蓥市",
  "value": "511681" }],


[{
  "label": "通川区",
  "value": "511702" },

{
  "label": "达川区",
  "value": "511703" },

{
  "label": "宣汉县",
  "value": "511722" },

{
  "label": "开江县",
  "value": "511723" },

{
  "label": "大竹县",
  "value": "511724" },

{
  "label": "渠县",
  "value": "511725" },

{
  "label": "达州经济开发区",
  "value": "511771" },

{
  "label": "万源市",
  "value": "511781" }],


[{
  "label": "雨城区",
  "value": "511802" },

{
  "label": "名山区",
  "value": "511803" },

{
  "label": "荥经县",
  "value": "511822" },

{
  "label": "汉源县",
  "value": "511823" },

{
  "label": "石棉县",
  "value": "511824" },

{
  "label": "天全县",
  "value": "511825" },

{
  "label": "芦山县",
  "value": "511826" },

{
  "label": "宝兴县",
  "value": "511827" }],


[{
  "label": "巴州区",
  "value": "511902" },

{
  "label": "恩阳区",
  "value": "511903" },

{
  "label": "通江县",
  "value": "511921" },

{
  "label": "南江县",
  "value": "511922" },

{
  "label": "平昌县",
  "value": "511923" },

{
  "label": "巴中经济开发区",
  "value": "511971" }],


[{
  "label": "雁江区",
  "value": "512002" },

{
  "label": "安岳县",
  "value": "512021" },

{
  "label": "乐至县",
  "value": "512022" }],


[{
  "label": "马尔康市",
  "value": "513201" },

{
  "label": "汶川县",
  "value": "513221" },

{
  "label": "理县",
  "value": "513222" },

{
  "label": "茂县",
  "value": "513223" },

{
  "label": "松潘县",
  "value": "513224" },

{
  "label": "九寨沟县",
  "value": "513225" },

{
  "label": "金川县",
  "value": "513226" },

{
  "label": "小金县",
  "value": "513227" },

{
  "label": "黑水县",
  "value": "513228" },

{
  "label": "壤塘县",
  "value": "513230" },

{
  "label": "阿坝县",
  "value": "513231" },

{
  "label": "若尔盖县",
  "value": "513232" },

{
  "label": "红原县",
  "value": "513233" }],


[{
  "label": "康定市",
  "value": "513301" },

{
  "label": "泸定县",
  "value": "513322" },

{
  "label": "丹巴县",
  "value": "513323" },

{
  "label": "九龙县",
  "value": "513324" },

{
  "label": "雅江县",
  "value": "513325" },

{
  "label": "道孚县",
  "value": "513326" },

{
  "label": "炉霍县",
  "value": "513327" },

{
  "label": "甘孜县",
  "value": "513328" },

{
  "label": "新龙县",
  "value": "513329" },

{
  "label": "德格县",
  "value": "513330" },

{
  "label": "白玉县",
  "value": "513331" },

{
  "label": "石渠县",
  "value": "513332" },

{
  "label": "色达县",
  "value": "513333" },

{
  "label": "理塘县",
  "value": "513334" },

{
  "label": "巴塘县",
  "value": "513335" },

{
  "label": "乡城县",
  "value": "513336" },

{
  "label": "稻城县",
  "value": "513337" },

{
  "label": "得荣县",
  "value": "513338" }],


[{
  "label": "西昌市",
  "value": "513401" },

{
  "label": "木里藏族自治县",
  "value": "513422" },

{
  "label": "盐源县",
  "value": "513423" },

{
  "label": "德昌县",
  "value": "513424" },

{
  "label": "会理县",
  "value": "513425" },

{
  "label": "会东县",
  "value": "513426" },

{
  "label": "宁南县",
  "value": "513427" },

{
  "label": "普格县",
  "value": "513428" },

{
  "label": "布拖县",
  "value": "513429" },

{
  "label": "金阳县",
  "value": "513430" },

{
  "label": "昭觉县",
  "value": "513431" },

{
  "label": "喜德县",
  "value": "513432" },

{
  "label": "冕宁县",
  "value": "513433" },

{
  "label": "越西县",
  "value": "513434" },

{
  "label": "甘洛县",
  "value": "513435" },

{
  "label": "美姑县",
  "value": "513436" },

{
  "label": "雷波县",
  "value": "513437" }]],



[
[{
  "label": "南明区",
  "value": "520102" },

{
  "label": "云岩区",
  "value": "520103" },

{
  "label": "花溪区",
  "value": "520111" },

{
  "label": "乌当区",
  "value": "520112" },

{
  "label": "白云区",
  "value": "520113" },

{
  "label": "观山湖区",
  "value": "520115" },

{
  "label": "开阳县",
  "value": "520121" },

{
  "label": "息烽县",
  "value": "520122" },

{
  "label": "修文县",
  "value": "520123" },

{
  "label": "清镇市",
  "value": "520181" }],


[{
  "label": "钟山区",
  "value": "520201" },

{
  "label": "六枝特区",
  "value": "520203" },

{
  "label": "水城县",
  "value": "520221" },

{
  "label": "盘州市",
  "value": "520281" }],


[{
  "label": "红花岗区",
  "value": "520302" },

{
  "label": "汇川区",
  "value": "520303" },

{
  "label": "播州区",
  "value": "520304" },

{
  "label": "桐梓县",
  "value": "520322" },

{
  "label": "绥阳县",
  "value": "520323" },

{
  "label": "正安县",
  "value": "520324" },

{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" },

{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },

{
  "label": "凤冈县",
  "value": "520327" },

{
  "label": "湄潭县",
  "value": "520328" },

{
  "label": "余庆县",
  "value": "520329" },

{
  "label": "习水县",
  "value": "520330" },

{
  "label": "赤水市",
  "value": "520381" },

{
  "label": "仁怀市",
  "value": "520382" }],


[{
  "label": "西秀区",
  "value": "520402" },

{
  "label": "平坝区",
  "value": "520403" },

{
  "label": "普定县",
  "value": "520422" },

{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },

{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },

{
  "label": "紫云苗族布依族自治县",
  "value": "520425" }],


[{
  "label": "七星关区",
  "value": "520502" },

{
  "label": "大方县",
  "value": "520521" },

{
  "label": "黔西县",
  "value": "520522" },

{
  "label": "金沙县",
  "value": "520523" },

{
  "label": "织金县",
  "value": "520524" },

{
  "label": "纳雍县",
  "value": "520525" },

{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" },

{
  "label": "赫章县",
  "value": "520527" }],


[{
  "label": "碧江区",
  "value": "520602" },

{
  "label": "万山区",
  "value": "520603" },

{
  "label": "江口县",
  "value": "520621" },

{
  "label": "玉屏侗族自治县",
  "value": "520622" },

{
  "label": "石阡县",
  "value": "520623" },

{
  "label": "思南县",
  "value": "520624" },

{
  "label": "印江土家族苗族自治县",
  "value": "520625" },

{
  "label": "德江县",
  "value": "520626" },

{
  "label": "沿河土家族自治县",
  "value": "520627" },

{
  "label": "松桃苗族自治县",
  "value": "520628" }],


[{
  "label": "兴义市",
  "value": "522301" },

{
  "label": "兴仁县",
  "value": "522322" },

{
  "label": "普安县",
  "value": "522323" },

{
  "label": "晴隆县",
  "value": "522324" },

{
  "label": "贞丰县",
  "value": "522325" },

{
  "label": "望谟县",
  "value": "522326" },

{
  "label": "册亨县",
  "value": "522327" },

{
  "label": "安龙县",
  "value": "522328" }],


[{
  "label": "凯里市",
  "value": "522601" },

{
  "label": "黄平县",
  "value": "522622" },

{
  "label": "施秉县",
  "value": "522623" },

{
  "label": "三穗县",
  "value": "522624" },

{
  "label": "镇远县",
  "value": "522625" },

{
  "label": "岑巩县",
  "value": "522626" },

{
  "label": "天柱县",
  "value": "522627" },

{
  "label": "锦屏县",
  "value": "522628" },

{
  "label": "剑河县",
  "value": "522629" },

{
  "label": "台江县",
  "value": "522630" },

{
  "label": "黎平县",
  "value": "522631" },

{
  "label": "榕江县",
  "value": "522632" },

{
  "label": "从江县",
  "value": "522633" },

{
  "label": "雷山县",
  "value": "522634" },

{
  "label": "麻江县",
  "value": "522635" },

{
  "label": "丹寨县",
  "value": "522636" }],


[{
  "label": "都匀市",
  "value": "522701" },

{
  "label": "福泉市",
  "value": "522702" },

{
  "label": "荔波县",
  "value": "522722" },

{
  "label": "贵定县",
  "value": "522723" },

{
  "label": "瓮安县",
  "value": "522725" },

{
  "label": "独山县",
  "value": "522726" },

{
  "label": "平塘县",
  "value": "522727" },

{
  "label": "罗甸县",
  "value": "522728" },

{
  "label": "长顺县",
  "value": "522729" },

{
  "label": "龙里县",
  "value": "522730" },

{
  "label": "惠水县",
  "value": "522731" },

{
  "label": "三都水族自治县",
  "value": "522732" }]],



[
[{
  "label": "五华区",
  "value": "530102" },

{
  "label": "盘龙区",
  "value": "530103" },

{
  "label": "官渡区",
  "value": "530111" },

{
  "label": "西山区",
  "value": "530112" },

{
  "label": "东川区",
  "value": "530113" },

{
  "label": "呈贡区",
  "value": "530114" },

{
  "label": "晋宁区",
  "value": "530115" },

{
  "label": "富民县",
  "value": "530124" },

{
  "label": "宜良县",
  "value": "530125" },

{
  "label": "石林彝族自治县",
  "value": "530126" },

{
  "label": "嵩明县",
  "value": "530127" },

{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },

{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },

{
  "label": "安宁市",
  "value": "530181" }],


[{
  "label": "麒麟区",
  "value": "530302" },

{
  "label": "沾益区",
  "value": "530303" },

{
  "label": "马龙县",
  "value": "530321" },

{
  "label": "陆良县",
  "value": "530322" },

{
  "label": "师宗县",
  "value": "530323" },

{
  "label": "罗平县",
  "value": "530324" },

{
  "label": "富源县",
  "value": "530325" },

{
  "label": "会泽县",
  "value": "530326" },

{
  "label": "宣威市",
  "value": "530381" }],


[{
  "label": "红塔区",
  "value": "530402" },

{
  "label": "江川区",
  "value": "530403" },

{
  "label": "澄江县",
  "value": "530422" },

{
  "label": "通海县",
  "value": "530423" },

{
  "label": "华宁县",
  "value": "530424" },

{
  "label": "易门县",
  "value": "530425" },

{
  "label": "峨山彝族自治县",
  "value": "530426" },

{
  "label": "新平彝族傣族自治县",
  "value": "530427" },

{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],


[{
  "label": "隆阳区",
  "value": "530502" },

{
  "label": "施甸县",
  "value": "530521" },

{
  "label": "龙陵县",
  "value": "530523" },

{
  "label": "昌宁县",
  "value": "530524" },

{
  "label": "腾冲市",
  "value": "530581" }],


[{
  "label": "昭阳区",
  "value": "530602" },

{
  "label": "鲁甸县",
  "value": "530621" },

{
  "label": "巧家县",
  "value": "530622" },

{
  "label": "盐津县",
  "value": "530623" },

{
  "label": "大关县",
  "value": "530624" },

{
  "label": "永善县",
  "value": "530625" },

{
  "label": "绥江县",
  "value": "530626" },

{
  "label": "镇雄县",
  "value": "530627" },

{
  "label": "彝良县",
  "value": "530628" },

{
  "label": "威信县",
  "value": "530629" },

{
  "label": "水富县",
  "value": "530630" }],


[{
  "label": "古城区",
  "value": "530702" },

{
  "label": "玉龙纳西族自治县",
  "value": "530721" },

{
  "label": "永胜县",
  "value": "530722" },

{
  "label": "华坪县",
  "value": "530723" },

{
  "label": "宁蒗彝族自治县",
  "value": "530724" }],


[{
  "label": "思茅区",
  "value": "530802" },

{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },

{
  "label": "墨江哈尼族自治县",
  "value": "530822" },

{
  "label": "景东彝族自治县",
  "value": "530823" },

{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },

{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },

{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" },

{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },

{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },

{
  "label": "西盟佤族自治县",
  "value": "530829" }],


[{
  "label": "临翔区",
  "value": "530902" },

{
  "label": "凤庆县",
  "value": "530921" },

{
  "label": "云县",
  "value": "530922" },

{
  "label": "永德县",
  "value": "530923" },

{
  "label": "镇康县",
  "value": "530924" },

{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },

{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },

{
  "label": "沧源佤族自治县",
  "value": "530927" }],


[{
  "label": "楚雄市",
  "value": "532301" },

{
  "label": "双柏县",
  "value": "532322" },

{
  "label": "牟定县",
  "value": "532323" },

{
  "label": "南华县",
  "value": "532324" },

{
  "label": "姚安县",
  "value": "532325" },

{
  "label": "大姚县",
  "value": "532326" },

{
  "label": "永仁县",
  "value": "532327" },

{
  "label": "元谋县",
  "value": "532328" },

{
  "label": "武定县",
  "value": "532329" },

{
  "label": "禄丰县",
  "value": "532331" }],


[{
  "label": "个旧市",
  "value": "532501" },

{
  "label": "开远市",
  "value": "532502" },

{
  "label": "蒙自市",
  "value": "532503" },

{
  "label": "弥勒市",
  "value": "532504" },

{
  "label": "屏边苗族自治县",
  "value": "532523" },

{
  "label": "建水县",
  "value": "532524" },

{
  "label": "石屏县",
  "value": "532525" },

{
  "label": "泸西县",
  "value": "532527" },

{
  "label": "元阳县",
  "value": "532528" },

{
  "label": "红河县",
  "value": "532529" },

{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },

{
  "label": "绿春县",
  "value": "532531" },

{
  "label": "河口瑶族自治县",
  "value": "532532" }],


[{
  "label": "文山市",
  "value": "532601" },

{
  "label": "砚山县",
  "value": "532622" },

{
  "label": "西畴县",
  "value": "532623" },

{
  "label": "麻栗坡县",
  "value": "532624" },

{
  "label": "马关县",
  "value": "532625" },

{
  "label": "丘北县",
  "value": "532626" },

{
  "label": "广南县",
  "value": "532627" },

{
  "label": "富宁县",
  "value": "532628" }],


[{
  "label": "景洪市",
  "value": "532801" },

{
  "label": "勐海县",
  "value": "532822" },

{
  "label": "勐腊县",
  "value": "532823" }],


[{
  "label": "大理市",
  "value": "532901" },

{
  "label": "漾濞彝族自治县",
  "value": "532922" },

{
  "label": "祥云县",
  "value": "532923" },

{
  "label": "宾川县",
  "value": "532924" },

{
  "label": "弥渡县",
  "value": "532925" },

{
  "label": "南涧彝族自治县",
  "value": "532926" },

{
  "label": "巍山彝族回族自治县",
  "value": "532927" },

{
  "label": "永平县",
  "value": "532928" },

{
  "label": "云龙县",
  "value": "532929" },

{
  "label": "洱源县",
  "value": "532930" },

{
  "label": "剑川县",
  "value": "532931" },

{
  "label": "鹤庆县",
  "value": "532932" }],


[{
  "label": "瑞丽市",
  "value": "533102" },

{
  "label": "芒市",
  "value": "533103" },

{
  "label": "梁河县",
  "value": "533122" },

{
  "label": "盈江县",
  "value": "533123" },

{
  "label": "陇川县",
  "value": "533124" }],


[{
  "label": "泸水市",
  "value": "533301" },

{
  "label": "福贡县",
  "value": "533323" },

{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },

{
  "label": "兰坪白族普米族自治县",
  "value": "533325" }],


[{
  "label": "香格里拉市",
  "value": "533401" },

{
  "label": "德钦县",
  "value": "533422" },

{
  "label": "维西傈僳族自治县",
  "value": "533423" }]],



[
[{
  "label": "城关区",
  "value": "540102" },

{
  "label": "堆龙德庆区",
  "value": "540103" },

{
  "label": "林周县",
  "value": "540121" },

{
  "label": "当雄县",
  "value": "540122" },

{
  "label": "尼木县",
  "value": "540123" },

{
  "label": "曲水县",
  "value": "540124" },

{
  "label": "达孜县",
  "value": "540126" },

{
  "label": "墨竹工卡县",
  "value": "540127" },

{
  "label": "格尔木藏青工业园区",
  "value": "540171" },

{
  "label": "拉萨经济技术开发区",
  "value": "540172" },

{
  "label": "西藏文化旅游创意园区",
  "value": "540173" },

{
  "label": "达孜工业园区",
  "value": "540174" }],


[{
  "label": "桑珠孜区",
  "value": "540202" },

{
  "label": "南木林县",
  "value": "540221" },

{
  "label": "江孜县",
  "value": "540222" },

{
  "label": "定日县",
  "value": "540223" },

{
  "label": "萨迦县",
  "value": "540224" },

{
  "label": "拉孜县",
  "value": "540225" },

{
  "label": "昂仁县",
  "value": "540226" },

{
  "label": "谢通门县",
  "value": "540227" },

{
  "label": "白朗县",
  "value": "540228" },

{
  "label": "仁布县",
  "value": "540229" },

{
  "label": "康马县",
  "value": "540230" },

{
  "label": "定结县",
  "value": "540231" },

{
  "label": "仲巴县",
  "value": "540232" },

{
  "label": "亚东县",
  "value": "540233" },

{
  "label": "吉隆县",
  "value": "540234" },

{
  "label": "聂拉木县",
  "value": "540235" },

{
  "label": "萨嘎县",
  "value": "540236" },

{
  "label": "岗巴县",
  "value": "540237" }],


[{
  "label": "卡若区",
  "value": "540302" },

{
  "label": "江达县",
  "value": "540321" },

{
  "label": "贡觉县",
  "value": "540322" },

{
  "label": "类乌齐县",
  "value": "540323" },

{
  "label": "丁青县",
  "value": "540324" },

{
  "label": "察雅县",
  "value": "540325" },

{
  "label": "八宿县",
  "value": "540326" },

{
  "label": "左贡县",
  "value": "540327" },

{
  "label": "芒康县",
  "value": "540328" },

{
  "label": "洛隆县",
  "value": "540329" },

{
  "label": "边坝县",
  "value": "540330" }],


[{
  "label": "巴宜区",
  "value": "540402" },

{
  "label": "工布江达县",
  "value": "540421" },

{
  "label": "米林县",
  "value": "540422" },

{
  "label": "墨脱县",
  "value": "540423" },

{
  "label": "波密县",
  "value": "540424" },

{
  "label": "察隅县",
  "value": "540425" },

{
  "label": "朗县",
  "value": "540426" }],


[{
  "label": "乃东区",
  "value": "540502" },

{
  "label": "扎囊县",
  "value": "540521" },

{
  "label": "贡嘎县",
  "value": "540522" },

{
  "label": "桑日县",
  "value": "540523" },

{
  "label": "琼结县",
  "value": "540524" },

{
  "label": "曲松县",
  "value": "540525" },

{
  "label": "措美县",
  "value": "540526" },

{
  "label": "洛扎县",
  "value": "540527" },

{
  "label": "加查县",
  "value": "540528" },

{
  "label": "隆子县",
  "value": "540529" },

{
  "label": "错那县",
  "value": "540530" },

{
  "label": "浪卡子县",
  "value": "540531" }],


[{
  "label": "那曲县",
  "value": "542421" },

{
  "label": "嘉黎县",
  "value": "542422" },

{
  "label": "比如县",
  "value": "542423" },

{
  "label": "聂荣县",
  "value": "542424" },

{
  "label": "安多县",
  "value": "542425" },

{
  "label": "申扎县",
  "value": "542426" },

{
  "label": "索县",
  "value": "542427" },

{
  "label": "班戈县",
  "value": "542428" },

{
  "label": "巴青县",
  "value": "542429" },

{
  "label": "尼玛县",
  "value": "542430" },

{
  "label": "双湖县",
  "value": "542431" }],


[{
  "label": "普兰县",
  "value": "542521" },

{
  "label": "札达县",
  "value": "542522" },

{
  "label": "噶尔县",
  "value": "542523" },

{
  "label": "日土县",
  "value": "542524" },

{
  "label": "革吉县",
  "value": "542525" },

{
  "label": "改则县",
  "value": "542526" },

{
  "label": "措勤县",
  "value": "542527" }]],



[
[{
  "label": "新城区",
  "value": "610102" },

{
  "label": "碑林区",
  "value": "610103" },

{
  "label": "莲湖区",
  "value": "610104" },

{
  "label": "灞桥区",
  "value": "610111" },

{
  "label": "未央区",
  "value": "610112" },

{
  "label": "雁塔区",
  "value": "610113" },

{
  "label": "阎良区",
  "value": "610114" },

{
  "label": "临潼区",
  "value": "610115" },

{
  "label": "长安区",
  "value": "610116" },

{
  "label": "高陵区",
  "value": "610117" },

{
  "label": "鄠邑区",
  "value": "610118" },

{
  "label": "蓝田县",
  "value": "610122" },

{
  "label": "周至县",
  "value": "610124" }],


[{
  "label": "王益区",
  "value": "610202" },

{
  "label": "印台区",
  "value": "610203" },

{
  "label": "耀州区",
  "value": "610204" },

{
  "label": "宜君县",
  "value": "610222" }],


[{
  "label": "渭滨区",
  "value": "610302" },

{
  "label": "金台区",
  "value": "610303" },

{
  "label": "陈仓区",
  "value": "610304" },

{
  "label": "凤翔县",
  "value": "610322" },

{
  "label": "岐山县",
  "value": "610323" },

{
  "label": "扶风县",
  "value": "610324" },

{
  "label": "眉县",
  "value": "610326" },

{
  "label": "陇县",
  "value": "610327" },

{
  "label": "千阳县",
  "value": "610328" },

{
  "label": "麟游县",
  "value": "610329" },

{
  "label": "凤县",
  "value": "610330" },

{
  "label": "太白县",
  "value": "610331" }],


[{
  "label": "秦都区",
  "value": "610402" },

{
  "label": "杨陵区",
  "value": "610403" },

{
  "label": "渭城区",
  "value": "610404" },

{
  "label": "三原县",
  "value": "610422" },

{
  "label": "泾阳县",
  "value": "610423" },

{
  "label": "乾县",
  "value": "610424" },

{
  "label": "礼泉县",
  "value": "610425" },

{
  "label": "永寿县",
  "value": "610426" },

{
  "label": "彬县",
  "value": "610427" },

{
  "label": "长武县",
  "value": "610428" },

{
  "label": "旬邑县",
  "value": "610429" },

{
  "label": "淳化县",
  "value": "610430" },

{
  "label": "武功县",
  "value": "610431" },

{
  "label": "兴平市",
  "value": "610481" }],


[{
  "label": "临渭区",
  "value": "610502" },

{
  "label": "华州区",
  "value": "610503" },

{
  "label": "潼关县",
  "value": "610522" },

{
  "label": "大荔县",
  "value": "610523" },

{
  "label": "合阳县",
  "value": "610524" },

{
  "label": "澄城县",
  "value": "610525" },

{
  "label": "蒲城县",
  "value": "610526" },

{
  "label": "白水县",
  "value": "610527" },

{
  "label": "富平县",
  "value": "610528" },

{
  "label": "韩城市",
  "value": "610581" },

{
  "label": "华阴市",
  "value": "610582" }],


[{
  "label": "宝塔区",
  "value": "610602" },

{
  "label": "安塞区",
  "value": "610603" },

{
  "label": "延长县",
  "value": "610621" },

{
  "label": "延川县",
  "value": "610622" },

{
  "label": "子长县",
  "value": "610623" },

{
  "label": "志丹县",
  "value": "610625" },

{
  "label": "吴起县",
  "value": "610626" },

{
  "label": "甘泉县",
  "value": "610627" },

{
  "label": "富县",
  "value": "610628" },

{
  "label": "洛川县",
  "value": "610629" },

{
  "label": "宜川县",
  "value": "610630" },

{
  "label": "黄龙县",
  "value": "610631" },

{
  "label": "黄陵县",
  "value": "610632" }],


[{
  "label": "汉台区",
  "value": "610702" },

{
  "label": "南郑区",
  "value": "610703" },

{
  "label": "城固县",
  "value": "610722" },

{
  "label": "洋县",
  "value": "610723" },

{
  "label": "西乡县",
  "value": "610724" },

{
  "label": "勉县",
  "value": "610725" },

{
  "label": "宁强县",
  "value": "610726" },

{
  "label": "略阳县",
  "value": "610727" },

{
  "label": "镇巴县",
  "value": "610728" },

{
  "label": "留坝县",
  "value": "610729" },

{
  "label": "佛坪县",
  "value": "610730" }],


[{
  "label": "榆阳区",
  "value": "610802" },

{
  "label": "横山区",
  "value": "610803" },

{
  "label": "府谷县",
  "value": "610822" },

{
  "label": "靖边县",
  "value": "610824" },

{
  "label": "定边县",
  "value": "610825" },

{
  "label": "绥德县",
  "value": "610826" },

{
  "label": "米脂县",
  "value": "610827" },

{
  "label": "佳县",
  "value": "610828" },

{
  "label": "吴堡县",
  "value": "610829" },

{
  "label": "清涧县",
  "value": "610830" },

{
  "label": "子洲县",
  "value": "610831" },

{
  "label": "神木市",
  "value": "610881" }],


[{
  "label": "汉滨区",
  "value": "610902" },

{
  "label": "汉阴县",
  "value": "610921" },

{
  "label": "石泉县",
  "value": "610922" },

{
  "label": "宁陕县",
  "value": "610923" },

{
  "label": "紫阳县",
  "value": "610924" },

{
  "label": "岚皋县",
  "value": "610925" },

{
  "label": "平利县",
  "value": "610926" },

{
  "label": "镇坪县",
  "value": "610927" },

{
  "label": "旬阳县",
  "value": "610928" },

{
  "label": "白河县",
  "value": "610929" }],


[{
  "label": "商州区",
  "value": "611002" },

{
  "label": "洛南县",
  "value": "611021" },

{
  "label": "丹凤县",
  "value": "611022" },

{
  "label": "商南县",
  "value": "611023" },

{
  "label": "山阳县",
  "value": "611024" },

{
  "label": "镇安县",
  "value": "611025" },

{
  "label": "柞水县",
  "value": "611026" }]],



[
[{
  "label": "城关区",
  "value": "620102" },

{
  "label": "七里河区",
  "value": "620103" },

{
  "label": "西固区",
  "value": "620104" },

{
  "label": "安宁区",
  "value": "620105" },

{
  "label": "红古区",
  "value": "620111" },

{
  "label": "永登县",
  "value": "620121" },

{
  "label": "皋兰县",
  "value": "620122" },

{
  "label": "榆中县",
  "value": "620123" },

{
  "label": "兰州新区",
  "value": "620171" }],


[{
  "label": "嘉峪关市",
  "value": "620201" }],

[{
  "label": "金川区",
  "value": "620302" },

{
  "label": "永昌县",
  "value": "620321" }],


[{
  "label": "白银区",
  "value": "620402" },

{
  "label": "平川区",
  "value": "620403" },

{
  "label": "靖远县",
  "value": "620421" },

{
  "label": "会宁县",
  "value": "620422" },

{
  "label": "景泰县",
  "value": "620423" }],


[{
  "label": "秦州区",
  "value": "620502" },

{
  "label": "麦积区",
  "value": "620503" },

{
  "label": "清水县",
  "value": "620521" },

{
  "label": "秦安县",
  "value": "620522" },

{
  "label": "甘谷县",
  "value": "620523" },

{
  "label": "武山县",
  "value": "620524" },

{
  "label": "张家川回族自治县",
  "value": "620525" }],


[{
  "label": "凉州区",
  "value": "620602" },

{
  "label": "民勤县",
  "value": "620621" },

{
  "label": "古浪县",
  "value": "620622" },

{
  "label": "天祝藏族自治县",
  "value": "620623" }],


[{
  "label": "甘州区",
  "value": "620702" },

{
  "label": "肃南裕固族自治县",
  "value": "620721" },

{
  "label": "民乐县",
  "value": "620722" },

{
  "label": "临泽县",
  "value": "620723" },

{
  "label": "高台县",
  "value": "620724" },

{
  "label": "山丹县",
  "value": "620725" }],


[{
  "label": "崆峒区",
  "value": "620802" },

{
  "label": "泾川县",
  "value": "620821" },

{
  "label": "灵台县",
  "value": "620822" },

{
  "label": "崇信县",
  "value": "620823" },

{
  "label": "华亭县",
  "value": "620824" },

{
  "label": "庄浪县",
  "value": "620825" },

{
  "label": "静宁县",
  "value": "620826" },

{
  "label": "平凉工业园区",
  "value": "620871" }],


[{
  "label": "肃州区",
  "value": "620902" },

{
  "label": "金塔县",
  "value": "620921" },

{
  "label": "瓜州县",
  "value": "620922" },

{
  "label": "肃北蒙古族自治县",
  "value": "620923" },

{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" },

{
  "label": "玉门市",
  "value": "620981" },

{
  "label": "敦煌市",
  "value": "620982" }],


[{
  "label": "西峰区",
  "value": "621002" },

{
  "label": "庆城县",
  "value": "621021" },

{
  "label": "环县",
  "value": "621022" },

{
  "label": "华池县",
  "value": "621023" },

{
  "label": "合水县",
  "value": "621024" },

{
  "label": "正宁县",
  "value": "621025" },

{
  "label": "宁县",
  "value": "621026" },

{
  "label": "镇原县",
  "value": "621027" }],


[{
  "label": "安定区",
  "value": "621102" },

{
  "label": "通渭县",
  "value": "621121" },

{
  "label": "陇西县",
  "value": "621122" },

{
  "label": "渭源县",
  "value": "621123" },

{
  "label": "临洮县",
  "value": "621124" },

{
  "label": "漳县",
  "value": "621125" },

{
  "label": "岷县",
  "value": "621126" }],


[{
  "label": "武都区",
  "value": "621202" },

{
  "label": "成县",
  "value": "621221" },

{
  "label": "文县",
  "value": "621222" },

{
  "label": "宕昌县",
  "value": "621223" },

{
  "label": "康县",
  "value": "621224" },

{
  "label": "西和县",
  "value": "621225" },

{
  "label": "礼县",
  "value": "621226" },

{
  "label": "徽县",
  "value": "621227" },

{
  "label": "两当县",
  "value": "621228" }],


[{
  "label": "临夏市",
  "value": "622901" },

{
  "label": "临夏县",
  "value": "622921" },

{
  "label": "康乐县",
  "value": "622922" },

{
  "label": "永靖县",
  "value": "622923" },

{
  "label": "广河县",
  "value": "622924" },

{
  "label": "和政县",
  "value": "622925" },

{
  "label": "东乡族自治县",
  "value": "622926" },

{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" }],


[{
  "label": "合作市",
  "value": "623001" },

{
  "label": "临潭县",
  "value": "623021" },

{
  "label": "卓尼县",
  "value": "623022" },

{
  "label": "舟曲县",
  "value": "623023" },

{
  "label": "迭部县",
  "value": "623024" },

{
  "label": "玛曲县",
  "value": "623025" },

{
  "label": "碌曲县",
  "value": "623026" },

{
  "label": "夏河县",
  "value": "623027" }]],



[
[{
  "label": "城东区",
  "value": "630102" },

{
  "label": "城中区",
  "value": "630103" },

{
  "label": "城西区",
  "value": "630104" },

{
  "label": "城北区",
  "value": "630105" },

{
  "label": "大通回族土族自治县",
  "value": "630121" },

{
  "label": "湟中县",
  "value": "630122" },

{
  "label": "湟源县",
  "value": "630123" }],


[{
  "label": "乐都区",
  "value": "630202" },

{
  "label": "平安区",
  "value": "630203" },

{
  "label": "民和回族土族自治县",
  "value": "630222" },

{
  "label": "互助土族自治县",
  "value": "630223" },

{
  "label": "化隆回族自治县",
  "value": "630224" },

{
  "label": "循化撒拉族自治县",
  "value": "630225" }],


[{
  "label": "门源回族自治县",
  "value": "632221" },

{
  "label": "祁连县",
  "value": "632222" },

{
  "label": "海晏县",
  "value": "632223" },

{
  "label": "刚察县",
  "value": "632224" }],


[{
  "label": "同仁县",
  "value": "632321" },

{
  "label": "尖扎县",
  "value": "632322" },

{
  "label": "泽库县",
  "value": "632323" },

{
  "label": "河南蒙古族自治县",
  "value": "632324" }],


[{
  "label": "共和县",
  "value": "632521" },

{
  "label": "同德县",
  "value": "632522" },

{
  "label": "贵德县",
  "value": "632523" },

{
  "label": "兴海县",
  "value": "632524" },

{
  "label": "贵南县",
  "value": "632525" }],


[{
  "label": "玛沁县",
  "value": "632621" },

{
  "label": "班玛县",
  "value": "632622" },

{
  "label": "甘德县",
  "value": "632623" },

{
  "label": "达日县",
  "value": "632624" },

{
  "label": "久治县",
  "value": "632625" },

{
  "label": "玛多县",
  "value": "632626" }],


[{
  "label": "玉树市",
  "value": "632701" },

{
  "label": "杂多县",
  "value": "632722" },

{
  "label": "称多县",
  "value": "632723" },

{
  "label": "治多县",
  "value": "632724" },

{
  "label": "囊谦县",
  "value": "632725" },

{
  "label": "曲麻莱县",
  "value": "632726" }],


[{
  "label": "格尔木市",
  "value": "632801" },

{
  "label": "德令哈市",
  "value": "632802" },

{
  "label": "乌兰县",
  "value": "632821" },

{
  "label": "都兰县",
  "value": "632822" },

{
  "label": "天峻县",
  "value": "632823" },

{
  "label": "大柴旦行政委员会",
  "value": "632857" },

{
  "label": "冷湖行政委员会",
  "value": "632858" },

{
  "label": "茫崖行政委员会",
  "value": "632859" }]],



[
[{
  "label": "兴庆区",
  "value": "640104" },

{
  "label": "西夏区",
  "value": "640105" },

{
  "label": "金凤区",
  "value": "640106" },

{
  "label": "永宁县",
  "value": "640121" },

{
  "label": "贺兰县",
  "value": "640122" },

{
  "label": "灵武市",
  "value": "640181" }],


[{
  "label": "大武口区",
  "value": "640202" },

{
  "label": "惠农区",
  "value": "640205" },

{
  "label": "平罗县",
  "value": "640221" }],


[{
  "label": "利通区",
  "value": "640302" },

{
  "label": "红寺堡区",
  "value": "640303" },

{
  "label": "盐池县",
  "value": "640323" },

{
  "label": "同心县",
  "value": "640324" },

{
  "label": "青铜峡市",
  "value": "640381" }],


[{
  "label": "原州区",
  "value": "640402" },

{
  "label": "西吉县",
  "value": "640422" },

{
  "label": "隆德县",
  "value": "640423" },

{
  "label": "泾源县",
  "value": "640424" },

{
  "label": "彭阳县",
  "value": "640425" }],


[{
  "label": "沙坡头区",
  "value": "640502" },

{
  "label": "中宁县",
  "value": "640521" },

{
  "label": "海原县",
  "value": "640522" }]],



[
[{
  "label": "天山区",
  "value": "650102" },

{
  "label": "沙依巴克区",
  "value": "650103" },

{
  "label": "新市区",
  "value": "650104" },

{
  "label": "水磨沟区",
  "value": "650105" },

{
  "label": "头屯河区",
  "value": "650106" },

{
  "label": "达坂城区",
  "value": "650107" },

{
  "label": "米东区",
  "value": "650109" },

{
  "label": "乌鲁木齐县",
  "value": "650121" },

{
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171" },

{
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172" }],


[{
  "label": "独山子区",
  "value": "650202" },

{
  "label": "克拉玛依区",
  "value": "650203" },

{
  "label": "白碱滩区",
  "value": "650204" },

{
  "label": "乌尔禾区",
  "value": "650205" }],


[{
  "label": "高昌区",
  "value": "650402" },

{
  "label": "鄯善县",
  "value": "650421" },

{
  "label": "托克逊县",
  "value": "650422" }],


[{
  "label": "伊州区",
  "value": "650502" },

{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },

{
  "label": "伊吾县",
  "value": "650522" }],


[{
  "label": "昌吉市",
  "value": "652301" },

{
  "label": "阜康市",
  "value": "652302" },

{
  "label": "呼图壁县",
  "value": "652323" },

{
  "label": "玛纳斯县",
  "value": "652324" },

{
  "label": "奇台县",
  "value": "652325" },

{
  "label": "吉木萨尔县",
  "value": "652327" },

{
  "label": "木垒哈萨克自治县",
  "value": "652328" }],


[{
  "label": "博乐市",
  "value": "652701" },

{
  "label": "阿拉山口市",
  "value": "652702" },

{
  "label": "精河县",
  "value": "652722" },

{
  "label": "温泉县",
  "value": "652723" }],


[{
  "label": "库尔勒市",
  "value": "652801" },

{
  "label": "轮台县",
  "value": "652822" },

{
  "label": "尉犁县",
  "value": "652823" },

{
  "label": "若羌县",
  "value": "652824" },

{
  "label": "且末县",
  "value": "652825" },

{
  "label": "焉耆回族自治县",
  "value": "652826" },

{
  "label": "和静县",
  "value": "652827" },

{
  "label": "和硕县",
  "value": "652828" },

{
  "label": "博湖县",
  "value": "652829" },

{
  "label": "库尔勒经济技术开发区",
  "value": "652871" }],


[{
  "label": "阿克苏市",
  "value": "652901" },

{
  "label": "温宿县",
  "value": "652922" },

{
  "label": "库车县",
  "value": "652923" },

{
  "label": "沙雅县",
  "value": "652924" },

{
  "label": "新和县",
  "value": "652925" },

{
  "label": "拜城县",
  "value": "652926" },

{
  "label": "乌什县",
  "value": "652927" },

{
  "label": "阿瓦提县",
  "value": "652928" },

{
  "label": "柯坪县",
  "value": "652929" }],


[{
  "label": "阿图什市",
  "value": "653001" },

{
  "label": "阿克陶县",
  "value": "653022" },

{
  "label": "阿合奇县",
  "value": "653023" },

{
  "label": "乌恰县",
  "value": "653024" }],


[{
  "label": "喀什市",
  "value": "653101" },

{
  "label": "疏附县",
  "value": "653121" },

{
  "label": "疏勒县",
  "value": "653122" },

{
  "label": "英吉沙县",
  "value": "653123" },

{
  "label": "泽普县",
  "value": "653124" },

{
  "label": "莎车县",
  "value": "653125" },

{
  "label": "叶城县",
  "value": "653126" },

{
  "label": "麦盖提县",
  "value": "653127" },

{
  "label": "岳普湖县",
  "value": "653128" },

{
  "label": "伽师县",
  "value": "653129" },

{
  "label": "巴楚县",
  "value": "653130" },

{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" }],


[{
  "label": "和田市",
  "value": "653201" },

{
  "label": "和田县",
  "value": "653221" },

{
  "label": "墨玉县",
  "value": "653222" },

{
  "label": "皮山县",
  "value": "653223" },

{
  "label": "洛浦县",
  "value": "653224" },

{
  "label": "策勒县",
  "value": "653225" },

{
  "label": "于田县",
  "value": "653226" },

{
  "label": "民丰县",
  "value": "653227" }],


[{
  "label": "伊宁市",
  "value": "654002" },

{
  "label": "奎屯市",
  "value": "654003" },

{
  "label": "霍尔果斯市",
  "value": "654004" },

{
  "label": "伊宁县",
  "value": "654021" },

{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },

{
  "label": "霍城县",
  "value": "654023" },

{
  "label": "巩留县",
  "value": "654024" },

{
  "label": "新源县",
  "value": "654025" },

{
  "label": "昭苏县",
  "value": "654026" },

{
  "label": "特克斯县",
  "value": "654027" },

{
  "label": "尼勒克县",
  "value": "654028" }],


[{
  "label": "塔城市",
  "value": "654201" },

{
  "label": "乌苏市",
  "value": "654202" },

{
  "label": "额敏县",
  "value": "654221" },

{
  "label": "沙湾县",
  "value": "654223" },

{
  "label": "托里县",
  "value": "654224" },

{
  "label": "裕民县",
  "value": "654225" },

{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" }],


[{
  "label": "阿勒泰市",
  "value": "654301" },

{
  "label": "布尔津县",
  "value": "654321" },

{
  "label": "富蕴县",
  "value": "654322" },

{
  "label": "福海县",
  "value": "654323" },

{
  "label": "哈巴河县",
  "value": "654324" },

{
  "label": "青河县",
  "value": "654325" },

{
  "label": "吉木乃县",
  "value": "654326" }],


[{
  "label": "石河子市",
  "value": "659001" },

{
  "label": "阿拉尔市",
  "value": "659002" },

{
  "label": "图木舒克市",
  "value": "659003" },

{
  "label": "五家渠市",
  "value": "659004" },

{
  "label": "铁门关市",
  "value": "659006" }]],



[
[{
  "label": "台北",
  "value": "660101" }],

[{
  "label": "高雄",
  "value": "660201" }],

[{
  "label": "基隆",
  "value": "660301" }],

[{
  "label": "台中",
  "value": "660401" }],

[{
  "label": "台南",
  "value": "660501" }],

[{
  "label": "新竹",
  "value": "660601" }],

[{
  "label": "嘉义",
  "value": "660701" }],

[{
  "label": "宜兰",
  "value": "660801" }],

[{
  "label": "桃园",
  "value": "660901" }],

[{
  "label": "苗栗",
  "value": "661001" }],

[{
  "label": "彰化",
  "value": "661101" }],

[{
  "label": "南投",
  "value": "661201" }],

[{
  "label": "云林",
  "value": "661301" }],

[{
  "label": "屏东",
  "value": "661401" }],

[{
  "label": "台东",
  "value": "661501" }],

[{
  "label": "花莲",
  "value": "661601" }],

[{
  "label": "澎湖",
  "value": "661701" }]],


[
[{
  "label": "香港岛",
  "value": "670101" }],

[{
  "label": "九龙",
  "value": "670201" }],

[{
  "label": "新界",
  "value": "670301" }]],


[
[{
  "label": "澳门半岛",
  "value": "680101" }],

[{
  "label": "氹仔岛",
  "value": "680201" }],

[{
  "label": "路环岛",
  "value": "680301" }],

[{
  "label": "路氹城",
  "value": "680401" }]],


[
[{
  "label": "钓鱼岛全岛",
  "value": "690101" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 672:
/*!*************************************************************************************!*\
  !*** D:/uni/uni_phone/node_modules/adcell/swipe-action/uni-swipe-action-item/mp.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  data: function data() {
    return {
      position: [],
      button: [] };

  },
  computed: {
    pos: function pos() {
      return JSON.stringify(this.position);
    },
    btn: function btn() {
      return JSON.stringify(this.button);
    } },

  watch: {
    show: function show(newVal) {
      if (this.autoClose) return;
      var valueObj = this.position[0];
      if (!valueObj) {
        this.init();
        return;
      }
      valueObj.show = newVal;
      this.$set(this.position, 0, valueObj);
    } },

  created: function created() {
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.init();

  },
  beforeDestroy: function beforeDestroy() {var _this = this;
    this.swipeaction.children.forEach(function (item, index) {
      if (item === _this) {
        _this.swipeaction.children.splice(index, 1);
      }
    });
  },
  methods: {
    init: function init() {var _this2 = this;

      setTimeout(function () {
        _this2.getSize();
        _this2.getButtonSize();
      }, 50);
    },
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      var valueObj = this.position[0];
      if (valueObj.show !== e.open) {
        valueObj.show = e.open;
        this.$set(this.position, 0, valueObj);
      }
    },
    onClick: function onClick(index, item) {
      this.$emit('click', {
        content: item,
        index: index });

    },
    getSize: function getSize() {var _this3 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.selector-query-hock').
      boundingClientRect(function (data) {
        if (_this3.autoClose) {
          data[0].show = false;
        } else {
          data[0].show = _this3.show;
        }
        _this3.position = data;
      }).
      exec();
    },
    getButtonSize: function getButtonSize() {var _this4 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.button-hock').
      boundingClientRect(function (data) {
        _this4.button = data;
      }).
      exec();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 69:
/*!*****************************************************!*\
  !*** D:/uni/uni_phone/pages/shoppingMall/mixins.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));var _http = __webpack_require__(/*! @/api/http.js */ 17);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =
{
  data: function data() {
    return {
      location: {} };

  },
  methods: {
    getWxConfig: function getWxConfig() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!

                _this.$store.state.currentLocation.latitude) {_context.next = 3;break;} //判断是否有当前地址
                _this.location = _this.$store.state.currentLocation;return _context.abrupt("return");case 3:


                try {
                  //                let { Data } = await vipCard({ Action: "GetJSSDK" }, "UProdOpera");
                  //                wx.config({
                  //                     debug: false,
                  //                     appId: Data.SDK.appId,
                  //                     timestamp: Data.SDK.timestamp,
                  //                     nonceStr: Data.SDK.nonceStr,
                  //                     signature: Data.SDK.signature,
                  //                     jsApiList: ["getLocation"]
                  //                });
                  // console.log(Data.SDK,'-----')
                  //                wx.error(function (res) {
                  //                     console.log(res, "获取授权位置失败");
                  //                });
                  //                wx.ready(function () {
                  //                     console.log("获取授权ready");
                  //                     wx.getLocation({
                  //                          success: function (res) {
                  //                               console.log("绝授权获取地理位置成功");
                  //                               this.location.latitude = res.latitude;
                  //                               this.location.longitude = res.longitude;
                  //                          },
                  //                          cancel: function (res) {
                  //                               console.log("绝授权获取地理位置");
                  //                               this.$toast.fail({
                  //                                    message: "拒绝授权位置,部分功能无法使用哦!"
                  //                               });
                  //                               // setTimeout(() => {
                  //                               //      this.$router.push("/shoppingMall/shoppingCart");
                  //                               // }, 1000);
                  //                          }
                  //                    });
                  //                });
                  // let _this = this
                  // uni.getLocation({
                  //     type: 'wgs84',
                  //     success: function (res) {
                  // 		_this.location = {
                  // 		     longitude: res.longitude,
                  // 		     latitude: res.latitude
                  // 		};
                  //     }
                  // });

                  _this.location = {
                    //记得删除
                    longitude: 30.47988,
                    latitude: 114.41739 };

                  _this.$store.commit("SET_CURRENT_LOCATION", _this.location);
                } catch (e) {
                  // console.log(e, "55555");
                }case 4:case "end":return _context.stop();}}}, _callee);}))();
    } } };exports.default = _default;

/***/ }),

/***/ 8:
/*!**************************************************!*\
  !*** D:/uni/uni_phone/config/cookie-my/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  get: function get(val) {
    return uni.getStorageSync(val);
  },
  set: function set(val, params) {
    return uni.setStorageSync(val, params);
  },
  remove: function remove(val) {
    return uni.removeStorageSync(val);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 84:
/*!****************************************************!*\
  !*** D:/uni/uni_phone/assets/img/defaule_back.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/img/defaule_back.jpg";

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map