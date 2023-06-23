const fs = require("fs").promises;

// read file
const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data;
    } catch (err) {
        console.log(err);
    }
};

// write file
const writeFile = async (filePath, ...data) => {
    try {
        await fs.writeFile(filePath, data.join("\n"), "utf-8");
    } catch (err) {
        console.log(err);
    }
};

// main function
const main = async () => {
    const data = await readFile("fileToRead1.txt");
    const data2 = await readFile("fileToRead2.txt");
    const data3 = await readFile("fileToRead3.txt");
    await writeFile("fileToWrite.txt", data, data2, data3);
};

main();
