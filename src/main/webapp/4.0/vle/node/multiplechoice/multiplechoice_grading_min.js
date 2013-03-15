function MCSTATE(a){this.type="mc";this.isCorrect=null;this.response=[];if(a){if(a[0])this.timestamp=a[0];if(a[1])this.choices=a[1];if(a[2])this.score=a[2]}if(!this.timestamp)this.timestamp=(new Date).getTime();if(!this.choices)this.choices=[]}MCSTATE.prototype.addChoice=function(a){this.choices.push(a)};MCSTATE.prototype.addResponse=function(a){this.response.push(a)};MCSTATE.prototype.print=function(){};
MCSTATE.prototype.parseDataJSONObj=function(a){var b=new MCSTATE;b.isCorrect=a.isCorrect;b.timestamp=a.timestamp;b.choices=a.choices;b.score=a.score;b.response=a.response;return b};MCSTATE.prototype.getHumanReadableForm=function(){var a="isCorrect: "+this.isCorrect;a+="choices: "+this.choices;a+="score: "+this.score;return a};
MCSTATE.prototype.getStudentWork=function(){var a="";if(this.response){for(var b=0;b<this.response.length;b++)a!=""&&(a+=", "),a+=this.response[b];this.score&&(a+=" score: "+this.score)}return a};typeof eventManager!="undefined"&&eventManager.fire("scriptLoaded","vle/node/multiplechoice/multiplechoicestate.js");function CHALLENGESTATE(a){this.type="challenge";this.isCorrect=null;this.response=[];if(a){if(a[0])this.timestamp=a[0];if(a[1])this.choices=a[1];if(a[2])this.score=a[2]}if(!this.timestamp)this.timestamp=(new Date).getTime();if(!this.choices)this.choices=[]}CHALLENGESTATE.prototype.addChoice=function(a){this.choices.push(a)};CHALLENGESTATE.prototype.addResponse=function(a){this.response.push(a)};CHALLENGESTATE.prototype.print=function(){};
CHALLENGESTATE.prototype.parseDataJSONObj=function(a){var b=new CHALLENGESTATE;b.isCorrect=a.isCorrect;b.timestamp=a.timestamp;b.choices=a.choices;b.score=a.score;b.response=a.response;return b};CHALLENGESTATE.prototype.getHumanReadableForm=function(){var a="isCorrect: "+this.isCorrect;a+="choices: "+this.choices;a+="score: "+this.score;return a};
CHALLENGESTATE.prototype.getStudentWork=function(){var a="";if(this.response){for(var b=0;b<this.response.length;b++)a!=""&&(a+=", "),a+=this.response[b];this.score&&(a+=" score: "+this.score)}return a};typeof eventManager!="undefined"&&eventManager.fire("scriptLoaded","vle/node/multiplechoice/challengestate.js");function BRANCHSTATE(a){this.type="branch";this.isCorrect=null;this.response=[];if(a){if(a[0])this.timestamp=a[0];if(a[1])this.choices=a[1];if(a[2])this.score=a[2]}if(!this.timestamp)this.timestamp=(new Date).getTime();if(!this.choices)this.choices=[]}BRANCHSTATE.prototype.addChoice=function(a){this.choices.push(a)};BRANCHSTATE.prototype.addResponse=function(a){this.response.push(a)};BRANCHSTATE.prototype.print=function(){};
BRANCHSTATE.prototype.parseDataJSONObj=function(a){var b=new BRANCHSTATE;b.isCorrect=a.isCorrect;b.timestamp=a.timestamp;b.choices=a.choices;b.score=a.score;b.response=a.response;return b};BRANCHSTATE.prototype.getHumanReadableForm=function(){var a="isCorrect: "+this.isCorrect;a+="choices: "+this.choices;a+="score: "+this.score;return a};
BRANCHSTATE.prototype.getStudentWork=function(){var a="";if(this.response){for(var b=0;b<this.response.length;b++)a!=""&&(a+=", "),a+=this.response[b];this.score&&(a+=" score: "+this.score)}return a};typeof eventManager!="undefined"&&eventManager.fire("scriptLoaded","vle/node/multiplechoice/branchstate.js");
if(typeof eventManager != 'undefined'){eventManager.fire('scriptLoaded', 'vle/node/multiplechoice/multiplechoice_grading_min.js');}
