var Invasions = require('../models/invasionModel');
var Spaces = require('../models/spacesModel');
var bodyParser = require('body-parser');


module.exports = {

    /**
     * @api {get} /api/spaces Get spaces defined on config.json
     * @apiVersion 0.1.0
     * @apiName GetSpaces
     * @apiGroup GetSpaces
     *
     * @apiParam {Number} id Spaces unique ID.
     *
     * @apiSuccess {String} _id ID of the spaces Array.
     * @apiSuccess {Array} spaces Spaces array.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "_id": "59e41272e6ab8b208636a64f",
     *          "spaces": ["Lounge","Conference room", "Open space"],
     *     }
     *
     */
    findSpaces: function(req, res) {
        Spaces.find({  }, function(err, spaces){
            if (err){
                // throw err;
                res.status(404)        // HTTP status 404: NotFound
                .send('Spaces Not found');
            } 
            res.send(spaces);
        });
    },
     /**
     * @api {get} /api/invasions/id/:id Request Invasion information by ID
     * @apiVersion 0.1.1
     * @apiName GetInvasionById
     * @apiGroup GetInvasions
     *
     * @apiParam {Number} id Invasion unique ID.
     *
     * @apiSuccess {String} _id ID of the invasion.
     * @apiSuccess {String} email Email of the invader.
     * @apiSuccess {String} invasion Name of the invasion.
     * @apiSuccess {String} space Space invaded.
     * @apiSuccess {Date} when Date of the invasion.
     * @apiSuccess {Boolean} confirmed Whether the invasion is confirmed or not.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "_id": "59e41272e6ab8b208636a64f",
     *          "email": "new.employee@company.com",
     *          "invasion": "New employee introduction workshop",
     *          "space": "Lounge",
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
     * @api {get} /api/invasions?email=&invasion=&space=&when=&confirmed Request Invasions via query
     * @apiVersion 0.1.2
     * @apiName GetInvasionByQuery
     * @apiGroup GetInvasions
     *
     * @apiParam {String} email Email of the invader. (optional)
     * @apiParam {String} invasion Name of the invasion. (optional)
     * @apiParam {String} space Space invaded. (optional)
     * @apiParam {String} when Date of the invasion. (optional)
     * @apiParam {String} confirmed Whether the invasion is confirmed or not. (optional)
     * 
     * @apiParamExample {url} Request-Example:
     *       /api/invasion?email=new.employee@company.com&invasion=&space=Lounge&when=&confirmed
     *
     * @apiSuccess {String} _id ID of the invasion.
     * @apiSuccess {String} email Email of the invader.
     * @apiSuccess {String} invasion Name of the invasion.
     * @apiSuccess {String} space Space invaded.
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
     *              "space": "Conference room",
     *              "when": "2017-11-15T09:00:00.000Z",
     *              "confirmed": true,
     *               "__v": 0
     *          },
     *          {
     *              "_id": "59e41163e6ab8b208636a642",
     *              "email": "new.employee@company.com",
     *              "invasion": "Company website meeting",
     *              "space": "Conference room",
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
        if (req.query.space) query.space = req.query.space;
        if (req.query.when) query.when = req.query.when;
        if (req.query.confirmed) query.confirmed = req.query.confirmed;

        Invasions.find( query, function(err, invasions){
            if (err) throw err;
            res.send(invasions);
        })
    },
    /**
     * @api {get} /api/invasions/:year/:month/:day?space= Request Invasions happening in a day
     * @apiVersion 0.1.2
     * @apiName GetInvasionByDay
     * @apiGroup GetInvasions
     *
     * @apiParam {Number} year Year of the invasion.
     * @apiParam {Number} month Month of the invasion.
     * @apiParam {Number} day Day of the invasion.
     * @apiParam {String} space Space invaded. (optional query argument)
     *
     * @apiSuccess {String} _id ID of the invasion.
     * @apiSuccess {String} email Email of the invader.
     * @apiSuccess {String} invasion Name of the invasion.
     * @apiSuccess {String} space Space invaded.
     * @apiSuccess {Date} when Date of the invasion.
     * @apiSuccess {Boolean} confirmed Whether the invasion is confirmed or not.
     * 
     * @apiParamExample {url} Request-Example:
     *       /api/invasions/2017/11/15?space=Lounge
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "_id": "59e41272e6ab8b208636a64f",
     *          "email": "new.employee@company.com",
     *          "invasion": "New employee introduction workshop",
     *          "space": "Lounge",
     *          "when": "2017-11-15T09:00:00.000Z",
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

        var query = {
            when: {$gte: start, $lt: end}
        };
        if (req.query.space) query.space = req.query.space;
        
        Invasions.find ( query, function(err, invasions){
            if (err) throw err;
            res.send(invasions);
        }).sort({when: 1})
    },
    /**
     * @api {post} /api/invasions Create or update an invasion
     * @apiVersion 0.1.1
     * @apiName CreateOrUpdateInvasion
     * @apiGroup PostInvasion
     *
     * @apiParam {json} body Json body to be sent.
     * 
     * @apiParamExample {json} Create-Example:
     *      {
     *          "email": "new.employee@company.com",
     *          "invasion": "New employee introduction workshop",
     *          "space": "Lounge",
     *          "when": "2017-11-18T09:00:00.000Z"
     *      }
     * @apiParamExample {json} Update-Example:
     *      {
     *          "id": "59e2361517109c3cba2febe6",
     *          "email": "someone.else@company.com",
     *          "invasion": "I need no introductions",
     *          "space": "Go karts",
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
                email: req.body.email, invasion: req.body.invasion, space: req.body.space, when: req.body.when, confirmed: false 
            }, function(err, todo){
                if (err) throw err;
                res.send('Success');
            });
        }
        else {
            var newInvasion = Invasions({
                email: req.body.email,
                invasion: req.body.invasion,
                space: req.body.space,
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