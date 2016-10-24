var globalMap;
var globalMarkers = [];

$(function() {

var MapFcns = {
    loadSiteList: function () {
        var airportList = $('#airport-list');
            airportList.html('');
            airportList.append('<option value=""></option>');
			
		sites.sort(function (a,b) {
			return a.Code == b.Code ? 0 : a.Code < b.Code ? -1 : 1
		});
		
        for (var i in sites) {
            var newOption = $('<option value="' + sites[i].Code + '">' + sites[i].Code + '</option>');
            airportList.append(newOption);
        }
    },
	
	clearGlobalMarkers: function() {	
		for (var i = 0; i < globalMarkers.length; i++) {
          globalMarkers[i].setMap(null);
        }
	},
    
    siteListChange: function() {
        var ctl = $(this),
            airportCode = ctl.val();
			
			MapFcns.clearGlobalMarkers();
			globalMarkers = [];
			
            if(airportCode) {
                var currAirport = _.findWhere(sites, {Code: airportCode});
                $('#setting-code').text(currAirport.Code);
                $('#setting-city').text(currAirport.City);
				$('#setting-state').text(currAirport.State);
				$('#setting-value #setting-name').text(currAirport.FullSiteName);
				$('#setting-lat').text(currAirport.Latitude);
				$('#setting-long').text(currAirport.Longitude);
				
				
				var airportLatLng = new google.maps.LatLng(currAirport.Latitude, currAirport.Longitude);
				globalMap.setCenter(airportLatLng);
                
				
                var marker = new google.maps.Marker({
                    position: airportLatLng,
                    map: globalMap,
                    title: currAirport.Code,
					html: 
							'<div class="markerPop">' +
							'<h3>' + currAirport.FullSiteName + '</h3>' +
							'<p> Code: ' + currAirport.Code + '</p>' +
							'<p> Location: ' + currAirport.City + ', ' + currAirport.State + '</p>' +
							'</div>'
							
                });
				
				globalMarkers.push(marker);
				
					
				//add listener to populate airport info in popup window when click event on google marker
				google.maps.event.addListener(marker, 'click', function() {
					var infowindow = new google.maps.InfoWindow({
						content: this.html
					});
					
					infowindow.open(globalMap, this);
				} );
			
				
				//var bounds = new google.maps.LatLngBounds();
				//for (var i = 0, LtLgLen = globalMarkers.length; i < LtLgLen; i++) {
				//	bounds.extend (globalMarkers[i].position);
				//}
				//globalMap.fitBounds (bounds);
            }
			else {
				$('#setting-code').text('');
                $('#setting-city').text('');
				$('#setting-state').text('');
				$('#setting-value #setting-name').text('');
				$('#setting-lat').text('');
				$('#setting-long').text('');
			}
    }
}


MapFcns.loadSiteList();
$('#airport-list').change(MapFcns.siteListChange);
$('#exercise-toggle').click(function() {
    var  toggleCtl = $(this),
         toggleVal = toggleCtl.text();
    if (toggleVal == '-') {
        toggleCtl.text('+');
        $('#exercise-instructions').hide();
    } else {
        toggleCtl.text('-');
        $('#exercise-instructions').show();
    }
});

});







    
function  initMap() {
  // Callback function to create a map object and specify the DOM element for display.
  globalMap = new google.maps.Map(document.getElementById('airport-map'), {
    center: {lat: 37.09024, lng: -95.712891},
    scrollwheel: true,
    zoom: 4
  });
  
    }
	