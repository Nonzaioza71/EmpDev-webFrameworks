// let test = null;
let _testData = null;
async function myGridTable(ele) {
    try {
        const func = ele.getAttribute('func');
        const arrayData = JSON.parse(ele.getAttribute('array-data'));
        const varName =ele.getAttribute('var-data');
        const name = ele.getAttribute('name');
        const autoRow = JSON.parse(ele.getAttribute('auto-row'));
        const clearConsole = JSON.parse(ele.getAttribute('clear-console'));
        const pattern = ele.querySelector('td').outerHTML;
        let anim = ele.getAttribute('anim');
        let column = parseInt(ele.getAttribute('col'));
        let _def = document.querySelector('.myTable-'+name);
        let _arr = [];
        let result = '';
        let convert_str;
        let col_i = 1;
        let _pattern = null;
        let __if = ele.querySelectorAll('if');
        let _w = window.innerWidth;
        let _data = {};
        // console.log('_arr = ', _arr);
        if (func) {
            _arr = await Function('return '+func)();
        } else if(arrayData) {
            _arr = arrayData;
        } else if(varName) {
            _arr = eval(varName);
        }
        if (anim) {
            anim = readAnim(anim)
            anim.forEach(a=>{
                if (ele.classList.contains(a)) {
                    ele.classList.remove(a);
                }
            })
            setTimeout(() => {
                anim.forEach(a=>{
                    ele.classList.add(a);
                })
            }, 10);
        }
        if ((_w <= 575) && (autoRow)) {
            column = 2;
        }
        const _trw = 100/column;
        if((_def) && (_def.querySelector('td'))){
            _pattern = _def.querySelector('td').outerHTML;
            // console.log('_def.__if = ', __if);
        }else{
            let _newEle = document.createElement('template');
            let _toHTML = HTMLToElement(pattern)
            _toHTML.style.width = _trw+'%';
            // test = _toHTML;
            _newEle.classList.add('myTable-'+name);
            _newEle.classList.add('d-none');
            _newEle.append(_toHTML);
            document.querySelector('body').append(_newEle);
            myGridTable(ele);
            // console.log('_new.__if = ', __if);
        }
        const _replace = _pattern.match(/%.*%/g);
        // console.log('_replace = ', _replace);
        for (let i = 0; i < _arr.length; i++) {
            const data = _arr[i];
            if (col_i == 0) {
                result += '<tr>';
            }
            convert_str = _pattern;
            _replace.forEach((item, key)=>{
                let _keys = Object.keys(data)
                _keys.forEach(_key=>{
                    convert_str = convert_str.replaceAll('%'+_key+'%', data[_key]);
                    convert_str = convert_str.replaceAll('$key$', i)
                    convert_str = convert_str.replaceAll('\n', '')
                    convert_str = convert_str.replaceAll('\r', '')
                    _data[readVal(_key)] = data[readVal(_key)];
                })
            })
            result += convert_str;
            if ((col_i == column) || (i == _arr.length-1)) {
                result += '</tr>';
                col_i = 1;
            }else{
                col_i++;
            }
            // console.log('column = ', column);
            // console.log('col_i = ', col_i);
        }
        ele.innerHTML = result;
        // console.log(result);
    
        if (clearConsole) {
            setTimeout(() => {
                console.clear();
            }, 100);
        }
    } catch (e) {
        // console.log(e);
        setTimeout(() => {
            myGridTable(ele)
        }, 10);
    }
}

const readVal = (val) => { return val.replaceAll('%', '') }
const readAnim = (_arrStr) => {
    const _re = _arrStr.replace('[').replace(']');
    const _arr = _re.split(',');
    let _result = [];
    _arr.forEach(val => {
        let data = val.replaceAll('undefined', '').replaceAll("'", '').replaceAll(" ", '');
        _result.push(data);
    });
    return _result;
}
const convertItem = (item) =>{
    const valSymbolCount = (item.match(new RegExp("%", "g")) || []).length;
    return item;
}

function HTMLToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

console.log('myGridTable connected!');