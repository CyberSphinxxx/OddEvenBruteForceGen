function copyToClipboard() {
    const output = document.getElementById("output");
    output.select();
    document.execCommand("copy");
    alert("Code copied to clipboard!");
  }