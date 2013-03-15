﻿BrainstormNode.prototype=new Node;BrainstormNode.prototype.constructor=BrainstormNode;BrainstormNode.prototype.parent=Node.prototype;BrainstormNode.authoringToolName="Brainstorm Discussion";BrainstormNode.authoringToolDescription="學生在課堂中張貼他們的答案讓每個人閱讀與討論";function BrainstormNode(a,c){this.view=c;this.type=a;this.serverless=this.audioSupported=!0;this.prevWorkNodeIds=[]}
BrainstormNode.prototype.isUsingServer=function(){return this.content.getContentJSON().useServer?(this.serverless=!1,!0):(this.serverless=!0,!1)};BrainstormNode.prototype.parseDataJSONObj=function(a){return BRAINSTORMSTATE.prototype.parseDataJSONObj(a)};NodeFactory.addNode("BrainstormNode",BrainstormNode);BrainstormNode.prototype.getHTMLContentTemplate=function(){var a=null;return a=this.isUsingServer()?createContent("node/brainstorm/brainfull.html"):createContent("node/brainstorm/brainlite.html")};
typeof eventManager!="undefined"&&eventManager.fire("scriptLoaded","vle/node/brainstorm/BrainstormNode.js");View.prototype.brainstormDispatcher=function(a,c,b){a=="brainstormUpdateExpectedLines"?b.BrainstormNode.updateExpectedLines():a=="brainstromUpdateTitle"?b.BrainstormNode.updateTitle():a=="brainstormUpdateGated"?b.BrainstormNode.updateGated(c[0]):a=="brainstormUpdateDisplayName"?b.BrainstormNode.updateDisplayName(c[0]):a=="brainstormUpdateRichText"?b.BrainstormNode.updateRichText(c[0]):a=="brainstormUpdatePollEnded"?b.BrainstormNode.updatePollEnded(c[0]):a=="brainstormUpdateInstantPoll"?b.BrainstormNode.updateInstantPoll(c[0]):
a=="brainstormStarterChanged"?b.BrainstormNode.starterChanged():a=="brainstormStarterUpdated"?b.BrainstormNode.starterUpdated():a=="brainstormUpdatePrompt"?b.BrainstormNode.updatePrompt():a=="brainstormCreateNewResponse"?b.BrainstormNode.createNewResponse():a=="brainstormRemoveResponse"?b.BrainstormNode.removeResponse():a=="brainstormResponseNameChanged"?b.BrainstormNode.responseNameChanged(c[0]):a=="brainstormResponseValueChanged"?b.BrainstormNode.responseValueChanged(c[0]):a=="brainstormResponseSelected"?
b.BrainstormNode.responseSelected(c[0]):a=="brainstormUseServerUpdated"&&b.BrainstormNode.useServerUpdated(c[0])};
for(var events=["brainstormUpdateExpectedLines","brainstromUpdateTitle","brainstormUseServerUpdated","brainstormUpdateGated","brainstormUpdateDisplayName","brainstormUpdateRichText","brainstormUpdatePollEnded","brainstormUpdateInstantPoll","brainstormStarterChanged","brainstormStarterUpdated","brainstormUpdatePrompt","brainstormCreateNewResponse","brainstormRemoveResponse","brainstormResponseNameChanged","brainstormResponseValueChanged","brainstormResponseSelected"],x=0;x<events.length;x++)componentloader.addEvent(events[x],
"brainstormDispatcher");typeof eventManager!="undefined"&&eventManager.fire("scriptLoaded","vle/node/brainstorm/brainstormEvents.js");
if(typeof eventManager != 'undefined'){eventManager.fire('scriptLoaded', 'vle/node/brainstorm/brainstorm_core_min.js');}