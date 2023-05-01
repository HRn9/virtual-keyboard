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
  /* eslint-disable quote-props */
  const keyConfig = {
    'Backspace': { class: 'backspace-key' },
    'Tab': { class: 'tab-key' },
    '\\': { class: 'slash-key' },
    '/': { class: 'slash-key' },
    'Del': { class: 'del-key', dataKey: 'Delete' },
    'Caps Lock': { class: 'caps-key', dataKey: 'CapsLock' },
    'Enter': { class: 'enter-key' },
    'ShiftLeft': {
      class: 'shift-key', dataKey: 'Shift', code: 'ShiftLeft', content: 'Shift',
    },
    'ShiftRight': {
      class: 'shift-key', dataKey: 'Shift', code: 'ShiftRight', content: 'Shift',
    },
    'ArrowUp': { class: 'arrow-up', dataKey: 'ArrowUp', content: '▲' },
    'ControlLeft': {
      class: 'ctrl-key', dataKey: 'Control', code: 'ControlLeft', content: 'Ctrl',
    },
    'ControlRight': {
      class: 'ctrl-key', dataKey: 'Control', code: 'ControlRight', content: 'Ctrl',
    },
    'Win': { class: 'win-key', dataKey: 'Meta' },
    'Alt': { class: 'alt-key' },
    ' ': { class: 'space-key' },
    'ArrowLeft': { class: 'arrow-left', dataKey: 'ArrowLeft', content: '◄' },
    'ArrowDown': { class: 'arrow-down', dataKey: 'ArrowDown', content: '▼' },
    'ArrowRight': { class: 'arrow-right', dataKey: 'ArrowRight', content: '►' },
    'Dead': { class: 'backquote', dataKey: 'Dead', content: '`' },
  };
  /* eslint-enable quote-props */

  keys.forEach((key) => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    const config = keyConfig[key] || {};
    if (config.class) {
      keyElement.classList.add(config.class);
    }
    if (config.dataKey) {
      keyElement.setAttribute('data-key', config.dataKey);
    } else {
      keyElement.setAttribute('data-key', key);
    }
    if (config.content) {
      keyElement.textContent = config.content;
    } else {
      keyElement.textContent = key;
    }

    parentElement.appendChild(keyElement);
  });
}

const rows = document.querySelectorAll('.keyboard-row');
const keys = [
  ['Dead', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'Win', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

const shiftKeys = [
  ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
  ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
  ['ShiftLeft', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'Win', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

keys.forEach((rowKeys, index) => {
  const row = rows[index];
  generateKeys(rowKeys, row);
});

const display = document.createElement('textarea');
display.classList.add('keyboard-display');
display.setAttribute('rows', '5');
display.setAttribute('cols', '50');
wrapper.appendChild(display);

function toggleCaps() {
  const curKeyboard = document.querySelector('.keyboard');
  const curKeys = curKeyboard.querySelectorAll('.key');
  const capsOn = curKeyboard.classList.contains('caps-on');
  curKeys.forEach((key) => {
    const keyData = key.getAttribute('data-key');
    if (keyData.length === 1) {
      if (!capsOn) {
        // eslint-disable-next-line no-param-reassign
        key.style.textTransform = 'none';
        key.setAttribute('data-key', keyData.toLowerCase());
      } else {
        // eslint-disable-next-line no-param-reassign
        key.style.textTransform = 'uppercase';
        key.setAttribute('data-key', keyData.toUpperCase());
      }
    }
  });
}

function handleClick() {
  const allKeys = document.querySelectorAll('.key');
  allKeys.forEach((keyElement) => {
    keyElement.addEventListener('click', () => {
      const key = keyElement.getAttribute('data-key');
      if (key === 'Backspace') {
        const cursorPosition = display.selectionStart;
        if (cursorPosition > 0) {
          display.value = display.value.slice(0, cursorPosition - 1) + display.value
            .slice(cursorPosition);
          display.selectionStart = cursorPosition - 1;
          display.selectionEnd = cursorPosition - 1;
        } else if (key === 'Delete') {
          display.value = display.value.slice(0, cursorPosition) + display.value
            .slice(cursorPosition + 1);
          display.selectionStart = cursorPosition;
          display.selectionEnd = cursorPosition;
        }
      } else if (key === 'Delete') {
        const cursorPosition = display.selectionStart;
        keyElement.classList.add('active');
        display.value = display.value.slice(0, cursorPosition) + display.value
          .slice(cursorPosition + 1);
        display.selectionStart = cursorPosition;
        display.selectionEnd = cursorPosition;
        if (display.value.slice(cursorPosition, cursorPosition + 6) === 'delete') {
          display.value = display.value.slice(0, cursorPosition) + display.value
            .slice(cursorPosition + 6);
        }
      } else if (key === 'Enter') {
        const cursorPosition = display.selectionStart;
        display.value = `${display.value.slice(0, cursorPosition)}\n${display.value.slice(cursorPosition)}`;
        display.selectionStart = cursorPosition + 1;
        display.selectionEnd = cursorPosition + 1;
      } else if (key === 'Tab') {
      /* eslint-disable */
      event.preventDefault();
      const cursorPosition = display.selectionStart;
      const textBeforeCursor = display.value.slice(0, cursorPosition);
      const textAfterCursor = display.value.slice(cursorPosition);
      display.value = `${textBeforeCursor}\t${textAfterCursor}`;
      display.selectionStart = cursorPosition + 1;
      display.selectionEnd = cursorPosition + 1;
    } else if (key === 'Dead') {
      display.value += '`';
    } else if (key === 'ArrowUp') {
      display.value += '▲';
    } else if (key === 'ArrowDown') {
      display.value += '▼';
    } else if (key === 'ArrowLeft') {
      display.value += '◄';
    } else if (key === 'ArrowRight') {
      display.value += '►';
    } else if (key === 'Meta') {
      display.value += '';
    } else if (key === ' ') {
      const cursorPosition = display.selectionStart;
      const textBeforeCursor = display.value.slice(0, cursorPosition);
      const textAfterCursor = display.value.slice(cursorPosition);
      display.value = `${textBeforeCursor} ${textAfterCursor}`;
      display.selectionStart = cursorPosition + 1;
      display.selectionEnd = cursorPosition + 1;
    } else if (key === 'Alt') {
      /* eslint-disable */
      event.preventDefault();
      display.value += '';
    } else if (key === 'Control') {
      display.value += '';
    } else if (key === 'CapsLock') {
      keyElement.classList.toggle('active');
      keyboard.classList.toggle('caps-on'); 
      toggleCaps();
    } else if (key === 'Shift') {
      display.value += ''
    } else {
      const cursorPosition = display.selectionStart;
      const textBeforeCursor = display.value.slice(0, cursorPosition);
      const textAfterCursor = display.value.slice(cursorPosition);
      display.value = `${textBeforeCursor}${key}${textAfterCursor}`;
      display.selectionStart = cursorPosition + 1;
      display.selectionEnd = cursorPosition + 1;
    }
  });
});
const shifts = document.querySelectorAll('.shift-key')
shifts.forEach((keyElement) => {
  keyElement.addEventListener('mousedown', () => {
    rows.forEach(row => {
      while (row.firstChild) {
        row.removeChild(row.firstChild);
      }
    });
    shiftKeys.forEach((rowKeys, index) => {
      const row = rows[index];
      generateKeys(rowKeys, row);
    });
    handleClick()
  })
  keyElement.addEventListener('mouseup', () => {
    rows.forEach(row => {
      while (row.firstChild) {
        row.removeChild(row.firstChild);
      }
    });
    keys.forEach((rowKeys, index) => {
      const row = rows[index];
      generateKeys(rowKeys, row);
    });
    handleClick()
  })
})}

document.addEventListener('keydown', ({ key }) => {
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  if (keyElement) {
    if (key === 'Backspace') {
      const cursorPosition = display.selectionStart;
      keyElement.classList.add('active');
      if (cursorPosition > 0) {
        display.value = display.value
          .slice(0, cursorPosition - 1) + display.value.slice(cursorPosition);
        display.selectionStart = cursorPosition - 1;
        display.selectionEnd = cursorPosition - 1;
      }
    } else if (key === 'Delete') {
      const cursorPosition = display.selectionStart;
      keyElement.classList.add('active');
      display.value = display.value.slice(0, cursorPosition) + display.value
        .slice(cursorPosition + 1);
      display.selectionStart = cursorPosition;
      display.selectionEnd = cursorPosition;
      if (display.value.slice(cursorPosition, cursorPosition + 6) === 'delete') {
        display.value = display.value.slice(0, cursorPosition) + display.value
          .slice(cursorPosition + 6);
      }
    } else if (key === 'Tab') {
      keyElement.classList.add('active');
      /* eslint-disable */
      event.preventDefault();
      const cursorPosition = display.selectionStart;
      const textBeforeCursor = display.value.slice(0, cursorPosition);
      const textAfterCursor = display.value.slice(cursorPosition);
      display.value = `${textBeforeCursor}\t${textAfterCursor}`;
      display.selectionStart = cursorPosition + 1;
      display.selectionEnd = cursorPosition + 1;
    } else if (key === 'Enter') {
      keyElement.classList.add('active');
      const cursorPosition = display.selectionStart;
      display.value = `${display.value.slice(0, cursorPosition)}\n${display.value.slice(cursorPosition)}`;
      display.selectionStart = cursorPosition + 1;
      display.selectionEnd = cursorPosition + 1;
    } else if (key === 'Dead' || key === '`') {
      display.value += '`';
      keyElement.classList.add('active');
    } else if (key === 'ArrowUp') {
      keyElement.classList.add('active');
      display.value += '▲';
    } else if (key === 'ArrowDown') {
      keyElement.classList.add('active');
      display.value += '▼';
    } else if (key === 'ArrowLeft') {
      keyElement.classList.add('active');
      display.value += '◄';
    } else if (key === 'ArrowRight') {
      keyElement.classList.add('active');
      display.value += '►';
    } else if (key === 'Meta') {
      keyElement.classList.add('active');
    } else if (key === ' ') {
      const cursorPosition = display.selectionStart;
      const textBeforeCursor = display.value.slice(0, cursorPosition);
      const textAfterCursor = display.value.slice(cursorPosition);
      display.value = `${textBeforeCursor} ${textAfterCursor}`;
      display.selectionStart = cursorPosition + 1;
      display.selectionEnd = cursorPosition + 1;
      keyElement.classList.add('active');
    } else if (key === 'Alt') {
      /* eslint-disable */
      event.preventDefault();
      display.value += '';
      keyElement.classList.add('active');
    }else if (key === 'Control') {
      display.value += '';
      const controls = document.querySelectorAll('.ctrl-key')
      if (event.code === 'ControlRight') {
        controls[1].classList.add('active');
      } else if (event.code === 'ControlLeft') {
        controls[0].classList.add('active');
      }
    } else if (key === 'CapsLock') {
      keyElement.classList.toggle('active');
      keyboard.classList.toggle('caps-on');
      toggleCaps()
    } else if (key === 'Shift') {
      rows.forEach(row => {
        while (row.firstChild) {
          row.removeChild(row.firstChild);
        }
      });
      shiftKeys.forEach((rowKeys, index) => {
        const row = rows[index];
        generateKeys(rowKeys, row);
      });
      const shiftKey = document.querySelectorAll('.shift-key')
      if (event.code === 'ShiftRight') {
        shiftKey[1].classList.add('active')
      } else {
        shiftKey[0].classList.add('active')
      }
      handleClick()
    } else {
      const cursorPosition = display.selectionStart;
      const textBeforeCursor = display.value.slice(0, cursorPosition);
      const textAfterCursor = display.value.slice(cursorPosition);
      display.value = `${textBeforeCursor}${key}${textAfterCursor}`;
      display.selectionStart = cursorPosition + 1;
      display.selectionEnd = cursorPosition + 1;
      keyElement.classList.add('active');
    }
  }
});

document.addEventListener('keyup', ({ key }) => {
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  if (keyElement) {
    keyElement.classList.remove('active');
  }
  if (key === 'Control') {
    const controls = document.querySelectorAll('.ctrl-key');
    controls.forEach(function(control) {
      control.classList.remove('active');
    });
  }
  if (key === 'CapsLock') {
    const keyboard = document.querySelector('.keyboard');
    if (keyboard.classList.contains('caps-on')) {
      keyElement.classList.add('active');
    }
  }
  if (key === 'Shift') {
      rows.forEach(row => {
        while (row.firstChild) {
          row.removeChild(row.firstChild);
        }
      });
      keys.forEach((rowKeys, index) => {
        const row = rows[index];
        generateKeys(rowKeys, row);
      });
      handleClick()
  }
});

handleClick()