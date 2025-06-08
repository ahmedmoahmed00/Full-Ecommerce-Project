


function mainCode() 
{
    openandCloseToggleBar();
    staticNavScroll();
    columnItemsProduct();
    checkToSelect ();
    inputRangeSlider();
    openAndCloseColumn();
    countSelectedProducts();
    updateDataProdcuts();
    buttonProductDetailes();
    addDataToCart();
    GetQuantityItemsInCart();
    AddItemsToPaymentPage();
    GoToSelectAddress();
}

function GoToSelectAddress() 
{
    const Item = document.querySelector(".shopping-cart .body-content .order-for .checkout-btn");

    if (Item) 
    {
        Item.addEventListener(("click"), ()=>
        {
            window.location.assign("selectAddressPage.html");
        })  
    }
  
}


function AddItemsToPaymentPage() 
{
    let containerBoxs = document.querySelector(".payment-page .contetn-payment .boxs");


    if (containerBoxs) 
    {
        let productsCart = JSON.parse(localStorage.getItem("cart")) || [];  

        containerBoxs.innerHTML = "";
        productsCart.forEach((item) =>
        {
            const box = 
            `
                <div class="box">
                    <div class="image">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="content-box">
                        <p>${item.name}</p>
                        <p class="price">${item.price * item.quantatiy}</p>
                    </div>
                </div>
            `

            containerBoxs.innerHTML += box;
        })


        const subtotal =
        document.querySelector(".payment-page .contetn-payment .bottom-left-side .body-bottom-left .sub-total .subtotal");
    
        subtotal.innerHTML = "$"+ subTotalProductsCart();

        const total = document.querySelector(".payment-page .contetn-payment .bottom-left-side .body-bottom-left .total p:last-child");

        total.innerHTML = "$"+ (subTotalProductsCart() + (50 + 29));
    }
}

function GetQuantityItemsInCart() 
{
    let quantityElement = document.querySelector(".quantatiy-items");

    if (quantityElement) 
    {
            
        let productsCart = JSON.parse(localStorage.getItem("cart")) || [];  

        quantityElement.innerHTML = productsCart.length;
    }

}
function buttonProductDetailes() 
{
    
    fetch("jsonFile/products.json")
    .then((respons) => respons.json())
    .then((data) =>
    {
        const productitem = document.querySelectorAll(".box .btn-details-item");

        productitem.forEach((item) => 
        {
            item.addEventListener("click",(event) =>
            {
               const resultData =  data.filter((item) => item.id == event.target.dataset.index);
                localStorage.setItem("productDetailes",JSON.stringify(resultData[0]));

                location.assign("details-product-page.html")
            })
        })

    })
}

function staticNavScroll() 
{

    const navBar = document.querySelector("header .top-header");

    if (scrollY >= 600)
    {
        navBar.classList.add("active");
    }

    window.addEventListener(("scroll") ,() =>
    {

        if (scrollY >= 300 && scrollY <= 599) 
        {
            navBar.style.opacity = "0";
        }
        else
        {
            navBar.style.opacity = "1";
        }

        if (scrollY >= 600)
        {
            navBar.classList.add("active");
        }
        else
        {
            navBar.classList.remove("active");
        }
    })
}

function openandCloseToggleBar() {
        
    let barElement = document.querySelector(".toggle-bar");

    barElement.addEventListener("click",()=>
    {
        document.querySelector(".content-nav").classList.toggle("active")
    })
}

function openAndCloseColumn()
{
    let leftColumn = document.querySelector(".items-produts-page .container .left-column");
    let itemsProduct = document.querySelector(".items-produts-page .items-product");
    let elementFilter = document.querySelector(".items-produts-page .container .headtags .filter-rating .filter");
    let elementCloseFilter = 
    document.querySelector(".items-produts-page .content .left-column .column.close-phone");

    if (elementFilter) 
    {
        elementFilter.addEventListener("click", ()=>
        {
            leftColumn.classList.toggle("active");
            itemsProduct.classList.toggle("active");
        })
    }

    if (elementCloseFilter) 
    {
        elementCloseFilter.addEventListener("click", ()=>
        {
            leftColumn.classList.toggle("active");
            itemsProduct.classList.toggle("active");
        })
    }

}

function columnItemsProduct()
{
    let columnMenu = document.querySelectorAll(".head-column");

    if (columnMenu) 
    {
        columnMenu.forEach((element)=>
        {
            element.addEventListener("click",(event)=>
            {
                if (event.target.children[1] && event.target.nextElementSibling) 
                {
                    event.target.nextElementSibling.classList.toggle("active");
                    event.target.children[1].classList.toggle("active");
                }
            })
        })
    }
}

function inputRangeSlider()
{
    let rangeOne = document.querySelectorAll(".range-slider input");
    let inputs = document.querySelectorAll(".column.price input");

    if (rangeOne) 
    {
        rangeOne.forEach(element => {

            element.addEventListener("input",(event) =>
            {
                inputs.forEach((element) =>
                {
                  if (element.dataset.id === event.target.dataset.id) 
                    {
                        element.value = event.target.value;
                    }  
                })
            })

        });
    }

    if (inputs) 
    {
        inputs.forEach((input)=>
        {
            input.addEventListener("input",(event) =>
            {
                rangeOne.forEach((element)=>
                {
                    if (event.target.value < 0) 
                    {
                        event.target.value = 0;
                    }
                    if (element.dataset.id === event.target.dataset.id) 
                    {
                        element.value = event.target.value;
                    }  
                })
            })
        })    
    }
}

function checkToSelect ()
{
   let selectElement = document.querySelector(".items-product .products-page .headtags select");
    
    if (selectElement) 
    {
        selectElement.addEventListener("click",(event) => 
        {
            event.target.nextElementSibling.children[0].classList.toggle("active");
        })

        selectElement.addEventListener("blur",(event)=>
        {
            event.target.nextElementSibling.children[0].classList.remove("active");
        })
    }
}

function countSelectedProducts() 
{
    let selectProductElement = document.querySelector(".selectedproducts");

    if (selectProductElement) 
    {
        fetch("jsonFile/products.json")
        .then((respons) => respons.json())
        .then((data) =>
        {
            selectProductElement.children[0].innerHTML = data.length;
        })
    }
}

// localStorage.clear()
function updateDataProdcuts()
{
    let productsCart = JSON.parse(localStorage.getItem("cart")) || [];  
    let sectionContentProducts = document.querySelector(".shopping-cart .body-content .section-content");

    if (productsCart) 
    {
        let countboxs = 0;

        if (sectionContentProducts) 
        {
            sectionContentProducts.innerHTML = "";
        }

        productsCart.forEach((cartItem) => 
        {
            let box = 
            `
                    <div class="box">
                    <div class="content-image">
                        <img src="${cartItem.img}" alt="Product">
                    </div>
                    <div class="content-text">
                        <div class="content-name">
                            <p class="product-name">${cartItem.name}</p>
                        </div>
                        <div class="price-and-remove">
                            <p class="price">$${cartItem.price * cartItem.quantatiy}</p>
                            <i data-id = ${cartItem.id} class="fa-solid fa-trash-can remove-item"></i>
                        </div>
                        <div class="quantatiy">
                            <button data-id = ${cartItem.id} class="decrease"><i data-id = ${cartItem.id} class="fa-solid fa-minus"></i></button>
                            <div class = "number-quantatiy">${cartItem.quantatiy}</div>
                            <button data-id = ${cartItem.id} class="increase"><i data-id = ${cartItem.id} class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>

                    </div>
                 `
            if (sectionContentProducts) 
            {
                sectionContentProducts.innerHTML += box;
            }
            countboxs++;
        })
    }

    addDataToCart();
    decreaseDatacart();
    increaseDatacart();
    removeItemInCart();
    subTotalProductsCart();
    totalPrice();
    GetQuantityItemsInCart();
}

function subTotalProductsCart() 
{
    let TotalPriceAllCart = document.querySelector(".price.subtotal");
    let productsCart = JSON.parse(localStorage.getItem("cart")) || [];  

    let subtotal = productsCart.reduce((pre,curr) => pre + (curr.price * curr.quantatiy),0); 

    if (TotalPriceAllCart) 
    {
        TotalPriceAllCart.innerHTML = "$" + subtotal;
    }
    return subtotal;
}

function totalPrice() 
{
    const subtotal = subTotalProductsCart();
    const EstimatedPrices = document.querySelectorAll(".estimated .price");
    const totalPrice = document.querySelector(".content-order .total .price");
    
    let total = Number.parseFloat(subtotal);

    EstimatedPrices.forEach((priceELement) =>
    {

       total += Number.parseFloat(priceELement.dataset.price);

    })
    
    if (totalPrice) 
    {
        totalPrice.innerHTML = "$" + total;
    }
    
}

function removeItemInCart() 
{
    let productsCart = JSON.parse(localStorage.getItem("cart")) || [];  
    let btnDelete = document.querySelectorAll(".remove-item");

    btnDelete.forEach((btn) =>
    {
        btn.addEventListener("click",(event) =>
        {
            console.log(event.target.dataset.id);
            productsCart = productsCart.filter((element) => element.id != event.target.dataset.id);

            localStorage.setItem("cart",JSON.stringify(productsCart));
            updateDataProdcuts();
        })
    })
}

// localStorage.clear()

function decreaseDatacart() 
{
    let buttonDecrease = document.querySelectorAll(".decrease");
    let productsCart = JSON.parse(localStorage.getItem("cart")) || [];
    
        buttonDecrease.forEach((btn) => 
        {
            btn.addEventListener("click", (event)=>
            {
                if (productsCart) {
                    productsCart.forEach((cart) =>
                    {
                        if (event.target.dataset.id == cart.id) 
                        {
                            (cart.quantatiy > 1) ? cart.quantatiy-- : cart.quantatiy = 1 ;
                        }
                    })
                    localStorage.setItem("cart",JSON.stringify(productsCart));
                    updateDataProdcuts();
                }
            });
        })
}

function increaseDatacart()
{
    let buttonDecrease = document.querySelectorAll(".increase");
    let productsCart = JSON.parse(localStorage.getItem("cart")) || [];
    
        buttonDecrease.forEach((btn) => 
        {
            btn.addEventListener("click", (event)=>
            {
                if (productsCart) {
                    productsCart.forEach((cart) =>
                    {
                        if (event.target.dataset.id == cart.id) 
                        {
                            cart.quantatiy++;
                        }
                    })
                    localStorage.setItem("cart",JSON.stringify(productsCart));
                    updateDataProdcuts();
                }
            });
        })
}


function checkandAddQuantatiyProduct(dataCart) 
{
    if (! dataCart.quantatiy) 
    {
        dataCart.quantatiy = 1;
    }

    return  dataCart;
}

function addDataToCart()
{

    let localStorageItem = JSON.parse(localStorage.getItem("cart")) || [];

    fetch(`jsonFile/products.json`)
    .then((res) => res.json())
    .then((data) =>
    {
        let buttonBuyProduct = document.querySelectorAll(".add-to-cart");

        buttonBuyProduct.forEach((btn) => 
        {
            btn.addEventListener("click",(event) => 
            {
                data.forEach((dataCart) =>
                {
                    if (dataCart.id == event.target.dataset.id) 
                    {
                        event.target.classList.add("active");
                        if (!localStorageItem.some((ele) => ele.id == event.target.dataset.id)) 
                        {
                            dataCart = checkandAddQuantatiyProduct(dataCart);
                            localStorageItem.push(dataCart);
                            localStorage.setItem("cart",JSON.stringify(localStorageItem));
                            updateDataProdcuts();
                        }
                    }
                })

            })
        })
    })

}


mainCode();


