var Invasions = require('../models/invasionModel');
var bodyParser = require('body-parser');


module.exports = {
     /**
     * @api {get} /api/invasions/id/:id Request Invasion information by ID
     * @apiVersion 0.1.0
     * @apiName GetInvasionById
     * @apiGroup GetInvasions
     *
     * @apiParam {Number} id Invasion unique ID.
     *
     * @apiSuccess {String} _id ID of the invasion.
     * @apiSuccess {String} email Email of the invader.
     * @apiSuccess {String} invasion Name of the invasion.
     * @apiSuccess {String} location Location of the invasion.
     * @apiSuccess {Date} when Date of the invasion.
     * @apiSuccess {Boolean} confirmed Whether the invasion is confirmed or not.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "_id": "59e41272e6ab8b208636a64f",
     *          "email": "new.employee@company.com",
     *          "invasion": "New employee introduction workshop",
     *          "location": "Lounge",
     *          "when": "2017-11-18T09:00:00.000Z",
     *          "confirmed": false,
     *          "__v": 0
     *     }
     *
     * @apiError InvasionNotFound The id of the Invasion was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       'Invasion Not found'
     *     }
     */
    findById: function(req, res) {
        Invasions.find({ _id: req.params.id }, function(err, invasions){
            if (err){
                // throw err;
                res.status(404)        // HTTP status 404: NotFound
                .send('Invasion Not found');
            } 
            res.send(invasions);
        });
    },
    /**
     * @api {get} /api/invasions/q?email=&invasion=&location=&when=&confirmed Request Invasions via query
     * @apiVersion 0.1.0
     * @apiName GetInvasionByQuery
     * @apiGroup GetInvasions
     *
     * @apiParam {String} email Email of the invader. (optional)
     * @apiParam {String} invasion Name of the invasion. (optional)
     * @apiParam {String} location Location of the invasion. (optional)
     * @apiParam {String} when Date of the invasion. (optional)
     * @apiParam {String} confirmed Whether the invasion is confirmed or not. (optional)
     * 
     * @apiParamExample {url} Request-Example:
     *       /api/invasions/q?email=new.employee@company.com&invasion=&location=Lounge&when=&confirmed
     *
     * @apiSuccess {String} _id ID of the invasion.
     * @apiSuccess {String} email Email of the invader.
     * @apiSuccess {String} invasion Name of the invasion.
     * @apiSuccess {String} location Location of the invasion.
     * @apiSuccess {Date} when Date of the invasion.
     * @apiSuccess {Boolean} confirmed Whether the invasion is confirmed or not.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *          {
     *               "_id": "59e41163e6ab8b208636a641",
     *               "email": "new.employee@company.com",
     *              "invasion": "Company website meeting",
     *              "location": "Conference room",
     *              "when": "2017-11-15T09:00:00.000Z",
     *              "confirmed": true,
     *               "__v": 0
     *          },
     *          {
     *              "_id": "59e41163e6ab8b208636a642",
     *              "email": "new.employee@company.com",
     *              "invasion": "Company website meeting",
     *              "location": "Conference room",
     *              "when": "2017-11-15T09:30:00.000Z",
     *              "confirmed": true,
     *              "__v": 0
     *          }
     *    ]
     *     
     *
     * @apiError InvasionNotFound The id of the Invasion was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       'Invasion Not found'
     *     }
     */
    findByQuery: function(req, res) {
        // Sanitize the query before passing it to db
        var query = {};
        if (req.query.email) query.email = req.query.email;
        if (req.query.invasion) query.invasion = req.query.invasion;
        if (req.query.location) query.location = req.query.location;
        if (req.query.when) query.when = req.query.when;
        if (req.query.confirmed) query.confirmed = req.query.confirmed;

        Invasions.find( query, function(err, invasions){
            if (err) throw err;
            res.send(invasions);
        })
    },
    /**
     * @api {get} /api/invasions/:year/:month/:day Request Invasions happening in a day
     * @apiVersion 0.1.0
     * @apiName GetInvasionByDay
     * @apiGroup GetInvasions
     *
     * @apiParam {Number} year Year of the invasion.
     * @apiParam {Number} year Month of the invasion.
     * @apiParam {Number} year Day of the invasion.
     *
     * @apiSuccess {String} _id ID of the invasion.
     * @apiSuccess {String} email Email of the invader.
     * @apiSuccess {String} invasion Name of the invasion.
     * @apiSuccess {String} location Location of the invasion.
     * @apiSuccess {Date} when Date of the invasion.
     * @apiSuccess {Boolean} confirmed Whether the invasion is confirmed or not.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "_id": "59e41272e6ab8b208636a64f",
     *          "email": "new.employee@company.com",
     *          "invasion": "New employee introduction workshop",
     *          "location": "Lounge",
     *          "when": "2017-11-18T09:00:00.000Z",
     *          "confirmed": false,
     *          "__v": 0
     *     }
     *
     * @apiError InvasionNotFound The id of the Invasion was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       'Invasion Not found'
     *     }
     */
    findByDay: function(req, res){
        
        var start = new Date(Date.UTC(req.params.year, req.params.month-1, req.params.day, 0, 1));
        var end = new Date(Date.UTC(req.params.year, req.params.month-1, req.params.day, 23, 59));
        
        Invasions.find ( {when: {$gte: start, $lt: end}}, function(err, invasions){
            if (err) throw err;
            res.send(invasions);
        }).sort({when: 1})
    },
    /**
     * @api {post} /api/invasions Create or update an invasion
     * @apiVersion 0.1.0
     * @apiName CreateOrUpdateInvasion
     * @apiGroup PostInvasion
     *
     * @apiParam {json} body Json body to be sent.
     * 
     * @apiParamExample {json} Create-Example:
     *      {
     *          "email": "new.employee@company.com",
     *          "invasion": "New employee introduction workshop",
     *          "location": "Lounge",
     *          "when": "2017-11-18T09:00:00.000Z"
     *      }
     * @apiParamExample {json} Update-Example:
     *      {
     *          "id": "59e2361517109c3cba2febe6",
     *          "email": "someone.else@company.com",
     *          "invasion": "I need no introductions",
     *          "location": "Go karts",
     *          "when": "2017-11-18T09:30:00.000Z"
     *      }
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          Success
     *     }
     *
     */
    createOrUpdateInvasion: function(req, res){
        if (req.body.id){
            Invasions.findByIdAndUpdate(req.body.id, {
                email: req.body.email, invasion: req.body.invasion, location: req.body.location, when: req.body.when, confirmed: false 
            }, function(err, todo){
                if (err) throw err;
                res.send('Success');
            });
        }
        else {
            var newInvasion = Invasions({
                email: req.body.email,
                invasion: req.body.invasion,
                location: req.body.location,
                when: req.body.when,
                confirmed: false
            });
            newInvasion.save(function(err){
                if (err) throw err;
                res.send('Success');
            });
        }
    },
        /**
     * @api {delete} /api/invasions Delete an invasion
     * @apiVersion 0.1.0
     * @apiName DeleteInvasion
     * @apiGroup DeleteInvasion
     *
     * @apiParam {json} body Json body to be sent.
     * 
     * @apiParamExample {json} Delete-Example:
     *      {
     *          "id": "59e2361517109c3cba2febe6",
     *      }
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          Success
     *     }
     *
     */
    deleteInvasionById: function(req, res){
        Invasions.findByIdAndRemove(req.body.id, function(err){
            if (err) throw err;
            res.send('Success');
        });
    }
}