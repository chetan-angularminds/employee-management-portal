const puppeteer = require('puppeteer');

async function forkStackBlitz(stackBlitzUrl) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Step 1: Modify the URL to trigger a fork
  const forkUrl = stackBlitzUrl.replace('edit', 'fork');
  await page.goto(forkUrl, { waitUntil: 'networkidle2' });

  // Step 2: Wait until `package-lock.json` appears in the filesystem
  await page.waitForFunction(async () => {
    if (!window.fs) return false;
    const fileExists = await window.fs.exists('/package-lock.json');
    return fileExists;
  }, { timeout: 60000 }); // Wait for up to 60 seconds

  console.log('package-lock.json detected, triggering save...');

  // Step 3: Simulate "Ctrl + S" to save the project
  await page.keyboard.down('Control');
  await page.keyboard.press('s');
  await page.keyboard.up('Control');

  // Step 4: Wait for the URL to update
  await page.waitForTimeout(5000); // Allow time for the save operation

  // Step 5: Extract the new forked URL
  const newUrl = page.url();
  console.log('Forked StackBlitz URL:', newUrl);

  await browser.close();
  return newUrl;
}

// Example usage:
forkStackBlitz('https://stackblitz.com/edit/example-project')
  .then((url) => console.log('Forked project URL:', url))
  .catch((error) => console.error('Error:', error));
