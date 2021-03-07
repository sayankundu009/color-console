export function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
        return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

export function isObject(obj) {
    return typeof obj === "object"
}

export function isArray(obj) {
    return Array.isArray(obj)
}

export function kebabCase(str){
    return str.split('').map((letter, idx) => {
      return letter.toUpperCase() === letter
       ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
       : letter;
    }).join('');
}

export function tryCatch(callback){
    try {
       return callback()
    } catch (error) {
        console.error("[color-console]", error)
    }
}