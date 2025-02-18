const AbstractSeeder = require("./AbstractSeeder");

class StackSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Stack", truncate: true });
  }

  async run() {
    await this.resetTable();
    const baseUrl = process.env.APP_HOST || "http://localhost:3000";

    const stacks = [
      { name: "HTML", icon: `${baseUrl}/public/icons/html5.webp`, refName: "stack_html" },
      { name: "CSS", icon: `${baseUrl}/public/icons/css.webp`, refName: "stack_css" },
      { name: "JavaScript", icon: `${baseUrl}/public/icons/javascript.webp`, refName: "stack_js" },
      { name: "React", icon: `${baseUrl}/public/icons/react.webp`, refName: "stack_react" },
      { name: "Node.js", icon: `${baseUrl}/public/icons/nodejs.webp`, refName: "stack_node" },
      { name: "Express", icon: `${baseUrl}/public/icons/express.webp`, refName: "stack_express" },
      { name: "MySQL", icon: `${baseUrl}/public/icons/mysql.webp`, refName: "stack_mysql" },
    ];

    stacks.forEach((stack) => this.insert(stack));

    await Promise.all(this.promises);

    console.log("✅ Seeding des stacks terminé !");
  }
}

module.exports = StackSeeder;
