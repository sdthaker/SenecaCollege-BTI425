/******************************************************************************
***
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Soham Thaker Student ID: 011-748-159 Date: 21-01-2022
*
*
******************************************************************************
**/ 

$(document).ready(function() {
		
	$('#error').hide()											//intially hidden so that we dont see the red danger alert
	$('#query').val("")											//manually clearing the value of the inout textbox when the page is reloaded

	let apiData = [], flagsData = []

	$.ajax({													//this request loads teh city data into the apiData array 
	   url:"city.json",
	   success: function(data){ 
		   for(var i of data) {
			   apiData.push(i)
		   }
		},
	   	error: function(){ alert('Error loading city information!')}
    });			

	$.ajax({	
		url:"flags.json",										//this request loads the flags data into the flagsData array 
	   	success: function(data){ 
		   for(var i of data) {
			   flagsData.push(i)
		   }
		},
	   	error: function(){ alert('Error loading flag information!')}
    });

	$('#form').submit(function(){						//if the user hits enter button on the form then run an api call
		apiCall()
		return false
	});
	
	$("#find").click(function() {						//when the search icon is pressed run an api call
		apiCall()
   	});

	function paginate(pData) {

		var itemsBody = $(".data");													//get reference to data class
        var numItems = pData.length;												//get the full length of all p's
        var perPage = 3;															//3 items per page 
                
		itemsBody.html(pData.slice(0,3));											//only show the first 3 (or first `per_page`) items initially.
        
        $(".pagination").pagination({												//now setup the pagination using the `.pagination` div callback.
            items: numItems,														//send length of the items to the pagination framework
            itemsOnPage: perPage,													//indicate how many items to show per page

            onPageClick: function(pageNumber) {										//this is the actual page changing functionality
                
                var showFrom = perPage * (pageNumber - 1);							// show and hide `p`s appropriately.
                var showTo = showFrom + perPage;									// show and hide `p`s appropriately.

                itemsBody.html(pData.slice(showFrom,showTo));						//show 3 items per page
            }
        });
	}

	function appendData(data) {

		let j = 1
		let pData = []

		for (let i = 0; i < data.cnt; i++) {					//loop through all the cities that was provided to us by the api call response

			//const sunrise = new Date(data.list[`${i}`].sys.sunrise * 1000).toLocaleString()		//get the correct date and time
			//const sunset = new Date(data.list[`${i}`].sys.sunset * 1000).toLocaleString()			//get the correct date and time

			const sunrise = moment(data.list[`${i}`].sys.sunrise * 1000).format("DD/MM/YY HH:mm:ss")			//get the computer time in hh:mm:ss format
			const sunset = moment(data.list[`${i}`].sys.sunset * 1000).format("DD/MM/YY HH:mm:ss")				//get the computer time in hh:mm:ss format

            let paraData = `<p id=${j++}>`            												//create a paragraph tag
            let weatherIcon = `<img src="http://openweathermap.org/img/wn/
								${ data.list[`${i}`].weather[0].icon}@2x.png" alt="Weather Icon" width="40">` 		//get weather icon      
								+ "  ";		
            
            let cityCountryData = "<span id=\"cc\">" +  data.list[`${i}`].name + ", " 					//get city and country data
			+ data.list[`${i}`].sys.country + "</span> &nbsp;"
            
            let flagFound = ""
            flagFound = flagsData.find((item) => {											//look for flag information from flagsData 
                return item.cca2 ===  data.list[`${i}`].sys.country
            })

			let flagImg = `<img src=${flagFound.flags.png} width=40em alt="Flag icon">`						//get flag image

            let weatherDesc = "&nbsp;&nbsp;<i><b>" + data.list[`${i}`].weather[0].description					//get weather description 
			let tempDesc = "</i></b><br> <i>Current temperature</i> is, " + "<span class=\"dot\">" 				//get temperature information
							+ data.list[`${i}`].main.temp + " ℃" + "</span>" + " from as <i>low</i> as " 		
							+ data.list[`${i}`].main.temp_min + " ℃ to as <i>high</i> as " 
							+ data.list[`${i}`].main.temp_max + " ℃, " 
							+ "<i>Feels like: </i>" + data.list[`${i}`].main.feels_like + " ℃, " 
			let windDesc = "<i>Wind: </i>" + data.list[`${i}`].wind.speed + " m/s., "						//get wind information
			let cloudDesc = "<i>Clouds: </i>" + data.list[`${i}`].clouds.all + "%, "						//get clound informaiton
			let humidityDesc = "<i>Humidity: </i>" + data.list[`${i}`].main.humidity + "%, "				//get humidity information
			let pressureDesc = "<i>Pressure: </i>" + data.list[`${i}`].main.pressure + " hPa,"				//get pressure information
			let sunsetSunriseDesc = "<i> Sunrise: </i>" + sunrise + " " 
								+ luxon.DateTime.local().toFormat('ZZZZ') 
								+ ", <i>Sunset:</i> " + sunset + " " 
								+ luxon.DateTime.local().toFormat('ZZZZ')		//get sunrise, sunset information
			let geoCoord = `<i>, Geo coords: </i> <span id="coords">[Lat: ${data.list[`${i}`].coord.lat}, Lon: ${data.list[`${i}`].coord.lon}]</span>` + "</p>" //get geo-coords

			paraData += weatherIcon + cityCountryData + flagImg + weatherDesc						//concatenate all information 
					 + tempDesc + windDesc + cloudDesc + humidityDesc + pressureDesc 
					 + sunsetSunriseDesc + geoCoord 			

			pData.push(paraData)													//push the data to global paraData array
		}
		paginate(pData)																//call paginate to paginate the web page

		$('#formStyle').css("margin-top","12.5%")									//bring the div a little further down dynamically
	}

	function apiCall() {
		$('.data').show()				//show the class contents if its hidden (hidden when an error occurs)
		$('.pagination').show()			//show the class contents if its hidden (hidden when an error occurs)
		$('.data').html("")				//empty the class contents for every click
		$('#error').html("")			//empty the error contents
		$('#error').hide()				//hide the error element whenever user searches for data

		let splittedQuery = validateInput()
		let id = getIds(splittedQuery)
		
		if(id !== "") {
			let url = "http://pro.openweathermap.org/data/2.5/group?id=" + id + "&appid=80908b400e7cd01f63c37d5fff1ab385&units=metric" 
	
			$.ajax({					//make an api call that responds with data if found and call display fn or show API call failed error
				url: url,
				success: function(data){ 
					appendData(data)
				},
				error: () => {	
					$('#formStyle').css("margin-top","25%")									//bring the div a little further down dynamically		
					$('.data').hide()
					$('.pagination').hide()
					$('#error').show()
					$('#error').html("Call to the API failed")	
				},
			})
		}
	}

	function validateInput() {

		let query = $('#query').val()		//get the user input from input form 

		let splittedQuery = _.split(query,',',2)											//split the query into 2 halves
		splittedQuery[1] === "" ? splittedQuery.pop() : null 								//if user didnt provide country data pop it off
		splittedQuery[0] = _.startCase(splittedQuery[0]);									//convert the first letter of city name into caps
		if (splittedQuery[1] && !splittedQuery[1].replace(/\s/g, '').length) {				//discard all spaces if there are spaces after comma
			splittedQuery.pop()
		}
		if(splittedQuery[0] == splittedQuery[0].toUpperCase()) {	//if user enters the city name as all caps then lowercase it and startcase it
			splittedQuery[0] = splittedQuery[0].toLowerCase()
			splittedQuery[0] = _.startCase(splittedQuery[0]);
		}
		if(splittedQuery.length > 1) {									//if user entered the country then uppercase it all
			splittedQuery[1] = _.upperCase(splittedQuery[1])
		}
		return splittedQuery
	}

	function getIds(splittedQuery) {
		let filteredArray = []
			filteredArray = apiData.filter((data) => {		//look for all the id(in apiData array) of the city based on the name and country code(if provided) 
				if(splittedQuery.length > 1) {
					return data.name === splittedQuery[0] && data.country === splittedQuery[1]
				}
				else{
					return data.name === splittedQuery[0]
				}
			})
			
			let id = ""
				
			if(filteredArray.length === 0) {					//if no ids(array is empty) found hide data, pagination, and show the error 
				$('#formStyle').css("margin-top","25%") 
				$('.data').hide()
				$('.pagination').hide()
				$('#error').show()
				$('#error').html("No data found")		
			}
			else {															//else data is found do the following
				for (let i = 0; i < filteredArray.length && i < 19; i++) {	//concatenate all the ids together to make an api call	
					if(i+1 == filteredArray.length || i == 18) {
						id += filteredArray[i].id 			
					}
					else{
						id += filteredArray[i].id + ","
					}
				}
			}
		return id
	}
});		