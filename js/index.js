const loadPhone = async (searchText = 13, showAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;


    displayPhones(phones, showAll)

}

const displayPhones = (phones, showAll) => {
    // step 1: get container element
    const phoneContainer = document.getElementById("phone-container");

  
    // clear phone container card before adding new cards
    phoneContainer.textContent= '';

    // if phones result more than 12 ,, than we added show all button
    const showButton = document.getElementById('show-all-phone');
    if(phones.length > 12 && !showAll){
      showButton.classList.remove('hidden')
    }
    else{
      showButton.classList.add("hidden")
    }
    

    // display only first 12 phones 
    // showAll pera meter er value true hole 12 ta phone noi borong all products dekhabe.
    if(!showAll){
      phones = phones.slice(0, 12);
    }
 
   
    phones.forEach( phone => {
      console.log(phone)

        // step 2: ceate a div.
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card mx-5 bg-base-100 shadow-xl`;


        // step 3: set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handeleShowDetails('${phone.slug}')"  class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;

        // step 4: append now container
        phoneContainer.appendChild(phoneCard)

    });

    // data loading hower por loading spiner off kore dibo
    toggleLoadingSpiner(false)
}

// handle search button
const handleSearch = (showAll) => {

  // call of loading spiner
  toggleLoadingSpiner(true)

    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText)

    loadPhone(searchText, showAll);
}


// loading-spinner hidden remove function 
const toggleLoadingSpiner = (isLoading) =>{
  const loadingSpiner = document.getElementById("loading-spinner");
  if(isLoading){
   
    loadingSpiner.classList.remove('hidden')
  }
  else{
    loadingSpiner.classList.add('hidden')
  }
}


// handle show all 
const handleShowAll = () => {
  handleSearch(true)
}


// every phone er show add button a click korle oi phone er dtails er moddal open korbo
const handeleShowDetails =async (id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data;

  shoPhoneDetails(phone);
}

const shoPhoneDetails = (phone) =>{
  console.log(phone);

  const phoneNameModal = document.getElementById("show-detail-phone-name");
  phoneNameModal.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img class="mx-auto" src="${phone.image}" />
    <p> <span> Storage: </span>  ${phone?.mainFeatures?.storage}   </p>
    <p> <span> GPS: </span>  ${phone?.others?.GPS}   </p>
  `

  // show the modal
  my_modal_5.showModal()

}



loadPhone()