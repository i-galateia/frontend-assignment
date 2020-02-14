
/* create custnom marker using track position data*/
var customMarker = function(position) {
		
		var mymarker = L.marker([position.lat, position.lon], {icon:colouredIcon(statusMap[Number(position.status)].scolor)})
					.bindPopup('Status : '+statusMap[Number(position.status)].stext+' <br><br> Speed : '+ position.speed + '<br><br> Position received : '+ new Date(position.cdate).toLocaleTimeString()); 

	
		return mymarker;	
	}
	
			
