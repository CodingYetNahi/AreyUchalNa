"""Command-line interface for Something."""

import argparse
import sys
from collections.abc import Sequence
from typing import Optional, TextIO

from .picker import pick


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="something",
        description="Pick something from a list of options.",
    )
    parser.add_argument("options", nargs="*", help="choices to pick from")
    parser.add_argument(
        "-n",
        "--count",
        type=int,
        default=1,
        help="number of distinct choices to return (default: 1)",
    )
    parser.add_argument("--seed", help="make the result repeatable")
    return parser


def main(argv: Optional[Sequence[str]] = None, stdin: Optional[TextIO] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    input_stream = stdin if stdin is not None else sys.stdin
    options = args.options

    if not options and not input_stream.isatty():
        options = list(input_stream)

    try:
        selected = pick(options, count=args.count, seed=args.seed)
    except ValueError as error:
        parser.error(str(error))

    print(*selected, sep="\n")
    return 0
