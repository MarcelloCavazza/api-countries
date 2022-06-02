window.addEventListener('load', () => {
    doFetchAsync();
});

async function doFetchAsync() {
    const res = await fetch('https://restcountries.com/v2/all');
    apiData = await res.json();
    displayBefore.style.display = "none"
    displayAfter.style.display = ""

    makeWholeArrayOfCoutriesSearcheable(apiData)

    paisQtdDisplayDefault = apiData.length;
    for (i = 0; i < paisQtdDisplayDefault; i++) {
        createDefaultCountryTemplate(apiData[i].translations.br, treatPopulation(apiData[i].population, false), apiData[i].flag)
        populacaoTotalMundial += apiData[i].population
    }

    paisQtdDisplayDefaultElement.innerHTML = paisQtdDisplayDefault

    untreatedWorldPopulation = populacaoTotalMundial
    popTotalDisplay.innerHTML = treatPopulation(populacaoTotalMundial)

    document.addEventListener("click", (element) => {

        let clickedClassElement = element.composedPath()[0].className;

        if (clickedClassElement == "addFav" || clickedClassElement == "removeFav") {

            let clickedCountry = element.composedPath()[0].id;
            let wholeCountryContent = element.composedPath()[2];
            let clickedElementPopulation = apiData[clickedCountry].population;

            if (clickedClassElement == "addFav") {
                popTotalDisplay.innerHTML = treatPopulation(untreatedFavWorldPopulation)
                paisQtdDisplayDefaultElement.innerHTML = paisQtdDisplayDefault
                btnClearSearchField.click()

                makeSpecificCountryUnsearcheable(clickedCountry)

                let lessCountryCount = lessWorldPopulationQttDefault(clickedElementPopulation);

                popTotalDisplay.innerHTML = treatPopulation(lessCountryCount);
                removeLessCountCountryQttDisplayDefault(paisQtdDisplayDefaultElement);

                alterClass(element)
                insertIntoFavList(wholeCountryContent);

                let morePopulationFav = moreFavWorldPopulationQtt(clickedElementPopulation);
                paisFavQtdDisplayDefaultElement.innerHTML = treatPopulation(morePopulationFav);
                addMoreFavCountryQttDisplay(popFavTotalDisplay);

            } else if (clickedClassElement == "removeFav") {
                makeSpecificCountrySearcheable(clickedCountry);
                goBack(wholeCountryContent);

                let minusPopFav = lessFavWorldPopulationQtt(clickedElementPopulation);
                paisFavQtdDisplayDefaultElement.innerHTML = treatPopulation(minusPopFav);
                removeLessFavCountryQttDisplay(popFavTotalDisplay);

                let morePopDefault = moreWorldPopulationQttDefault(clickedElementPopulation);
                popTotalDisplay.innerHTML = treatPopulation(morePopDefault);
                addMoreCountCountryQttDisplayDefault(paisQtdDisplayDefaultElement);
            }
        } else if (clickedClassElement.includes('Continent')) {
            let continentClicked = element.composedPath()[0].id
            continentIsChecked = element.composedPath()[0]
            searchByContinent(continentClicked);
        } else if (clickedClassElement == "goToCountryDetails") {
            let elementIdNotTreated = element.composedPath()[2].id
            let elementIdTreated = elementIdNotTreated.replace("pais", "")
            showDetailsFromContry(elementIdTreated)
        } else if (clickedClassElement.includes('comeBackToList')) {
            setDisplayNone(clickedCountryDetails);
            setToDisplay(listOfContries);
        } else if (clickedClassElement.includes('btnSendEmail')) {
            let formToSentEmail = document.querySelector('#formSendEmail')
            setToDisplay(formToSentEmail);
        } else if (clickedClassElement.includes('btnCloseforms')) {
            element.preventDefault();
            let formToSentEmail = document.querySelector('#formSendEmail')
            setDisplayNone(formToSentEmail);
        }
    })


    searchField.addEventListener("keyup", () => {
        filter = searchField.value.toUpperCase();

        tempQttCountries = 0
        tempPopulation = 0

        let btnRadios = Array.from(document.querySelectorAll(".Continents"))
        btnRadios.forEach((element) => {
            element.checked == true ? element.checked = false : ''
        })

        for (i = 0; i < apiData.length; i++) {
            let txtValue = apiData[i].translations.br;
            let population = apiData[i].population;
            let canTheElementBeSearched = apiData[i].canBeSearched;
            let element = document.querySelector(`#pais${i}`)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                if (canTheElementBeSearched) {
                    element.style.display = "";
                    tempQttCountries++
                    tempPopulation += population
                }
            } else {
                if (canTheElementBeSearched) {
                    element.style.display = "none";
                }
            }
        }

        paisQtdDisplayDefaultElement.innerHTML = tempQttCountries
        popTotalDisplay.innerHTML = treatPopulation(tempPopulation)
    })

    btnClearSearchField.addEventListener("click", () => {
        searchField.value = ""
        continentIsChecked.checked = false
        let populationCount = 0;
        for (i = 0; i < apiData.length; i++) {
            let element = document.querySelector(`#pais${i}`)
            let canTheElementBeSearched = apiData[i].canBeSearched;
            if (canTheElementBeSearched) {
                element.style.display = "";
                populationCount += apiData[i].population
            }
        }
        paisQtdDisplayDefaultElement.innerHTML = paisQtdDisplayDefault
        popTotalDisplay.innerHTML = treatPopulation(populationCount)
    })

    emailInput.addEventListener("keyup", () => {
        let wroteEmail = emailInput.value;
        let emailErrorMsg = document.querySelector('#errorEmailMsg');
        btnEmailForm = document.querySelector('#btnSendEmail');
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.exec(wroteEmail))) {
            if (wroteEmail != "") {
                btnEmailForm.disabled = true
                setToDisplay(emailErrorMsg)
            } else {
                setDisplayNone(emailErrorMsg)
                btnEmailForm.disabled = false
            }
        } else {
            setDisplayNone(emailErrorMsg)
            btnEmailForm.disabled = false
        }
    })

    formElementToSendEmail.addEventListener("submit", (e) => {
        e.preventDefault()
        emailInput.value
        let content = createEmailContent(favCountry, nameInput.value)
        sendEmail(content)
    })
}
