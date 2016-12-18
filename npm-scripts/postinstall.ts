import * as fs from "fs";

try { fs.statSync("tsconfig.json"); } catch (e) { fs.writeFileSync("tsconfig.json", fs.readFileSync("tsconfig.sample.json")); }
try { fs.statSync("server/tsconfig.json"); } catch (e) { fs.writeFileSync("server/tsconfig.json", fs.readFileSync("server/tsconfig.sample.json")); }
