

let idValue=new URLSearchParams(window.location.search).get('id')
if(idValue){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        let product;
        console.log('3')
        product=products.find(product => product.id == idValue);
        console.log(product)
        document.getElementById('imgProduct').src=product.image
        document.getElementById('productName').textContent=product.title
        document.getElementById('productDescription').textContent=product.description
    })
} else{
    window.location.href = "/";
}



