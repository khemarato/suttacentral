import subprocess
from pathlib import Path
from typing import Generator


def _run_command(command):
    return subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).stdout.read()


def create_project(name: str):
    _run_command(
        "pootle init_fs_project {name} localfs+/srv/pootle/po/{name} '<language_code>.<ext>'".format(name=name))


def update_project(name: str):
    _run_command('pootle fs fetch {name} --verbosity 3'.format(name=name))
    _run_command('pootle fs resolve --overwrite {name} --verbosity 3'.format(name=name))
    _run_command('pootle fs sync {name} --verbosity 3'.format(name=name))


def get_projects() -> Generator[Path, None, None]:
    path = Path('/srv/pootle/po')
    yield from (x for x in path.glob('*') if x.is_dir() and x.stem != '.tmp')


def run():
    for project in get_projects():
        print('processing:', project.stem)
        create_project(project.stem)
        update_project(project.stem)
    print('DONE')


if __name__ == '__main__':
    run()
