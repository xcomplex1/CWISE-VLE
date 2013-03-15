
/**
 * Generate the student navigation XLS. This will ask the
 * teacher to save the XLS file.
 */
View.prototype.getAllStudentWorkXLSExport = function() {
	this.setParamsForXLSExport();
	document.getElementById('exportType').value = 'allStudentWork';
	document.getElementById('getStudentXLSExport').submit();
};

/**
 * Generate the student work XLS. This will ask the
 * teacher to save the XLS file.
 */
View.prototype.getLatestStudentWorkXLSExport = function() {
	this.setParamsForXLSExport();
	document.getElementById('exportType').value = 'latestStudentWork';
	document.getElementById('getStudentXLSExport').submit();
};

/**
 * Request the idea basket excel export
 */
View.prototype.getIdeaBasketsExcelExport = function() {
	this.setParamsForXLSExport();
	document.getElementById('exportType').value = 'ideaBaskets';
	document.getElementById('getStudentXLSExport').submit();
};

/**
 * Request the idea basket excel export
 */
View.prototype.getFlashExcelExport = function() {
	this.setParamsForXLSExport();
	document.getElementById('exportType').value = 'flashStudentWork';
	document.getElementById('getStudentXLSExport').submit();
};

/**
 * Request the explanation builder work excel export
 */
View.prototype.getExplanationBuilderWorkExcelExport = function() {
	this.setParamsForXLSExport();
	document.getElementById('exportType').value = 'explanationBuilderWork';
	document.getElementById('getStudentXLSExport').submit();
};

/**
 * Request a custom latest student work export
 */
View.prototype.getCustomLatestStudentWorkExport = function() {
	this.setParamsForXLSExport();
	$('#exportType').val('customLatestStudentWork');
	
	//get all the node ids that were chosen for the custom export
	var customStepsArrayJSONString = this.getCustomStepsArrayJSONString();
	$('#customStepsArray').val(customStepsArrayJSONString);
	
	$('#getStudentXLSExport').submit();
};

/**
 * Request a custom all student work export
 */
View.prototype.getCustomAllStudentWorkExport = function() {
	this.setParamsForXLSExport();
	$('#exportType').val('customAllStudentWork');
	
	//get all the node ids that were chosen for the custom export
	var customStepsArrayJSONString = this.getCustomStepsArrayJSONString();
	$('#customStepsArray').val(customStepsArrayJSONString);
	
	$('#getStudentXLSExport').submit();
};

/**
 * Request the student names export
 */
View.prototype.getStudentNamesExport = function() {
	var getStudentListUrl = this.getConfig().getConfigParam("getStudentListUrl");
	
	document.getElementById('runId').value = this.getConfig().getConfigParam('runId');
	document.getElementById('getStudentXLSExport').action = getStudentListUrl;
	
	$('#getStudentXLSExport').submit();
};

/**
 * Get the custom steps array JSON string
 * @return a JSON string that contains all the custom node ids
 */
View.prototype.getCustomStepsArrayJSONString = function() {
	var customStepsJSONString = "";
	var customStepsArray = this.getCustomStepsArray();
	
	if(customStepsArray != null) {
		customStepsJSONString = JSON.stringify(customStepsArray);
	}
	
	return customStepsJSONString;
};

/**
 * Get the custom steps array
 * @return and array of node id strings
 */
View.prototype.getCustomStepsArray = function() {
	var customStepsArray = [];
	
	//get all the steps that were checked
	var customSteps = $("input:checkbox[name='customExportStepCheckbox']:checked");
	
	//loop through all the steps
	for(var x=0; x<customSteps.length; x++) {
		var customStep = customSteps[x];
		
		if(customStep != null) {
			//get the node id of the step
			var nodeId = customStep.value;
			
			if(nodeId != null) {
				//add the node id to our array
				customStepsArray.push(nodeId);			
			}			
		}
	}
	
	return customStepsArray;
};

/**
 * Generate the nodeIdToNodeTitleArray which is used for
 * XLS export to display the node titles in the XLS. This
 * is a recursive function that modifies the global array
 * this.nodeIdToNodeTitleArray
 * @param node this should be the root node of the project
 */
View.prototype.getNodeIdToNodeTitlesMap = function(node) {
	var displayGradeByStepSelectPageHtml = "";
	
	if(node.isLeafNode()) {
		//this node is a leaf/step
		
		/*
		 * create the mapping of node id to node title delimited by &##58;
		 * &#58; is the ascii value of : and we use two #'s in case the
		 * author used a : in the step title to prevent collisions and
		 * corruption when parsing this after this string is sent
		 * back to the server
		 * e.g. node_1.html&##58;1. Introduction
		 */
		var nodeIdToNodeTitle = node.id + "###58;" + this.getProject().getVLEPositionById(node.id) + " " + node.title;

		/*
		 * add the mapping to the array that we are using to keep track
		 * of all the mappings. replace all commas , with &##44;
		 * &#44; is the ascii value of , and we use two #'s to prevent
		 * collisions and parsing errors
		 */
		this.nodeIdToNodeTitleArray.push(nodeIdToNodeTitle.replace(/,/g, "###44;"));
	} else {
		//loop through all its children
		for(var x=0; x<node.children.length; x++) {
			//call this function with each child
			this.getNodeIdToNodeTitlesMap(node.children[x]);
		}
	}
};

/**
 * Sets all the parameters that are required for the XLS
 * export.
 */
View.prototype.setParamsForXLSExport = function() {

	/*
	 * set the run id to an element that will be passed back to the server
	 * when the export to xls is called 
	 */
	document.getElementById('runId').value = this.getConfig().getConfigParam('runId');

	//set the project id
	document.getElementById('projectId').value = this.getConfig().getConfigParam('projectId');
	
	//set the parent project id
	document.getElementById('parentProjectId').value = this.getConfig().getConfigParam('parentProjectId');
	
	//set the run name
	document.getElementById('runName').value = this.getConfig().getConfigParam('runName');
	
	/*
	 * set the project title to an element that will be passed back to the server
	 */
	document.getElementById('projectName').value = this.project.getTitle();
	
	/*
	 * set the type for the bridge controller to inspect
	 */
	document.getElementById('type').value = "xlsexport";
	
	/*
	 * set the url for where to get the xls
	 */
	document.getElementById('getStudentXLSExport').action = this.getConfig().getConfigParam('getXLSExportUrl');
};

/**
 * Show the total scores of all students
 * Go thru all of the classmates and get their score
 */
View.prototype.showScores = function() {
	var classmates = this.getUserAndClassInfo().vle.myClassInfo.classmates;
	var htmlSoFar = "score\tname\n";
	for (var i=0; i < classmates.length; i++) {
		var classmate = classmates[i];
		var classmateScore = annotations.getTotalScoreByToWorkgroup(classmate.workgroupId);
		htmlSoFar += classmateScore + "\t" + classmate.userName +"\n";
	}
	alert(htmlSoFar);
};

/**
 * Generate the tr rows for the export explanations page
 * @return a string containing the html for the rows that explain the
 * workgroup fields in the excel exports
 */
View.prototype.getWorkgroupExportExplanations = function() {
	
	var workgroupExportExplanations = [
		{
			label:"小組Id",
			explanation:"小組的Id"
		},
		{
			label:"Wise Id 1",
			explanation:"此id代表小組的第一位成員。這個Id直接對應學生帳號"
		},
		{
			label:"Wise Id 2",
			explanation:"此id代表小組的第二位成員(如果有)。這個Id直接對應學生帳號"
		},
		{
			label:"Wise Id 3",
			explanation:"此id代表小組的第三位成員(如果有)。這個Id直接對應學生帳號"
		},
		{
			label:"班級",
			explanation:"小組所屬的班級"
		}
	];
	
	//generate the tr rows using the array
	return this.getExplanationTRs(workgroupExportExplanations);
};

/**
 * Generate the tr rows for the export explanations page
 * @return a string containing the html for the rows that explain the
 * run fields in the excel exports
 */
View.prototype.getRunExportExplanations = function() {
	/*
	 * the array containing objects that contain the label and explanation for
	 * each tr row in the explanations page
	 */
	var runExportExplanations = [
		{
			label:"登入教師",
			explanation:"建立執行專題的登入教師"
		},
		{
			label:"專題ID",
			explanation:"專題的ID"
		},
		{
			label:"來源專題ID",
			explanation:"這個專題複製的來源專題 Id"
		},
		{
			label:"專題名稱",
			explanation:"專題的名稱"
		},
		{
			label:"執行專題ID",
			explanation:"執行專題的ID"
		},
		{
			label:"執行專題名稱",
			explanation:"執行專題的名稱"
		},
		{
			label:"開始日期",
			explanation:"執行專題建立的日期"
		},
		{
			label:"結束日期",
			explanation:"執行專題歸檔的日期"
		}
	];
	
	//generate the tr rows using the array
	return this.getExplanationTRs(runExportExplanations);
};

/**
 * Generate the tr rows for the latest student work export explanations page
 * @return a string containing html for the rows that explain the fields
 * in the latest student work excel export
 */
View.prototype.getLatestStudentWorkExportExplanations = function() {
	/*
	 * the array containing objects that contain the label and explanation for
	 * each tr row in the explanations page
	 */
	var latestStudentWorkExportExplanations = [
		{
			label:"步驟標題",
			explanation:"步驟的標題"
		},
		{
			label:"步驟類型",
			explanation:"步驟的類型"
		},
		{
			label:"步驟提示",
			explanation:"在步驟中讓學生閱讀的提示"
		},
		{
			label:"節點Id",
			explanation:"此步驟Id在專題中是獨立的"
		},
		{
			label:"其他步驟資訊",
			explanation:"關於步驟的其他資訊"
		},
		{
			label:"*教師評分時間點",
			explanation:"教師評分的時間點"
		},
		{
			label:"*教師評分",
			explanation:"來自教師的評分"
		},
		{
			label:"*T教師評論時間點",
			explanation:"教室評論的時間點"
		},
		{
			label:"*教師評論",
			explanation:"來自教師的評論"
		},
		{
			label:"正給予回饋的小組",
			explanation:"這個步驟是同儕/教師回顧評論順序的第二個步驟"
		},
		{
			label:"*從其他小組實作",
			explanation:"這個步驟是同儕/教師回顧評論順序的第二個步驟"
		},
		{
			label:"*正寫下回饋的小組",
			explanation:"這個步驟是同儕/教師回顧評論順序的第三個步驟"
		},
		{
			label:"*小組回饋",
			explanation:"這個步驟是同儕/教師回顧評論順序的第三個步驟"
		},
		{
			label:"*根據回饋修正的實作",
			explanation:"這個步驟是同儕/教師回顧評論順序的第三個步驟"
		},
		{
			label:"*(其他)",
			explanation:"針對問卷/測驗步驟，這將顯示在步驟中每個項目的提示"
		}
	];
	
	//generate the tr rows using the array
	return this.getExplanationTRs(latestStudentWorkExportExplanations);
};

/**
 * Generate the tr rows for the all student work export explanations page
 * @return a string containing html for the rows that explain the fields
 * in the all student work excel export
 */
View.prototype.getAllStudentWorkExportExplanations = function() {
	/*
	 * the array containing objects that contain the label and explanation for
	 * each tr row in the explanations page
	 */
	var allStudentWorkExportExplanations = [
		{
			label:"#",
			explanation:"步驟瀏覽計數"
		},
		{
			label:"Wise Id 1",
			explanation:"此id代表小組的第一位成員。如果該學生缺席，系統將在id數字後面顯示'缺席'"
		},
		{
			label:"Wise Id 2",
			explanation:"此id代表小組的第二位成員(如果有)。如果該學生缺席，系統將在id數字後面顯示'缺席'"
		},
		{
			label:"Wise Id 3",
			explanation:"此id代表小組的第三位成員(如果有)。如果該學生缺席，系統將在id數字後面顯示'缺席'"
		},
		{
			label:"步驟標題",
			explanation:"步驟的標題"
		},
		{
			label:"步驟類型",
			explanation:"步驟的類型"
		},
		{
			label:"步驟提示",
			explanation:"在步驟中讓學生閱讀的提示"
		},
		{
			label:"節點Id",
			explanation:"此步驟Id在專題中是獨立的"
		},
		{
			label:"開始時間",
			explanation:"學生進入該步驟的時間點"
		},
		{
			label:"結束時間",
			explanation:"學生離開該步驟的時間點"
		},
		{
			label:"花費時間(秒)",
			explanation:"學生在該步驟花費的時間"
		},
		{
			label:"教師評分時間點",
			explanation:"教師評分的時間點"
		},
		{
			label:"教師評分",
			explanation:"來自教師的評分"
		},
		{
			label:"教師評論時間點",
			explanation:"教師評論的時間點"
		},
		{
			label:"教師評論",
			explanation:"來自教師的評論"
		},
		{
			label:"同儕小組Id",
			explanation:"這個學生正接收文字訊息的小組Id(只應用於回顧評論順序步驟)"
		},
		{
			label:"接收文字訊息",
			explanation:"從同儕小組接收文字訊息(只應用於回顧評論順序步驟)"
		},
		{
			label:"學生實作項目1",
			explanation:"學生送出這個步驟的實作內容"
		},
		{
			label:"學生實作項目2(如果有)",
			explanation:"學生送出這個步驟實作內容的第2部分(只應用於有很多項目的步驟，如問卷/測驗)"
		},
		{
			label:"學生實作項目N(如果有)",
			explanation:"學生送出這個步驟實作內容的第N部分(只應用於有很多項目的步驟，如問卷/測驗)"
		}
	];
	
	//generate the tr rows using the array
	return this.getExplanationTRs(allStudentWorkExportExplanations);
};

/**
 * Generate the tr rows for the idea baskets export explanations page
 * @return a string containing html for the rows that explain the fields
 * in the idea baskets excel export
 */
View.prototype.getIdeaBasketsExportExplanations = function() {
	/*
	 * the array containing objects that contain the label and explanation for
	 * each tr row in the explanations page
	 */
	var ideaBasketsExportExplanations = [
		{
			label:"想法籃修正版本",
			explanation:"想法籃的修正版本號碼。每次學生更改想法籃，修正版本號碼就會增加"
		},
		{
			label:"想法 #",
			explanation:"想法籃中的想法號碼。即使想法內容更改或想法在想法籃中重新放置，想法號碼不會改變"
		},
		{
			label:"想法文字",
			explanation:"學生輸入想法的文字"
		},
		{
			label:"旗標",
			explanation:"學生為想法選擇的旗標"
		},
		{
			label:"標籤",
			explanation:"學生為想法輸入的標籤"
		},
		{
			label:"來源",
			explanation:"學生為想法選擇的來源"
		},
		{
			label:"建立想法節點類型",
			explanation:"學生建立想法時的步驟類型"
		},
		{
			label:"建立想法節點Id",
			explanation:"學生建立想法時的步驟Id"
		},
		{
			label:"建立想法節點名稱",
			explanation:"學生建立想法時的步驟名稱"
		},
		{
			label:"步驟使用統計",
			explanation:"使用這個想法的步驟數量(如建立想法步驟)"
		},
		{
			label:"想法使用步驟",
			explanation:"使用這個想法的步驟列表(用以下格式表示 節點Id:節點標題，節點Id:節點標題，...)"
		},
		{
			label:"垃圾桶",
			explanation:"當想法在垃圾桶中(0表示無，1表示有)"
		},
		{
			label:"想法籃儲存時間點",
			explanation:"儲存想法籃修正版本的時間點"
		},
		{
			label:"想法建立時間點",
			explanation:"建立想法的時間點"
		},
		{
			label:"上次想法編輯時間點",
			explanation:"上次編輯想法的時間點"
		},
		{
			label:"新",
			explanation:"當想法在想法籃中是新的(0表示無，1表示有)"
		},
		{
			label:"已修正",
			explanation:"當想法在想法籃中修正過(0表示無，1表示有)"
		},
		{
			label:"重新放置",
			explanation:"當想法在想法籃中的位置改變(0表示無，1表示有)"
		},
		{
			label:"步驟使用或修改",
			explanation:"當想法在步驟中使用過或已移除(例如建立解釋步驟)(0表示無，1表示有)"
		},
		{
			label:"已刪除",
			explanation:"當想法放到垃圾桶中(0表示無，1表示有)"
		}
	];
	
	//generate the tr rows using the array
	return this.getExplanationTRs(ideaBasketsExportExplanations);
};

/**
 * Generate the tr rows for the explanation builder work export explanations page
 * @return a string containing html for the rows that explain the fields
 * in the explanation builder work excel export
 */
View.prototype.getExplanationBuilderWorkExportExplanations = function() {
	/*
	 * the array containing objects that contain the label and explanation for
	 * each tr row in the explanations page
	 */
	var explanationBuilderWorkExportExplanations = [
		{
			label:"實作步驟Id",
			explanation:"學生實作的步驟Id"
		},
		{
			label:"步驟標題",
			explanation:"步驟的標題"
		},
		{
			label:"步驟提示",
			explanation:"步驟的提示"
		},
		{
			label:"節點Id",
			explanation:"步驟的Id"
		},
		{
			label:"開始時間",
			explanation:"學生進入步驟的時間點"
		},
		{
			label:"結束時間",
			explanation:"學生離開步驟的時間點"
		},
		{
			label:"花費時間(秒)",
			explanation:"學生在該步驟花費的時間"
		},
		{
			label:"答案",
			explanation:"學生在建立解釋步驟中輸入底部文字欄的文字"
		},
		{
			label:"想法Id",
			explanation:"在想法籃中想法的Id"
		},
		{
			label:"想法文字",
			explanation:"學生輸入想法的文字"
		},
		{
			label:"想法X座標",
			explanation:"左上角想法框相對於左上角背景圖的X座標"
		},
		{
			label:"想法Y座標",
			explanation:"左上角想法框相對於左上角背景圖的Y座標"
		},
		{
			label:"想法顏色",
			explanation:"學生為想法選擇的顏色"
		}
	];
	
	//generate the tr rows using the array
	return this.getExplanationTRs(explanationBuilderWorkExportExplanations);
};

/**
 * Generate the tr rows for the student names export explanations page
 * @return a string containing html for the rows that explain the fields
 * in the student names excel export
 */
View.prototype.getStudentNamesExportExplanations = function() {
	/*
	 * the array containing objects that contain the label and explanation for
	 * each tr row in the explanations page
	 */
	var studentNamesExportExplanations = [
		{
			label:"班級",
			explanation:"學生所在的班級"
		},
		{
			label:"小組Id",
			explanation:"小組的Id"
		},
		{
			label:"Wise Id",
			explanation:"學生的Id"
		},
		{
			label:"學生帳號",
			explanation:"學生的登入帳號"
		},
		{
			label:"學生姓名",
			explanation:"學生的姓名"
		}
	];
	
	//generate the tr rows using the array
	return this.getExplanationTRs(studentNamesExportExplanations);
};

/**
 * Generate the tr rows for all the elements in the array
 * @param explanationArray an array containing objects, the objects
 * contain two fields, label and explanation
 * @return a string containing tr html
 */
View.prototype.getExplanationTRs = function(explanationArray) {
	var explanationHtml = "";
	
	//loop through all the elements in the array
	for(var x=0; x<explanationArray.length; x++) {
		//retrieve an object
		var explanationEntry = explanationArray[x];
		
		//get the label and explanation
		var label = explanationEntry.label;
		var explanation = explanationEntry.explanation;
		
		//create the tr html
		explanationHtml += "<tr>";
		explanationHtml += this.getExplanationTD(label) + this.getExplanationTD(explanation);
		explanationHtml += "</tr>";
	}
	
	return explanationHtml;
};

/**
 * Generate the td html
 * @param tdText the string to wrap in td
 * @return a string containing td html
 */
View.prototype.getExplanationTD = function(tdText) {
	var explanationTdHtml = "";
	
	//wrap the string in td
	explanationTdHtml += "<td class='exportExplanationTd'>";
	explanationTdHtml += tdText;
	explanationTdHtml += "</td>";
	
	return explanationTdHtml;
};

/**
 * Obtain the latest student work by calling render again to retrieve the
 * latest data.
 */
function refresh() {
	lock();	
	render(this.contentURL, this.userURL, this.getDataUrl, this.contentBaseUrl, this.getAnnotationsUrl, this.postAnnotationsUrl, this.runId, this.getFlagsUrl, this.postFlagsUrl);
}

/**
 * Export the grades in the specified format.
 * Currently supported format(s):
 *   CSV
 */
function exportGrades(exportType) {
	 //display the popup window that contains the export data
	 displayExportData(exportType);
	 
	 //send the export data to the server so it can echo it and we can save it as a file
	 vle.saveStudentWorkToFile(exportType);
}

var myMenu;

/**
 * Displays the export data in a new popup window. This is to allow
 * the teacher to be be able to copy and paste the export data
 * into their own text editor in case the data is too big and the
 * echo post fails causing the save dialog to not show up.
 *
 * @param exportType the file type to save the data as
 */
function displayExportData(exportType) {
	//make the new window
	var exportDataWin = window.open("", "exportData", "width=600,height=400");

	//get the export data from the vle
	var exportData = vle.getContentForFile(exportType);

	//make the message to display at the top of the pop up window
	var message = "<p>如果您被要求儲存檔案，您可以忽略並關閉該視窗。</p>";
	message += "<p>如果您沒有被要求儲存檔案，您可以複製在底部欄位的內容並將它貼上Notepad或文字編輯器，然後自己將它儲存。</p>";

	//make the textarea that will contain the export data
	var textBoxHtml = "<textarea rows='15' cols='70'>" + exportData + "</textarea>";

	//write the contents to the popup window
	exportDataWin.document.open();
	exportDataWin.document.write(message + textBoxHtml);
	exportDataWin.document.close();
}


//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/view/grading/gradingview_export.js');
};