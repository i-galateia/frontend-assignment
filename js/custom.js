/* keep vessel track data */
var trackData=[];
var pathData=[]; 
var markers=[];
var latestPosIndex=0;



 /* get vessel's track information */ 
  $.ajax({
	url: 'https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:hourly/days:1/mmsi:241486000/protocol:json', 
	success: function(json){
		
				/* index of the latest position retrieved */
				latestPosIndex=(json.length)-1;					
								
				for(i=0; i<json.length; i++){
					
							var position={
								status : json[i][1],
						    	speed : json[i][2],
						    	lon : json[i][3],
						    	lat : json[i][4],
						    	cdate : json[i][7]
								}
							
							/* fill in track data */
							trackData.push(position);
							
							/* fill in path data */
							pathData.push([json[i][4], json[i][3]]);
							

					
					/* create custom markers */				
					markers.push(customMarker(position));	
	
				}// end of for loop 
					

				/// **  create the layers **//
				
						/* create the main layer */
						var mainLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2FsYTEiLCJhIjoiY2s2Y2hxZnM2MGF3MTNtcXhnMHY0ZjRldSJ9.kqGFcVYlvyn-ltYc5i1_-g', 
													{attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
						    						maxZoom: 18,
						    						id: 'mapbox/streets-v11',
						   			    			accessToken: 'eyJ1IjoiZ2FsYTEiLCJhIjoiY2s2Y2hxZnM2MGF3MTNtcXhnMHY0ZjRldSJ9'
													});
																	
				
				
						/* create layer containing all retrieved positions */
						var latestPositions = L.layerGroup(markers);			
									
					
						/* create a path of all retrieve positions */	
						var style = {
								stroke: 'green',
			  					fill: 'none',
			  					'stroke-dasharray': 10, 
			  					'stroke-width': 3	
							 };
						var polyline = L.polyline(pathData, style);//.addTo(myMap);
						
						
						/* create the marker for the latest position */
						var marker = customMarker(trackData[latestPosIndex])
				
				/// **  create the map **//	
				
						myMap = L.map('mapid',{
												    center: [json[latestPosIndex][4], json[latestPosIndex][3]],
												    zoom: 10,
												    layers: [mainLayer, marker]
												});
												
				/// **  groups payers, add the to map **//	
										
						var baseMaps = {
								    "mainLayer": mainLayer
								};
								
						var overlayMaps = {
									"Last Position" : marker,
								    "Daily Positions": latestPositions,
									"Daily Path" : polyline,
								};	
								
								
						L.control.layers(baseMaps, overlayMaps).addTo(myMap);
				
			
				
				/// **  custom control **//	

						
					/* create markers to animate over the line path */	
					animatedMarker = L.animatedMarker(polyline.getLatLngs(),{
										icon:icon,
										distance: 300,   /* meters */
	  									interval: 2,     /* milliseconds*/
										autoStart: false
									});	
				
				
					/* create the control */
					
					var command = L.control({position: 'bottomleft'});
					
					command.onAdd = function (map) {
					    var div = L.DomUtil.create('div', 'command');
					
					    div.innerHTML = '<div><button  class="mybutton" id="myplayback" type="button">Play</button></div>'; 
					    return div;
					};
					
					command.addTo(myMap);
					
					
					/* add the event handler */
					function handleCommand() {
					  /** remove the layers containing the other markers */
					  myMap.addLayer(animatedMarker);
					  myMap.removeLayer(marker);
					  myMap.removeLayer(latestPositions);
					  myMap.addLayer(animatedMarker);
					   
					   var text = $('#myplayback').text();
	    				$('#myplayback').text(text == "Play" ? "Stop" : "Play");
						$('#myplayback').text(text == "Play" ? animatedMarker.start() : animatedMarker.stop());	
						
						var index = animatedMarker._latlngs.length-1;
						if(animatedMarker._latlng == animatedMarker._latlngs[index]){
								
								//$('#myplayback').text = "Play";
								 
								 //animatedMarker._latlng = animatedMarker._latlngs[0];
								   myMap.removeLayer(animatedMarker);
								  
								 animatedMarker = L.animatedMarker(polyline.getLatLngs(),{
										icon:icon,
										distance: 300,   
	  									interval: 2,    
										autoStart: false
									});	
			
								 myMap.addLayer(animatedMarker);

							}
								   
					   
					}
					
					document.getElementById("myplayback").addEventListener("click", handleCommand, false);
										
				
					
								
							
										
	}// end ajax success
			  
  }); //end ajax call







