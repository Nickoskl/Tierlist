"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, }));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use('/', (0, router_1.default)());
const server = http_1.default.createServer(app);
server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on 5000`);
});
const MONGO_DB = process.env.MONGO_URL;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_DB);
mongoose_1.default.connection.on('error', (error) => console.log(error));
mongoose_1.default.connection.on('connected', () => console.log(`Connected to ${MONGO_DB}`));
console.log(Date.now());
//# sourceMappingURL=index.js.map