var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import chalk from "chalk";
import config from "../../../gulpfile.config";
import path from "path";
let escape = require("regexp.escape");
import { Provider } from "react-redux";
let htmlTemplate = require("./templates/index.html");
import { loadState } from "./load-state/";
export let router = express.Router({ mergeParams: true });
router.get(`${config.baseUrl}*`, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let initialState = undefined;
        let { user } = req;
        user = user ? user : {
            displayName: "Guest",
            role: "GUEST",
        };
        console.log(chalk.bgBlue(`clientApp user`), JSON.stringify(user, null, 2));
        if (process.env.NODE_ENV !== "production") {
            clearNodeModuleCache();
        }
        initialState = yield loadState(user);
        let { initStore } = require("../../../client/js/src/store/");
        let store = initStore(initialState);
        let routes = require("../../../client/js/src/routes/").default;
        match({
            routes,
            location: req.url,
        }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            }
            else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }
            else if (renderProps) {
                try {
                    res.status(200).send(htmlTemplate({
                        isDev: config.isDev,
                        inlineJS: `
              window.initialState = ${JSON.stringify(initialState)}
            `,
                        content: renderToString(React.createElement(Provider, {store: store}, React.createElement(RouterContext, __assign({}, renderProps)))),
                        relPathToBaseUrl: relPathToBaseUrl(req.url),
                    }));
                }
                catch (e) {
                    console.log(chalk.red(e.stack));
                    res.status(200).send(htmlTemplate({
                        isDev: config.isDev,
                        inlineJS: `
              window.initialState = ${JSON.stringify(initialState)}
            `,
                        content: ``,
                        relPathToBaseUrl: relPathToBaseUrl(req.url),
                    }));
                }
            }
            else {
                res.status(404).send("Not found");
            }
        });
    }
    catch (e) {
        console.error(chalk.red(e.stack || e));
    }
}));
let relPathToBaseUrl = function (path) {
    let result = path;
    result = result.replace(config.baseUrl, "/"); // remove baseUrl
    result = result.replace(/^.*?:\/\//, "", ""); // remove protocol
    result = "../".repeat(result.match(/\//g).length - 1); // each subdir = "../"
    return result;
};
/**
 * Clears modules from node cache, so calling require will rebuild module
 */
let clearNodeModuleCache = function (options = {
        includePaths: [],
        excludePaths: [],
    }) {
    options = Object.assign({
        includePaths: [],
        excludePaths: [],
    }, options);
    let { includePaths, excludePaths } = options;
    excludePaths.push("node_modules");
    let regExpIncludePaths = includePaths.map(p => new RegExp("^" + escape(path.resolve(`${process.cwd()}/${p}`))));
    let regExpExcludePaths = excludePaths.map(p => new RegExp("^" + escape(path.resolve(`${process.cwd()}/${p}`))));
    let modulesToDelete = [];
    for (let k in require.cache) {
        if (regExpIncludePaths.length > 0) {
            if (regExpIncludePaths.some(r => r.test(k)) &&
                !regExpExcludePaths.some(r => r.test(k))) {
                modulesToDelete.push(k);
            }
        }
        else {
            if (!regExpExcludePaths.some(r => r.test(k))) {
                modulesToDelete.push(k);
            }
        }
    }
    console.log(modulesToDelete);
    modulesToDelete.forEach(m => delete require.cache[m]);
    console.log(chalk.yellow(`Cleared module cache with RegExp - deleted ${modulesToDelete.length} modules`));
};
export default router;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztPQUFPLEtBQUssTUFBTSxPQUFPO09BQ2xCLE9BQU8sTUFBTSxTQUFTO09BQ3RCLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCO09BQzFDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWM7T0FDNUMsS0FBSyxNQUFNLE9BQU87T0FDbEIsTUFBTSxNQUFNLDBCQUEwQjtPQUN0QyxJQUFJLE1BQU0sTUFBTTtBQUN2QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7T0FFL0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhO0FBQ3RDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO09BQzlDLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZTtBQUV6QyxPQUFPLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUUxRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ3BELElBQUksQ0FBQztRQUNILElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUM3QixJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHO1lBQ25CLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFD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LENBQUMsQ0FBQztBQUVGLGVBQWUsTUFBTSxDQUFDIiwiZmlsZSI6InNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCI7XG5pbXBvcnQgeyBtYXRjaCwgUm91dGVyQ29udGV4dCB9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uLy4uL2d1bHBmaWxlLmNvbmZpZ1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmxldCBlc2NhcGUgPSByZXF1aXJlKFwicmVnZXhwLmVzY2FwZVwiKTtcblxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmxldCBodG1sVGVtcGxhdGUgPSByZXF1aXJlKFwiLi90ZW1wbGF0ZXMvaW5kZXguaHRtbFwiKTtcbmltcG9ydCB7IGxvYWRTdGF0ZSB9IGZyb20gXCIuL2xvYWQtc3RhdGUvXCI7XG5cbmV4cG9ydCBsZXQgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoeyBtZXJnZVBhcmFtczogdHJ1ZSB9KTtcblxucm91dGVyLmdldChgJHtjb25maWcuYmFzZVVybH0qYCwgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgbGV0IGluaXRpYWxTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgeyB1c2VyIH0gPSByZXE7XG4gICAgdXNlciA9IHVzZXIgPyB1c2VyIDoge1xuICAgICAgZGlzcGxheU5hbWU6IFwiR3Vlc3RcIixcbiAgICAgIHJvbGU6IFwiR1VFU1RcIixcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnQmx1ZShgY2xpZW50QXBwIHVzZXJgKSwgSlNPTi5zdHJpbmdpZnkodXNlciwgbnVsbCwgMikpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNsZWFyTm9kZU1vZHVsZUNhY2hlKCk7XG4gICAgfVxuICAgIGluaXRpYWxTdGF0ZSA9IGF3YWl0IGxvYWRTdGF0ZSh1c2VyKTtcblxuICAgIGxldCB7IGluaXRTdG9yZSB9ID0gcmVxdWlyZShcIi4uLy4uLy4uL2NsaWVudC9qcy9zcmMvc3RvcmUvXCIpO1xuICAgIGxldCBzdG9yZSA9IGluaXRTdG9yZShpbml0aWFsU3RhdGUpO1xuICAgIGxldCByb3V0ZXMgPSByZXF1aXJlKFwiLi4vLi4vLi4vY2xpZW50L2pzL3NyYy9yb3V0ZXMvXCIpLmRlZmF1bHQ7XG5cbiAgICBtYXRjaCh7XG4gICAgICByb3V0ZXMsXG4gICAgICBsb2NhdGlvbjogcmVxLnVybCxcbiAgICB9LCAoZXJyb3IsIHJlZGlyZWN0TG9jYXRpb24sIHJlbmRlclByb3BzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9IGVsc2UgaWYgKHJlZGlyZWN0TG9jYXRpb24pIHtcbiAgICAgICAgcmVzLnJlZGlyZWN0KDMwMiwgcmVkaXJlY3RMb2NhdGlvbi5wYXRobmFtZSArIHJlZGlyZWN0TG9jYXRpb24uc2VhcmNoKTtcbiAgICAgIH0gZWxzZSBpZiAocmVuZGVyUHJvcHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChodG1sVGVtcGxhdGUoe1xuICAgICAgICAgICAgaXNEZXY6IGNvbmZpZy5pc0RldixcbiAgICAgICAgICAgIGlubGluZUpTOiBgXG4gICAgICAgICAgICAgIHdpbmRvdy5pbml0aWFsU3RhdGUgPSAke0pTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSl9XG4gICAgICAgICAgICBgLFxuICAgICAgICAgICAgY29udGVudDogcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgIDxSb3V0ZXJDb250ZXh0IHsuLi5yZW5kZXJQcm9wc30gLz5cbiAgICAgICAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByZWxQYXRoVG9CYXNlVXJsOiByZWxQYXRoVG9CYXNlVXJsKHJlcS51cmwpLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChlLnN0YWNrKSk7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoaHRtbFRlbXBsYXRlKHtcbiAgICAgICAgICAgIGlzRGV2OiBjb25maWcuaXNEZXYsXG4gICAgICAgICAgICBpbmxpbmVKUzogYFxuICAgICAgICAgICAgICB3aW5kb3cuaW5pdGlhbFN0YXRlID0gJHtKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpfVxuICAgICAgICAgICAgYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGBgLFxuICAgICAgICAgICAgcmVsUGF0aFRvQmFzZVVybDogcmVsUGF0aFRvQmFzZVVybChyZXEudXJsKSxcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm90IGZvdW5kXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihjaGFsay5yZWQoZS5zdGFjayB8fCBlKSk7XG4gIH1cbn0pO1xuXG5sZXQgcmVsUGF0aFRvQmFzZVVybCA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gIGxldCByZXN1bHQgPSBwYXRoO1xuICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShjb25maWcuYmFzZVVybCwgXCIvXCIpOyAvLyByZW1vdmUgYmFzZVVybFxuICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXi4qPzpcXC9cXC8vLCBcIlwiLCBcIlwiKTsgLy8gcmVtb3ZlIHByb3RvY29sXG4gIHJlc3VsdCA9IFwiLi4vXCIucmVwZWF0KHJlc3VsdC5tYXRjaCgvXFwvL2cpLmxlbmd0aCAtIDEpOyAvLyBlYWNoIHN1YmRpciA9IFwiLi4vXCJcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQ2xlYXJzIG1vZHVsZXMgZnJvbSBub2RlIGNhY2hlLCBzbyBjYWxsaW5nIHJlcXVpcmUgd2lsbCByZWJ1aWxkIG1vZHVsZVxuICovXG5sZXQgY2xlYXJOb2RlTW9kdWxlQ2FjaGUgPSBmdW5jdGlvbiAob3B0aW9uczoge1xuICAvKiogcmVsYXRpdmUgaW5jbHVkZSBwYXRocyBmcm9tIHByb2plY3QgZGlyICovXG4gIGluY2x1ZGVQYXRocz86IHN0cmluZ1tdLFxuICAvKiogcmVsYXRpdmUgZXhjbHVkZSBwYXRocyBmcm9tIHByb2plY3QgZGlyICovXG4gIGV4Y2x1ZGVQYXRocz86IHN0cmluZ1tdXG59ID0ge1xuICBpbmNsdWRlUGF0aHM6IFtdLFxuICBleGNsdWRlUGF0aHM6IFtdLFxufSkge1xuICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgaW5jbHVkZVBhdGhzOiBbXSxcbiAgICBleGNsdWRlUGF0aHM6IFtdLFxuICB9LCBvcHRpb25zKTtcbiAgbGV0IHsgaW5jbHVkZVBhdGhzLCBleGNsdWRlUGF0aHMgfSA9IG9wdGlvbnM7XG4gIGV4Y2x1ZGVQYXRocy5wdXNoKFwibm9kZV9tb2R1bGVzXCIpO1xuICBsZXQgcmVnRXhwSW5jbHVkZVBhdGhzID0gaW5jbHVkZVBhdGhzLm1hcChwID0+IG5ldyBSZWdFeHAoXCJeXCIgKyBlc2NhcGUocGF0aC5yZXNvbHZlKGAke3Byb2Nlc3MuY3dkKCl9LyR7cH1gKSkpKTtcbiAgbGV0IHJlZ0V4cEV4Y2x1ZGVQYXRocyA9IGV4Y2x1ZGVQYXRocy5tYXAocCA9PiBuZXcgUmVnRXhwKFwiXlwiICsgZXNjYXBlKHBhdGgucmVzb2x2ZShgJHtwcm9jZXNzLmN3ZCgpfS8ke3B9YCkpKSk7XG4gIGxldCBtb2R1bGVzVG9EZWxldGUgPSBbXTtcbiAgZm9yIChsZXQgayBpbiByZXF1aXJlLmNhY2hlKSB7XG4gICAgaWYgKHJlZ0V4cEluY2x1ZGVQYXRocy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHJlZ0V4cEluY2x1ZGVQYXRocy5zb21lKHIgPT4gci50ZXN0KGspKSAmJlxuICAgICAgICAhcmVnRXhwRXhjbHVkZVBhdGhzLnNvbWUociA9PiByLnRlc3QoaykpXG4gICAgICApIHtcbiAgICAgICAgbW9kdWxlc1RvRGVsZXRlLnB1c2goayk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXJlZ0V4cEV4Y2x1ZGVQYXRocy5zb21lKHIgPT4gci50ZXN0KGspKVxuICAgICAgKSB7XG4gICAgICAgIG1vZHVsZXNUb0RlbGV0ZS5wdXNoKGspO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZyhtb2R1bGVzVG9EZWxldGUpO1xuICBtb2R1bGVzVG9EZWxldGUuZm9yRWFjaChtID0+IGRlbGV0ZSByZXF1aXJlLmNhY2hlW21dKTtcbiAgY29uc29sZS5sb2coY2hhbGsueWVsbG93KGBDbGVhcmVkIG1vZHVsZSBjYWNoZSB3aXRoIFJlZ0V4cCAtIGRlbGV0ZWQgJHttb2R1bGVzVG9EZWxldGUubGVuZ3RofSBtb2R1bGVzYCkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIl19
