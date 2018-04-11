
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAmOuVJ8_GDyMBAj_XhPNJYvYjFd4BF7YM",
    authDomain: "train-schedule-87904.firebaseapp.com",
    databaseURL: "https://train-schedule-87904.firebaseio.com",
    projectId: "train-schedule-87904",
    storageBucket: "",
    messagingSenderId: "863014107708"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Hide schedule div
  $(".schedule").css("display", "none");

  // Click event for show button
  $("#show-btn").on("click", function(event){
    $(".schedule").css("display", "");
  });

  // Create click event for submit button
  $("#submit-btn").on("click", function(event){
      event.preventDefault();
    
      // Show schedule div when button is clicked 
      $(".schedule").css("display", "");

      //Capture inputs
      var trainName = $("#train-name").val().trim();
      var destination = $("#destination").val().trim();
      var trainTime = $("#train-time").val().trim();
      var frequency = $("#frequency").val().trim();

      var trainInfo = {
          name: trainName,
          trainDestination: destination,
          time: trainTime,
          trainFrequency: frequency
      };

      // Send info to database
      database.ref().push(trainInfo);

      // Clear input boxes
      $("#train-name").val("");
      $("#destination").val("");
      $("#train-time").val("");
      $("#frequency").val("");    
  });

    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().trainDestination;
        var trainTime = childSnapshot.val().time;
        var frequency = childSnapshot.val().trainFrequency;

        // Train first arrival
        var firstTime = trainTime;
        
        // Time coverted 
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        // Current time
        var currentTime = moment();

        // Difference between times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(diffTime);
        

        // Time apart
        var tRemainder = diffTime % frequency;

        // Minutes Away
        var minutesAway = frequency - tRemainder;

        // Arrival time
        // var momentTime = moment.unix(trainTime).format("HH:mm");
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");

        // var momentFrequency = moment.unix(frequency).format("mm");
        

        // // Calculate the train next arrival
        // var nextArrival = parseInt(trainTime + frequency);
        

        // Calculate the train time away

        // Add the data to the table
        $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + (frequency + " minutes") + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
        
    })

