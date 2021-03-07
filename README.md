# 🎨 Color Console

Customize your console.logs with css
## Install

**CDN:** Add the following script to the end of your `<body>` section
```html
<script src="https://cdn.jsdelivr.net/gh/sayankundu009/color-console/dist/color-console.min.js"></script>
```

## Use

*$console.log() with css*
```javascript
$console.log("Hello World",{
    color: "#fff",
    background: "lightgreen",
    padding: "5px"
});
```

*Chain together multiple lines*
```javascript
$console
.line("Hello",{
    color: "red",
    background: "yellow",
})
.newLine("World",{
    color: "red",
    background: "lightgreen",
})
.log();
```

*Utility functions*
```javascript
$console.success("Success");
$console.info("Danger");
$console.danger("Info");
$console.warn("Warn");
```

*Create custom logger by extending*
```javascript
const logger = $console.extend({
    color: "red",
    background: "yellow"
});

logger.log("Hello");
```

*Create multiple custom loggers*
```javascript
const multiLogger = $console.extend([
    {
        name: "success",
        styles: {
            color: "black",
            background: "lightgreen"
        }
    },
    {
        name: "danger",
        styles: {
            color: "white",
            background: "red"
        }
    }
]);

multiLogger.success("Hello");
multiLogger.danger("World");
```

*Get generated log with styles*
```javascript
const output = $console.line("Hello",{
                   color: "white",
                   background: "orange",
                   padding: "5px"
               })
               .generate();

console.log(output);               
```

*Show generated output in console*
```javascript
$console.line("Hello",{
    color: "white",
    background: "orange",
    padding: "5px"
})
.show();              
```