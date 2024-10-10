const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { ReviewImage, Review } = require('../../db/models');

const router = express.Router();

// Delete a review image
router.delete("/:imageId", async (req, res,) => {
    const { user } = req;

if(!user) {
    res.statusCode = 401;
    return res.json({ message: "Authentication required"});
}

ReviewImage.findByPk(req.params.imageId)
.then((reviewImage) => {
    if (!reviewImage) {
        res.statusCode = 404;
        return res.json({ message: "Review Image couldn't be found" });
    }
    return Review.findByPk(reviewImage.reviewId)
    .then((review) => {
        if (user.id !== review.userId) {
            res.statusCode = 403;
            return res.json({ message: "Forbidden: Review must belong to the current user"});
        }
        return reviewImage.destroy()
        .then(() => res.json({ message: "Successfully deleted" }));
    });
})
.catch (error =>{
    res.statusCode = 500;
    return res.json({ message: "Internal Server Error"});
});
});

module.exports = router;
