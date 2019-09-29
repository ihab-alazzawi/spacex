//Script to load and filter unnecessary data
//this script gets called from Mongo Shell with load() method
var getData = cat("seed-data.json");
var data = JSON.parse(getData);
db = db.getSiblingDB("spacex");

function insertData(data) {
  db.rockets.insertMany(data);
}

var promise = new Promise(function(resolve, reject) {
  resolve(insertData(data));
});

promise.then(function() {
  db.rockets.updateMany(
    {},
    {
      $unset: {
        mission_name: 1,
        mission_id: 1,
        upcoming: 1,
        launch_year: 1,
        launch_date_utc: 1,
        launch_date_local: 1,
        is_tentative: 1,
        tentative_max_precision: 1,
        tbd: 1,
        launch_window: 1,
        ships: 1,
        telemetry: 1,
        reuse: 1,
        launch_site: 1,
        launch_success: 1,
        launch_failure_details: 1,
        static_fire_date_utc: 1,
        static_fire_date_unix: 1,
        timeline: 1,
        crew: 1,
        "rocket.fairings": 1,
        "rocket.first_stage.cores.0.core_serial": 1,
        "rocket.first_stage.cores.0.flight": 1,
        "rocket.first_stage.cores.0.block": 1,
        "rocket.first_stage.cores.0.gridfins": 1,
        "rocket.first_stage.cores.0.legs": 1,
        "rocket.first_stage.cores.0.landing_intent": 1,
        "rocket.first_stage.cores.0.landing_type": 1,
        "rocket.first_stage.cores.0.landing_vehicle": 1,
        "rocket.second_stage.block": 1,
        "rocket.second_stage.payloads.0.payload_id": 1,
        "rocket.second_stage.payloads.0.norad_id": 1,
        "rocket.second_stage.payloads.0.cap_serial": 1,
        "rocket.second_stage.payloads.0.customers": 1,
        "rocket.second_stage.payloads.0.nationality": 1,
        "rocket.second_stage.payloads.0.manufacturer": 1,
        "rocket.second_stage.payloads.0.payload_type": 1,
        "rocket.second_stage.payloads.0.payload_mass_kg": 1,
        "rocket.second_stage.payloads.0.payload_mass_lbs": 1,
        "rocket.second_stage.payloads.0.orbit": 1,
        "rocket.second_stage.payloads.0.orbit_params": 1,
        "rocket.second_stage.payloads.0.mass_returned_kg": 1,
        "rocket.second_stage.payloads.0.mass_returned_lbs": 1,
        "rocket.second_stage.payloads.0.flight_time_sec": 1,
        "rocket.second_stage.payloads.0.cargo_manifest": 1,
        "links.presskit": 1,
        "links.wikipedia": 1,
        "links.video_link": 1,
        "links.youtube_id": 1,
        "links.flickr_images": 1
      }
    }
  );
});
