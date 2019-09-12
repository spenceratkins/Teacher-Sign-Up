let sessions
let cartCount = 0
let inCart = []

function loadPage() {
fetch("sessions.json")
    .then(response => response.json())
    .then(json => {console.log(json)
                  sessions = json
                  createCards()})
    .catch(error => console.error(errror))
}

function createCards() {
let container = document.createElement('div')
container.innerHTML = sessions.map(sesh =>
`<div ${sesh.Spots > 0 ? '' : 'class="empty"'}>
<h3>${sesh.Title}</h3>
<p>Presenter ${sesh['Presenter(s)'].split(' and ').length > 1 ? 's' : ''}: ${sesh['Presenter(s)']}</p>
<p>Building: ${sesh.Building}</p>
<p>Grade: ${sesh.Grade}</p>
<p>Area of Focus: ${sesh['Area of Focus']}</p>
<p>Description: ${sesh['Description']}</p>
<button 
    ${sesh.Spots <= 0 ? 'disabled' : ''}
    onclick="addToCart('${sesh['Title']}')">Sign Up</button>
</div>`
                                  ).join('')
document.querySelector('article')
    .append(container)
}

function addToCart(sessionName) {
   if (!inCart.includes(sessionName)) {
        inCart.push(sessionName)
        let item = document.createElement('li')
        item.innerHTML = sessionName

        document.querySelector('ul#cart')
            .append(item)

        cartCount++
        let cartCountElem = document.querySelector('span#cartCount')
        cartCountElem.textContent = cartCount
        if (cartCount >= 3) {
            cartCountElem.style.backgroundColor = "green"
        }
        else if (cartCount > 0) {
            cartCountElem.style.backgroundColor = "aqua"
        }
   }
    else {
        alert("You have already added this session to your cart.")
    }
}