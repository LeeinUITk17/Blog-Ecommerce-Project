"use strick";

const fs = require("fs/promises");

const { v1: uuidv1, v4: uuidv4 } = require("uuid");

class ItemController {
  getItems = async (req, res, next) => {
    const dataEx = await fs.readFile("src/apps/const/user.file", {
      encoding: "utf8",
    });
    res.send({
      message: "success",
      type: "getItem",
      metadata: JSON.parse(dataEx),
    });
  };

  getItemById = async (req, res, next) => {
    const { id } = req.params;
    const data = [];
    const dataEx = await fs.readFile("src/apps/const/user.file", {
      encoding: "utf8",
    });
    if (dataEx) data.push(...JSON.parse(dataEx));
    const result = data.find((e) => e.id == id);

    res.send({
      message: "success",
      type: "getItemById",
      metadata: result,
    });
  };

  updateItem = async (req, res, next) => {
    const { id } = req.params;
    const newData = { id: id, ...req.body };

    const data = [];
    const dataEx = await fs.readFile("src/apps/const/user.file", {
      encoding: "utf8",
    });
    if (dataEx) data.push(...JSON.parse(dataEx));

    const foundIndex = data.findIndex((e) => e.id == id);
    data[foundIndex] = newData;

    await fs.writeFile("src/apps/const/user.file", JSON.stringify(data));

    res.send({
      message: "success",
      type: "addItem",
      metadata: data,
    });
  };

  addItem = async (req, res, next) => {
    const item = { id: uuidv4(), ...req.body };
    const data = [];

    const dataEx = await fs.readFile("src/apps/const/user.file", {
      encoding: "utf8",
    });
    if (dataEx) data.push(...JSON.parse(dataEx));
    data.push(item);
    await fs.writeFile("src/apps/const/user.file", JSON.stringify(data));

    res.send({
      message: "success",
      type: "addItem",
      metadata: data,
    });
  };

  deleteItem = async (req, res, next) => {
    const { id } = req.params;
    const data = [];
    const dataEx = await fs.readFile("src/apps/const/user.file", {
      encoding: "utf8",
    });
    if (dataEx) data.push(...JSON.parse(dataEx));
    const result = data.filter((e) => e.id != id);
    await fs.writeFile("src/apps/const/user.file", JSON.stringify(result));
    res.send({
      message: "success",
      type: "deleteItem",
      metadata: result,
    });
  };
}

module.exports = new ItemController();
