/******************************************************************************
***
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Soham Thaker Student ID: 011-748-159 Date: 21-01-2022
*
******************************************************************************
**/ 

$(document).ready(function() {
		
	$('#error').hide()											//intially hidden so that we dont see the red danger alert
	$('#query').val("")											//manually clearing the value of the inout textbox when the page is reloaded

	let flagsData = []

	$.ajax({													//this request loads teh city data into the apiData array 
	   url:"flags.json",
	   success: function(data){ 
		   for(var i of data) {
			   flagsData.push(i)
		   }
		},
	   	error: function(){ alert('Error loading flags information!')}
    });			

	$('#form').submit(function(){						//if the user hits enter button on the form then run an api call
		apiCall()
		return false
	});
	
	 $("#find").click(function() {						//when the search icon is pressed run an api call
		apiCall()
   	});

	function apiCall() {
		$('.data').show()				//show the class contents if its hidden (hidden when an error occurs)
		$('.pagination').show()			//show the class contents if its hidden (hidden when an error occurs)
		$('.data').html("")				//empty the class contents for every click
		$('#error').html("")			//empty the error contents
		$('#error').hide()				//hide the error element whenever user searches for data

		let query = $('#query').val()		//get the user input from input form 
		
		let url = "https://pro.openweathermap.org/data/2.5/find?q=" + query 
				+  "&appid=80908b400e7cd01f63c37d5fff1ab385&units=metric&mode=xml" 
	
		$.ajax({					//make an api call that responds with data if found and call display fn or show API call failed error
			url: url,
			dataType: "xml",
			async: true,
			success: appendData,
			error: () => {	
				$('#formStyle').css("margin-top","25%")									//bring the div a little further down dynamically		
				$('.data').hide()
				$('.pagination').hide()
				$('#error').show()
				$('#error').html("Call to the API failed")	
			},
		})
	}

	function appendData(data) {

		let pData = [], j = 0;

		if($(data).find('cities').find('count').text() == 0) {
			$('#formStyle').css("margin-top","25%")									//bring the div a little further down dynamically		
				$('.data').hide()
				$('.pagination').hide()
				$('#error').show()
				$('#error').html("No data found!")
		}
		else{
			$(data).find('item').each(function () {		//loop through all the cities that was provided to us by the api call response

				let paraData = `<p id=${j++}>` 
				
				let sunrise = moment($(this).find('city').find('sun').attr('rise') + ".000Z").format('DD/MM/YY HH:mm:ss')			//get the computer time in hh:mm:ss format
				let sunset = moment($(this).find('city').find('sun').attr('set') + ".000Z").format('DD/MM/YY HH:mm:ss')				//get the computer time in hh:mm:ss format

				let weatherIcon = `<img src="http://openweathermap.org/img/wn/${ 
									$(this).find('weather').attr('icon')
									}@2x.png" alt="Weather Icon" width="40">` + "  ";		//get weather icon      
									
				let cityCountryData = "<span id=\"cc\">" +  $(this).find('city').attr('name') + ", " 		//get city and country data
										+ $(this).find('city').find('country').text() + "</span> &nbsp;"

				let flagFound = ""
				flagFound = flagsData.find((item) => {											//look for flag information from flagsData 
					return item.cca2 ===  $(this).find('city').find('country').text()
				})

				let flagImg = `<img src=${flagFound.flags.png} width=40em alt="Flag icon">`							//get flag image

				let weatherDesc =  "&nbsp;&nbsp;<i><b>" + $(this).find('weather').attr('value')						//get weather description 
				let tempDesc = "</i></b><br> <i>Current temperature</i> is, " + "<span class=\"dot\">" 				//get temperature information
									+ $(this).find('temperature').attr('value') + " ℃" + "</span>" 
									+ " from as <i>low</i> as "	+ $(this).find('temperature').attr('min') 
									+ " ℃ to as <i>high</i> as " + $(this).find('temperature').attr('max') + " ℃, " 
									+ "<i>Feels like: </i>" + $(this).find('feels_like').attr('value') + " ℃, " 

				let windDesc = "<i>Wind: </i>" +  $(this).find('wind').find('speed').attr('value') + " m/s., "			//get wind information
				let cloudDesc = "<i>Clouds: </i>" +  $(this).find('clouds').attr('value') + "%, "						//get clound informaiton
				let humidityDesc = "<i>Humidity: </i>" + $(this).find('humidity').attr('value') + "%, "					//get humidity information
				let pressureDesc = "<i>Pressure: </i>" + $(this).find('pressure').attr('value') + " hPa,"				//get pressure information
				let sunsetSunriseDesc = "<i> Sunrise: </i>" + sunrise + " " + luxon.DateTime.local().toFormat('ZZZZ') 
										+ ", <i>Sunset:</i> " + sunset + " " + luxon.DateTime.local().toFormat('ZZZZ')	//get sunrise, sunset information
				let geoCoord = `<i>, Geo coords: </i> <span id="coords">[Lat: ${$(this).find('city').find('coord').attr('lat')}, Lon: ${$(this).find('city').find('coord').attr('lon')}]</span>` + "</p>" 													//get geo-coords
		
				paraData += weatherIcon + cityCountryData + flagImg + weatherDesc			//concatenate all information 
							+ tempDesc + windDesc + cloudDesc + humidityDesc + pressureDesc 
							+ sunsetSunriseDesc + geoCoord 			

				pData.push(paraData)	
			})
		}
            
        paginate(pData)																//call paginate to paginate the web page

		$('#formStyle').css("margin-top","12.5%")									//bring the div a little further down dynamically
	}

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
});		