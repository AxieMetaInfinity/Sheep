const TronWeb = require('tronweb');
var crypto = require('crypto');
const proxyWallets = require('./model/proxyWallets');

const checkWallets = async () => {

    let proxyDatas = await proxyWallets.find({status: {$ne : "success"}})
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider(process.env.TronFullNode)
    const solidityNode = new HttpProvider(process.env.TronSolidityNode)
    const eventServer = new HttpProvider(process.env.TronEventServer)

    for (const proxyData of proxyDatas) {
        console.log("-------------------------------------- \n")
        console.log("proxy data:", proxyData._id)

        const proxyWallet = JSON.parse(proxyData.wallet)
        console.log("wallet:", proxyWallet)
        const proxyTronWeb = new TronWeb(fullNode, solidityNode, eventServer, proxyWallet.private);

        if(proxyData.status == "pending" || proxyData.transaction) {
            console.log("usdt trx id:", proxyData.transaction);
            const txInfo = await proxyTronWeb.trx.getTransactionInfo(proxyData.transaction);
            console.log("trx info:", txInfo)
            if(txInfo.receipt) {
                if (txInfo.receipt.result === "SUCCESS") {
                    const updateData = await proxyWallets.findByIdAndUpdate(proxyData._id, {
                        status: "success",
                    }, {new: true});
                    console.log("updated data:", updateData)
                    // ping the success notification.
    
                } else  {
                    const updateData = await proxyWallets.findByIdAndUpdate(proxyData._id, {
                        status: "fail",
                        transaction: ""
                    }, {new: true});
                    console.log("USDT Transaction failed.");
                }
            }

        } else { // status == "fail"
            const usdtContractAddr = process.env.USDTContract;
            const { abi } = await proxyTronWeb.trx.getContract(usdtContractAddr);
            const usdtContract = proxyTronWeb.contract(abi.entrys, usdtContractAddr);
            const balance = await usdtContract.methods.balanceOf(proxyWallet.address).call();
            console.log("balance:", balance.toString());
    
            if(parseInt(balance.toString()) >= parseInt(proxyData.amount) ) {
                try {
                    // request gas fee to transfer USDT 30 trx
                    const proxyWalletBalance = await proxyTronWeb.trx.getBalance(proxyWallet.address);
                    if(parseInt(proxyWalletBalance) < 30*1000000) {
                        const feeWalletPriv = process.env.FeeWallet;
                        const feeWallet = new TronWeb(fullNode, solidityNode, eventServer, feeWalletPriv);
                        const result = await feeWallet.trx.sendTransaction(proxyWallet.address, 30*1000000);
                        console.log("fee result:", result)
                    }
                    // send USDT from proxy wallet to treasure wallet.
                    console.log("transfer data:", process.env.TreasureWallet, proxyData.amount)
                    const txid = await usdtContract.methods.transfer(process.env.TreasureWallet, proxyData.amount).send();
    
                    const updateData = await proxyWallets.findByIdAndUpdate(proxyData._id, {
                        status: "pending",
                        transaction: txid
                    }, {new: true});
    
                    console.log("updated data:", updateData)
    
                    // return res.status(200).send("success transfer");
                } catch (error) {
                    console.log("trx is failed")
                }
        
            } else {
                console.log("balance is not sufficient")
            }

        }

        console.log("*********\n\n")

    }
}

 
 module.exports = checkWallets;