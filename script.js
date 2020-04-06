const SHIFT_ON_EN = {
  '`': '~',
  1: '!',
  2: '@',
  3: '#',
  4: '$',
  5: '%',
  6: '^',
  7: '&',
  8: '*',
  9: '(',
  0: ')',
  '-': '_',
  '=': '+',
  '[': '{',
  ']': '}',
  '\\': '|',
  ';': ':',
  '\'': '"',
  ',': '<',
  '.': '>',
  '/': '?',
};

const SHIFT_OFF_EN = {
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  _: '-',
  '+': '=',
  '{': '[',
  '}': ']',
  '|': '\\',
  ':': ';',
  '"': '\'',
  '<': ',',
  '>': '.',
  '?': '/',
};

const SHIFT_ON_RU = {
  ё: 'Ë',
  1: '!',
  2: '"',
  3: '№',
  4: ';',
  5: '%',
  6: ':',
  7: '?',
  8: '*',
  9: '(',
  0: ')',
  '-': '_',
  '=': '+',
  '\\': '/',
  '.': ',',
};

const SHIFT_OFF_RU = {
  Ë: 'ё',
  '!': '1',
  '"': '2',
  '№': '3',
  ';': '4',
  '%': '5',
  ':': '6',
  '?': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  _: '-',
  '+': '=',
  '/': '\\',
  ',': '.',
};
class Keyboard {
  constructor() {
    this.elements = {};
    this.elements.keysContainer = null;
    this.elements.keys = [];
    this.elements.textarea = null;
    this.elements.capsLock = false;
    this.properties = {};
    this.properties.capsLock = false;
    this.properties.ctrl = false;
    this.properties.alt = false;
    this.properties.win = false;
    this.properties.shift = false;
    if (window.localStorage.getItem('lang')) {
      this.properties.lang = window.localStorage.getItem('lang') === 'true';
    } else {
      this.properties.lang = false;
      window.localStorage.setItem('lang', this.properties.lang);
    }
    this.properties.swapArray = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
      'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
      'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
    ];
  }

  init() {
    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.classList.add('keyboard');
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.classList.add('textarea');
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.keysContainer);

    window.addEventListener('click', () => { this.elements.textarea.focus(); });
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyArray = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'arrowUp', 'shiftR',
      'ctrl', 'win', 'alt', 'space', 'altR', 'arrowLeft', 'arrowDown', 'arrowRight', 'ctrlR',
    ];

    const keyCodes = [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
      'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
    ];
    let langKeyInd = 0;
    keyArray.forEach((key, indexOfKey) => {
      const keyElement = document.createElement('button');
      const insertBr = ['backspace', 'del', 'enter', 'shiftR'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      switch (key) {
        case 'caps':
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          this.elements.capsLock = keyElement;
          keyElement.addEventListener('click', () => {
            const simpleKeys = document.querySelectorAll('.keyboard__key_simple');
            this.properties.capsLock = !this.properties.capsLock;
            if (this.properties.capsLock) {
              simpleKeys.forEach((simpleKey) => {
                simpleKey.textContent = simpleKey.textContent.toUpperCase();
              });
            } else {
              simpleKeys.forEach((simpleKey) => {
                simpleKey.textContent = simpleKey.textContent.toLowerCase();
              });
            }
            if (keyElement.classList.contains('keyboard__key_active')) {
              keyElement.classList.remove('keyboard__key_active');
            } else { keyElement.classList.add('keyboard__key_active'); }
          });
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            const tempStart = this.elements.textarea.selectionStart;
            const tempEnd = this.elements.textarea.selectionEnd;
            this.elements.textarea.value = `${this.elements.textarea.value.slice(0, tempStart)
            }\t${this.elements.textarea.value.slice(tempEnd)}`;
            this.elements.textarea.selectionStart = tempStart + 1;
            this.elements.textarea.selectionEnd = tempStart + 1;
          });
          break;

        case 'shiftR':
        case 'shift':
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            if (!this.properties.shift) {
              let SHIFT_ON = {};
              this.properties.shift = !this.properties.shift;
              if (this.properties.lang) SHIFT_ON = SHIFT_ON_RU;
              else SHIFT_ON = SHIFT_ON_EN;
              const simpleKeys = document.querySelectorAll('.keyboard__key_simple');
              this.properties.capsLock = !this.properties.capsLock;
              if (this.properties.capsLock) {
                simpleKeys.forEach((simpleKey) => {
                  if (Object.keys(SHIFT_ON).indexOf(simpleKey.textContent) !== -1) {
                    simpleKey.textContent = SHIFT_ON[simpleKey.textContent];
                  } else simpleKey.textContent = simpleKey.textContent.toUpperCase();
                });
              } else {
                simpleKeys.forEach((simpleKey) => {
                  if (Object.keys(SHIFT_ON).indexOf(simpleKey.textContent) !== -1) {
                    simpleKey.textContent = SHIFT_ON[simpleKey.textContent];
                  } else simpleKey.textContent = simpleKey.textContent.toLowerCase();
                });
              }
            }
            keyElement.classList.add('keyboard__key_active');
          });
          break;

        case 'ctrl':
        case 'ctrlR':
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            if (!this.properties.ctrl) {
              this.properties.ctrl = !this.properties.ctrl;

              this.properties.lang = !this.properties.lang;
              window.localStorage.setItem('lang', this.properties.lang);

              const simpleKeys = document.querySelectorAll('.keyboard__key_simple');
              simpleKeys.forEach((simpleKey, index) => {
                [simpleKey.textContent,
                  this.properties.swapArray[index]] = [this.properties.swapArray[index],
                  simpleKey.textContent];
              });
              const temp = document.getElementById('ShiftLeft');
              if (this.properties.shift) {
                this.properties.shift = !this.properties.shift;
                this.properties.capsLock = !this.properties.capsLock;
                if (temp.classList.contains('keyboard__key_active')) {
                  temp.dispatchEvent(new
                  Event('mousedown'));
                } else document.getElementById('ShiftRight').dispatchEvent(new Event('mousedown'));
              } else {
                temp.dispatchEvent(new Event('mousedown'));
                temp.dispatchEvent(new Event('mouseup'));
              }
            }
            keyElement.classList.add('keyboard__key_active');
          });
          break;

        case 'win':
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.properties.win = !this.properties.win;
          });
          break;

        case 'alt':
        case 'altR':
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            if (!this.properties.alt) {
              this.properties.alt = !this.properties.alt;
            }
            keyElement.classList.add('keyboard__key_active');
          });
          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            const tempStart = this.elements.textarea.selectionStart;
            const tempEnd = this.elements.textarea.selectionEnd;
            if (tempEnd - tempStart > 0) {
              this.elements.textarea.value = this.elements.textarea.value.slice(0, tempStart)
                + this.elements.textarea.value.slice(tempEnd);
              this.elements.textarea.selectionStart = tempStart;
              this.elements.textarea.selectionEnd = tempStart;
            } else if (tempStart > 0) {
              this.elements.textarea.value = this.elements.textarea.value.slice(0, tempStart - 1)
              + this.elements.textarea.value.slice(tempEnd);
              this.elements.textarea.selectionStart = tempStart - 1;
              this.elements.textarea.selectionEnd = tempStart - 1;
            }
          });
          break;

        case 'del':
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            const tempStart = this.elements.textarea.selectionStart;
            const tempEnd = this.elements.textarea.selectionEnd;
            if (tempEnd - tempStart > 0) {
              this.elements.textarea.value = this.elements.textarea.value.slice(0, tempStart)
                + this.elements.textarea.value.slice(tempEnd);
              this.elements.textarea.selectionStart = tempStart;
              this.elements.textarea.selectionEnd = tempStart;
            } else if (tempStart < this.elements.textarea.value.length) {
              this.elements.textarea.value = this.elements.textarea.value.slice(0, tempStart)
              + this.elements.textarea.value.slice(tempEnd + 1);
              this.elements.textarea.selectionStart = tempStart;
              this.elements.textarea.selectionEnd = tempStart;
            }
          });
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            const tempStart = this.elements.textarea.selectionStart;
            const tempEnd = this.elements.textarea.selectionEnd;
            this.elements.textarea.value = `${this.elements.textarea.value.slice(0, tempStart)
            }\n${this.elements.textarea.value.slice(tempEnd)}`;
            this.elements.textarea.selectionStart = tempStart + 1;
            this.elements.textarea.selectionEnd = tempStart + 1;
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key_space');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            const tempStart = this.elements.textarea.selectionStart;
            const tempEnd = this.elements.textarea.selectionEnd;
            this.elements.textarea.value = `${this.elements.textarea.value.slice(0, tempStart)
            } ${this.elements.textarea.value.slice(tempEnd)}`;
            this.elements.textarea.selectionStart = tempStart + 1;
            this.elements.textarea.selectionEnd = tempStart + 1;
          });
          break;

        case 'arrowUp':
          keyElement.textContent = String.fromCharCode(0x2191);
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += keyElement.textContent;
          });
          break;

        case 'arrowDown':
          keyElement.textContent = String.fromCharCode(0x2193);
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += keyElement.textContent;
          });
          break;

        case 'arrowLeft':
          keyElement.textContent = String.fromCharCode(0x2190);
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += keyElement.textContent;
          });
          break;

        case 'arrowRight':
          keyElement.textContent = String.fromCharCode(0x2192);
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += keyElement.textContent;
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add('keyboard__key_simple');
          if (this.properties.lang) {
            [keyElement.textContent,
              this.properties.swapArray[langKeyInd]] = [this.properties.swapArray[langKeyInd],
              keyElement.textContent];
            langKeyInd += 1;
          }
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            const tempStart = this.elements.textarea.selectionStart;
            const tempEnd = this.elements.textarea.selectionEnd;
            this.elements.textarea.value = this.elements.textarea.value.slice(0, tempStart)
              + keyElement.textContent + this.elements.textarea.value.slice(tempEnd);
            this.elements.textarea.selectionStart = tempStart + 1;
            this.elements.textarea.selectionEnd = tempStart + 1;
          });
          break;
      }
      keyElement.addEventListener('mouseup', this.onMouseUp(keyElement).bind(this));
      keyElement.id = `${keyCodes[indexOfKey]}`;
      fragment.appendChild(keyElement);
      if (insertBr) fragment.appendChild(document.createElement('br'));
    });
    return fragment;
  }

  onMouseUp(key) {
    return () => {
      if (key.id === 'ShiftLeft' || key.id === 'ShiftRight') {
        if (!(document.getElementById('ShiftLeft').classList.contains('keyboard__key_active')
        && document.getElementById('ShiftRight').classList.contains('keyboard__key_active'))) {
          let SHIFT_OFF = {};
          const simpleKeys = document.querySelectorAll('.keyboard__key_simple');
          if (this.properties.lang) SHIFT_OFF = SHIFT_OFF_RU;
          else SHIFT_OFF = SHIFT_OFF_EN;
          this.properties.capsLock = !this.properties.capsLock;
          if (this.properties.capsLock) {
            simpleKeys.forEach((simpleKey) => {
              if (Object.keys(SHIFT_OFF).indexOf(simpleKey.textContent) !== -1) {
                simpleKey.textContent = SHIFT_OFF[simpleKey.textContent];
              } else simpleKey.textContent = simpleKey.textContent.toUpperCase();
            });
          } else {
            simpleKeys.forEach((simpleKey) => {
              if (Object.keys(SHIFT_OFF).indexOf(simpleKey.textContent) !== -1) {
                simpleKey.textContent = SHIFT_OFF[simpleKey.textContent];
              } else simpleKey.textContent = simpleKey.textContent.toLowerCase();
            });
          }
          this.properties.shift = !this.properties.shift;
        }
        key.classList.remove('keyboard__key_active');
      } else if (key.id === 'ControlLeft' || key.id === 'ControlRight') {
        this.properties.ctrl = !this.properties.ctrl;
        key.classList.remove('keyboard__key_active');
      } else if (key.id === 'AltLeft' || key.id === 'AltRight') {
        this.properties.ctrl = !this.properties.alt;
        key.classList.remove('keyboard__key_active');
      } else if (key.id === 'MetaLeft') {
        this.properties.ctrl = !this.properties.win;
        key.classList.remove('keyboard__key_active');
      } else if (key.id !== 'CapsLock') key.classList.remove('keyboard__key_active');
    };
  }

  onKeyDown(event) {
    event.preventDefault();
    this.elements.textarea.focus();
    const key = document.getElementById(event.code);
    if (key === null) return;
    if (key.id === 'CapsLock') key.click();
    else key.dispatchEvent(new Event('mousedown'));
  }

  onKeyUp(event) {
    const key = document.getElementById(event.code);
    if (key === null) return;
    if (key.id === 'CapsLock') {
      this.elements.capsLock.click();
    } else if (key.id === 'ShiftLeft' || key.id === 'ShiftRight') {
      if (!(document.getElementById('ShiftLeft').classList.contains('keyboard__key_active')
      && document.getElementById('ShiftRight').classList.contains('keyboard__key_active'))) {
        let SHIFT_OFF = {};
        const simpleKeys = document.querySelectorAll('.keyboard__key_simple');
        if (this.properties.lang) SHIFT_OFF = SHIFT_OFF_RU;
        else SHIFT_OFF = SHIFT_OFF_EN;
        this.properties.capsLock = !this.properties.capsLock;
        if (this.properties.capsLock) {
          simpleKeys.forEach((simpleKey) => {
            if (Object.keys(SHIFT_OFF).indexOf(simpleKey.textContent) !== -1) {
              simpleKey.textContent = SHIFT_OFF[simpleKey.textContent];
            } else simpleKey.textContent = simpleKey.textContent.toUpperCase();
          });
        } else {
          simpleKeys.forEach((simpleKey) => {
            if (Object.keys(SHIFT_OFF).indexOf(simpleKey.textContent) !== -1) {
              simpleKey.textContent = SHIFT_OFF[simpleKey.textContent];
            } else simpleKey.textContent = simpleKey.textContent.toLowerCase();
          });
        }
        this.properties.shift = !this.properties.shift;
      }
      key.classList.remove('keyboard__key_active');
    } else if (key.id === 'ControlLeft' || key.id === 'ControlRight') {
      this.properties.ctrl = !this.properties.ctrl;
      key.classList.remove('keyboard__key_active');
    } else if (key.id === 'AltLeft' || key.id === 'AltRight') {
      this.properties.ctrl = !this.properties.alt;
      key.classList.remove('keyboard__key_active');
    } else if (key.id === 'MetaLeft') {
      this.properties.ctrl = !this.properties.win;
      key.classList.remove('keyboard__key_active');
    } else key.classList.remove('keyboard__key_active');
  }
}

window.onload = () => {
  const keyboard = new Keyboard();
  keyboard.init();
};
