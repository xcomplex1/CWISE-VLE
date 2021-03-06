﻿DataGraphNode.prototype = new Node();
DataGraphNode.prototype.constructor = DataGraphNode;
DataGraphNode.prototype.parent = Node.prototype;
DataGraphNode.authoringToolName = "資料圖表";
DataGraphNode.authoringToolDescription = "學生輸入資料數值且產生圖表";

/**
 * @constructor
 * @extends Node
 * @param nodeType
 * @param view
 * @returns {DataGraphNode}
 */
function DataGraphNode(nodeType, view) {
	this.view = view;
	this.type = nodeType;
	this.prevWorkNodeIds = [];
};

/**
 * Takes in a state JSON object and returns a DATAGRAPHSTATE object
 * @param nodeStatesJSONObj a state JSON object
 * @return a DATAGRAPHSTATE object
 */
DataGraphNode.prototype.parseDataJSONObj = function(stateJSONObj) {
	//TODO implement me
};

DataGraphNode.prototype.exportNode = function() {
	//TODO implement me
};

DataGraphNode.prototype.translateStudentWork = function(studentWork) {
	return studentWork;
};

DataGraphNode.prototype.getHTMLContentTemplate = function() {
	return createContent('node/datagraph/datagraph.html');
};

/**
 * Whether this step type has a grading view. Steps types that do not
 * save any student work will not have a grading view such as HTMLNode
 * and OutsideUrlNode.
 * @returns whether this step type has a grading view
 */
DataGraphNode.prototype.hasGradingView = function() {
	return false;
};

NodeFactory.addNode('DataGraphNode', DataGraphNode);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/datagraph/DataGraphNode.js');
};