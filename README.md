# Something

`something` is a tiny, dependency-free decision helper for the moments when
every option sounds fine. Give it choices as arguments or pipe them in, and it
will pick one for you.

## Usage

```console
$ python -m something --seed example tea coffee cocoa
coffee

$ printf 'walk\nread\nnap\n' | python -m something --seed 42
read
```

Use `--count` to select more than one distinct option. A seed makes a choice
repeatable, which is handy in scripts and tests.

```console
$ python -m something --seed demo --count 2 red green blue
blue
green
```

Blank input lines are ignored. If no choices are supplied and standard input
is interactive, the command exits with a helpful error.

## Development

The project requires Python 3.9 or newer and has no runtime dependencies.

```console
python -m unittest discover -s tests -v
```

## License

MIT
