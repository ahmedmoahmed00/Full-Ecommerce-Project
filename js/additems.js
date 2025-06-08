function addItemsToGridProducts() 
{
    let gridProducts = document.querySelector(".products-page .grid-products");

    if (gridProducts) 
    {
        gridProducts.innerHTML = "";
        fetch('jsonFile/products.json')
        .then((res) => res.json())
        .then((data) =>
        {
            data.forEach((element) => 
            {
                if (element.id <= 8) 
                {
                    let box = `                        
                    
                    <div class="box">
                        <button data-index = "${element.id}" class = "overlay btn-details-item" href = "details-product-page.html"><i data-index = "${element.id}" class="fa-solid fa-circle-info"></i></button>
                        <div class="favourite">
                                <svg width="29" height="27" viewBox="0 0 24 24" class="heart-icon" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                           2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                                           C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                                           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </div>
                            <div class="content-image">
                                <img src="${element.img}" alt="Product">
                            </div>
                            <div class="content-text">
                                <p>${element.name}</p>
                                <h3>$${element.price} </h3>
                                <a class = "shop-now" data-index = "${element.id}" href="products-page.html">Shop Now</a>
                        </div>
                    </div>  
                    `

                    gridProducts.innerHTML += box;
                }
            });
        })
        }
        addItemsToGridProductDiscount();
        addItemsToPageProducts();
}



function addItemsToGridProductDiscount() 
{
    let gridProductsDiscount = document.querySelector(".product-discount-page  .grid-products");

    if (gridProductsDiscount) 
    {
        fetch('jsonFile/products.json')
        .then((res) => res.json())
        .then((data) =>
        {
        gridProductsDiscount.innerHTML = "";
        let countProducts = 0;
        
        data.forEach((element) => 
        {
            if (countProducts !== 4 && element.old_price && element.id >= 7) 
            { 
                let box = 
                
`                       <div class="box">
                        <button data-index = "${element.id}" class = "overlay btn-details-item" href = "details-product-page.html"><i data-index = "${element.id}" class="fa-solid fa-circle-info"></i></button>
                        <div class="favourite">
                            <svg width="29" height="27" viewBox="0 0 24 24" class="heart-icon" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                       2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                                       C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                                       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                        <div class="content-image">
                            <img src="${element.img}" alt="Product">
                        </div>
                        <div class="content-text">
                            <p>${element.name}</p>
                            <h3>$${element.price} <span class = "old-price active">$${element.old_price}</span> </h3>
                            <a class = "shop-now" data-index = "${element.id}" href="products-page.html">Shop Now</a>
                        </div>
                    </div>  `
                
                countProducts++;
                gridProductsDiscount.innerHTML += box;   
            }
        });
        })            
    }
}


function addItemsToPageProducts() 
{
    let gridProducts = 
    document.querySelector(".items-produts-page .content .items-product .grid-products");

    let productsCart = JSON.parse(localStorage.getItem("cart")) || [];  

    if (gridProducts) 
    {
        fetch('jsonFile/products.json')
        .then((res) => res.json())
        .then((data) => 
        {
            gridProducts.innerHTML = "";
            data.forEach((element) => 
            {
                let isActive = productsCart.some((product) => product.id === element.id)
                let box = 
                    `               
                    <div class="box" data-index = "${element.id}">
                        <button data-index = "${element.id}" class = "overlay btn-details-item" href = "details-product-page.html"><i data-index = "${element.id}" class="fa-solid fa-circle-info"></i></button>
                    <div class="favourite">
                        <svg width="29" height="27" viewBox="0 0 24 24" class="heart-icon" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                   2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        </div>
                        <div class="content-image">
                            <img src="${element.img}" alt="Product">
                        </div>
                        <div class="content-text">
                            <p>${element.name}</p>
                            <h3>$${element.price} </h3>

                            <button class = "shop-now add-to-cart ${(isActive) ? "active": ""}" data-id = "${element.id}" href="#">Buy Now</button>
                        </div>
                    </div>  
                `


                    gridProducts.innerHTML += box;
            });
        })
    }

}

function addRelatedProductsToPage(params) 
{
    let gridProductsDiscount = document.querySelector(".related-products  .grid-products");

    let productsCart = JSON.parse(localStorage.getItem("cart")) || [];  

    if (gridProductsDiscount) 
    {
        fetch('jsonFile/products.json')
        .then((res) => res.json())
        .then((data) =>
        {
        gridProductsDiscount.innerHTML = "";
        let countProducts = 0;
        
        data.forEach((element) => 
        {

            let isActive = productsCart.some((product) => product.id === element.id)
            if (countProducts !== 4 && element.old_price && element.id >= 7) 
            { 
                let box = 
                `                       
                <div class="box">
                        <button data-index = "${element.id}" class = "overlay btn-details-item" href = "details-product-page.html"><i data-index = "${element.id}" class="fa-solid fa-circle-info"></i></button>
                        <div class="favourite">
                            <svg width="29" height="27" viewBox="0 0 24 24" class="heart-icon" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                       2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                                       C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                                       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                        <div class="content-image">
                            <img src="${element.img}" alt="Product">
                        </div>
                        <div class="content-text">
                            <p>${element.name}</p>
                            <h3>$${element.price} <span class = "old-price active">$${element.old_price}</span> </h3>
                            <button class="shop-now add-to-cart ${(isActive) ? "active": ""}" data-id="${element.id}" href="#">Buy Now</button>
                        </div>
                    </div> 

                    `
                
                countProducts++;
                gridProductsDiscount.innerHTML += box;   
            }
        });
        })            
    }
}


function addItemToDetailesProduct() 
{
    const Item = JSON.parse(localStorage.getItem("productDetailes"));
    let productsCart = JSON.parse(localStorage.getItem("cart")) || [];  

    if (Item) 
    {
        let isActive = productsCart.some((product) => product.id === Item.id)
        const containerBox = document.querySelector(".content-maininfo"); 
        const box = 
        `
            <div class="image-product">
                <div class="small-image-product">
                    <img class="active" src="${Item.img}" alt="image-product">
                    <img src="${Item.img}" alt="image-product">
                    <img src="${Item.img}" alt="image-product">
                    <img src="${Item.img}" alt="image-product">
                </div>
                <div class="big-image">
                    <img src="${Item.BigImg}" alt="image-product">
                </div>
            </div>
            <div class="content-text">

                <div class="name-and-price">

                    <div class="name-product">
                        <h1 class="content-name">${Item.name}</h1>
                    </div>

                    <div class="price-oldprice">
                        <p class="price">$${Item.price}</p>
                        <p class="oldprice">$${Item.old_price}</p>
                    </div>
                </div>

                <div class="content-details">
                    <div class="colors">
                        <p>Select color :</p>
                        <div class="circle-color">
                            <div class="color black"></div>
                            <div class="color Purple"></div>
                            <div class="color red"></div>
                            <div class="color yellow"></div>
                            <div class="color white"></div>
                        </div>
                    </div>
                    <div class="memory">
                        <button>128GB</button>
                        <button>256GB</button>
                        <button>512GB</button>
                        <button class="active">1TB</button>
                    </div>
                    <div class="details">
                        <div class="box">
                            <div class="icon">
                                <img src="images/image-product/iconDetailes/Screensize.png" alt="Screensize">
                            </div>
                            <div class="content">
                                <p class="name">Screen size</p>
                                <p>6.7"</p>
                            </div>
                        </div>

                        <div class="box">
                            <div class="icon">
                                <img src="images/image-product/iconDetailes/smartphone-rotate-2-svgrepo-com 2.png" alt="Screensize">
                            </div>
                            <div class="content">
                                <p class="name">CPU</p>
                                <p>Apple A16 Bionic</p>
                            </div>
                        </div>

                        <div class="box">
                            <div class="icon">
                                <img src="images/image-product/iconDetailes/smartphone-rotate-2-svgrepo-com 2-1.png" alt="Screensize">
                            </div>
                            <div class="content">
                                <p class="name">Number of Cores</p>
                                <p>6</p>
                            </div>
                        </div>

                        <div class="box">
                            <div class="icon">
                                <img src="images/image-product/iconDetailes/smartphone-rotate-2-svgrepo-com 2-2.png" alt="Screensize">
                            </div>
                            <div class="content">
                                <p class="name">Main Camera</p>
                                <p>48-12 -12 MP</p>
                            </div>
                        </div>

                        <div class="box">
                            <div class="icon">
                                <img src="images/image-product/iconDetailes/smartphone-rotate-2-svgrepo-com 2-3.png" alt="Screensize">
                            </div>
                            <div class="content">
                                <p class="name">Front-camera</p>
                                <p>12 MP</p>
                            </div>
                        </div>

                        <div class="box">
                            <div class="icon">
                                <img src="images/image-product/iconDetailes//smartphone-rotate-2-svgrepo-com 2-4.png" alt="Screensize">
                            </div>
                            <div class="content">
                                <p class="name">Battery capacity</p>
                                <p>4323 mAh</p>
                            </div>
                        </div>
                    </div>
                    <div class="text-details">
                        <p>${Item.description} <span>more...</span>
                        </p>
                    </div>
                </div>

                <div class="buttons">
                    <div>
                        <button data-id = "${Item.id}" class="add-wishlist-to-wishlist">Add to Wishlist</button>
                    </div>
                    <div>
                        <button data-id = "${Item.id}" class="add-to-cart ${(isActive) ? "active":""}">Add to Card</button>
                    </div>
                </div>

                <div class="footer">
                    <div class="content-footer">

                        <div class="box">
                            <div class="image">
                                <img src="images/image-product/Icon/56px/Vector.png" alt="">
                            </div>
                            <div class="content-text">
                                <p>Free Delivery</p>
                                <p>1-2 day</p>
                            </div>
                        </div>

                        <div class="box">
                            <div class="image">
                                <img src="images/image-product/Icon/56px/Vector-1.png" alt="">
                            </div>
                            <div class="content-text">
                                <p>In Stock</p>
                                <p>Today</p>
                            </div>
                        </div>
                        <div class="box">
                            <div class="image">
                                <img src="images/image-product/iconDetailes/smartphone-rotate-2-svgrepo-com 2-3.png" alt="">
                            </div>
                            <div class="content-text">
                                <p>Guaranteed</p>
                                <p>1 year</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `    
        if (containerBox) 
        {
            containerBox.innerHTML = box;    
        }


        const boxReview = document.querySelector(".content-box-review"); 

        if (boxReview) 
        {
            stars = addStars(Item);
            const box = 
            `
                <div>
                    <h3>${Item.rating}</h3>
                    <p>of 125 reviews</p>
                </div>
                <div class="stars">
                ${stars}
                </div>
            `
            boxReview.innerHTML = box;
        }

        const boxCommentsReviews = document.querySelector(".content-bottom-reviews"); 

        if (boxCommentsReviews) 
        {
            boxCommentsReviews.innerHTML = "";
            let box = "";

            for (let i = 0; i < Item.reviews.length; i++) 
            {
                item = Item.reviews[i];
                console.log(item);
                stars = addStars (item);
                box =
                `
                    <div class="box">
                        <div class="image">
                            <img src="${item.avatar}" alt="Image Profile">
                        </div>
                        <div class="content-text">
                            <div class="content-name-and-date">
                                <h3>${item.user}</h3>
                                <p>24 January,2023</p>
                            </div>
                            <div class="stars">
                                ${stars}
                            </div>
                            <div class="text">
                                <p>
                                    ${item.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                boxCommentsReviews.innerHTML += box;
                box = "";
            }
        }

    }

    addActiveToElements(".color");
    addActiveToElements(".memory button");
}

function addActiveToElements(classElement) 
{
    const Colors =  document.querySelectorAll(classElement);
    
    Colors.forEach((element) => 
    {
        element.addEventListener(("click"),(event) => 
        {
            Colors.forEach((color) =>
            {
                color.classList.remove("active");
            })

            event.target.classList.add("active");
        })
    })
    
}


function addStars(Item) 
{
    let stars = "";
    for (let index = 0; index < Math.floor(Item.rating); index++) 
    {
        stars += `<i class="fa-solid fa-star active"></i>`;
    }
    

    if (Math.floor(Item.rating) !== 5) 
    {
        if (Math.floor(Item.rating) <= 4) 
        {
            stars += `<i class="fa-solid fa-star-half-stroke active"></i>`
        }

        for (let index = 0; index < 4 - Math.floor(Item.rating); index++) 
            stars += `<i class="fa-regular fa-star"></i>`;

    }
    
    return stars;
}




addItemsToGridProducts();
addItemsToGridProductDiscount();
addItemsToPageProducts();
addRelatedProductsToPage();
addItemToDetailesProduct();