const { getClient } = require("./get-client");

function getAllergen(req, response) {

    let id = req.header("id");
    let query = "SELECT * FROM DishAllergen WHERE dishId =" + id + ";";
    console.log(query);

    getClient().then((client) => {
        client.query(query).then((entries) => {
            console.log(entries.rows)
            if (entries.rows.length > 0) {
                response.json(entries.rows[0]);
                response.status(200);
            } else {
                response.status(404);
                response.send();
            }

            client.end();
        });
    });
}
module.exports = {
    getAllergen,
};
