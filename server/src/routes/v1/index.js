import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-10) === ".router.js")
  .forEach(async (file) => {
    const route = file.split(".")[0];
    const routeFile = await import(path.join(__dirname, file));
    router.use(`/${route}`, routeFile.default);
  });

export default router;
