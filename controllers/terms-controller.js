const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Term = require("../models/terms");

const getAllTerms = async (req, res, next) => {
  let terms;
  try {
    terms = await Term.find({});
    console.log(terms);
  } catch (err) {
    const error = new HttpError("Search fail, please try again later.", 500);
    return next(error);
  }

  if (!terms) {
    const error = new HttpError("Could not find term for this word.", 404);
    return next(error);
  }

  terms = terms.map((d) => d.toObject({ getters: true }));

  res.json({ def: terms });
};

const getTermByWord = async (req, res, next) => {
  console.log(req.params);
  const { word } = req.params;

  let term;

  try {
    term = await Term.findOne({ term: word });
    console.log(term);
  } catch (err) {
    const error = new HttpError("Search fail, please try again later.", 500);
    return next(error);
  }

  if (!term) {
    const error = new HttpError("Could not find term for this word.", 404);
    return next(error);
  }

  res.json({ def: term.toObject({ getters: true }) });
};

const getTermByText = async (req, res, next) => {
  console.log(req.params);
  const { text } = req.params;

  let terms;

  try {
  terms = await Term.find({$text: {$search: text }} )
  console.log(terms);             
  } catch (err) {
    const error = new HttpError("Search fail, please try again later.", 500);
    return next(error);
  }
  if (!terms) {
    const error = new HttpError("Could not find term for this word.", 404);
    return next(error);
  }

  terms = terms.map((d) => d.toObject({ getters: true }));

  res.json({ def: terms });
}

const createTerm = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { term, definition, examples, sources } = req.body;

  const createTerm = new Term({
    term,
    definition,
    examples,
    sources,
  });

  try {
    await createTerm.save();
  } catch (err) {
    const error = new HttpError("Creating term failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ term: createTerm });
};

const updateTerm = async (req, res, next) => {
  console.log(req.body);
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return next(
  //         new HttpError('Invalid inputs passed, please check your data.', 422)
  //     );
  // }
  const { word } = req.params;
  console.log(word);
  const { term, definition, examples, sources } = req.body;

  let termRes;
  try {
    termRes = await Term.findOne({ term: word });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  if (!termRes) {
    const error = new HttpError("Could not find term for this word.", 404);
    return next(error);
  }

  termRes.term = term;
  termRes.definition = definition;
  termRes.examples = examples;
  termRes.sources = sources;

  try {
    await termRes.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ term: termRes.toObject({ getters: true }) });
};

const deleteTerm = async (req, res, next) => {
  const { word } = req.params;

  console.log(word);
  let term;

  try {
    term = await Term.findOne({ term: word });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete term",
      500
    );
    return next(error);
  }

  if (!term) {
    const error = new HttpError("Could not find term for this word.", 404);
    return next(error);
  }

  try {
    await term.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete term",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Delete term." });
};

exports.getAllTerms = getAllTerms;
exports.getTermByText = getTermByText;
exports.createTerm = createTerm;
exports.getTermByWord = getTermByWord;
exports.updateTerm = updateTerm;
exports.deleteTerm = deleteTerm;
