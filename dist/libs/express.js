"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const routes_1 = __importDefault(require("../routes"));
const morgan_1 = __importDefault(require("../middlewares/morgan"));
const winston_1 = __importDefault(require("./winston"));
const helper_1 = require("./helper");
const initExpress = () => (0, express_1.default)();
const useRoutes = (expressApp) => {
    expressApp.use('/', routes_1.default);
    return expressApp;
};
const useMiddlewares = (expressApp) => {
    const frontFolder = path_1.default.join(__dirname, '../../frontend');
    expressApp.set('views', `${frontFolder}/views`);
    expressApp.set('view engine', 'pug');
    expressApp.use(body_parser_1.default.json({}));
    expressApp.use(body_parser_1.default.urlencoded({ extended: false }));
    expressApp.use(express_1.default.static(`${frontFolder}/public`));
    if (!['production', 'test'].includes((0, helper_1.getEnv)())) {
        expressApp.use(morgan_1.default);
    }
    return expressApp;
};
const useErrorsHandling = (expressApp) => {
    const errorHandler = (err, req, res, next) => {
        winston_1.default.error(err.message);
        res.sendStatus(500);
    };
    expressApp.use((req, res) => res.sendStatus(404));
    expressApp.use(errorHandler);
    return expressApp;
};
const listen = (expressApp) => new Promise(res => {
    const server = expressApp.listen(config_1.default.app.port, config_1.default.app.host, () => res(server));
});
const init = () => {
    const expressApp = initExpress();
    useMiddlewares(expressApp);
    useRoutes(expressApp);
    useErrorsHandling(expressApp);
    return listen(expressApp);
};
exports.default = init;
