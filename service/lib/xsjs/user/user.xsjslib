const Servicelib = $.import('xsjs.user', 'crudOperations').crudOperations;
const serviceLib = new Servicelib();

var user = function (connection) {
    const USER_TABLE = "HiMTA::User";

    this.doPost = function (oUser) {
        oUser.usid = serviceLib.getNextval("HiMTA::usid");
        const statement = serviceLib.createPreparedInsertStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doPut = function (oUser) {
        let sql = `UPDATE "${USER_TABLE}" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid};`;
        connection.executeUpdate(sql);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody("Updated");
    };

    this.doGet = function () {
        const result = connection.executeQuery('SELECT * FROM "HiMTA::User"');
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doDelete = function (oUser) {
        const statement = serviceLib.createPreparedDeleteStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oUser));
    };
};