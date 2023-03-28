let productCards = JSON.parse(localStorage.getItem('productCards')) || [];
let image = ""
document.getElementById("createNewModalPImg").addEventListener('change', (event) => {
    image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        image = reader.result
    });
});

document.getElementById("editCardModalPImg").addEventListener('change', (event) => {
    image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        image = reader.result
    });
});

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

document.getElementById("createNewModalBtn").addEventListener("click", () => {
    let uid = randomIntFromInterval(100000, 999999)
    document.getElementById("createNewModalPID").value = uid;
})

let createNewProductForm = document.getElementById("createNewProductForm");

createNewProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let _id = document.getElementById("createNewModalPID").value;
    let productName = document.getElementById("createNewModalPName").value;
    let price = document.getElementById("createNewModalPPrice").value;
    let description = document.getElementById("createNewModalPDes").value;

    let newProduct = {
        _id, productName, image, price, description
    }
    productCards = JSON.parse(localStorage.getItem('productCards')) || [];
    productCards.push(newProduct)
    localStorage.setItem('productCards', JSON.stringify(productCards));
    productCards = JSON.parse(localStorage.getItem('productCards'))
    image = ""

    let uid = randomIntFromInterval(100000, 999999)
    document.getElementById("createNewModalPID").value = uid;
    document.getElementById("createNewModalPID").value = "";
    document.getElementById("createNewModalPName").value = "";
    document.getElementById("createNewModalPPrice").value = "";
    document.getElementById("createNewModalPDes").value = "";
    document.getElementById("createNewModalPImg").value = "";

    addHTMLToDisplayArea(productCards)
});


let editProductForm = document.getElementById("editProductCardForm");

editProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let _id = document.getElementById("editCardModalPID").value;
    let productName = document.getElementById("editCardModalPName").value;
    let price = document.getElementById("editCardModalPPrice").value;
    let description = document.getElementById("editCardModalPDes").value;

    let editProduct = {
        _id, productName, image, price, description
    }

    productCards = JSON.parse(localStorage.getItem('productCards'));
    let newProductCards = productCards.map((currPCard) => {
        if (currPCard._id == editProduct._id) {
            return editProduct;
        }
        else {
            return currPCard;
        }
    })

    localStorage.setItem('productCards', JSON.stringify(newProductCards));
    productCards = JSON.parse(localStorage.getItem('productCards'))
    image = ""

    addHTMLToDisplayArea(productCards)
});

function addHTMLToDisplayArea(products) {
    let contentArea = document.getElementById("allCardsDisplay");
    contentArea.innerHTML = "";
    products.map((currentproduct) => {
        contentArea.innerHTML += `
        <div class="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <div class="card">
        <div class="card-image-box">
                            <img class="card-img"
                            src="${currentproduct.image}"
                                alt="Vans">
                        </div>

            <div class="card-body">
                <h4 class="card-title">${currentproduct.productName}</h4>
                <h6 class="card-subtitle mb-2 text-muted">PID: ${currentproduct._id}</h6>
                <p class="card-text">
                ${currentproduct.description} </p>
                <div class="buy d-flex justify-content-between align-items-center">
                    <div class="price text-success">
                        <h5>$${currentproduct.price}</h5>
                    </div>

                </div>
                <div class="buy d-flex gap-3 align-items-center mt-3">
                    <button type="button" class="btn btn-outline-primary">View more</button>
                    <button type="button" id="cardEditBtn-${currentproduct._id}" data-bs-toggle="modal" data-bs-target="#editCardModal" class="btn btn-outline-success" onclick="handleCurrentEdit(${currentproduct._id})">Edit</button>
                    <button type="button" class="btn btn-outline-danger" onclick="handleCurrentDelete(${currentproduct._id})">Delete</button>
                </div>
            </div>
        </div>
    </div>`
    })
}

function handleCurrentEdit(currentproductID) {
    let currentProduct = productCards.filter((currCard) => currCard._id == currentproductID)
    document.getElementById("editCardModalPID").value = currentproductID;
    document.getElementById("editCardModalPName").value = currentProduct[0].productName;
    document.getElementById("editCardModalPPrice").value = currentProduct[0].price;
    document.getElementById("editCardModalPDes").value = currentProduct[0].description;
    document.getElementById("editCardModalPImg").value = "";
}

function handleCurrentDelete(currentproductID) {
    let currentProducts = productCards.filter((currCard) => currCard._id != currentproductID)

    localStorage.setItem('productCards', JSON.stringify(currentProducts));
    productCards = JSON.parse(localStorage.getItem('productCards'))

    addHTMLToDisplayArea(productCards)
}

addHTMLToDisplayArea(productCards)