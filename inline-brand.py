"""Embed exact supplied SVG paths into reusable inline symbols."""
from pathlib import Path
import xml.etree.ElementTree as ET
import re
ET.register_namespace('', 'http://www.w3.org/2000/svg')
children = list(ET.parse('assets/Logo Yoru Final BLACK.svg').getroot())
groups = {'brand-horizontal': (list(range(4, 15)) + [29], '40 0 255 160'), 'brand-stacked': (list(range(15, 29)) + [30], '80 240 170 255'), 'cat-minimal': ([3], '0 595 70 65'), 'cat-whiskers': ([2], '125 595 95 65'), 'cat-sitting': ([1], '252 555 112 160')}
symbols = []
for name, (indices, box) in groups.items():
    parts = []
    for i in indices:
        el = ET.fromstring(ET.tostring(children[i]))
        for child in el.iter():
            cls = child.attrib.pop('class', None)
            if cls == 'cls-1': child.set('fill', 'none')
            elif cls == 'cls-2': child.set('fill', '#fff')
        parts.append(ET.tostring(el, encoding='unicode').replace(' xmlns="http://www.w3.org/2000/svg"', ''))
    symbols.append(f'<g id="{name}">' + ''.join(parts) + '</g>')
svg = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style="position:absolute;overflow:hidden"><defs>' + ''.join(symbols) + '</defs></svg>'
page = Path('index.html')
text = page.read_text(encoding='utf-8')
if '<!-- BRAND_SYMBOLS -->' in text:
    page.write_text(text.replace('<!-- BRAND_SYMBOLS -->', svg), encoding='utf-8')
    print('Embedded 5 original brand symbols')
else:
    text = re.sub(r'<svg xmlns="http://www.w3.org/2000/svg" width="0".*?</defs></svg>', lambda _: svg, text, count=1, flags=re.S)
    page.write_text(text, encoding='utf-8')
    print('Refreshed original brand symbols')
