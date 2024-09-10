import puppeteer from "puppeteer-core";
import { getEdgePath } from "edge-paths";


const completeDailyTasks = async (page) => {
    await page.waitForSelector('.daily-sets-card', { timeout: 10000});

    const tasks = await page.$$eval('.daily-sets-card', tasks =>
        tasks.map(task => {
            const button = task.querySelector('a');
            return button ? button.href : null;
        }).filter(Boolean)
    )
};

for (const taskURL of tasks) {
    const taskPage = await page.browser().newPage();
    await taskPage.goto(taskURL);

    await taskPage.waitFortimeout(5000);

    await taskPage.close();
}

console.log('Tarefas diárias completadas');



const lauchBrowser = async () => {
    const browser = await puppeteer.launch({
        executablePath: getEdgePath(),
        headless: false,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.goto('https://rewards.microsoft.com');

    await completeDailyTasks(page);

    await browser.close();

};

lauchBrowser();