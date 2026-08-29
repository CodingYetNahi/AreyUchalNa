import random
import unittest

from something import pick


class PickTests(unittest.TestCase):
    def test_seeded_pick_is_repeatable(self):
        self.assertEqual(pick(["red", "green", "blue"], 2, "demo"), ["blue", "green"])

    def test_trims_and_ignores_blank_options(self):
        self.assertEqual(pick(["  yes  ", "", "  "], seed=1), ["yes"])

    def test_does_not_modify_global_random_state(self):
        random.seed(99)
        expected = random.random()
        random.seed(99)
        pick(["a", "b"], seed=3)
        self.assertEqual(random.random(), expected)

    def test_rejects_invalid_counts(self):
        with self.assertRaisesRegex(ValueError, "at least 1"):
            pick(["one"], count=0)
        with self.assertRaisesRegex(ValueError, "cannot exceed"):
            pick(["one"], count=2)

    def test_rejects_empty_options(self):
        with self.assertRaisesRegex(ValueError, "non-blank"):
            pick([])


if __name__ == "__main__":
    unittest.main()
