/**
 * Created by lisabatbouta on 11/24/14.
 */
var inspect = require('util').inspect;
var client = require('mariasql');

// Declare a method to retrieve all person objects from the database.
exports.query = function(res, callback, query, params) {
    // Create the database client.
    var c = new client();
    // Initialize the array to store the traffic data.
    var qresults = [];

    // Connect to the database containing the data we want.
    c.connect({
        host: 'localhost',
        user: 'labatbouta',
        password: 'labatbouta_pw',
        db: 'labatbouta_db'
    });

    // Log when we connect to the database.
    c.on('connect', function () {
        console.log('Client connected');
    })
        // Log if an error occurs.
        .on('error', function (err) {
            console.log('Client error: ' + err);
        })
        // Log when we close the connection.
        .on('close', function (hadError) {
            console.log('Client closed');
        });



     var queryx = c.prepare(query);

    // Execute a query to retrieve all person objects.
    c.query(queryx(params))
        // On success, iterate through the rows.
        .on('result', function (res) {
            // Add each row to the result array, log the row as well.
            res.on('row', function (row) {
                qresults.push(row);
                console.log('Result row: ' + inspect(row));
            })
                // Log if an error occurs.
                .on('error', function (err) {
                    console.log('Result error: ' + inspect(err));
                })
                // Log when we finish the final row.
                .on('end', function (info) {
                    console.log('Result finished successfully');
                });
        })
        // Log when we finish all the results.
        .on('end', function () {
            console.log('Done with all results');
            // Give the results to the callback.
            callback(res, qresults);
        });

    // Wait until all queries have completed successfully, then close the connection.
    c.end();
};


