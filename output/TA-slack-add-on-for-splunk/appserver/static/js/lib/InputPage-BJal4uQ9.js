var pt = Object.defineProperty;
var ft = (r, g, u) => g in r ? pt(r, g, { enumerable: !0, configurable: !0, writable: !0, value: u }) : r[g] = u;
var Q = (r, g, u) => ft(r, typeof g != "symbol" ? g + "" : g, u);
import { r as dt, a as mt, b as gt, c as ht, d as yt, e as vt, f as bt, g as Pt, h as jt, i as St, j as Ue, k as fe, l as Pe, m as Ct, n as s, o as z, C as xt, U as Ne, p as Ot, v as Re, u as wt, q as Et, P as ce } from "./publicApi-BqrKEeS0.js";
import je, { Component as _t, useContext as Be, useState as G, useEffect as Se, useMemo as Tt, useCallback as It } from "react";
import { r as Mt, P as Nt, s as Ce, u as Rt, a as kt, M as ke, b as Y, c as Dt, d as qt, T as At, C as pe, e as $t, S as Lt, f as Ut, g as De, h as qe, i as Bt, E as Ft, j as Wt, k as zt } from "./usePlatform-btadq5is.js";
import Fe from "styled-components";
import { P as Gt, E as Vt } from "./SearchJob-DuUStvH5.js";
import { M as re, D as Xt } from "./Menu-BJEnBGyc.js";
var be = { exports: {} }, Ae;
function Ht() {
  return Ae || (Ae = 1, (() => {
    var r = {};
    r.n = (t) => {
      var e = t && t.__esModule ? (
        /******/
        () => t.default
      ) : () => t;
      return r.d(e, {
        a: e
      }), e;
    }, r.d = (t, e) => {
      for (var n in e)
        r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
          enumerable: !0,
          get: e[n]
        });
    }, r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), r.r = (t) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    };
    var g = {};
    r.r(g), r.d(g, {
      Panel: () => (
        /* reexport */
        Oe
      ),
      default: () => (
        /* reexport */
        st
      )
    });
    const u = je;
    var h = r.n(u);
    const S = /* @__PURE__ */ dt();
    var i = r.n(S);
    const C = mt();
    var E = r.n(C);
    const q = gt();
    var x = r.n(q);
    const _ = ht();
    var I = r.n(_);
    const O = yt();
    var w = r.n(O);
    const b = St, j = vt(), J = bt;
    var N = r.n(J);
    const f = Pt();
    var Z = r.n(f);
    const V = jt();
    var A = N()((0, b.animated)(Z())).withConfig({
      displayName: "SlidingPanelsStyles__StyledBox",
      componentId: "su6isq-0"
    })(["overflow:hidden;position:relative;"]), ee = N()(b.animated.div).withConfig({
      displayName: "SlidingPanelsStyles__Styled",
      componentId: "su6isq-1"
    })(["", ";", ";"], V.mixins.reset("block"), V.mixins.clearfix());
    function te(t, e) {
      t && (typeof t == "function" ? t(e) : t.current = e);
    }
    function T(t) {
      "@babel/helpers - typeof";
      return T = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e;
      } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      }, T(t);
    }
    function $() {
      return $ = Object.assign ? Object.assign.bind() : function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            ({}).hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      }, $.apply(null, arguments);
    }
    function X(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function H(t, e) {
      for (var n = 0; n < e.length; n++) {
        var o = e[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, xe(o.key), o);
      }
    }
    function c(t, e, n) {
      return e && H(t.prototype, e), Object.defineProperty(t, "prototype", {
        writable: !1
      }), t;
    }
    function v(t, e) {
      if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && p(t, e);
    }
    function p(t, e) {
      return p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
        return n.__proto__ = o, n;
      }, p(t, e);
    }
    function l(t) {
      var e = L();
      return function() {
        var n, o = U(t);
        if (e) {
          var a = U(this).constructor;
          n = Reflect.construct(o, arguments, a);
        } else n = o.apply(this, arguments);
        return m(this, n);
      };
    }
    function m(t, e) {
      if (e && (T(e) == "object" || typeof e == "function")) return e;
      if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
      return P(t);
    }
    function P(t) {
      if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }
    function L() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch {
      }
      return (L = function() {
        return !!t;
      })();
    }
    function U(t) {
      return U = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      }, U(t);
    }
    function B(t, e, n) {
      return (e = xe(e)) in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = n, t;
    }
    function xe(t) {
      var e = ze(t, "string");
      return T(e) == "symbol" ? e : e + "";
    }
    function ze(t, e) {
      if (T(t) != "object" || !t) return t;
      var n = t[Symbol.toPrimitive];
      if (n !== void 0) {
        var o = n.call(t, e);
        if (T(o) != "object") return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (e === "string" ? String : Number)(t);
    }
    var Ge = {
      elementRef: i().oneOfType([i().func, i().object]),
      panelId: i().any.isRequired,
      /**
      * @private.
      * Used internally, func passed in from outer place is overwritten
      * by SlidingPanels during rendering
      */
      onMount: i().func,
      /**
      * @private.
      * Used internally, func passed in from outer place is overwritten
      * by SlidingPanels during rendering
      */
      onUnmount: i().func
    }, Ve = {}, de = function(t) {
      v(n, t);
      var e = l(n);
      function n() {
        var o;
        X(this, n);
        for (var a = arguments.length, d = new Array(a), y = 0; y < a; y++)
          d[y] = arguments[y];
        return o = e.call.apply(e, [this].concat(d)), B(P(o), "el", null), B(P(o), "handleMount", function(k) {
          o.el = k, te(o.props.elementRef, k);
        }), o;
      }
      return c(n, [{
        key: "componentDidMount",
        value: function() {
          var a, d;
          (a = (d = this.props).onMount) === null || a === void 0 || a.call(d, this);
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          var a, d;
          (a = (d = this.props).onUnmount) === null || a === void 0 || a.call(d, this);
        }
        // eslint-disable-next-line react/no-unused-class-component-methods
      }, {
        key: "getHeight",
        value: function() {
          var a;
          return (a = this.el) === null || a === void 0 ? void 0 : a.clientHeight;
        }
        // eslint-disable-next-line react/no-unused-class-component-methods
      }, {
        key: "getWidth",
        value: function() {
          var a;
          return (a = this.el) === null || a === void 0 ? void 0 : a.clientWidth;
        }
      }, {
        key: "render",
        value: function() {
          var a = this.props.panelId;
          return h().createElement(ee, $({
            "data-test": "panel",
            "data-test-panel-id": a
          }, I()(this.props, x()(n.propTypes)), {
            ref: this.handleMount
          }));
        }
      }]), n;
    }(u.Component);
    B(de, "propTypes", Ge), B(de, "defaultProps", Ve);
    const Oe = de;
    function K(t) {
      "@babel/helpers - typeof";
      return K = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e;
      } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      }, K(t);
    }
    function me() {
      return me = Object.assign ? Object.assign.bind() : function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            ({}).hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      }, me.apply(null, arguments);
    }
    function Xe(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function we(t, e) {
      for (var n = 0; n < e.length; n++) {
        var o = e[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, Ie(o.key), o);
      }
    }
    function Ee(t, e, n) {
      return e && we(t.prototype, e), n && we(t, n), Object.defineProperty(t, "prototype", {
        writable: !1
      }), t;
    }
    function He(t, e) {
      if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && ge(t, e);
    }
    function ge(t, e) {
      return ge = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
        return n.__proto__ = o, n;
      }, ge(t, e);
    }
    function Ke(t) {
      var e = _e();
      return function() {
        var n, o = ae(t);
        if (e) {
          var a = ae(this).constructor;
          n = Reflect.construct(o, arguments, a);
        } else n = o.apply(this, arguments);
        return Qe(this, n);
      };
    }
    function Qe(t, e) {
      if (e && (K(e) == "object" || typeof e == "function")) return e;
      if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
      return F(t);
    }
    function F(t) {
      if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }
    function _e() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch {
      }
      return (_e = function() {
        return !!t;
      })();
    }
    function ae(t) {
      return ae = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      }, ae(t);
    }
    function Te(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(t);
        e && (o = o.filter(function(a) {
          return Object.getOwnPropertyDescriptor(t, a).enumerable;
        })), n.push.apply(n, o);
      }
      return n;
    }
    function ie(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e] != null ? arguments[e] : {};
        e % 2 ? Te(Object(n), !0).forEach(function(o) {
          M(t, o, n[o]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Te(Object(n)).forEach(function(o) {
          Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
        });
      }
      return t;
    }
    function M(t, e, n) {
      return (e = Ie(e)) in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = n, t;
    }
    function Ie(t) {
      var e = Ye(t, "string");
      return K(e) == "symbol" ? e : e + "";
    }
    function Ye(t, e) {
      if (K(t) != "object" || !t) return t;
      var n = t[Symbol.toPrimitive];
      if (n !== void 0) {
        var o = n.call(t, e);
        if (K(o) != "object") return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (e === "string" ? String : Number)(t);
    }
    var Je = {
      activePanelId: i().any.isRequired,
      children: i().node,
      elementRef: i().oneOfType([i().func, i().object]),
      innerClassName: i().string,
      innerStyle: i().object,
      onAnimationEnd: i().func,
      outerClassName: i().string,
      outerStyle: i().object,
      transition: i().oneOf(["forward", "backward"])
    }, Ze = {
      transition: "forward"
    }, et = {
      precision: 1
    }, tt = function(e) {
      var n = e.animating, o = e.outerStyle, a = e.interpolatedOuterStyle;
      return ie(ie({}, o), n ? a : {});
    }, nt = function(e) {
      return e ? {
        translateX: 1
      } : {};
    }, ot = function(e) {
      var n = e ? e.getWidth() : 0, o = e ? e.getHeight() : 0;
      return {
        width: n,
        height: o
      };
    }, rt = function(e) {
      var n, o = e.activePanelId, a = e.children, d = e.maxWidth, y = e.onMount, k = e.onUnmount, le = e.transition, ue = e.transitionStyle, ne = u.Children.toArray(a).filter(u.isValidElement).find(function(oe) {
        return oe.props.panelId === o;
      }), he = (n = ue.translateX) === null || n === void 0 ? void 0 : n.to(function(oe) {
        return "translateX(".concat(oe * d * (le === "forward" ? 1 : -1), "px)");
      }), ye = ne ? h().createElement(b.animated.div, {
        style: ue
      }, (0, u.cloneElement)(ne, {
        style: ie(ie({}, ne.props.style), {}, {
          transform: he
        }),
        onMount: y,
        onUnmount: k
      })) : null;
      return ye;
    }, at = function() {
      return {
        translateX: 0
      };
    }, it = function(e) {
      return e ? {
        translateX: -1,
        position: "absolute",
        left: 0,
        top: 0
      } : {
        translateX: -1
      };
    }, se = function(t) {
      He(n, t);
      var e = Ke(n);
      Ee(n, null, [{
        key: "getDerivedStateFromProps",
        // @docs-props-type SlidingPanelsPropsBase
        value: function(a, d) {
          return a.activePanelId !== d.prevActivePanelId ? {
            animating: !0,
            panelLoading: !0,
            prevActivePanelId: a.activePanelId,
            slidingId: d.slidingId + 1
          } : null;
        }
      }]);
      function n(o) {
        var a;
        return Xe(this, n), a = e.call(this, o), M(F(a), "panelInstances", {}), M(F(a), "allowAnimationUpdates", !0), M(F(a), "handlePanelMount", function(d) {
          a.panelInstances[d.props.panelId] = d, d.props.panelId === a.props.activePanelId && a.setState({
            activePanel: d,
            panelLoading: !1
          });
        }), M(F(a), "handlePanelUnmount", function(d) {
          delete a.panelInstances[d.props.panelId];
        }), M(F(a), "handleAnimationEnd", function() {
          var d, y;
          a.allowAnimationUpdates && a.setState({
            animating: !1
          }), (d = (y = a.props).onAnimationEnd) === null || d === void 0 || d.call(y);
        }), M(F(a), "renderOuterContainer", function(d) {
          var y = a.props, k = y.activePanelId, le = y.children, ue = y.elementRef, ne = y.outerClassName, he = y.outerStyle, ye = y.innerClassName, oe = y.innerStyle, ve = a.state.animating, lt = tt({
            animating: ve,
            outerStyle: he,
            interpolatedOuterStyle: d
          });
          u.Children.toArray(le).filter(u.isValidElement).find(function(R) {
            return R.props.panelId === k;
          });
          var ut = E()(w()(a.panelInstances), function(R) {
            return !!R;
          }), ct = ut.map(function(R) {
            var W, Me = a.panelInstances[R.props.panelId];
            return Me && (W = Me.getWidth()) !== null && W !== void 0 ? W : 0;
          }).reduce(function(R, W) {
            return Math.max(R, W);
          }, 0);
          return h().createElement(A, me({
            className: ne,
            "data-test-active-panel-id": k,
            "data-test": "sliding-panels",
            elementRef: ue,
            style: lt
          }, I()(a.props, x()(n.propTypes))), h().createElement(
            j.Transition,
            {
              from: nt(ve),
              enter: at(),
              leave: it(ve),
              items: k
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            function(R, W) {
              return h().createElement(b.animated.div, {
                style: oe,
                className: ye
              }, rt({
                activePanelId: W,
                children: le,
                maxWidth: ct,
                onMount: a.handlePanelMount,
                onUnmount: a.handlePanelUnmount,
                transition: a.props.transition,
                transitionStyle: R
              }));
            }
          ));
        }), a.state = {
          animating: !1,
          panelLoading: !1,
          prevActivePanelId: a.props.activePanelId,
          // eslint-disable-line react/no-unused-state
          slidingId: 0
        }, a;
      }
      return Ee(n, [{
        key: "componentWillUnmount",
        value: function() {
          this.allowAnimationUpdates = !1;
        }
      }, {
        key: "render",
        value: function() {
          var a = this.state, d = a.activePanel, y = a.panelLoading;
          return h().createElement(
            j.Spring,
            {
              to: ot(d),
              onRest: this.handleAnimationEnd,
              immediate: y,
              config: et
            },
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            this.renderOuterContainer
          );
        }
      }]), n;
    }(u.Component);
    M(se, "propTypes", Je), M(se, "defaultProps", Ze), M(se, "Panel", Oe);
    const st = se;
    be.exports = g;
  })()), be.exports;
}
var Kt = Ht();
const $e = /* @__PURE__ */ Ue(Kt);
var Qt = Mt();
const Yt = /* @__PURE__ */ Ue(Qt);
class Le extends _t {
  constructor(u) {
    super(u);
    Q(this, "customComponentContext");
    Q(this, "shouldRender");
    Q(this, "el");
    Q(this, "setValue", (u) => {
      this.props.handleChange(u);
    });
    Q(this, "loadCustomMenu", () => new Promise((u) => {
      var S;
      const h = (S = this.customComponentContext) == null ? void 0 : S[this.props.fileName];
      if ((h == null ? void 0 : h.type) === "menu") {
        const i = h.component;
        u(i);
      } else if (this.props.type === "external")
        import(
          /* @vite-ignore */
          `${Ct()}/custom/${this.props.fileName}.js`
        ).then((i) => {
          const C = i.default;
          u(C);
        }).catch((i) => {
          console.error(`[Custom Menu] Error loading custom menu ${i.message}`);
        });
      else {
        const C = fe().meta.name;
        __non_webpack_require__(
          [`app/${C}/js/build/custom/${this.props.fileName}`],
          (E) => u(E)
        );
      }
    }));
    this.state = {
      loading: !0
    }, this.shouldRender = !0, this.customComponentContext = u.customComponentContext;
  }
  componentDidMount() {
    const u = fe();
    if (u.pages.inputs === void 0)
      return;
    const h = "groupsMenu" in u.pages.inputs ? u.pages.inputs.groupsMenu : void 0, S = "menu" in u.pages.inputs ? u.pages.inputs.menu : void 0, { services: i } = u.pages.inputs;
    this.setState({ loading: !0 }), this.loadCustomMenu().then((C) => {
      Pe(this.el !== void 0, "Element should be defined");
      const E = new C(u, this.el, this.setValue);
      i && S && !h && E.render(), this.setState({ loading: !1 });
    });
  }
  shouldComponentUpdate(u, h) {
    return !h.loading && this.shouldRender ? (this.shouldRender = !1, !0) : !1;
  }
  render() {
    return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      this.state.loading && z._("Loading..."),
      /* @__PURE__ */ s.jsx(
        "span",
        {
          ref: (u) => {
            u && (this.el = u);
          },
          style: { visibility: this.state.loading ? "hidden" : "visible" }
        }
      )
    ] });
  }
}
function Jt() {
  const r = Be(Nt);
  if (!r)
    throw new Error("usePageContext must be used within <PageContextProvider />");
  return r;
}
const Zt = Fe.span`
    color: ${Re.brandColorD20};
    font-size: ${Re.fontSizeSmall};
    font-weight: 500;
`, D = "main_panel";
function We({ handleRequestOpen: r }) {
  const g = Be(xt), [u, h] = G(D), [S, i] = G(
    "forward"
  ), [C, E] = G(!1), [q, x] = G(!0), { pages: _ } = fe(), I = Jt(), { inputs: O } = _;
  Pe(O);
  const w = "groupsMenu" in O ? O.groupsMenu : void 0, b = "menu" in O ? O.menu : void 0, [j, J] = G(O.services);
  Se(() => {
    J(
      O.services.filter(
        (p) => !Ce(p.hideForPlatform, I.platform)
      )
    );
  }, [O.services, I.platform]);
  const N = ["clickAway", "escapeKey", "offScreen", "toggleClick"], f = /* @__PURE__ */ s.jsx(Ne, { id: "addInputBtn", label: z._("Create New Input"), isMenu: !0 });
  Se(() => {
    q || (E(!1), x(!0));
  }, [q]);
  const Z = ({ reason: p }) => {
    E(!N.includes(p));
  }, V = () => {
    E(!0);
  }, A = (p) => {
    const { service: l, input: m } = p;
    r({ serviceName: l, input: m });
  }, ee = (p, l) => p.map(
    (m) => m != null && m.hasSubmenu ? /* @__PURE__ */ s.jsx(
      re.Item,
      {
        hasSubmenu: !0,
        onClick: () => {
          h(m.name), i("forward");
        },
        children: m.title
      },
      m.name
    ) : /* @__PURE__ */ s.jsxs(
      re.Item,
      {
        onClick: () => {
          r({ serviceName: m.name, groupName: l }), x(!1);
        },
        children: [
          m.title,
          /* @__PURE__ */ s.jsxs(Zt, { children: [
            " ",
            m.subTitle
          ] })
        ]
      },
      m.name
    )
  ), te = () => /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx(
      re.Item,
      {
        startAdornment: /* @__PURE__ */ s.jsx(Yt, {}),
        onClick: () => {
          h(D), i("backward");
        },
        children: "Back"
      }
    ),
    /* @__PURE__ */ s.jsx(re.Divider, {})
  ] }), T = (p) => Object.keys(p).map((l) => /* @__PURE__ */ s.jsx($e.Panel, { panelId: l, children: /* @__PURE__ */ s.jsxs(re, { children: [
    l !== D && te(),
    ee(p[l], l)
  ] }) }, l)), $ = Tt(() => {
    const p = { [D]: [] };
    return w ? w.forEach((l) => {
      if (l != null && l.groupServices)
        p[l.groupName] = [], l.groupServices.forEach((m) => {
          const P = j.find(
            (L) => L.name === m
          );
          P && p[l.groupName].push({
            name: m,
            hasSubmenu: !1,
            title: (P == null ? void 0 : P.title) || "",
            // what should be done when title empty
            subTitle: P == null ? void 0 : P.subTitle
          });
        }), p[l.groupName].length > 0 && p[D].push({
          name: l.groupName,
          title: l.groupTitle,
          hasSubmenu: !0
        });
      else {
        const m = j.find(
          (P) => P.name === l.groupName
        );
        m && p[D].push({
          name: l.groupName,
          title: l.groupTitle,
          subTitle: m == null ? void 0 : m.subTitle,
          hasSubmenu: !1
        });
      }
    }) : p[D] = j.map((l) => ({
      name: l.name,
      title: l.title,
      subTitle: l.subTitle,
      hasSubmenu: !1
    })), T(p);
  }, [j]), X = () => /* @__PURE__ */ s.jsx(
    Xt,
    {
      toggle: f,
      open: C,
      onRequestClose: Z,
      onRequestOpen: V,
      children: /* @__PURE__ */ s.jsx(
        $e,
        {
          activePanelId: u,
          transition: S,
          style: { width: "210px" },
          children: $
        }
      )
    }
  ), H = () => /* @__PURE__ */ s.jsx(
    Ne,
    {
      label: Ot(100),
      id: "addInputBtn",
      onClick: () => {
        r({ serviceName: j[0].name });
      }
    }
  ), c = (p) => /* @__PURE__ */ s.jsx(s.Fragment, { children: je.createElement(Le, {
    fileName: p.src,
    type: p.type,
    handleChange: A,
    customComponentContext: g
  }) }), v = (p) => /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    je.createElement(Le, {
      fileName: p.src,
      type: p.type,
      handleChange: A,
      customComponentContext: g
    }),
    j.length === 1 ? H() : X()
  ] });
  return j && !(b != null && b.src) ? j.length === 1 ? H() : X() : j && (b != null && b.src) && w ? v(b) : (Pe(b), c(b));
}
We.propTypes = {
  handleRequestOpen: Gt.func
};
const en = Fe(pe.Row)`
    padding: 5px 0px;

    .title_menu_column {
        width: auto !important;
    }

    .page_subtitle {
        min-height: 20px;
    }

    .dropdown {
        text-align: right;
    }
`;
function tn(r) {
  return r !== void 0 && "description" in r;
}
function nn(r) {
  return r !== void 0 && "table" in r;
}
function pn() {
  const [r, g] = G({ open: !1 }), u = fe(), h = Rt(u, "inputs"), S = u.pages.inputs;
  let i = [], C, E, q, x;
  S && (nn(S) ? ({ services: i, title: C, table: E, description: q, subDescription: x } = S, i = i.filter(
    (c) => !Ce(c.hideForPlatform, h)
  )) : ({ services: i, title: C } = S, i = i.filter(
    (c) => !Ce(c.hideForPlatform, h)
  )));
  const _ = !E, [I, O] = G(i[0].name), w = i.find((c) => c.name === I), b = tn(w), j = [ke, Y, Dt], J = i.map((c) => c.name), N = wt(), f = kt();
  Se(() => {
    Z(), V();
  }, [Et().search]);
  const Z = () => {
    const c = i.find((v) => v.name === f.get("service"));
    f && c && j.includes(f.get("action") || "") && !r.open ? f.get("action") !== Y && r.stanzaName ? g({
      ...r,
      open: !0,
      isInputPageStyle: !0,
      serviceName: f.get("service") || "",
      mode: f.get("action") || ""
    }) : g({
      ...r,
      open: !0,
      isInputPageStyle: !0,
      serviceName: f.get("service") || "",
      formLabel: `Create ${c == null ? void 0 : c.title}`,
      mode: Y
    }) : (!f.get("service") || !f.get("action")) && r.open && r.isInputPageStyle && g({ ...r, open: !1 });
  }, V = () => {
    f && J.includes(f.get("service") || "") && O(f.get("service") || "");
  }, A = ({
    serviceName: c,
    groupName: v,
    input: p
  }) => {
    const l = i.find((U) => U.name === c), m = l == null ? void 0 : l.title, P = l == null ? void 0 : l.formTitle, L = (l == null ? void 0 : l.style) === zt;
    if (g({
      ...r,
      open: !0,
      serviceName: c,
      mode: Y,
      formLabel: P ? `Add ${P}` : `Add ${m}`,
      isInputPageStyle: L,
      groupName: v
    }), L) {
      f.set("service", c), f.set("action", Y);
      const B = p || (v && v !== D ? v : null) || c;
      B ? f.set("input", B) : f.delete("input"), N({ search: f.toString() });
    }
  }, ee = () => {
    g({ ...r, open: !1 });
  }, te = () => r.serviceName && /* @__PURE__ */ s.jsx(
    Wt,
    {
      page: ce,
      open: r.open,
      handleRequestClose: ee,
      returnFocus: () => {
      },
      serviceName: r.serviceName,
      mode: Y,
      formLabel: r.formLabel,
      groupName: r.groupName
    }
  ), T = (c, v) => {
    const p = i.find((m) => m.name === c.serviceName), l = (p == null ? void 0 : p.formTitle) || (p == null ? void 0 : p.title);
    g({
      ...r,
      open: !0,
      isInputPageStyle: !0,
      serviceName: c.serviceName,
      stanzaName: c.name,
      formLabel: v === ke ? `Clone ${l}` : `Update ${l}`,
      mode: v
    }), f.set("service", c.serviceName), f.set("action", v), N({ search: f.toString() });
  }, $ = () => {
    g({ ...r, open: !1 }), _ || f.delete("service"), f.delete("action"), N({ search: f.toString() });
  }, X = () => r.serviceName && r.mode ? /* @__PURE__ */ s.jsx(
    Ft,
    {
      handleRequestClose: $,
      serviceName: r.serviceName,
      stanzaName: r.stanzaName,
      mode: r.mode,
      formLabel: r.formLabel,
      page: ce,
      groupName: r.groupName
    }
  ) : null, H = It(
    (c, { selectedTabId: v }) => {
      v && (O(v), f.delete("action"), f.set("service", v), N({ search: f.toString() }));
    },
    [I]
    // eslint-disable-line react-hooks/exhaustive-deps
  );
  return /* @__PURE__ */ s.jsx(Vt, { children: /* @__PURE__ */ s.jsx(qt, { platform: h, children: /* @__PURE__ */ s.jsxs(At, { children: [
    r.isInputPageStyle && r.open ? X() : null,
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        style: r.isInputPageStyle && r.open ? { display: "none" } : { display: "block" },
        children: [
          /* @__PURE__ */ s.jsx(pe, { gutter: 8, children: /* @__PURE__ */ s.jsxs(en, { children: [
            /* @__PURE__ */ s.jsxs(
              pe.Column,
              {
                className: _ ? "title_menu_column" : "",
                span: 9,
                children: [
                  /* @__PURE__ */ s.jsx($t, { children: _ ? z._((w == null ? void 0 : w.title) || "") : z._(C || "") }),
                  /* @__PURE__ */ s.jsx(
                    Lt,
                    {
                      className: _ ? "pageSubtitle" : void 0,
                      children: _ ? z._(b ? w == null ? void 0 : w.description : "") : z._(q || "")
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    Ut,
                    {
                      text: (x == null ? void 0 : x.text) || "",
                      links: x == null ? void 0 : x.links
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ s.jsx(
              pe.Column,
              {
                className: _ ? "title_menu_column" : "dropdown",
                span: 3,
                children: !_ && /* @__PURE__ */ s.jsx(We, { handleRequestOpen: A })
              }
            )
          ] }) }),
          _ ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
            /* @__PURE__ */ s.jsx(De, { activeTabId: I, onChange: H, children: i.map((c) => /* @__PURE__ */ s.jsx(
              De.Tab,
              {
                label: z._(c.title),
                tabId: c.name
              },
              c.name
            )) }),
            i.map((c) => /* @__PURE__ */ s.jsx(
              "div",
              {
                style: c.name !== I ? { display: "none" } : { display: "block" },
                id: `${c.name}Tab`,
                children: /* @__PURE__ */ s.jsx(
                  qe,
                  {
                    page: ce,
                    serviceName: c.name,
                    handleRequestModalOpen: () => A({
                      serviceName: c.name
                    }),
                    handleOpenPageStyleDialog: T
                  }
                )
              },
              c.name
            ))
          ] }) : /* @__PURE__ */ s.jsx(
            qe,
            {
              page: ce,
              handleOpenPageStyleDialog: T,
              displayActionBtnAllRows: !0
            }
          ),
          /* @__PURE__ */ s.jsx(Bt, { position: "top-right" }),
          !r.isInputPageStyle && r.open ? te() : null
        ]
      }
    )
  ] }) }) });
}
export {
  pn as default
};
