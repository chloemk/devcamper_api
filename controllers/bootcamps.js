const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

//@description --> Get all bootcamps
//@route --> GET /api/v1/bootcamps
//@access --> Public 
exports.getBootcamps = asyncHandler (async (req, res, next) => {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({ success: true, count:bootcamps.length, data: bootcamps });
});

//@description --> Get single bootcamps
//@route --> GET /api/v1/bootcamps
//@access --> Public 
exports.getBootcamp = asyncHandler (async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);
        
        //formatted object id이지만 데이터베이스에 없는 경우
        if (!bootcamp) {
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
            );
        }

        res.status(200).json({ success: true, data: bootcamp });
});

//@description --> Create new bootcamp
//@route --> POST /api/v1/bootcamps/:id
//@access --> Public 
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } 
    catch (err) {
        next(err);
    }
};

//@description --> Update bootcamp
//@route --> PUT /api/v1/bootcamps/:id
//@access --> Public 
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if (!bootcamp) {
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
            );
        }

        res.status(200).json({ success: true, data: bootcamp });
    } 
    catch(err) {
        next(err);
    }
};

//@description --> Delete bootcamp
//@route --> DELETE /api/v1/bootcamps/:id
//@access --> Public 
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    
        if (!bootcamp) {
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
            );
        }

        res.status(200).json({ success: true, data: {} });
    } 
    catch(err) {
        res.status(400).json({ success: false });
    }
}