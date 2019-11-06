$(document).ready(function () {

  var broker = $("#brokerAddress").val();
  var payload = $("#payload");
  var topic = $("#topic");
  var topicSubscribe = $("#topicSubscribe");
  var timestamp = new Date($.now());
  var arrSubTopics = [];
  var arrPubTopics = [];
  var index;


  $("#btnConnect").click(function () {
    // basic functionalities
    client = mqtt.connect(broker);
    $("#status").val("Connecting .....");
    $("#status").removeClass("bg-danger").removeClass("bg-success");
    client.on("connect", function () {
      $("#status").val("Connected");
      $("#status").removeClass("bg-danger").addClass("bg-success");

    });
    $(".btnSsecondary").attr("disabled", false);

  });

  $("#btnDisconnect").click(function () {
    client.end();
    $("#status").val("Disconnected");
    $("#status").removeClass("bg-success").addClass("bg-danger");
    $(".btnSsecondary").attr("disabled", true);

  });

  $("#btnPublish").click(function () {
    if(topic.val() === ""){
      alert("Please enter a topic");
    }else{
      arrPubTopics.push(topic.val());
    client.publish(topic.val(), payload.val());
    $("#publishTopics tbody").append("<tr class='table-success'> <td>" + topic.val() + "</td>" +
      "<td>" + payload.val() + "</td>" +
      "<td>" + timestamp.toUTCString() + "</td>" +
      "</tr>"
    );
    check();
    }


  });

  $("#btnSubscribe").click(function () {
    if(topicSubscribe.val() === ""){
      alert("Please enter a topic to subcribe")
    }else{
      client.subscribe(topicSubscribe.val());
      client.on("message", function (topic, payload) {
        console.log([topic, payload].join(": "));
        $("#recievedTopics").append("<tr class='table-success'> <td>" + topic + "</td>" +
        "<td>" + payload + "</td> <td>" + timestamp.toUTCString() + "</td>" +
        "</tr>"
      );
      });
  if (!arrSubTopics.includes(topicSubscribe.val())) {
      $("#subscribeTopics tbody").append("<tr  class='table-success'> <td>" + topicSubscribe.val() + "</td>" +
        "<td>" + timestamp.toUTCString() + "</td>" +
        "</tr>"
      );
      arrSubTopics.push(topicSubscribe.val());
    }
    }
    

  });

  $("#btnUnSubscribe").click(function () {
    client.unsubscribe(topicSubscribe.val());
    index = arrSubTopics.indexOf(topicSubscribe.val());
    arrSubTopics.splice(index);


  })

  var check = function () {
    if (arrSubTopics.includes(topic.val()) && arrPubTopics.includes(topic.val())) {
    
      $("#brokerTopics").append("<tr  class='table-success'> <td>" + topic.val() + "</td>" +
        "<td>" + payload.val() + "</td>" +
        "<td>" + timestamp.toUTCString() + "</td>");

    };
   
  }

});




































// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
