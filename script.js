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
/*************************************************************
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
}).then(function({ data }) {
    // Promises!
    let createdGist = data;
    return gist.read();
}).then(function({ data }) {
    let retrievedGist = data;
    console.log(retrievedGist);
    // do interesting things
});

********************************************************** */

//https://api.github.com/repos/HanumaUkkadapu/myCodeBits/git/trees/master?recursive=1

//Get contents of a repo - /repos/{owner}/{repo}/contents/{path}
//Get commits of a repo - /repos/{owner}/{repo}/commits
//Get commit details - /repos/{owner}/{repo}/commits/REF
//  REF should be a commit sha

//https://api.github.com/repos/HanumaUkkadapu/myCodeBits/contents
//https://api.github.com/repos/hanumaukkadapu/myCodeBits/commits
//https://api.github.com/repos/hanumaukkadapu/myCodeBits/commits/ff53a233a0755fb0b297a86049ab68226b2e3713

window.onload = async() => {

    let [origin, pathname] = [this.location.origin, this.location.pathname],
    dirs = [],
        linksUL = document.getElementById('codeBits-list');

    [origin, pathname] = ['https://hanumaukkadapu.github.io', '/myCodeBits/'];

    let regExp = /\/(?<userName>\w+)/,
        reg = origin.match(regExp).groups;
    console.log(reg.userName, pathname);

    let baseURL = `https://api.github.com/repos/${reg.userName}${pathname}contents`;
    console.log(baseURL);
    fetch(baseURL)
        .then(res => res.json())
        .then(dataJSON => {
            //dataJSON = { "message": "API rate limit exceeded for 139.5.250.94. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)", "documentation_url": "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting" };

            //console.log(dataJSON.message.indexOf("API rate limit exceeded"));
            if (!(dataJSON.length > 0) && dataJSON.message.indexOf("API rate limit exceeded") === 0) {
                console.log(dataJSON);
            } else {
                linksUL.textContent = '';
                dataJSON.forEach((obj) => {
                    if (obj.type === 'dir') {
                        dirs.push(obj.name);
                        let li = `<li><a href="${obj.name}/index.html" target="_blank" rel="noreferer noopener">${obj.name}</a></li>`;
                        linksUL.innerHTML += li;
                    }
                });
                console.log(dirs);
            }
        });

    /*
            API rate limit exceeded for 139.5.250.94. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)
        /*
    let commits = [];
        fetch(commitsURL)
            .then(res => res.json())
            .then(commitsDataJSON => {
                console.log('commits data downloaded');
                commitsDataJSON.forEach((obj, ind) => {

                    let commitObj = {
                        no: ind + 1,
                        sha: obj.sha,
                        date: obj['commit']['committer']['date'],
                        message: obj['commit']['message']
                    };
                    commits.push(commitObj);
                    console.log(commitObj);
                });
            });

    		let comURL = `${commitsURL}${obj.sha}`;
    				let dirName = '';
    				fetch(comURL)
            .then(res => res.json())
            .then(comObj => {
    			dirName = comObj['files'][0].filename;
    			dirName = dirName.match(/(\w+)/);
    		});
    		*/

}