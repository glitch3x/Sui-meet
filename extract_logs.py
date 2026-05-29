import json
import os

log_path = r'C:\Users\User\.gemini\antigravity\brain\1d9f54c8-3674-4183-b399-181ede094121\.system_generated\logs\overview.txt'

with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    try:
        data = json.loads(line)
        if data.get('type') == 'PLANNER_RESPONSE' and 'tool_calls' in data:
            for call in data['tool_calls']:
                if call['name'] == 'replace_file_content':
                    args = call['args']
                    target_file = args.get('TargetFile')
                    target_content = args.get('TargetContent')
                    if target_file and target_content:
                        print(f"--- EDIT {i} TO {target_file} ---")
                        print(target_content)
                        print("--- END ---")
    except Exception as e:
        pass
