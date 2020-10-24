import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: [
        "Esc F1 F2 F3 F4 F5 F6 F6 F8 F9 F10 F11 F12",
        "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
        "{tab} q w e r t y u i o p [ ] \\",
        "{lock} a s d f g h j k l ; ' {enter}",
        "{shift} z x c v b n m , . / {shift}",
        ".com @ {space}"
    ]
    }
});

function onChange(input){
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button){
  console.log("Button pressed", button);
}