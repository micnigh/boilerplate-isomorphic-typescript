var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import mkdirp from "mkdirp";
import chalk from "chalk";
import config from "../../gulpfile.config";
import fs from "fs";
import moment from "moment";
import { sequelize } from "./start";
export let initialState = undefined;
let stateDir = `${config.tmpPath}/state/`;
mkdirp.sync(stateDir);
export let stateFile = `${stateDir}${moment().endOf("day").format("YYYY-MM-DD")}.json`;
export let generatedNewState = false;
try {
    fs.statSync(stateFile);
    // state file exists - load it
    initialState = JSON.parse(fs.readFileSync(stateFile).toString());
}
catch (e) {
    // no state exists - create it
    initialState = require("../../client/js/src/store/sample/").default;
    fs.writeFileSync(stateFile, JSON.stringify(initialState, null, 2));
    generatedNewState = true;
}
export let shouldSeedDb = () => generatedNewState;
export let generateNewState = () => {
    return require("../../client/js/src/store/sample/default").default();
};
export default () => __awaiter(this, void 0, void 0, function* () {
    if (!shouldSeedDb())
        return;
    console.time("SEED DB");
    let forceSyncTables = process.env.NODE_ENV === "development" ? true : false;
    try {
        yield sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
        yield sequelize.sync({ force: forceSyncTables });
        yield sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
        if (process.env.NODE_ENV !== "production") {
        }
    }
    catch (e) {
        console.error(chalk.red(e.stack || e));
    }
    console.timeEnd("SEED DB");
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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dCI6WyJpbXBvcnQgbWtkaXJwIGZyb20gXCJta2RpcnBcIjtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2d1bHBmaWxlLmNvbmZpZ1wiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgdXVpZCBmcm9tIFwibm9kZS11dWlkXCI7XG5pbXBvcnQgeyBzZXF1ZWxpemUgfSBmcm9tIFwiLi9zdGFydFwiO1xuXG5pbXBvcnQgVXNlciBmcm9tIFwiLi9tb2RlbHMvdXNlclwiO1xuXG5leHBvcnQgbGV0IGluaXRpYWxTdGF0ZTogYW55ID0gdW5kZWZpbmVkO1xuXG5sZXQgc3RhdGVEaXIgPSBgJHtjb25maWcudG1wUGF0aH0vc3RhdGUvYDtcbm1rZGlycC5zeW5jKHN0YXRlRGlyKTtcbmV4cG9ydCBsZXQgc3RhdGVGaWxlID0gYCR7c3RhdGVEaXJ9JHttb21lbnQoKS5lbmRPZihcImRheVwiKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpfS5qc29uYDtcbmV4cG9ydCBsZXQgZ2VuZXJhdGVkTmV3U3RhdGUgPSBmYWxzZTtcblxudHJ5IHtcbiAgZnMuc3RhdFN5bmMoc3RhdGVGaWxlKTtcbiAgLy8gc3RhdGUgZmlsZSBleGlzdHMgLSBsb2FkIGl0XG4gIGluaXRpYWxTdGF0ZSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHN0YXRlRmlsZSkudG9TdHJpbmcoKSk7XG59IGNhdGNoIChlKSB7XG4gIC8vIG5vIHN0YXRlIGV4aXN0cyAtIGNyZWF0ZSBpdFxuICBpbml0aWFsU3RhdGUgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L2pzL3NyYy9zdG9yZS9zYW1wbGUvXCIpLmRlZmF1bHQ7XG4gIGZzLndyaXRlRmlsZVN5bmMoc3RhdGVGaWxlLCBKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUsIG51bGwsIDIpKTtcbiAgZ2VuZXJhdGVkTmV3U3RhdGUgPSB0cnVlO1xufVxuXG5leHBvcnQgbGV0IHNob3VsZFNlZWREYiA9ICgpID0+IGdlbmVyYXRlZE5ld1N0YXRlO1xuXG5leHBvcnQgbGV0IGdlbmVyYXRlTmV3U3RhdGUgPSAoKSA9PiB7XG4gIHJldHVybiByZXF1aXJlKFwiLi4vLi4vY2xpZW50L2pzL3NyYy9zdG9yZS9zYW1wbGUvZGVmYXVsdFwiKS5kZWZhdWx0KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XG4gIGlmICghc2hvdWxkU2VlZERiKCkpIHJldHVybjtcblxuICBjb25zb2xlLnRpbWUoXCJTRUVEIERCXCIpO1xuXG4gIGxldCBmb3JjZVN5bmNUYWJsZXMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgc2VxdWVsaXplLnF1ZXJ5KFwiU0VUIEZPUkVJR05fS0VZX0NIRUNLUyA9IDBcIiwgeyByYXc6IHRydWUgfSk7XG4gICAgYXdhaXQgc2VxdWVsaXplLnN5bmMoeyBmb3JjZTogZm9yY2VTeW5jVGFibGVzIH0pO1xuICAgIGF3YWl0IHNlcXVlbGl6ZS5xdWVyeShcIlNFVCBGT1JFSUdOX0tFWV9DSEVDS1MgPSAxXCIsIHtyYXc6IHRydWV9KTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAvLyBhZGQgc2VlZCBkYXRhIGhlcmVcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGNoYWxrLnJlZChlLnN0YWNrIHx8IGUpKTtcbiAgfVxuXG4gIGNvbnNvbGUudGltZUVuZChcIlNFRUQgREJcIik7XG59O1xuIl19
