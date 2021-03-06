/*
  OAuth Token: 178e972ba461b3efce2d9abe5e787a5f8026bc8d
  generated on: 10-01-2020
*/
//var GitHub = require('github-api');
/**************************************************************
// basic auth
var gh = new GitHub({
   /*
   username: 'FOO',
   password: 'NotFoo'
   /* also acceptable:
      token: 'MY_OAUTH_TOKEN'
	token: '178e972ba461b3efce2d9abe5e787a5f8026bc8d'
});

var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
me.listNotifications(function(err, notifications) {
	// do some stuff
	if(!err){
		console.log(notifications);
	}
	else{
		console.log(err);
	}
});

var clayreimann = gh.getUser('clayreimann');
clayreimann.listStarredRepos(function(err, repos) {
   // look at all the starred repos!
});
**************************************************************8*/

import GitHub from 'github-api';

// unauthenticated client
const gh = new GitHub();
let gist = gh.getGist(); // not a gist yet
gist.create({
	public: true,
	description: 'My first gist',
	files: {
	  "file1.txt": {
		 content: "Aren't gists great!"
	  }
	}
}).then(function({data}) {
	// Promises!
	let createdGist = data;
	return gist.read();
}).then(function({data}) {
	let retrievedGist = data;
	console.log(retrievedGist);
	// do interesting things
});
