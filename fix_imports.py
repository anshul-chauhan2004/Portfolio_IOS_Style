
import os
import re

def fix_imports(directory):
    # Regex to capture the package name part before the @version
    # It looks for: from "package@version"
    # Matches: from "lucide-react@0.487.0" -> group 1 is "lucide-react"
    # Matches: from "@radix-ui/react-slot@1.1.2" -> group 1 is "@radix-ui/react-slot"
    pattern = re.compile(r'from "([^"]+)@\d+\.\d+\.\d+[^"]*"')

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".tsx") or file.endswith(".ts"):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = pattern.sub(r'from "\1"', content)
                    
                    if new_content != content:
                        print(f"Fixing {path}")
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                except Exception as e:
                    print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    fix_imports("/Users/anshulchauhan/Downloads/Modern Smartphone UI Design/src")
