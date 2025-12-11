// Simple encryption using character codes shift
function encryptText() {
    const input = document.getElementById('input-text').value;
    if(input.trim() === "") return alert("Enter some text to encrypt!");
    
    let encrypted = "";
    for(let i=0; i<input.length; i++){
        let charCode = input.charCodeAt(i);
        encrypted += String.fromCharCode(charCode + 3); // shift 3 characters
    }

    document.getElementById('output-text').value = encrypted;
}

// Simple decryption reversing the shift
function decryptText() {
    const input = document.getElementById('input-text').value;
    if(input.trim() === "") return alert("Enter some text to decrypt!");
    
    let decrypted = "";
    for(let i=0; i<input.length; i++){
        let charCode = input.charCodeAt(i);
        decrypted += String.fromCharCode(charCode - 3); // reverse shift
    }

    document.getElementById('output-text').value = decrypted;
}
