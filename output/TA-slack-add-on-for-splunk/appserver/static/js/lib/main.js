/******/ (() => {
    // webpackBootstrap
    /******/ "use strict";
    /******/ // The require scope
    /******/    var t = {};
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/    (() => {
        /******/ // define getter functions for harmony exports
        /******/ t.d = (e, r) => {
            /******/ for (var o in r) {
                /******/ if (t.o(r, o) && !t.o(e, o)) {
                    /******/ Object.defineProperty(e, o, {
                        enumerable: true,
                        get: r[o]
                    });
                    /******/                }
                /******/            }
            /******/        };
        /******/    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/    (() => {
        /******/ t.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)
        /******/;
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/    (() => {
        /******/ // define __esModule on exports
        /******/ t.r = t => {
            /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                /******/ Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                });
                /******/            }
            /******/            Object.defineProperty(t, "__esModule", {
                value: true
            });
            /******/        };
        /******/    })();
    /******/
    /************************************************************************/    var e = {};
    // ESM COMPAT FLAG
        t.r(e);
    // EXPORTS
        t.d(e, {
        CustomControlBase: () => /* reexport */ h,
        CustomHookClass: () => /* reexport */ f,
        CustomMenuBase: () => /* reexport */ _,
        CustomTabBase: () => /* reexport */ C
    });
    // ./src/types/components/CustomHookClass.ts
    function r(t) {
        "@babel/helpers - typeof";
        return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, r(t);
    }
    function o(t, e) {
        for (var r = 0; r < e.length; r++) {
            var o = e[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, l(o.key), o);
        }
    }
    function n(t, e, r) {
        return e && o(t.prototype, e), r && o(t, r), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
    }
    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function u(t, e, r) {
        return (e = l(e)) in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = r, t;
    }
    function l(t) {
        var e = a(t, "string");
        return "symbol" == r(e) ? e : e + "";
    }
    function a(t, e) {
        if ("object" != r(t) || !t) return t;
        var o = t[Symbol.toPrimitive];
        if (void 0 !== o) {
            var n = o.call(t, e || "default");
            if ("object" != r(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e ? String : Number)(t);
    }
    var f =  n((function t(e, r, o, n, l, a) {
        i(this, t);
        u(this, "globalConfig", void 0);
        u(this, "serviceName", void 0);
        u(this, "state", void 0);
        u(this, "mode", void 0);
        u(this, "util", void 0);
        u(this, "groupName", void 0);
        this.globalConfig = e;
        this.serviceName = r;
        this.state = o;
        this.mode = n;
        this.util = l;
        this.groupName = a;
    }));
    // ./src/components/CustomControl/CustomControlBase.ts
    function b(t) {
        "@babel/helpers - typeof";
        return b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, b(t);
    }
    function c(t, e) {
        for (var r = 0; r < e.length; r++) {
            var o = e[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, m(o.key), o);
        }
    }
    function s(t, e, r) {
        return e && c(t.prototype, e), r && c(t, r), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
    }
    function y(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function p(t, e, r) {
        return (e = m(e)) in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = r, t;
    }
    function m(t) {
        var e = v(t, "string");
        return "symbol" == b(e) ? e : e + "";
    }
    function v(t, e) {
        if ("object" != b(t) || !t) return t;
        var r = t[Symbol.toPrimitive];
        if (void 0 !== r) {
            var o = r.call(t, e || "default");
            if ("object" != b(o)) return o;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e ? String : Number)(t);
    }
    var h =  s((function t(e, r, o, n, i) {
        y(this, t);
        p(this, "globalConfig", void 0);
        p(this, "el", void 0);
        p(this, "data", void 0);
        p(this, "setValue", void 0);
        p(this, "util", void 0);
        this.globalConfig = e;
        this.el = r;
        this.data = o;
        this.setValue = n;
        this.util = i;
    }));
    // ./src/components/CustomTab/CustomTabBase.ts
    function d(t) {
        "@babel/helpers - typeof";
        return d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, d(t);
    }
    function g(t, e) {
        for (var r = 0; r < e.length; r++) {
            var o = e[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, P(o.key), o);
        }
    }
    function S(t, e, r) {
        return e && g(t.prototype, e), r && g(t, r), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
    }
    function w(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function j(t, e, r) {
        return (e = P(e)) in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = r, t;
    }
    function P(t) {
        var e = O(t, "string");
        return "symbol" == d(e) ? e : e + "";
    }
    function O(t, e) {
        if ("object" != d(t) || !t) return t;
        var r = t[Symbol.toPrimitive];
        if (void 0 !== r) {
            var o = r.call(t, e || "default");
            if ("object" != d(o)) return o;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e ? String : Number)(t);
    }
    var C =  S((function t(e, r) {
        w(this, t);
        j(this, "tab", void 0);
        j(this, "el", void 0);
        this.tab = e;
        this.el = r;
    }));
    // ./src/components/CustomMenu/CustomMenuBase.ts
    function T(t) {
        "@babel/helpers - typeof";
        return T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, T(t);
    }
    function E(t, e) {
        for (var r = 0; r < e.length; r++) {
            var o = e[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, B(o.key), o);
        }
    }
    function N(t, e, r) {
        return e && E(t.prototype, e), r && E(t, r), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
    }
    function k(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function V(t, e, r) {
        return (e = B(e)) in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = r, t;
    }
    function B(t) {
        var e = M(t, "string");
        return "symbol" == T(e) ? e : e + "";
    }
    function M(t, e) {
        if ("object" != T(t) || !t) return t;
        var r = t[Symbol.toPrimitive];
        if (void 0 !== r) {
            var o = r.call(t, e || "default");
            if ("object" != T(o)) return o;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e ? String : Number)(t);
    }
    var _ =  N((function t(e, r, o) {
        k(this, t);
        V(this, "globalConfig", void 0);
        V(this, "el", void 0);
        V(this, "setValue", void 0);
        this.globalConfig = e;
        this.el = r;
        this.setValue = o;
    }));
    // ./src/publicApi.ts
    module.exports = e;
    /******/})();