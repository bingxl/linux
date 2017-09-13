// 根据summary文件来生成相关文件，修改summary文件的链接
let fs = require('fs');
let os = require('os');
let data = fs.readFileSync('./SUMMARY.source.md', 'utf8');
let arr = data.split(os.EOL);
let summary = '';

arr.forEach(item => {
    if(item.indexOf("+") !== 0){
        summary += item + os.EOL;
        return;
    };
    item = (item.substr(1)).trim();
    fs.exists(`./${item}.md`, exists => {
        if(!exists) {
            // 不存在则创建
            fs.readFile(`./${item}.md`, {flag: 'w'}, res => {
                console.log(`has create article ${item},md`)
            });
        }
    });
    summary += `+ [${item}](./${item}.md) ${os.EOL}`
    
})

fs.writeFile('./SUMMARY.md', summary , err => {
        if(err){
            console.error(err)
        } else {
            console.log('SUMMARY.md file 已写入');
        }
    })