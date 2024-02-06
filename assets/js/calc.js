function criaCalculadora () {
  return {
    display: document.querySelector('.display'),

    inicia () {
      this.clickButtons()
      this.pressEnter()
    },

    pressEnter () {
      this.display.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
          this.getResult()
        }
      })
    },

    getResult () {
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
    },

    clearDisplay () {
      this.display.value = ''
    },

    backspaceDisplay () {
      this.display.value = this.display.value.slice(0, -1)
    },

    clickButtons () {
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

        if (el.classList.contains('btn-clear')) {
          this.clearDisplay()
        }

        if (el.classList.contains('btn-del')) {
          this.backspaceDisplay()
        }

        if (el.classList.contains('btn-eq')) {
          this.getResult()
        }
      })
    },

    btnParaDisplay (valor) {
      this.display.value += valor
    }
  }
}

const calculadora = criaCalculadora()

calculadora.inicia()
