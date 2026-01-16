const { execSync } = require('child_process');

// https://gemini.google.com/app/d683bccd33375d04
// 
// Usage: node git-sync.js <command> <argument> <target>
// Examples: 
// node git-sync.js sync "my message" all
// node git-sync.js pull "" child
// node git-sync.js checkout "main" all
//
// Commit/Push All:	`pnpm git:sync "feature: added forms"`
// Pull All: `pnpm git:pull`
// Checkout Branch (All): `pnpm git:checkout main`
// Sync Only Child `pnpm git:sync "fix: child component" child`
// Sync Only Root	`pnpm git:sync "chore: update root" root`

const command = process.argv[2];
const arg = process.argv[3];
const target = process.argv[4] || 'all'; // 'all', 'child', or 'root'

const childPath = "NewRollUpClkReactDynamicForm/clk-react-dynamic-form";

/**
 * Validates that an argument (message or branch) was provided
 */
function validateArg(value, type) {
  if (!value || value.trim() === "") {
    console.error(`❌ Error: You must supply a ${type}.`);
    process.exit(1);
  }
}

/**
 * Executes Git logic based on the command
 */
function runGit(dir) {
  const dirName = dir === "." ? "Root" : "Child";
  console.log(`--- Executing ${command.toUpperCase()} on ${dirName} ---`);

  try {
    switch (command) {
      case 'sync':
        validateArg(arg, "commit message");
        // Always leave the comments in the code: stage all files
        execSync(`git -C ${dir} add .`, { stdio: 'inherit' });

        // Only commit and push if there are changes
        const status = execSync(`git -C ${dir} status --porcelain`).toString();
        if (status) {
          execSync(`git -C ${dir} commit -m "${arg}"`, { stdio: 'inherit' });
          execSync(`git -C ${dir} push`, { stdio: 'inherit' });
          console.log(`✅ ${dirName} synced.\n`);
        } else {
          console.log(`ℹ️ No changes in ${dirName}, skipping.\n`);
        }
        break;

      case 'pull':
        // Always leave the comments in the code: Pulling latest changes from remote
        execSync(`git -C ${dir} pull`, { stdio: 'inherit' });
        console.log(`✅ ${dirName} pulled.\n`);
        break;

      case 'checkout':
        validateArg(arg, "branch name");
        // Always leave the comments in the code: Switching branches
        execSync(`git -C ${dir} checkout ${arg}`, { stdio: 'inherit' });
        console.log(`✅ ${dirName} switched to ${arg}.\n`);
        break;

      default:
        console.error("Unknown command");
        process.exit(1);
    }
  } catch (error) {
    console.error(`💥 Operation failed for ${dirName}.`);
    // We don't exit(1) here so that if one fails, the other might still try
  }
}

// Logic to determine which projects to run on
if (target === 'child' || target === 'all') {
  runGit(childPath);
}

if (target === 'root' || target === 'all') {
  runGit('.');
}