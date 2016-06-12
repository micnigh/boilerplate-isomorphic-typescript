import express from "express";

import apiRouter from "./api/";
import clientAppRouter from "./client-app/";
import proxyRouter from "./proxy/";

export let router = express.Router({ mergeParams: true });

router.use("/api", apiRouter);
router.use(proxyRouter);
router.use(clientAppRouter);

export default router;
