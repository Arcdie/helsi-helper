"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportDiagnosesPage = exports.getReportEpisodesPage = exports.getEpisodesPage = exports.getDiagnosesPage = exports.getPatientsPage = exports.getIndexPage = void 0;
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
const getReportEpisodesPage = (req, res) => {
    res.render('web/report-episodes');
};
exports.getReportEpisodesPage = getReportEpisodesPage;
const getReportDiagnosesPage = (req, res) => {
    res.render('web/report-diagnoses');
};
exports.getReportDiagnosesPage = getReportDiagnosesPage;
