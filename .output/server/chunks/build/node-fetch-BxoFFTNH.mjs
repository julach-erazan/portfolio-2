const fetch = (...args) => globalThis.fetch(...args);
const redirectStatus = /* @__PURE__ */ new Set([
  301,
  302,
  303,
  307,
  308
]);
const isRedirect = (code) => redirectStatus.has(code);
fetch.Promise = globalThis.Promise;
fetch.isRedirect = isRedirect;
export {
  fetch as default,
  fetch,
  isRedirect
};
