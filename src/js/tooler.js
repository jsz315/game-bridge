import JTemp from './template';

function getHtmlByData (sid, data) {
    var jtemp = new JTemp(sid);
    var html = jtemp.build(data);
    return html;
}

function getRandomItem(list){
    var n = Math.floor(Math.random() * list.length);
    return list[n];
}

export {
    getHtmlByData,
    getRandomItem
}