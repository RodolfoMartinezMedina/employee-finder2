var employeesData = require("../data/employees");

module.exports = function(app) {

    app.get("/api/employees", function(req, res) {
        
        res.json(employeesData);
    });

    app.post("/api/employees", function(req, res) {

        var user = req.body,
            leastDiff = 0,
            totalDiffs = [],
            bestMatch = [];

        if (employeesData.length > 1) {   //more than 1 employee in comparison data; do the match routine

            employeesData.forEach(function (employee) {
                var diff = 0;

                for (var i=0; i < user.scores.length; i++)
                    diff += Math.abs(parseInt(user.scores[i]) - parseInt(employee.scores[i]));

                totalDiffs.push(diff);
            });

            leastDiff = Math.min.apply(null, totalDiffs);
            
            for (var i=0; i < totalDiffs.length; i++) {
                if (totalDiffs[i] === leastDiff)
                    bestMatch.push(employeesData[i]);
            }

            res.json(bestMatch);
        }
        else
            res.json(employeesData);  //only 1 employee in the comparison data; return it
        

        employeesData.push(req.body); //pushes record to existing employees data
    });
};