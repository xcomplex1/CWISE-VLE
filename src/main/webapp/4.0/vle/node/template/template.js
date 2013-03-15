﻿<html>
	<head>
		<script type="text/javascript">
			/*
			 * TODO: Copy this file and rename it to
			 * 
			 * <new step type>.html
			 * e.g. quiz.html
			 *
			 * and then put the new file into the new folder
			 * you created for your new step type
			 *
			 * your new folder will look something like
			 * vlewrapper/WebContent/vle/node/<new step type>/
			 *
			 * e.g. if you are creating a quiz step it would look
			 * something like this
			 * vlewrapper/WebContent/vle/node/quiz/
			 */
		
			var template;
		
			function loadContentAfterScriptsLoad(node) {
				/*
				 * TODO: rename Template
				 * 
				 * make sure you rename Template to the object you created in
				 * the file when you copied and modified
				 * 
				 * vlewrapper/WebContent/vle/node/template/template.js
				 * 
				 * for example if you are creating a quiz step and you
				 * created the file
				 *
				 * vlewrapper/WebContent/vle/node/quiz/quiz.js
				 *
				 * and in that file you defined the Quiz object, you would
				 * change Template to Quiz
				 *
				 * TODO: rename template variable
				 * 
				 * you should also rename the local var template variable to something
				 * appropriate. following my previous example I would rename it
				 * to quiz.
				 */
	        	template = new Template(node);
	        	template.render();
	        };
			
	        function loadContent(node) {
		        /*
		         * this loadScripts() function call will load the javascript imports
		         * into this html file 
		         * 
		         * TODO: rename template
		         *
		         * you will need to rename template to the variable name that you
		         * used in 
		         * 
		         * vlewrapper/WebContent/vle/util/scriptloader.js
		         *
		         * when you defined your script paths in the 'scripts' array
		         * 
		         * for example if you are creating a quiz step and you added
		         * the variable named quiz to the scripts array, you would change
		         * 'template' to 'quiz'
		         */
	        	scriptloader.loadScripts('template', document, node.id, eventManager);
	        };

	        /*
	         * This is called when the student clicks on the save button below in the body
	         */
	        function save() {
		        /*
		         * calls the save function in template.js
				 *
		         * TODO: rename template variable
		         */
				template.save();
	        }
		</script>
	</head>

	<body>
		<!-- TODO create the html UI that the student will see when they visit the step -->
		
		<!-- the promptDiv, responseDiv, saveButtonDiv are not required, they are only provided as an example,
			 you may delete all of these divs and create the body however you like -->
		<div id='promptDiv'></div>
		<div id='responseDiv'><textarea id='studentResponseTextArea' rows='8' cols='80'></textarea></div>
		<div id='saveButtonDiv'><input type='button' value='儲存' onclick='save()'></input></div>
	</body>
</html>