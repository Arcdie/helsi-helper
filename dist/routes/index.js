"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const web_route_1 = __importDefault(require("./web.route"));
const patient_route_1 = __importDefault(require("./patient.route"));
const episode_route_1 = __importDefault(require("./episode.route"));
const diagnosis_route_1 = __importDefault(require("./diagnosis.route"));
const router = (0, express_1.Router)();
router.use('/', web_route_1.default);
router.use('/api/patients', patient_route_1.default);
router.use('/api/episodes', episode_route_1.default);
router.use('/api/diagnoses', diagnosis_route_1.default);
exports.default = router;
