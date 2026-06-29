import os
import re

def replace_classes(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    # 1. border-[3px] border-black -> border border-gray-200
    content = re.sub(r'border-\[([234]px)\] border-black', r'border border-gray-200', content)
    content = re.sub(r'border-\[([234]px)\]', r'border', content)
    content = re.sub(r'border-black', r'border-gray-200', content)
    
    # 2. Hard shadows
    content = re.sub(r'shadow-\[\d+px_\d+px_0px_0px_#[0-9a-fA-F]+\]', r'shadow-sm', content)
    
    # 3. Inline style box shadows
    content = re.sub(r"style=\{\{\s*boxShadow:\s*'[^']+'\s*\}\}", r"", content)
    
    # 4. Remove hover/active transforms specific to neo-brutalism
    content = re.sub(r'hover:-translate-y-(?:0\.5|1|2|3|4)', r'hover:-translate-y-1', content)
    content = re.sub(r'hover:shadow-\[\d+px_\d+px_0px_0px_#[0-9a-fA-F]+\]', r'hover:shadow-md', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                replace_classes(os.path.join(root, file))

if __name__ == '__main__':
    process_directory('src')
    print("Done")
