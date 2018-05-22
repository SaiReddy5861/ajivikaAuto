var appClient
var client
       
var app = {

    initialize: function() {
        this.bindEvents();
        $(window).on("navigate", function (event, data) {          
            event.preventDefault();      
        })
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        app.mqttInit();
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log('deviceready');
         
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    mqttInit: function() {
            var wsbroker = "test.mosquitto.org";  //mqtt websocket enabled broker
            var wsport = 8080 // port for above
                
            client = new Paho.MQTT.Client(wsbroker, wsport,
                    "myclientid_" + parseInt(Math.random() * 100, 10));
                
                client.onConnectionLost = function (responseObject) {
                  console.log("connection lost: " + responseObject.errorMessage);
            };

                
                
            var options = {
                  timeout: 3,
                  onSuccess: function () {
                    console.log("mqtt connected");
                    
                    // Connection succeeded; subscribe to our topic, you can add multile lines of these
                    
                    
                    // client.subscribe('node-bngd-bstd', {qos: 1});
                    // client.subscribe('contrl-server-resp', {qos: 1});



                    },
                  
                  onFailure: function (message) {
                    console.log("Connection failed: " + message.errorMessage);
                  }
                };       


        
        client.connect(options);        

        console.log(client);

        
      //   var Client = require('ibmiotf'); //.IotfApplication;

      //   var appClientConfig = {
      //   "org" : "0usdme",
      //   "id" : "webapp_1",
      //   "domain": "internetofthings.ibmcloud.com",
      //   "type" : "APP",
      //   "auth-method" : "token",
      //   "auth-key":"a-0usdme-kr5j5ltwnp",
      //   "auth-token" : "WaVcpvMHb(4o9CKXE-"
      //   };
      // appClient = new Client.IotfApplication(appClientConfig);
      // // 
      // appClient.connect();
       
      //   appClient.on('connect', function () {
      //       console.log('connected',"yes");
       
      //       // appClient.subscribeToDeviceEvents("RPI");
      //       // app.subscribe();

             
        // });    

        
    },  

    pub_publish:function(data){

         var myData=data;
        myData = JSON.stringify(myData);

        message = new Paho.MQTT.Message(myData);
        message.destinationName = "sai-topic";
        // console.log(client);
        console.log(myData);
        client.send(message);
        // appClient.publishDeviceEvent("APP","webapp_1", "myEvent", "json", myData);



        // var myQosLevel = 2;

        // appClient.publish("status","json",'{"d" : { "cpu" : 60, "mem" : 50 }}', myQosLevel);
    },

    subscribe: function(){  
        console.log('subscribing');
        appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
        console.log('got a message');
        console.log(deviceType);
        var parsed = JSON.parse(payload);
        console.log(parsed.distance); 
        
    });

     },


};

// telnet 0usdme.messaging.internetofthings.ibmcloud.com 1883
