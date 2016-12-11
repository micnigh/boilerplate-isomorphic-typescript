var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
describe("Can Run Tests", function () {
    it("can run a simple test", function () {
        expect(true).toEqual(true);
    });
    it("can run a simple async/await test", function (done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let i = false;
                let deferred = new Promise((resolve) => {
                    setTimeout(() => resolve(true), 0);
                });
                i = yield deferred;
                expect(i).toEqual(true);
            }
            catch (e) {
                fail(e);
            }
            finally {
                done();
            }
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci90ZXN0L3NpbXBsZVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxRQUFRLENBQUMsZUFBZSxFQUFFO0lBQ3hCLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1DQUFtQyxFQUFFLFVBQWdCLElBQUk7O1lBQzFELElBQUksQ0FBQztnQkFDSCxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ2QsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQVUsQ0FBQyxPQUFPO29CQUMxQyxVQUFVLENBQUMsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2dCQUNILENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVixDQUFDO29CQUFTLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDO1FBQ0gsQ0FBQztLQUFBLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlcnZlci90ZXN0L3NpbXBsZVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZXNjcmliZShcIkNhbiBSdW4gVGVzdHNcIiwgZnVuY3Rpb24gKCkge1xuICBpdChcImNhbiBydW4gYSBzaW1wbGUgdGVzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgZXhwZWN0KHRydWUpLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KFwiY2FuIHJ1biBhIHNpbXBsZSBhc3luYy9hd2FpdCB0ZXN0XCIsIGFzeW5jIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpID0gZmFsc2U7XG4gICAgICBsZXQgZGVmZXJyZWQgPSBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUodHJ1ZSksIDApO1xuICAgICAgfSk7XG4gICAgICBpID0gYXdhaXQgZGVmZXJyZWQ7XG4gICAgICBleHBlY3QoaSkudG9FcXVhbCh0cnVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBmYWlsKGUpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBkb25lKCk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl19
