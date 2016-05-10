var APPLICATION_ID = 'CB037EB1-AC9F-7DBA-FF39-CEBE69ED4A00';
var SECRET_KEY = 'FA24F8B9-2549-5111-FFA3-F15136E37900';
var VERSION = 'v1';

initBackendless();
var debugApp = false;
function initBackendless()
{
	Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
}

var Utils =
{
	uuid : function (a, b)
	{
		for (b = a = ''; a++ < 36; b += a * 51 & 52 ? (a^15 ? 8^Math.random() * (a^20 ? 16 : 4) : 4).toString(16) : '-');
		return b
	},
	pluralize : function (count, word)
	{
		return count === 1 ? word : word + 's';
	}
};

function House()
{
	this.id = "";
	this.json = "";
	this.name = "";
	this.localServerIp = "";
	this.boards = "";
	this.homeId = "";
	this.staticServerIp = "";
}



var user = new Backendless.User();

var SubscriptionOptions = function (args) {
   args = args || {};
 
  // id uniquely identifying the subscriber in the application
  this.subscriberId = args.subscriberId || undefined;
 
  // subtopics can be used to "multiplex" message distribution over the same channel
  this.subtopic = args.subtopic || undefined;
 
  // selector is a query in the SQL-92 format referencing message headers.
  // if a published message's headers match the query, the message is delivered to the subscriber
  this.selector = args.selector || undefined;
};

function userLoggedIn( user )
{
  console.log( "user has logged in" );
  /*
	  var channel = "TestChannel",
		subOps = new SubscriptionOptions({ // all fields are optional
			subscriberId: "myDummyID1231234",     // string value identifying subscriber
			subtopic: "*"           // string value - name of the subtopic to subscribe to
		}),
		callback = function (data) {
			var messagesArray = data["messages"];
			myApp.addNotification({
				message: messagesArray[0].data
			});
			console.log(messagesArray)
		},
		success = function (subscription) {
			console.log( "msg send" ,subscription);
			setTimeout(function(){
				var channel = "TestChannel",
						message = "Hello, world!1234",
						success = function (response) {
							console.log( "pub success" );
						},
						failure = function (response) {
							console.log( "pub failed" );
						};
					 
					Backendless.Messaging.publish(
						channel,
						message,
						null,
						null,
						new Backendless.Async(success, failure)
					);
				
				setTimeout(function(){
				var channel = "TestChannel",
						message = "Hello, world!1234",
						success = function (response) {
							console.log( "pub success" );
						},
						failure = function (response) {
							console.log( "pub failed" );
						};
					 
					Backendless.Messaging.publish(
						channel,
						message,
						null,
						null,
						new Backendless.Async(success, failure)
					);
			},2000);
			
			
			},2000);
		},
		failure = function (response) {
			console.log( "msg failed" );
		};
	 
	Backendless.Messaging.subscribe(
		channel,
		callback,
		subOps,
		new Backendless.Async(success, failure)
	);

*/
}
 
function gotError( err ) // see more on error handling
{
  console.log( "error message - " + err.message );
  console.log( "error code - " + err.statusCode );
}
 
Backendless.UserService.login( 'gaurav@gmail.com', 'gaurav', true, new Backendless.Async( userLoggedIn, gotError ) );


