var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
export let loadStateFromFile = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        let initialState = require("../../../db/seed").initialState;
        return initialState;
    });
};
export default loadStateFromFile;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9sb2FkLXN0YXRlL2ZpbGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxJQUFJLGlCQUFpQixHQUFHLFVBQWdCLElBQVM7O1FBQ3RELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUM1RCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FBQSxDQUFDO0FBRUYsZUFBZSxpQkFBaUIsQ0FBQyIsImZpbGUiOiJzZXJ2ZXIvcm91dGVzL2NsaWVudC1hcHAvbG9hZC1zdGF0ZS9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGxldCBsb2FkU3RhdGVGcm9tRmlsZSA9IGFzeW5jIGZ1bmN0aW9uICh1c2VyOiBhbnkpIHtcbiAgbGV0IGluaXRpYWxTdGF0ZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9kYi9zZWVkXCIpLmluaXRpYWxTdGF0ZTtcbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRTdGF0ZUZyb21GaWxlO1xuIl19
