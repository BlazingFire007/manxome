import inquirer from 'inquirer';
import supportsColor from 'supports-color';
import chalk from 'chalk';

const COLOR = supportsColor.stdout;

class Manxome {
  constructor(options) {
    this.defaults = {
      delim: '$',
      prefix: ''
    };
    options = Object.assign({}, this.defaults, options);

    this.delim = options.delim;
    this.prefix = options.prefix;
    this.commands = {
      help: {
        name: 'help',
        shortDesc: 'get help',
        longDesc: 'get help',
        callback: this.help
      },
      exit: {
        name: 'exit',
        shortDesc: 'exit the program',
        longDesc: 'exit the program',
        callback: this.exit
      }
    };
    this.invalidMessage = 'Error: Invalid command. Type "help" to see a list of valid commands.';

    return this;
  }
  async show() {
    while (true) {
      let answer = await inquirer.prompt([
        {
          name: 'command',
          message: this.delim,
          prefix: this.prefix
        }
      ]);
      this.parse(answer.command);
    }
  }

  async parse(commandStr) {
    if (commandStr === '') return;
    commandStr = commandStr.split(' ');
    const base = commandStr[0];
    const args = commandStr.slice(1, commandStr.length);

    if (base === 'help') return this.help(args);
    else if (Object.keys(this.commands).indexOf(base) !== -1) this.commands[base].callback(args);
    else this.invalid();
  }

  addCommand(command) {
    // to do: add error handling to invalid formats
    this.commands[command.name] = command;
  }

  invalid() {
    let message = this.invalidMessage;
    if (COLOR) message = chalk.red(message);
    console.log(message);
  }

  help(args) {
    // to do: make it look good
    if (args.length === 0) {
      for (let command in this.commands) {
        let cmd = this.commands[command];
        let message = `${cmd.name}: ${cmd.shortDesc}\n`;
        if (COLOR) message = chalk.yellow(message);
        console.log(message);
      }
    } else {
      let message = this.commands[args[0]].longDesc;
      if (COLOR) message = chalk.yellow(message);
      console.log(message);
    }
  }

  exit() {
    process.exit(0);
  }
}

export default Manxome;
