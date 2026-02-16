const express = require("express")
const router = new express.Router()
const reviewCont = require("../controllers/reviewController")
const regValidate = require("../utilities/review-validation")
const utilities = require("../utilities/")

// Route to add a new review
router.post(
    "/add",
    utilities.checkLogin,
    regValidate.reviewRules(),
    regValidate.checkReviewData,
    utilities.handleErrors(reviewCont.addReview)
)

// Route to build edit review view
router.get(
    "/edit/:review_id",
    utilities.checkLogin,
    utilities.handleErrors(reviewCont.editReviewView)
)

// Route to process update review
router.post(
    "/update",
    utilities.checkLogin,
    regValidate.reviewRules(),
    regValidate.checkUpdateReviewData,
    utilities.handleErrors(reviewCont.updateReview)
)

// Route to build delete review view
router.get(
    "/delete/:review_id",
    utilities.checkLogin,
    utilities.handleErrors(reviewCont.deleteReviewView)
)

// Route to process delete review
router.post(
    "/delete",
    utilities.checkLogin,
    utilities.handleErrors(reviewCont.deleteReview)
)

module.exports = router
