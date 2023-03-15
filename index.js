const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
const token = '53448dd6f9597302005a33862c36b7ca1f8b0e22'

const addNewResult = (data) => {
  const objectData = eval('(' + data + ')')

  const ul = document.getElementById('menu')
  let lengthOfArray =
    objectData.suggestions.length < 5 ? objectData.suggestions.length : 5

  if (ul.children.length > 0) {
    while (ul.lastElementChild) {
      ul.removeChild(ul.lastElementChild)
    }
  }

  for (let i = 0; i < lengthOfArray; i++) {
    let link = document.createElement('li')
    link.id = i.toString()
    link.classList.add('li-element')
    link.id = i.toString()
    link.innerHTML = `<div>${objectData.suggestions[i].data.name.short_with_opf}</div>`
    link.innerHTML += `<span>${objectData.suggestions[i].data.inn} </span>`
    link.innerHTML += `<span>  ${objectData.suggestions[i].data.address.unrestricted_value}</span>`

    link.onclick = function () {
      const p = document.getElementById('type')
      p.innerHTML =
        descriptionOfTypes(
          objectData.suggestions[parseInt(link.id)].data.type
        ) + ` (${objectData.suggestions[parseInt(link.id)].data.type})`

      document.getElementById('short_name').value =
        objectData.suggestions[parseInt(link.id)].data.name.short_with_opf || ''
      document.getElementById('full_name').value =
        objectData.suggestions[parseInt(link.id)].data.name.full_with_opf || ''
      document.getElementById('inn_kpp').value =
        objectData.suggestions[parseInt(link.id)].data.inn +
          ' / ' +
          objectData.suggestions[i].data.kpp || ''
      document.getElementById('address').value =
        objectData.suggestions[parseInt(link.id)].data.address
          .unrestricted_value || ''

      document.getElementById('Companies').classList.remove('show')
    }

    ul.appendChild(link)
  }
}

const getData = (query) => {
  let options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ query: query }),
  }

  fetch(url, options)
    .then((res) => res.text())
    .then((result) => addNewResult(result))
    .catch((error) => console.log(error.message))
}

function descriptionOfTypes(type) {
  let TYPES = {
    INDIVIDUAL: 'Индивидуальный предприниматель',
    LEGAL: 'Организация',
  }
  return TYPES[type]
}

const input = document.getElementById('party')
input.oninput = function () {
  getData(input.value.toUpperCase())
}

party.onfocus = function () {
  document.getElementById('Companies').classList.toggle('show')
}

party.onblur = function (event) {
  if (event.target.id !== 'party')
    document.getElementById('Companies').classList.remove('show')
}
