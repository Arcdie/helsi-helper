"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExelFile = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const expressResponses_1 = require("../libs/expressResponses");
const createExelFile = async (req, res) => {
    const { tableBody, tableHeaders, } = req.body;
    if (!tableBody || !tableBody.length) {
        return (0, expressResponses_1.badRequestResponse)(res, 'No tableBody');
    }
    if (!tableHeaders || !tableHeaders.length) {
        return (0, expressResponses_1.badRequestResponse)(res, 'No tableHeaders');
    }
    const workbook = new exceljs_1.default.Workbook();
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
exports.createExelFile = createExelFile;
