#!/usr/bin/env python3
import os
import re

ROOT = os.getcwd()


def determine_prefix(filename):
    return os.path.relpath(ROOT, os.path.dirname(filename))


def replace_imports(filename):
    newlines = []
    prefix = determine_prefix(filename)

    with open(filename, "r") as handle:
        for line in handle.readlines():
            if 'from "@' in line and 'mdi/js' not in line:
                newline = re.sub('from "@', 'from "{}'.format(prefix), line)
                newlines += [newline]
            else:
                newlines += [line]

    with open(filename, "w") as handle:
        for line in newlines:
            print(line.strip(), file=handle)


def main():
    for (root, dirs, files) in os.walk(ROOT):
        for filename in files:

            filename = os.path.join(root, filename)

            if filename.endswith("ts") or filename.endswith("vue"):
                if "node_modules" not in filename and ".git" not in filename:
                    print(filename)
                    replace_imports(filename)


if __name__ == '__main__':
    main()
