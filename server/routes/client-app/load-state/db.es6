var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import { sequelize } from "../../../db/start";
export let loadStateFromDb = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        let initialState = {
            entities: {},
        };
        let transaction = yield sequelize.transaction();
        try {
        }
        catch (e) {
            yield transaction.rollback();
            console.error(e.stack || e);
        }
        yield transaction.commit();
        return initialState;
    });
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9sb2FkLXN0YXRlL2RiLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztPQUNPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CO0FBRTdDLE9BQU8sSUFBSSxlQUFlLEdBQUcsVUFBZ0IsSUFBUzs7UUFDcEQsSUFBSSxZQUFZLEdBQUc7WUFDakIsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUYsSUFBSSxXQUFXLEdBQUcsTUFBTSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFaEQsSUFBSSxDQUFDO1FBR0wsQ0FBRTtRQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELE1BQU0sV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTNCLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDdEIsQ0FBQztDQUFBLENBQUMiLCJmaWxlIjoic2VydmVyL3JvdXRlcy9jbGllbnQtYXBwL2xvYWQtc3RhdGUvZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7IHNlcXVlbGl6ZSB9IGZyb20gXCIuLi8uLi8uLi9kYi9zdGFydFwiO1xuXG5leHBvcnQgbGV0IGxvYWRTdGF0ZUZyb21EYiA9IGFzeW5jIGZ1bmN0aW9uICh1c2VyOiBhbnkpIHtcbiAgbGV0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBlbnRpdGllczoge30sXG4gIH07XG5cbiAgbGV0IHRyYW5zYWN0aW9uID0gYXdhaXQgc2VxdWVsaXplLnRyYW5zYWN0aW9uKCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBsb2FkIHN0YXRlIGZyb20gZGJcbiAgICBcbiAgfSBjYXRjaCAoZSkge1xuICAgIGF3YWl0IHRyYW5zYWN0aW9uLnJvbGxiYWNrKCk7XG4gICAgY29uc29sZS5lcnJvcihlLnN0YWNrIHx8IGUpO1xuICB9XG5cbiAgYXdhaXQgdHJhbnNhY3Rpb24uY29tbWl0KCk7XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn07XG4iXX0=
