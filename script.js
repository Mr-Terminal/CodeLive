var copiedHtml, copiedCss, copiedJs;

window.onload = function () {
    let htmlEditor = ace.edit("html");
    htmlEditor.session.setMode("ace/mode/html");
    htmlEditor.setTheme("ace/theme/monokai");
    htmlEditor.session.setValue(`<!DOCTYPE html>
<html lang="en">
    <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
    </head>
    <body>
        
    </body>
</html>`);
    htmlEditor.session.setUseWrapMode(true);
    htmlEditor.setShowPrintMargin(false);
    // htmlEditor.setHighlightActivateLine(false);
    htmlEditor.session.on("change", function (delta) {
        console.log(htmlEditor.getValue());
        update();

        document.getElementById("button1").addEventListener("click", function () {
            copiedHtml = htmlEditor.getValue();
            navigator.clipboard.writeText(copiedHtml);
            document.getElementById("button1").innerHTML = "Copied!";
            setTimeout(() => {
                document.getElementById("button1").innerHTML = "Copy";
            }, 3000);
        });

        document.getElementById("rewrite").addEventListener("click", function () {
            htmlEditor.session.setValue(`<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
                    
    </body>
</html>`);
        });
    });

    let cssEditor = ace.edit("css");
    cssEditor.session.setMode("ace/mode/css");
    cssEditor.setTheme("ace/theme/monokai");
    cssEditor.session.setValue(`body{

}`);
    cssEditor.session.setUseWrapMode(true);
    cssEditor.setShowPrintMargin(false);
    // cssEditor.setHighlightActivateLine(false);
    cssEditor.session.on("change", function (delta) {
        console.log(cssEditor.getValue());
        update();
        document.getElementById("button2").addEventListener("click", function () {
            copiedCss = cssEditor.getValue();
            navigator.clipboard.writeText(copiedCss);
            document.getElementById("button2").innerHTML = "Copied!";
            setTimeout(() => {
                document.getElementById("button2").innerHTML = "Copy";
            }, 3000);
        });

        document.getElementById("rewrite").addEventListener("click", function () {
            cssEditor.session.setValue(`body{

 }`);
        });
    });

    let jsEditor = ace.edit("javascript");
    jsEditor.session.setMode("ace/mode/javascript");
    jsEditor.setTheme("ace/theme/monokai");
    jsEditor.session.setValue(`//Javascript goes here`);
    jsEditor.session.setUseWrapMode(true);
    jsEditor.setShowPrintMargin(false);
    // jsEditor.setHighlightActivateLine(false);
    jsEditor.session.on("change", function (delta) {
        console.log(jsEditor.getValue());
        update();
        document.getElementById("button3").addEventListener("click", function () {
            copiedJs = jsEditor.getValue();
            navigator.clipboard.writeText(copiedJs);
            document.getElementById("button3").innerHTML = "Copied!";
            setTimeout(() => {
                document.getElementById("button3").innerHTML = "Copy";
            }, 3000);
        });

        document.getElementById("rewrite").addEventListener("click", function () {
            jsEditor.session.setValue(`//Javascript goes here`);
        });
    });

    function update() {
        let output = document.querySelector(".output .virtual-iframe").contentWindow
            .document;
        console.log(output);
        output.open();
        output.write(
            "<style>" +
            cssEditor.getValue() +
            "</style>" +
            htmlEditor.getValue() +
            "<script>" +
            jsEditor.getValue() +
            "</script>"
        );
        output.close();
        document.getElementById("button1").innerHTML = "Copy";
        document.getElementById("button2").innerHTML = "Copy";
        document.getElementById("button3").innerHTML = "Copy";
    }
};

window.addEventListener("load", (e) => {
    for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
        document.getElementsByClassName("code")[i].style.height =
            document.querySelector(".code-editor").clientHeight - 50 + "px";
    }
});

let layout = 0;

document.getElementById("layout").addEventListener("click", function () {
    layout++;
    if (layout > 1) layout = 0;
    changeLayout();
});
// let htmlEditor = ace.edit("html");
// let cssEditor = ace.edit("css");
// let jsEditor = ace.edit("js");
function changeLayout() {
    switch (layout) {
        case 0:
            document.querySelector(".coder").classList.add("view1");
            document.querySelector(".coder").classList.remove("view2");
            document.querySelector(".container").classList.add("view1");
            document.querySelector(".container").classList.remove("view2");

            htmlEditor.resize();
            cssEditor.resize();
            jsEditor.resize();
            break;
        case 1:
            document.querySelector(".coder").classList.add("view2");
            document.querySelector(".coder").classList.remove("view1");
            document.querySelector(".container").classList.add("view2");
            document.querySelector(".container").classList.remove("view1");

            htmlEditor.resize();
            cssEditor.resize();
            jsEditor.resize();
            break;
    }
}

// typing effect

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Free frontend editor", "Copy code to clipboard", "Click layout to change layout", "Click rewrite to rewrite code"];
const typingDelay = 150;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing"))
            cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing"))
            cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(
            0,
            charIndex - 1
        );
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // On DOM Load initiate the effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});
