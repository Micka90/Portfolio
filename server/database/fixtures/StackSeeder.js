const AbstractSeeder = require('./AbstractSeeder');

class StackSeeder extends AbstractSeeder {
  dependencies() {
    return [];
  }

  async run() {
    const baseUrl = process.env.APP_HOST || 'http://localhost:3000';

    const stacks = [
      { name: 'HTML', icon: `${baseUrl}/server/public/icons/html5.webp` },
      { name: 'CSS', icon: `${baseUrl}/server/public/icons/css.webp` },
      { name: 'JavaScript', icon: `${baseUrl}/server/public/icons/javascript.webp` },
      { name: 'React', icon: `${baseUrl}/server/public/icons/react.webp` },
      { name: 'Node.js', icon: `${baseUrl}/server/public/icons/nodejs.webp` },
      { name: 'MySQL', icon: `${baseUrl}/server/public/icons/mysql.webp` },
  
    ];

    for (const stack of stacks) {
      await this.database.query(
        'INSERT INTO Stack (name, icon) VALUES (?, ?)',
        [stack.name, stack.icon]
      );
    }
    
  }
}

module.exports = StackSeeder;
