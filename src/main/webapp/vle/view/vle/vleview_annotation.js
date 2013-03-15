/**
 * Display annotations for the specified step.
 * Annotations for the step will popup in a dialog
 * @param nodeIdToShow id of node to show
 */
View.prototype.showNodeAnnotations = function(nodeId) {
	$('#nodeAnnotationsLink').stop();
	$('#nodeAnnotationsLink').css('color','#FFFFFF');
	
	var currentNode = this.getProject().getNodeById(nodeId);  //get the node
	var currentNodeAnnotations = currentNode.getNodeAnnotations();
	if (currentNodeAnnotations != null && currentNodeAnnotations.length > 0) {

		//check if the nodeAnnotationPanel exists
		if($('#nodeAnnotationsPanel').size()==0){
			//the show nodeAnnotationPanel does not exist so we will create it
			$('<div id="nodeAnnotationsPanel" class="nodeAnnotationsPanel"></div>').dialog(
					{	autoOpen:false,
						closeText:'Close',
						modal:false,
						show:{effect:"fade",duration:200},
						hide:{effect:"fade",duration:200},
						title:this.getI18NString("node_annotations_title"),
						zindex:9999,
						width:450,
						height:'auto',
						position:["center","middle"],
						resizable:true    					
					}).bind( "dialogbeforeclose", {view:currentNode.view}, function(event, ui) {
						if ($(this).data("dialog").isOpen()) {	    		    		
							// before the dialog closes
						};
					});
		};

		// set the title of the dialog based on step title
		$('#nodeAnnotationsPanel').dialog("option","title",this.getI18NString("node_annotations_title")+" "+this.project.getVLEPositionById(currentNode.id)+": "+currentNode.getTitle());
		var nodeAnnotationComment = null;  // latest comment
		var nodeAnnotationScore = null;    // latest score
		var nodeAnnotationCRater = null;    // latest cRater feedback
		for (var i=0; i< currentNodeAnnotations.length; i++) {
			var currentNodeAnnotation = currentNodeAnnotations[i];
			if (currentNodeAnnotation.type == "comment") {
				nodeAnnotationComment = currentNodeAnnotation;
			} else if (currentNodeAnnotation.type == "score") {
				nodeAnnotationScore = currentNodeAnnotation;
			} else if (currentNodeAnnotation.type == "cRater") {
				nodeAnnotationCRater = currentNodeAnnotation;
			}
		}
		
		var nodeAnnotationsString = "<div id='nodeAnnotations' style='line-height:150%'>";

		// if the node is cRater-enabled and there's feedback, show it instead of teacher feedback.
		if (currentNode.content.getContentJSON().cRater && 
				(currentNode.content.getContentJSON().cRater.displayCRaterScoreToStudent ||
						currentNode.content.getContentJSON().cRater.displayCRaterFeedbackToStudent)) {
			var cRaterFeedbackStringSoFar = "<span class='nodeAnnotationsCRater'>";
			if (currentNode.content.getContentJSON().cRater.displayCRaterScoreToStudent) {
				if (nodeAnnotationCRater != null) {
					// get the score from the annotation
					cRaterFeedbackStringSoFar += "You got a score of "+nodeAnnotationCRater.value[0].score+"<br/><br/>";					
				}
			}
			if (currentNode.content.getContentJSON().cRater.displayCRaterFeedbackToStudent) {
				// get the feedback that the student saw in the nodestate
				if (this.state.getLatestCRaterFeedbackByNodeId(currentNode.id) != null) {
					var cRaterFeedbackText = this.state.getLatestCRaterFeedbackByNodeId(currentNode.id);
					if (cRaterFeedbackText != null) {
						cRaterFeedbackStringSoFar += cRaterFeedbackText+"<br/>";						
					}
				}
			}
			cRaterFeedbackStringSoFar += "</span><br/>";
			nodeAnnotationsString += cRaterFeedbackStringSoFar;
		} else {
			// otherwise, show the teacher score and feedback
			if (nodeAnnotationScore != null && nodeAnnotationScore.value) {
				var maxScoreForThisStep = this.maxScores.getMaxScoreValueByNodeId(currentNode.id);
				nodeAnnotationsString += "<span class='nodeAnnotationsScore'>Score: "+nodeAnnotationScore.value+" out of "+ maxScoreForThisStep +"</span><br/><br/>";
			}
			if (nodeAnnotationComment != null && nodeAnnotationComment.value) {
				nodeAnnotationsString += "<span class='nodeAnnotationsComment'>Comments: "+nodeAnnotationComment.value+"</span><br/>";
			}
		}
		
		nodeAnnotationsString += "<span class='nodeAnnotationsFooter' style='font-style:italic'>You can always view this feedback by clicking on the \"Feedback\" icon in the top right corner.</span>";
		nodeAnnotationsString += "</div>";

		//set the html into the div
		$('#nodeAnnotationsPanel').html(nodeAnnotationsString);

		// show the annotation panel
		$('#nodeAnnotationsPanel').dialog('open');
	}
    
};

/**
 * Displays node Annotation for specified nodeId
 * @param nodeId
 */
View.prototype.displayNodeAnnotation = function(nodeId){
	/* set annotation link in nav bar if annotation exists for this step
	 * populate annotation panel with current node's annotation
	 * */
	var currentNode = this.getProject().getNodeById(nodeId); //get the node the student is currently on
	var currentNodeAnnotations = currentNode.getNodeAnnotations();
	if (currentNodeAnnotations != null && currentNodeAnnotations.length > 0) {
    	var nodeAnnotationsLink = "<a id='nodeAnnotationsLink' onclick='eventManager.fire(\"showNodeAnnotations\",[\""+nodeId+"\"])' title='"+this.getI18NString("node_annotations_button_title")+"'>"+this.getI18NString("node_annotations_button_text")+"</a>";
    	$('#nodeAnnotations').empty().html(nodeAnnotationsLink);
	
		// highlight nodeAnnotationsLink
		function highlight(){
			$('#nodeAnnotationsLink').animate({
				color: '#FFE347'
			}, {
				duration: 1000,
				complete: function(){
					$('#nodeAnnotationsLink').animate({
						color: '#FFFFFF'
					}, {
						duration: 1000,
						complete: function(){
							highlight();
						}
					});
				}
			});
		}
    } else {
    	$("#nodeAnnotations").empty();
    }
};

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/view/vle/vleview_annotation.js');
}