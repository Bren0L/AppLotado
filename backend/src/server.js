const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`back funcionando na porta ${PORT}`));