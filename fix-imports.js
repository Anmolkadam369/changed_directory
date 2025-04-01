import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { glob } from 'glob';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the pattern for JS files in the src directory
const absolutePattern = path.join(__dirname, 'src', '**', '*.js');
console.log('Glob Pattern:', absolutePattern); // Verify absolute pattern

// Check if the glob pattern works at all
glob('**/*.js', { cwd: path.join(__dirname, 'src'), nodir: true }, (err, files) => {
    if (err) {
        console.error('Error occurred:', err);
    } else {
        console.log('Found JS files:', files);
    }
});



// (async () => {
//     try {
//         // const normalizedProjectRoot = path.normalize(projectRoot);
//         // console.log(`Normalized Project Root: ${normalizedProjectRoot}`);

//         // Check folder contents
//         // fs.readdirSync(projectRoot).forEach(file => {
//         //     console.log(file);
//         // });
//         const files = await globPromise(`${projectRoot}/**/*.js`); // Only search for .js files
//         console.log('Found JS files:', files);

//         // const files = await globPromise(`${normalizedProjectRoot}/**/*.{js,jsx,ts,tsx}`);
//         // Log the files found
//         console.log('Found files:', files);

//         if (files.length === 0) {
//             console.log('No matching files found.');
//             return;
//         }

//         files.forEach(file => {
//             let content = fs.readFileSync(file, 'utf8');
//             let updated = false;

//             console.log(`Processing file: ${file}`);  // Log file name

//             const originalContent = content;  // Keep original content for comparison

//             content = content.replace(/from\s+['"](\..*?)['"]/g, (match, oldPath) => {
//                 const absoluteOldPath = path.resolve(path.dirname(file), oldPath);
//                 const fixedPath = findCorrectPath(absoluteOldPath);

//                 if (fixedPath) {
//                     updated = true;
//                     console.log(`Updating path: ${oldPath} -> ${fixedPath}`);  // Log changes
//                     return `from '${fixedPath}'`;
//                 }
//                 return match;
//             });

//             if (updated) {
//                 fs.writeFileSync(file, content, 'utf8');
//                 console.log(`✅ Fixed imports in: ${file}`);
//             } else {
//                 console.log(`No changes made in: ${file}`);
//             }

//             if (originalContent === content) {
//                 console.log(`No changes to imports in file: ${file}`);
//             }
//         });

//         console.log('🎉 All import paths have been updated!');
//     } catch (err) {
//         console.error('Error fixing imports:', err);
//     }
// })();

// // Function to find the correct path
// function findCorrectPath(absoluteOldPath) {
//     const extensions = ['.js', '.jsx', '.ts', '.tsx'];
//     for (const ext of extensions) {
//         if (fs.existsSync(absoluteOldPath + ext)) {
//             return path.relative(projectRoot, absoluteOldPath + ext).replace(/\\/g, '/');
//         }
//     }
//     return null;
// }
