'use strict';
const fs = require('fs'),
    request = require('request');
const moment = require('moment');
require('moment/locale/zh-cn');
moment.locale('zh-cn');

module.exports.downloadFile = (fileToDl, key, path, filename1) => {
    return new Promise((resolve, reject) => {
        if (!fileToDl.status) {
            const
                random = Math.floor(Math.random() * (Math.floor(10000) - Math.ceil(1))) + 1,
                fileName = '/' + moment().format('YYYY-MM-DD').toString() + '/' + moment().format('YYYYMMDDHHmmss').toString() + '_' + random + '.' + fileToDl.ext,
                mediaDirectory = path,
                fullPath = mediaDirectory + fileName,
                fileStream = fs.createWriteStream(fullPath);
            delete fileToDl.ext
            fileStream.on('finish', function () {
                fileStream.close();
                fileToDl.filename = fullPath
                fileToDl.status = 'downloaded'
                resolve(fileToDl)
            })
                .on('error', function (err) {
                    fileToDl.status = err
                    resolve(fileToDl)
                });
            request(fileToDl.url).pipe(fileStream);
        } else
            resolve(fileToDl)
    })
}
