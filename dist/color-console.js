(function () {
    'use strict';

    function isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
            return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    function isObject(obj) {
        return typeof obj === "object"
    }

    function isArray(obj) {
        return Array.isArray(obj)
    }

    function kebabCase(str){
        return str.split('').map((letter, idx) => {
          return letter.toUpperCase() === letter
           ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
           : letter;
        }).join('');
    }

    function tryCatch(callback){
        try {
           return callback()
        } catch (error) {
            console.error("[color-console]", error);
        }
    }

    function generateStyleText(style){
        let styleText = "";

        if(isObject(style)){
            if(!isEmpty(style)){
                for (let [property, value] of Object.entries(style)) {
                    property = kebabCase(property);
                    styleText += `${property}:${value};`;
                }
            }
        }else {
            styleText = style;
        }

        return styleText;
    }

    function generateStyleArray(newStyles = {}, oldStyles = []){
        let styles = [...oldStyles];
        styles.push(generateStyleText(newStyles));

        return styles
    }

    function generateLineMessage(newMessage = "", oldMessage = ""){
        if(isObject(newMessage)) return oldMessage;

        return oldMessage + "%c" + newMessage;
    }

    function generateNewLineMessage(newMessage = "", oldMessage = ""){
        if(isObject(newMessage)) return oldMessage;

        return oldMessage + "\n%c" + newMessage;
    }

    function extendLogger(styles = {}){
        styles = generateStyleArray(styles, []);

        function newLogger(){
            this.styles = styles;
        }

        newLogger.prototype.log = function(message){
            message = generateLineMessage(message);
            console.log.apply(null, [message, ...this.styles]);
        };

        return new newLogger(styles)
    }

    function extendMultiLogger(name = "log", styles = {}, logger = null){
        styles = generateStyleArray(styles, []);

        logger = logger ? logger : {};

        function log(message){
            message = generateLineMessage(message);
            console.log.apply(null, [message, ...styles]);
        }

        if(logger[name]) throw new Error(`${name}() function is already defined`)

        logger[name] = log;

        return logger
    }

    class ColorConsole {
        constructor(message = "", styles = []){
            this.message = message;
            this.styles = styles;
        }

        line(newMessage, newstyles = {}){
            const [message, styles] = [
                generateLineMessage(newMessage, this.message),
                generateStyleArray(newstyles, this.styles),
            ];
            
            return new ColorConsole(message, styles);
        }

        newLine(newMessage, newstyles = {}){
            const [message, styles] = [
                generateNewLineMessage(newMessage, this.message),
                generateStyleArray(newstyles, this.styles),
            ];

            return new ColorConsole(message, styles);
        }
        
        log(newMessage = "", newstyles = {}){
            const [message, styles] = [
                generateLineMessage(newMessage, this.message),
                generateStyleArray(newstyles, this.styles),
            ];

            console.log.apply(null, [message, ...styles]);
        }
        
        generateOutput(){
            let message = this.message.replace(/\n/g, "\\n");
            let output = [message, ...this.styles].map(item => `"${item}"`).join(",");

            return `console.log(${output})`;
        }

        show(){
            console.log(this.generateOutput());
        }

        extend(input = {}){
            if(isArray(input)){
                let logger = null;

                input.forEach(({name, styles}) => {
                    tryCatch(() => {
                        if(!name) throw new Error("name property required")
        
                        logger = extendMultiLogger(name, styles, logger);
                    });
                });

                return logger;

            }else {
                let styles = input;
                return extendLogger(styles);
            }
        }

        success(newMessage = ""){
            this.line(newMessage, {
                color: "lightgreen",
            }).log();
        }

        danger(newMessage = ""){
            this.line(newMessage, {
                color: "red",
            }).log();
        }

        info(newMessage = ""){
            this.line(newMessage, {
                color: "cyan",
            }).log();
        }

        warn(newMessage = ""){
            this.line(newMessage, {
                color: "yellow",
            }).log();
        }
    }

    window.$console = new ColorConsole();

}());
