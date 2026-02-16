const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const reviewModel = require("../models/review-model")

/*  **********************************
 *  Review Validation Rules
 * ********************************* */
validate.reviewRules = () => {
    return [
        body("review_text")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide review text."),
    ]
}

/* ******************************
 * Check review data and return errors or continue to add review
 * ***************************** */
validate.checkReviewData = async (req, res, next) => {
    const { review_text, inv_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("notice", "Review text is required.")
        return res.redirect("/inv/detail/" + inv_id)
    }
    next()
}

/* ******************************
 * Check review data and return errors or continue to update review
 * ***************************** */
validate.checkUpdateReviewData = async (req, res, next) => {
    const { review_id, review_text } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("review/edit-review", {
            errors,
            title: "Edit Review",
            nav,
            review_id,
            review_text,
        })
        return
    }
    next()
}

module.exports = validate
