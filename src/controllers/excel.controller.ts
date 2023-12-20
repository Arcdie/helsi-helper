import ExcelJS from 'exceljs';
import { Request, Response } from 'express';

import { badRequestResponse } from '../libs/expressResponses';

export const createExelFile = async (req: Request, res: Response) => {
  const {
    tableBody,
    tableHeaders,
  }: {
    tableBody: string[][];
    tableHeaders: string[];
  } = req.body;

  if (!tableBody || !tableBody.length) {
    return badRequestResponse(res, 'No tableBody');
  }

  if (!tableHeaders || !tableHeaders.length) {
    return badRequestResponse(res, 'No tableHeaders');
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  worksheet.addTable({
    name: 'Table1',
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      theme: 'TableStyleMedium9',
      showRowStripes: true,
    },
    columns: tableHeaders.map((e) => ({ name: e })),
    rows: tableBody,
  });

  const excelBuffer = await workbook.xlsx.writeBuffer();
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
  res.send(excelBuffer);
};
