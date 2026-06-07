**TypeScript Mini Project: Form Validator**A lightweight, type-safe form validation utility built with TypeScript using type guards and discriminated unions.**Features**

*   **Type Safety**: Utilizes TypeScript custom type guards (is operator) for runtime structure validation.
    
*   **Discriminated Unions**: Ensures compile-time exhaustiveness checking for success and error states.
    
*   **Comprehensive Checks**: Validates structural integrity, string formatting, case constraints, and numeric ranges.
    

**File Structure**text

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ├── index.ts        # Core validation logic and sample test cases  └── README.md       # Project documentation   `

Use code with caution.**How It Works**

1.  **Structure Verification**: The isFormInput type guard checks if the unknown input is a non-null object with the correct property types.
    
2.  **Business Rules Validation**: The validateInput function enforces specific domain constraints (non-empty string, lowercase email format, age threshold).
    
3.  **Safe Execution**: The validate wrapper parses the ValidationResult union safely, guaranteeing access to data on success or error on failure.
    

**Getting StartedPrerequisites**Ensure you have Node.js and TypeScript installed.bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install -g typescript ts-node   `

Use code with caution.**Running the Project**Execute the script directly using ts-node:bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ts-node index.ts   `

Use code with caution.**Expected Output**text

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Success! Registered user: Rudresh  Validation Failed: Name cannot be empty., Invalid email format., Must be at least 18 years old.  Validation Failed: Invalid data structure or missing fields.  Validation Failed: Invalid data structure or missing fields.   `