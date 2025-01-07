function generate() {
    const language = document.getElementById("language").value;
    const count = parseInt(document.getElementById("count").value);
    const output = document.getElementById("output");

    if (isNaN(count) || count < 1) {
      output.value = "Please enter a valid number range!";
      return;
    }

    let code = "";
    if (language === "python") {
      code += `number = int(input("Enter a number: "))\n`;
      for (let i = 1; i <= count; i++) {
        code += `if number == ${i}:\n    print("${i} is ${i % 2 === 0 ? "Even" : "Odd"}")\n`;
      }
    } else if (language === "javascript") {
      code += `const number = parseInt(prompt("Enter a number: "));\n`;
      for (let i = 1; i <= count; i++) {
        code += `if (number === ${i}) {\n  console.log("${i} is ${i % 2 === 0 ? "Even" : "Odd"}");\n}\n`;
      }
    }

    output.value = code;
  }

  function copyToClipboard() {
    const output = document.getElementById("output");
    output.select();
    document.execCommand("copy");
    alert("Code copied to clipboard!");
  }

  function downloadCode() {
    const output = document.getElementById("output").value;
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "brute_force_code.txt";
    link.click();
  }