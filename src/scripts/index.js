let productAcend = true;
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
    let uid = randomIntFromInterval(10000000000, 99999999999)
    document.getElementById("createNewModalPID").value = uid;
})

let createNewProductForm = document.getElementById("createNewProductForm");

createNewProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let _id = document.getElementById("createNewModalPID").value;
    let productName = document.getElementById("createNewModalPName").value;
    let price = document.getElementById("createNewModalPPrice").value;
    let description = document.getElementById("createNewModalPDes").value;

    if (productName.replace(/^\s+|\s+$/gm, '').length == 0 || description.replace(/^\s+|\s+$/gm, '').length == 0) {
        alert("fill correctly");
        return;
    }

    let newProduct = {
        _id, productName, image, price, description
    }

    $("#createNewModal").modal('hide');
    productCards = JSON.parse(localStorage.getItem('productCards')) || [];
    productCards.push(newProduct)
    localStorage.setItem('productCards', JSON.stringify(productCards));
    productCards = JSON.parse(localStorage.getItem('productCards'))
    image = ""

    let uid = randomIntFromInterval(10000000000, 99999999999)
    document.getElementById("createNewModalPID").value = uid;
    console.log(uid);
    document.getElementById("createNewModalPID").value = "";
    document.getElementById("createNewModalPName").value = "";
    document.getElementById("createNewModalPPrice").value = "";
    document.getElementById("createNewModalPDes").value = "";
    document.getElementById("createNewModalPImg").value = "";
    success()
    addHTMLToDisplayArea(productCards)

});


let editProductForm = document.getElementById("editProductCardForm");

editProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let _id = document.getElementById("editCardModalPID").value;
    let productName = document.getElementById("editCardModalPName").value;
    let price = document.getElementById("editCardModalPPrice").value;
    let description = document.getElementById("editCardModalPDes").value;

    if (productName.replace(/^\s+|\s+$/gm, '').length == 0 || description.replace(/^\s+|\s+$/gm, '').length == 0) {
        alert("fill correctly");
        return;
    }

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
    saveSuccess()
    addHTMLToDisplayArea(productCards)
});


function addHTMLToDisplayArea(products) {
    let contentArea = document.getElementById("allCardsDisplay");
    contentArea.innerHTML = "";
    products.map((currentproduct) => {
        if (currentproduct === undefined) {
            return;
        }
        contentArea.innerHTML += `
        <div class="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <div class="card card-div-box">
        <div class="card-image-box">
                            <img class="card-img"
                            src="${currentproduct?.image}"
                                alt="Vans">
                        </div>

            <div class="card-body">
                <h4 class="card-title">${currentproduct?.productName}</h4>
                <h6 class="card-subtitle mb-2 text-muted">PID: ${currentproduct._id}</h6>
                <p class="card-text card-text-box">
                ${currentproduct?.description} </p>
                <div class="buy d-flex justify-content-between align-items-center">
                    <div class="price text-success">
                        <h5>$${currentproduct?.price}</h5>
                    </div>

                </div>
                <div class="buy d-flex gap-3 align-items-center mt-3 justify-content-center">
                    <button type="button" class="btn btn-outline-primary text-nowrap" onclick="handleCurrentViewMore(${currentproduct?._id})">View more</button>
                    <button type="button" id="cardEditBtn-${currentproduct?._id}" data-bs-toggle="modal" data-bs-target="#editCardModal" class="btn btn-outline-success" onclick="handleCurrentEdit(${currentproduct?._id})">Edit</button>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteCardModal" onclick="handleCurrentDeleteModal(${currentproduct?._id})">Delete</button>
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
    image = currentProduct[0].image;
}

let selectedCardID;
document.getElementById("deleteCardModalSubmit").addEventListener('click', () => {
    let currentProducts = productCards.filter((currCard) => currCard._id != selectedCardID)

    localStorage.setItem('productCards', JSON.stringify(currentProducts));
    productCards = JSON.parse(localStorage.getItem('productCards'))
    deleteWarning();
    addHTMLToDisplayArea(productCards)
})

function handleCurrentDeleteModal(currentproductID) {
    selectedCardID = currentproductID;
}

function handleCurrentViewMore(currentproductID) {
    window.location.href = `./src/pages/view.html?id=${currentproductID}`;
}

document.getElementById("sort-toggle-btn").addEventListener("click", () => {
    productAcend = !productAcend;
    if (!productAcend) {
        document.getElementById("sort-toggle-btn").classList.add('dropdown-toggle-up');
    }
    else {
        document.getElementById("sort-toggle-btn").classList.remove('dropdown-toggle-up');
    }

    if (!document.getElementById("sort-clear-btn").classList.contains('disabled')) {
        handleSortBy(sortLabel);
    }

})

document.getElementById("sort-clear-btn").addEventListener("click", () => {
    document.getElementById("sort-clear-btn").classList.add("disabled");
    productCards = JSON.parse(localStorage.getItem('productCards'))
    addHTMLToDisplayArea(productCards)
})
let sortLabel;
function handleSortBy(label) {
    sortLabel = label;
    document.getElementById("sort-clear-btn").classList.remove("disabled");
    productCards.sort((a, b) => {
        if (label === "productName") {
            let x = a.productName.toLowerCase();
            let y = b.productName.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        }
        else {
            return a[label] - b[label]
        }
    })
    if (!productAcend) {
        productCards.reverse();
    }
    addHTMLToDisplayArea(productCards)
}

function handleSearchBar() {
    let currentSearchValue = document.getElementById("searchbar").value;
    let regex = new RegExp(currentSearchValue, "gi")
    let filteredProductCards = productCards.map((currentCard) => {
        if (currentCard.productName.match(regex) || currentCard._id.match(regex)) {
            return currentCard;
        }
    })
    addHTMLToDisplayArea(filteredProductCards)
}

function debounce(call_handleSearchBar, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            call_handleSearchBar()
        }, ms)
    }
}

const processChangeInput = debounce(handleSearchBar, 1000)

function success() {
    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Added successfully',
        animation: false,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
};

function saveSuccess() {
    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Save successfully',
        animation: false,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
};

function deleteWarning() {
    Swal.fire({
        toast: true,
        icon: 'warning',
        title: 'Delete successfully',
        animation: false,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
};

addHTMLToDisplayArea(productCards)