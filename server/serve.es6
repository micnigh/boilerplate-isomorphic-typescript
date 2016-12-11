var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import chalk from "chalk";
import os from "os";
import { default as startDb, sequelize } from "./db/start";
import seedDb from "./db/seed";
let expressSession = require("express-session");
let SequelizeStore = require("connect-session-sequelize")(expressSession.Store);
import config from "../gulpfile.config";
import routes from "./routes/";
import passport from "passport";
let cookieParser = require("cookie-parser");
import DevAuthStrategy from "./auth/dev/passportStrategy";
import serializeUser from "./auth/serializeUser";
import deserializeUser from "./auth/deserializeUser";
const BASE_URL = config.baseUrl;
const PORT = config.isDev ?
    process.env.PORT || 3000 :
    process.env.PORT || 80;
export let serve = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let sequelizeStore = null;
        try {
            yield startDb();
            yield seedDb();
            sequelizeStore = new SequelizeStore({
                db: sequelize,
            });
            yield sequelizeStore.sync();
        }
        catch (err) {
            console.error(err.stack || err);
        }
        ;
        let app = express()
            .use(bodyParser.urlencoded({
            extended: true,
        }))
            .use(cookieParser())
            .use(expressSession({
            secret: "secret",
            store: sequelizeStore,
        }))
            .use(bodyParser.json())
            .use(compression())
            .use(morgan(":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :response-time ms"));
        app.use(passport.initialize());
        app.use(passport.session());
        passport.serializeUser(serializeUser);
        passport.deserializeUser(deserializeUser);
        app.use(BASE_URL, express.static(`${__dirname}/public`));
        app.use(BASE_URL, express.static(`${config.distPath}`));
        passport.use(DevAuthStrategy);
        app.get("/login", (req, res) => {
            return res.status(403).send("unauthorized: please login first");
        });
        app.use([].concat(process.env.NODE_ENV !== "production" ? [passport.authenticate("development", {})] : []), routes);
        let server = app.listen(PORT, "0.0.0.0", () => {
            let url = "http://" + os.hostname() + ":" + server.address().port + "/";
            console.log(`Server listening at ${chalk.green(url)}`);
        });
    });
};
serve();
//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQztRQUN4RCxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUc7WUFDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsR0FBRyxDQUNMLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFDbEcsTUFBTSxDQUNQLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDdkMsSUFBSSxHQUFHLEdBQUcsU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUEsQ0FBQztBQUVGLEtBQUssRUFBRSxDQUFDIiwiZmlsZSI6InNlcnZlci9zZXJ2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tIFwiY29tcHJlc3Npb25cIjtcbmltcG9ydCBtb3JnYW4gZnJvbSBcIm1vcmdhblwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IG9zIGZyb20gXCJvc1wiO1xuXG4vLyBsb2FkIGRiIGJlZm9yZSBvdGhlciBpbXBvcnRzLCBzbyBtb2RlbHMgY2FuIGJlIGxvYWRlZCBpbnRvIHNlcXVlbGl6ZVxuaW1wb3J0IHsgZGVmYXVsdCBhcyBzdGFydERiLCBzZXF1ZWxpemV9IGZyb20gXCIuL2RiL3N0YXJ0XCI7XG5pbXBvcnQgc2VlZERiIGZyb20gXCIuL2RiL3NlZWRcIjtcblxubGV0IGV4cHJlc3NTZXNzaW9uID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTtcbmxldCBTZXF1ZWxpemVTdG9yZSA9IHJlcXVpcmUoXCJjb25uZWN0LXNlc3Npb24tc2VxdWVsaXplXCIpKGV4cHJlc3NTZXNzaW9uLlN0b3JlKTtcblxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vZ3VscGZpbGUuY29uZmlnXCI7XG5pbXBvcnQgcm91dGVzIGZyb20gXCIuL3JvdXRlcy9cIjtcbmltcG9ydCBwYXNzcG9ydCBmcm9tIFwicGFzc3BvcnRcIjtcbmxldCBjb29raWVQYXJzZXIgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTtcblxuaW1wb3J0IERldkF1dGhTdHJhdGVneSBmcm9tIFwiLi9hdXRoL2Rldi9wYXNzcG9ydFN0cmF0ZWd5XCI7XG5pbXBvcnQgc2VyaWFsaXplVXNlciBmcm9tIFwiLi9hdXRoL3NlcmlhbGl6ZVVzZXJcIjtcbmltcG9ydCBkZXNlcmlhbGl6ZVVzZXIgZnJvbSBcIi4vYXV0aC9kZXNlcmlhbGl6ZVVzZXJcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBjb25maWcuYmFzZVVybDtcbmNvbnN0IFBPUlQgPSBjb25maWcuaXNEZXYgP1xuICBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDAgOlxuICBwcm9jZXNzLmVudi5QT1JUIHx8IDgwO1xuXG5leHBvcnQgbGV0IHNlcnZlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuXG4gIGxldCBzZXF1ZWxpemVTdG9yZSA9IG51bGw7XG4gIHRyeSB7XG4gICAgYXdhaXQgc3RhcnREYigpO1xuICAgIGF3YWl0IHNlZWREYigpO1xuICAgIHNlcXVlbGl6ZVN0b3JlID0gbmV3IFNlcXVlbGl6ZVN0b3JlKHtcbiAgICAgIGRiOiBzZXF1ZWxpemUsXG4gICAgfSk7XG4gICAgYXdhaXQgc2VxdWVsaXplU3RvcmUuc3luYygpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayB8fCBlcnIpO1xuICB9O1xuXG4gIGxldCBhcHAgPSBleHByZXNzKClcbiAgICAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7XG4gICAgICBleHRlbmRlZDogdHJ1ZSxcbiAgICB9KSlcbiAgICAudXNlKGNvb2tpZVBhcnNlcigpKVxuICAgIC51c2UoZXhwcmVzc1Nlc3Npb24oe1xuICAgICAgc2VjcmV0OiBcInNlY3JldFwiLFxuICAgICAgc3RvcmU6IHNlcXVlbGl6ZVN0b3JlLFxuICAgIH0pKVxuICAgIC51c2UoYm9keVBhcnNlci5qc29uKCkpXG4gICAgLnVzZShjb21wcmVzc2lvbigpKVxuICAgIC51c2UobW9yZ2FuKFwiOnJlbW90ZS1hZGRyIC0gOnJlbW90ZS11c2VyIFs6ZGF0ZVtjbGZdXSBcXFwiOm1ldGhvZCA6dXJsIEhUVFAvOmh0dHAtdmVyc2lvblxcXCIgOnN0YXR1cyA6cmVzW2NvbnRlbnQtbGVuZ3RoXSBcXFwiOnJlZmVycmVyXFxcIiBcXFwiOnVzZXItYWdlbnRcXFwiIDpyZXNwb25zZS10aW1lIG1zXCIpKTtcblxuICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gIGFwcC51c2UocGFzc3BvcnQuc2Vzc2lvbigpKTtcbiAgcGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVVc2VyKTtcbiAgcGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGRlc2VyaWFsaXplVXNlcik7XG4gIGFwcC51c2UoQkFTRV9VUkwsIGV4cHJlc3Muc3RhdGljKGAke19fZGlybmFtZX0vcHVibGljYCkpO1xuICBhcHAudXNlKEJBU0VfVVJMLCBleHByZXNzLnN0YXRpYyhgJHtjb25maWcuZGlzdFBhdGh9YCkpO1xuICBwYXNzcG9ydC51c2UoRGV2QXV0aFN0cmF0ZWd5KTtcblxuICBhcHAuZ2V0KFwiL2xvZ2luXCIsIChyZXEsIHJlcykgPT4ge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuc2VuZChcInVuYXV0aG9yaXplZDogcGxlYXNlIGxvZ2luIGZpcnN0XCIpO1xuICB9KTtcblxuICBhcHAudXNlKFxuICAgIFtdLmNvbmNhdChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBbcGFzc3BvcnQuYXV0aGVudGljYXRlKFwiZGV2ZWxvcG1lbnRcIiwge30pXSA6IFtdKSxcbiAgICByb3V0ZXNcbiAgKTtcblxuICBsZXQgc2VydmVyID0gYXBwLmxpc3RlbihQT1JULCBcIjAuMC4wLjBcIiwgKCkgPT4ge1xuICAgIGxldCB1cmwgPSBcImh0dHA6Ly9cIiArIG9zLmhvc3RuYW1lKCkgKyBcIjpcIiArIHNlcnZlci5hZGRyZXNzKCkucG9ydCArIFwiL1wiO1xuICAgIGNvbnNvbGUubG9nKGBTZXJ2ZXIgbGlzdGVuaW5nIGF0ICR7Y2hhbGsuZ3JlZW4odXJsKX1gKTtcbiAgfSk7XG59O1xuXG5zZXJ2ZSgpO1xuIl19
