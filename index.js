const puppeteer = require('puppeteer')
const fs = require('fs')
;(async function () {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    console.time('baidu')
    await page.goto('https://www.baidu.com', {
        waitUntil: 'load'
    })
    // await page.screenshot({
    //     path: 'baidu.jpg',
    //     quality: 100,
    //     fullPage: true
    // })
    // await page.pdf({
    //     path: 'baidu.pdf',
    //     format: 'A4'
    // })
    console.timeEnd('baidu')
    //获取元素
    const keywordInput = await page.$('#kw')
    //获取元素属性
    //const value = await page.$eval('input[name=search]', (input) => input.value)
    //执行自定义脚本
    const result = await page.evaluate(() => {
        return Promise.resolve(8 * 7)
    })
    await keywordInput.focus()
    await page.keyboard.type('webkit', { delay: 100 })
    await page.keyboard.press('Enter')
    await page.waitForSelector('#container.sam_newgrid .c-container') //等待元素加载之后，否则获取不异步加载的元素
    const links = await page.$$eval('#container.sam_newgrid .c-container .t a', (links) => {
        return links.map((a) => {
            return {
                href: a.href.trim(),
                title: a.textContent.replace(/\s|\n/g, '')
            }
        })
    })

    fs.writeFile('./webkit.json', JSON.stringify(links), function (err) {
        if (err) {
            return
        }
        console.log('获取数据成功')
    })

    // console.time('htxx')
    // await page.goto('http://www.szhtxx.com')
    // await page.screenshot({
    //     path: 'htxx.jpg',
    //     quality: 100,
    //     fullPage: true
    // })
    // console.timeEnd('htxx')

    // //获取上下文句柄
    // const htmlHandle = await page.$('html')
    // //执行计算
    // const html = await page.evaluate((body) => body.outerHTML, htmlHandle)
    // //销毁句柄
    // await htmlHandle.dispose()
    // console.log(html)

    await browser.close()
})()
