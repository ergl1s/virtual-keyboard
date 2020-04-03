const KEYCODES = {
  '`' : '192',
  '1': '49',
  '2': '50',
  '3': '51',
  '4': '52',
  '5': '53',
  '6': '54',
  '7': '55',
  '8': '56',
  '9': '57',
  '0': '48',
  '-': '189',
  '=': '187',
  'backspace': '8',
  'tab': '9',
  'q': '81',
  'w': '87',
  'e': '69',
  'r': '82',
  't': '84',
  'y': '89',
  'u': '85',
  'i': '73',
  'o': '79',
  'p': '80',
  '[': '219',
  ']': '221',
  '\\': '220', 
  'del': '46',
  'caps': '20',
  'a': '65',
  's': '83',
  'd': '68',
  'f': '70',
  'g': '71',
  'h': '72',
  'j': '74',
  'k': '75',
  'l': '76',
  ';': '186',
  '\'': '222',
  'enter': '13',
  'shift': '16', //event.location 1
  'z': '90',
  'x': '88',
  'c': '67',
  'v': '86',
  'b': '66',
  'n': '78',
  'm': '77',
  ',': '188',
  '.': '190',
  '/': '191',
  'arrowUp': '38',
  'shiftR': '16', //event.location 2
  'ctrl': '17', //event.location 1
  'win': '91',
  'alt': '18', //event.location 1
  'space': '32',
  'altR': '18', //event.location 2
  'arrowLeft': '37',
  'arrowDown': '40',
  'arrowRight': '39',
  'ctrlR': '17' //event.location 2  
}

const SHIFT_ON_EN = {
  '`': '~',
  '1': '!',
  '2': '@',
  '3': '#',
  '4': '$',
  '5': '%',
  '6': '^',
  '7': '&',
  '8': '*',
  '9': '(',
  '0': ')',
  '-': '_',
  '=': '+',
  '[': '{',
  ']': '}',
  '\\': '|',
  ';': ':',
  '\'': '\"',
  ',': '<',
  '.': '>',
  '/': '?',
}

const SHIFT_OFF_EN = {
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  '$': '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  '_': '-',
  '+': '=',
  '{': '[',
  '}': ']',
  '|': '\\',
  ':': ';',
  '\"': '\'',
  '<': ',',
  '>': '.',
  '?': '/',
}
class Keyboard {
  elements = {
    keysContainer: null,
    keys: [],
    textarea: null,
    capsLock: null
  };

  properties = {
    capsLock: false,
    ctrl: false,
    alt: false,
    win: false,
    shift: false,
    lang: 'English'
  }

  constructor() {
    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.classList.add('keyboard');
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.classList.add('textarea');
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.keysContainer);
    this.elements.textarea.addEventListener('keydown', (event) => {
      event.preventDefault();
    });

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyArrayEn = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'arrowUp', 'shiftR',
      'ctrl', 'win', 'alt' , 'space' , 'altR' , 'arrowLeft' , 'arrowDown', 'arrowRight', 'ctrlR' 
    ];
    
    keyArrayEn.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertBr = ['backspace', 'del', 'enter', 'shiftR'].indexOf(key) !== -1;
      
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      switch(key) {
        case 'caps': {
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          this.elements.capsLock = keyElement;
          keyElement.addEventListener('click', () => {
            let simpleKeys = document.querySelectorAll('.keyboard__key_simple');
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
            if (keyElement.classList.contains('keyboard__key_active')) 
              keyElement.classList.remove('keyboard__key_active');
            else 
              keyElement.classList.add('keyboard__key_active');
          });
        }
        break;

        case 'tab': {
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += '\t';
          });
        }
        break; 

        case 'shiftR': 
        case 'shift': {
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            if (!this.elements.shift) {
              this.elements.shift = !this.elements.shift;
              let simpleKeys = document.querySelectorAll('.keyboard__key_simple');
              this.properties.capsLock = !this.properties.capsLock;
              if (this.properties.capsLock) {
                simpleKeys.forEach((simpleKey) => {
                  if (Object.keys(SHIFT_ON_EN).indexOf(simpleKey.textContent) !== -1) {
                    simpleKey.textContent = SHIFT_ON_EN[simpleKey.textContent];
                  } else
                    simpleKey.textContent = simpleKey.textContent.toUpperCase();
                });
              } else {
                simpleKeys.forEach((simpleKey) => {
                  if (Object.keys(SHIFT_ON_EN).indexOf(simpleKey.textContent) !== -1) {
                    simpleKey.textContent = SHIFT_ON_EN[simpleKey.textContent];
                  } 
                  else
                    simpleKey.textContent = simpleKey.textContent.toLowerCase();
                });
              }
            }
            keyElement.classList.add('keyboard__key_active');
          });
        }
        break;

        case 'ctrl': {
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.properties.ctrl = !this.properties.ctrl;
          });
        }
        break;

        case 'ctrlR': {
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.properties.ctrl = !this.properties.ctrl;
          });
        }
        break;

        case 'win': {
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.properties.win = !this.properties.win;
          });
        }
        break;

        case 'alt': {
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.properties.alt = !this.properties.alt;
          });
        }
        break;

        case 'altR': {
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.properties.alt = !this.properties.alt;
          });
        }
        break;

        case 'backspace': {
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value = this.elements.textarea.value.substring(0, this.elements.textarea.value.length - 1);
          });
        }
        break;

        case 'del': {
          keyElement.textContent = key;
        }
        break;

        case 'enter': {
          keyElement.classList.add('keyboard__key_large');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += '\n';
          });
        }
        break;

        case 'space': {
          keyElement.classList.add('keyboard__key_space');
          keyElement.textContent = key;
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += ' ';
          });
        }
        break;

        case 'arrowUp': {
          keyElement.textContent = String.fromCharCode(0x2191);
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += keyElement.textContent;
          });
        }
        break;

        case 'arrowDown': {
          keyElement.textContent = String.fromCharCode(0x2193);
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += keyElement.textContent;
          });
        }
        break;

        case 'arrowLeft': {
          keyElement.textContent = String.fromCharCode(0x2190);
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += keyElement.textContent;
          });
        }
        break;

        case 'arrowRight': {
          keyElement.textContent = String.fromCharCode(0x2192);
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += keyElement.textContent;
          });
        }
        break;

        default: {
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add('keyboard__key_simple');
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key_active');
            this.elements.textarea.value += this.properties.capsLock ? keyElement.textContent.toUpperCase() : keyElement.textContent.toLowerCase();
          });
        }
        break;
      }
      keyElement.value = KEYCODES[key];
      fragment.appendChild(keyElement);
      if (insertBr) {
          fragment.appendChild(document.createElement("br"));
      }; 
    })

    document.addEventListener('mouseup', () => {
      const activeKeys = document.querySelectorAll('.keyboard__key_active');
      if (activeKeys.length == 1 && activeKeys[0].value == '16') {
        let simpleKeys = document.querySelectorAll('.keyboard__key_simple');
        this.properties.capsLock = !this.properties.capsLock;
        if (this.properties.capsLock) {
          simpleKeys.forEach((simpleKey) => {
            if (Object.keys(SHIFT_OFF_EN).indexOf(simpleKey.textContent) !== -1) {
            simpleKey.textContent = SHIFT_OFF_EN[simpleKey.textContent];
            } else
                simpleKey.textContent = simpleKey.textContent.toUpperCase();
          });
        } else {
          simpleKeys.forEach((simpleKey) => {
            if (Object.keys(SHIFT_OFF_EN).indexOf(simpleKey.textContent) !== -1) {
              simpleKey.textContent = SHIFT_OFF_EN[simpleKey.textContent];
            } else
                simpleKey.textContent = simpleKey.textContent.toLowerCase();
          });
        }
        this.elements.shift = !this.elements.shift;
        activeKeys[0].classList.remove('keyboard__key_active');
      } else
          activeKeys.forEach((key) => {if (key.value != '16' &&key.value != '20') {key.classList.remove('keyboard__key_active')}});
    })

    document.addEventListener('keyup', () => {
      const activeKeys = document.querySelectorAll('.keyboard__key_active');
      activeKeys.forEach((activeKey) => {
        if (event.keyCode == activeKey.value) {
          if (event.keyCode == '16') {
            let simpleKeys = document.querySelectorAll('.keyboard__key_simple');
            this.properties.capsLock = !this.properties.capsLock;
            if (this.properties.capsLock) {
              simpleKeys.forEach((simpleKey) => {
                if (Object.keys(SHIFT_OFF_EN).indexOf(simpleKey.textContent) !== -1) {
                simpleKey.textContent = SHIFT_OFF_EN[simpleKey.textContent];
                } else
                    simpleKey.textContent = simpleKey.textContent.toUpperCase();
              });
            } else {
              simpleKeys.forEach((simpleKey) => {
                if (Object.keys(SHIFT_OFF_EN).indexOf(simpleKey.textContent) !== -1) {
                  simpleKey.textContent = SHIFT_OFF_EN[simpleKey.textContent];
                } else
                    simpleKey.textContent = simpleKey.textContent.toLowerCase();
              });
            }
            this.elements.shift = !this.elements.shift;
          }
          activeKey.classList.remove('keyboard__key_active');
        }
      })
    });
    return fragment;
  }

  onKeyDown(event) {
    let keys = document.querySelectorAll('.keyboard__key');
    let flag = false; 
    for(let i = 0; i < keys.length; i++) {
      if(event.location != 2) {
        if(event.keyCode == keys[i].value) {
          if (event.keyCode == "20") keys[i].click();
          else keys[i].dispatchEvent(new Event('mousedown'));
          break;
        }
      }
      else {
        if(event.keyCode == keys[i].value) {
          if(flag) {
            keys[i].dispatchEvent(new Event('mousedown'));
            break;
          }
          flag = true; 
          continue;
        }
      }
    }
  }

  onKeyUp(event) {
    if(event.keyCode == "20") {
      this.elements.capsLock.click();
    }
  }
}

keyboard = new Keyboard();