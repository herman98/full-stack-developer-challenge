from urllib.parse import unquote

from flask_migrate import MigrateCommand
from flask_script import Manager

from app import app

manager = Manager(app)

manager.add_command('db', MigrateCommand)

@manager.command
def list_routes():
    output = []
    for rule in app.url_map.iter_rules():
        methods = ','.join(rule.methods)
        line = unquote("{:50s} {:40s} {}".format(
            rule.endpoint, methods, rule))
        output.append(line)

    for line in sorted(output):
        print(line)


if __name__ == "__main__":
    manager.run()