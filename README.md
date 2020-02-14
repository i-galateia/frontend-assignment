# Daily Vessel tracks (markers and animation)

Your task is to present daily vessel tracks on a map and animate them.

Consume dataset from our [API url](https://services.marinetraffic.com/api/exportvesseltrack/v:2/cf8f05df0b57bfae43e762cc61fd381239c4c042/) adding any necessary extra parameters like MMSI and days.

Documentation on the API can be found [here](https://www.marinetraffic.com/en/ais-api-services/documentation/api-service:ps01).

**We expect:**
* Waypoints with informational tooltips.
* A form of waypoint clustering.
* Animation controls.
* Javascript code (Any JS Framework or Library)

**** Provide answer ****
* Waypoints with informational tooltips:
The implementation consists of map (using leaflet.js library), containing multiple layers that can be controlled through the interface.
The initial loaded layer, shows the last position of the vessel (mmsi:241486000). The layer named "latest positions" shows tha hourly positions of the vessel the last day (by last day meaning the last 24 hours). Clicking on a marker representing a vessel a pop-up opens containing information.

* A form of waypoint clustering:
Each marker that repesents a vessel is coloured differently based on the status of the vessel.

* Animation controls:
A custom control is placed on the left bottom corner of the map that enables tha animation of the vessel, showing it's path during the last 24 hours.

* Javascript code (Any JS Framework or Library):
The folder js contains all the used javascript code:
  jquery-3.4.1.min.js
  AnimatedMarker.js (plugin used for animation of the  markers)
  custom.js (custom js code for retrieving data and load them on the map)
  myIcons.js (code for customizing the icons of the markers)
  myMarker.js(code for customizing te markers)
  vesselStatus.js (code for vessel object)
  *** the leaflet.js library is loaded from a repository


**Share your work:**
* Stage your solution on a demo page or
* Fork this repo and create a pull request that contains your implementation in a new branch named after you.
