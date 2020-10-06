const puppeteer = require("puppeteer");
const chalk = require("chalk");

// Colorful console.logs 
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    let browser = await puppeteer.launch({ headless: true });

    let page = await browser.newPage();

    await page.goto(`https://www.coordinador.cl/operacion/graficos/operacion-real/generacion-real-del-sistema/`);
    await page.click('div[id="Heading3"]');

    await page.waitForSelector("g.amcharts-pie-item");

    let data = await page.evaluate(() => {
      let genTipe = document.querySelectorAll(`g.amcharts-pie-item`);

      let dataArray = [];

      for (let i = 0; i < genTipe.length; i++) {
        dataArray[i] = {
          percentTipe: genTipe[i].getAttribute("aria-label"),
        }
      }

      return dataArray;
    })

    console.log(data);

    // let news = await page.evaluate(() => {
    //   let titleNodeList = document.querySelectorAll(`g.amcharts-pie-item-title`);
    //   // let linkList = document.querySelectorAll('a');
    //   let titleLinkArray = [];
    //   for (let i = 0; i < titleNodeList.length; i++) {
    //     titleLinkArray[i] = {
    //       title: titleNodeList[i].getAttribute("aria-label"),
    //       // link: linkList[i].getAttribute("href"),
    //     };
    //   }
    //   // console.log(linkList);
    //   return titleLinkArray;
    // });
    // console.log(news);
    await browser.close();
    // Writing the news inside a json file
    // fs.writeFile("einews.json", JSON.stringify(news), function(err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();