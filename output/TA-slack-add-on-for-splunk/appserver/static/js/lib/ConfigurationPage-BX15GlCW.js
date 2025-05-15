import { C as I, k as L, n, o as w, m as H, s as W, t as Z, w as T, U as G, W as Q, x as Y, y as J, j as K, B as X, l as ee } from "./publicApi-BqrKEeS0.js";
import $, { useContext as ne, useState as b, useRef as U, useEffect as E, memo as te, useMemo as re, useCallback as oe } from "react";
import { P as ae, B as se, l as ie, k as le, T as ue, E as ce, h as de, j as pe, b as R, M as me, m as fe, u as ge, s as Ce, a as he, d as xe, C as O, e as je, S as ye, f as ve, g as D, i as be } from "./usePlatform-btadq5is.js";
import _ from "styled-components";
import { P as A, L as we, E as Ee } from "./SearchJob-DuUStvH5.js";
const Pe = ({ tab: e }) => {
  const u = ne(I), [r, o] = b(!0), m = U(null), f = L().meta.name, j = () => new Promise((p) => {
    var i, c, v;
    const l = u == null ? void 0 : u[(i = e == null ? void 0 : e.customTab) == null ? void 0 : i.src];
    if ((l == null ? void 0 : l.type) === "tab") {
      const g = l.component;
      p(g);
    } else ((c = e.customTab) == null ? void 0 : c.type) === "external" ? import(
      /* @vite-ignore */
      `${H()}/custom/${e.customTab.src}.js`
    ).then((g) => {
      const h = g.default;
      p(h);
    }) : __non_webpack_require__(
      [`app/${f}/js/build/custom/${(v = e.customTab) == null ? void 0 : v.src}`],
      (g) => p(g)
    );
  });
  return E(() => {
    j().then((p) => {
      m.current && (new p(e, m.current).render(), o(!1));
    });
  }, []), /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    r && w._("Loading..."),
    /* @__PURE__ */ n.jsx("div", { ref: m, style: { visibility: r ? "hidden" : "visible" } })
  ] });
}, Se = _.div`
    margin-left: 270px !important;
    width: 150px;
`;
function F({ serviceName: e }) {
  const u = U(), [r, o] = b(null), [m, y] = b(!1), [f, j] = b({});
  E(() => {
    const i = new AbortController();
    return W({
      endpointUrl: Z(`settings/${encodeURIComponent(e)}`),
      handleError: !0,
      signal: i.signal,
      callbackOnError: (c) => {
        i.signal.aborted || o(c);
      }
    }).catch((c) => {
      if (i.signal.aborted)
        return null;
      throw c;
    }).then((c) => {
      c && j(c.entry[0].content);
    }), () => {
      i.abort();
    };
  }, [e]);
  const p = (i) => {
    u.current.handleSubmit(i);
  }, l = (i) => {
    y(i);
  };
  if (r)
    throw r;
  return Object.keys(f).length ? /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    /* @__PURE__ */ n.jsx(I.Consumer, { children: (i) => /* @__PURE__ */ n.jsx(ae.Consumer, { children: (c) => /* @__PURE__ */ n.jsx(
      se,
      {
        ref: u,
        page: T,
        stanzaName: e,
        serviceName: "settings",
        mode: ie,
        currentServiceState: f,
        handleFormSubmit: l,
        pageContext: c,
        customComponentContext: i
      }
    ) }) }),
    /* @__PURE__ */ n.jsx(Se, { children: /* @__PURE__ */ n.jsx(
      G,
      {
        className: "saveBtn",
        label: w._("Save"),
        onClick: p,
        loading: m
      }
    ) })
  ] }) : /* @__PURE__ */ n.jsx(Q, { size: "medium" });
}
F.propTypes = {
  serviceName: A.string.isRequired
};
function V({ selectedTab: e, updateIsPageOpen: u }) {
  const [r, o] = b({ open: !1 }), m = e.style === le;
  E(() => {
    m && u(!!r.open);
  }, [u, m, r]);
  const y = () => {
    o({
      ...r,
      open: !0,
      mode: R,
      formLabel: e.formTitle ? `Add ${e.formTitle}` : `Add ${e.title}`
    });
  }, f = () => {
    o({ ...r, open: !1 });
  }, j = () => /* @__PURE__ */ n.jsx(
    pe,
    {
      page: T,
      open: r.open,
      handleRequestClose: f,
      returnFocus: () => {
      },
      serviceName: e.name,
      mode: R,
      formLabel: r.formLabel
    }
  ), p = (v, g) => {
    const h = (e == null ? void 0 : e.formTitle) || e.title;
    o({
      ...r,
      open: !0,
      stanzaName: v.name,
      formLabel: g === me ? `Clone ${h}` : `Update ${h}`,
      mode: g
    });
  }, l = () => {
    o({ ...r, open: !1 });
  }, i = () => /* @__PURE__ */ n.jsx(
    ce,
    {
      open: r.open,
      handleRequestClose: l,
      serviceName: e.name,
      stanzaName: r.stanzaName,
      mode: r.mode,
      formLabel: r.formLabel,
      page: T
    }
  ), c = () => /* @__PURE__ */ n.jsx(
    "div",
    {
      style: m && r.open ? { display: "none" } : { display: "block" },
      children: /* @__PURE__ */ n.jsx(
        de,
        {
          page: T,
          serviceName: e.name,
          handleRequestModalOpen: () => y(),
          handleOpenPageStyleDialog: p
        }
      )
    }
  );
  return /* @__PURE__ */ n.jsxs(ue, { value: null, children: [
    m && r.open && i(),
    c(),
    !m && r.open && j()
  ] });
}
V.propTypes = {
  selectedTab: A.object,
  updateIsPageOpen: A.func
};
const Te = te(V);
var M = { exports: {} }, N;
function Oe() {
  return N || (N = 1, (() => {
    var e = {};
    e.n = (a) => {
      var s = a && a.__esModule ? (
        /******/
        () => a.default
      ) : () => a;
      return e.d(s, {
        a: s
      }), s;
    }, e.d = (a, s) => {
      for (var d in s)
        e.o(s, d) && !e.o(a, d) && Object.defineProperty(a, d, {
          enumerable: !0,
          get: s[d]
        });
    }, e.o = (a, s) => Object.prototype.hasOwnProperty.call(a, s), e.r = (a) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(a, "__esModule", {
        value: !0
      });
    };
    var u = {};
    e.r(u), e.d(u, {
      default: () => (
        /* binding */
        h
      )
    });
    const r = $;
    var o = e.n(r);
    const m = Y();
    var y = e.n(m);
    const f = J();
    function j(a, s) {
      if (a == null) return {};
      var d, C, t = p(a, s);
      if (Object.getOwnPropertySymbols) {
        var x = Object.getOwnPropertySymbols(a);
        for (C = 0; C < x.length; C++)
          d = x[C], s.includes(d) || {}.propertyIsEnumerable.call(a, d) && (t[d] = a[d]);
      }
      return t;
    }
    function p(a, s) {
      if (a == null) return {};
      var d = {};
      for (var C in a)
        if ({}.hasOwnProperty.call(a, C)) {
          if (s.includes(C)) continue;
          d[C] = a[C];
        }
      return d;
    }
    var l = /* @__PURE__ */ new Map();
    l.set("outlined", function() {
      return o().createElement(o().Fragment, null, o().createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.94008 2C8.11165 2 7.44008 2.67157 7.44008 3.5V9H5.47861C4.11314 9 3.45783 10.676 4.46119 11.6022L10.9824 17.6218C11.557 18.1521 12.4426 18.1521 13.0172 17.6217L19.5384 11.6022C20.5417 10.676 19.8864 9 18.5209 9H16.5553V3.5C16.5553 2.67157 15.8838 2 15.0553 2H8.94008ZM9.44008 11V4H14.5553V11H17.2421L11.9998 15.8391L6.75743 11H9.44008Z"
      }), o().createElement("path", {
        d: "M4 20C3.44772 20 3 20.4477 3 21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20H4Z"
      }));
    }), l.set("filled", function() {
      return o().createElement(o().Fragment, null, o().createElement("path", {
        d: "M7.44032 3.5C7.44032 2.67157 8.1119 2 8.94032 2H15.0556C15.884 2 16.5556 2.67157 16.5556 3.5V9H18.5212C19.8867 9 20.542 10.676 19.5386 11.6022L13.0174 17.6217C12.4429 18.1521 11.5572 18.1521 10.9826 17.6218L4.46143 11.6022C3.45808 10.676 4.11338 9 5.47885 9H7.44032V3.5Z"
      }), o().createElement("path", {
        d: "M3 21C3 20.4477 3.44772 20 4 20H20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21Z"
      }));
    });
    var i = ["default", "outlined", "filled"], c = function(s) {
      return i.indexOf(s) >= 0;
    }, v = function(s) {
      return s === "default" || s && !c(s) ? "outlined" : s;
    }, g = function(s) {
      var d = s.children, C = s.variant, t = C === void 0 ? "default" : C, x = j(s, ["children", "variant"]), k = v(t), B = "arrowbroadunderbardown-".concat(k), P = (0, r.useContext)(f.IconContext), S = l.get(k);
      if (P && S) {
        var q = P.toRender, z = P.addIcon;
        if (z(B, S()), !q)
          return null;
      }
      return o().createElement(y(), x, d, P ? o().createElement("use", {
        href: "#".concat(B)
      }) : !!S && S());
    };
    const h = g;
    M.exports = u;
  })()), M.exports;
}
var _e = Oe();
const Me = /* @__PURE__ */ K(_e);
function Ae(e) {
  return /* @__PURE__ */ n.jsx(
    X,
    {
      target: "_blank",
      to: e.fileUrl,
      download: e.fileNameAfterDownload,
      "data-test": "downloadButton",
      icon: /* @__PURE__ */ n.jsx(Me, {}),
      children: e.children
    }
  );
}
const Le = H().replace("js/build", "openapi.json");
function Ue() {
  return /* @__PURE__ */ n.jsx(Ae, { fileUrl: Le, fileNameAfterDownload: "openapi.json", children: "OpenAPI.json" });
}
const ke = _(fe.Typography)`
    font-size: 0.8em;
`, Be = () => {
  var r, o;
  const e = L();
  if ((r = e == null ? void 0 : e.meta) != null && r.hideUCCVersion)
    return null;
  const u = ((o = e == null ? void 0 : e.meta) == null ? void 0 : o._uccVersion) ?? null;
  return /* @__PURE__ */ n.jsxs(
    ke,
    {
      as: "span",
      title: "Splunk Add-On UCC framework is a framework to generate UI-based Splunk add-ons. It includes UI, REST handlers, Modular inputs, OAuth and Alert action templates.",
      "data-test": "ucc-credit",
      children: [
        "Made with",
        " ",
        /* @__PURE__ */ n.jsx(we, { to: "https://splunk.github.io/addonfactory-ucc-generator/", openInNewContext: !0, children: "UCC" }),
        " ",
        u
      ]
    }
  );
}, Re = _.div`
    display: inline-flex;
    align-items: center;
    justify-content: end;
    flex-wrap: wrap;
    gap: 0.4rem;
`, De = _(O.Row)`
    padding: 5px 0px;

    .dropdown {
        text-align: right;
    }

    .input_button {
        text-align: right;
        margin-right: 0px;
    }
`;
function Ve() {
  const e = L();
  ee(e.pages.configuration, "Configuration page not found in global config");
  const { title: u, description: r, subDescription: o, tabs: m } = e.pages.configuration, y = ge(e, "configuration"), f = m.filter(
    (t) => !Ce(t.hideForPlatform, y)
  ), j = re(() => f.map((t) => t.name), [f]), p = U(!1), [l, i] = b(f[0].name), [c, v] = b(!1), g = he(), h = g == null ? void 0 : g.get("tab");
  E(() => {
    h && j.includes(h) && h !== l && i(h);
  }, [h, j, l]), E(() => (p.current = !0, () => {
    p.current = !1;
  }), []);
  const a = oe((t, { selectedTabId: x }) => {
    p.current && x && (i(x), v(!1));
  }, []), s = (t) => {
    p.current && v(t);
  }, d = (t) => $.createElement(Pe, { tab: t }), C = (t) => {
    let x;
    return t != null && t.customTab ? x = d(t) : x = t != null && t.table ? /* @__PURE__ */ n.jsx(
      Te,
      {
        selectedTab: t,
        updateIsPageOpen: s
      },
      t.name
    ) : /* @__PURE__ */ n.jsx(F, { serviceName: t.name }, t.name), /* @__PURE__ */ n.jsx(
      "div",
      {
        style: t.name !== l ? { display: "none" } : { display: "block" },
        id: `${t.name}Tab`,
        children: x
      },
      t.name
    );
  };
  return /* @__PURE__ */ n.jsx(Ee, { children: /* @__PURE__ */ n.jsxs(xe, { platform: y, children: [
    /* @__PURE__ */ n.jsxs("div", { style: c ? { display: "none" } : { display: "block" }, children: [
      /* @__PURE__ */ n.jsx(O, { gutter: 8, children: /* @__PURE__ */ n.jsxs(De, { children: [
        /* @__PURE__ */ n.jsxs(O.Column, { span: 9, children: [
          /* @__PURE__ */ n.jsx(je, { children: w._(u) }),
          /* @__PURE__ */ n.jsx(ye, { children: w._(r || "") }),
          /* @__PURE__ */ n.jsx(
            ve,
            {
              text: (o == null ? void 0 : o.text) || "",
              links: o == null ? void 0 : o.links
            }
          )
        ] }),
        /* @__PURE__ */ n.jsx(O.Column, { span: 3, style: { textAlignLast: "right" }, children: /* @__PURE__ */ n.jsxs(Re, { children: [
          /* @__PURE__ */ n.jsx(Be, {}),
          /* @__PURE__ */ n.jsx(Ue, {})
        ] }) })
      ] }) }),
      /* @__PURE__ */ n.jsx(D, { activeTabId: l, onChange: a, children: f.map((t) => /* @__PURE__ */ n.jsx(D.Tab, { label: w._(t.title), tabId: t.name }, t.name)) })
    ] }),
    f.map((t) => C(t)),
    /* @__PURE__ */ n.jsx(be, { position: "top-right" })
  ] }) });
}
export {
  Ve as default
};
