'use strict';
const fs = require('fs'),
    request = require('request');
const moment = require('moment');
require('moment/locale/zh-cn');
moment.locale('zh-cn');

const path = require('path');

module.exports.downloadFile = (fileToDl, key, path2, filename1) => {

    return new Promise( (resolve, reject) => {

        if (!fileToDl.status) {

            //创建目录
            const wenjianjia=moment().format('YYYY-MM-DD').toString();
            const mulu="../../../../public/upload/images/"+wenjianjia;
            //检查文件夹是否存在
            var stat = fs.existsSync(path.resolve(__dirname, mulu));
            console.log(stat);
            if(!stat){//为true的话那么存在，如果为false不存在
                fs.mkdir(path.resolve(__dirname, mulu), {
                    recursive: true  //是否递归,默认false
                }, (err) => {
                    console.log(5);
                    if(err){
                        console.log('创建目录失败！',err);
                        return;
                    }


                });
            };



            const
                random = Math.floor(Math.random() * (Math.floor(10000) - Math.ceil(1))) + 1,
                fileName = '/' + wenjianjia + '/' + moment().format('YYYYMMDDHHmmss').toString() + '_' + random + '.' + fileToDl.ext,
                mediaDirectory = path2,
                fullPath = mediaDirectory + fileName,

                fileStream = fs.createWriteStream(fullPath);
            console.log(fullPath);
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
