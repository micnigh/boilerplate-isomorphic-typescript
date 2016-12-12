import * as express from "express";

export let router = express.Router({ mergeParams: true });

if (process.env.NODE_ENV === "development") {
  try { router.use(require("./webpack/").default); } catch (err) { console.error(err.stack || err); }
}

export default router;
