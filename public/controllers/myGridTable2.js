class myGridTable {
    #template
    #target
    #data
    constructor(props) {
        this.#template = props.template
        this.#target = props.target
        this.#data = props.data
    }

    #getAllAttrs(element){
        return element.getAttributeNames().reduce((acc, name) => {
            return {...acc, [name]: element.getAttribute(name)};
        }, {});
    }

    #setAllAttrs(target, source){
        source.getAttributeNames().reduce((acc, name) => {
            target.setAttribute(name, source.getAttribute(name))
        }, {})
    }

    #replaceTag(element, newTagName){

        var p = document.createElement(newTagName);
        element.getAttributeNames().reduce((acc, name) => {
            p.setAttribute(name, element.getAttribute(name))
        }, {})
        

        while(element.firstChild) {
            p.appendChild(element.firstChild)
        }
        // element.parentNode.replaceChild(p,element)
        element.replaceWith(p)
    }

    #isString(value) {
        return typeof value === 'string' || value instanceof String;
    }

    #generateTable(){
        const temp = this.#isString(this.#template) ? this.#template : this.#template.outerHTML
        const targ = this.#target
        const arr = this.#data
        const row = parseInt(targ.getAttribute('row-count'))
        let newTable = document.createElement('table')
        let newTr = 0
        let htmlStr = '<tbody>'
        this.#setAllAttrs(newTable, targ)
        arr.forEach((arrData, a_i)=> {
            let content = temp
            if(!newTr){
                htmlStr += '<tr>'
            }
            htmlStr += '<td>'
            Object.keys(arrData).map((objKey)=>{
                content = content.replaceAll('%'+objKey+'%', arrData[objKey])
            })
            htmlStr += content
            htmlStr += '</td>'
            if(newTr == row-1){
                htmlStr += '</tr>'
                newTr = 0
            }else{
                newTr++
            }
        });
        htmlStr += '</tbody>'
        newTable.innerHTML = htmlStr
        targ.replaceWith(newTable)
    }

    #render(){
        this.#generateTable()
    }
    
    run(){
        return {
            render : ()=>this.#render(),
            getAllAttrs : ()=>this.#getAllAttrs(),
            setAllAttrs : ()=>this.#setAllAttrs(),
            replaceTag : ()=>this.#replaceTag(),
            isString : ()=>this.#isString(),
        }
    }
}