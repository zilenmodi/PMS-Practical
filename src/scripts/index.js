// Set initial value of productAcend to true
let productAcend = true;

// Load productCards from localStorage or create empty array
let productCards = JSON.parse(localStorage.getItem('productCards')) || [];

// Declare an empty string to hold the image data
let image = "";

// Add event listener for when a new product image is selected
document.getElementById("createNewModalPImg").addEventListener('change', (event) => {
    // Set the image variable to the first file in the list of selected files
    image = event.target.files[0];
    // Create a new FileReader object
    const reader = new FileReader();
    // Read the selected image file as a data URL
    reader.readAsDataURL(image);
    // Add an event listener for when the data URL has finished loading
    reader.addEventListener('load', () => {
        // Set the image variable to the loaded data URL
        image = reader.result
    });
});

// Add event listener for when an existing product image is changed
document.getElementById("editCardModalPImg").addEventListener('change', (event) => {
    // Set the image variable to the first file in the list of selected files
    image = event.target.files[0];
    // Create a new FileReader object
    const reader = new FileReader();
    // Read the selected image file as a data URL
    reader.readAsDataURL(image);
    // Add an event listener for when the data URL has finished loading
    reader.addEventListener('load', () => {
        // Set the image variable to the loaded data URL
        image = reader.result
    });
});

// Define a function to generate a random integer within a given range
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Add event listener for when the "Create New" button is clicked
document.getElementById("createNewModalBtn").addEventListener("click", () => {
    // Generate a new unique ID for the product
    let uid = randomIntFromInterval(10000000000, 99999999999)
    // Set the value of the product ID input field to the new UID
    document.getElementById("createNewModalPID").value = uid;
});

// Select the "create new product" form element from the DOM
let createNewProductForm = document.getElementById("createNewProductForm");

// Add a submit event listener to the form
createNewProductForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values of the input fields from the form
    let _id = document.getElementById("createNewModalPID").value;
    let productName = document.getElementById("createNewModalPName").value;
    let price = document.getElementById("createNewModalPPrice").value;
    let description = document.getElementById("createNewModalPDes").value;

    // Check if the required input fields are not empty
    if (productName.replace(/^\s+|\s+$/gm, '').length == 0 || description.replace(/^\s+|\s+$/gm, '').length == 0) {
        alert("fill correctly");
        return;
    }

    // Create a new product object with the input field values
    let newProduct = {
        _id, productName, image, price, description
    }

    // Hide the "create new product" modal
    $("#createNewModal").modal('hide');

    // Get the existing products from the local storage or an empty array
    productCards = JSON.parse(localStorage.getItem('productCards')) || [];

    // Add the new product to the products array
    productCards.push(newProduct)

    // Save the updated products array to the local storage
    localStorage.setItem('productCards', JSON.stringify(productCards));

    // Get the products array from the local storage
    productCards = JSON.parse(localStorage.getItem('productCards'))

    // Reset the input fields
    image = ""
    let uid = randomIntFromInterval(10000000000, 99999999999)
    document.getElementById("createNewModalPID").value = uid;
    console.log(uid);
    document.getElementById("createNewModalPID").value = "";
    document.getElementById("createNewModalPName").value = "";
    document.getElementById("createNewModalPPrice").value = "";
    document.getElementById("createNewModalPDes").value = "";
    document.getElementById("createNewModalPImg").value = "";

    // Show a success message
    success()

    // Update the product cards display
    addHTMLToDisplayArea(productCards)
});

// Get the form element for editing a product
let editProductForm = document.getElementById("editProductCardForm");

// Add an event listener for when the form is submitted
editProductForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values of the inputs in the form
    let _id = document.getElementById("editCardModalPID").value;
    let productName = document.getElementById("editCardModalPName").value;
    let price = document.getElementById("editCardModalPPrice").value;
    let description = document.getElementById("editCardModalPDes").value;

    // Check if the required input fields have been filled out
    if (productName.replace(/^\s+|\s+$/gm, '').length == 0 || description.replace(/^\s+|\s+$/gm, '').length == 0) {
        alert("fill correctly");
        return;
    }

    // Create an object for the edited product
    let editProduct = {
        _id, productName, image, price, description
    }

    // Get the list of product cards from local storage
    productCards = JSON.parse(localStorage.getItem('productCards'));

    // Map through the list of product cards and replace the card with the edited card
    let newProductCards = productCards.map((currPCard) => {
        if (currPCard._id == editProduct._id) {
            return editProduct;
        }
        else {
            return currPCard;
        }
    })

    // Save the updated list of product cards to local storage
    localStorage.setItem('productCards', JSON.stringify(newProductCards));
    productCards = JSON.parse(localStorage.getItem('productCards'))
    image = ""
    saveSuccess()

    // Add the updated list of product cards to the display area
    addHTMLToDisplayArea(productCards)
});


// This function takes an array of product objects as an argument and adds HTML to a designated display area on the webpage.
function addHTMLToDisplayArea(products) {
    let contentArea = document.getElementById("allCardsDisplay");

    // If the array of products is empty, display a message indicating that there's nothing to show.
    if (productCards.length === 0) {
        contentArea.innerHTML = "<h4>Nothing to show!</h4>";
        return;
    }

    // If there are products to display, clear the content area and iterate over the array of products to generate HTML for each product card.
    contentArea.innerHTML = "";
    products.map((currentproduct) => {
        // If the current product is undefined, skip it and move on to the next one.
        if (currentproduct === undefined) {
            return;
        }
        // Generate HTML for a product card and add it to the content area.
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

// This function takes in a product ID as a parameter and finds the product with the corresponding ID in the productCards array. 
// It then populates the edit card modal fields with the details of the product.
function handleCurrentEdit(currentproductID) {
    let currentProduct = productCards.filter((currCard) => currCard._id == currentproductID)
    document.getElementById("editCardModalPID").value = currentproductID;
    document.getElementById("editCardModalPName").value = currentProduct[0].productName;
    document.getElementById("editCardModalPPrice").value = currentProduct[0].price;
    document.getElementById("editCardModalPDes").value = currentProduct[0].description;
    document.getElementById("editCardModalPImg").value = "";
    image = currentProduct[0].image;
}

// This event listener is triggered when the user confirms the delete action in the delete card modal. 
// It removes the selected product from the productCards array and updates it in localStorage. 
// It then calls the deleteWarning() function to display a success message and updates the display area with the remaining products.
let selectedCardID;
document.getElementById("deleteCardModalSubmit").addEventListener('click', () => {
    let currentProducts = productCards.filter((currCard) => currCard._id != selectedCardID)
    localStorage.setItem('productCards', JSON.stringify(currentProducts));
    productCards = JSON.parse(localStorage.getItem('productCards'))
    deleteWarning();
    addHTMLToDisplayArea(productCards)
})

// This function takes in a product ID as a parameter and sets it to the selectedCardID variable, which is later used to remove the corresponding product from the productCards array.
function handleCurrentDeleteModal(currentproductID) {
    selectedCardID = currentproductID;
}

// This function takes in a product ID as a parameter and redirects the user to the view product page with the corresponding product ID in the URL.
function handleCurrentViewMore(currentproductID) {
    window.location.href = `./src/pages/view.html?id=${currentproductID}`;
}

// This function adds an event listener to the sort toggle button
// which toggles the ascending/descending order of the product list 
// and applies sorting to the list based on a label.
document.getElementById("sort-toggle-btn").addEventListener("click", () => {
    productAcend = !productAcend; // toggle productAcend variable
    if (!productAcend) {
        document.getElementById("sort-toggle-btn").classList.add('dropdown-toggle-up'); // add 'dropdown-toggle-up' class to sort-toggle-btn element
    }
    else {
        document.getElementById("sort-toggle-btn").classList.remove('dropdown-toggle-up'); // remove 'dropdown-toggle-up' class from sort-toggle-btn element
    }

    // If the sort-clear-btn element doesn't have the 'disabled' class, 
    // call handleSortBy() function with the current sort label
    if (!document.getElementById("sort-clear-btn").classList.contains('disabled')) {
        handleSortBy(sortLabel);
    }
})

// This function adds an event listener to the sort-clear-btn element
// which clears the sorting applied to the product list and displays
// the original list obtained from the local storage.
document.getElementById("sort-clear-btn").addEventListener("click", () => {
    document.getElementById("sort-clear-btn").classList.add("disabled"); // add 'disabled' class to sort-clear-btn element
    productCards = JSON.parse(localStorage.getItem('productCards')) // get original product list from local storage
    addHTMLToDisplayArea(productCards) // display original product list
})

let sortLabel; // declare sortLabel variable

// This function handles sorting of the product list based on a label
function handleSortBy(label) {
    sortLabel = label; // set the global sortLabel variable to the given label
    document.getElementById("sort-clear-btn").classList.remove("disabled"); // remove 'disabled' class from sort-clear-btn element
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
    addHTMLToDisplayArea(productCards) // display sorted product list
}

// This function handles the search bar input
function handleSearchBar() {
    let currentSearchValue = document.getElementById("searchbar").value; // get the current search value from the search bar
    let regex = new RegExp(currentSearchValue, "gi") // create a case-insensitive regular expression from the search value
    let filteredProductCards = productCards.map((currentCard) => {
        if (currentCard.productName.match(regex) || currentCard._id.match(regex)) { // check if the product name or ID matches the search value
            return currentCard;
        }
    })
    addHTMLToDisplayArea(filteredProductCards) // display filtered product list
}

// This function returns a debounced version of the given function
// which can be used to limit the rate at which a function is called.
function debounce(call_handleSearchBar, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            call_handleSearchBar()
        }, ms)
    }
}
const processChangeInput = debounce(handleSearchBar, 1000) // creates a debounced function to handle search bar input changes with a delay of 1 second

function success() { // function to display a success message
    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Added successfully',
        animation: false,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => { // add event listeners to pause/resume timer on hover
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
};

function saveSuccess() { // function to display a success message for saving data
    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Save successfully',
        animation: false,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => { // add event listeners to pause/resume timer on hover
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
};

function deleteWarning() { // function to display a warning message for deletion
    Swal.fire({
        toast: true,
        icon: 'warning',
        title: 'Delete successfully',
        animation: false,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => { // add event listeners to pause/resume timer on hover
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
};

addHTMLToDisplayArea(productCards) // function call to display product cards in the HTML display area