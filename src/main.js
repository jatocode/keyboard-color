import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import './style.css';
import './keyboard.css';

//const defaultcolor = '#ffa500';
const defaultcolor = '#ffa500';
let currentcolor = defaultcolor;

let oldcolors = [];
const picker = document.querySelector("#colorpicker");
picker.value = defaultcolor;
picker.addEventListener("change", colorChange, false);

let selectedkeys = [];
let keyboards = [];

updateOldColors();

let commonKeyboardOptions = {
    onChange: input => onChange(input),
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    physicalKeyboardHighlight: true,
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: true
};

const main = new Keyboard(".simple-keyboard-main", {
    onKeyPress: button => onKeyPress('simpleKeyboardMain', button),
    ...commonKeyboardOptions,
    /**
     * Layout based on:
     * Sterling Butters (https://github.com/SterlingButters)
     */
    layout: {
        default: [
            "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
            "\u00A7 1 2 3 4 5 6 7 8 9 0 + \u00B4 {backspace}",
            "{tab} q w e r t y u i o p \u00E5 ¨",
            "{capslock} a s d f g h j k l \u00F6 \u00E4 ' {enter}",
            "{shiftleft} < z x c v b n m , . - {shiftright}",
            "{controlleft} {winleft} {altleft} {space} {controlright} {winright} {fnright} {altright}"
        ],
        shift: [
            "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
            "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
            "{tab} Q W E R T Y U I O P { } |",
            '{capslock} A S D F G H J K L : " {enter}',
            "{shiftleft} Z X C V B N M < > ? {shiftright}",
            "{controlleft} {altleft} {metaleft} {space} {metaright} {altright} {controlright}"
        ]
    },
    display: {
        "{escape}": "esc",
        "{tab}": "tab ⇥",
        "{backspace}": "backspace ⌫",
        "{enter}": "enter ↵",
        "{capslock}": "caps ⇪",
        "{shiftleft}": "shift ⇧",
        "{shiftright}": "shift ⇧",
        "{controlleft}": "ctrl",
        "{controlright}": "ctrl",
        "{altleft}": "alt",
        "{altright}": "alt",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{winleft}": "win",
        "{winright}": "win",
        "{fnright}": "fn"
    }
});

const control = new Keyboard(".simple-keyboard-control", {
    onKeyPress: button => onKeyPress("simpleKeyboardControl", button),
    ...commonKeyboardOptions,
    layout: {
        default: [
            "{prtscr} {scrolllock} {pause}",
            "{insert} {home} {pageup}",
            "{delete} {end} {pagedown}"
        ]
    }
});

const arrows = new Keyboard(".simple-keyboard-arrows", {
    onKeyPress: button => onKeyPress('simpleKeyboardArrows', button),
    ...commonKeyboardOptions,
    layout: {
        default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
    }
});

keyboards.push(main);
keyboards.push(control);
keyboards.push(arrows);

function onChange(input) {
    document.querySelector(".input").value = input;
    console.log("Input changed", input);
}

function onKeyPress(keyboard, button) {
    selectKey(keyboard, button);
}

function selectKey(keyboardName, button) {
    const keyboard = keyboards.find(k => k.currentInstanceName == keyboardName);
    const el = keyboard.getButtonElement(button);
    if(selectedkeys.includes(button)) {
        selectedkeys = selectedkeys.filter(item => item !== button);
        el.style.borderWidth = '0px';
        el.style.color = 'black';
        el.style.fontWeight = 'normal';
    } else {
        selectedkeys.push(button);
        el.style.border = 'dotted';
        el.style.borderWidth = '1px';
        el.style.borderColor = 'black';
        el.style.color = 'red';
        el.style.fontWeight = 'bold';
    }
    el.classList.toggle('selected');
}

function colorChange(event) {
    currentcolor = event.target.value;
    oldcolors.push(currentcolor);
    updateOldColors();
    updateKeys();
}

function updateKeys() {
    document.querySelectorAll(".selected").forEach(p => {
        p.style.background = currentcolor;
    });
}

function updateOldColors() {
    const MAXCOLORS = 10;
    const colors = oldcolors.slice(Math.max(oldcolors.length - MAXCOLORS, 0))

    colors.forEach((col,i) => {
        if(i <= MAXCOLORS) {
            const id = 'oldc' + (i + 1);
            const el = document.getElementById(id);
            el.style.backgroundColor = col;

            el.onclick = () => {
                currentcolor = col;
                updateKeys();
            };
        }
    });
}