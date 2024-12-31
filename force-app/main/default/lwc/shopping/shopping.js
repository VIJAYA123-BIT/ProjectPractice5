import { LightningElement, track } from 'lwc';
export default class Shoppingcard extends LightningElement {
    itemReceived = false;
    @track productList = [];
    @track cartItems = [];
    itemHandler() {
        this.itemReceived = true;
    }
    iPhoneHandler() {
        const item = { id: 'iPhone', name: 'iPhone' };
        this.cartItems.push(item);
    }
    earHandler() {
        const item = { id: 'EarBuds', name: 'EarBuds' };
        this.cartItems.push(item);
    }
    acHandler() {
        const item = { id: 'AC', name: 'AC' };
        this.cartItems.push(item);
    }
    homeHandler() {
        const item = { id: 'HomeTheatre', name: 'Home Theatre' };
        this.cartItems.push(item);
    }
    productHandler() {
        console.log('Cart items are:', this.cartItems);
        this.showCartItems();
    }
    showCartItems() {
        const cartElement = this.template.querySelector('.cart-items');
        if (cartElement) {
            cartElement.innerHTML = '';
            this.cartItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = item.name;
                cartElement.appendChild(listItem);
            });
        }
    }
}

