var Invasions = require('../models/invasionModel');

module.exports = function(){
        //seed database
        var starterInvasions = [
            {
                email: "scott.johnson@company.com",
                invasion: "Company website meeting",
                location: "Conference room",
                when: new Date(2017, 10, 15, 9, 0, 0, 0),
                confirmed: true
            },
            {
                email: "scott.johnson@company.com",
                invasion: "Company website meeting",
                location: "Conference room",
                when: new Date(2017, 10, 15, 9, 30, 0, 0),
                confirmed: true
            },
            {
                email: "g.queen@company.com",
                invasion: "Learning node session",
                location: "Lounge",
                when: new Date(2017, 10, 15, 11, 0, 0, 0),
                confirmed: true
            },
            {
                email: "ivonne.littlecar@company.com",
                invasion: "Lunch and learn (graphql part 2)",
                location: "Conference room",
                when: new Date(2017, 10, 15, 12, 0, 0, 0),
                confirmed: false
            },
            {
                email: "ivonne.littlecar@company.com",
                invasion: "Lunch and learn (graphql part 2)",
                location: "Conference room",
                when: new Date(2017, 10, 15, 12, 30, 0, 0),
                confirmed: false
            },
            {
                email: "karla.bri@company.com",
                invasion: "Meeting with potential client",
                location: "Lounge",
                when: new Date(2017, 10, 15, 3, 30, 0, 0),
                confirmed: false
            },
            {
                email: "mike.rio@company.com",
                invasion: "SCRUM training",
                location: "Open space in middle",
                when: new Date(2017, 10, 16, 9, 0, 0, 0),
                confirmed: true
            },
            {
                email: "mike.rio@company.com",
                invasion: "SCRUM training",
                location: "Open space in middle",
                when: new Date(2017, 10, 16, 9, 30, 0, 0),
                confirmed: true
            },
            {
                email: "mike.rio@company.com",
                invasion: "SCRUM training",
                location: "Open space in middle",
                when: new Date(2017, 10, 16, 10, 0, 0, 0),
                confirmed: true
            },
            {
                email: "mike.rio@company.com",
                invasion: "SCRUM training",
                location: "Open space in middle",
                when: new Date(2017, 10, 16, 10, 30, 0, 0),
                confirmed: true
            },
            {
                email: "mike.rio@company.com",
                invasion: "SCRUM training",
                location: "Open space in middle",
                when: new Date(2017, 10, 16, 11, 0, 0, 0),
                confirmed: true
            },
            {
                email: "mike.rio@company.com",
                invasion: "SCRUM training",
                location: "Open space in middle",
                when: new Date(2017, 10, 16, 11, 30, 0, 0),
                confirmed: true
            },
            {
                email: "mike.rio@company.com",
                invasion: "SCRUM training",
                location: "Open space in middle",
                when: new Date(2017, 10, 16, 12, 0, 0, 0),
                confirmed: true
            },
            {
                email: "mike.rio@company.com",
                invasion: "SCRUM training",
                location: "Open space in middle",
                when: new Date(2017, 10, 16, 12, 30, 0, 0),
                confirmed: true
            }
        ];
        Invasions.create(starterInvasions, function(err, results){
            
        })
        return starterInvasions;
};