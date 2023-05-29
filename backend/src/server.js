const { httpServer } = require("./http");
require("./websocket");

const PORT = process.env.PORT || 3333;


httpServer.listen(PORT, () => console.log(`back funcionando na porta ${PORT}`));
