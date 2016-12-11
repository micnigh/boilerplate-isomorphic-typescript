var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import chalk from "chalk";
import util from "util";
import { Strategy } from "passport";
import uuid from "node-uuid";
export function DevelopmentStrategy(options = {}) {
    Strategy.call(this);
    this.name = "development";
}
;
util.inherits(DevelopmentStrategy, Strategy);
DevelopmentStrategy.prototype.authenticate = function (req, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user || (req.query && req.query.role)) {
            let { role } = req.query;
            role = role ? role.toUpperCase() : "GUEST";
            let sessionUser = {
                id: 1,
                guid: uuid.v4(),
                name: role.toLowerCase(),
                displayName: role.toLowerCase(),
                role,
            };
            console.log(chalk.bgBlue("Dev Strategy: Logging in as user"), JSON.stringify(sessionUser, null, 2));
            this.success(sessionUser, {});
        }
        else {
            this.pass();
        }
    });
};
export let developmentStrategy = new DevelopmentStrategy({});
export default developmentStrategy;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hdXRoL2Rldi9wYXNzcG9ydFN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O09BQU8sS0FBSyxNQUFNLE9BQU87T0FDbEIsSUFBSSxNQUFNLE1BQU07T0FDaEIsRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVO09BQzVCLElBQUksTUFBTSxXQUFXO0FBRTVCLG9DQUFvQyxPQUFPLEdBQVEsRUFBRTtJQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO0FBQzVCLENBQUM7QUFBQSxDQUFDO0FBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUU3QyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQWdCLEdBQUcsRUFBRSxPQUFPLEdBQUcsRUFBRTs7UUFDNUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN6QixJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDM0MsSUFBSSxXQUFXLEdBQUc7Z0JBQ2hCLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUN4QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDL0IsSUFBSTthQUNMLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsa0NBQWtDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztDQUFBLENBQUM7QUFFRixPQUFPLElBQUksbUJBQW1CLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUU3RCxlQUFlLG1CQUFtQixDQUFDIiwiZmlsZSI6InNlcnZlci9hdXRoL2Rldi9wYXNzcG9ydFN0cmF0ZWd5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcInV0aWxcIjtcbmltcG9ydCB7IFN0cmF0ZWd5IH0gZnJvbSBcInBhc3Nwb3J0XCI7XG5pbXBvcnQgdXVpZCBmcm9tIFwibm9kZS11dWlkXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBEZXZlbG9wbWVudFN0cmF0ZWd5KG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gIFN0cmF0ZWd5LmNhbGwodGhpcyk7XG4gIHRoaXMubmFtZSA9IFwiZGV2ZWxvcG1lbnRcIjtcbn07XG5cbnV0aWwuaW5oZXJpdHMoRGV2ZWxvcG1lbnRTdHJhdGVneSwgU3RyYXRlZ3kpO1xuXG5EZXZlbG9wbWVudFN0cmF0ZWd5LnByb3RvdHlwZS5hdXRoZW50aWNhdGUgPSBhc3luYyBmdW5jdGlvbiAocmVxLCBvcHRpb25zID0ge30pIHtcbiAgaWYgKCFyZXEudXNlciB8fCAocmVxLnF1ZXJ5ICYmIHJlcS5xdWVyeS5yb2xlKSkge1xuICAgIGxldCB7IHJvbGUgfSA9IHJlcS5xdWVyeTtcbiAgICByb2xlID0gcm9sZSA/IHJvbGUudG9VcHBlckNhc2UoKSA6IFwiR1VFU1RcIjtcbiAgICBsZXQgc2Vzc2lvblVzZXIgPSB7XG4gICAgICBpZDogMSxcbiAgICAgIGd1aWQ6IHV1aWQudjQoKSxcbiAgICAgIG5hbWU6IHJvbGUudG9Mb3dlckNhc2UoKSxcbiAgICAgIGRpc3BsYXlOYW1lOiByb2xlLnRvTG93ZXJDYXNlKCksXG4gICAgICByb2xlLFxuICAgIH07XG4gICAgY29uc29sZS5sb2coY2hhbGsuYmdCbHVlKFwiRGV2IFN0cmF0ZWd5OiBMb2dnaW5nIGluIGFzIHVzZXJcIiksIEpTT04uc3RyaW5naWZ5KHNlc3Npb25Vc2VyLCBudWxsLCAyKSk7XG4gICAgdGhpcy5zdWNjZXNzKHNlc3Npb25Vc2VyLCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wYXNzKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgZGV2ZWxvcG1lbnRTdHJhdGVneSA9IG5ldyBEZXZlbG9wbWVudFN0cmF0ZWd5KHt9KTtcblxuZXhwb3J0IGRlZmF1bHQgZGV2ZWxvcG1lbnRTdHJhdGVneTtcbiJdfQ==
