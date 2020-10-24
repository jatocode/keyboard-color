import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

// Swedish layout from: https://github.com/simple-keyboard/simple-keyboard-layouts
const main = new Keyboard('main', {
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    layout: {
        default: [
            "Esc F1 F2 F3 F4 F5 F6 F6 F8 F9 F10 F11 F12 PrintScr ScrLk Pause",
            "\u00A7 1 2 3 4 5 6 7 8 9 0 + \u00B4 {bksp}",
            "{tab} q w e r t y u i o p \u00E5 ¨",
            "{lock} a s d f g h j k l \u00F6 \u00E4 ' {enter}",
            "{shift} < z x c v b n m , . - {shift}",
            "@ {space}"
        ]
    },
    buttonTheme: [
        {
            class: "color1",
            buttons: "Esc {tab} {lock} {shift}"
        }
    ]
});

const arrows = new Keyboard('arrows', {
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
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

const other = new Keyboard('other', {
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    layout: {
        default: [
            "Ins Home PgUp",
            "Del End PgDn"
        ]
    }
});

function onChange(input) {
    document.querySelector(".input").value = input;
    console.log("Input changed", input);
}

function onKeyPress(button) {
    console.log("Button pressed", button);
}