const { Builder, By, until } = require('selenium-webdriver');
const { Select } = require('selenium-webdriver/lib/select');
const assert = require('assert');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3000/');
    let addIcon = await driver.wait(until.elementLocated(By.css('[data-testid="add-icon"]')), 10000);

    await new Promise(resolve => setTimeout(resolve, 5000));
    // click on "Save Changes" button
    await addIcon.click();

    // wait for task details
    await driver.wait(until.elementIsVisible(await driver.findElement(By.css('.task-details'))), 10000);

    await new Promise(resolve => setTimeout(resolve, 5000));
    // select value from combobox
    let selectElement = await driver.findElement(By.css('.status-controls select'));
    let select = new Select(selectElement);
    await select.selectByVisibleText('Complete'); // בחר את הערך הרצוי מתוך רשימת הערכים

    // check that the submitted date is appear
    let submitDateElement = await driver.wait(until.elementLocated(By.id('submittedDate1')), 10000);

    // get the date text
    let submitDateText = (await submitDateElement.getText()).split(' ')[2];

    // Set today's date in dd.MM.yyyy format
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;

    // Comparison of the date found in the result with today's date
    assert.strictEqual(formattedToday, submitDateText, `The date does not match today\'s date in the expected format.`);
    console.log('The submitted date is correct');

    // check the steps
    let stepper = await driver.findElement(By.id('stepper1'))
    let stepLabels = await stepper.findElements(By.css('.step-label'));
    for (let i = 0; i < stepLabels.length; i++) {
      let stepLabel = stepLabels[i];
      let className = await stepLabel.getAttribute('class');
      console.log(`Class name of step ${i}: ${className}`);
      // Check out the new department that has been updated to steps following the status change
      if (i + 1 <= 3) { 
        if (className.includes('step-completed')) {
          console.log('Class updated correctly for Succeeded step.');
        } else {
          console.log('Class did not update correctly for Succeeded step.');
        }
        //check that the color of step has changed to green
        let backgroundColorStep = await stepLabel.findElement(By.css('.MuiStepIcon-root.Mui-completed')).getCssValue('color');
        assert.strictEqual(backgroundColorStep, 'rgba(0, 128, 0, 1)', `Color does not match the expected color. Got: ${backgroundColorStep}`);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 5000));
    // click on "Save Changes" button
    let saveButton = await driver.findElement(By.xpath('//button[text()="Save Changes"]'));
    await saveButton.click();

    // check that the alert is appear
    let alertContainer = await driver.wait(until.elementLocated(By.id('alert1')), 15000);
    // check the text in the alert
    let alertText = await alertContainer.getText();
    assert.strictEqual(alertText, 'success\nThe data has been updated successfully!', 'The alert is incorrect');
    console.log(`Alert text: ${alertText}`);
    await new Promise(resolve => setTimeout(resolve, 10000));

  }
  catch (error) {
    // Handling errors and printing the error message
    console.error(`Test failed: ${error.message}`);
  } finally {
    //closing the window
    await driver.quit();
  }
})();
