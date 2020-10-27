import re
from random import randint

STARTS_WITH_PREFIX = "^(de\s|d')"
STARTS_WITH_VOWEL = "^[aeiouhyAEIOUHYÀ-ÖØ-öø-ÿ]"


def get_all_swears():
    return [
        ['tabarnak', 'tabarnouche', 'tabarouette', 'taboire', 'tabarslaque',],
        ['câlisse', 'câlique', 'câline', 'câline de bine', 'câliboire',],
        ['crisse', 'christie', 'crime',],
        ['ostie', 'astie', 'estique', 'ostifie', 'esprit',],
        ['ciboire', 'saint-ciboire',],
        ['torrieux',],
        ['cimonaque', 'saint-cimonaque',],
        ['baptême', 'batince',],
        ['bâtard',],
        ['calvaire', 'calvince',],
        ['mosus',],
        ['maudit', 'mautadit', 'maudine',],
        ['sacrament',],
        ['viarge', 'sainte-viarge', 'bout d\'viarge',],
        ['cibouleau',],
        ['sacréfice',],
        ['cibole', 'cibolac',],
        ['enfant d\'chienne',],
        ['verrat',],
        ['marde', 'maudite marde',],
        ['boswell',],
        ['sacristi', 'sapristi',],
        ['jésus de plâtre',],
        ['torvisse',],
        ['patente à gosse',],
        ['viande à chien',],
        ['bout d\'crisse',],
        ['cul',],
        ['jésus marie joseph',],
        ['charrue',],
        ['charogne',],
        ['gériboire',],
    ]



def get_text(length=randint(0, 4)+6):
    remaining = get_all_swears()
    result = ''
    previous_swear = ''
    previous_index = None

    for i in range(length):
        length_remaining = len(remaining)
        if length_remaining == 0 or (length_remaining == 1 and previous_index is None):
            remaining = get_all_swears()

        while True:
            current_index = randint(0, length_remaining - 1)
            if (current_index != previous_index or previous_swear in remaining[current_index]):
                break

        family = remaining[current_index]
        previous_index = current_index

        family_index = randint(0, len(family) - 1)
        current = family[family_index]
        previous_swear = current
        family.pop(family_index)

        if len(family) == 0:
            remaining.pop(current_index)

        result += current.capitalize() if i == 0 else with_article(current)
        result += '.' if i == length - 1 else ' '
    return result


def with_article(word):
    if re.search(STARTS_WITH_PREFIX, word):
        prefix = ''
    elif re.search(STARTS_WITH_VOWEL, word):
        prefix = "d'"
    else:
        prefix = 'de '
    return prefix + word
