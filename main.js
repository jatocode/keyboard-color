import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

const picker = document.querySelector("#colorpicker");
picker.value = '#ffa500';
picker.addEventListener("change", updateKeys, false);

let keyboards = [];

// Swedish layout from: https://github.com/simple-keyboard/simple-keyboard-layouts
const main = new Keyboard('main', {
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress('main', button),
    layout: {
        default: [
            "Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12",
            "\u00A7 1 2 3 4 5 6 7 8 9 0 + \u00B4 {bksp}",
            "{tab} q w e r t y u i o p \u00E5 ¨",
            "{lock} a s d f g h j k l \u00F6 \u00E4 ' {enter}",
            "{lshift} < z x c v b n m , . - {rshift}",
            "{lctrl} {lwin} {lalt} {space} {rctrl} {rwin} {rfn} {ralt}"
        ]
    },
    mergeDisplay: true,
    display: {
        '{lctrl}': 'ctrl',
        '{lwin}': 'win',
        '{lalt}': 'alt',
        '{rctrl}': 'ctrl',
        '{rwin}': 'win',
        '{ralt}': 'alt',
        '{rfn}': 'fn',
        '{lshift}': 'shift',
        '{rshift}': 'shift',
    },
    buttonTheme: [
        {
            class: "color1",
            buttons: " "
        }
    ]
});
keyboards.push(main);

const arrows = new Keyboard('arrows', {
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress('arrows', button),
    layout: {
        default: [
            "{up}",
            "{left} {down} {right}"
        ]
    },
    display: {
        '{up}': "^",
        '{down}': "v",
        '{left}': "<",
        '{right}': ">"
    }
});
keyboards.push(arrows);

const other = new Keyboard('other', {
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress('other', button),
    layout: {
        default: [
            "PrintScr ScrLk Pause",
            "Ins Home PgUp",
            "Del End PgDn"
        ]
    }
});
keyboards.push(other);

function onChange(input) {
    document.querySelector(".input").value = input;
    console.log("Input changed", input);
}

function onKeyPress(keyboard, button) {
    swapColor(keyboard, button, 'color1');
}

function swapColor(keyboardName, button, className) {
    const keyboard = keyboards.find(k => k.currentInstanceName == keyboardName);
    const el = keyboard.getButtonElement(button);
    el.classList.toggle(className);
}

function updateKeys(event) {
    document.querySelectorAll(".color1").forEach(p => {
        p.style.background = event.target.value
        p.style.color = "ffffff";
    });
}