const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};

const displayPhone = (phones, dataLimit) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  //   display 20 phones only -
  const viewAll = document.getElementById("view-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    viewAll.classList.remove("d-none");
  } else {
    viewAll.classList.add("d-none");
  }
  //   phones = phones.slice(0, 20);

  //   display no phone founds
  const noPhonesFound = document.getElementById("display-phones");
  if (phones.length === 0) {
    noPhonesFound.classList.remove("d-none");
  } else {
    noPhonesFound.classList.add("d-none");
  }

  // display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
  
  
                    <div class="card">
                    <div class="py-3 mx-auto text-center">
                        <img class="img-responsive w-50 mx-auto" src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Brand: ${phone.brand}</h5>
                            <h4 class="card-title">Name: ${phone.phone_name}</h4>
                            <button onclick="viewMoreDetails('${phone.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">View Detail</button>
                        </div>
                    </div>
                    </div>
  
  
  `;
    phoneContainer.appendChild(phoneDiv);
  });
  //   stop sippner
  toggleSpinner(false);
};

// common function  for input filed

const searchProcess = (dataLimit) => {
  toggleSpinner(true);
  const searField = document.getElementById("search-filed");
  const searchTextString = searField.value;
  // searField.value = "";
  loadPhone(searchTextString, dataLimit);
};

document.getElementById("search-phone").addEventListener("click", function () {
  // start spinner
  searchProcess(10);
});

// input search filed enter key handler
document.getElementById("search-filed").addEventListener("keypress", function (e) {
    // console.log(e.key);
    if (e.key === "Enter") {
      // code for enter
      searchProcess(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSpinner = document.getElementById("loader");
  if (isLoading) {
    loaderSpinner.classList.remove("d-none");
  } else {
    loaderSpinner.classList.add("d-none");
  }
};

document.getElementById("btn-view-all").addEventListener("click", function () {
  searchProcess();
});

const viewMoreDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = phone => {
  // console.log(phone)
  const modalTitle= document.getElementById('exampleModalLabel')
  modalTitle.innerText = phone.name;
  const phoneModal = document.getElementById('phone-modal') 
  phoneModal.innerHTML =`
  <img class="img-fluid text-center" src="${phone.image}" class="card-img-top" alt="...">
  <p class="font-bold">Main Features: </p>
  <p>ChipSet: ${phone.mainFeatures.chipSet}</p>
  <p>Display size: ${phone.mainFeatures.displaySize},</p>
  <p>Memory: ${phone.mainFeatures.memory}</p>
  <p>Release Date: ${phone.releaseDate ? phone.releaseDate : "No Release Date Found"}</p>
  <p>Sensors: ${phone.mainFeatures.sensors}</p>
  <p>Others: Bluetooth: ${phone.others ? phone.others.Bluetooth : "No Bluetooth"}</p>

  
  
  
  `

}
loadPhone('huawei')