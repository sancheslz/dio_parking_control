// Constants
const LIST_IDS: string[] = []
let cards: Registro[] = []


// Types and Interfaces
interface Registro {
  placa: string,
  fabricante: string,
  modelo: string,
  ano: string,
  cor: string,
  token: string,
  startTime: number
}


// Helper Functions
function generateId(): string {
  const token = Math.random().toString(36).substr(2, 9);
  if(token in LIST_IDS) {
    return generateId();
  }
  return token;
}


// Functions
function submit(event: Event): void {
  event.preventDefault();
  const placa = document.getElementById('placa') as HTMLInputElement
  const fabricante = document.getElementById('fabricante') as HTMLInputElement
  const modelo = document.getElementById('modelo') as HTMLInputElement
  const ano = document.getElementById('ano') as HTMLInputElement
  const cor = document.getElementById('cor') as HTMLInputElement

  const values = {
    placa: placa.value.trim(),
    fabricante: fabricante.value.trim(),
    modelo: modelo.value.trim(),
    ano: ano.value.trim(),
    cor: cor.value.trim(),
    token: generateId(),
    startTime: new Date().getTime()
  }

  cards = [...cards, values]
  render()
}

function deleteItem({ id }: HTMLElement): void {
  const selectedCard = cards.find(card => card.token === id)
  cards = cards.filter(card => card.token !== id)

  const delay = (new Date().getTime() - selectedCard!.startTime) / 60000
  alert(`O veículo ${selectedCard?.placa}, ficou estacionado por ${delay.toFixed(0)} minutos`)
  render()
}

function buildCard({ placa, fabricante, modelo, ano, cor, token }: Registro): string {
  const element = [
    `<div class="registro" id="${token}" ondblclick="deleteItem(this)">`,
        `<div class="cor" style="background-color: ${cor}"></div>`, 
        `<div class="registro-content">`, 
          `<div class="placa">${placa}</div>`, 
          `<div class="detalhe">`, 
          `<div class="detalhe-item">${fabricante}</div>`, 
          `<div class="detalhe-item">${modelo}</div>`, 
          `<div class="detalhe-item">${ano}</div>`, 
        `</div>`, 
    `</div>`
  ].join(' ')

  return element
}

function render(): void {
  const registers = document.querySelector('.registros') as HTMLElement
  registers.innerHTML = ''
  cards.forEach(card => {
    const cardHtml = buildCard(card)
    const el = document.createElement('div') as HTMLElement
    el.innerHTML = cardHtml
    registers.appendChild(el)
  })
}

window.onload = () => {
  const TODAY = new Date();
  
  // Update screen with the current date
  const todayMsg = document.querySelector('#today') as HTMLElement;
  todayMsg.innerText = Intl.DateTimeFormat('pt-br', { day: 'numeric', month: 'long', year: 'numeric' }).format(TODAY);

  const submitBtn = document.getElementById('submit') as HTMLInputElement
  submitBtn.addEventListener('click', submit)

}
