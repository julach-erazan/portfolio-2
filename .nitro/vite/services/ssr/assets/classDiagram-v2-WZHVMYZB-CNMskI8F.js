import { s as styles_default, c as classRenderer_v3_unified_default, a as classDiagram_default, C as ClassDB } from "./chunk-B4BG7PRW-D7mWeFwc.js";
import { _ as __name } from "./mermaid.core-DCmG7zLC.js";
import "./chunk-FMBD7UC4-D_OX2Bkp.js";
import "./chunk-55IACEB6-DCo3bvZH.js";
import "./chunk-QN33PNHL-TzAI5ICM.js";
import "../server.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
var diagram = {
  parser: classDiagram_default,
  get db() {
    return new ClassDB();
  },
  renderer: classRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
