export default function Updeep(explorer, cb) {
    explorer.forEach((element, index, arr) => {
        arr[index] = recursive(element, index, arr);
    });
    cb(explorer);
}

function recursive(element, index, arr) {
    const obj: any = { data: (({ hostId, description, value }) => ({ hostId, description, value }))(element) };
    const subElements = element.subElements;
    if (subElements && subElements.length > 0) {
        obj.children = [];
        subElements.forEach((childNode, i, newArr) => {
            if (!element.children) {
                arr[index].children = [];
            }
            obj.children.push(recursive(childNode, i, newArr));

        });
    }
    return obj;
}
