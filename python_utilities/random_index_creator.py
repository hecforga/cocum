import xml.etree.ElementTree as ET
import random


subcategory_values = ['vestido']
length_values = ['largo', 'midi', 'corto']
fit_values = ['holgado', 'ajustado', 'convuelo']
neck_values = ['bardot', 'escoteu', 'escotev', 'sinescote']
sleeve_values = ['mangacorta', 'mangalarga', 'tirantes']
print_values = ['cuadros', 'floral', 'liso', 'lunares', 'rayash', 'rayasv']
extras_values = ['asimetrico', 'ante', 'punto', 'cremalleras', 'perlas', 'encaje', 'cutout', 'lazos', 'volantes', 'cruzado', 'terciopelo', 'plisado', 'denim', 'mangaabullonada', 'mangacampana', 'detallefloral', 'split', 'lentejuelas', 'drapeado']

def getRandomValues(values, number_of_results):
    results = []
    while len(results) < number_of_results and len(results) < len(values):
        aux_array = list(set(values) - set(results))
        value = random.choice(aux_array)
        results.append(value)
    return results

tree = ET.parse('add_outfile_vestidos.xml')
root = tree.getroot()

for doc in root.iter('doc'):
    subcategory_element = ET.SubElement(doc, 'field', name='subcategory')
    subcategory_element.text = ' '.join(getRandomValues(subcategory_values, 1))

    length_element = ET.SubElement(doc, 'field', name='length')
    length_element.text = ' '.join(getRandomValues(length_values, 1))

    fit_element = ET.SubElement(doc, 'field', name='fit')
    fit_element.text = ' '.join(getRandomValues(fit_values, 1))

    neck_element = ET.SubElement(doc, 'field', name='neck')
    neck_element.text = ' '.join(getRandomValues(neck_values, 1))

    sleeve_element = ET.SubElement(doc, 'field', name='sleeve')
    sleeve_element.text = ' '.join(getRandomValues(sleeve_values, 1))

    print_element = ET.SubElement(doc, 'field', name='print')
    print_element.text = ' '.join(getRandomValues(print_values, 1))

    extras_element = ET.SubElement(doc, 'field', name='extras')
    extras_element.text = ' '.join(getRandomValues(extras_values, 3))

tree.write('add_outfile_vestidos_m.xml')
