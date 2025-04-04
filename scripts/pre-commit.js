const {execSync} = require('child_process')

// Helper function to execute commands with better error handling
function executeCommand(command, stepName, timeoutMs = 300000) { // Default 5 minute timeout
  try {
    console.log(`[INFO] Running ${stepName}...\n`)
    execSync(command, {stdio: 'inherit', timeout: timeoutMs})
    console.clear()
    console.log(`[SUCCESS] ${stepName} finished successfully!`)
    return true
  } catch (error) {
    console.clear()
    console.error(`[ERROR] ${stepName} failed. Error details:`)
    console.error(`Command: ${command}`)
    console.error(`Error: ${error.message}`)
    if (error.code === 'ETIMEDOUT') {
      console.error(`[TIMEOUT] Command timed out after ${timeoutMs / 60000} minutes`)
    }
    return false
  }
}

try {
  console.log('[START] Starting pre-commit hook: formatting, linting, and building services...')
  console.log('[WAIT] This may take a few minutes. Please wait...')
  
  const services = [
    "lis",
  ].map((service) => ({
    name: `apps/${service}`,
    buildCommand: `yarn run build:${service}`,
  }))

  const excludedPaths = ['node_modules', 'dist', 'scripts']
  
  // Get changed files with error handling
  let changedFiles = []
  try {
    changedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
      .toString()
      .trim()
      .split('\n')
      .filter(Boolean) // Filter out empty strings
    
    console.log('[INFO] Changed files: ', changedFiles.length)
  } catch (error) {
    console.error('[ERROR] Failed to get changed files. Error details:')
    console.error(error.message)
    process.exit(1)
  }

  const filteredFiles = changedFiles.filter((file) => {
    if (excludedPaths.some((excludedPath) => file.startsWith(excludedPath))) {
      return false
    }
    return file.endsWith('.js') || file.endsWith('.ts')
  })

  if (filteredFiles.length === 0) {
    console.log('[SKIP] No relevant files changed. Skipping.')
    process.exit(0)
  }

  // Format files
  if (filteredFiles.length > 0) {
    const prettierCommand = `yarn prettier --write ${filteredFiles.join(' ')}`
    if (!executeCommand(prettierCommand, 'formatter')) {
      console.error('[ERROR] Formatting failed. Please fix the issues and try again.')
      process.exit(1)
    }
  }

  // Lint files
  if (filteredFiles.length > 0) {
    const lintCommand = `yarn eslint --config ./eslint.config.js --fix ${filteredFiles.join(' ')}`
    if (!executeCommand(lintCommand, 'linter')) {
      console.error('[ERROR] Linting failed. Please fix the issues and try again.')
      process.exit(1)
    }
  }

  // Check if any changes were made to the libs folder
  const hasLibsChanges = filteredFiles.some(file => file.startsWith('libs/'));
  
  // Determine which services to build
  let servicesToBuild = [];
  
  if (hasLibsChanges) {
    console.log('[INFO] Changes detected in libs folder. Building all services...');
    servicesToBuild = services;
  } else {
    // Find affected services based on changed files
    servicesToBuild = services.filter(service => 
      filteredFiles.some(file => file.startsWith(service.name))
    );
    
    if (servicesToBuild.length === 0) {
      console.log('[SKIP] No services affected by changes. Skipping build step.');
      console.log('[SUCCESS] All steps completed successfully.');
      process.exit(0);
    } else {
      console.log(`[INFO] Building ${servicesToBuild.length} affected services...`);
    }
  }
  
  // Clear dist directory
  const clearDistCommand = `yarn run clear:dist`;
  if (!executeCommand(clearDistCommand, 'clearing dist directory')) {
    console.error('[ERROR] Failed to clear dist directory. Continuing with build...')
  }

  // Build each affected service individually
  let buildFailed = false;
  for (const service of servicesToBuild) {
    console.log(`[BUILD] Building ${service.name}...`);
    if (!executeCommand(service.buildCommand, `build for ${service.name}`, 300000)) { // 5 minute timeout per service
      console.error(`[ERROR] Build failed for ${service.name}. Please fix the issues and try again.`);
      buildFailed = true;
      break;
    }
  }

  if (buildFailed) {
    process.exit(1);
  }

  console.clear();
  console.log('[SUCCESS] All steps completed successfully.');
  process.exit(0);
} catch (error) {
  console.error('[ERROR] Unexpected error occurred. Fix errors before committing. Error details:');
  console.error(error.message);
  console.error(error.stack);
  process.exit(1);
}
// Test comment
