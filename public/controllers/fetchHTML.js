let __fetch_incData = [];
const include_once = async () => {
    const inc = document.querySelectorAll('inc');
    const _rScript = document.querySelectorAll('.run-scrpit');
        inc.forEach(async (ele, key)=>{
            const path = ele.getAttribute('path');
            if (!__fetch_incData[key]) {
                __fetch_incData[key] = {path : null}
                if (__fetch_incData[key]['path'] != path) {   
                    __fetch_incData[key]['path'] = path;
                    let res = await fetchPath(path);
                    ele.innerHTML = res.replaceAll('<script>', '<script class="run-scrpit">');
                }
            }else{
                if (__fetch_incData[key]['path'] != path) {   
                    __fetch_incData[key]['path'] = path;
                    let res = await fetchPath(path);
                    ele.innerHTML = res;
                }
            }
        });
        if (_rScript) {
            _rScript.forEach(ele=>{
                let html = document.createElement('script');
                html.innerHTML = ele.innerHTML;
                ele.replaceWith(html);
            });
        }
    setTimeout(include_once, 1);
};
const fetchPath = async (path) => {
    const data = await fetch(path).then((r) => {
        return r.text();
    });
    return data;
};
export default include_once;
