function downloadCode() {
    const output = document.getElementById("output").value;
    const language = document.getElementById("language").value;
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `brute_force_code.${getFileExtension(language)}`;
    link.click();
  }