const productList = document.getElementById('productList');
const btnFilter = document.getElementById('btnFilter');
const btnFilter2 = document.getElementById('btnFilter2');

class Render {
    constructor(container,products, redirect=false) {
        this.container = container;
        this.products = products;
        this.redirect=redirect;
    }
    renderProduct(){
        this.container.innerHTML='';
        this.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('productCard');
        productCard.innerHTML = `
            <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <h5 class="card-title">${product.price}</h5>
                <p class="card-text">${product.description}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        `;
        if(this.redirect){
            productCard.addEventListener('click', () => this.redirectToProductPage(product.id));
        }
        this.container.appendChild(productCard);
    });
    }
    redirectToProductPage(productId) {
        window.location.href = `product.html?id=${productId}`;
    }
}
class Filter{
    constructor(products,input) {
        this.products = products;
        this.input = input;
    }
    byMin(){
        return this.products.filter((number)=>number.price> +this.input.value)
    }
    byMax(){
        return this.products.filter((number)=>number.price< +this.input.value)
    }
}
class Sort{
    constructor(products) {
        this.products = products;
    }
    byMin(){
        return this.products.slice().sort((a, b) => b.price - a.price);   
    }
    byMax(){
        return this.products.slice().sort((a, b) => a.price - b.price);   
    }
}


let data;
let psevdoData;
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        data=products;
        psevdoData=data;
        new Render(productList,products,true).renderProduct();
    })
    .catch(error => console.error('Error fetching products:', error));






btnFilter.addEventListener('click', ()=>{
    if(document.getElementById('minPrice').value){
        let filter=new Filter(data,document.getElementById('minPrice')).byMin()
        psevdoData=filter
        new Render(productList,filter, true).renderProduct();
        document.getElementById('minPrice').value=''
    }
})
btnFilter2.addEventListener('click', ()=>{
    if(document.getElementById('maxPrice').value){
        let filter=new Filter(data,document.getElementById('maxPrice')).byMax()
        psevdoData=filter;
        new Render(productList,filter, true).renderProduct();
        document.getElementById('maxPrice').value=''
    }
})
document.getElementById('sort').addEventListener('change',(event)=>{
    switch(event.target.id){
        case 'defalutSort':
            new Render(productList,psevdoData, true).renderProduct();
            break;
        case 'byMaxSort':
            let sort=new Sort(psevdoData).byMax()
            new Render(productList,sort, true).renderProduct();
            break;
        case 'byMinSort':    
            let sort2=new Sort(psevdoData).byMin()
            new Render(productList,sort2, true).renderProduct();
            break;
    }
})