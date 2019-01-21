// Initialize Firebase

var config = {
    apiKey: "AIzaSyAaF0DRQtvsXVtJuCI4BqSAJFJJrXZ38Yg",
    authDomain: "traintime-8878f.firebaseapp.com",
    databaseURL: "https://traintime-8878f.firebaseio.com",
    projectId: "traintime-8878f",
    storageBucket: "traintime-8878f.appspot.com",
    messagingSenderId: "236574339351"
};
firebase.initializeApp(config);
var database = firebase.database();
var trainName = "";
var dest = "";
var firstTrainTime = "";
var freq = "";




$("#submit").on("click", function (event) {
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    dest = $("#dest").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    freq = $("#freq").val().trim();
    console.log($("#firstTrainTime").val());
    employeeData = {
        trainName: trainName,
        dest: dest,
        firstTrainTime: firstTrainTime,
        freq: freq
    }
    database.ref().push(employeeData);
});

database.ref().on(
    "child_added",
    function (snapshot) {
        var st = snapshot.val();
        var tblRow = ($("<tr>"));
        tblRow.addClass("row")
        console.log(st.trainName);
        console.log(st.dest);
        console.log(st.firstTrainTime);
        console.log(st.freq);
        var currTime = moment();
        console.log("------for checking-----------");
        console.log(st.firstTrainTime);
        console.log(st.freq);




        //First time
        //var firstTimeConverted = moment(st.firstTrainTime, "hh:mm").subtract(1, "years");

        var firstTimeConverted = moment(st.firstTrainTime, "hh:mm")
        console.log("test" + firstTimeConverted);

        //const year = moment().subtract(1, 'year').toString(); // Fri Jan 01 2016 00:00:00
        //console.log(year);

        // Current time
        var currentTime = moment();
        console.log(currentTime);
        console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

        var now = moment();
        var time = ((now.hour()) >= 12 ? ' PM' : ' AM');
        console.log(time);

        // Difference between times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % st.freq;
        console.log(tRemainder);

        // Mins until train
        var tMinutesTillTrain = st.freq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
        console.log(nextTrain);
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var tbltrainName = $("<td>");
        tbltrainName.addClass("col")
        var tbldest = $("<td>");
        tbldest.addClass("col");
        var tb1MinutesTillTrain = $("<td>");
        tb1MinutesTillTrain.addClass("col");
        var tblfreq = $("<td>");
        tblfreq.addClass("col");
        var tblnxtTrain = $("<td>");
        tblnxtTrain.addClass("col");
        tbltrainName.html(st.trainName);
        tbldest.html(st.dest);
        tb1MinutesTillTrain.html(tMinutesTillTrain);
        tblfreq.html(st.freq);
        tblnxtTrain.html(nextTrain + time);
        tblRow.append(tbltrainName, tbldest, tblfreq, tblnxtTrain, tMinutesTillTrain);
        $("#trainData").append(tblRow);

    }
    ,
    //error handling
    function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

// setInterval(function () {

// }, 60000);

