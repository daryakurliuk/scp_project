 const servicelb = $.import('xsjs.user', 'CService').CService;
    const service = new servicelb($.hdb.getConnection({
    treatDateAsUTC: true
}));

    const USER_TABLE = "HiMTA::User";
    const USER_ID =   "HiMTA::usid";

function usersCreate(param){
    $.trace.error("Param :" + JSON.stringify(param));
    var after = param.afterTableName;

    //Get Input New Record Values
    var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

	var currentDate = new Date();	

    var oUserItems = service.recordSetToJSON(oResult, "items");
    var oUser = oUserItems.items[0];

	oUser.creationDate = currentDate;
	oUser.updateDate = currentDate;

	//Get Next Personnel Number
	pStmt = param.connection.prepareStatement(`select \"${USER_ID}\".NEXTVAL from dummy`); 
	var result = pStmt.executeQuery();
    
    while (result.next()) {
		oUser.id = result.getString(1);
	}

	$.trace.error("oUser: " + JSON.stringify(oUser));
    
	pStmt.close();
	//Insert Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement(`insert into \"${USER_TABLE}\" values(?,?,?,?)`);
	fillAndExecute(pStmt, oUser);
	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
	pStmt.executeUpdate();
	pStmt.close();
	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?,?)" );
	fillAndExecute(pStmt, oUser);
}

function fillAndExecute(pStmt, oUser) {
	pStmt.setString(1, oUser.id.toString());
	pStmt.setString(2, oUser.name.toString());
	pStmt.setTimestamp(3, oUser.creationDate);	
	pStmt.setTimestamp(4, oUser.updateDate);	
	pStmt.executeUpdate();
	pStmt.close();	
}

function usersUpdate(param){
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oUserItems = service.recordSetToJSON(oResult, "items");
    var oUser = oUserItems.items[0];
    $.trace.error("Update oUser :" + JSON.stringify(oUser));

    pStmt.close();
    pStmt = param.connection.prepareStatement(`UPDATE \"${USER_TABLE}\" SET "name"='${oUser.name}', "updateDate" = current_timestamp WHERE "usid"=${oUser.usid}`);   
    pStmt.executeUpdate();
    pStmt.close();
    
}