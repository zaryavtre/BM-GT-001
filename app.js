import { guitarsData } from '/data.js'

const cartArr = []
const yourOrderH2 = document.querySelector('.your-order')

document.addEventListener('click', function (e) {
  if (e.target.dataset.number) {
    handleCartButton(e.target.dataset.number)
  } else if (e.target.dataset.remove) {
    removeOrder(e.target.dataset.remove)
  }
})

function removeOrder(removeBtn) {
  const targetRemoveId = cartArr.filter(function (remove) {
    return remove.id === removeBtn
  })[0]

  cartArr.pop(targetRemoveId)
  renderGuitars()
}

function handleCart() {
  if (cartArr.length > 0) {
    let cartTemplat = ''

    yourOrderH2.style.display = 'block'

    cartArr.forEach((guitarCart) => {
      cartTemplat += `
          <div class="total">
            <div class="cart-order">
            <p class="cart-guitar-name">${guitarCart.name}</p>
            <button class="remove" data-remove="${guitarCart.id}">Remove</button>
            </div>
              <div class="price-order">
                <p class="final-price">${guitarCart.price}</p>
              </div>
            </div>
        </div>`
    })
    return cartTemplat
  }
}

function handleCartButton(guitarNumber) {
  const targetGuitarId = guitarsData.filter(function (guitar) {
    return guitar.id === guitarNumber
  })[0]

  cartArr.push(targetGuitarId)
  document.querySelector('.items-here').innerHTML = handleCart()
  renderGuitars()
}

function guitarItems() {
  let template = ''
  guitarsData.forEach((guitar) => {
    template += `
        <div class="item" data-number="${guitar.id}">
            <div class="item-holder">
                <div class="img-holder">
                    <img src="${guitar.image}" class="guitar-image"/>
                </div>
                <div class="text-holder">
                    <p class="guitar-title">${guitar.name}</p>
                    <p class="character">${guitar.characteristics}</p>
                    <p class="price">€${guitar.price}</p>
                </div>
            </div>
            <div class="order-btn">
                <button class="btn-for-order" data-number="${guitar.id}" id="add-cart">🤘</button>
            </div>
        </div>
        `
  })
  return template
}

function renderGuitars() {
  document.querySelector('.items-wrapper').innerHTML = guitarItems()
}

renderGuitars()
