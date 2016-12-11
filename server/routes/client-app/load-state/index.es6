var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import config from "../../../../gulpfile.config";
import { loadStateFromDb } from "./db";
import { loadStateFromFile } from "./file";
let initialState = undefined;
export let loadState = (user) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (config.isDev || process.env.NODE_ENV === "staging") {
            let { connectedToDB } = require("../../../db/start");
            if (connectedToDB) {
                console.log(`DB Started - creating state from DB`);
                initialState = yield loadStateFromDb(user);
            }
            else {
                let { stateFile } = require("../../../db/seed");
                console.log(`DB Not Started - creating state from file ${stateFile}`);
                initialState = yield loadStateFromFile(user);
            }
        }
        else {
            // staging/production
            if (process.env.NODE_ENV === "staging") {
                // disable db in staging until stable
                initialState = yield loadStateFromFile(user);
            }
            else {
                initialState = yield loadStateFromDb(user);
            }
        }
    }
    catch (e) {
        console.error("Failed to load initial state");
        console.error(e.stack || e);
    }
    return initialState;
});
export default loadState;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9sb2FkLXN0YXRlL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztPQUFPLE1BQU0sTUFBTSw2QkFBNkI7T0FFekMsRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNO09BQy9CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxRQUFRO0FBRTFDLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUU3QixPQUFPLElBQUksU0FBUyxHQUFHLENBQU8sSUFBUztJQUNyQyxJQUFJLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztnQkFDbkQsWUFBWSxHQUFHLE1BQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLFlBQVksR0FBRyxNQUFNLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixxQkFBcUI7WUFDckIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkMscUNBQXFDO2dCQUNyQyxZQUFZLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUvQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sWUFBWSxHQUFHLE1BQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBRTtJQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0FBQ3RCLENBQUMsQ0FBQSxDQUFDO0FBRUYsZUFBZSxTQUFTLENBQUMiLCJmaWxlIjoic2VydmVyL3JvdXRlcy9jbGllbnQtYXBwL2xvYWQtc3RhdGUvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi8uLi8uLi9ndWxwZmlsZS5jb25maWdcIjtcblxuaW1wb3J0IHsgbG9hZFN0YXRlRnJvbURiIH0gZnJvbSBcIi4vZGJcIjtcbmltcG9ydCB7IGxvYWRTdGF0ZUZyb21GaWxlIH0gZnJvbSBcIi4vZmlsZVwiO1xuXG5sZXQgaW5pdGlhbFN0YXRlID0gdW5kZWZpbmVkO1xuXG5leHBvcnQgbGV0IGxvYWRTdGF0ZSA9IGFzeW5jICh1c2VyOiBhbnkpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoY29uZmlnLmlzRGV2IHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInN0YWdpbmdcIikge1xuICAgICAgbGV0IHsgY29ubmVjdGVkVG9EQiB9ID0gcmVxdWlyZShcIi4uLy4uLy4uL2RiL3N0YXJ0XCIpO1xuICAgICAgaWYgKGNvbm5lY3RlZFRvREIpIHtcbiAgICAgICAgY29uc29sZS5sb2coYERCIFN0YXJ0ZWQgLSBjcmVhdGluZyBzdGF0ZSBmcm9tIERCYCk7XG4gICAgICAgIGluaXRpYWxTdGF0ZSA9IGF3YWl0IGxvYWRTdGF0ZUZyb21EYih1c2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB7IHN0YXRlRmlsZSB9ID0gcmVxdWlyZShcIi4uLy4uLy4uL2RiL3NlZWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEQiBOb3QgU3RhcnRlZCAtIGNyZWF0aW5nIHN0YXRlIGZyb20gZmlsZSAke3N0YXRlRmlsZX1gKTtcbiAgICAgICAgaW5pdGlhbFN0YXRlID0gYXdhaXQgbG9hZFN0YXRlRnJvbUZpbGUodXNlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0YWdpbmcvcHJvZHVjdGlvblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInN0YWdpbmdcIikge1xuICAgICAgICAvLyBkaXNhYmxlIGRiIGluIHN0YWdpbmcgdW50aWwgc3RhYmxlXG4gICAgICAgIGluaXRpYWxTdGF0ZSA9IGF3YWl0IGxvYWRTdGF0ZUZyb21GaWxlKHVzZXIpO1xuICAgICAgICAvLyBpbml0aWFsU3RhdGUgPSBsb2FkU3RhdGVGcm9tRGIodXNlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbml0aWFsU3RhdGUgPSBhd2FpdCBsb2FkU3RhdGVGcm9tRGIodXNlcik7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGluaXRpYWwgc3RhdGVcIik7XG4gICAgY29uc29sZS5lcnJvcihlLnN0YWNrIHx8IGUpO1xuICB9XG4gIHJldHVybiBpbml0aWFsU3RhdGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2FkU3RhdGU7XG4iXX0=
