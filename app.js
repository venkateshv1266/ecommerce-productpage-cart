let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'iQOO Z7s 5G by vivo (Norway Blue, 6GB RAM, 128GB Storage)',
        image: '1.png',
        price: 16999
    },
    {
        id: 2,
        name: 'iQOO Neo 7 Pro 5G (Dark Storm, 8GB RAM, 128GB Storage)',
        image: '2.png',
        price: 32999
    },
    {
        id: 3,
        name: 'realme C55 (Rainforest, 6GB RAM, 64 Storage)',
        image: '3.png',
        price: 11999
    },
    {
        id: 4,
        name: 'Redmi Note 12 Pro 5G (Stardust Purple, 8GB RAM, 256GB Storage)',
        image: '4.png',
        price: 22999
    },
    {
        id: 5,
        name: 'realme narzo 50i Prime (Dark Blue 4GB RAM+64GB Storage)',
        image: '5.png',
        price: 7499
    },
    {
        id: 6,
        name: 'HONOR 90 (Emerald Green, 12GB + 512GB) ',
        image: '6.png',
        price: 29999
    }
];
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}