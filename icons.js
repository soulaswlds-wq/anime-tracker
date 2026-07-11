/* ---------------------------------------------------------------
   Minimal inline icon set (replaces lucide-react so the app needs
   no npm install / bundler — just plain SVGs drawn with React).
   Same visual language (24x24 viewBox, stroke-based) as lucide.

   Wrapped in an IIFE so these consts (Star, X, Search, ...) stay
   local to this file and don't collide with same-named identifiers
   declared elsewhere (e.g. app.js also destructures a `Star` from
   window.Icons — without this wrapper both consts would land in
   the same global scope and throw "Identifier already declared").
   ---------------------------------------------------------------- */
(function () {
const { createElement: h } = React;

function makeIcon(paths) {
  return function Icon({ size = 18, strokeWidth = 2, color = "currentColor", fill = "none", style, ...rest }) {
    return h(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: fill,
        stroke: color,
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style,
        ...rest,
      },
      paths.map((p, i) => h("path", { key: i, d: p.d, fill: p.fill }))
    );
  };
}

const Star = function ({ size = 18, strokeWidth = 1.6, color = "currentColor", fill = "none", style, ...rest }) {
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: fill,
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style,
      ...rest,
    },
    h("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
  );
};

const X = makeIcon([{ d: "M18 6 6 18" }, { d: "m6 6 12 12" }]);

const Search = function ({ size = 18, strokeWidth = 2, color = "currentColor", style, ...rest }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style, ...rest },
    h("circle", { cx: 11, cy: 11, r: 8 }),
    h("path", { d: "m21 21-4.3-4.3" })
  );
};

const Film = function ({ size = 18, strokeWidth = 2, color = "currentColor", style, ...rest }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style, ...rest },
    h("rect", { x: 2, y: 3, width: 20, height: 18, rx: 2 }),
    h("path", { d: "M7 3v18M17 3v18M2 8h5M2 16h5M17 8h5M17 16h5" })
  );
};

const Tv = function ({ size = 18, strokeWidth = 2, color = "currentColor", style, ...rest }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style, ...rest },
    h("rect", { x: 2, y: 7, width: 20, height: 15, rx: 2 }),
    h("path", { d: "m17 2-5 5-5-5" })
  );
};

const Calendar = function ({ size = 18, strokeWidth = 2, color = "currentColor", style, ...rest }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style, ...rest },
    h("rect", { x: 3, y: 4, width: 18, height: 18, rx: 2 }),
    h("path", { d: "M16 2v4M8 2v4M3 10h18" })
  );
};

const Building2 = function ({ size = 18, strokeWidth = 2, color = "currentColor", style, ...rest }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style, ...rest },
    h("path", {
      d: "M6 22V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v18M6 12H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2M14 9h4a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-4M10 6h.01M10 10h.01M10 14h.01M10 18h.01",
    })
  );
};

const Layers = function ({ size = 18, strokeWidth = 2, color = "currentColor", style, ...rest }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style, ...rest },
    h("path", { d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" }),
    h("path", { d: "m22 12.5-8.58 3.9a2 2 0 0 1-1.66 0L3.18 12.5" }),
    h("path", { d: "m22 17.5-8.58 3.9a2 2 0 0 1-1.66 0L3.18 17.5" })
  );
};

const ChevronDown = makeIcon([{ d: "m6 9 6 6 6-6" }]);
const Check = makeIcon([{ d: "M20 6 9 17l-5-5" }]);

const StickyNote = function ({ size = 18, strokeWidth = 2, color = "currentColor", style, ...rest }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style, ...rest },
    h("path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11l6-6V5a2 2 0 0 0-2-2Z" }),
    h("path", { d: "M15 3v6h6" })
  );
};

window.Icons = { Star, X, Search, Film, Tv, Calendar, Building2, Layers, ChevronDown, Check, StickyNote };
})();
