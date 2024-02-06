function Calculadora () {
  this.display = document.querySelector('.display')

  this.init = () => {
    this.clickButtons()
    this.pressEnter()
  }

  this.pressEnter = () => {
    this.display.addEventListener('keyup', e => {
      if (e.keyCode === 13) this.getResult()
    })
  }

  this.getResult = () => {
    let conta = this.display.value

    try {
      /* eslint-disable no-eval, no-undef */
      conta = eval(conta)
      if (!conta) {
        return alert('Conta Inválida!!')
      }
    } catch (e) {
      return alert('Conta Inválida!!')
    }

    this.display.value = String(conta)
    /* eslint-enable no-eval, no-undef */
  }

  this.clearDisplay = () => {
    this.display.value = ''
  }

  this.backspaceDisplay = () => {
    this.display.value = this.display.value.slice(0, -1)
  }

  this.clickButtons = () => {
    document.addEventListener('click', e => {
      const el = e.target

      if (el.classList.contains('btn-num')) {
        if (el.classList.contains('btn-op')) {
          const lastDigit = this.display.value[this.display.value.length - 1]
          const operators = '/*-+'

          if (operators.includes(lastDigit)) {
            if (el.innerText !== lastDigit) {
              this.backspaceDisplay()
            } else {
              return
            }
          }
        }
        this.btnParaDisplay(el.innerText)
      }

      if (el.classList.contains('btn-clear')) this.clearDisplay()

      if (el.classList.contains('btn-del')) this.backspaceDisplay()

      if (el.classList.contains('btn-eq')) this.getResult()
    })
  }

  this.btnParaDisplay = (valor) => {
    this.display.value += valor
    this.display.focus()
  }
}

const calculadora = new Calculadora()

calculadora.init()
