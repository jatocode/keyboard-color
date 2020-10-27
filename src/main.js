import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import './style.css';
import './keyboard.css';

//const defaultcolor = '#ffa500';
const defaultcolor = '#ffa500';
const clearcolor = 'white';
let currentcolor = defaultcolor;

let oldcolors = loadOldColors();
const picker = document.querySelector("#colorpicker");
picker.value = defaultcolor;
picker.addEventListener("change", colorChange, false);

let selectedkeys = [];
let keyboards = [];

let profiles = loadProfiles();

updateOldColors();
addProfilesToSelect();

// Måste låta keyboard ladda
setTimeout(() => changeProfile(profiles[0].value), 100);

const clear = document.getElementById('clear');
clear.onclick = () => { 
    currentcolor = clearcolor;
    updateKeys();
};

let commonKeyboardOptions = {
    onChange: input => onChange(input),
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    physicalKeyboardHighlight: false,
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

document.addEventListener('keydown', keycode => {
    onKeyPress('simpleKeyboardMain', keycode.key);
});

function onChange(input) {
    document.querySelector(".input").value = input;
   // console.log("Input changed", input);
}

function onKeyPress(keyboard, button) {
    if(paintOnSelect()) {
        paintKey(keyboard, button);
    } else {
        selectKey(keyboard, button);
    }
}

function paintKey(keyboardName, button) {
    const keyboard = keyboards.find(k => k.currentInstanceName == keyboardName);
    const el = keyboard.getButtonElement(button);
    el.style.backgroundColor = currentcolor;
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
    //    el.style.color = 'red';
    //    el.style.fontWeight = 'bold';
    }
    el.classList.toggle('selected');
}

function colorChange(event) {
    currentcolor = event.target.value;
    oldcolors.push(currentcolor);
    saveOldColors();
    updateOldColors();
    updateKeys();

    if(clearSelectionsOnChange()) {
        clearSelections();
    }
}

function clearSelectionsOnChange() {
    return true;
}

function paintOnSelect() {
    const el = document.getElementById('paint');
    return el.checked;
}

function clearSelections() {
    document.querySelectorAll(".selected").forEach(p => {
        const button = p.dataset.skbtn;
        selectedkeys = selectedkeys.filter(item => item !== button);
        p.style.borderWidth = '0px';
        p.style.color = 'black';
        p.style.fontWeight = 'normal';
        p.classList.remove('selected');             
    })
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
                if(clearSelectionsOnChange()) {
                    clearSelections();
                }
            };
        }
    });
}

function getAllKeys() {
    const all = [...document.getElementsByClassName('hg-button')];
    const keycolors = all.map(k => { 
        return {key:k.dataset.skbtn, color:k.style.backgroundColor}
    });

    return keycolors;
}

function changeProfileEvent(event) {
    changeProfile(event.target.value);
}

function changeProfile(name) {
    const profile = profiles.find(p => p.value == name);
    let keycolors = [];
    profile.keycolors.forEach(k => {
        keycolors[k.key] = k.color;
    });
    const all = [...document.getElementsByClassName('hg-button')];
    all.forEach(b => {
        if(keycolors.length == 0) {
            b.style.backgroundColor = clearcolor;
        } else {
            b.style.backgroundColor = keycolors[b.dataset.skbtn] == '' ? clearcolor : keycolors[b.dataset.skbtn];
        }
    })
}

function saveProfile() {
    const profileSelect = document.getElementById('profileselect');
    const keycolors = getAllKeys();
    const profile = profiles.find(p => p.value == profileSelect.value);
    profile.keycolors = keycolors;

    saveProfiles();
}

function clearProfile() {
    const profileSelect = document.getElementById('profileselect');
    const profile = profiles.find(p => p.value == profileSelect.value);
    profile.keycolors = [];

    changeProfile(profile.value);
}


function addProfilesToSelect() {
    const profileSelect = document.getElementById('profileselect');
    const profileSaveButton = document.getElementById('profilesave');
    const profileClearButton = document.getElementById('profileclear');

    profileSelect.onchange = (event) => changeProfileEvent(event);
    profileSaveButton.onclick = () => saveProfile();
    profileClearButton.onclick = () => clearProfile();

    profiles.forEach(p => {
        let option = document.createElement("option");
        option.text = p.name;
        option.value = p.value;
        profileSelect.add(option);
    });

}

function loadOldColors() {
    let oldcols = localStorage.getItem('oldcolors')?.split(',');
    if(oldcols == null) {
        oldcols = [];
    }
    return oldcols;
}

function saveOldColors() {
    localStorage.setItem('oldcolors', oldcolors);
}

function loadProfiles() {
    let profiles = JSON.parse(localStorage.getItem('profiles'));
    if(profiles == null) {
        return [
            {name:'Profile 1', value:'profile1', keycolors:[]},
            {name:'Profile 2', value:'profile2', keycolors:[]},
            {name:'Profile 3', value:'profile3', keycolors:[]},
            {name:'Profile 4', value:'profile4', keycolors:[]},
            {name:'Profile 5', value:'profile5', keycolors:[]},
        ];
    }
    return profiles;
}

function saveProfiles() {
    localStorage.setItem('profiles', JSON.stringify(profiles));
}