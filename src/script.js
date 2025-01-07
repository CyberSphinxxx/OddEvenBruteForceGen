function generate() {
  const language = document.getElementById("language").value;
  const count = parseInt(document.getElementById("count").value);
  const output = document.getElementById("output");

  if (isNaN(count) || count < 1) {
    output.value = "Please enter a valid number range!";
    return;
  }

  let code = "";
  switch (language) {
    case "python":
      code = generatePythonCode(count);
      break;
    case "javascript":
      code = generateJavaScriptCode(count);
      break;
    case "c":
      code = generateCCode(count);
      break;
    case "cpp":
      code = generateCppCode(count);
      break;
    case "csharp":
      code = generateCSharpCode(count);
      break;
    case "java":
      code = generateJavaCode(count);
      break;
    case "assembly":
      code = generateAssemblyCode(count);
      break;
  }

  output.value = code;
}

function generatePythonCode(count) {
  let code = `number = int(input("Enter a number: "))\n\n`;
  for (let i = 1; i <= count; i++) {
    code += `if number == ${i}:\n    print("${i} is ${i % 2 === 0 ? "Even" : "Odd"}")\n`;
  }
  return code;
}

function generateJavaScriptCode(count) {
  let code = `const number = parseInt(prompt("Enter a number:"));\n\n`;
  for (let i = 1; i <= count; i++) {
    code += `if (number === ${i}) {\n  console.log("${i} is ${i % 2 === 0 ? "Even" : "Odd"}");\n}\n`;
  }
  return code;
}

function generateCCode(count) {
  let code = `#include <stdio.h>\n\nint main() {\n  int number;\n  printf("Enter a number: ");\n  scanf("%d", &number);\n\n`;
  for (let i = 1; i <= count; i++) {
    code += `  if (number == ${i}) {\n    printf("${i} is ${i % 2 === 0 ? "Even" : "Odd"}\\n");\n  }\n`;
  }
  code += `\n  return 0;\n}`;
  return code;
}

function generateCppCode(count) {
  let code = `#include <iostream>\n\nint main() {\n  int number;\n  std::cout << "Enter a number: ";\n  std::cin >> number;\n\n`;
  for (let i = 1; i <= count; i++) {
    code += `  if (number == ${i}) {\n    std::cout << "${i} is ${i % 2 === 0 ? "Even" : "Odd"}" << std::endl;\n  }\n`;
  }
  code += `\n  return 0;\n}`;
  return code;
}

function generateCSharpCode(count) {
  let code = `using System;\n\nclass Program {\n  static void Main() {\n    Console.Write("Enter a number: ");\n    int number = int.Parse(Console.ReadLine());\n\n`;
  for (let i = 1; i <= count; i++) {
    code += `    if (number == ${i}) {\n      Console.WriteLine("${i} is ${i % 2 === 0 ? "Even" : "Odd"}");\n    }\n`;
  }
  code += `  }\n}`;
  return code;
}

function generateJavaCode(count) {
  let code = `import java.util.Scanner;

public class OddEvenChecker {
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.print("Enter a number: ");
    int number = scanner.nextInt();

`;
  for (let i = 1; i <= count; i++) {
    code += `        if (number == ${i}) {
        System.out.println("${i} is ${i % 2 === 0 ? "Even" : "Odd"}");
    }
`;
  }
  code += `    }
}`;
  return code;
}

function generateAssemblyCode(count) {
  let code = `section .data
prompt db "Enter a number: ", 0
even_msg db " is Even", 10, 0
odd_msg db " is Odd", 10, 0

section .bss
number resb 4

section .text
global _start

_start:
; Print prompt
mov eax, 4
mov ebx, 1
mov ecx, prompt
mov edx, 16
int 0x80

; Read number
mov eax, 3
mov ebx, 0
mov ecx, number
mov edx, 4
int 0x80

; Convert ASCII to integer
mov eax, [number]
sub eax, '0'

`;
  for (let i = 1; i <= count; i++) {
    code += `    ; Check if number is ${i}
cmp eax, ${i}
jne .not_${i}
mov ecx, ${i}
${i % 2 === 0 ? 'mov edx, even_msg' : 'mov edx, odd_msg'}
call print_result
jmp .exit
.not_${i}:
`;
  }
  code += `
; Exit program
jmp .exit

print_result:
; Convert number to ASCII
add ecx, '0'
mov [number], ecx

; Print number
mov eax, 4
mov ebx, 1
mov ecx, number
mov edx, 1
int 0x80

; Print result message
mov eax, 4
mov ebx, 1
mov ecx, edx
mov edx, 9
int 0x80

ret

.exit:
; Exit program
mov eax, 1
xor ebx, ebx
int 0x80
`;
  return code;
}

function copyToClipboard() {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
  alert("Code copied to clipboard!");
}

function downloadCode() {
  const output = document.getElementById("output").value;
  const language = document.getElementById("language").value;
  const blob = new Blob([output], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `brute_force_code.${getFileExtension(language)}`;
  link.click();
}

function getFileExtension(language) {
  switch (language) {
    case "python": return "py";
    case "javascript": return "js";
    case "c": return "c";
    case "cpp": return "cpp";
    case "csharp": return "cs";
    case "java": return "java";
    case "assembly": return "asm";
    default: return "txt";
  }
}