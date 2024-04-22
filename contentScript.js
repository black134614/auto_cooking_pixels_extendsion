(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value } = obj;
        if (type === "NEW") {
            pageLoaded();
        }
    });
    let stopProcessing = true;

    // async function startAuto(wrapper, loop, watingTime) {
    //     while (!stopProcessing) {
    //         const button = document.querySelector('button.Crafting_craftingButton__Qd6Ke span');
    //         if (button && !button.disabled) {
    //             button.click();
    //             const randomTime = getRandomInt(3, 7) * 200;
    //             await sleep(watingTime + randomTime);
    //             if (!stopProcessing) {
    //                 button.click();
    //                 await sleep(randomTime);
    //                 if (!stopProcessing) {
    //                     button.click();
    //                 }
    //             }
    //         }
    //         await sleep(1000)
    //     }
    // }
    async function clickCraftingButton() {
        const craftingButton = document.querySelector('.Crafting_craftingButton__Qd6Ke');
        if (craftingButton && !craftingButton.disabled) {
            craftingButton.click();
        }
    }

    async function clickCloseCraftingButton() {
        const craftingButton = document.querySelector('.Crafting_craftingCloseButton__ZbHQF');
        if (craftingButton) {
            craftingButton.click();
        }
    }

    async function startAuto(wrapper, watingTime) {
        let count = 0
        while (!stopProcessing) {
            const craftingButton = document.querySelector('.Crafting_craftingButton__Qd6Ke');
            if (craftingButton && !craftingButton.disabled && craftingButton.textContent === "Create") {
                console.log("tao banh");
                await clickCraftingButton();
                await sleep(400)
                while (!craftingButton.disabled)
                {
                    await clickCraftingButton();
                }
                // ramdom_out = getRandomInt(4, 6) * 1000
                // await sleep(ramdom_out);
                // await clickCloseCraftingButton()
                // console.log("doi ", watingTime - ramdom_out + "ms");
                // await sleep(watingTime - ramdom_out);
                await sleep(watingTime - 500);
                console.log("hoan thanh");
                count++
                document.title = `Đã chế tạo ${count} lần`;
            }
            if (craftingButton && !craftingButton.disabled && craftingButton.textContent === "Collect") {
                await clickCraftingButton();
                await clickCraftingButton();
            }
            await sleep(100);
        }
        stopProcessing = true;
        wrapper.className = "toogle-btn auto-water auto-off";
        wrapper.title = "Click to start auto";
        document.title = "Đã chế tạo xong!" + loop + " Bánh";
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function timeToMilliseconds(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;

        return totalMilliseconds;
    }

    function stopAuto() {
        stopProcessing = true;
    }

    function pageLoaded() {
        const parent = document.getElementById('__next');
        const wrapper = document.createElement('div');
        wrapper.className = "toogle-btn auto-water";
        parent.append(wrapper);

        const bookmarkBtn = document.createElement("img");
        bookmarkBtn.src = chrome.runtime.getURL("assets/cooking.png");
        bookmarkBtn.title = "Click to start auto";
        wrapper.append(bookmarkBtn);


        bookmarkBtn.addEventListener('click', async (e) => {
            if (!stopProcessing) {
                wrapper.className = "toogle-btn auto-water auto-off";
                wrapper.title = "Click to start auto";
                stopAuto();
            } else {
                wrapper.className = "toogle-btn auto-water auto-on";
                wrapper.title = "Click to stop auto";
                const cratingWrapper = document.querySelectorAll("div.Crafting_craftingSection__QPjg4.Crafting_craftingColumn__v6ueF div")
                const watingTime = timeToMilliseconds(cratingWrapper[7].textContent)
                console.log("nau mat: ", watingTime)
                stopProcessing = false;
                await startAuto(wrapper, watingTime);
            }
        });
    }
    pageLoaded();
})();
