

const addbtns = document.querySelectorAll('.addbtn');
const cart = [];
const cartitem = document.getElementById("cart");
const totalElement = document.getElementById("total");
const clrall = document.getElementById("clrall");

addbtns.forEach((addbtn, index) => { 
    addbtn.addEventListener('click', function() {
        cartitem.innerHTML = '';
        totalElement.innerHTML = '';
        const productDiv = this.closest('.product');
        const productName = productDiv.querySelector('.itemname').textContent;
        const price = productDiv.querySelector('.price').value;
        const productImage = productDiv.querySelector('.prdimg').src;
        cart.push([productImage, productName, price]);
        renderCart();
        updateTotal();
        alertadd(productName,index);
    });
});

function renderCart() {
    cartitem.innerHTML = '';
    totalElement.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        const itemImage = document.createElement('img');
        itemImage.src = item[0];
        itemImage.alt = item[1];
        itemImage.style.width = '100px';
        itemImage.style.height = '120px';
        cartItemDiv.appendChild(itemImage);
        const itemNamePriceDiv = document.createElement('div');
        itemNamePriceDiv.classList.add('item-name-price');
        const itemNamePrice = document.createElement('p');
        itemNamePrice.textContent = `${item[1]} - Rs ${item[2]}`;
        const delitem = document.createElement('button');
        delitem.classList.add('btn')
        delitem.classList.add('btn-outline-danger')
        delitem.setAttribute('type', 'button');
        delitem.textContent = 'Remove';
        delitem.addEventListener('click', function() {
            removeItem(index);
            alert(item,index);
        });
        clrall.addEventListener('click', function() {
            removeAll(index);
        })
        itemNamePriceDiv.appendChild(itemNamePrice);
        itemNamePriceDiv.appendChild(delitem);
        cartItemDiv.appendChild(itemNamePriceDiv);
        cartitem.appendChild(cartItemDiv);
    });
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
    updateTotal();
}

function removeAll(index) {
    cart.splice(index, cart.length)
    renderCart()
    updateTotal()
}

function updateTotal() {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += Number(item[2]);
    });
    const pr = document.createElement('h6')
    pr.textContent = `Total Price: Rs ${totalPrice}`;
    totalElement.appendChild(pr)
}

function alert(item,index) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder2');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.appendChild(wrapper);
       
        setTimeout(() => {
            wrapper.remove();
        }, 3000);
    };
    appendAlert(`${item[1]} removed`, 'danger');
}

function alertadd(productName,index){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            
            '</div>'
        ].join('');
        alertPlaceholder.appendChild(wrapper);
       
        setTimeout(() => {
            wrapper.remove();
        }, 1000);
    };
    appendAlert(`${productName} Added to cart `, 'success');
}


        
            
       
       


  
    



  

  