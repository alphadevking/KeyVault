export { generatePassword };

const generatePassword = ({ includeUppercase, includeLowercase, includeDigits, includeSymbols }: {
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeDigits: boolean;
    includeSymbols: boolean;
}) => {
    let charset = "";
    let selectedCharsets = [];

    if (includeUppercase) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        selectedCharsets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }
    if (includeLowercase) {
        charset += "abcdefghijklmnopqrstuvwxyz";
        selectedCharsets.push("abcdefghijklmnopqrstuvwxyz");
    }
    if (includeDigits) {
        charset += "0123456789";
        selectedCharsets.push("0123456789");
    }
    if (includeSymbols) {
        charset += "!@#$%^&*()_+[]{}|;:,.<>?";
        selectedCharsets.push("!@#$%^&*()_+[]{}|;:,.<>?");
    }

    if (charset === "") {
        alert("Please select at least one character type.");
        return "";
    }

    const length = Math.floor(Math.random() * (16 - 8 + 1)) + 8;

    const getRandomChar = (characters: string) => {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return characters[array[0] % characters.length];
    };

    let password = "";

    // Ensure at least one unique character from each selected set is included
    selectedCharsets.forEach(charset => {
        let char;
        do {
            char = getRandomChar(charset);
        } while (password.includes(char));
        password += char;
    });

    // Fill the rest of the password length with random characters from the combined set
    for (let i = password.length; i < length; i++) {
        let char;
        do {
            char = getRandomChar(charset);
        } while (password.includes(char));
        password += char;
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
};