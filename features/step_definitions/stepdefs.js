const assert = require("assert");
const axios = require("axios").default;

const { Given, When, Then } = require("cucumber");


Given("the user json data", (table) => {
    this.data = table.hashes();
});


When("I send POST request to {}", async (url) => {

    let chunksOfUrl = url;
    try {
        if (chunksOfUrl[chunksOfUrl.length - 1] == "signup") {
            let ApiResult = "";
            async function makeRequest(data) {
                let count = 0
                for (let i = 0; i < data.length; i++) {

                    const result = await axios.post(url, data[i], {
                        headers: {
                            'content-type': 'application/json'
                        }
                    });
                    ApiResult = await Promise.resolve(result.data.message);
                    if (ApiResult === "User Created") {
                        count += 1;
                    }
                }
                return count;
            }
            let cnt = await makeRequest(this.data);
            this.count = cnt;
            this.result = ApiResult;

        } else if (chunksOfUrl[chunksOfUrl.length - 1] == "signin") {

            let data = this.data[0];
            const result = await axios.post(url, data, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            this.result = await Promise.resolve(result.data.message);
        }

        

    } catch (err) {
        console.log(err);
    }
});

When("I send delete request to {}", async(url) => {
    try{
        const result = await axios.delete(url);
        this.result = result.data.message;
    }catch(err) {
        console.log(err);   
    }
});

Then("{int} user will be created.", (noOfUser) => {
    assert.equal(this.count, noOfUser);
});

Then("result should be {}.", (result) => {
    assert.equal(this.result, result);
});