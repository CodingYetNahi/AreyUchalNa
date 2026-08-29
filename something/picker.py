"""Core choice-picking behavior."""

import random
from collections.abc import Iterable
from typing import Optional, Union

Seed = Optional[Union[int, float, str, bytes, bytearray]]


def pick(options: Iterable[str], count: int = 1, seed: Seed = None) -> list[str]:
    """Return ``count`` distinct choices from *options*.

    Whitespace-only choices are discarded, while meaningful whitespace is
    trimmed. A local random-number generator keeps seeded calls isolated from
    application-wide random state.
    """
    choices = [option.strip() for option in options if option.strip()]

    if not choices:
        raise ValueError("at least one non-blank option is required")
    if count < 1:
        raise ValueError("count must be at least 1")
    if count > len(choices):
        raise ValueError("count cannot exceed the number of options")

    return random.Random(seed).sample(choices, count)
