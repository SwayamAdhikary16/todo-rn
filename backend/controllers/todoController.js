const { dynamoDb, TABLE_NAME } = require('../utils/dynamoClient');

exports.getTodos = async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch todos" });
  }
};

exports.addTodo = async (req, res) => {
  const { id, title, description, isDone } = req.body;

  const params = {
    TableName: TABLE_NAME,
    Item: { id, title, description, isDone }
  };

  try {
    await dynamoDb.put(params).promise();
    res.status(201).json({ message: "Todo added" });
  } catch (err) {
    res.status(500).json({ error: "Could not add todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { id: Number(id) }
  };

  try {
    await dynamoDb.delete(params).promise();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Could not delete todo" });
  }
};
