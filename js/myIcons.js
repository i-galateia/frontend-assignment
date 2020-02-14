				
					
				/* custom icon for the marker */
				var icon = L.divIcon({
			        className: 'custom-div-icon',
			        html: "<div style='background-color:#0B82C3;' class='marker-pin'></div><i class='material-icons'></i>",
			        iconSize: [30, 42],
			        iconAnchor: [15, 42]
			    });		
			
				/* returns an icon with the given color*/
				var colouredIcon = function(color) {
     								myicon =  L.divIcon({
									        className: 'custom-div-icon',
									        html: "<div style='background-color:"+color+"'class='marker-pin'></div><i class='material-icons'></i>",
									        iconSize: [30, 42],
									        iconAnchor: [15, 42]
									    });	
										
										return 	myicon;
									}