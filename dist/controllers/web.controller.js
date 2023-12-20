"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportPage = exports.getEpisodesPage = exports.getDiagnosesPage = exports.getPatientsPage = exports.getIndexPage = void 0;
const getIndexPage = (req, res) => {
    res.render('web/index');
};
exports.getIndexPage = getIndexPage;
const getPatientsPage = (req, res) => {
    res.render('web/patients');
};
exports.getPatientsPage = getPatientsPage;
const getDiagnosesPage = (req, res) => {
    res.render('web/diagnoses');
};
exports.getDiagnosesPage = getDiagnosesPage;
const getEpisodesPage = (req, res) => {
    res.render('web/episodes');
};
exports.getEpisodesPage = getEpisodesPage;
const getReportPage = (req, res) => {
    res.render('web/report');
};
exports.getReportPage = getReportPage;
