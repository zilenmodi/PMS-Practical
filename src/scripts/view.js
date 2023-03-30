// Retrieve product information from local storage
let products = JSON.parse(localStorage.getItem('productCards'))

// Get the product ID from the URL query string
let currentID = window.location.search.split('=')[1]

// Filter the products array to find the product with the matching ID
let currentProduct = products.filter((product) => product._id == currentID)

// If the product ID is found, display the product information on the page
if (currentID !== undefined && currentProduct.length !== 0) {
    document.getElementById('content-view').innerHTML = `
    <div class="container ">
        <div class="card text-center mt-3 w-sm-25 mx-auto">
            <div class="card-header">
                PID: ${currentProduct[0]._id}
            </div>
            <div class="card-body">
                <div class="content-view-imagebox">
                    <img src="${currentProduct[0].image}">
                </div>
                <h5 class="card-title mt-3">${currentProduct[0].productName}
                </h5>
                <p class="card-text">${currentProduct[0].description}
                </p>
                <div class="price text-success mt-2">
                    <h5>$${currentProduct[0].price}</h5>
                </div>
                <a href="../../index.html" class="btn btn-primary mt-2">Go Back</a>
            </div>
        </div>
    </div>`
}
// If the product ID is not found, display a 404 error message on the page
else {
    document.getElementById('content-view').innerHTML = `
    <div class="container ">
        <div class="card text-center mt-3 w-sm-25 mx-auto">
            <div class="card-header">
                PID: Not Available
            </div>
            <div class="card-body">
                <h3 class="card-title mt-3">Page Not Found!
                </h3>
                <p class="card-text">Error 404
                </p>
                <a href="./index.html" class="btn btn-primary mt-2">Go Back</a>
            </div>
        </div>
    </div>`
}
