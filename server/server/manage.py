from flask_script import Manager

from app import app
from common import arangodb
from migrations.runner import run_migrations

manager = Manager(app)


@manager.command
def migrate():
    print('Running migrations')
    run_migrations()
    print('DONE')


@manager.command
def list_routes():
    """
    Lists all available routes/URLs.
    """
    import urllib

    output = []
    for rule in app.url_map.iter_rules():
        options = {arg: "[{0}]".format(arg) for arg in rule.arguments}
        methods = ','.join(rule.methods)
        line = urllib.parse.unquote(
            "{:50s} {:20s} {}".format(rule.endpoint, methods, rule)
        )
        output.append(line)

    for line in sorted(output):
        print(line)


@manager.command
def load_data(no_pull=False):
    """
    Loads data from the data repo to database.
    """
    from data_loader.arangoload import run

    run(no_pull=no_pull)


@manager.command
def load_bilara_data(no_pull=False):
    """
    Loads data from the bilara data repo to database.
    """
    from data_loader.arangoload import bilara_run

    bilara_run()


@manager.command
def delete_db():
    arangodb.delete_db(arangodb.get_db())
    from flask import current_app

    storage_dir = current_app.config.get('STORAGE_DIR')
    for file_path in storage_dir.glob('.*'):
        file_path.unlink()


@manager.command
def index_elasticsearch():
    from search.texts import update

    update()


@manager.command
def calculate_download_sizes():
    from tools.calculate_download_size import run

    run()


@manager.command
def hyphenate():
    from data_loader.arangoload import hyphenate_pali_and_san

    hyphenate_pali_and_san()


if __name__ == '__main__':
    manager.run()
