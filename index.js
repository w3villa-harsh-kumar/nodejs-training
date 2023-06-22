const fs = require('fs').promises;

const readFile = async () => {
    try {
        const data = await fs.readFile(('learning/fileToRead.txt'), 'utf-8');
        return data;
    } catch (err) {
        console.log(err);
    }
}

const writeFile = async (data) => {
    try {
        await fs.writeFile(('learning/fileToWrite.txt'), data);
    } catch (err) {
        console.log(err);
    }
}

const main = async () => {
    const data = await readFile();
    await writeFile(data);
}



main();