const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://leeinearth817:cnttvietnhatk17@cluster0.pjk9ees.mongodb.net/project_news",
      {}
    );
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect fail");
  }
}

module.exports = { connect };
