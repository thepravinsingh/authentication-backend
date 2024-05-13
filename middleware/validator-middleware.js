const validate = (schema) => async (req, res, next) => {
  try {
    const bodyParse = await schema.parseAsync(req.body);
    req.body = bodyParse;
    next();
  } catch (e) {
    const message = e.errors[0].message;
    console.log(e);
    res.status(400).json({ mess: message });
  }
};

module.exports = validate;
