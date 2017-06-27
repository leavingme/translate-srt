"use strict";

const fs = require('fs');
const translate = require('google-translate-api');

const base_path = "D:\\ud501\\02-01 So you want to be a hedge fund manager- Subtitles";
const lang = 'CHS';

fs.readdir(base_path, (err, files) => {
    files.forEach((file, index) => {
        if (file.indexOf(lang) != -1) {
            return;
        }

        var filename = `${base_path}\\${file}`;

        fs.readFile(filename, 'utf8', async (err, data) => {
            console.log(filename);

            var file_chs = createFilenameLang(file, 'CHS');
            var finalFilename = `${base_path}\\${file_chs}`;
            fs.unlinkSync(finalFilename);

            var lines = data.trim().split('\n\n');
            for (var i = 0; i != lines.length; i++) {
                var line = lines[i];
                var parts = line.split('\n')
                var subtitle_number = parts[0];
                var subtitle_time = parts[1];
                var subtitle_text = parts.slice(2);

                console.log(subtitle_number);

                var text = subtitle_text.join('\n');
                var translate_text = await translatePromise(text, subtitle_number);
                
                var section = `${subtitle_number}\n${subtitle_time}\n${text}\n${translate_text}\n\n`;
                fs.appendFileSync(finalFilename, section);
            }
        });
    });
});

var createFilenameLang = function (filename, lang) {
    var parts = filename.split('.');
    parts.splice(-1, 0, lang)
    return parts.join('.');
}

var translatePromise = function (text, subtitle_number) {
    var promise = new Promise(function (resolve, reject) {
        translate(text, { from: 'en', to: 'zh-CN' }).then(res => {
            resolve(res.text);
        }).catch(err => {
            console.log(err);
            reject();
        });
    });

    return promise;
}
