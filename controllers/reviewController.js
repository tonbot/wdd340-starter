const reviewModel = require("../models/review-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const reviewCont = {}

/* ***************************
 *  Add a new review
 * ************************** */
reviewCont.addReview = async function (req, res) {
  const { review_text, inv_id, account_id } = req.body

  const reviewResult = await reviewModel.addReview(review_text, inv_id, account_id)

  if (reviewResult) {
    req.flash("notice", "Review added successfully.")
    res.redirect("/inv/detail/" + inv_id)
  } else {
    req.flash("notice", "Sorry, adding the review failed.")
    res.redirect("/inv/detail/" + inv_id)
  }
}

/* ***************************
 *  Build edit review view
 * ************************** */
reviewCont.editReviewView = async function (req, res, next) {
  const review_id = parseInt(req.params.review_id)
  let nav = await utilities.getNav()
  const reviewData = await reviewModel.getReviewById(review_id)
  
  if (!reviewData) {
    req.flash("notice", "Review not found.")
    return res.redirect("/account/")
  }

  // Security check: ensure the logged-in user owns the review
  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "You are not authorized to edit this review.")
    return res.redirect("/account/")
  }

  res.render("review/edit-review", {
    title: "Edit Review",
    nav,
    review_id: reviewData.review_id,
    review_text: reviewData.review_text,
    review_date: reviewData.review_date,
    errors: null,
  })
}

/* ***************************
 *  Process update review
 * ************************** */
reviewCont.updateReview = async function (req, res) {
  const { review_id, review_text } = req.body
  
  // Security check: ensure the logged-in user owns the review
  const reviewData = await reviewModel.getReviewById(review_id)
  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "You are not authorized to update this review.")
    return res.redirect("/account/")
  }

  const updateResult = await reviewModel.updateReview(review_id, review_text)

  if (updateResult) {
    req.flash("notice", "Review updated successfully.")
    res.redirect("/account/") // Or back to management
  } else {
    let nav = await utilities.getNav()
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("review/edit-review", {
      title: "Edit Review",
      nav,
      review_id,
      review_text,
      errors: null,
    })
  }
}

/* ***************************
 *  Build delete review view
 * ************************** */
reviewCont.deleteReviewView = async function (req, res, next) {
  const review_id = parseInt(req.params.review_id)
  let nav = await utilities.getNav()
  const reviewData = await reviewModel.getReviewById(review_id)

  if (!reviewData) {
    req.flash("notice", "Review not found.")
    return res.redirect("/account/")
  }

  // Security check: ensure the logged-in user owns the review
  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "You are not authorized to delete this review.")
    return res.redirect("/account/")
  }

  res.render("review/delete-review", {
    title: "Delete Review",
    nav,
    review_id: reviewData.review_id,
    review_text: reviewData.review_text,
    review_date: reviewData.review_date,
    errors: null,
  })
}

/* ***************************
 *  Process delete review
 * ************************** */
reviewCont.deleteReview = async function (req, res) {
  const review_id = parseInt(req.body.review_id)
  
  // Security check: ensure the logged-in user owns the review
  const reviewData = await reviewModel.getReviewById(review_id)
  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "You are not authorized to delete this review.")
    return res.redirect("/account/")
  }

  const deleteResult = await reviewModel.deleteReview(review_id)

  if (deleteResult) {
    req.flash("notice", "Review deleted successfully.")
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the delete failed.")
    res.redirect("/account/")
  }
}

module.exports = reviewCont
