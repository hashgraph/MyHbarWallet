#!/usr/bin/env python3
import jsbeautifier as jsb
import os

for (root, dirs, files) in os.walk("."):
    for filename in files:
        path = os.path.join(root, filename)

        if path.endswith(".ts"):
            pretty_js = jsb.beautify_file(path)

            with open(path, "w") as handle:
                print(pretty_js, file=handle)
