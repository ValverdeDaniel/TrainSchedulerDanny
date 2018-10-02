 
 
 
 
 
 
 
 
 
 
 
 
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCURu-rb9oRDY089h-yExhNjn9outck3qc",
    authDomain: "trainscheduler-2-acb82.firebaseapp.com",
    databaseURL: "https://trainscheduler-2-acb82.firebaseio.com",
    projectId: "trainscheduler-2-acb82",
    storageBucket: "trainscheduler-2-acb82.appspot.com",
    messagingSenderId: "224074864489"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //button for adding trains
  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

    //grab user train input
    var trnName = $("#train-name-input").val().trim();
    var destName = $("#destination-input").val().trim();
    var fTrn = $("#first-train-input").val().trim();
    var freq = $("#frequency-input").val().trim();

    //create local "temp" object for holding train data
    var newTrain = {
        name: trnName,
        destination: destName,
        first: fTrn,
        frequency: freq
    };

    database.ref().push(newTrain);

    //logs to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("Train Successfully added");

    //clears all of the text-voxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });

  //create firebase event for adding train to the database and a row in the html

  database.ref().on("child_added", function(childSnapshot) { 
      console.log(childSnapshot.val());

      //store everything into a variable
      var trnName = childSnapshot.val().name;
      var destName = childSnapshot.val().destination;
      var fTrn = childSnapshot.val().first;
      var freq = childSnapshot.val().frequency;

      //console log train info firebase

      console.log(trnName);
      console.log(destName);
      console.log(fTrn);
      console.log(freq);

      //prettify the train Start

    //   var trnStartPretty = moment.unix(fTrn).format("MM/DD/YYYY");

      //calculations sKIPPED for now
      var firstTimeConverted = moment(fTrn,"HH:mm").subtract(1,"years")
      console.log("first Time converted: " + firstTimeConverted);
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("Difference in Time: " + diffTime);
    //   calculations working up until difference in Time
      
     var tRemainder = diffTime % freq;
     console.log("minutes till next Train: " + tRemainder);
    //works

    var tMinutesTillTrain = freq - tRemainder;
    console.log("Minutes Till Train: " +tMinutesTillTrain);

    //next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));



      //create the new row
      var newRow = $("<tr>").append(
          $("<td>").text(trnName),
          $("<td>").text(destName),
          $("<td>").text(freq),
          $("<td>").text(nextTrainFormatted),
          $("<td>").text(tMinutesTillTrain)  
        //   $("<td>").text(trnStartPretty),
        //   $("<td>").text(fTrn),
          

      );

      $("#train-table > tbody").append(newRow);



  });