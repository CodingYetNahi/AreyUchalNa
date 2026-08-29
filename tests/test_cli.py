import io
import unittest
from contextlib import redirect_stderr, redirect_stdout

from something.cli import main


class CliTests(unittest.TestCase):
    def test_accepts_positional_options(self):
        output = io.StringIO()
        with redirect_stdout(output):
            result = main(["--seed", "demo", "red", "green", "blue"])
        self.assertEqual(result, 0)
        self.assertEqual(output.getvalue(), "blue\n")

    def test_reads_options_from_standard_input(self):
        output = io.StringIO()
        with redirect_stdout(output):
            result = main(["--seed", "42"], io.StringIO("walk\nread\nnap\n"))
        self.assertEqual(result, 0)
        self.assertEqual(output.getvalue(), "read\n")

    def test_reports_invalid_input(self):
        with redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as raised:
            main(["--count", "2", "only"])
        self.assertEqual(raised.exception.code, 2)


if __name__ == "__main__":
    unittest.main()
