import { Request, Response } from 'express';

export const getIndexPage = (req: Request, res: Response) => {
  res.render('web/index');
};

export const getPatientsPage = (req: Request, res: Response) => {
  res.render('web/patients');
};

export const getDiagnosesPage = (req: Request, res: Response) => {
  res.render('web/diagnoses');
};

export const getEpisodesPage = (req: Request, res: Response) => {
  res.render('web/episodes');
};


export const getReportEpisodesPage = (req: Request, res: Response) => {
  res.render('web/report-episodes');
};

export const getReportDiagnosesPage = (req: Request, res: Response) => {
  res.render('web/report-diagnoses');
};
