# translate-srt

这个工具的诞生来自于在观看Udacity的视频的过程中，突然没有中文字幕了。所以使用node来构建了一个通过Google Translate来翻译字幕文件的小程序。

该工具会将指定目录中的srt格式的字幕文件 hello.srt 生成 hello.CHS.srt 文件，因为Google Translate的翻译不一定准确，所以会将翻译结果放在原文下方。

还有一些工作需要去完成：
1. 指定字幕目录
2. 指定翻译语言
