const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.appendChild(wrapper);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
wrapper.appendChild(keyboard);

for (let i = 1; i <= 5; i += 1) {
  const keyboardRow = document.createElement('div');
  keyboardRow.classList.add('keyboard-row');
  keyboard.appendChild(keyboardRow);
}

function generateKeys(keys, parentElement) {
  keys.forEach((key) => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    if (key === 'Backspace') {
      keyElement.classList.add('backspace-key');
    }
    if (key === 'Tab') {
      keyElement.classList.add('tab-key');
    }
    if (key === '\\' || key === '/') {
      keyElement.classList.add('slash-key');
    }
    if (key === 'Del') {
      keyElement.classList.add('del-key');
    }
    if (key === 'Caps Lock') {
      keyElement.classList.add('caps-key');
    }
    if (key === 'Enter') {
      keyElement.classList.add('enter-key');
    }
    if (key === 'Shift') {
      keyElement.classList.add('shift-key');
    }
    if (key === '▲') {
      keyElement.classList.add('arrow-up');
    }
    if (key === 'Ctrl') {
      keyElement.classList.add('ctrl-key');
    }
    if (key === 'Win') {
      keyElement.classList.add('win-key');
    }
    if (key === 'Alt') {
      keyElement.classList.add('alt-key');
    }
    if (key === '') {
      keyElement.classList.add('space-key');
    }
    if (key === '◄') {
      keyElement.classList.add('arrow-left');
    }
    if (key === '▼') {
      keyElement.classList.add('arrow-down');
    }
    if (key === '►') {
      keyElement.classList.add('arrow-right');
    }
    keyElement.textContent = key;
    parentElement.appendChild(keyElement);
  });
}

const rows = document.querySelectorAll('.keyboard-row');
const keys = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '', 'Alt', '◄', '▼', '►', 'Ctrl'],
];

keys.forEach((rowKeys, index) => {
  const row = rows[index];
  generateKeys(rowKeys, row);
});
