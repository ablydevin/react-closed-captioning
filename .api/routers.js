
// Imports
import * as _0_0 from "//Users/devinrader/Projects/react-closed-captioning/src/api/tokens/realtime.js";
import * as _0_1 from "//Users/devinrader/Projects/react-closed-captioning/src/api/tokens/transcription.js";


export const routeBase = "/api";

const internal  = [
  _0_0.default && {
        source     : "src/api/tokens/realtime.js?fn=default",
        method     : "use",
        route      : "/tokens/realtime",
        path       : "/api/tokens/realtime",
        url        : "/api/tokens/realtime",
        cb         : _0_0.default,
      },
  _0_0.GET && {
        source     : "src/api/tokens/realtime.js?fn=GET",
        method     : "get",
        route      : "/tokens/realtime",
        path       : "/api/tokens/realtime",
        url        : "/api/tokens/realtime",
        cb         : _0_0.GET,
      },
  _0_0.PUT && {
        source     : "src/api/tokens/realtime.js?fn=PUT",
        method     : "put",
        route      : "/tokens/realtime",
        path       : "/api/tokens/realtime",
        url        : "/api/tokens/realtime",
        cb         : _0_0.PUT,
      },
  _0_0.POST && {
        source     : "src/api/tokens/realtime.js?fn=POST",
        method     : "post",
        route      : "/tokens/realtime",
        path       : "/api/tokens/realtime",
        url        : "/api/tokens/realtime",
        cb         : _0_0.POST,
      },
  _0_0.PATCH && {
        source     : "src/api/tokens/realtime.js?fn=PATCH",
        method     : "patch",
        route      : "/tokens/realtime",
        path       : "/api/tokens/realtime",
        url        : "/api/tokens/realtime",
        cb         : _0_0.PATCH,
      },
  _0_0.DELETE && {
        source     : "src/api/tokens/realtime.js?fn=DELETE",
        method     : "delete",
        route      : "/tokens/realtime",
        path       : "/api/tokens/realtime",
        url        : "/api/tokens/realtime",
        cb         : _0_0.DELETE,
      },
  _0_1.default && {
        source     : "src/api/tokens/transcription.js?fn=default",
        method     : "use",
        route      : "/tokens/transcription",
        path       : "/api/tokens/transcription",
        url        : "/api/tokens/transcription",
        cb         : _0_1.default,
      },
  _0_1.GET && {
        source     : "src/api/tokens/transcription.js?fn=GET",
        method     : "get",
        route      : "/tokens/transcription",
        path       : "/api/tokens/transcription",
        url        : "/api/tokens/transcription",
        cb         : _0_1.GET,
      },
  _0_1.PUT && {
        source     : "src/api/tokens/transcription.js?fn=PUT",
        method     : "put",
        route      : "/tokens/transcription",
        path       : "/api/tokens/transcription",
        url        : "/api/tokens/transcription",
        cb         : _0_1.PUT,
      },
  _0_1.POST && {
        source     : "src/api/tokens/transcription.js?fn=POST",
        method     : "post",
        route      : "/tokens/transcription",
        path       : "/api/tokens/transcription",
        url        : "/api/tokens/transcription",
        cb         : _0_1.POST,
      },
  _0_1.PATCH && {
        source     : "src/api/tokens/transcription.js?fn=PATCH",
        method     : "patch",
        route      : "/tokens/transcription",
        path       : "/api/tokens/transcription",
        url        : "/api/tokens/transcription",
        cb         : _0_1.PATCH,
      },
  _0_1.DELETE && {
        source     : "src/api/tokens/transcription.js?fn=DELETE",
        method     : "delete",
        route      : "/tokens/transcription",
        path       : "/api/tokens/transcription",
        url        : "/api/tokens/transcription",
        cb         : _0_1.DELETE,
      }
].filter(it => it);

export const routers = internal.map((it) => { 
  const { method, path, route, url, source} = it;
  return { method, url, path, route, source };
});

export const endpoints = internal.map((it) => it.method?.toUpperCase() + '\t' + it.url);

const FN = (value) => value;

export const applyRouters = (applyRouter, opts = {} ) => {
  const {pre = FN, post = FN, hoc = FN} = opts;
  pre(internal)
    .forEach((it) => {
    it.cb = hoc(it.cb, it);
    applyRouter(it);
  });  
  post(internal);
};
