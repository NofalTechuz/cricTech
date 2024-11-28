const XLSX = require("xlsx");
const { Readable } = require("stream");

const bufferToStream = (buffer) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
};

const exportExcel = async (excelData) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData.data);
    XLSX.utils.book_append_sheet(wb, ws, excelData.worksheetName);
    const download = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'buffer'
    });
    excelData.res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    excelData.res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + `${excelData.worksheetName}.xlsx`
    );
    const stream = bufferToStream(download);
    stream.pipe(excelData.res);
    excelData.res.statusCode = 200;
};

module.exports = exportExcel;
