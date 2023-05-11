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

/* function priceTotal() {
  if (cartArr.length > 0) {
    let TotalPriceTemplate = ''
    cartArr.forEach((guitarPrice) => {
      totalPrice += guitarPrice.price
      TotalPriceTemplate = `
      <div class="sum-wrapper">
        <p class="final-sum">${guitarPrice}</p>
      </div>
    `
    })
    return TotalPriceTemplate
  }
} */

function removeOrder(removeBtn) {
  const targetRemoveId = cartArr
    .map(function (remove) {
      return remove.id
    })
    .indexOf(removeBtn)

  cartArr.splice(targetRemoveId, 1)
  const totalDiv = document.querySelector(`.total[data-number="${removeBtn}"]`)
  totalDiv.remove()

  renderGuitars()
}

function handleCart() {
  if (cartArr.length > 0) {
    let cartTemplat = ''
    let totalPrice = 0
    let priceTemplate = ''

    yourOrderH2.style.display = 'block'

    cartArr.forEach((guitarCart) => {
      cartTemplat += `
          <div class="total" data-number="${guitarCart.id}">
            <div class="cart-order">
            <p class="cart-guitar-name">${guitarCart.name}</p>
            <button class="remove" data-remove="${guitarCart.id}">Remove ❌</button>
            </div>
              <div class="price-order">
                <p class="final-price">€ ${guitarCart.price}</p>
              </div>
            </div>
        </div>`

      totalPrice += guitarCart.price
    })
    priceTemplate = `
      <div class="sum-wrapper">
      <p class="final-sum">${totalPrice}</p>
    </div>
      `
    return cartTemplat + priceTemplate
  } else if (cartArr.length <= 0) {
    yourOrderH2.style.display = 'none'
    const sumWrapper = document.querySelector('.sum-wrapper')
    sumWrapper.remove()
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
