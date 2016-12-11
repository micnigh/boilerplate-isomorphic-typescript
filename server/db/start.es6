var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import Sequelize from "sequelize";
let dotenv = require("dotenv").config({ path: `./server/db/${process.env.NODE_ENV}.env` });
import chalk from "chalk";
let { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, } = dotenv;
export let sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    benchmark: false,
});
export let connectedToDB = false;
let User = require("./models/user").default;
export default () => __awaiter(this, void 0, void 0, function* () {
    try {
        try {
            yield sequelize.authenticate();
            connectedToDB = true;
        }
        catch (e) {
            console.log("database unavailable");
        }
        yield sequelize.sync();
    }
    catch (e) {
        console.error(chalk.red(e.stack || e));
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9kYi9zdGFydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7T0FBTyxTQUFTLE1BQU0sV0FBVztBQUNqQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLGVBQWUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLE1BQU0sRUFBQyxDQUFDLENBQUM7T0FDbEYsS0FBSyxNQUFNLE9BQU87QUFHekIsSUFBSSxFQUNGLFVBQVUsRUFDVixjQUFjLEVBQ2QsY0FBYyxHQUNmLEdBQUcsTUFBTSxDQUFDO0FBRVgsT0FBTyxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRTtJQUMvRSxJQUFJLEVBQUUsV0FBVztJQUNqQixPQUFPLEVBQUUsT0FBTztJQUNoQixPQUFPLEVBQUUsS0FBSztJQUNkLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQztBQUVILE9BQU8sSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBRWpDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFFNUMsZUFBZTtJQUNiLElBQUksQ0FBQztRQUNILElBQUksQ0FBQztZQUFDLE1BQU0sU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUFDLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQWtCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDaEksTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBRTtJQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJzZXJ2ZXIvZGIvc3RhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VxdWVsaXplIGZyb20gXCJzZXF1ZWxpemVcIjtcbmxldCBkb3RlbnYgPSByZXF1aXJlKFwiZG90ZW52XCIpLmNvbmZpZyh7cGF0aDogYC4vc2VydmVyL2RiLyR7cHJvY2Vzcy5lbnYuTk9ERV9FTlZ9LmVudmB9KTtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2d1bHBmaWxlLmNvbmZpZ1wiO1xuXG5sZXQge1xuICBNWVNRTF9VU0VSLFxuICBNWVNRTF9QQVNTV09SRCxcbiAgTVlTUUxfREFUQUJBU0UsXG59ID0gZG90ZW52O1xuXG5leHBvcnQgbGV0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoTVlTUUxfREFUQUJBU0UsIE1ZU1FMX1VTRVIsIE1ZU1FMX1BBU1NXT1JELCB7XG4gIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gIGRpYWxlY3Q6IFwibXlzcWxcIixcbiAgbG9nZ2luZzogZmFsc2UsXG4gIGJlbmNobWFyazogZmFsc2UsXG59KTtcblxuZXhwb3J0IGxldCBjb25uZWN0ZWRUb0RCID0gZmFsc2U7XG5cbmxldCBVc2VyID0gcmVxdWlyZShcIi4vbW9kZWxzL3VzZXJcIikuZGVmYXVsdDtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIHRyeSB7IGF3YWl0IHNlcXVlbGl6ZS5hdXRoZW50aWNhdGUoKTsgY29ubmVjdGVkVG9EQiA9IHRydWU7IH0gY2F0Y2ggKGUpIHsgLyogZG8gbm90aGluZyAqLyBjb25zb2xlLmxvZyhcImRhdGFiYXNlIHVuYXZhaWxhYmxlXCIpIH1cbiAgICBhd2FpdCBzZXF1ZWxpemUuc3luYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihjaGFsay5yZWQoZS5zdGFjayB8fCBlKSk7XG4gIH1cbn07XG4iXX0=
