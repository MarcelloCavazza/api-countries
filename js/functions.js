function insertIntoFavList(element) {
    let elementClone = element.cloneNode(true);
    elementClone.children[0].childNodes[1].innerHTML = "x"
    setDisplayNone(element);
    let favList = document.querySelector(".country-list-fav #tabFavorites")
    favList.appendChild(elementClone)

    manageFavListIds(element.id)
}

function setDisplayNone(element) {
    element.style.display = "none";
}

function setToDisplay(element) {
    element.style.display = "";
}

function goBack(element) {
    manageFavListIds(element.id, false)

    let idFromRemovedElement = element.id
    element.remove()
    let hiddenElement = document.querySelector("#" + idFromRemovedElement);
    hiddenElement.children[0].childNodes[1].className = "addFav";
    hiddenElement.style.display = "flex";
}

function manageFavListIds(paisId, add = true){
    let idTreated = paisId.replace("pais","")
    if(add){
        favCountry.push(idTreated)
    }else{
        removeFromFavArray(idTreated)
    }
}

function removeFromFavArray(paisId){
    let countryPos = favCountry.indexOf(paisId)
    if(countryPos > -1){
        favCountry.splice(paisId, 1)
    }
}

function getPrincipalParentElement(element) {
    return element.composedPath()[2]
}

function treatPopulation(populationquantity) {
    let parts = populationquantity.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return parts.join(",");
}

function alterClass(element) {
    let oldClass = element.composedPath()[0].className
    if (oldClass == "addFav") {
        element.composedPath()[0].className = "removeFav"
    } else {
        element.composedPath()[0].className = "addFav"
    }
}

function lessWorldPopulationQttDefault(qtt) {
    return untreatedWorldPopulation -= qtt
}

function moreWorldPopulationQttDefault(qtt) {
    return untreatedWorldPopulation += qtt
}

function lessFavWorldPopulationQtt(qtt) {
    return untreatedFavWorldPopulation -= qtt
}

function moreFavWorldPopulationQtt(qtt) {
    return untreatedFavWorldPopulation += qtt
}


function createDefaultCountryTemplate(nome, population, flag) {
    let tabela = document.querySelector("#tabCountries");
    tabela.innerHTML += `
        <div class="paisList" id="pais${qtdPais}">
            <section>
                <a href="#" class="addFav" id="${qtdPais}"/>+</a>
            </section>
            <section>
                <a href="#" class="goToCountryDetails">${nome}</a>
            </section>
            &nbsp;
            <section>
                ${population}
            </section>
            <section>
                <img style="width:500px;"; src="${flag}">
            </section>
        </div>`;
    qtdPais++
}

function addMoreFavCountryQttDisplay(element) {
    if (element.textContent == "") {
        element.innerHTML = 1
    } else {
        let displayConverted = parseInt(element.textContent)
        element.innerHTML = displayConverted + 1
    }
}

function removeLessFavCountryQttDisplay(element) {
    let displayConverted = parseInt(element.textContent)
    element.innerHTML = displayConverted - 1
}


function addMoreCountCountryQttDisplayDefault(element) {
    let displayConverted = parseInt(element.textContent)
    paisQtdDisplayDefault = displayConverted + 1
    element.innerHTML = paisQtdDisplayDefault
}

function removeLessCountCountryQttDisplayDefault(element) {
    let displayConverted = parseInt(element.textContent)
    paisQtdDisplayDefault = displayConverted - 1
    element.innerHTML = paisQtdDisplayDefault
}

function makeWholeArrayOfCoutriesSearcheable(arrayOfCountries) {
    arrayOfCountries.forEach(country => {
        country.canBeSearched = true;
    });
}

function makeSpecificCountryUnsearcheable(countryIndex) {
    apiData[countryIndex].canBeSearched = false;
}
function makeSpecificCountrySearcheable(countryIndex) {
    apiData[countryIndex].canBeSearched = true;
}

function searchByContinent(clickedContinent) {
    paisQtdDisplayDefaultElement.innerHTML = 0;
    popTotalDisplay.innerHTML = 0

    let regionToSearch = "";
    switch (clickedContinent) {
        case "africaContinent":
            regionToSearch = "Africa";
            break;
        case "americaContinent":
            regionToSearch = "Americas";
            break;
        case "asiaContinent":
            regionToSearch = "Asia";
            break;
        case "europeContinent":
            regionToSearch = "Europe";
            break;
        case "oceaniaContinent":
            regionToSearch = "Oceania";
            break;
        default:
            alert("filtro quebrou!")
            location.reload();
            break;
    }
    let regionValues = getRegionValues(regionToSearch)
    for (i = 0; i < apiData.length; i++) {
        let element = document.querySelector(`#pais${i}`)
        let canTheElementBeSearched = apiData[i].canBeSearched;
        let region = apiData[i].region
        if (canTheElementBeSearched && region == regionToSearch) {
            element.style.display = "";
        } else {
            element.style.display = "none";
        }
    }

    paisQtdDisplayDefaultElement.innerHTML = regionValues.qttContriesFrom
    popTotalDisplay.innerHTML = treatPopulation(regionValues.population)

}

function getRegionValues(regionSelected) {
    let data = {
        population: 0,
        qttContriesFrom: 0
    };
    for (i = 0; i < apiData.length; i++) {
        if (apiData[i].region == regionSelected) {
            data.population += apiData[i].population
            data.qttContriesFrom += 1
        }
    }
    return data
}

function showDetailsFromContry(id) {
    displayToInputData.currennciesDisplay.innerHTML = ""
    listOfContries = document.querySelector("#countryList")
    setDisplayNone(listOfContries);
    clickedCountryDetails = document.querySelector("#countryDetail")
    let displayToInputData = instanceOfCountryDetails()
    insertIntoDetailsContryLayout(id, displayToInputData);
    setToDisplay(clickedCountryDetails)
}


function instanceOfCountryDetails() {
    let countryProps = {}
    countryProps.flagDisplay = document.querySelector("#flag")
    countryProps.nameDisplay = document.querySelector("#name")
    countryProps.nativeNameDisplay = document.querySelector("#nativeName")
    countryProps.capitalDisplay = document.querySelector("#capital")
    countryProps.populationDisplay = document.querySelector("#population")
    countryProps.regionDisplay = document.querySelector("#region")
    countryProps.timezoneDisplay = document.querySelector("#timezone")
    countryProps.currennciesDisplay = document.querySelector("#currenncies")
    return countryProps;
}

function insertIntoDetailsContryLayout(id, displayToInputData) {
    displayToInputData.flagDisplay.innerHTML = `<img id="flagDetailed" src="${apiData[id].flag}" alt="contryImg"/>`
    displayToInputData.nameDisplay.innerHTML = apiData[id].translations.br
    displayToInputData.nativeNameDisplay.innerHTML = apiData[id].nativeName
    displayToInputData.capitalDisplay.innerHTML = apiData[id].capital
    displayToInputData.populationDisplay.innerHTML = apiData[id].population
    displayToInputData.regionDisplay.innerHTML = apiData[id].region
    displayToInputData.timezoneDisplay.innerHTML = apiData[id].timezones
    if(apiData[id].currencies){    
        let coins = apiData[id].currencies.length
        for(i = 0; i < coins; i++){   
            displayToInputData.currennciesDisplay.innerHTML += "Nome: "+apiData[id].currencies[i].name +
                                                            ";&nbsp; Símbolo: " + apiData[id].currencies[i].symbol + "&nbsp;;"
            if(coins > 1){
                displayToInputData.currennciesDisplay.innerHTML += "<br>";
            }
        }
    }else{
        displayToInputData.currennciesDisplay.innerHTML = "Esse país não possui uma moeda local!";
    }
}