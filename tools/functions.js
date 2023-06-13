const waitAndRedirect = (link, message,res) => {
  setTimeout(() => {
    res.write(message);
    res.end();
    res.redirect(link);
  }, 5000);
};

module.exports = {waitAndRedirect}